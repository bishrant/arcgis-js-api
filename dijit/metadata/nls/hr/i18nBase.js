// COPYRIGHT © 201 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.31/esri/copyright.txt for details.

define({general:{cancel:"Odustani",close:"Zatvori",none:"Nema",ok:"U redu",other:"Ostalo",stamp:"Pečat",now:"Sada",choose:"Izaberi jedno:"},editor:{noMetadata:"Nema metapodataka za tu stavku.",xmlViewOnly:"Vrstu metapodataka povezanih sa stavkom ne podržava uređivač. Metapodaci moraju biti u formatu za ArcGIS.",editorDialog:{caption:"Metapodaci",captionPattern:"Metapodaci za {title}"},primaryToolbar:{view:"Prikaz",viewXml:"Prikaz XML-a",edit:"Uredi",initializing:"Učitavanje...",startingEditor:"Pokretanje uređivača...",loadingDocument:"Učitavanje dokumenta...",updatingDocument:"Ažuriranje dokumenta...",generatingView:"Stvaranje prikaza...",errors:{errorGeneratingView:"Došlo je do pogreške tijekom stvaranja prikaza.",errorLoadingDocument:"Došlo je do pogreške tijekom učitavanja dokumenta."}},changesNotSaved:{prompt:"Dokument ima promjene koje nisu spremljene.",dialogTitle:"Zatvori uređivač metapodataka",closeButton:"Zatvori"},download:{caption:"Preuzmi",dialogTitle:"Preuzmi",prompt:"Kliknite ovdje za preuzimanje datoteke."},load:{caption:"Otvori",dialogTitle:"Otvori",typeTab:"Novi dokument",fileTab:"Otvori datoteku",templateTab:"Predložak",itemTab:"Vaša stavka",filePrompt:"Odaberite lokalnu XML datoteku metapodataka za ArcGIS. Metapodaci moraju biti u formatu za ArcGIS.",templatePrompt:"Stvori metapodatke",pullItem:"Popuni metapodatke pojedinostima o stavci.",importWarning:"Odabrana datoteka nije u formatu za ArcGIS. Učitani metapodaci moraju biti u formatu za ArcGIS.",loading:"Učitavanje...",noMetadata:"Mogu se stvoriti metapodaci za ovu stavku odabirom jedne od sljedećih opcija.",unrecognizedMetadata:"Vrstu metapodataka povezanih sa stavkom ne podržava uređivač. Podržani metapodaci mogu se stvoriti odabirom jedne od sljedećih opcija.",errorLoading:"Došlo je do pogreške tijekom učitavanja.",warnings:{badFile:"Odabrana datoteka nije se mogla učitati.",notAnXml:"Odabrana datoteka nije XML datoteka.",notSupported:"Ova vrsta datoteka nije podržana."},portalCaption:"Prebriši"},save:{caption:"Spremi",dialogTitle:"Spremi metapodatke",working:"Spremanje metapodataka...",errorSaving:"Došlo je do pogreške, vaši metapodaci nisu spremljeni.",saveDialog:{pushCaption:"Primijeni promjene na stavku"}},saveAndClose:{caption:"Spremi i zatvori"},saveDraft:{caption:"Preuzmi",dialogTitle:"Preuzmi"},validate:{caption:"Provjeri valjanost",dialogTitle:"Provjera valjanosti",docIsValid:"Vaš je dokument važeći."},viewHtml:{caption:"Prikaži",dialogTitle:"Prikaz metapodataka",savePrompt:"Vaš dokument ima nespremljene promjene. Morate spremiti sve promjene kako biste iz vidjeli kada prikazujete metapodatke.",saveButton:"Spremi i prikaži",portalNone:"Metapodaci temeljeni na standardima nemaju autora. Prvo morate spremiti prije prikaza metapodataka."},del:{caption:"Izbriši",dialogTitle:"Izbriši metapodatke",prompt:"Jeste li sigurni da želite izbrisati ove metapodatke?",working:"Brisanje metapodataka...",errorDeleting:"Došlo je do pogreške, vaši metapodaci nisu izbrisani.",portalNone:"Nema dostupnih dokumenata metapodataka za brisanje. Metapodaci temeljeni na standardima nemaju autora.",portalPrompt:"To će izbrisati dokumet metapodataka i poništiti metapodatke ove stavke za informacije o stavki kao što su naslov, opis itd.",portalPrompt2:"Ovo će izbrisati metapodatke koji se temelje na standardima. Jeste li sigurni da želite izbrisati ove metapodatke?",portalButton:"Izbriši i zatvori"},transform:{caption:"Pretvori",dialogTitle:"Pretvori u",prompt:"",working:"Pretvorba...",errorTransforming:"Došlo je do pogreške tijekom pretvorbe dokumenta."},errorDialog:{dialogTitle:"Došlo je do pogreške"}},arcgis:{portal:{metadataButton:{caption:"Metapodaci"}}},calendar:{button:"Kalendar...",title:"Kalendar"},geoExtent:{button:"Postavi geografski obuhvat...",title:"Geografski obuhvat",navigate:"Navigiraj",draw:"Nacrtaj pravokutnik",drawHint:"Pritisnite prema dolje za početak i pustite za završetak."},hints:{date:"(gggg ili gggg-mm ili gggg-mm-dd)",dateTime:"(gggg-mm-ddThh:mm:ss.sss[+-]hh:mm)",dateOrDateTime:"(gggg ili gggg-mm ili gggg-mm-dd ili gggg-mm-ddThh:mm:ss.sss[+-]hh:mm)",delimitedTextArea:"(razdvojite zarezom ili novim retkom)",fgdcDate:"(gggg ili gggg-mm ili gggg-mm-dd)",fgdcTime:"(hh:mm:ss.sss[+-]hh:mm)",integer:"(unesite cijeli broj)",latitude:"(decimalni stupnjevi)",longitude:"(decimalni stupnjevi)",number:"(unesite broj)",numberGreaterThanZero:"(unesite broj > 0)"},isoTopicCategoryCode:{caption:"Kategorija teme",boundaries:"Administrativne i političke granice",farming:"Poljoprivreda i uzgoj",climatologyMeteorologyAtmosphere:"Atmosfera i klima",biota:"Biologija i ekologija",economy:"Poslovanje i ekonomija",planningCadastre:"Katastar",society:"Kultura, društvo i demografija",elevation:"Visina terena i nastali proizvodi",environment:"Okoliš i očuvanje",structure:"Objekti i strukture",geoscientificInformation:"Geologija i geofizika",health:"Ljudsko zdravlje i bolest",imageryBaseMapsEarthCover:"Snimke i kartografske podloge",inlandWaters:"Resursi kopnenih voda",location:"Lokacije i geodetske mreže",intelligenceMilitary:"Vojska",oceans:"Oceani i estuariji",transportation:"Prijevozne mreže",utilitiesCommunication:"Uslužni programi i komunikacija"},multiplicity:{moveElementDown:"Pomakni odjeljak prema dolje",moveElementUp:"Premjesti odjeljak prema gore",removeElement:"Ukloni odjeljak",repeatElement:"Ponovi odjeljak"},optionalNode:{switchTip:"Uključi ili izostavi ovaj odjeljak."},serviceTypes:{featureService:"Usluga geoobjekata",mapService:"Usluga karte",imageService:"Usluga slike",wms:"WMS",wfs:"WFS",wcs:"WCS"},validation:{pattern:"{label} - {message}",patternWithHint:"{label} - {message} {hint}",ok:"U redu",empty:"Potrebna je vrijednost.",date:"Vrijednost mora biti datum.",integer:"Vrijednost mora biti cijeli broj.",number:"Vrijednost mora biti broj.",other:"Vrijednost nije važeća."},validationPane:{clearMessages:"Očisti poruke",prompt:"(kliknite na svaku poruku u nastavku i navedite potrebne informacije u određenom polju)"}});