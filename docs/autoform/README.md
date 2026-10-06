# Autofill from a document photo · prototype

A clickable prototype of the "scan document → fill in the form" flow for guest registration.
It covers **196 countries** from the document catalog and uses only AI recreations and fictitious data.

## How to try it
- Open `index.html` in your browser (or the version published on GitHub Pages, under the `/autoform/` path).
- Click **Scan document** → choose country and type → *Prepare your document* → *Take the photo*.
- **Real camera:** on an HTTPS address (GitHub Pages) or on `localhost`, the browser asks for permission and the viewfinder
  shows your camera with the document outline on top. If you deny permission or there is no camera, a simulation is used.
  The image is only displayed on screen: it is neither stored nor sent.
- Reading (OCR) is simulated: when you "take the photo", sample data is filled in.

## Structure
- `index.html`, `styles.css`, `app.js`: the application (no dependencies).
- `documents.js`: country → documents catalog (image and side to photograph).
- `layouts.js`: zones of each document, used to draw the outline.
- `variants.js`: hand-maintained additions on top of `documents.js` (see below).
- `scenarios.js`: the 20 simulated profiles from the study (`DECISIONES.md`, `VERIFICACION.md`).
- `assets/`: images (WebP with transparency) and credits.

## Variants and residence permits (`variants.js`)
`documents.js` only has the current passport and ID card of each country. `variants.js` is loaded after it and adds:
- **Older models with the reading lines on another side.** France: ID card since 2021 (lines on the back) and the laminated
  paper card from 1988 to 2021 (two lines of 36 characters on the front), per PRADO FRA-BO. The
  laminated card is squarer than a bank card, and its image and camera outline keep that shape. Romania: ID card since 2021, with or without chip (back) and
  the classic card from 2001 to 2021 (front, blank back), per PRADO ROU-BO. The handwritten provisional card has no MRZ and is left out.
  The older models have their own demo images drawn from the PRADO references with fictitious data
  (`FR-id-paper-front.webp`, `RO-id-classic-front.webp`, with their zones in `variants.js`). Any future model without its
  own image falls back to `generic-id-front-mrz.webp`, a generic front with a two-line MRZ (`generic: true`).
- **Residence permits for foreign guests.** The first field is now *Nationality*, and the lab panel has a *Property country*.
  The guest sees their nationality's documents plus the property country's residence permit (Spain: TIE/NIE, UAE: Emirates ID,
  Italy, Portugal, France, Germany and the rest of the EU/EEA and Switzerland). EU/EEA/Swiss citizens don't get it inside
  that area, since they register without a residence card. Permits use the generic card back, except the UAE.
- Each document can carry a short `hint` shown under its name, so the guest can tell two models apart.
- **Documents without reading lines.** They aren't offered (they can't fill the form), but a note under the list names
  them and links back to the form: driving licences for everyone, plus the Italian paper ID, the old Greek ID, the
  Romanian provisional ID, the French card from before 1988, and the green NIE certificate that EU/EEA/Swiss citizens get
  in Spain (only non-EU residents get the TIE card, which has an MRZ). Edit `noLinesByNationality` in `variants.js`.

To add another model, add it to `models` in `variants.js` with its `side`, `lines` and image; to add a permit, add the
country to `permitCountries` (and optionally a label in `permitLabels`).

## Limits
Images recreated with AI from public references; data and MRZ are fictitious. Not suitable for verifying
identities. Outline positions are approximate.
