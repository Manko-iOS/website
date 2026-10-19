# Manko website

Books, comics and manga on iPhone, iPad and Mac.

This buildless website is deployed from `dist/` through GitHub Pages. Preview locally with `python3 -m http.server 4188 --directory dist`. Run `python3 scripts/check.py` before publishing.

## Dependencies and artwork

Ionic Framework 9.0.8 compiled web components are vendored locally in `dist/vendor/ionic`, with their MIT license and source/version record. No external runtime CDN or Ionic global CSS is loaded.

Artwork provenance and permissions are recorded in `dist/sources.json` and the website footer. Apple device-artwork licenses are retained in `licenses/`. These third-party assets retain their respective rights; no blanket open-source license is granted to them. Demonstration titles are not bundled with Manko.

The Join TestFlight buttons intentionally link to the Manko Discord invitation. The website has no analytics, backend, or signup storage.

## Publication follow-up

The official terms for Give My Regards to Black Jack — SHUHO SATO require reporting public use to info@densho810.com within one month after public release. Include the final website URL and a screenshot showing the artwork and credit. This repository does not send that email. See RELEASE.md for the prepared report details.
