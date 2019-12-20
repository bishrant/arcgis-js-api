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

define(["dojo/_base/lang","../../sections/SectionTypes","../../grid/coreUtils/GridDataUtil","../../supportClasses/tableJson/TableJsonResizeUtil","../../supportClasses/templateJsonUtils/fieldInfo/FieldInfoFormatUtil","esri/dijit/geoenrichment/utils/FieldUtil"],function(t,e,a,i,n,s){function r(t,e){return s.isNumericField(t)&&"number"==typeof e&&!isNaN(e)}var o={};return o.buildSectionJsonsAndStat=function(t){var e=o._collectGridDataObjectsAndStats(t);if(!e)return null;if(e.gridDataObjects.length)var a=o._splitRowsByPages(e.gridDataObjects,t),i=a.map(function(e){return o._buildSectionJsonForPage(e,t)});return{sectionJsons:i,stats:e.stats,unitedSectionJson:o._buildSectionJsonForPage(e.gridDataObjects,t)}},o.buildStats=function(t){var e=o._collectGridDataObjectsAndStats(t,!0);return e&&e.stats},o._collectGridDataObjectsAndStats=function(e,i){var o=e.calculatorDataArray,l=e.searchTextRe;e.sorting;if(!o||!o.length){if(!e.allowNoResults)return null;o=[]}var d,c=e.dataSectionJson.stack[0],u=c.data.data[0],g=c.data.data[1],f={numAttributesTotal:0,numAttributesShown:0,ranges:{}};e.filterRanges&&(d={},e.filterRanges.forEach(function(t){d[t.fieldName]=t}));for(var h in u.fieldInfos){var m=u.fieldInfos[h];s.isNumericField(m)&&(f.ranges[m.name]={fieldName:m.name,alias:m.alias,min:1/0,max:-1/0,sumTotal:0,sumShown:0,decimals:m.decimals,dataArray:[]})}var b=[];return o.forEach(function(t,s){var o={style:null,fieldInfos:{}};f.numAttributesTotal++;var g=!1,h=!1,m=!1;c.data.columns.forEach(function(e){var i=u.fieldInfos[e.field],c=t[i.name];if(r(i,c)){var b=f.ranges[i.name];b.min=Math.min(b.min,c),b.max=Math.max(b.max,c),b.dataArray.push(c)}void 0===c||"string"==typeof c?o[e.field]=c||"":(o[e.field]=n.formatNumber(c,i),a.setNumericDataValue(c,o,e.field)),o.__attributeIndex=s;var v=d&&d[i.name];v&&(c<v.min||c>v.max)&&(g=!0),l&&"string"==typeof c&&(h=!0,l.test(c)&&(m=!0))});var v=g||h&&!m;v||i||(b.push(o),f.numAttributesShown++),c.data.columns.forEach(function(e){var a=u.fieldInfos[e.field],i=t[a.name];if(r(a,i)){var n=f.ranges[a.name];n.sumTotal+=i,v||(n.sumShown+=i)}}),e.setAttributeVisibleAt&&e.setAttributeVisibleAt(s,!v)}),e.sorting&&b.sort(function(t,i){var n=a.getNumericDataValue(t,e.sorting.field);n=void 0!==n?n:t[e.sorting.field];var s=a.getNumericDataValue(i,e.sorting.field);s=void 0!==s?s:i[e.sorting.field];var r="number"==typeof n?n-s:n.localeCompare(s);return"desc"===e.sorting.order?-r:r}),b.forEach(function(e,a){var i=a%2!=0?g||u:u;e.style=t.clone(i.style),e.style.height=u.style.height}),f.ranges=Object.keys(f.ranges).map(function(t){return f.ranges[t]}),{stats:f,gridDataObjects:b}},o.getAttributeIndexForGridData=function(t){return t.__attributeIndex},o._splitRowsByPages=function(t,e){var a,i=o._getHeaderHeight(e),n=o._getDataRowHeight(e),s=o._getDataListHeight(t,e),r=[],l=0;return t.forEach(function(t){a||(a=[],r.push(a),l+=i),a.push(t),(l+=n)+n>s&&(a=null,l=0)}),r},o._getHeaderHeight=function(t){return t.scaleToFitHeight?t.minRowHeight:t.headerSectionJson?t.headerSectionJson.stack[0].data.data[0].style.height:0},o._getDataRowHeight=function(t){return t.scaleToFitHeight?t.minRowHeight:t.dataSectionJson.stack[0].data.data[0].style.height},o._getDataListHeight=function(t,e){var a=o._getHeaderHeight(e),i=o._getDataRowHeight(e),n=e.height-(e.hasFooter?e.footerHeight:0)-(e.hasTitle?e.titleHeight:0),s=e.height-e.footerHeight-(e.hasTitle?e.titleHeight:0);return a+i*t.length<=n?n:s},o._buildSectionJsonForPage=function(a,n){var s;if(n.headerSectionJson){var r=n.headerSectionJson.stack[0];s={id:"table",attributes:{},style:{width:n.width},data:{columns:t.clone(r.data.columns),data:[t.clone(r.data.data[0])].concat(t.clone(a))}}}else{var l=n.dataSectionJson.stack[0];s={id:"table",attributes:{},style:{width:n.width},data:{columns:t.clone(l.data.columns),data:t.clone(a)}}}if(s.data.data.forEach(function(t,e){t.style.height=0===e&&n.headerSectionJson?o._getHeaderHeight(n):o._getDataRowHeight(n)}),n.scaleToFitHeight){var d=o._getDataListHeight(a,n);i.resizeTableJsonToFitHeight(s,d)}return i.resizeTableJsonToFitWidth(s,n.width),{type:e.DETAILS,stack:[s]}},o});