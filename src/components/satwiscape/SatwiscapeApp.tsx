import { useEffect, useLayoutEffect, useRef, useState, type FormEvent, type KeyboardEvent, type PointerEvent as ReactPointerEvent } from 'react'
import { defaultSatwiscapeBookmarks, type SatwiscapeBookmark } from '../../config/satwiscape/bookmarks'
import { satwiscapeSearchStorage } from '../../config/satwiscape/searchConfig'
import { createHomeTab, createVisit, getArticle, getPublication, resolveAddress, searchPage, type BrowserPage, type BrowserTab, type BrowserVisit } from './browserModel'
import SatwiscapePageView from './SatwiscapePages'

type SavedHistory = { id: string; title: string; url: string; visitedAt: number }
type BrowserPanel = 'bookmarks' | 'history' | 'menu' | 'about' | null

function readStored<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key)
    if (value === null) return fallback
    const parsed: unknown = JSON.parse(value)
    return Array.isArray(parsed) ? parsed as T : fallback
  } catch { return fallback }
}

function readCurrentBookmarks(): SatwiscapeBookmark[] {
  const stored = readStored<SatwiscapeBookmark[]>(satwiscapeSearchStorage.bookmarks, defaultSatwiscapeBookmarks)
  let removedStaleBookmark = false
  const current = stored.flatMap((bookmark) => {
      if (!bookmark || typeof bookmark.id !== 'string' || typeof bookmark.title !== 'string' || typeof bookmark.url !== 'string') return []
      const page = resolveAddress(bookmark.url, 0)
      if (page.kind === 'not-found') { removedStaleBookmark = true; return [] }
      if (page.kind === 'publication') {
        const publication = getPublication(page.publicationId)
        return publication ? [{ ...bookmark, title: publication.name }] : []
      }
      if (page.kind === 'article') {
        const article = getArticle(page.articleId)
        return article ? [{ ...bookmark, title: article.headline }] : []
      }
      return [bookmark]
    })
  if (!removedStaleBookmark) return current
  const savedUrls = new Set(current.map((bookmark) => bookmark.url))
  return [...current, ...defaultSatwiscapeBookmarks.filter((bookmark) => !savedUrls.has(bookmark.url))]
}

function ClockMark({ kind }: { kind: 'back' | 'forward' | 'refresh' | 'home' | 'bookmark' | 'menu' }) {
  if (kind === 'back') return <svg viewBox="0 0 20 20" aria-hidden="true" shapeRendering="crispEdges"><path d="M8 3L2 9l6 6v-4h4v6h4V8H8z" fill="currentColor"/></svg>
  if (kind === 'forward') return <svg viewBox="0 0 20 20" aria-hidden="true" shapeRendering="crispEdges"><path d="M12 3l6 6-6 6v-4H8v6H4V8h8z" fill="currentColor"/></svg>
  if (kind === 'refresh') return <svg viewBox="0 0 20 20" aria-hidden="true" shapeRendering="crispEdges"><path d="M4 5V2L1 6l4 3V6a6 6 0 0 1 10 2h3A9 9 0 0 0 4 5zm12 10v3l3-4-4-3v3a6 6 0 0 1-10-2H2a9 9 0 0 0 14 3z" fill="currentColor"/></svg>
  if (kind === 'home') return <svg viewBox="0 0 20 20" aria-hidden="true" shapeRendering="crispEdges"><path d="M1 9L10 2l9 7h-3v8h-5v-5H9v5H4V9z" fill="currentColor"/></svg>
  if (kind === 'bookmark') return <svg viewBox="0 0 20 20" aria-hidden="true" shapeRendering="crispEdges"><path d="M4 2h12v16l-6-4-6 4z" fill="currentColor"/></svg>
  return <svg viewBox="0 0 20 20" aria-hidden="true" shapeRendering="crispEdges"><rect x="3" y="4" width="14" height="3" fill="currentColor"/><rect x="3" y="9" width="14" height="3" fill="currentColor"/><rect x="3" y="14" width="14" height="3" fill="currentColor"/></svg>
}

function currentVisit(tab: BrowserTab | undefined): BrowserVisit | undefined {
  return tab?.history[tab.cursor]
}

function BrowserPanelView({ panel, bookmarks, history, current, onOpenUrl, onRemoveBookmark, onToggleCurrentBookmark, onClearHistory, onNewTab, onOpenHistory, onOpenBookmarks, onOpenAbout, onClose }: {
  panel: BrowserPanel
  bookmarks: SatwiscapeBookmark[]
  history: SavedHistory[]
  current: BrowserVisit
  onOpenUrl: (url: string) => void
  onRemoveBookmark: (id: string) => void
  onToggleCurrentBookmark: () => void
  onClearHistory: () => void
  onNewTab: () => void
  onOpenHistory: () => void
  onOpenBookmarks: () => void
  onOpenAbout: () => void
  onClose: () => void
}) {
  if (!panel) return null
  if (panel === 'menu') return <div className="sw-browser-panel sw-menu-panel" role="menu" aria-label="Satwiscape menu">
    <button type="button" role="menuitem" onClick={onNewTab}><span>＋</span> New tab <kbd>Ctrl+T</kbd></button>
    <button type="button" role="menuitem" onClick={onOpenHistory}><span>◷</span> Browsing history</button>
    <button type="button" role="menuitem" onClick={onOpenBookmarks}><span>★</span> Favorites</button>
    <button type="button" role="menuitem" onClick={onOpenAbout}><span>i</span> About Satwiscape</button>
  </div>
  if (panel === 'about') return <div className="sw-browser-panel sw-about-panel" role="dialog" aria-label="About Satwiscape">
    <header><strong>About Satwiscape</strong><button type="button" aria-label="Close about panel" onClick={onClose}>×</button></header>
    <p>Your little corner of the internet. Every page here is a local, fictional Satwiscape page.</p><small>No outside websites are opened.</small>
  </div>
  if (panel === 'history') return <div className="sw-browser-panel" role="dialog" aria-label="Browsing history">
    <header><strong>Recently visited</strong><button type="button" aria-label="Close history panel" onClick={onClose}>×</button></header>
    <div className="sw-panel-list">{history.length === 0 ? <p className="sw-panel-empty">Your browsing history is clear.</p> : history.map((item) => <button type="button" className="sw-panel-entry" key={item.id} onClick={() => onOpenUrl(item.url)}><strong>{item.title}</strong><span>{item.url}</span><small>{new Date(item.visitedAt).toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</small></button>)}</div>
    <footer><span>{history.length} recent {history.length === 1 ? 'visit' : 'visits'}</span><button type="button" onClick={onClearHistory}>Clear History</button></footer>
  </div>
  return <div className="sw-browser-panel" role="dialog" aria-label="Favorites">
    <header><strong>Favorites</strong><button type="button" aria-label="Close favorites panel" onClick={onClose}>×</button></header>
    <button type="button" className="sw-add-favorite" onClick={onToggleCurrentBookmark}><span aria-hidden="true">{bookmarks.some((item) => item.url === current.url) ? '−' : '+'}</span>{bookmarks.some((item) => item.url === current.url) ? 'Remove this page from Favorites' : 'Add this page to Favorites'}</button>
    <div className="sw-panel-list">{bookmarks.length === 0 ? <p className="sw-panel-empty">No saved pages yet. Add one while you are visiting it.</p> : bookmarks.map((item) => <div className="sw-bookmark-row" key={item.id}><button type="button" className="sw-panel-entry" onClick={() => onOpenUrl(item.url)}><strong>{item.title}</strong><span>{item.url}</span></button><button type="button" className="sw-remove-favorite" aria-label={`Remove ${item.title} from Favorites`} onClick={() => onRemoveBookmark(item.id)}>×</button></div>)}</div>
    <footer><span>{bookmarks.length} saved {bookmarks.length === 1 ? 'page' : 'pages'}</span><span>KEPT ON THIS DEVICE</span></footer>
  </div>
}

export default function SatwiscapeApp() {
  const tabNumber = useRef(2)
  const panelMessageNumber = useRef(0)
  const timers = useRef(new Map<string, number>())
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const scrollFrame = useRef<number | null>(null)
  const [tabs, setTabs] = useState<BrowserTab[]>(() => [createHomeTab('tab-1')])
  const [activeTabId, setActiveTabId] = useState('tab-1')
  const [addressDraft, setAddressDraft] = useState('satwiscape://home')
  const [panel, setPanel] = useState<BrowserPanel>(null)
  const [bookmarks, setBookmarks] = useState<SatwiscapeBookmark[]>(readCurrentBookmarks)
  const [historyEntries, setHistoryEntries] = useState<SavedHistory[]>(() => readStored<SavedHistory[]>(satwiscapeSearchStorage.history, []))

  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0]
  const visit = currentVisit(activeTab) ?? createHomeTab('fallback').history[0]
  const canGoBack = Boolean(activeTab && activeTab.cursor > 0)
  const canGoForward = Boolean(activeTab && activeTab.cursor < activeTab.history.length - 1)

  useEffect(() => {
    try { localStorage.setItem(satwiscapeSearchStorage.bookmarks, JSON.stringify(bookmarks)) } catch { /* Favorites remain available for this session. */ }
  }, [bookmarks])

  useEffect(() => {
    try { localStorage.setItem(satwiscapeSearchStorage.history, JSON.stringify(historyEntries)) } catch { /* History remains available for this session. */ }
  }, [historyEntries])

  useEffect(() => () => {
    timers.current.forEach((timer) => window.clearTimeout(timer))
    if (scrollFrame.current !== null) window.cancelAnimationFrame(scrollFrame.current)
  }, [])

  useLayoutEffect(() => {
    setAddressDraft(visit.url)
    if (viewportRef.current) viewportRef.current.scrollTop = visit.scrollTop
  }, [activeTabId, visit.id])

  function saveActiveScroll() {
    const scrollTop = viewportRef.current?.scrollTop ?? 0
    setTabs((current) => current.map((tab) => tab.id !== activeTabId ? tab : {
      ...tab,
      history: tab.history.map((entry, index) => index === tab.cursor ? { ...entry, scrollTop } : entry),
    }))
  }

  function startLoading(tabId: string) {
    const previousTimer = timers.current.get(tabId)
    if (previousTimer !== undefined) window.clearTimeout(previousTimer)
    setTabs((current) => current.map((tab) => tab.id === tabId ? { ...tab, loading: true } : tab))
    const timer = window.setTimeout(() => {
      setTabs((current) => current.map((tab) => tab.id === tabId ? { ...tab, loading: false } : tab))
      timers.current.delete(tabId)
    }, 280)
    timers.current.set(tabId, timer)
  }

  function logVisit(entry: BrowserVisit) {
    setHistoryEntries((current) => [{ id: entry.id, title: entry.title, url: entry.url, visitedAt: entry.visitedAt }, ...current].slice(0, 60))
  }

  function navigate(page: BrowserPage) {
    if (!activeTab) return
    saveActiveScroll()
    const entry = createVisit(page)
    setTabs((current) => current.map((tab) => {
      if (tab.id !== activeTabId) return tab
      const nextHistory = [...tab.history.slice(0, tab.cursor + 1), entry]
      return { ...tab, history: nextHistory, cursor: nextHistory.length - 1 }
    }))
    logVisit(entry)
    setPanel(null)
    startLoading(activeTabId)
  }

  function search(query: string) {
    const page = searchPage(query, panelMessageNumber.current)
    panelMessageNumber.current += 1
    navigate(page)
  }

  function goAddress(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const page = resolveAddress(addressDraft, panelMessageNumber.current)
    panelMessageNumber.current += 1
    navigate(page)
  }

  function openUrl(url: string) {
    const page = resolveAddress(url, panelMessageNumber.current)
    panelMessageNumber.current += 1
    navigate(page)
  }

  function goHome() { navigate({ kind: 'home' }) }
  function openArticle(articleId: string) { navigate({ kind: 'article', articleId }) }
  function openPublication(publicationId: string) { navigate({ kind: 'publication', publicationId }) }

  function travel(direction: -1 | 1) {
    if (!activeTab) return
    const nextCursor = activeTab.cursor + direction
    if (nextCursor < 0 || nextCursor >= activeTab.history.length) return
    saveActiveScroll()
    setTabs((current) => current.map((tab) => tab.id === activeTabId ? { ...tab, cursor: nextCursor } : tab))
    setPanel(null)
    startLoading(activeTabId)
  }

  function refresh() {
    if (!activeTab) return
    saveActiveScroll()
    const refreshed = createVisit(visit.page)
    refreshed.url = visit.url
    refreshed.title = visit.title
    refreshed.visitedAt = visit.visitedAt
    refreshed.scrollTop = viewportRef.current?.scrollTop ?? visit.scrollTop
    setTabs((current) => current.map((tab) => tab.id !== activeTabId ? tab : {
      ...tab,
      history: tab.history.map((entry, index) => index === tab.cursor ? refreshed : entry),
    }))
    setPanel(null)
    startLoading(activeTabId)
  }

  function newTab() {
    saveActiveScroll()
    const id = `tab-${tabNumber.current++}`
    setTabs((current) => [...current, createHomeTab(id)])
    setActiveTabId(id)
    setPanel(null)
  }

  function selectTab(id: string) {
    if (id === activeTabId) return
    saveActiveScroll()
    setActiveTabId(id)
    setPanel(null)
  }

  function closeTab(id: string) {
    const closingIndex = tabs.findIndex((tab) => tab.id === id)
    if (closingIndex < 0) return
    if (id === activeTabId) saveActiveScroll()
    const timer = timers.current.get(id)
    if (timer !== undefined) window.clearTimeout(timer)
    timers.current.delete(id)
    if (tabs.length === 1) {
      const fresh = createHomeTab(id)
      setTabs([fresh])
      setActiveTabId(id)
      setPanel(null)
      return
    }
    const nextTabs = tabs.filter((tab) => tab.id !== id)
    setTabs(nextTabs)
    if (id === activeTabId) setActiveTabId(nextTabs[Math.min(closingIndex, nextTabs.length - 1)].id)
    setPanel(null)
  }

  function toggleCurrentBookmark() {
    const existing = bookmarks.find((item) => item.url === visit.url)
    if (existing) setBookmarks((current) => current.filter((item) => item.id !== existing.id))
    else setBookmarks((current) => [{ id: `bookmark-${Date.now()}`, title: visit.title, url: visit.url }, ...current])
  }

  function removeBookmark(id: string) { setBookmarks((current) => current.filter((item) => item.id !== id)) }
  function clearHistory() { setHistoryEntries([]) }

  function openHistoryPanel() { setPanel('history') }
  function openBookmarksPanel() { setPanel('bookmarks') }

  function handleRootPointerDown(event: ReactPointerEvent<HTMLElement>) {
    const target = event.target
    if (target instanceof Element && target.closest('.sw-browser-panel, .sw-panel-toggle, .sw-menu-toggle')) return
    setPanel(null)
  }

  function handleRootKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape' && panel) { event.preventDefault(); event.stopPropagation(); setPanel(null) }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 't') { event.preventDefault(); event.stopPropagation(); newTab() }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'w') { event.preventDefault(); event.stopPropagation(); closeTab(activeTabId) }
  }

  function handlePageScroll() {
    if (scrollFrame.current !== null) return
    scrollFrame.current = window.requestAnimationFrame(() => {
      scrollFrame.current = null
      const scrollTop = viewportRef.current?.scrollTop ?? 0
      setTabs((current) => current.map((tab) => tab.id !== activeTabId ? tab : {
        ...tab,
        history: tab.history.map((entry, index) => index === tab.cursor ? { ...entry, scrollTop } : entry),
      }))
    })
  }

  return <section className="satwiscape-app" aria-label="Satwiscape browser" onPointerDown={handleRootPointerDown} onKeyDown={handleRootKeyDown}>
    <div className="sw-tab-strip" role="tablist" aria-label="Browser tabs">
      {tabs.map((tab, index) => {
        const entry = currentVisit(tab)
        const active = tab.id === activeTabId
        return <div className={`sw-tab${active ? ' is-active' : ''}`} key={tab.id} role="presentation">
          <button type="button" role="tab" id={`sw-tab-control-${tab.id}`} aria-selected={active} aria-controls={`sw-page-${tab.id}`} className="sw-tab-select" onClick={() => selectTab(tab.id)}>
            <span className="sw-tab-favicon" aria-hidden="true">{entry?.page.kind === 'article' ? '▤' : entry?.page.kind === 'home' ? '✦' : '◈'}</span><span className="sw-tab-title">{entry?.title ?? 'New Tab'}</span>
          </button>
          <button type="button" className="sw-tab-close" aria-label={`Close tab ${index + 1}`} onClick={() => closeTab(tab.id)}>×</button>
        </div>
      })}
      <button type="button" className="sw-new-tab" aria-label="Open a new tab" title="New tab" onClick={newTab}>＋</button>
      <span className="sw-tab-strip-end" aria-hidden="true">SATWISCAPE</span>
    </div>

    <div className="sw-browser-toolbar">
      <div className="sw-navigation-buttons">
        <button type="button" aria-label="Back" title="Back" disabled={!canGoBack} onClick={() => travel(-1)}><ClockMark kind="back" /></button>
        <button type="button" aria-label="Forward" title="Forward" disabled={!canGoForward} onClick={() => travel(1)}><ClockMark kind="forward" /></button>
        <button type="button" aria-label="Refresh" title="Refresh" onClick={refresh}><ClockMark kind="refresh" /></button>
        <button type="button" aria-label="Home" title="Home" onClick={goHome}><ClockMark kind="home" /></button>
      </div>
      <form className="sw-address-form" onSubmit={goAddress}>
        <span className="sw-address-lock" aria-hidden="true">▣</span>
        <label className="sw-visually-hidden" htmlFor="satwiscape-address">Satwiscape address or search</label>
        <input id="satwiscape-address" value={addressDraft} onChange={(event) => setAddressDraft(event.target.value)} onFocus={(event) => event.currentTarget.select()} spellCheck={false} autoComplete="off" />
        <button type="submit" aria-label="Go to address">↵</button>
      </form>
      <button type="button" className={`sw-toolbar-square sw-panel-toggle${panel === 'bookmarks' ? ' is-open' : ''}`} aria-label="Favorites" aria-pressed={panel === 'bookmarks'} title="Favorites" onClick={() => setPanel(panel === 'bookmarks' ? null : 'bookmarks')}><ClockMark kind="bookmark" /></button>
      <button type="button" className={`sw-toolbar-square sw-menu-toggle${panel === 'menu' ? ' is-open' : ''}`} aria-label="Browser menu" aria-expanded={panel === 'menu'} title="Browser menu" onClick={() => setPanel(panel === 'menu' ? null : 'menu')}><ClockMark kind="menu" /></button>
    </div>
    <div className={`sw-load-track${activeTab?.loading ? ' is-loading' : ''}`} aria-hidden="true"><span /></div>
    <div className="sw-browser-viewport" role="tabpanel" id={`sw-page-${activeTabId}`} aria-labelledby={`sw-tab-control-${activeTabId}`} ref={viewportRef} onScroll={handlePageScroll} aria-live="polite" aria-busy={Boolean(activeTab?.loading)}>
      <SatwiscapePageView key={visit.id} visit={visit} onSearch={search} onArticle={openArticle} onPublication={openPublication} onHome={goHome} onBack={() => travel(-1)} canGoBack={canGoBack} />
    </div>
    <footer className="sw-status-bar"><span className="sw-status-connection"><i aria-hidden="true" />{activeTab?.loading ? 'Connecting to the Satwiscape…' : 'Internet connection established'}</span><span className="sw-status-address">{visit.url}</span><span className="sw-status-word">DONE</span></footer>

    <BrowserPanelView panel={panel} bookmarks={bookmarks} history={historyEntries} current={visit} onOpenUrl={openUrl} onRemoveBookmark={removeBookmark} onToggleCurrentBookmark={toggleCurrentBookmark} onClearHistory={clearHistory} onNewTab={newTab} onOpenHistory={openHistoryPanel} onOpenBookmarks={openBookmarksPanel} onOpenAbout={() => setPanel('about')} onClose={() => setPanel(null)} />
  </section>
}
