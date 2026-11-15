# Satwika OS — design system

## Visual direction

A nostalgic, personal pixel-art desktop with the warmth of Windows XP. Wallpaper, shortcuts and system chrome should read as one illustrated world. Build with deliberate pixel clusters, stepped silhouettes and flat colour bands. Avoid glass, glossy gradients, soft decorative blur and rounded web-card shapes.

## Colour palette

| Role | Colour | Use |
| --- | --- | --- |
| Day sky | `#58b4e9`, `#83d0f1`, `#69bfe9` | Layered blue sky |
| Day hills | `#4d9658`, `#62aa5b`, `#78bd63`, `#94ce70` | Distance, slopes and foreground |
| Moonlit hills | `#293f4d`, `#2f5949`, `#386a4b`, `#467b53` | Night layers |
| Night sky | `#0d183b`, `#14234c`, `#203861` | Banded deep blue sky |
| Satwika pink | `#f6a4ba`, `#e89cad` | Flower and personal accents |
| Warm light | `#fff8df`, `#ffedaf`, `#ffe99a` | Text, stars and moon/sun |
| Taskbar blue | `#286eae`, `#2b74b2`, `#174d7b` | Pixel patterned taskbar and panels |
| Start green | `#328f39`, `#76d56a`, `#1f642b` | Start button layers |

## Typography

- Bundle `Pixelify Sans` locally with Fontsource and use it for interface text, labels, dates and buttons. It keeps a pixel character while remaining readable at small sizes.
- Use bundled `Press Start 2P` for short display headings such as the boot title. Do not use it for long text or compact numeric controls.
- Keep system labels and calendar content readable; use weight and pixel borders rather than tiny all-caps lettering for hierarchy.

## Pixel construction

- Use `shape-rendering: crispEdges` and `image-rendering: pixelated` for pixel artwork.
- Build landscape contours from short stepped runs and add a limited number of intentional highlights, grass clusters and environmental details.
- Keep scene texture sparse and placed by hand. Do not add random noise or dense one-pixel patterns.
- Use CSS repeating gradients only with hard colour stops to create square tile patterns. Avoid smooth gradient fills and blurred shadows.
- Use small, square, offset shadows and stepped borders on system chrome and popups.
- Reserve translucent states for interaction selection; keep normal interface surfaces opaque and crisp.

## Icons

- Desktop shortcuts use custom SVG pixel art in `src/components/desktop/DesktopIcon.tsx`.
- Use compact pixel SVGs for system tray and calendar controls. Avoid outline icon libraries for small system chrome.
- Keep outlines dark plum or navy and use each app's restrained accent colour.

## Taskbar

- Fixed to the bottom edge and 48px high at desktop sizes.
- Use a flat blue base with hard-edged horizontal pixel bands and a segmented top highlight.
- The Start button is green, square-cornered, stepped at the top edge, and uses the Satwika flower mark.
- Use crisp separators and a recessed blue system tray. Keep the clock and date readable in Pixelify Sans on two lines.
- Running applications use compact pixel buttons in the open center area. Keep their selected and minimized states clear while preserving the 48px taskbar height.

## Desktop interactions and windows

- Desktop shortcuts support Ctrl/Command additive selection, drag selection, group movement, and session-scoped position retention. Selected shortcuts rise above unselected shortcuts while they overlap.
- Use one shared window frame for the desktop apps: square navy border, hard offset shadow, patterned blue titlebar, cream content, pixel app icon, and compact minimize/maximize/close controls.
- Windows remain above the wallpaper and shortcuts and below the taskbar and system popups. Their titlebar moves them; eight edge and corner handles resize them within the desktop bounds.
- Use the existing app icon art inside each window and taskbar button. Placeholder app copy should stay concise until a later stage builds the app experience.
- System cursors are small SVG pixel sprites in `public/cursors/`: arrow, hand, text, move, vertical resize, horizontal resize, and both diagonal resize directions. Keep hotspots aligned with the visible pointer tip or center.

## Photos application

- Keep the album as a compact desktop application inside the shared window manager. Use cream album surfaces, navy pixel frames, restrained rose accents, and the app's existing Pixelify Sans typography.
- Thumbnails use the same aspect-ratio-preserving frame, hard pixel borders, concise two-line labels, and a subtle selected state. The gallery must scroll within its window rather than overflow sideways.
- Pixel previews are downsampled from the original in memory and enlarged with nearest-neighbour rendering. Keep the original source file unchanged and show it with `object-fit: contain` in the viewer's Original mode.
- The viewer uses a dark neutral stage, minimal transport controls, and a small metadata panel. On narrow windows, stack the panel below the image and keep the viewer vertically scrollable.
- Keep photo paths and editable metadata in `src/config/photos.ts`; assets belong in `public/assets/photos/`. Missing sources use the in-app pixel placeholder instead of a browser broken-image icon.

## Personal applications

- Note For You uses warm paper, rose and plum colours, stepped envelope artwork, a short flap-and-letter reveal, and a read-only ruled notepad. Keep the message in `src/config/noteContent.ts`; the app view contains no editable document controls.
- Achievements uses custom crisp SVG badges, a compact scrollable grid, cream cards, and a plum heading band. Keep badge kind, accent, copy, unlock date, and order in `src/config/achievements.ts`.
- Recycle Bin uses flat sage and blue-green surfaces with a fictional keepsake list. Its entries and rotating refusal text live in `src/config/recycleBin.ts`. Empty actions only show an in-app notice, and desktop drops on its shortcut restore the dragged icons and show a toast.
- Keep all three apps inside the shared `AppWindow`; minimized app views stay mounted so their current screen is restored with the window. Close may reset the app experience.

## Satwiscape browser

- Keep Satwiscape inside the shared OS window. Use a compact XP-era tab strip and toolbar, hard-edged pressed states, a local address field, and a pixel-pattern progress/status surface.
- Browser pages use warm paper backgrounds, muted blue-green browser chrome, crisp plum/navy outlines, small square shadows, and a readable mix of Pixelify Sans controls with occasional editorial serif headlines.
- Keep all routes inside the controlled `satwiscape://` scheme. Article illustrations are local SVGs in `public/assets/satwiscape/`; do not embed an external browser or load arbitrary URLs.
- Keep article copy in `src/config/satwiscape/articles.ts`, publication identities in `publications.ts`, trending queries, match rules, and 404 copy in `searchConfig.ts`, hidden page triggers/content in `easterEggs.ts`, and initial favourites in `bookmarks.ts`.
- Keep each tab's current route, back/forward list, and per-page scroll positions isolated in Satwiscape state. Persist only favourites and the recent-history panel in localStorage.
- Label every fictional article clearly as fiction. Do not add real photographs or personal claims about Satwika.

## Message to CD

- Keep the message editor inside the shared application window, with warm ruled-paper surfaces, a compact pixel envelope, rose and plum accents, square borders, and hard offset shadows.
- Keep the text editor as the main focus; its content area must scroll comfortably inside normal and maximized windows, preserve line breaks, and retain a readable character counter and storage-mode notice.
- Clearly distinguish device-only demo saves from confirmed remote Supabase saves. The success view must follow the actual storage response.
- Keep the owner inbox as a separate `/admin/messages` page, outside the desktop app list. Use Supabase Auth and database RLS for access; never treat the route or hidden UI as security.

## Junny HQ

- Keep Junny HQ inside the existing shared desktop window. The birthday home uses a warm room built from layered crisp SVG shapes: a detailed window, shelves, framed mascot art, string lights, bunting, a desk lantern, wooden furniture, a rug, and a central birthday table.
- Keep the cake on the table with its base aligned to the tabletop; position Junny beside it and layer the table front over his lower body. Keep the dialogue in its own responsive grid row below the scene so neither face nor cake is covered.
- Keep only Home, Scrapbook, and Profile navigation. The birthday story is the default home; no manual expression controls, checklist, or surprise section should return unless requested.
- Use the supplied mascot file in `public/assets/junny/` unchanged. Preserve its aspect ratio with `object-fit: contain` and nearest-neighbour rendering. Do not create substitute or duplicate scrapbook photos.
- Keep the authored birthday script in `src/config/junny/birthdayDialogue.ts`, the editable letter and hidden message in `birthdayGift.ts`, profile in `profile.ts`, scrapbook metadata in `photos.ts`, and official notices in `announcements.ts`.
- Let the explicit birthday flow drive Junny's expressions and cake stages. Continue through each wish line before offering wish confirmation; then keep lighting, blowing, cutting, and opening the present in order. Do not restore manual character-state controls or random dialogue.
- Derive the room's day, evening, and night appearance from the existing `useLocalTime` hook. Keep character reactions brief and respect `prefers-reduced-motion`.

## Popups and controls

- Start Menu, calendar and notices use square corners, multi-pixel borders and offset shadows with no blur.
- Use flat blue title bands and cream content surfaces, with pixel-pattern bands sparingly.
- Selected dates, hover states and focus outlines must remain obvious against both paper and blue surfaces.

## Wallpaper and animation

- Preserve the wide rolling-hill composition and responsive `xMidYMid slice` viewBox behavior.
- The same day/night hill contours use separate colour layers; blend them through the existing local-time opacity value.
- Stars appear only in the night layer and twinkle through opacity changes rather than scaling, preserving their crisp pixel edges.
- The sun and moon are compact stepped pixel clusters without soft blur filters.
- Respect `prefers-reduced-motion`. Boot duration stays around 3.7 seconds and its green segments continue moving until completion or skip.

## Settings Control Panel

- Keep Settings inside the existing shared application window. Build its interface in `src/components/settings/SettingsApp.tsx` and `settings.css`; do not create a second window or replace the desktop shell.
- Use the established blue pixel title band, cream content area, plum category rail, square borders, restrained repeating pixel bands, and hard-edged shadows. Keep controls compact but readable in Pixelify Sans; reserve Press Start 2P for short labels.
- Keep category navigation and the main panel independently scrollable. The main content may scroll vertically, but must not overflow horizontally. Use the existing app container width for responsive breakpoints so resized windows adapt without relying on the desktop viewport.
- Use native buttons with visible focus outlines, switch roles and checked state for toggles, labelled range inputs with visible values, and pressed states for segmented choices. Keep the reset confirmation keyboard-operable and clearly state that app content is not removed.
- Show brief status feedback beside the relevant settings. Diagnostics and update checks may use short pixel scanning effects; avoid long or intrusive animation, and respect the shell's motion preference.
- Keep saved preference types, defaults, and validation in `src/config/settings.ts`; the context in `src/context/SettingsContext.tsx` owns persistence under `satwika.os-settings.v1`. Add controls to Settings and connect real effects through the existing component or service that owns that behavior. Do not scatter localStorage access through views.
- Functional controls include automatic/day/night wallpaper lighting, desktop shortcut visibility, pixel cursor, UI/reduced motion, system sound toggle and volume, and taskbar clock format. Junny protection only changes its status in the fictional Recycle Bin; it does not affect real files.
- Mark playful preferences and local-only sequences honestly. Potato Mode does not reduce artwork quality, Main Character Mode only displays an optional message, cuteness and seriousness are fictional display values, Dramatic Startup is preference-only in this edition, and update checks never contact a server.
