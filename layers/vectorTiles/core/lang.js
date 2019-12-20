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

define(["dojo/_base/kernel","dojo/_base/lang","dojo/date","dojo/number","dojo/date/locale","dojo/i18n!../nls/common"],function(e,t,n,r,i,o){function a(n,r,i){return[t.isString(n)?n.split(""):n,r||e.global,t.isString(i)?new Function("item","index","array",i):i]}function f(e){return void 0!==e&&null!==e}function s(e){return f(e)?e:""}function u(e,o,a){var u,c=a.match(/([^\(]+)(\([^\)]+\))?/i),l=t.trim(c[1]),p=o[e],d=JSON.parse((c[2]?t.trim(c[2]):"{}").replace(/^\(/,"{").replace(/\)$/,"}").replace(/([{,])\s*([0-9a-zA-Z\_]+)\s*:/gi,'$1"$2":').replace(/\"\s*:\s*\'/gi,'":"').replace(/\'\s*(,|\})/gi,'"$1')),g=d.utcOffset;if(-1===m.indexOf(l)){var y=t.getObject(l);t.isFunction(y)&&(p=y(p,e,o,d))}else if("number"==typeof p||"string"==typeof p&&p&&!isNaN(Number(p)))switch(p=Number(p),l){case"NumberFormat":var b=t.mixin({},d),h=parseFloat(b.places);return(isNaN(h)||h<0)&&(b.places=1/0),r.format(p,b);case"DateString":return u=new Date(p),d.local||d.systemLocale?d.systemLocale?u.toLocaleDateString()+(d.hideTime?"":" "+u.toLocaleTimeString()):u.toDateString()+(d.hideTime?"":" "+u.toTimeString()):(u=u.toUTCString(),d.hideTime&&(u=u.replace(/\s+\d\d\:\d\d\:\d\d\s+(utc|gmt)/i,"")),u);case"DateFormat":return u=new Date(p),f(g)&&(u=n.add(u,"minute",u.getTimezoneOffset()-g)),i.format(u,d)}return s(p)}function c(e,t){var n;if(t)for(n in e)e.hasOwnProperty(n)&&(void 0===e[n]?delete e[n]:e[n]instanceof Object&&c(e[n],!0));else for(n in e)e.hasOwnProperty(n)&&void 0===e[n]&&delete e[n];return e}function l(e){if(!e||"object"!=typeof e||t.isFunction(e))return e;if(e instanceof Int8Array||e instanceof Uint8Array||e instanceof Uint8ClampedArray||e instanceof Int16Array||e instanceof Int32Array||e instanceof Uint16Array||e instanceof Uint32Array||e instanceof Float32Array||e instanceof Float64Array||e instanceof Date){return new(0,e.constructor)(e)}if(e instanceof ArrayBuffer)return e.slice(0,e.byteLength);return"function"==typeof e.clone?e.clone():"function"==typeof e.map&&"function"==typeof e.forEach?e.map(l):"function"==typeof e.notifyChange&&"function"==typeof e.watch?e.clone():function(e,t,n){var r,i,o={};for(r in t){i=t[r];var a=!(r in o)||o[r]!==i;r in e&&(e[r]===i||!a)||(e[r]=n?n(i):i)}return e}({},e,l)}var m=["NumberFormat","DateString","DateFormat"],p=/<\/?[^>]+>/g;return{equals:function(e,n){return e===n||"number"==typeof e&&isNaN(e)&&"number"==typeof n&&isNaN(n)||t.isFunction((e||{}).getTime)&&t.isFunction((n||{}).getTime)&&e.getTime()==n.getTime()||t.isFunction((e||{}).equals)&&e.equals(n)||t.isFunction((n||{}).equals)&&n.equals(e)||!1},mixin:t.mixin,valueOf:function(e,t){var n;for(n in e)if(e[n]==t)return n;return null},stripTags:function(e){if(e){var t=typeof e;if("string"===t)e=e.replace(p,"");else if("object"===t){var n;for(n in e){var r=e[n];r&&"string"==typeof r&&(r=r.replace(p,"")),e[n]=r}}}return e},substitute:function(e,n,r){var i,a,c;if(f(r)&&(t.isObject(r)?(i=r.first,a=r.dateFormat,c=r.numberFormat):i=r),n&&"{*}"!==n)return t.replace(n,t.hitch({obj:e},function(e,t){var n=t.split(":");return n.length>1?(t=n[0],n.shift(),u(t,this.obj,n.join(":"))):a&&-1!==(a.properties||[]).indexOf(t)?u(t,this.obj,a.formatter||"DateString"):c&&-1!==(c.properties||[]).indexOf(t)?u(t,this.obj,c.formatter||"NumberFormat"):s(this.obj[t])}));var l,m,p=[];p.push('<table class="esri-widget__table" summary="'+o.fieldsSummary+'"><tbody>');for(m in e)if(l=e[m],a&&-1!==(a.properties||[]).indexOf(m)?l=u(m,e,a.formatter||"DateString"):c&&-1!==(c.properties||[]).indexOf(m)&&(l=u(m,e,c.formatter||"NumberFormat")),p.push("<tr><th>"+m+"</th><td>"+s(l)+"</td></tr>"),i)break;return p.push("</tbody></table>"),p.join("")},filter:function(e,t,n){var r,i=a(e,n,t),o={};e=i[0];for(r in e)i[2].call(i[r],e[r],r,e)&&(o[r]=e[r]);return o},startsWith:function(e,t,n){return n=n||0,e.indexOf(t,n)===n},endsWith:function(e,t,n){("number"!=typeof n||!isFinite(n)||Math.floor(n)!==n||n>e.length)&&(n=e.length),n-=t.length;var r=e.indexOf(t,n);return-1!==r&&r===n},isDefined:f,fixJson:c,clone:l}});