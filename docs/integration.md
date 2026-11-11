# Betlora V2 integration v0.1.0

## Verified boundary

- Allowed hostname: `test.betlora.com`
- Verified origin: `https://test.betlora.com`
- Platform environment flags: `site_variant=test`, `is_test_website=true`
- Existing script 2501, `49-test.css`, and `49-test.json` are not modified.

## Delivery chain

1. Versioned files are built in `dist/v0.1.0/`.
2. The immutable Git tag `integration-v0.1.0` is used by jsDelivr.
3. A separate test-only panel record loads `betlora-v2-loader.js`.
4. The loader validates the hostname before requesting CSS or JavaScript.
5. SRI hashes independently verify the loader, CSS, and probe JavaScript.

The panel record must not be created or enabled without explicit approval.

## Existing platform order

The observed document order is:

1. Next.js chunk styles.
2. Bootstrap and the platform's `general.css`, `main.css`, and
   `theme-variables.css`.
3. `49-test.css`.
4. Later route-specific Next.js styles.
5. Platform scripts and an inline copy of script 2501.

No GitHub or GitHub Pages asset from this repository was requested by the test
page before this release.
