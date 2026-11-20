# Pizzazz local product verification

20 November 2026. Local candidate based on the library's `d265b1d` source. Not a published package or deployed demo.

## Grounded changes

The demo previously embedded a separate copy of the library. It now bundles the real library source together with a locally built Lucide interface. Text preset buttons select the thirteen existing decorative particle presets; the particles and custom-character API remain artwork, rather than interface icons. The demo has a keyboard/touch preview button, labelled settings with pressed states, an ordered size range, reset, generated code and explicit copy success/failure feedback. Phone flow places preview, settings and code in that order. No framework or runtime dependency was added to the library.

The library's earlier `addPizzazz(target = document)` evaluated `document` before its SSR guard. Omitting the target in server rendering now returns a harmless cleanup function. The existing TypeScript-declared default export now exists in both built formats, alongside the named exports. Zero-coordinate keyboard clicks are centred on their target; direct client-coordinate calls have a valid fallback. Decorative particle containers are hidden from assistive technology, and reduced-motion preference suppresses particle creation. The effect names, glyph artwork, options, CSS easing, DOM/CSS animation approach, listener cleanup and ordinary pointer behaviour are preserved.

Copied code uses JSON string escaping so quotes, backslashes and line breaks in custom text remain valid JavaScript. Copy feedback waits for the actual clipboard promise, with a manual-copy instruction on failure. Moving a size endpoint across its neighbour moves the other endpoint too, preventing the demo from producing an inverted range. Preset and trigger changes rebind the actual library listener.

## Source and build checks

- All nineteen Jest cases pass, including the existing library tests and regressions for SSR/default export, keyboard coordinates, client-coordinate fallback, decorative accessibility, reduced motion, snippet escaping, size ordering and rejected clipboard writes.
- All eleven unchanged shared icon regressions pass. Normal test and normal build enforce the icon policy; lint runs the source guard.
- Source guard: zero blocking findings. Twenty-eight review candidates are fourteen decorative particle glyph definitions (thirteen presets plus fallback) in source and their duplicate in the generated demo bundle. The demo's UI controls use text labels and named Lucide icons.
- Both package formats and the demo build successfully. Direct Node imports of built ESM and CommonJS files confirm matching named/default APIs and safe SSR calls.
- Full dependency audit: initial thirteen findings, including one critical, to zero after compatible package updates. Lucide and TypeScript are development dependencies; the library has no runtime dependency on either.
- Local static preview is served from a new loopback-only origin. No backend, database, account, model provider, generation or publishing operation was run.

## Limits

The hover mode is pointer-based; the native preview button remains the keyboard and touch alternative. Cleanup detaches the listener while existing particles finish their configured duration. Presets named spring and bounce are CSS curves, not physics. No byte-size, measured frame-rate, cross-browser or assistive-technology certification is claimed. Finer simulation or component-framework expansion is outside this batch.

## Actual browser checks

Chrome desktop at 1144px and a 390 by 844px phone-sized viewport showed no document overflow. All phone buttons and range inputs measured at least 44px high. The rendered controls included all thirteen preset choices and six named Lucide SVGs. Phone order is preview, settings, then copyable code.

- Enter on the real preview button created eight decorative particles at its actual horizontal centre: both the button centre and particle container measured 407px in the desktop view. The container had `aria-hidden="true"`. A later read confirmed no particle containers remained.
- Hover mode retained a native keyboard alternative: Space on the preview button produced eight particles. Physical pointer-hover cadence was covered by the existing throttle unit cases; no cross-device hover claim follows from a phone-sized viewport.
- Keyboard End on the lower size endpoint moved both endpoints to 40px and generated `[40,40]`; Home on the upper endpoint moved both to 10px and generated `[10,10]`.
- Custom text containing an apostrophe and backslash was safely escaped in the displayed code. Actual clipboard contents matched that code, and focus remained on Copy code after Enter. The phone install control copied the exact install command and retained focus too. Clipboard denial is covered by mocked rejection, not a changed browser permission.
- Phone Fire selection, the labelled gravity switch and native Spring selector updated the actual generated configuration. Reset restored Stars, no custom text, gravity off, default easing and default snippet.
- Temporary viewport overrides were reset to 1144px before browser handoff. No owner tabs were touched.

Captures in `.codex-artifacts/` are actual unreleased local views: `pizzazz-desktop-playground.jpg`, `pizzazz-desktop-controls.jpg`, `pizzazz-phone-intro.jpg`, `pizzazz-phone-playground.jpg`, `pizzazz-phone-settings.jpg` and `pizzazz-phone-code.jpg`. They show the tool itself, with no AI-generated output or fabricated activity. Reduced-motion suppression was verified through the unit boundary; the browser's operating-system preference was not changed. Physical touch, broad assistive-technology behaviour and other browsers remain unverified.
