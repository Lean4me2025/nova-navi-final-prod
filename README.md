# NOVA purpose discovery

A static NOVA web experience for collecting everyday clues, selecting work areas and strengths, exploring purpose roles, and sharing or comparing paths.

## Main flow

1. `index.html` introduces NOVA and explains its approach.
2. `signals.html` collects optional everyday clues. Written answers stay in the browser's local storage.
3. `categories.html` and `traits.html` collect work areas and strengths.
4. `roles.html` ranks profiles from `data/ooh_occupations.json` and explains which clues overlapped.
5. `reveal.html` displays the selected purpose role and lets the person create a share link.
6. `compare.html` compares a shared path with the visitor's own profile.

## Occupation data

`data/ooh_occupations.json` contains 342 occupation profiles derived from the user-provided U.S. Bureau of Labor Statistics Occupational Outlook Handbook export. BLS occupation pages are linked directly from role cards. Wage references are May 2024; employment projections cover 2024–34. The ranking is a transparent keyword and category overlap, not a validated psychometric or predictive model. NOVA suggestions are exploratory and do not promise fit, income, or employment.

## Before launch

- Create a separate $9.99 NOVA access product in Payhip (or the chosen checkout provider) and wire its URL into the site.
- Implement server-side purchase verification and an entitlement check before describing NOVA as paid or locked. The present static pages and browser local storage cannot securely verify purchases.
- Replace the current local-storage PIN login with a real authentication provider before relying on user accounts or saved results across devices.
- Review the final copy, privacy policy, BLS attribution, and the anonymous early-user examples with their participants.
- Deploy to the Vercel project after configuration and smoke-test production routes.

## Local preview

Serve this directory with a static web server and open `index.html`. `roles.html` fetches the JSON data file, so opening pages directly with `file://` will not load occupation profiles.
