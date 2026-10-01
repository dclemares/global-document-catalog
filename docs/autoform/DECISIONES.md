# Autofill from a document photo

Proposal and prototype · 30 September 2026

## Exact boundary

**Start:** click on "Scan document", inside the autofill card from the user's screenshot.

**Correct end:** the data has been read and the corresponding form fields are filled in.

This includes preparation, guidance, permissions, taking a photo or using an existing image, reading, errors, retries, and applying values. Cancelling or returning to manual entry are exits from the scan, not successful readings.

Out of scope: form submission, registration validation, guest management, minors, payments, legal acceptance of the document, and any step after autofill. The expiry date is copied as data; this flow does not decide whether the document is admissible. The screenshot only shows the entry point: we do not know the current scanner, so the risks are not presented as verified failures of the product.

## Method

The five requested stages are followed: initial flow V0 → expectations of 20 profiles → proposal V1 → feedback from the same 20 profiles → V2 decisions and development.

The profiles and their comments are **synthetic simulations**, not real interviews. Each case is a hypothesis about needs, friction, and response to a design. No success percentages are invented and the flow is not claimed to be validated by people. The demo data is fictitious and does not come from the repository's reports.

## 1. Initial flow V0

Click autofill → open camera → photograph document → read → copy to the form.

Its advantage is brevity. Its problematic assumptions are that the user knows what to photograph, has a camera available, grants permission, and gets a complete reading on the first attempt. The first round explores where it would fail.

## 2. First round: what the 20 profiles expect

| Profile | Context | Expectation | Expected friction in V0 |
|---|---|---|---|
| 1. Lucía | Mobile · Spanish DNI · first time | To know which side to photograph without understanding what MRZ means. | Photographs the front and gets a generic error. |
| 2. James | Mobile · passport · arriving in a hurry | To take a photo and see the fields filled in with as few steps as possible. | A mandatory review screen adds work to a clear reading. |
| 3. Carmen | Little digital experience · mobile | Short instructions and an obvious button at each step. | Does not understand permissions or when the photo is taken. |
| 4. Álex | Laminated document · glare | To be told how to improve a failed photo. | Repeats the same photo indefinitely. |
| 5. Marta | Old Android · blurry camera | To have a way out if the camera cannot take a sharp photo. | Retry loop or device lock-up. |
| 6. Noah | Camera permission denied | To recover without having to understand browser settings. | The system keeps asking for the same permission. |
| 7. Sofía | Laptop without a camera | To be able to read an existing image when there is no camera. | The experience assumes a mobile phone. |
| 8. Hugo | Mobile · connection drops during reading | Not to retake the photo if only the connection fails. | A network failure is presented as a defective photo. |
| 9. Amina | Transliterated name on the document | To recognize and correct her name without changing her identity. | The transliteration is presented as the definitive name. |
| 10. José Luis | Passport · lines cut off at the edges | To know how much of the document must fit in the photo. | Only photographs the middle of the lines. |
| 11. Sari | Gallery photo · rotated document | Not to edit the photo by hand to make it readable. | A readable image is rejected solely because of its orientation. |
| 12. Wei | Worn document · one doubtful character | To correct only the character that could not be read. | An invented document number is inserted or the whole reading is lost. |
| 13. Paula | Old document without a machine-readable zone | For manual entry to be accepted as a normal route. | Interprets "no MRZ" as an invalid document. |
| 14. Eva | Privacy concerns | To understand what the photo is for before granting camera access. | Abandons if the camera opens without context. |
| 15. Daniel | Low vision · zoom and screen reader | Instructions and messages that can be read with zoom or a screen reader. | The camera and placeholders are the only mode of interaction. |
| 16. Óscar | Reduced mobility · unsteady hand | Not to depend on holding the document in a precise position. | Capture that is too demanding or timed. |
| 17. Laura | Photo with two documents in the same image | To know whether to photograph the documents together or separately. | Data from two documents gets mixed. |
| 18. Diego | Form already partially filled in | To keep what he typed when trying out the scan. | A new reading silently replaces correct values. |
| 19. Emma | Dimly lit room | A concrete tip for getting a readable image. | Does not understand whether to move closer, focus, or find light. |
| 20. Bruno | Slow or down reading service | To know it is still reading and be able to leave if it takes too long. | Endless spinner or a late result that fills the form after cancelling. |

The synthesis of these expectations is: show which zone matters before asking for permissions, help correct the photo according to the problem, and keep an exit that loses no data. Do not require learning the word "MRZ".

## 3. Proposal V1

Click → choose document and see guide → camera or existing image → manual capture → reading → review of all data → apply → form filled in.

The guide depicts the two or three lines of letters, numbers, and "<" signs. The passport shows the data page; the card shows the side that contains the lines, without assuming it is always the back. Only one document is photographed, with complete lines and no glare. The camera does not open until the user requests it.

This version adds clarity but also a mandatory review even when the reading is complete. In addition, "retake photo" on its own neither resolves a dropped connection nor explains how to correct the framing. The second round questions those decisions.

## 4. Second round: simulated feedback on V1

| Profile | Synthetic feedback on V1 | Change adopted for V2 |
|---|---|---|
| 1. Lucía | "The guide helps, but I need to see the lines I'm supposed to look for." | D01 · Visual example of the lines and a "I can't find these lines" option. |
| 2. James | "If it has already been read correctly, I want to see the form filled in directly." | D02 · Reliable reading: close the panel and apply directly, with visible confirmation. |
| 3. Carmen | "I prefer to press the button myself and be able to go back." | D03 · Explicit capture, simple text, and a visible exit. |
| 4. Álex | "'Could not be read' doesn't tell me what to change." | D04 · Specific message when there is a reliable signal; manual exit prioritized after two failures. |
| 5. Marta | "After two attempts I'd rather type and move on." | D04 · Optional retry and a manual alternative from the start. |
| 6. Noah | "Let me choose a photo or enter my details." | D05 · Do not repeat the permission request automatically; offer photo and manual entry. |
| 7. Sofía | "The computer also needs a clear way out." | D05 · Image and manual route; handoff to mobile is outside the MVP. |
| 8. Hugo | "The photo was fine; I want to retry reading it, not take it again." | D06 · Distinguish an unreadable photo from a service failure; retry the same capture. |
| 9. Amina | "Let me correct it, and explain that it comes from the document." | D07 · Apply the transliteration as read without reconstructing spellings, and indicate its provenance. |
| 10. José Luis | "I need to know the lines have to be visible from beginning to end." | D08 · Frame with margin and a specific framing error when detectable. |
| 11. Sari | "Could you rotate it before asking me for another photo?" | D09 · Normalize orientation before reading; in the demo a correct reading is represented. |
| 12. Wei | "Show me the doubtful field and keep what was read correctly." | D10 · Review only the doubtful number; no retyping everything. |
| 13. Paula | "My document exists; don't say it's invalid just because it can't be read." | D11 · Document without MRZ: explain the scan's limit and return to the form. |
| 14. Eva | "Explain what the photo is for and let me leave before the camera opens." | D12 · Prior explanation, visible close, and permission only when the camera is pressed. |
| 15. Daniel | "I need to hear whether it is reading, whether it failed, and when it has filled the fields." | D13 · Labels, dialog with focus, status announcements, and end of autofill. |
| 16. Óscar | "I want to use an existing photo without being rushed." | D03 / D05 · No countdown; existing image and manual entry. |
| 17. Laura | "Tell me to photograph only one document at a time." | D14 · One document per photo; reject multiple-document captures when detected. |
| 18. Diego | "I want to choose between the previous value and the one read." | D15 · If there are differences, keep what was typed by default and choose per field. |
| 19. Emma | "Ask me to go somewhere with more light, without making me retry blindly." | D16 · Lighting help when there is a reliable signal; guided retry. |
| 20. Bruno | "I want to cancel without the data appearing later by surprise." | D17 · Cancellation, timeout, and discarding of late results. |

Not all problems are considered solved: each profile retains a pending validation in the prototype's panel. Diagnoses of glare, cropping, darkness, or multiple documents need real signals from the provider; they must not be fabricated from a generic error.

## 5. Final flow with issuing country and document type

### Main path

1. **Click.** Open a panel over the form, preserving everything that was typed.
2. **Choose and prepare.** Ask for the issuing country and document type before opening the camera; do not confuse issuing country with nationality. With your catalog, resolve the exact side: front, back, or data page. Show an image of the corresponding document, the frame over the real zone, and a direct instruction such as "Photograph the back of your DNI". If the country has models with different sides, distinguish the model in the selector. Actions: use camera, choose photo, change selection, and "My document doesn't look like this".
3. **Photograph.** Request permission only when the camera is pressed. Show a frame wide enough not to cut off the ends and three tips: document resting flat, good light without glare, and all lines sharp. Explicit capture, no countdown.
4. **Read.** Show a reading state with cancellation. Process orientation before OCR. Do not add a generic "Does it look good?" screen after every photo: the automatic check determines whether intervention is needed.
5. **Fill in.** Reliable reading with no conflicts: apply atomically, close the panel, highlight the filled fields, and show "Document read. X fields filled in". The counter reflects fields whose value changed. **The flow ends here.** No continue button, registration confirmation, or later screen.

### Interventions only when needed

| Situation | Message and action | Exit condition |
|---|---|---|
| Permission denied | Explain that the camera can be enabled in settings, choose an image, or close | Image chosen or exit with no changes |
| No camera | Offer an existing image | Reading or exit |
| Wrong side | "We can't see the reading lines" and return to the guide | New photo with the lines |
| Lines cut off | "Move the document a little farther away" | New complete photo |
| Glare | "Tilt the document slightly or change the light" | New readable photo |
| Blur | "Rest the document on a surface and wait for it to focus" | New readable photo |
| Low light | "Move the document closer to an even light source" | New readable photo |
| Multiple documents | "Leave only one document in the image" | New single-document photo |
| No compatible MRZ | Explain the reading limit without declaring the document invalid | Return to the form |
| Unclassified error | "We couldn't read the lines. Check that they are complete and sharp" | Retry or exit |
| Connection/service failure | Retry reading the same capture | Reading response or cancellation |
| Excessive wait | Timeout state with retry or close | No indefinite spinner |
| One doubtful field | Keep reliable results in memory; ask only for the missing value or a new photo | Explicit correction and application |
| Difference from typed data | Compare current and read value; keep current by default | Application with per-field choices |

If two failures accumulate, highlight the return to the form and keep retry available. Two attempts is an initial UX hypothesis, not a measured result. In the integration, propose 15 seconds as a configurable timeout and adjust it to the provider; the demo speeds up the wait to make testing easier.

A partial reading must not silently fill in a doubtful value. The example route asks for the document number and, once it is resolved, applies the whole set. The final message distinguishes "Reading completed with your correction" from a fully automatic reading. If several fields are missing, show only those affected, allowing the user to retake the photo or leave; do not turn it into another full form.

Names are copied as read, without reconstructing accents or splitting surnames automatically. An existing second surname is kept. Data that the MRZ does not contain stays as it was. When the product's real model requires a different name layout, an explicit mapping must be established without guessing.

### Proposed production microcopy

- Entry: "Autofill your details" / "Take a photo of the lines on your document".
- Guide: "Look for the lines with letters, numbers, and < signs".
- Camera: "Frame the complete lines" / "Take photo".
- Reading: "We're reading the lines" / "Cancel reading".
- Success: "Document read. X fields filled in".
- Partial: "Just one detail left to read".
- Conflict: "You had already typed some details".

The prototype's buttons say "Simulate" or "test" to make clear that they do not activate a real camera, gallery, or OCR. These labels are not proposed production microcopy.

## 6. Implementation specification

### States and rules

`idle → country_and_type → side_guidance → permission/capture → reading → filled`

Branches: `capture → image_error → capture`; `reading → service_error → reading`; `reading → partial → correction → filled`; `reading → conflict → explicit_merge → filled`; any panel state allows `cancel → idle` without applying pending results.

Keep three separate objects: existing form, temporary capture, and reading attempt. Only the transition to `filled` applies the result. Cancelling invalidates the attempt identifier, releases resources, and discards late results. When closing the camera, stop its tracks; when replacing an image, release the object URL. The prototype simulates this behavior with an attempt token and uses no real camera or images.

### Proposed reader input and output

This contract is a proposal, not an existing API.

Input: `attemptId`, temporary image, and document type preference. Output: `attemptId`, `status` (`complete`, `partial`, `unreadable`, `unsupported`), fields with value/provenance/review state, and a `reasonCode` backed by a real signal. Include format and check-digit results according to the MRZ type. A checksum does not prove the document's authenticity or the person's identity.

For direct filling, require a structurally consistent reading and no fields marked as doubtful. Calibrate confidence thresholds with real images; do not invent percentages. Dates with an ambiguous century are not resolved by intuition: they are marked as data to review. Translate nationality codes using a catalog; do not infer nationality from the issuing country.

### Applying to the form

Fill in only fields obtained from the reading. Do not clear unread fields or change typed values without an explicit choice. Build the patch in memory and apply it in a single transition. Keep field provenance (`read`, `manual`, `user_corrected`) in local state. The integration must capture the form version at the start to detect concurrent changes.

### Handling the photo

Before integrating, confirm the provider, supported formats, size limits, retention policy, and the actual informational text. An unsupported image must produce a clear message and allow choosing another without restarting the flow. Do not include the image, base64, MRZ, or personal values in analytics, URLs, or logs. The demo has no capture, upload, persistent storage, or external scripts. No production deletion policy is promised, since we do not know it.

## 7. Development and coverage

The folder contains a prototype with no external dependencies that keeps the look of the screenshot: lavender background, side navigation, rounded card, blue-violet accent, and form sections. It is intentionally limited to autofill; the background form serves to show the result.

Implemented: per-document guide, simulated capture, cancellable simulated reading, all states in the table except generic error/real file, correction of a doubtful field, reconciliation of previous values, direct application, fill confirmation, preservation of unread fields, 20 profiles, two browsable rounds, and a responsive design.

Not implemented: OCR, real image processing or upload, real permissions, light/focus measurement, real orientation normalization, API, MRZ parser validation, and real devices. These dependencies are specified; the demo does not fake them. The "Simulate corrected photo / service recovered" controls are separate and labeled as test controls; they allow walking through the recovery path, but are not part of the production UI.

Open `index.html` directly or run from the repository root:

```sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory docs/autoform
```

Serve only this folder: the rest of the repository contains private information.

## 8. Acceptance criteria and subsequent real testing

1. A correct reading fills in the form without an extra review screen.
2. Country and type are mandatory; the guide uses the side configured for that combination and model. The guest is not asked to guess front/back.
3. The camera is not requested before an explicit action.
4. The user can close at any step without losing data or receiving a cancelled result afterward.
5. Photo errors say what to change; service errors allow re-reading the same capture.
6. After two failures the exit is highlighted; there is never a mandatory loop.
7. A doubtful character is not invented or filled in without intervention.
8. Data already typed is preserved unless explicitly chosen per field.
9. Fields not present in the reading are kept.
10. The visible end is the filled-in form; it contains no submission or registration steps.
11. Focus contained in the dialog, Escape available, persistent labels, and announcements of reading/result.
12. The 20 cases remain identified as simulations and are not turned into real metrics.

To validate with people, ask only "fill in your details using a photo of the document" and stop the session when the fields appear. Observe discovery of the zone, time to a readable photo, understanding of errors, cancellations, retries, and recognition of success. Measure per device and document. Run specific tests for zoom, keyboard, VoiceOver/TalkBack, permissions, rotated images, and late responses. Do not evaluate submission or registration conversion in this work.

## Sources

- [ICAO · Doc 9303](https://www.icao.int/publications/doc-series/doc-9303): reference for machine-readable documents; catalog of TD3 passports and TD1/TD2 cards. The real parser must be checked against the applicable parts.
- [W3C WAI · Form notifications](https://www.w3.org/WAI/tutorials/forms/notifications/): understandable errors, association with fields, and announcement of results. Supports the focus and messaging proposal.

The UX decisions are design inferences. These sources do not validate the simulations or demonstrate the effectiveness of the proposal.


## Visual catalog of the prototype

Selection is explicit and mandatory. Changing the country clears the chosen type to prevent an incompatible combination from surviving. Selections are kept when returning from the guide and never modify the form's nationality.

| Example country and type | Side indicated | Example used |
|---|---|---|
| Spain · DNI | Back | Sample DNI image with three lines at the bottom |
| Spain · Passport | Data page with photo | Sample page within an open booklet composition |
| France · Identity document, old large model | Front | Local image of the model with two lines below the photo |
| India · Passport | Data page with photo | Local specimen marked SPECIMEN |

This is a reduced demonstration catalog. The integration will use the catalog the product already knows, including version/model when needed; a side is not extrapolated to all documents of a country. The example photo and the guide coordinates are data from the same configuration (`documents.js`).

The original image is kept; the outer frame and the MRZ highlight are HTML/CSS layers. The passport has an adjacent page, binding, and data page to visually distinguish it from a card. The camera view shows "EXAMPLE", without presenting the image as a real capture. Reading remains simulated.

Resources: [sample DNI, Government of Spain](https://commons.wikimedia.org/wiki/File:Spanish_ID_card_(back_side).webp); [sample passport, MonicasHouse](https://commons.wikimedia.org/wiki/File:Spanish_passport_data_page_sample.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Details of files and attributions are in `assets/CREDITOS.txt`.
