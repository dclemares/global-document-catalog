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
- `scenarios.js`: the 20 simulated profiles from the study (`DECISIONES.md`, `VERIFICACION.md`).
- `assets/`: images (WebP with transparency) and credits.

## Limits
Images recreated with AI from public references; data and MRZ are fictitious. Not suitable for verifying
identities. Outline positions are approximate.
