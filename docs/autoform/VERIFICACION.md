# Prototype verification

30 September 2026. This tests the behavior of the demo, not a real OCR.

- 5 automated tests of data application: filling empty fields, preserving data not part of the reading, conflicts kept by default, explicit per-field replacement, missing values, and idempotence of an identical reading. Result: 5/5.
- Browser: simulated passport capture → panel closes → six fields filled, with no intermediate review.
- Partial reading: the empty number shows an error; entering a value applies it together with the rest of the data.
- Conflicts: the name "Diego" is kept if the different value from the photo is not accepted.
- Permission denied: recovery message and a gallery route through to a filled form.
- Glare: the second failure highlights the return to the form; the simulated recovery fills the fields.
- Cancellation during reading: the typed text remains; after the response time has passed, the dialog stays closed and the reading applies no changes.
- 390 × 844 view: no horizontal overflow in the panel; vertical content scrolls; capture and fill completed.
- Six text provenance labels accompany the read fields, in addition to color.
- No console errors observed during the routes checked.

Pending for production: real camera/permissions, OCR and file formats, quality diagnostics, orientation normalization, provider latencies and cancellation, tests with screen readers and physical devices. The 20 profile simulations are design exploration, not 20 user sessions or an accessibility certification.

To run the data tests:

```sh
node --test autoform-mrz/app.test.cjs
```

## Country and document update

- 8/8 automated tests, including resolution of front/back/data page and rejection of unknown combinations.
- You cannot continue without a country and type. Changing Spain/ID card to France clears the type and disables continue.
- Spain/ID card shows the back; France/old model shows the front; Spain/passport shows the data page over an open booklet.
- ID card capture → sample data in the form. No submission or later step is added.
- Sample photographs integrated with an outer frame and MRZ highlight via HTML/CSS; the originals are kept.
- 390 × 844 mobile view: ID card and passport show the document, highlight, and capture/cancel buttons. Screenshots saved as mockup-dni.png and mockup-pasaporte.png.
