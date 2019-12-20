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

define({general:{cancel:"Cancel·la",close:"Tanca",none:"Cap",ok:"D’acord",other:"Altres",stamp:"Segell",now:"Ara",choose:"Trieu-ne un:"},editor:{noMetadata:"No hi cap metadada per a aquest element.",xmlViewOnly:"L’editor no admet el tipus de metadades associat amb aquest element. Les metadades han d’estar en el format de l’ArcGIS.",editorDialog:{caption:"Metadades",captionPattern:"Metadades de {title}"},primaryToolbar:{view:"Visualitza",viewXml:"Visualitza l’XML",edit:"Edita",initializing:"S’està carregant...",startingEditor:"S’està iniciant l’editor...",loadingDocument:"S’està carregant el document...",updatingDocument:"S’està actualitzant el document...",generatingView:"S’està generant la visualització...",errors:{errorGeneratingView:"S’ha produït un error en generar la visualització.",errorLoadingDocument:"S’ha produït un error en carregar el document."}},changesNotSaved:{prompt:"El document té canvis que no s’han desat.",dialogTitle:"Tanca l’editor de metadades",closeButton:"Tanca"},download:{caption:"Baixa",dialogTitle:"Baixa",prompt:"Feu clic aquí per baixar el fitxer."},load:{caption:"Obre",dialogTitle:"Obre",typeTab:"Document nou",fileTab:"Obre el fitxer",templateTab:"Una plantilla",itemTab:"El vostre element",filePrompt:"Seleccioneu un fitxer XML de metadades de l’ArcGIS local. Les metadades han d’estar en el format de l’ArcGIS.",templatePrompt:"Crea metadades",pullItem:"Emplena les metadades amb el detalls de l’element.",importWarning:"El fitxer seleccionat no sembla tenir el format de l’ArcGIS. Les metadades pujades han de tenir aquest format.",loading:"S’està carregant...",noMetadata:"Per crear metadades per a aquest element es pot seleccionar una de les opcions següents.",unrecognizedMetadata:"L’editor no admet el tipus de metadades associat amb aquest element. Per crear metadades compatibles es pot seleccionar una de les opcions següents.",errorLoading:"S’ha produït un error en la càrrega.",warnings:{badFile:"No s’ha pogut carregar el fitxer seleccionat.",notAnXml:"El fitxer seleccionat no és un fitxer XML.",notSupported:"Aquest tipus de fitxer no és compatible."},portalCaption:"Sobreescriu-ho"},save:{caption:"Desa",dialogTitle:"Desa les metadades",working:"S’estan desant les metadades...",errorSaving:"S’ha produït un error i no s’han desat les metadades.",saveDialog:{pushCaption:"Aplica els canvis a l’element"}},saveAndClose:{caption:"Desa i tanca"},saveDraft:{caption:"Baixa",dialogTitle:"Baixa"},validate:{caption:"Valida",dialogTitle:"Validació",docIsValid:"El document és vàlid."},viewHtml:{caption:"Visualitza",dialogTitle:"Visualitza les metadades",savePrompt:"El document té canvis sense desar. Heu de desar tots els canvis perquè siguin visibles quan visualitzeu les metadades.",saveButton:"Desa i visualitza",portalNone:"No s’han creat metadades basades en estàndards. Heu de desar els canvis per poder visualitzar les metadades."},del:{caption:"Suprimeix",dialogTitle:"Suprimeix les metadades",prompt:"Segur que voleu suprimir aquestes metadades?",working:"S’estan suprimint les metadades...",errorDeleting:"S’ha produït un error i no s’han suprimit les metadades.",portalNone:"No hi ha cap document de metadades disponible per suprimir. No s’han creat metadades basades en estàndards.",portalPrompt:"Se suprimirà el document de metadades i es restabliran les metadades d’aquest element a la informació de l’element, com ara el títol, la descripció, etc.",portalPrompt2:"Se suprimiran totes les metadades basades en estàndards. Segur que voleu suprimir aquestes metadades?",portalButton:"Suprimeix i tanca"},transform:{caption:"Transforma",dialogTitle:"Transforma en",prompt:"",working:"S’està transformant...",errorTransforming:"S’ha produït un error en transformar el document."},errorDialog:{dialogTitle:"S’ha produït un error"}},arcgis:{portal:{metadataButton:{caption:"Metadades"}}},calendar:{button:"Calendari...",title:"Calendari"},geoExtent:{button:"Defineix l’extensió geogràfica...",title:"Extensió geogràfica",navigate:"Navega",draw:"Dibuixa un rectangle",drawHint:"Manteniu pressionat per començar i deixeu anar per finalitzar."},hints:{date:"(aaaa o aaaa-mm o aaaa-mm-dd)",dateTime:"(aaaa-mm-ddThh:mm:ss.sss[+-]hh:mm)",dateOrDateTime:"(aaaa o aaaa-mm o aaaa-mm-dd o aaaa-mm-ddThh:mm:ss.sss[+-]hh:mm)",delimitedTextArea:"(utilitzeu la coma o una línia nova com a separador)",fgdcDate:"(aaaa o aaaa-mm o aaaa-mm-dd)",fgdcTime:"(hh:mm:ss.sss[+-]hh:mm)",integer:"(introduïu un enter)",latitude:"(graus decimals)",longitude:"(graus decimals)",number:"(introduïu un nombre)",numberGreaterThanZero:"(introduïu un nombre > 0)"},isoTopicCategoryCode:{caption:"Categoria del tema",boundaries:"Límits administratius i polítics",farming:"Agricultura i ramaderia",climatologyMeteorologyAtmosphere:"Atmosfera i clima",biota:"Biologia i ecologia",economy:"Negocis i economia",planningCadastre:"Cadastre",society:"Cultura, societat i demografia",elevation:"Elevació i productes derivats",environment:"Medi ambient i conservació",structure:"Infraestructures i estructures",geoscientificInformation:"Geologia i geofísica",health:"Salut humana i malalties",imageryBaseMapsEarthCover:"Imatges i mapes base",inlandWaters:"Recursos d’aigües continentals",location:"Ubicacions i xarxes geodèsiques",intelligenceMilitary:"Afers militars",oceans:"Oceans i estuaris",transportation:"Xarxes de transport",utilitiesCommunication:"Subministraments i comunicació"},multiplicity:{moveElementDown:"Abaixa la secció",moveElementUp:"Apuja la secció",removeElement:"Elimina la secció",repeatElement:"Repeteix la secció"},optionalNode:{switchTip:"Incloeu o excloeu aquesta secció."},serviceTypes:{featureService:"Servei d’entitats",mapService:"Servei de mapes",imageService:"Servei d’imatges",wms:"WMS",wfs:"WFS",wcs:"WCS"},validation:{pattern:"{label}: {message}",patternWithHint:"{label}: {message} {hint}",ok:"D’acord",empty:"És necessari un valor.",date:"El valor ha de ser una data.",integer:"El valor ha de ser un enter.",number:"El valor ha de ser un nombre.",other:"Valor no vàlid."},validationPane:{clearMessages:"Esborra els missatges",prompt:"(feu clic a cadascun dels missatges següents i proporcioneu la informació necessària al camp que s’indiqui)"}});