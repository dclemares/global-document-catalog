# Generated document images

Inventory of the document images made for the auto-fill prototype in this branch, as opposed to the catalog's own
recreations. Not shown to guests: the documents carry `generated` in the data (`'template'` or `'drawn'`) so code
can tell them apart, and this file lists them for people.

**108 documents**: 96 passports and 7 ID cards from the template, 5 hand-drawn cards.

All use fictitious data, a blank-face demo photo, a DEMO stamp and placeholder emblems (no real coats of arms).
Layout, colours and header text follow the PRADO model named in each row; details differ from the real document.

## Hand-drawn (`generated: 'drawn'`)

Drawn one by one from the PRADO photos, with their own camera zones in `variants.js`.

| Country | Document | Image (photographed side) | Other side | PRADO model |
|---|---|---|---|---|
| France | ID card · before 2021 | `FR-id-paper-front.webp` | — | [FRA-BO-02001/02002 (1988–2021)](https://www.consilium.europa.eu/prado/en/prado-documents/FRA/B/docs-per-category.html) |
| Italy | Residence permit (Permesso di soggiorno) | `IT-permesso-back.webp` | `IT-permesso-front.webp` | [ITA-HO-03008 (2021)](https://www.consilium.europa.eu/prado/en/prado-documents/ITA/H/docs-per-category.html) |
| Portugal | Residence permit (Título de residência) | `PT-titulo-back.webp` | `PT-titulo-front.webp` | [PRT-HO-08001 (2020)](https://www.consilium.europa.eu/prado/en/prado-documents/PRT/H/docs-per-category.html) |
| Romania | ID card · before 2021 | `RO-id-classic-front.webp` | — | [ROU-BO-01002 to 04001 (2001–2021)](https://www.consilium.europa.eu/prado/en/prado-documents/ROU/B/docs-per-category.html) |
| Spain | Residence card (TIE / NIE) | `ES-tie-back.webp` | `ES-tie-front.webp` | [ESP-HO-03001 (2020)](https://www.consilium.europa.eu/prado/en/prado-documents/ESP/H/docs-per-category.html) |

## Template ID cards (`generated: 'template'`)

Added for countries that had only a passport, where PRADO shows three MRZ lines on the back. Drawn by the ID template.

| Country | Image (back) | Front | PRADO model |
|---|---|---|---|
| Bahrain | `BH-id-back-prado.webp` | `BH-id-front-prado.webp` | [BHR-BO-01001 (2007)](https://www.consilium.europa.eu/prado/en/prado-documents/BHR/B/docs-per-category.html) |
| Burkina Faso | `BF-id-back-prado.webp` | `BF-id-front-prado.webp` | [BFA-BO-02001 (2008)](https://www.consilium.europa.eu/prado/en/prado-documents/BFA/B/docs-per-category.html) |
| Congo | `CG-id-back-prado.webp` | `CG-id-front-prado.webp` | [COG-BO-01001 (2008)](https://www.consilium.europa.eu/prado/en/prado-documents/COG/B/docs-per-category.html) |
| Iraq | `IQ-id-back-prado.webp` | `IQ-id-front-prado.webp` | [IRQ-BO-01001 (2019)](https://www.consilium.europa.eu/prado/en/prado-documents/IRQ/B/docs-per-category.html) |
| Kazakhstan | `KZ-id-back-prado.webp` | `KZ-id-front-prado.webp` | [KAZ-BO-02001 (2009)](https://www.consilium.europa.eu/prado/en/prado-documents/KAZ/B/docs-per-category.html) |
| Paraguay | `PY-id-back-prado.webp` | `PY-id-front-prado.webp` | [PRY-BO-01002 (2012)](https://www.consilium.europa.eu/prado/en/prado-documents/PRY/B/docs-per-category.html) |
| Senegal | `SN-id-back-prado.webp` | `SN-id-front-prado.webp` | [SEN-BO-03001 (2019)](https://www.consilium.europa.eu/prado/en/prado-documents/SEN/B/docs-per-category.html) |

## Template passports (`generated: 'template'`)

Replace the generic catalog passport. Drawn by the passport template from the newest ordinary passport in PRADO:
colours sampled in bands from the PRADO data page, per-country header (title, local script, emblem and flag
positions, barcode block where printed). The 33 countries PRADO has no image for keep the generic passport.

| Country | Image | PRADO model |
|---|---|---|
| Afghanistan | `AF-passport-prado.webp` | [AFG-AO-04001 (2017)](https://www.consilium.europa.eu/prado/en/prado-documents/AFG/A/docs-per-category.html) |
| Andorra | `AD-passport-prado.webp` | [AND-AO-03001 (2017)](https://www.consilium.europa.eu/prado/en/prado-documents/AND/A/docs-per-category.html) |
| Angola | `AO-passport-prado.webp` | [AGO-AO-01001 (2000)](https://www.consilium.europa.eu/prado/en/prado-documents/AGO/A/docs-per-category.html) |
| Armenia | `AM-passport-prado.webp` | [ARM-AO-02001 (2012)](https://www.consilium.europa.eu/prado/en/prado-documents/ARM/A/docs-per-category.html) |
| Bahrain | `BH-passport-prado.webp` | [BHR-AO-01001 (2002)](https://www.consilium.europa.eu/prado/en/prado-documents/BHR/A/docs-per-category.html) |
| Bangladesh | `BD-passport-prado.webp` | [BGD-AO-04001 (2019)](https://www.consilium.europa.eu/prado/en/prado-documents/BGD/A/docs-per-category.html) |
| Belize | `BZ-passport-prado.webp` | [BLZ-AO-05001 (2023)](https://www.consilium.europa.eu/prado/en/prado-documents/BLZ/A/docs-per-category.html) |
| Benin | `BJ-passport-prado.webp` | [BEN-AO-03001 (2021)](https://www.consilium.europa.eu/prado/en/prado-documents/BEN/A/docs-per-category.html) |
| Bhutan | `BT-passport-prado.webp` | [BTN-AO-01001 (2006)](https://www.consilium.europa.eu/prado/en/prado-documents/BTN/A/docs-per-category.html) |
| Botswana | `BW-passport-prado.webp` | [BWA-AO-02001 (2009)](https://www.consilium.europa.eu/prado/en/prado-documents/BWA/A/docs-per-category.html) |
| Brunei | `BN-passport-prado.webp` | [BRN-AO-02001 (2008)](https://www.consilium.europa.eu/prado/en/prado-documents/BRN/A/docs-per-category.html) |
| Burkina Faso | `BF-passport-prado.webp` | [BFA-AO-04001 (2018)](https://www.consilium.europa.eu/prado/en/prado-documents/BFA/A/docs-per-category.html) |
| Burundi | `BI-passport-prado.webp` | [BDI-AO-02001 (2018)](https://www.consilium.europa.eu/prado/en/prado-documents/BDI/A/docs-per-category.html) |
| Cameroon | `CM-passport-prado.webp` | [CMR-AO-03001 (2021)](https://www.consilium.europa.eu/prado/en/prado-documents/CMR/A/docs-per-category.html) |
| Cape Verde | `CV-passport-prado.webp` | [CPV-AO-01001 (2005)](https://www.consilium.europa.eu/prado/en/prado-documents/CPV/A/docs-per-category.html) |
| Comoros | `KM-passport-prado.webp` | [COM-AO-01001 (2008)](https://www.consilium.europa.eu/prado/en/prado-documents/COM/A/docs-per-category.html) |
| Congo | `CG-passport-prado.webp` | [COG-AO-02001 (2014)](https://www.consilium.europa.eu/prado/en/prado-documents/COG/A/docs-per-category.html) |
| Costa Rica | `CR-passport-prado.webp` | [CRI-AO-01001 (2006)](https://www.consilium.europa.eu/prado/en/prado-documents/CRI/A/docs-per-category.html) |
| Cuba | `CU-passport-prado.webp` | [CUB-AO-01001 (2001)](https://www.consilium.europa.eu/prado/en/prado-documents/CUB/A/docs-per-category.html) |
| Côte d'Ivoire | `CI-passport-prado.webp` | [CIV-AO-02001 (2008)](https://www.consilium.europa.eu/prado/en/prado-documents/CIV/A/docs-per-category.html) |
| Democratic Republic of the Congo | `CD-passport-prado.webp` | [COD-AO-02001 (2015)](https://www.consilium.europa.eu/prado/en/prado-documents/COD/A/docs-per-category.html) |
| Djibouti | `DJ-passport-prado.webp` | [DJI-AO-02001 (2017)](https://www.consilium.europa.eu/prado/en/prado-documents/DJI/A/docs-per-category.html) |
| Dominica | `DM-passport-prado.webp` | [DMA-AO-03001 (2020)](https://www.consilium.europa.eu/prado/en/prado-documents/DMA/A/docs-per-category.html) |
| Dominican Republic | `DO-passport-prado.webp` | [DOM-AO-02001 (2015)](https://www.consilium.europa.eu/prado/en/prado-documents/DOM/A/docs-per-category.html) |
| Ecuador | `EC-passport-prado.webp` | [ECU-AO-01001 (2003)](https://www.consilium.europa.eu/prado/en/prado-documents/ECU/A/docs-per-category.html) |
| Egypt | `EG-passport-prado.webp` | [EGY-AO-01001 (2008)](https://www.consilium.europa.eu/prado/en/prado-documents/EGY/A/docs-per-category.html) |
| El Salvador | `SV-passport-prado.webp` | [SLV-AO-02002 (2010)](https://www.consilium.europa.eu/prado/en/prado-documents/SLV/A/docs-per-category.html) |
| Equatorial Guinea | `GQ-passport-prado.webp` | [GNQ-AO-02001 (2018)](https://www.consilium.europa.eu/prado/en/prado-documents/GNQ/A/docs-per-category.html) |
| Eritrea | `ER-passport-prado.webp` | [ERI-AO-02001 (2010)](https://www.consilium.europa.eu/prado/en/prado-documents/ERI/A/docs-per-category.html) |
| Ethiopia | `ET-passport-prado.webp` | [ETH-AO-02001 (2004)](https://www.consilium.europa.eu/prado/en/prado-documents/ETH/A/docs-per-category.html) |
| Gambia | `GM-passport-prado.webp` | [GMB-AO-01001 (2002)](https://www.consilium.europa.eu/prado/en/prado-documents/GMB/A/docs-per-category.html) |
| Ghana | `GH-passport-prado.webp` | [GHA-AO-02001 (2010)](https://www.consilium.europa.eu/prado/en/prado-documents/GHA/A/docs-per-category.html) |
| Grenada | `GD-passport-prado.webp` | [GRD-AO-01001 (2001)](https://www.consilium.europa.eu/prado/en/prado-documents/GRD/A/docs-per-category.html) |
| Guinea | `GN-passport-prado.webp` | [GIN-AO-03001 (2018)](https://www.consilium.europa.eu/prado/en/prado-documents/GIN/A/docs-per-category.html) |
| Guyana | `GY-passport-prado.webp` | [GUY-AO-02001 (2014)](https://www.consilium.europa.eu/prado/en/prado-documents/GUY/A/docs-per-category.html) |
| Haiti | `HT-passport-prado.webp` | [HTI-AO-02002 (2009)](https://www.consilium.europa.eu/prado/en/prado-documents/HTI/A/docs-per-category.html) |
| Honduras | `HN-passport-prado.webp` | [HND-AO-03001 (2013)](https://www.consilium.europa.eu/prado/en/prado-documents/HND/A/docs-per-category.html) |
| Iran | `IR-passport-prado.webp` | [IRN-AO-04001 (2014)](https://www.consilium.europa.eu/prado/en/prado-documents/IRN/A/docs-per-category.html) |
| Iraq | `IQ-passport-prado.webp` | [IRQ-AO-04001 (2023)](https://www.consilium.europa.eu/prado/en/prado-documents/IRQ/A/docs-per-category.html) |
| Jamaica | `JM-passport-prado.webp` | [JAM-AO-02001 (2001)](https://www.consilium.europa.eu/prado/en/prado-documents/JAM/A/docs-per-category.html) |
| Jordan | `JO-passport-prado.webp` | [JOR-AO-01002 (2008)](https://www.consilium.europa.eu/prado/en/prado-documents/JOR/A/docs-per-category.html) |
| Kazakhstan | `KZ-passport-prado.webp` | [KAZ-AO-02001 (2009)](https://www.consilium.europa.eu/prado/en/prado-documents/KAZ/A/docs-per-category.html) |
| Kenya | `KE-passport-prado.webp` | [KEN-AO-03001 (2015)](https://www.consilium.europa.eu/prado/en/prado-documents/KEN/A/docs-per-category.html) |
| Kuwait | `KW-passport-prado.webp` | [KWT-AO-01001 (2016)](https://www.consilium.europa.eu/prado/en/prado-documents/KWT/A/docs-per-category.html) |
| Kyrgyzstan | `KG-passport-prado.webp` | [KGZ-AO-02001 (2022)](https://www.consilium.europa.eu/prado/en/prado-documents/KGZ/A/docs-per-category.html) |
| Laos | `LA-passport-prado.webp` | [LAO-AO-02001 (2016)](https://www.consilium.europa.eu/prado/en/prado-documents/LAO/A/docs-per-category.html) |
| Lebanon | `LB-passport-prado.webp` | [LBN-AO-02001 (2016)](https://www.consilium.europa.eu/prado/en/prado-documents/LBN/A/docs-per-category.html) |
| Lesotho | `LS-passport-prado.webp` | [LSO-AO-02001 (2016)](https://www.consilium.europa.eu/prado/en/prado-documents/LSO/A/docs-per-category.html) |
| Liberia | `LR-passport-prado.webp` | [LBR-AO-04001 (2017)](https://www.consilium.europa.eu/prado/en/prado-documents/LBR/A/docs-per-category.html) |
| Libya | `LY-passport-prado.webp` | [LBY-AO-02001 (2013)](https://www.consilium.europa.eu/prado/en/prado-documents/LBY/A/docs-per-category.html) |
| Malawi | `MW-passport-prado.webp` | [MWI-AO-02001 (2011)](https://www.consilium.europa.eu/prado/en/prado-documents/MWI/A/docs-per-category.html) |
| Maldives | `MV-passport-prado.webp` | [MDV-AO-04001 (2016)](https://www.consilium.europa.eu/prado/en/prado-documents/MDV/A/docs-per-category.html) |
| Mali | `ML-passport-prado.webp` | [MLI-AO-04001 (2025)](https://www.consilium.europa.eu/prado/en/prado-documents/MLI/A/docs-per-category.html) |
| Mauritania | `MR-passport-prado.webp` | [MRT-AO-01001 (2013)](https://www.consilium.europa.eu/prado/en/prado-documents/MRT/A/docs-per-category.html) |
| Mongolia | `MN-passport-prado.webp` | [MNG-AO-01001 (2023)](https://www.consilium.europa.eu/prado/en/prado-documents/MNG/A/docs-per-category.html) |
| Mozambique | `MZ-passport-prado.webp` | [MOZ-AO-02001 (2010)](https://www.consilium.europa.eu/prado/en/prado-documents/MOZ/A/docs-per-category.html) |
| Namibia | `NA-passport-prado.webp` | [NAM-AO-01001 (2001)](https://www.consilium.europa.eu/prado/en/prado-documents/NAM/A/docs-per-category.html) |
| Nepal | `NP-passport-prado.webp` | [NPL-AO-02001 (2021)](https://www.consilium.europa.eu/prado/en/prado-documents/NPL/A/docs-per-category.html) |
| New Zealand | `NZ-passport-prado.webp` | [NZL-AO-04001 (2021)](https://www.consilium.europa.eu/prado/en/prado-documents/NZL/A/docs-per-category.html) |
| Nicaragua | `NI-passport-prado.webp` | [NIC-AO-03001 (2015)](https://www.consilium.europa.eu/prado/en/prado-documents/NIC/A/docs-per-category.html) |
| Nigeria | `NG-passport-prado.webp` | [NGA-AO-03001 (2019)](https://www.consilium.europa.eu/prado/en/prado-documents/NGA/A/docs-per-category.html) |
| North Korea | `KP-passport-prado.webp` | [PRK-AO-01001 (2004)](https://www.consilium.europa.eu/prado/en/prado-documents/PRK/A/docs-per-category.html) |
| Oman | `OM-passport-prado.webp` | [OMN-AO-01003 (2014)](https://www.consilium.europa.eu/prado/en/prado-documents/OMN/A/docs-per-category.html) |
| Pakistan | `PK-passport-prado.webp` | [PAK-AO-02005 (2022)](https://www.consilium.europa.eu/prado/en/prado-documents/PAK/A/docs-per-category.html) |
| Palau | `PW-passport-prado.webp` | [PLW-AO-02001 (2008)](https://www.consilium.europa.eu/prado/en/prado-documents/PLW/A/docs-per-category.html) |
| Palestinian Territories | `PS-passport-prado.webp` | [OPT-AO-02001 (2022)](https://www.consilium.europa.eu/prado/en/prado-documents/OPT/A/docs-per-category.html) |
| Panama | `PA-passport-prado.webp` | [PAN-AO-02001 (2014)](https://www.consilium.europa.eu/prado/en/prado-documents/PAN/A/docs-per-category.html) |
| Paraguay | `PY-passport-prado.webp` | [PRY-AO-03001 (2023)](https://www.consilium.europa.eu/prado/en/prado-documents/PRY/A/docs-per-category.html) |
| Philippines | `PH-passport-prado.webp` | [PHL-AO-04001 (2016)](https://www.consilium.europa.eu/prado/en/prado-documents/PHL/A/docs-per-category.html) |
| Qatar | `QA-passport-prado.webp` | [QAT-AO-03001 (2008)](https://www.consilium.europa.eu/prado/en/prado-documents/QAT/A/docs-per-category.html) |
| Rwanda | `RW-passport-prado.webp` | [RWA-AO-02001 (2019)](https://www.consilium.europa.eu/prado/en/prado-documents/RWA/A/docs-per-category.html) |
| Saint Kitts and Nevis | `KN-passport-prado.webp` | [KNA-AO-01001 (2010)](https://www.consilium.europa.eu/prado/en/prado-documents/KNA/A/docs-per-category.html) |
| San Marino | `SM-passport-prado.webp` | [SMR-AO-03001 (2014)](https://www.consilium.europa.eu/prado/en/prado-documents/SMR/A/docs-per-category.html) |
| Saudi Arabia | `SA-passport-prado.webp` | [SAU-AO-02001 (2021)](https://www.consilium.europa.eu/prado/en/prado-documents/SAU/A/docs-per-category.html) |
| Senegal | `SN-passport-prado.webp` | [SEN-AO-03001 (2007)](https://www.consilium.europa.eu/prado/en/prado-documents/SEN/A/docs-per-category.html) |
| Seychelles | `SC-passport-prado.webp` | [SYC-AO-01001 (2005)](https://www.consilium.europa.eu/prado/en/prado-documents/SYC/A/docs-per-category.html) |
| Sierra Leone | `SL-passport-prado.webp` | [SLE-AO-01001 (2004)](https://www.consilium.europa.eu/prado/en/prado-documents/SLE/A/docs-per-category.html) |
| Singapore | `SG-passport-prado.webp` | [SGP-AO-05001 (2017)](https://www.consilium.europa.eu/prado/en/prado-documents/SGP/A/docs-per-category.html) |
| Somalia | `SO-passport-prado.webp` | [SOM-AO-04001 (2013)](https://www.consilium.europa.eu/prado/en/prado-documents/SOM/A/docs-per-category.html) |
| South Africa | `ZA-passport-prado.webp` | [ZAF-AO-02001 (2009)](https://www.consilium.europa.eu/prado/en/prado-documents/ZAF/A/docs-per-category.html) |
| South Sudan | `SS-passport-prado.webp` | [SSD-AO-01001 (2012)](https://www.consilium.europa.eu/prado/en/prado-documents/SSD/A/docs-per-category.html) |
| Syria | `SY-passport-prado.webp` | [SYR-AO-01004 (2023)](https://www.consilium.europa.eu/prado/en/prado-documents/SYR/A/docs-per-category.html) |
| São Tomé and Príncipe | `ST-passport-prado.webp` | [STP-AO-01001 (2008)](https://www.consilium.europa.eu/prado/en/prado-documents/STP/A/docs-per-category.html) |
| Tanzania | `TZ-passport-prado.webp` | [TZA-AO-02001 (2018)](https://www.consilium.europa.eu/prado/en/prado-documents/TZA/A/docs-per-category.html) |
| Timor-Leste | `TL-passport-prado.webp` | [TLS-AO-02001 (2008)](https://www.consilium.europa.eu/prado/en/prado-documents/TLS/A/docs-per-category.html) |
| Togo | `TG-passport-prado.webp` | [TGO-AO-04001 (2012)](https://www.consilium.europa.eu/prado/en/prado-documents/TGO/A/docs-per-category.html) |
| Turkmenistan | `TM-passport-prado.webp` | [TKM-AO-01001 (2008)](https://www.consilium.europa.eu/prado/en/prado-documents/TKM/A/docs-per-category.html) |
| Tuvalu | `TV-passport-prado.webp` | [TUV-AO-02001 (2017)](https://www.consilium.europa.eu/prado/en/prado-documents/TUV/A/docs-per-category.html) |
| Uganda | `UG-passport-prado.webp` | [UGA-AO-03001 (2018)](https://www.consilium.europa.eu/prado/en/prado-documents/UGA/A/docs-per-category.html) |
| Uruguay | `UY-passport-prado.webp` | [URY-AO-01001 (2014)](https://www.consilium.europa.eu/prado/en/prado-documents/URY/A/docs-per-category.html) |
| Uzbekistan | `UZ-passport-prado.webp` | [UZB-AO-02001 (2011)](https://www.consilium.europa.eu/prado/en/prado-documents/UZB/A/docs-per-category.html) |
| Venezuela | `VE-passport-prado.webp` | [VEN-AO-02001 (2011)](https://www.consilium.europa.eu/prado/en/prado-documents/VEN/A/docs-per-category.html) |
| Vietnam | `VN-passport-prado.webp` | [VNM-AO-03001 (2023)](https://www.consilium.europa.eu/prado/en/prado-documents/VNM/A/docs-per-category.html) |
| Yemen | `YE-passport-prado.webp` | [YEM-AO-03001 (2013)](https://www.consilium.europa.eu/prado/en/prado-documents/YEM/A/docs-per-category.html) |
| Zambia | `ZM-passport-prado.webp` | [ZMB-AO-01001 (2008)](https://www.consilium.europa.eu/prado/en/prado-documents/ZMB/A/docs-per-category.html) |
| Zimbabwe | `ZW-passport-prado.webp` | [ZWE-AO-01002 (2015)](https://www.consilium.europa.eu/prado/en/prado-documents/ZWE/A/docs-per-category.html) |

## Regenerating

The generator scripts are not in this repository. To replace one image, keep the same file name and camera zones
(`documentLayouts` in `prado.js` or `variants.js`), or update them together.
