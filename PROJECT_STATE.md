# Satwika OS — project state

## Overview

Satwika OS is a personal, pixel-art desktop environment inspired by the warmth and playfulness of Windows XP. The visual experience is designed as a small birthday world for Satwika.

## Current stage

**Stage 1 — Foundation & Desktop Environment: complete.**

**Visual Refinement 01 — Pixel-Art Consistency, Wallpaper Enhancement & Boot Screen: complete.**

**Stage 2 — Desktop Interactions & Window Management: complete.**

**Stage 3 — Photos Application: complete.**

**Stage 4 — Personal Applications: complete.**

**Stage 5 — Satwiscape Internet Browser: complete.**

**Stage 6 — Message to CD: implementation complete; Production configuration corrected; live anonymous insertion verified; owner inbox sign-in and UI flow still need a browser check.**

**Stage 7 final repair — Junny HQ: birthday story and responsive layouts verified; only one supplied Junny portrait is currently available.**

**Stage 8 — Settings application: complete.**

**Final content replacement — Note For You and Satwiscape: complete.**

**Final asset and content update — complete.**

## Completed features

- React, TypeScript, and Vite project foundation with modular components.
- Original responsive SVG pixel landscape with smoothly blending daytime and nighttime scenes, animated stars, clouds, sun, and moon.
- Local-time wallpaper cycle with the `?satwikaTime=HH:mm` visual testing override.
- Eight custom pixel-art desktop shortcuts with Ctrl/Command multi-selection, marquee selection, group dragging, and session-scoped position retention.
- XP-inspired fixed taskbar, local clock/date, Wi-Fi and charging indicators, and Satwika Start button.
- Navigable calendar popup with current-day highlight, November 16 birthday marker and cake icon, and birthday message.
- Start menu with app shortcuts and Satwika OS branding.
- Session-only boot intro with progress animation and skip control.
- Shared application windows for all eight shortcuts with focus order, titlebar dragging, eight-way resizing, minimize, maximize/restore, close, and viewport clamping.
- Taskbar buttons for open apps with focus switching and minimize/restore toggles. Opening an app again restores and focuses its existing window.
- Keyboard interactions for Enter (open one selected shortcut), Escape (clear desktop selection), Alt+F4 (close the active window), and Delete (open Recycle Bin).
- Custom SVG pixel cursors for the desktop pointer, links/buttons, text, moving windows, and all resize directions.
- Photos app with exactly eight unique supplied PNGs, title-only gallery entries, adjustable pixelated thumbnails, an original-quality viewer, previous/next controls, keyboard navigation, and custom loading/error states.
- Note For You with an animated sealed envelope, a configurable read-only letter, and a notepad-style view.
- Achievements with 10 configurable entries, custom pixel badge artwork, a derived unlocked count, scrolling, and a detail panel.
- Recycle Bin with fictional keepsakes, rotating non-destructive empty-bin notices, and icon-drop protection that restores desktop shortcuts and shows a toast.
- Satwiscape with controlled internal routes, independent tabs and back/forward histories, scroll restoration, address/search navigation, four fictional publications and final articles, configurable hidden pages, and a rotating custom 404.
- SatwiSearch homepage with trending searches and local article links; Favorites and recent history panels persist on this device.
- Message to CD with a 2,000-character multiline editor, validation, local demo persistence, explicit demo/remote labels, confirmed-save success, and retryable failure that preserves the draft.
- Supabase message storage with a typed client, public insert-only privileges, RLS-protected owner operations, password sign-in, and a private owner allowlist.
- A separate owner inbox at `/admin/messages` with newest-first messages, full paragraph formatting, read/unread controls, delete confirmation, and manual refresh.
- A Vercel rewrite for the owner inbox route and `SUPABASE_SETUP.md` with project, database, authentication, environment, deployment, and test instructions.
- Junny HQ keeps the existing Teddy Bear desktop/Start Menu slot and shared window while using an authored, gated birthday story.
- The room uses layered pixel-style SVG scenery, string lights, a window and shelves, a desk lantern, a floor rug, a central table, and the supplied Junny artwork. The cake sits at the tabletop line beside Junny; the dialogue occupies a separate responsive row below the room.
- The single supplied Junny portrait is reused unchanged. Story expressions use distinct pixel marks, a thought bubble, small pose and colour shifts, and celebration effects rather than fabricated photos or manual controls.
- The story includes the birthday greeting, rescue-game memory, cake reveal, lighting, three wish lines and confirmation, blowing out candles, celebration, cutting and serving a slice, hidden message, gift and personal letter, a clear ending, and replay.
- Junny HQ navigation is limited to Home and Profile; Profile retains the official mascot details.
- Birthday dialogue is in `src/config/junny/birthdayDialogue.ts`; gift and hidden-message copy is in `birthdayGift.ts`; profile and notices remain in their dedicated config files.
- The supplied image remains unchanged at `public/assets/junny/junny_pixell_1.png`; one source image is used without inventing extra photos. Room lighting continues to use `useLocalTime.ts`.
- Settings Control Panel with Appearance, Display, Sounds, Personalization, Junny Management, Diagnostics, Experimental Features, and About categories.
- Persistent real settings for automatic/day/night wallpaper, desktop shortcut visibility, pixel cursor, UI/reduced motion, system sound effects and volume, and 12/24-hour taskbar clock. Start Menu access remains available when desktop icons are hidden.
- Junny Management with saved CEO authority, virtual hugs, nap and Recycle Bin protection preferences, cuteness calibration, and the Employee of the Month panel. Recycle Bin protection stays fictional and non-destructive.
- Short local diagnostics and update sequences, version-click developer easter egg, optional humorous notices, and seriousness calibration. Potato Mode, Main Character Mode, and cuteness values are playful preferences; Dramatic Startup is clearly marked as a saved preference with no startup effect in this edition.
- A confirmed Settings-only reset that leaves photos, messages, achievements, and other app content untouched.
- Note For You now contains the supplied final letter in `src/config/noteContent.ts`; the envelope interaction, read-only notepad styling, and scrolling letter view are unchanged.
- Satwiscape now contains exactly five supplied fictional articles across The Daily Satwi, Satwi Science Journal, The Satwi Times, and The Satwika Chronicle. The homepage, article pages, related links, search, and default Favorites use only those articles and publications.
- Stale saved Satwiscape Favorites that resolve to removed pages are filtered during load; current valid favorites are preserved, new defaults are added when stale entries are removed, and publication titles are refreshed.
- Bundled Pixelify Sans and Press Start 2P fonts for local, consistent pixel-inspired type.
- Refined landscape contours with hand-placed grass and flower clusters, textured hill shading, and a smaller cratered moon.
- Rebuilt the taskbar, Start button, tray symbols, calendar controls, and popups with hard-edged pixel surfaces.
- Replaced the card-style boot intro with a minimal black screen and continuously moving green pixel segments.

## Verification completed

- `npm run build` passed after implementation and refinement.
- Visually inspected the desktop at 1366×768 in both day (`?satwikaTime=12:00`) and night (`?satwikaTime=22:00`) modes, including the pixel taskbar and refined hill details.
- Checked Start Menu open, shortcut placeholder feedback, calendar navigation, November 16 birthday marker/message, and outside-click dismissal.
- Dragged a desktop shortcut and confirmed its position remained after a page reload in the same browser session.
- Inspected the black boot screen and moving green segments; used Skip and observed the automatic transition after about 3.7 seconds.
- Confirmed the boot intro does not replay after a reload in the same browser session.
- Checked the browser console for errors; none were reported.
- Built Stage 4 successfully with `npm run build`.
- Confirmed by source inspection that the Recycle Bin only reads its mock configuration and changes in-app message state; it performs no filesystem operations.
- Browser interaction checks for Stage 4 could not be completed because the computer-use bridge failed to initialize (`failed to write kernel assets: The system cannot find the path specified`).
- Built Stage 5 successfully with `npm run build`.
- Confirmed Satwiscape content and four article illustrations are local and that the browser code uses only controlled `satwiscape://` routes; it contains no embedded browser, external fetch, or dynamic HTML execution.
- Exercised the route/search model through Vite's local module loader: birthday and cute searches matched their stories, an unrelated query returned the custom 404, publication/article/secret routes resolved, and an external URL resolved only to the internal 404.
- Confirmed the homepage and all four local article illustrations returned HTTP 200 from the Vite development server.
- Browser interaction checks for Stage 5 could not be completed because the computer-use bridge again failed to initialize (`failed to write kernel assets: The system cannot find the path specified`).
- Built Stage 6 successfully with `npm run build`.
- Exercised the message service through Vite's module loader: verified demo-mode selection, blank and over-limit rejection, surrounding whitespace trimming, paragraph preservation, local persistence, and a storage failure without success.
- Confirmed `/` and `/admin/messages` both return the SPA shell in the Vite development server, and that `vercel.json` contains the inbox rewrite.
- Reviewed the migration and browser services for RLS, insert-only public access, owner authentication, owner-only read/update/delete rules, absence of a frontend service-role key, and preserved drafts on submission error.
- `npm audit --omit=dev` reported zero production dependency vulnerabilities. The full audit still flags the existing Vite/esbuild development toolchain; the available fix requires a Vite major upgrade.
- The current Supabase project is active and healthy. Direct inspection verified `public.messages` columns (`id`, `message`, `created_at`, `is_read`), RLS enabled, all four expected policies, and grants limited to anonymous message insertion plus authenticated owner operations. `private.message_owners` has one row matching an existing Auth user. The message table is currently empty.
- The migration was applied through the SQL Editor: the database objects exist, while Supabase's CLI migration history is empty. This does not affect runtime behavior, but it means the dashboard-applied migration is not recorded as a CLI migration.
- Supabase's initial PostgREST log inspection returned no message-related request events in the inspected window. A later controlled production insert was confirmed in the database and its temporary test row was removed; the `public.messages` table is empty again.
- Exact DEMO root cause: Vercel Production contained the correct Supabase project URL and matching public publishable key, but saved them as `SUPABASE_URL` and `SUPABASE_ANON_KEY`. The Vite app reads only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, so both values were absent at build time and `supabaseClient` was null. The project URL and key were verified against the same active Supabase project; this was not a database, project-mismatch, or RLS failure.
- Added `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to the `sat-os` Vercel Production environment, using the verified project URL and public key. The separate service-role variable remains unprefixed and is not used by browser code. A new Production deployment for commit `90f164d613c2ea24a71f47833e0e03914d585adf` reached READY; a later documentation-only deployment also completed successfully.
- Fetched the live Production page and built JavaScript bundle (HTTP 200). The verified site is `https://sat-os-ten.vercel.app`; `https://sat-os.vercel.app` resolves to a different application. The live bundle contains the configured Supabase project URL, matching public key, and `REMOTE READY` diagnostic, and does not contain the service-role variable name.
- Tested the actual public PostgREST insertion path with the same Production URL/key and `Prefer: return=minimal`, matching the app's `.insert()` without `.select()`. Supabase accepted the insert and SQL inspection confirmed the row. The single synthetic row was then deleted and a follow-up query confirmed zero remaining. An earlier probe requested `return=representation` and was correctly denied because anonymous users have no SELECT privilege; this was a test-header difference, not an app defect, so no grants or RLS policies were changed.
- Added safe configuration diagnostics to Message to CD: the banner identifies missing URL/key, invalid URL/protocol, or client initialization failure without exposing values. A configured client is labeled `REMOTE READY`, and only a successful insert produces the remote success receipt. Remote failures are categorized as network, credentials, database permission, schema, or other Supabase rejection; they preserve the draft and never fall back to local demo storage.
- Verified config states with Vite SSR for both variables absent, each variable missing individually, insecure URL, and whitespace-trimmed HTTPS URL plus a non-empty publishable key. Simulated network, credentials, RLS permission, missing-table, and successful insert responses; failed remote cases did not write local demo data. Local `npm run build` passed, and the fresh Vercel Production build completed successfully. No automated test script or test files are configured. Browser UI automation remains unavailable (`failed to write kernel assets: The system cannot find the path specified`), so the live React form click-through and authenticated owner inbox sign-in were not exercised here.
- Supabase security advisories report that password-leak protection is disabled (separate hardening item). The private allowlist table's RLS-enabled/no-policy advisory is expected: browser roles are revoked, while the security-definer owner helper performs the lookup.
- Confirmed the migration's `public.messages` columns (`id`, `message`, `created_at`, `is_read`) match the generated database types and service queries. The migration grants anonymous insert on `message` only; select, update, and delete are limited to authenticated users, with RLS policies requiring the private owner allowlist. `/admin/messages` additionally checks Supabase Auth and `is_message_owner`; database RLS remains the enforcement boundary. No service-role key is present in frontend code.
- Built the Stage 7 final repair successfully with `npm run build`.
- Reproduced the stuck wish interaction: the button showed “I made my wish” on every wish line, while the state machine only accepts that action on the last line. The panel now offers Continue until the final wish line and only then offers wish confirmation.
- Fixed a shared `.birthday-cake` style collision that reduced the room cake to 10 × 10 pixels. The calendar now has its own icon class; the scene cake is positioned and sized within Junny's room, with its base aligned to the tabletop.
- Verified the full story at 900 × 650, 1200 × 750, and the maximized 1582 × 804 available viewport. Each run reached the final letter, closed it, and replayed; wish labels, lit flames, extinguished candles and smoke, and the served cake slice were checked.
- At all three sizes, the cake stayed within about half a pixel of the tabletop line; the bear and cake had a visible gap, dialogue remained below the scene, and no horizontal overflow occurred. A missing implicit favicon request was identified and replaced with a local Satwika pixel mark; the refreshed browser reported no failed requests, console errors, or uncaught exceptions.
- Checked Junny HQ Home and Profile navigation plus minimize, maximize, restore, taskbar restore, close, and reopen behavior. Minimize preserved the current view; closing and reopening reset it.
- Junny HQ remains in the existing `AppWindow` and app ID; no other OS application behavior was changed.
- Built the final Settings stage successfully with `npm run build`.
- Ran 44 browser interaction checks: Settings launch from desktop and Start Menu; wallpaper, display, sound, personalization, Junny, and experimental controls; diagnostics, local update check and version easter egg; reset keyboard flow and reload persistence. All checks passed, with no uncaught browser exceptions.
- Verified hidden desktop shortcuts leave all eight applications available in the Start Menu; opened Photos, Note For You, Achievements, Recycle Bin, Satwiscape, Message to CD, and Junny HQ through the shared window manager. Recycle Bin reflected Junny's protection setting and remained non-destructive.
- Maximized Settings at 900 × 650, 1200 × 750, and 1582 × 804. The window fit the available desktop area, category navigation remained usable, and the main panel had no horizontal overflow.
- Compared the rendered Note For You message with the supplied wording, opened the envelope, and checked that the full letter including paragraph breaks, emojis, and sign-off is readable through the existing scroll area.
- Opened all four Satwiscape articles through the homepage and direct controlled routes; verified headlines, publication names, authors, bylines, and exact article bodies. The Deepak note retains its line breaks.
- Searched for Junny, Satwika, Deepak, and Dishen and confirmed relevant new stories appear. Checked the four-item homepage, all related article IDs, and the stale-Favorites migration; old sample stories and publication links are absent.
- Ran 34 content/browser checks and the production build successfully. The browser console reported no errors; all four article bodies and the complete letter matched the supplied text exactly.
- Replaced the Photos placeholders with the eight supplied PNGs, copied byte-for-byte. The gallery and viewer show each photograph with its title and no dates, captions, or descriptions.
- Removed the Junny Scrapbook tab, view, component, metadata, and styles. The Home and Profile views remain in Junny HQ, with the birthday story and mascot art retained.
- Added Article #5 by Jathin to The Satwika Chronicle with the supplied headline and body text exactly. The article is part of the shared homepage, publication listing, route, related links, and search index; five final articles remain configured.
- `npm run build` passed after the final asset and content update. The eight image files and their PNG signatures were checked against the supplied assets.
- Built Stage 2 successfully with `npm run build`.
- Manually checked marquee and additive selection, group dragging, shortcut double-click and Enter launch, Delete to Recycle Bin, Escape clearing, window drag/resize/maximize/restore/minimize/close, taskbar switching and toggles, and Alt+F4.
- Confirmed the custom cursor rules resolve to the corresponding SVGs and the browser console has no errors.
- Rechecked Start Menu launch and the November 16 birthday calendar marker after Stage 2 changes.
- Built Stage 3 successfully with `npm run build`.
- Launched Photos from both the desktop and Start Menu; opened all 12 album entries and confirmed each uses the same supplied PNG.
- Checked the pixelated/original toggle, pixelation slider, previous/next buttons with wraparound, arrow-key navigation, Escape return, and a no-op click on the displayed image.
- Resized Photos to a compact window, maximized/restored it, and verified taskbar minimize/restore and close/reopen behavior.
- Temporarily used a missing image path to verify the custom unavailable-photo state, restored the real path, and confirmed all 12 thumbnails loaded again.
- Checked the browser console for errors; none were reported.

## Pending features

- Manually open the Production app, verify `REMOTE READY`, submit a real message, and confirm it appears in `/admin/messages`; the live anonymous API insert and database receipt are already verified, but browser UI and owner-authenticated inbox interaction could not be exercised by the unavailable browser bridge.
- Any additional stages requested by the project owner.

## Known bugs

- No open Junny HQ defects remain from this repair pass. The Message to CD DEMO cause is fixed and its live public insertion path is verified; the remaining check is an interactive browser submission and owner inbox sign-in.

## Architectural decisions

- React + TypeScript + Vite, with functional components and CSS in `src/styles/global.css`.
- Pixelify Sans and Press Start 2P are bundled locally through Fontsource; no runtime Google Fonts request is required.
- The landscape is an original inline SVG so day/night layers can blend without swapping unrelated images.
- Browser local time controls wallpaper lighting and taskbar date/time; the optional URL time parameter only overrides wallpaper lighting.
- Boot completion and icon positions are scoped to the current browser session using `sessionStorage`.
- Desktop app labels and associated descriptions live in one app config; custom shortcut artwork is kept alongside the desktop icon component.
- `useWindowManager` owns shared app-window state; each app has one reusable window that is restored and focused on repeated launch.
- `src/config/photos.ts` owns the order and short titles for the eight unique original images stored in `public/assets/photos/`.
- Satwiscape tab histories and scroll positions are kept in the app session; Favorites and the recent-history panel use `satwiscape.bookmarks.v1` and `satwiscape.history.v1` in localStorage.
- Satwiscape articles, publications, search rules, hidden pages, and initial favourites live in separate files under `src/config/satwiscape/`; article artwork is local SVG in `public/assets/satwiscape/`.
- Supabase URL and public key are read from `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `src/config/supabase.ts`; there is no service-role key in frontend code.
- Public Message to CD submissions use `src/services/messageService.ts`; owner authentication and inbox actions use `src/services/adminMessageService.ts`. The demo storage key is `satwika.message-to-cd.demo.v1` and is device-local only.
- Owner message access is enforced by `supabase/migrations/20261113000000_create_message_inbox.sql`, not by the inbox route or client UI. The `private.message_owners` table contains the owner allowlist and stays inaccessible to browser roles.
- `vercel.json` rewrites `/admin/messages` to the single-page app entry point. `SUPABASE_SETUP.md` documents the required project configuration before remote delivery is active.
- Junny's birthday and identity data is split across `src/config/junny/birthdayDialogue.ts`, `birthdayGift.ts`, `profile.ts`, and `announcements.ts`; mascot art belongs in `public/assets/junny/`.
- Junny HQ retains the existing app ID `teddy` so the current shortcut, Start Menu entry, and shared window behavior remain connected; its visible app name is now `Junny HQ`.
- Junny HQ uses `useLocalTime.ts` for room lighting and the supplied mascot art unchanged across the birthday room and profile.
- OS preference defaults and validation live in `src/config/settings.ts`; `src/context/SettingsContext.tsx` loads, persists, resets, and synchronizes the single `satwika.os-settings.v1` localStorage record. Settings are loaded before the desktop so the first render uses saved preferences.
- Real OS preference effects stay connected to their existing owners: `useLocalTime.ts` controls wallpaper lighting, `Desktop.tsx` controls shortcut visibility, `App.tsx` applies cursor and motion modes, `Taskbar.tsx` formats the clock, `systemSounds.ts` plays opt-in UI tones, and `RecycleBinApp.tsx` displays Junny's protection flag.
- The Settings interface and its fictional copy live in `src/components/settings/SettingsApp.tsx` and `settings.css`. Add a preference by extending `OsSettings` and `DEFAULT_SETTINGS`, adding safe parsing in `parseSettings`, providing its control and feedback in Settings, and connecting it to the existing OS component that owns the behavior. Do not add scattered localStorage reads.
- Experimental personality choices are explicitly fictional; Potato Mode does not degrade visuals, Main Character Mode only offers an optional message, cuteness and seriousness are display preferences, and Dramatic Startup does not change this edition's boot sequence. Update checks are local-only and never contact a server.
