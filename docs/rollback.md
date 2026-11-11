# Rollback procedure

## Immediate rollback

Disable the separate test-only loader record. Do not edit script 2501 or V2 CSS.
After the record is disabled, open a new private window and verify that these
elements are absent:

- `#betlora-v2-integration-loader`
- `#betlora-v2-probe-css`
- `#betlora-v2-probe-js`
- `#betlora-v2-integration-probe`

## In-session rollback

For diagnostics before disabling the panel record:

```js
window.BetloraV2Integration?.rollback();
```

This removes the probe, its route hooks, and its CSS/JavaScript elements. A page
reload will load them again while the panel record remains active.

## Version rollback

Change only the standalone loader record to a previously verified immutable
tag. Never overwrite files under a released tag. CSS and JavaScript hashes must
be verified separately before reactivation.

## Cache verification

Check a normal reload, a hard reload, and a private window. The requested URLs,
version attributes, SRI hashes, and response headers must all match the selected
release.
