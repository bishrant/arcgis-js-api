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

define(["esri/dijit/geoenrichment/utils/JsonXmlConverter","./MetadataToRendererParser","./MapTagsUtil","esri/dijit/geoenrichment/utils/ImageUtil"],function(e,r,t,a){var s={};return s.parseMapCalculators=function(r,t,a){e.queryJson(r,"Maps").forEach(function(r){e.queryJson(r,"Map").forEach(function(e){var o=s._parsePortalLayers(e),i=s._parseStudyAreas(e),n={fieldName:e.attributes.Name,defaultBasemapId:o.defaultBasemapId,webMapId:o.webMapId,additionalLayerInfos:s._parseAdditionalLayers(e,t),pinSymbolJson:s._parseSiteLayerPinSymbol(e,a),areaSymbolJsons:i.symbolJsons,areaSymbolRamp:i.ramp,mapScale:Number(e.attributes.Scale)||null};t&&(t.metadata.mapImageInfosHash[r.attributes.Name+"."+e.attributes.Name]=n)})})},s._parsePortalLayers=function(r){var t,a,s=e.queryJson(r,"Layer"),o=s.filter(function(e){return!!e.attributes.PortalItemId});return o.length>1&&(t=o.shift()),a=o.shift(),{defaultBasemapId:t&&t.attributes.PortalItemId,webMapId:a&&a.attributes.PortalItemId}},s._parseAdditionalLayers=function(t,a){var s=[];return e.queryJson(t,/^(Layer|LocatorResultsLayer|ComparisonResultsLayer)$/).filter(function(e){return!!e.attributes.ServiceUrl||"LocatorResultsLayer"===e.name||"ComparisonResultsLayer"===e.name}).forEach(function(e){if(e.attributes.ServiceUrl)s.push({url:e.attributes.ServiceUrl});else if("LocatorResultsLayer"===e.name){var t=e.tags&&e.tags.filter(function(e){return"Renderer"===e.name})[0],o=a.metadata.locatorCalculatorsHash[e.attributes.CalculatorName];o.isValid&&s.push({isLocatorLayer:!0,layerName:e.attributes.LayerName,calculatorName:e.attributes.CalculatorName,calculatorInfo:o,rendererJson:t&&r.parseRendererJson(t)})}else if("ComparisonResultsLayer"===e.name){var t=e.tags&&e.tags.filter(function(e){return"Renderer"===e.name})[0],i=t&&r.parseRendererJson(t);if(i&&"esriTS"===i.uniqueValueInfos[0].symbol.type)s[s.length-1].labelRendererJson=i;else{var n=e.tags&&e.tags.filter(function(e){return"LabelingInfo"===e.name})[0],u=n&&r.parseLabelRendererJson(n);s.push({isComparisonLayer:!0,calculatorName:e.attributes.CalculatorName,rendererJson:i,labelRendererJson:u})}}}),s.length&&s},s._parseSiteLayerPinSymbol=function(r,s){var o,i=e.queryJson(r,"SiteLayer")[0];if(i){var n=e.queryJson(i,"Symbol")[0];if(n&&"Image"===n.attributes.Type){var u=s.getImageData(n.attributes.Name);u&&(o={type:"esriPMS",contentType:a.getContentType(u),imageData:a.base64DataFromDataURL(u),url:n.attributes.Url,width:Number(n.attributes.Width),height:Number(n.attributes.Height),angle:Number(n.attributes.Angle)||0,xoffset:Number(n.attributes.XOffset)||0,yoffset:Number(n.attributes.YOffset)||0})}else if(n&&"Marker"===n.attributes.Type){var l=e.queryJson(n,"Fill")[0],y=l&&e.queryJson(l,"Color")[0],m=e.queryJson(n,"Outline")[0],b=m&&e.queryJson(m,"Color")[0];o={type:"esriSMS",style:"esriSMS"+(n.attributes.Style||"Circle"),size:Number(n.attributes.Size),angle:Number(n.attributes.Angle)||0,xoffset:Number(n.attributes.XOffset)||0,yoffset:Number(n.attributes.YOffset)||0,color:t.parseColorTag(y),outline:m&&{type:"esriSLS",color:t.parseColorTag(b),style:"esriSLS"+(m.attributes.Style||"Solid"),width:void 0===m.attributes.Width?0:Number(m.attributes.Width)}}}}return o},s._parseStudyAreas=function(r){var t,a=e.queryJson(r,"StudyAreasLayer")[0],o=a&&e.queryJson(a,"SymbolsPalette",!0)[0],i=o&&e.queryJson(o,"Symbol",!0)||[],n=i.map(s._parseAreaSymbol),u=o&&e.queryJson(o,"SymbolRamp",!0)[0];if(u){var l=e.queryJson(u,"First",!0)[0],y=e.queryJson(u,"Last",!0)[0];l=l&&e.queryJson(l,"Symbol",!0)[0],y=y&&e.queryJson(y,"Symbol",!0)[0],l&&y&&(t=[l,y].map(s._parseAreaSymbol))}return{ramp:t,symbolJsons:n}},s._parseAreaSymbol=function(r){var a=e.queryJson(r,"Fill")[0],s=a&&e.queryJson(a,"Color")[0],o=e.queryJson(r,"Outline")[0],i=o&&e.queryJson(o,"Color")[0];return{type:"esriSFS",style:"esriSFSSolid",color:t.parseColorTag(s)||[0,0,0,1],outline:o&&{type:"esriSLS",color:t.parseColorTag(i),style:"esriSLS"+(o.attributes.Style||"Solid"),width:void 0===o.attributes.Width?0:Number(o.attributes.Width)}}},s});