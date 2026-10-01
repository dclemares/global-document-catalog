# Global Document Catalog

Visual catalog of identity documents and passports for **196 countries**, with filters by country, region and coverage. Each country shows the ID front, the ID back and the passport data page, explicitly flagging any missing images or evidence.

**[Open the catalog](https://dclemares.github.io/global-document-catalog/)** · [Download the project](https://github.com/dclemares/global-document-catalog/archive/refs/heads/main.zip)

## Contents

- 212 selected images across 85 countries, including 194 demo recreations.
- Original references where available, with links to the source of each model.
- Face-photo and MRZ indications per side or page, with their level of evidence.
- 333 global example assignments: 82 fronts, 55 backs and 196 passports.
- 55 countries with all three global pieces assigned.

The global examples guide capture: the front is assigned when there is a photo and the MRZ is absent or to be confirmed (keeping the stated uncertainty); the back when the reverse carries an MRZ, with or without a photo; the passport stands for a data page with photo and MRZ. For passports, 75 assignments rely on the catalog model and 121 on the ICAO standard, with the country model unverified.

## Open and update

Open `docs/index.html` directly, no dependencies needed. To serve it locally:

```sh
python3 -m http.server 8770 --directory docs
```

Open <http://localhost:8770/>. The data lives in `docs/paises.json`, the inventory in `docs/manifest.json`, the totals in `docs/RESUMEN.json` and the visual template in `src/catalog.html`.

After changing the data or the template, rebuild and validate:

```sh
python3 scripts/validate.py
```

Commit the regenerated HTML files together with the change. GitHub Pages publishes the `docs` folder of the `main` branch. The validation workflow checks the files and that the published version matches the data.

## Sources and scope

The catalog distinguishes public references, templates and generated demos. Sources are kept next to each document; it is not claimed that every image shows the latest issue. Not finding an image does not mean the document does not exist.

Demos contain fictitious data and illustrative MRZ, with no OCR validation. The catalog is for design and capture guidance, not for validating identities or documents. No ordinary passport without an MRZ has been identified in the references gathered; historical issues and emergency documents may differ.

Third-party images keep the rights and conditions of their sources; this repository does not grant them a new redistribution license. See the provenance links before reusing them. The detailed criteria are in [`docs/LEEME.txt`](docs/LEEME.txt).

Inventory reviewed on 30 September 2026. The 196 entries are the 195 countries on the initial list plus Kosovo.
