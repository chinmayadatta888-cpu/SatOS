import { useCallback, useEffect, useReducer } from 'react'
import type { DesktopApp } from '../config/desktopApps'
import type { ManagedWindow, WindowBounds, WindowRect } from '../types/window'

const TASKBAR_HEIGHT = 48
const MIN_WIDTH = 320
const MIN_HEIGHT = 220

type ManagerState = { windows: ManagedWindow[]; activeWindowId: string | null }
type Action =
  | { type: 'open'; app: DesktopApp; bounds: WindowBounds }
  | { type: 'focus'; id: string }
  | { type: 'blur' }
  | { type: 'toggle-taskbar'; id: string }
  | { type: 'minimize'; id: string }
  | { type: 'maximize'; id: string; bounds: WindowBounds }
  | { type: 'close'; id: string }
  | { type: 'rect'; id: string; rect: WindowRect }
  | { type: 'viewport'; bounds: WindowBounds }

const initialState: ManagerState = { windows: [], activeWindowId: null }

function viewportBounds(): WindowBounds {
  return { width: window.innerWidth, height: Math.max(240, window.innerHeight - TASKBAR_HEIGHT) }
}

function clampRect(rect: WindowRect, bounds: WindowBounds): WindowRect {
  const width = Math.min(bounds.width, Math.max(Math.min(MIN_WIDTH, bounds.width), rect.width))
  const height = Math.min(bounds.height, Math.max(Math.min(MIN_HEIGHT, bounds.height), rect.height))
  return {
    x: Math.max(0, Math.min(bounds.width - width, rect.x)),
    y: Math.max(0, Math.min(bounds.height - height, rect.y)),
    width,
    height,
  }
}

function nextActive(windows: ManagedWindow[], excludingId?: string): string | null {
  return windows
    .filter((window) => window.id !== excludingId && !window.minimized)
    .sort((a, b) => b.zIndex - a.zIndex)[0]?.id ?? null
}

function raise(window: ManagedWindow, windows: ManagedWindow[]): ManagedWindow {
  const top = Math.max(0, ...windows.map((item) => item.zIndex))
  return { ...window, zIndex: top + 1 }
}

function reducer(state: ManagerState, action: Action): ManagerState {
  switch (action.type) {
    case 'open': {
      const current = state.windows.find((window) => window.appId === action.app.id)
      if (current) {
        const raised = raise({ ...current, minimized: false }, state.windows)
        return { windows: state.windows.map((window) => window.id === raised.id ? raised : window), activeWindowId: raised.id }
      }
      const bounds = action.bounds
      const width = Math.min(560, bounds.width)
      const height = Math.min(390, bounds.height)
      const offset = (state.windows.length % 5) * 24
      const baseRect = {
        x: Math.max(0, (bounds.width - width) / 2 + offset),
        y: Math.max(0, (bounds.height - height) / 2 + offset),
        width,
        height,
      }
      const rect = clampRect(baseRect, bounds)
      const window: ManagedWindow = {
        id: action.app.id,
        appId: action.app.id,
        title: action.app.name,
        subtitle: action.app.subtitle,
        rect,
        minimized: false,
        maximized: false,
        restoreRect: null,
        zIndex: Math.max(0, ...state.windows.map((item) => item.zIndex)) + 1,
      }
      return { windows: [...state.windows, window], activeWindowId: window.id }
    }
    case 'focus': {
      const current = state.windows.find((window) => window.id === action.id)
      if (!current) return state
      const raised = raise({ ...current, minimized: false }, state.windows)
      return { windows: state.windows.map((window) => window.id === raised.id ? raised : window), activeWindowId: raised.id }
    }
    case 'blur':
      return { ...state, activeWindowId: null }
    case 'toggle-taskbar': {
      const current = state.windows.find((window) => window.id === action.id)
      if (!current) return state
      if (!current.minimized && state.activeWindowId === current.id) {
        const minimized = { ...current, minimized: true }
        const windows = state.windows.map((window) => window.id === current.id ? minimized : window)
        return { windows, activeWindowId: nextActive(windows, current.id) }
      }
      const raised = raise({ ...current, minimized: false }, state.windows)
      return { windows: state.windows.map((window) => window.id === raised.id ? raised : window), activeWindowId: raised.id }
    }
    case 'minimize': {
      const current = state.windows.find((window) => window.id === action.id)
      if (!current) return state
      const windows = state.windows.map((window) => window.id === current.id ? { ...window, minimized: true } : window)
      return { windows, activeWindowId: state.activeWindowId === current.id ? nextActive(windows, current.id) : state.activeWindowId }
    }
    case 'maximize': {
      const current = state.windows.find((window) => window.id === action.id)
      if (!current) return state
      const toggled = current.maximized
        ? { ...current, rect: current.restoreRect ?? current.rect, restoreRect: null, maximized: false }
        : { ...current, rect: { x: 0, y: 0, ...action.bounds }, restoreRect: current.rect, maximized: true }
      const raised = raise(toggled, state.windows)
      return { windows: state.windows.map((window) => window.id === raised.id ? raised : window), activeWindowId: raised.id }
    }
    case 'close': {
      const windows = state.windows.filter((window) => window.id !== action.id)
      return { windows, activeWindowId: state.activeWindowId === action.id ? nextActive(windows) : state.activeWindowId }
    }
    case 'rect':
      return {
        ...state,
        windows: state.windows.map((window) => window.id === action.id && !window.maximized ? { ...window, rect: action.rect } : window),
      }
    case 'viewport': {
      const windows = state.windows.map((window) => ({
        ...window,
        rect: window.maximized ? { x: 0, y: 0, ...action.bounds } : clampRect(window.rect, action.bounds),
        restoreRect: window.restoreRect ? clampRect(window.restoreRect, action.bounds) : null,
      }))
      return { windows, activeWindowId: state.activeWindowId }
    }
    default:
      return state
  }
}

export function useWindowManager() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const handleResize = () => dispatch({ type: 'viewport', bounds: viewportBounds() })
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const openApp = useCallback((app: DesktopApp) => dispatch({ type: 'open', app, bounds: viewportBounds() }), [])
  const focusWindow = useCallback((id: string) => dispatch({ type: 'focus', id }), [])
  const blurActiveWindow = useCallback(() => dispatch({ type: 'blur' }), [])
  const toggleTaskbarWindow = useCallback((id: string) => dispatch({ type: 'toggle-taskbar', id }), [])
  const minimizeWindow = useCallback((id: string) => dispatch({ type: 'minimize', id }), [])
  const maximizeWindow = useCallback((id: string) => dispatch({ type: 'maximize', id, bounds: viewportBounds() }), [])
  const closeWindow = useCallback((id: string) => dispatch({ type: 'close', id }), [])
  const setWindowRect = useCallback((id: string, rect: WindowRect) => dispatch({ type: 'rect', id, rect }), [])

  return {
    ...state,
    openApp,
    focusWindow,
    blurActiveWindow,
    toggleTaskbarWindow,
    minimizeWindow,
    maximizeWindow,
    closeWindow,
    setWindowRect,
  }
}
