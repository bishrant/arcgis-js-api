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

define(["dojo/_base/lang","esri/dijit/geoenrichment/utils/MathUtil","esri/dijit/geoenrichment/ReportPlayer/core/grid/coreUtils/GridDataUtil","../../tableJson/TableJsonUtil"],function(e,t,n,o){var i={},a={provideParentInfo:function(e,t,n,o,i,a){s.collectStatistics(t),e._parentBox={x:function(){switch(i){case"floating":return t.style.left+a.left;case"page":return s.calcX(t,n,o)+a.left}}(),y:function(){switch(i){case"floating":return t.style.top+a.top;case"page":return s.calcY(t,n,o)+a.top}}(),w:s.calcFullWidth(t,n,o),h:s.calcFullHeight(t,n,o)},e._parentStyle={backgroundColor:function(e,t){return e.style.fields=e.style.fields||{},(e.style.fields[t]=e.style.fields[t]||{}).backgroundColor}(n,o.field)}},sanitize:function(e){s.sanitize(e)}},s={collectStatistics:function(e){if(!e._measureInfo){var t,n={},o={};e.data.columns.forEach(function(e){t&&(o[t.field]=e),t=e,n[e.field]=e});var i={},a={},l={},c={},r={},d={};e.data.data.forEach(function(t,n){e.data.columns.forEach(function(e,o){var f=r[o]||0,u=d[n]||0,g=s._getDataHeight(t,e.field),h=s._getFieldWidth(t,e);f+=g,u+=h,r[o]=f,d[n]=u;var p=o+"_"+n;a[p]=f,i[p]=u,l[p]=i[o-1+"_"+n]||0,c[p]=a[o+"_"+(n-1)]||0})}),e._measureInfo={xPositions:l,yPositions:c,columnsHash:n,nextColumnHash:o}}},calcX:function(e,t,n){var o=e.data.columns.indexOf(n),i=e.data.data.indexOf(t);return e._measureInfo.xPositions[o+"_"+i]||0},calcY:function(e,t,n){var o=e.data.columns.indexOf(n),i=e.data.data.indexOf(t);return e._measureInfo.yPositions[o+"_"+i]||0},calcFullWidth:function(e,t,n){var o=n.field,i=s._getFieldWidth(t,e._measureInfo.columnsHash[o]),a=t.columnSpans&&t.columnSpans[o]||1;if(a>1)for(var l,c=0;c<a-1;c++)l=e._measureInfo.nextColumnHash[l?l.field:o],i+=s._getFieldWidth(t,l);return i},_getFieldWidth:function(e,t){return e.style.fields=e.style.fields||{},(e.style.fields[t.field]=e.style.fields[t.field]||{}).width||t.style.width},calcFullHeight:function(e,t,n){var o=n.field,i=e.data.data.indexOf(t),a=s._getDataHeight(t,o),l=t.rowSpans&&t.rowSpans[o]||1;if(l>1)for(var c,r=i+1,d=0;d<l-1;d++)c=e.data.data[r++],a+=s._getDataHeight(c,o);return a},_getDataHeight:function(e,t){return e.style.fields=e.style.fields||{},(e.style.fields[t]=e.style.fields[t]||{}).height||e.style.height},sanitize:function(e){delete e._measureInfo}},l={getIntersectingTableJsonsBehind:function(e,i,a,s,l){function c(e){var s=e.data.data[0].fieldInfos[e.data.columns[0].field];return!!(n.isTextLikeCell(s)||n.isShapeCell(s)||n.isImageCell(s))&&t.checkRectsIntersect([a,{x:e.style.left+i.left,y:e.style.top+i.top,w:o.getTableWidth(e),h:o.getTableHeight(e)}])}function r(e){return t.checkRectsIntersect([a,{x:e.style.left+i.left,y:e.style.top+i.top,w:e.style.width,h:e.style.height}])}var d=[],f=[];return e.backgroundFloatingTablesSectionJson&&e.backgroundFloatingTablesSectionJson.stack.forEach(function(e,t){if((-1===s||l||s!==t)&&("table"===e.id&&c(e)||"img"===e.id&&r(e))){-1===s||l||s>t?d.push(e):f.push(e)}}),e.foregroundFloatingTablesSectionJson&&e.foregroundFloatingTablesSectionJson.stack.forEach(function(e,t){if(l&&s===t)return!0;if("table"===e.id&&c(e)||"img"===e.id&&r(e)){l&&s>t?d.push(e):f.push(e)}}),{elementJsonsBehind:d,elementJsonsAbove:f}}};return i.collectSectionJsons=function(e,t){t=t||{};var n=[];return e?e.sections?e.sections:e.sectionsTables?(t.processSectionJson=t.processSectionJson||function(){},e.sectionsTables.forEach(function(o,a){!1!==t.backgroundForeground&&o.foregroundSectionJson&&o.foregroundSectionJson.stack&&n.push(o.foregroundSectionJson);var s=[];!1!==t.floatingTables&&o.foregroundFloatingTablesSectionJson&&o.foregroundFloatingTablesSectionJson.stack.forEach(function(n,a){"table"===n.id&&i._processTableJson(n,s,"floating",e.documentOptions,t,o,a,!0)}),s.reverse(),s.forEach(function(e){t.processSectionJson(e,{pageIndex:a,source:"foreground",floatingIndex:e.__floatingIndex}),delete e.__floatingIndex}),n=n.concat(s);var l=[];i._processTableJson(o,l,"page",e.documentOptions,t,o),l.forEach(function(e){t.processSectionJson(e,{pageIndex:a,source:"grid",index:e.__inGridIndex}),delete e.__inGridIndex}),n=n.concat(l),s.length=0,!1!==t.floatingTables&&o.backgroundFloatingTablesSectionJson&&o.backgroundFloatingTablesSectionJson.stack.forEach(function(n,a){"table"===n.id&&i._processTableJson(n,s,"floating",e.documentOptions,t,o,a,!1)}),s.reverse(),s.forEach(function(e){t.processSectionJson(e,{pageIndex:a,source:"foreground",floatingIndex:e.__floatingIndex}),delete e.__floatingIndex}),n=n.concat(s),!1!==t.backgroundForeground&&o.backgroundSectionJson&&o.backgroundSectionJson.stack&&n.push(o.backgroundSectionJson)}),n):[]:[]},i._processTableJson=function(t,n,o,i,s,c,r,d){t.data.data.forEach(function(f,u){f.fieldInfos&&t.data.columns.forEach(function(g,h){function p(t){return t=e.clone(t),t.isContextFloatingElement=!0,t.style.left=t.style.left+i.left-m._parentBox.x,"table"===t.id?t.style.top=t.style.top+i.top-m._parentBox.y:"img"!==t.id&&"map"!==t.id||(t.style.top=t.style.top+i.top-m._parentBox.y),t}var _=f.fieldInfos[g.field];if(_&&_.sectionJson&&_.sectionJson.stack){if(s.processFieldInfoFunc&&s.processFieldInfoFunc(_),(!1!==s.saveParentInfo||s.populateWithFloatingElementsBehind)&&a.provideParentInfo(_.sectionJson,t,f,g,o,i),s.populateWithFloatingElementsBehind){var b,m=e.clone(_.sectionJson);"page"===o?b=l.getIntersectingTableJsonsBehind(c,i,m._parentBox,-1,void 0):"floating"===o&&(b=l.getIntersectingTableJsonsBehind(c,i,m._parentBox,r,d));var x=b.elementJsonsBehind.map(p),y=b.elementJsonsAbove.map(p);m.stack=x.concat(m.stack),m.stack=m.stack.concat(y),n.push(m)}else n.push(_.sectionJson);var J=n[n.length-1];"page"===o?J.__inGridIndex=u*t.data.columns.length+h:J.__floatingIndex=r}})}),a.sanitize(t)},i.getParentBox=function(e){return e&&e._parentBox},i.setParentBox=function(e,t){e._parentBox=t},i.getParentStyle=function(e){return e&&e._parentStyle},i});