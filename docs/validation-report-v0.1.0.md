# Integration validation report v0.1.0

Date: 2026-11-11 (Europe/Istanbul)

| Check | Status | Evidence |
|---|---|---|
| Exact test hostname | Verified | Browser `location.hostname` is `test.betlora.com`. |
| Test environment flags | Verified | `site_variant=test` and `is_test_website=true`. |
| Existing test CSS | Verified | `49-test.css` is document stylesheet index 30. |
| Existing test JSON reference | Verified | Next.js bootstrap data references `49-test.json`. |
| Existing script 2501 | Verified | Panel editor and rendered inline script were compared by length and header. |
| Existing records unchanged | Verified | No panel publish/update/toggle action was used. |
| CSS/JS independence | Verified | Separate release files and separate SHA-256/SRI values. |
| Production-host refusal | Verified | Contract test on `betlora305.com` created no API or DOM node. |
| Singleton mounting | Verified | Repeated evaluation and 20 simulated route changes produced one probe. |
| Removal | Verified | `unmount()` removed the probe and route hooks in tests. |
| MutationObserver absence | Verified | Static and runtime contract tests. |
| Non-blocking UI | Verified live | CSS uses `pointer-events: none`; the desktop indicator did not cover navigation. |
| jsDelivr MIME/CORS | Verified | Candidate JavaScript and CSS return the correct MIME, CORS `*`, CORP cross-origin, and `nosniff`. |
| Candidate CDN URLs | Verified | All three immutable tag URLs return 200 and match the release SHA-256 values byte-for-byte. |
| Actual test-domain CSP | Verified | Authenticated browser execution loaded and ran the tagged loader, CSS, and JavaScript without CSP rejection. |
| Live Next.js route test | Partially verified | Home, promotions, VIP, and sports passed singleton checks. Casino failed the lifecycle check and later displayed the platform's client-side error screen. |
| Full script 2501 local backup | Verified | Private, lossless gzip/Base64 backup restores to 60,927 characters / 61,239 UTF-8 bytes and matches the panel source SHA-256 `5dfec8ddd21882e832a456596cdaeebc3a0c6a0c43baef8c5d7f42419353e1f0`. It remains outside the public repository. |

## Observed cache behavior

- `49-test.css` and `49-test.json`: `max-age=604800`.
- Tagged jsDelivr release assets: `max-age=31536000`,
  `s-maxage=31536000`, `immutable`.
- Immutable release tags and SRI are therefore required; released files must
  never be overwritten.

## Release gate

Do not enable the panel loader until the branch and `integration-v0.1.0` tag are
published, every candidate URL returns 200 with the expected MIME/CORS headers,
and their bytes match `releases/v0.1.0.json`.

The approved live validation was performed under panel record `3443`. See
`docs/live-loader-validation-v0.1.0.md`. Redesign work remains blocked until the
general panel record is deactivated and the casino/mobile checks pass.
