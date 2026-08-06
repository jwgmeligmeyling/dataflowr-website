# Review screenshots

Before/after comparison images for the PRs that split #1
(`claude/localhost-setup-fac293`) into eight isolated changes.

Each image is a side-by-side render at 1440x950, deviceScaleFactor 2, with
`prefers-reduced-motion: reduce` so the scroll-reveal animations sit at their
final state. Left panel is the PR's base branch, right panel is the PR head, so
every pair isolates exactly one change.

This branch carries no application code and is not meant to be merged.

## `screenshots-rebased/`

Tweede ronde, na het losmaken van de stapel. Elke openstaande PR staat nu
rechtstreeks op `main`, dus `main` is voor alle PRs de enige "voor"-toestand.
Links `main`, rechts de PR.

De eerdere set in `screenshots/` hoort bij de gestapelde versie en klopt niet
meer als referentie: daar was "voor" telkens de vorige PR in de stapel.
