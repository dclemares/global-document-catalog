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
  The guest sees their nationality's documents plus the property country's residence permit, only where it was checked
  against PRADO and drawn: Spain (TIE/NIE), Italy, Portugal and the UAE (Emirates ID). Any other property country offers
  just the guest's ID and passport. EU/EEA/Swiss citizens don't get a permit inside that area, since they register
  without a residence card. The Spanish TIE has its own demo
  (`ES-tie-front.webp`, `ES-tie-back.webp`) drawn from PRADO ESP-HO-03001 (2020); the 2003 and 2011 models
  (ESP-HO-02001 to 02005) also have the three lines on the back, so one option covers them all.
  Italy's Permesso di soggiorno works the same way (`IT-permesso-front.webp`, `IT-permesso-back.webp`, from PRADO
  ITA-HO-03008, 2021): every plastic card since 2007 (ITA-HO-03001/03003/03005/03006, ITA-HP-03001) has the lines on the
  back, while the paper permits (ITA-HO-01001, 02001, 03002, 03004, 03007) have none and go in the note below.
  Portugal's Título de residência too (`PT-titulo-front.webp`, `PT-titulo-back.webp`, from PRADO PRT-HO-08001, 2020;
  the 2008 card PRT-HO-02001 also has the lines on the back).
- **Only documents in use today.** Long-expired models are left out: the French card before 1988, the Portuguese título
  from 2005, the Italian paper ID and the old Greek ID (ID cards without an MRZ stopped being valid on 3 August 2026,
  Regulation (EU) 2019/1157), and niche paper or asylum documents (for example PRT-HP-01001/01002).
- Each document can carry a short `hint` shown under its name, so the guest can tell two models apart.
- **Documents without reading lines.** They aren't offered (they can't fill the form), but a note under the list names
  them and links back to the form: driving licences for everyone, plus the Romanian provisional ID and the green EU registration certificate (NIE) that EU/EEA/Swiss
  citizens get in Spain (paper, PRADO ESP-HP-01001/01002, not valid as proof of identity), the paper Italian residence permit for
  non-EU guests in Italy (only non-EU residents get the TIE card, which has an MRZ). Edit `noLinesByNationality` in `variants.js`.

To add another model, add it to `models` in `variants.js` with its `side`, `lines` and image; to add a permit, check it in PRADO,
draw its images, then add the country to `permitCountries`, `permitLabels` and `ownPermits`.

## PRADO templates (`prado.js`)
Countries whose passport was a generic catalog example now get a demo drawn by a template from their newest ordinary passport
in PRADO: the country name, the data page colours sampled in four horizontal bands of the PRADO photo (so gradients such as
Kenya's or Pakistan's survive), photo on the left and the two lines at the
bottom (true of every PRADO data page checked), a blank-face demo photo and fictitious data. Twenty frequent nationalities also get their own header (bilingual title and local script, emblem, flag and features such
as Egypt's barcode) from a per-country config: Bangladesh, Cuba, Dominican Republic, Egypt, Iran, Iraq, Jordan, Kazakhstan,
Kenya, Kuwait, Lebanon, Mongolia, Nigeria, Oman, Pakistan, Philippines, Qatar, Saudi Arabia, Singapore and Viet Nam.
96 passports are covered
(`XX-passport-prado.webp`); 33 stay generic because PRADO has no image for them (Antigua and Barbuda, Bahamas, Barbados,
Bolivia, Cambodia, Chad, Eswatini, Fiji, Gabon, Guatemala, Guinea-Bissau, Indonesia, Marshall Islands, Solomon Islands,
Kiribati, Madagascar, Mauritius, Micronesia, Myanmar, Nauru, Niger, Papua New Guinea, Central African Republic, Samoa,
Saint Vincent and the Grenadines, Saint Lucia, Sri Lanka, Sudan, Suriname, Tajikistan, Tonga, Trinidad and Tobago, Vanuatu).

By default a country offers only its ID and passport. Seven countries that had only a passport now also offer their
national ID card, because PRADO confirms three lines on the back: Bahrain (BHR-BO-01001), Burkina Faso (BFA-BO-02001),
Congo (COG-BO-01001), Iraq (IRQ-BO-01001), Kazakhstan (KAZ-BO-02001), Paraguay (PRY-BO-01002) and Senegal
(SEN-BO-03001). Cards without an MRZ (Cameroon, Qatar, Haiti, Oman, Rwanda, Pakistan, Syria, Tunisia, Palestine),
travel certificates (New Zealand) and long-replaced models (Thailand 2001, Singapore 1982, United Kingdom 2009,
Mali 2000) are left out. Each entry links to its PRADO page and names the model and year in the credit line.

## Limits
Images recreated with AI from public references; data and MRZ are fictitious. Not suitable for verifying
identities. Outline positions are approximate.
