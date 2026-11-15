# Satwika OS — development instructions

These are permanent instructions for future AI coding sessions in this project.

1. Understand natural-language requests, including informal, conversational, and imprecise requests.
2. The user may not know programming terminology. Never require technical wording to make changes.
3. Interpret requests by their intended outcome, not only by their literal wording.
4. Inspect existing components and code before modifying them.
5. Preserve existing functionality unless the user asks to change it.
6. Make targeted changes instead of unnecessarily rewriting whole components.
7. Never silently remove existing features.
8. Ask for clarification only when it is genuinely necessary; otherwise use reasonable judgment and keep moving.
9. Avoid unnecessary dependencies and overengineering.
10. Keep components modular and reusable.
11. Maintain the established pixel-art aesthetic and Satwika OS identity: use small deliberate pixel clusters, stepped borders and hard-edged shadows; avoid glossy gradients and soft decorative blur.
12. Run appropriate checks after modifications and report what was checked.
13. Update project documentation after significant changes and at the end of each development stage.
14. Explain important changes in simple language.

## Project-specific conventions

- Keep wallpaper art in `src/components/desktop/PixelLandscape.tsx` and its palette/conventions in `DESIGN_SYSTEM.md`.
- Keep the desktop app list in `src/config/desktopApps.ts` and icon art in `src/components/desktop/DesktopIcon.tsx`.
- Keep time and day/night calculations in `src/hooks/useLocalTime.ts`.
- Load `Pixelify Sans` and `Press Start 2P` locally through Fontsource. Use Pixelify Sans for readable interface text and reserve Press Start 2P for short headings.
- Keep taskbar symbols pixelated SVGs and taskbar surfaces built from flat colour blocks or hard-edged repeating pixel patterns.
- The `?satwikaTime=HH:mm` URL parameter is a development-only visual override for the wallpaper cycle. The taskbar clock always reflects local system time.
- Implement only features requested for the current stage; keep later-stage app experiences deferred until requested.
- Keep Photos metadata and order in `src/config/photos.ts`; store original image assets in `public/assets/photos/` and reuse a shared path when gallery entries share one image.
- Keep the Note For You letter and document title in `src/config/noteContent.ts`; the notepad view must stay read-only.
- Keep achievement copy, badge kinds, colours, dates, and ordering in `src/config/achievements.ts` so the collection can be edited without changing its UI.
- Keep fictional Recycle Bin entries and rotating refusal messages in `src/config/recycleBin.ts`; the app must never access or alter the real filesystem.
- Keep app state mounted while a shared window is minimized; closing the window may reset that app's in-window state.
- Keep Satwiscape articles, publication identities, search suggestions/rules, secret-page triggers, and initial favourites in `src/config/satwiscape/` so placeholder content can be replaced without editing browser views.
- Keep Satwiscape navigation confined to its controlled `satwiscape://` routes and local assets; never embed a browser engine, fetch external pages, or execute article/search text as markup or code.
- Keep Message to CD storage selection and public submission in `src/services/messageService.ts`; keep Supabase URL/key handling in `src/config/supabase.ts` and owner inbox operations in `src/services/adminMessageService.ts`.
- Never expose a Supabase service-role key to browser code. The public message role may insert valid messages only; owner reads, read-state changes, and deletes must remain enforced by database RLS and the private owner allowlist.
- Keep the owner inbox at `/admin/messages`; route handling must not replace authentication or database authorization. Demo submissions must be labeled as local-only and must never be reported as remotely delivered.
- Keep Junny HQ birthday dialogue, gift copy, profile, and notices in their dedicated files under `src/config/junny/`; use supplied mascot art unchanged and do not invent or duplicate photos.
- Keep Junny HQ inside the existing shared `AppWindow` under the existing Teddy Bear app ID. Limit navigation to Home and Profile. Let the birthday flow drive character and cake states, reserve a separate layout row for dialogue, and derive room lighting from `useLocalTime.ts` instead of creating a second clock.
