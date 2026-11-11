# Live loader validation v0.1.0

Date: 2026-11-11 (Europe/Istanbul)

## Panel record

- Record ID: `3443`
- Name: `betlora-v2-loader-test`
- Operator: `Loki`
- Immutable release: `integration-v0.1.0`
- Host lock: exact match for `test.betlora.com`
- Existing record `2501`, `49-test.css`, and `49-test.json`: unchanged
- Test flag after validation: off
- V2 flag after validation: off
- General record state after validation: still active; the panel exposes the
  remaining reversible state change as `Sil` / `Aktifleştir`.

## Results

| Check | Status | Evidence |
|---|---|---|
| Exact hostname lock | Verified | Runtime diagnostics reported `test.betlora.com`; the inline bootstrap returns before loading on every other hostname. |
| Tagged CDN assets | Verified | The live page loaded the loader, CSS, and JavaScript from `integration-v0.1.0` with SRI. |
| CSP / CORS | Verified | Browser execution completed and both tagged assets mounted; there was no CSP or CORS rejection. |
| Home | Verified | One loader and one visible probe; diagnostics version `0.1.0`. |
| Promotions | Verified | SPA navigation reached `/tr/promotions/active`; loader/probe counts remained one. |
| VIP | Verified | SPA navigation reached `/tr/vip-club`; loader/probe counts remained one. |
| Sports | Verified | `/tr/sportsbook` loaded one loader and one probe. |
| Casino | Failed | A clean `/tr/casino/lobby` load contained loader/CSS/JS but initially no probe. A later casino transition produced the platform's own client-side error screen; this route is not release-ready. |
| Duplicate prevention | Verified on passing routes | Home, promotions, VIP, and sports never exceeded one probe. |
| Pointer safety | Verified | Live computed style was `pointer-events: none`. |
| Desktop visual check | Verified | The indicator rendered at the upper-right without covering navigation. |
| Mobile visual check | Not verified | The requested 390x844 browser override did not apply to the existing Chrome session; the attempted capture remained 1920px wide and coincided with the casino client-side error. |
| Console during home/promotions/VIP | Verified | No captured errors or warnings during the successful SPA route checks. |
| Console after rollback reload | Partially verified | Three existing Next.js chunk `TypeError: network error` entries were captured; attribution to the loader was not established. |
| Immediate in-page rollback | Verified | `rollback()` removed the probe, CSS, and probe JavaScript from the current document. |
| Persistent panel rollback | Incomplete | Test and V2 flags are off, but fresh documents still receive the generally active record. Final reversible deactivation requires the panel's `Sil` action for record `3443`. |

## Safety stop

The casino lifecycle failure triggered the agreed stop condition. No redesign
work was started. The test and V2 flags were disabled immediately. The record
was not deleted or generally deactivated because the remaining panel control is
labelled `Sil`; using that destructive-looking control requires explicit
confirmation even though the UI indicates it can later be restored with
`Aktifleştir`.

## Browser observations

- The application replaces header/sidebar DOM nodes on SPA navigation.
- The loader remained singleton on successful route transitions.
- Panel changes did not invalidate the application-side script cache
  immediately; cache-busted reloads still received the generally active record.
- The loader's own rollback removes mounted assets immediately, but it cannot
  prevent the panel from injecting the bootstrap into a new document while the
  general record state remains active.

## Next gate

Do not start the homepage redesign. First generally deactivate record `3443`,
confirm a clean reload contains zero loader/CSS/JS/probe nodes, and repair or
explain the casino route lifecycle failure. Repeat mobile verification in a
browser session that accepts a 390x844 viewport override.
