# Page lifecycle

The test application uses Next.js client-side navigation. Script 2501 currently
uses two document-wide `MutationObserver` instances. The v0.1.0 probe does not
copy that approach.

The probe is mounted outside the Next.js content root and is protected by a
stable ID. It listens to browser navigation events and uses a small
`pushState`/`replaceState` fallback only when the Navigation API is not
available. Every mount checks for the existing element first.

Acceptance criteria after panel activation:

- One probe after the initial page load.
- One probe after each tested client-side route transition.
- No repeated CSS or JavaScript elements.
- No blocked buttons or navigation.
- No console, CSP, SRI, CORS, or mixed-content errors.
- `BetloraV2Integration.diagnostics()` reports the pinned version and one probe.
