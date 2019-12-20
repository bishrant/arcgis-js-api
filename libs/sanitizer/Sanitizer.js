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

/*!
 * @esri/arcgis-html-sanitizer - v1.3.0 - Thu Sep 05 2019 13:28:05 GMT-0700 (Pacific Daylight Time)
 * Copyright (c) 2019 - Environmental Systems Research Institute, Inc.
 * Apache-2.0
 * 
 * js-xss
 * Copyright (c) 2012-2017 Zongmin Lei(雷宗民) <leizongmin@gmail.com>
 * http://ucdok.com
 * MIT License, see https://github.com/leizongmin/js-xss/blob/master/LICENSE for details
 * 
 * Lodash/isPlainObject
 * Copyright (c) JS Foundation and other contributors <https://js.foundation/>
 * MIT License, see https://raw.githubusercontent.com/lodash/lodash/4.17.10-npm/LICENSE for details
 */

!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Sanitizer=e():t.Sanitizer=e()}(this,function(){return function(t){function e(i){if(r[i])return r[i].exports;var n=r[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,e),n.l=!0,n.exports}var r={};return e.m=t,e.c=r,e.d=function(t,r,i){e.o(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:i})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,r){if(1&r&&(t=e(t)),8&r)return t;if(4&r&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(e.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&r&&"string"!=typeof t)for(var n in t)e.d(i,n,function(e){return t[e]}.bind(null,n));return i},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=8)}([function(t,e,r){function i(t,e){return new s(e).process(t)}var n=void 0,o=r(3),a=r(6),s=r(11);for(var l in(e=t.exports=i).filterXSS=i,e.FilterXSS=s,o)e[l]=o[l];for(var l in a)e[l]=a[l];void 0!==n&&(n.filterXSS=t.exports),"undefined"!=typeof self&&"undefined"!=typeof DedicatedWorkerGlobalScope&&self instanceof DedicatedWorkerGlobalScope&&(self.filterXSS=t.exports)},function(t,e,r){var i=void 0,n=r(4),o=r(9);for(var a in(e=t.exports=function(t,e){return new o(e).process(t)}).FilterCSS=o,n)e[a]=n[a];void 0!==i&&(i.filterCSS=t.exports)},function(t,e){t.exports={indexOf:function(t,e){var r,i;if(Array.prototype.indexOf)return t.indexOf(e);for(r=0,i=t.length;r<i;r++)if(t[r]===e)return r;return-1},forEach:function(t,e,r){var i,n;if(Array.prototype.forEach)return t.forEach(e,r);for(i=0,n=t.length;i<n;i++)e.call(r,t[i],i,t)},trim:function(t){return String.prototype.trim?t.trim():t.replace(/(^\s*)|(\s*$)/g,"")},spaceIndex:function(t){var e=/\s|\n|\t/.exec(t);return e?e.index:-1}}},function(t,e,r){function i(){return{a:["target","href","title"],abbr:["title"],address:[],area:["shape","coords","href","alt"],article:[],aside:[],audio:["autoplay","controls","loop","preload","src"],b:[],bdi:["dir"],bdo:["dir"],big:[],blockquote:["cite"],br:[],caption:[],center:[],cite:[],code:[],col:["align","valign","span","width"],colgroup:["align","valign","span","width"],dd:[],del:["datetime"],details:["open"],div:[],dl:[],dt:[],em:[],font:["color","size","face"],footer:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],header:[],hr:[],i:[],img:["src","alt","title","width","height"],ins:["datetime"],li:[],mark:[],nav:[],ol:[],p:[],pre:[],s:[],section:[],small:[],span:[],sub:[],sup:[],strong:[],table:["width","border","align","valign"],tbody:["align","valign"],td:["width","rowspan","colspan","align","valign"],tfoot:["align","valign"],th:["width","rowspan","colspan","align","valign"],thead:["align","valign"],tr:["rowspan","align","valign"],tt:[],u:[],ul:[],video:["autoplay","controls","loop","preload","src","height","width"]}}function n(t){return t.replace(m,"&lt;").replace(b,"&gt;")}function o(t){return t.replace(v,"&quot;")}function a(t){return t.replace(y,'"')}function s(t){return t.replace(w,function(t,e){return"x"===e[0]||"X"===e[0]?String.fromCharCode(parseInt(e.substr(1),16)):String.fromCharCode(parseInt(e,10))})}function l(t){return t.replace(x,":").replace(k," ")}function c(t){for(var e="",r=0,i=t.length;r<i;r++)e+=t.charCodeAt(r)<32?" ":t.charAt(r);return d.trim(e)}function u(t){return t=c(t=l(t=s(t=a(t))))}function f(t){return t=n(t=o(t))}var p=r(1).FilterCSS,g=r(1).getDefaultWhiteList,d=r(2),h=new p,m=/</g,b=/>/g,v=/"/g,y=/&quot;/g,w=/&#([a-zA-Z0-9]*);?/gim,x=/&colon;?/gim,k=/&newline;?/gim,A=/((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a)\:/gi,S=/e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi,O=/u\s*r\s*l\s*\(.*/gi,T=/<!--[\s\S]*?-->/g;e.whiteList={a:["target","href","title"],abbr:["title"],address:[],area:["shape","coords","href","alt"],article:[],aside:[],audio:["autoplay","controls","loop","preload","src"],b:[],bdi:["dir"],bdo:["dir"],big:[],blockquote:["cite"],br:[],caption:[],center:[],cite:[],code:[],col:["align","valign","span","width"],colgroup:["align","valign","span","width"],dd:[],del:["datetime"],details:["open"],div:[],dl:[],dt:[],em:[],font:["color","size","face"],footer:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],header:[],hr:[],i:[],img:["src","alt","title","width","height"],ins:["datetime"],li:[],mark:[],nav:[],ol:[],p:[],pre:[],s:[],section:[],small:[],span:[],sub:[],sup:[],strong:[],table:["width","border","align","valign"],tbody:["align","valign"],td:["width","rowspan","colspan","align","valign"],tfoot:["align","valign"],th:["width","rowspan","colspan","align","valign"],thead:["align","valign"],tr:["rowspan","align","valign"],tt:[],u:[],ul:[],video:["autoplay","controls","loop","preload","src","height","width"]},e.getDefaultWhiteList=i,e.onTag=function(t,e,r){},e.onIgnoreTag=function(t,e,r){},e.onTagAttr=function(t,e,r){},e.onIgnoreTagAttr=function(t,e,r){},e.safeAttrValue=function(t,e,r,i){if(r=u(r),"href"===e||"src"===e){if("#"===(r=d.trim(r)))return"#";if("http://"!==r.substr(0,7)&&"https://"!==r.substr(0,8)&&"mailto:"!==r.substr(0,7)&&"tel:"!==r.substr(0,4)&&"#"!==r[0]&&"/"!==r[0])return""}else if("background"===e){if(A.lastIndex=0,A.test(r))return""}else if("style"===e){if(S.lastIndex=0,S.test(r))return"";if(O.lastIndex=0,O.test(r)&&(A.lastIndex=0,A.test(r)))return"";!1!==i&&(r=(i=i||h).process(r))}return r=f(r)},e.escapeHtml=n,e.escapeQuote=o,e.unescapeQuote=a,e.escapeHtmlEntities=s,e.escapeDangerHtml5Entities=l,e.clearNonPrintableCharacter=c,e.friendlyAttrValue=u,e.escapeAttrValue=f,e.onIgnoreTagStripAll=function(){return""},e.StripTagBody=function(t,e){"function"!=typeof e&&(e=function(){});var r=!Array.isArray(t),i=[],n=!1;return{onIgnoreTag:function(o,a,s){if(function(e){return!!r||-1!==d.indexOf(t,e)}(o)){if(s.isClosing){var l="[/removed]",c=s.position+l.length;return i.push([!1!==n?n:s.position,c]),n=!1,l}return n||(n=s.position),"[removed]"}return e(o,a,s)},remove:function(t){var e="",r=0;return d.forEach(i,function(i){e+=t.slice(r,i[0]),r=i[1]}),e+=t.slice(r)}}},e.stripCommentTag=function(t){return t.replace(T,"")},e.stripBlankChar=function(t){var e=t.split("");return(e=e.filter(function(t){var e=t.charCodeAt(0);return!(127===e||e<=31&&10!==e&&13!==e)})).join("")},e.cssFilter=h,e.getDefaultCSSWhiteList=g},function(t,e){function r(){return{"align-content":!1,"align-items":!1,"align-self":!1,"alignment-adjust":!1,"alignment-baseline":!1,all:!1,"anchor-point":!1,animation:!1,"animation-delay":!1,"animation-direction":!1,"animation-duration":!1,"animation-fill-mode":!1,"animation-iteration-count":!1,"animation-name":!1,"animation-play-state":!1,"animation-timing-function":!1,azimuth:!1,"backface-visibility":!1,background:!0,"background-attachment":!0,"background-clip":!0,"background-color":!0,"background-image":!0,"background-origin":!0,"background-position":!0,"background-repeat":!0,"background-size":!0,"baseline-shift":!1,binding:!1,bleed:!1,"bookmark-label":!1,"bookmark-level":!1,"bookmark-state":!1,border:!0,"border-bottom":!0,"border-bottom-color":!0,"border-bottom-left-radius":!0,"border-bottom-right-radius":!0,"border-bottom-style":!0,"border-bottom-width":!0,"border-collapse":!0,"border-color":!0,"border-image":!0,"border-image-outset":!0,"border-image-repeat":!0,"border-image-slice":!0,"border-image-source":!0,"border-image-width":!0,"border-left":!0,"border-left-color":!0,"border-left-style":!0,"border-left-width":!0,"border-radius":!0,"border-right":!0,"border-right-color":!0,"border-right-style":!0,"border-right-width":!0,"border-spacing":!0,"border-style":!0,"border-top":!0,"border-top-color":!0,"border-top-left-radius":!0,"border-top-right-radius":!0,"border-top-style":!0,"border-top-width":!0,"border-width":!0,bottom:!1,"box-decoration-break":!0,"box-shadow":!0,"box-sizing":!0,"box-snap":!0,"box-suppress":!0,"break-after":!0,"break-before":!0,"break-inside":!0,"caption-side":!1,chains:!1,clear:!0,clip:!1,"clip-path":!1,"clip-rule":!1,color:!0,"color-interpolation-filters":!0,"column-count":!1,"column-fill":!1,"column-gap":!1,"column-rule":!1,"column-rule-color":!1,"column-rule-style":!1,"column-rule-width":!1,"column-span":!1,"column-width":!1,columns:!1,contain:!1,content:!1,"counter-increment":!1,"counter-reset":!1,"counter-set":!1,crop:!1,cue:!1,"cue-after":!1,"cue-before":!1,cursor:!1,direction:!1,display:!0,"display-inside":!0,"display-list":!0,"display-outside":!0,"dominant-baseline":!1,elevation:!1,"empty-cells":!1,filter:!1,flex:!1,"flex-basis":!1,"flex-direction":!1,"flex-flow":!1,"flex-grow":!1,"flex-shrink":!1,"flex-wrap":!1,float:!1,"float-offset":!1,"flood-color":!1,"flood-opacity":!1,"flow-from":!1,"flow-into":!1,font:!0,"font-family":!0,"font-feature-settings":!0,"font-kerning":!0,"font-language-override":!0,"font-size":!0,"font-size-adjust":!0,"font-stretch":!0,"font-style":!0,"font-synthesis":!0,"font-variant":!0,"font-variant-alternates":!0,"font-variant-caps":!0,"font-variant-east-asian":!0,"font-variant-ligatures":!0,"font-variant-numeric":!0,"font-variant-position":!0,"font-weight":!0,grid:!1,"grid-area":!1,"grid-auto-columns":!1,"grid-auto-flow":!1,"grid-auto-rows":!1,"grid-column":!1,"grid-column-end":!1,"grid-column-start":!1,"grid-row":!1,"grid-row-end":!1,"grid-row-start":!1,"grid-template":!1,"grid-template-areas":!1,"grid-template-columns":!1,"grid-template-rows":!1,"hanging-punctuation":!1,height:!0,hyphens:!1,icon:!1,"image-orientation":!1,"image-resolution":!1,"ime-mode":!1,"initial-letters":!1,"inline-box-align":!1,"justify-content":!1,"justify-items":!1,"justify-self":!1,left:!1,"letter-spacing":!0,"lighting-color":!0,"line-box-contain":!1,"line-break":!1,"line-grid":!1,"line-height":!1,"line-snap":!1,"line-stacking":!1,"line-stacking-ruby":!1,"line-stacking-shift":!1,"line-stacking-strategy":!1,"list-style":!0,"list-style-image":!0,"list-style-position":!0,"list-style-type":!0,margin:!0,"margin-bottom":!0,"margin-left":!0,"margin-right":!0,"margin-top":!0,"marker-offset":!1,"marker-side":!1,marks:!1,mask:!1,"mask-box":!1,"mask-box-outset":!1,"mask-box-repeat":!1,"mask-box-slice":!1,"mask-box-source":!1,"mask-box-width":!1,"mask-clip":!1,"mask-image":!1,"mask-origin":!1,"mask-position":!1,"mask-repeat":!1,"mask-size":!1,"mask-source-type":!1,"mask-type":!1,"max-height":!0,"max-lines":!1,"max-width":!0,"min-height":!0,"min-width":!0,"move-to":!1,"nav-down":!1,"nav-index":!1,"nav-left":!1,"nav-right":!1,"nav-up":!1,"object-fit":!1,"object-position":!1,opacity:!1,order:!1,orphans:!1,outline:!1,"outline-color":!1,"outline-offset":!1,"outline-style":!1,"outline-width":!1,overflow:!1,"overflow-wrap":!1,"overflow-x":!1,"overflow-y":!1,padding:!0,"padding-bottom":!0,"padding-left":!0,"padding-right":!0,"padding-top":!0,page:!1,"page-break-after":!1,"page-break-before":!1,"page-break-inside":!1,"page-policy":!1,pause:!1,"pause-after":!1,"pause-before":!1,perspective:!1,"perspective-origin":!1,pitch:!1,"pitch-range":!1,"play-during":!1,position:!1,"presentation-level":!1,quotes:!1,"region-fragment":!1,resize:!1,rest:!1,"rest-after":!1,"rest-before":!1,richness:!1,right:!1,rotation:!1,"rotation-point":!1,"ruby-align":!1,"ruby-merge":!1,"ruby-position":!1,"shape-image-threshold":!1,"shape-outside":!1,"shape-margin":!1,size:!1,speak:!1,"speak-as":!1,"speak-header":!1,"speak-numeral":!1,"speak-punctuation":!1,"speech-rate":!1,stress:!1,"string-set":!1,"tab-size":!1,"table-layout":!1,"text-align":!0,"text-align-last":!0,"text-combine-upright":!0,"text-decoration":!0,"text-decoration-color":!0,"text-decoration-line":!0,"text-decoration-skip":!0,"text-decoration-style":!0,"text-emphasis":!0,"text-emphasis-color":!0,"text-emphasis-position":!0,"text-emphasis-style":!0,"text-height":!0,"text-indent":!0,"text-justify":!0,"text-orientation":!0,"text-overflow":!0,"text-shadow":!0,"text-space-collapse":!0,"text-transform":!0,"text-underline-position":!0,"text-wrap":!0,top:!1,transform:!1,"transform-origin":!1,"transform-style":!1,transition:!1,"transition-delay":!1,"transition-duration":!1,"transition-property":!1,"transition-timing-function":!1,"unicode-bidi":!1,"vertical-align":!1,visibility:!1,"voice-balance":!1,"voice-duration":!1,"voice-family":!1,"voice-pitch":!1,"voice-range":!1,"voice-rate":!1,"voice-stress":!1,"voice-volume":!1,volume:!1,"white-space":!1,widows:!1,width:!0,"will-change":!1,"word-break":!0,"word-spacing":!0,"word-wrap":!0,"wrap-flow":!1,"wrap-through":!1,"writing-mode":!1,"z-index":!1}}var i=/javascript\s*\:/gim;e.whiteList=r(),e.getDefaultWhiteList=r,e.onAttr=function(t,e,r){},e.onIgnoreAttr=function(t,e,r){},e.safeAttrValue=function(t,e){return i.test(e)?"":e}},function(t,e){t.exports={indexOf:function(t,e){var r,i;if(Array.prototype.indexOf)return t.indexOf(e);for(r=0,i=t.length;r<i;r++)if(t[r]===e)return r;return-1},forEach:function(t,e,r){var i,n;if(Array.prototype.forEach)return t.forEach(e,r);for(i=0,n=t.length;i<n;i++)e.call(r,t[i],i,t)},trim:function(t){return String.prototype.trim?t.trim():t.replace(/(^\s*)|(\s*$)/g,"")},trimRight:function(t){return String.prototype.trimRight?t.trimRight():t.replace(/(\s*$)/g,"")}}},function(t,e,r){function i(t){var e=l.spaceIndex(t);if(-1===e)var r=t.slice(1,-1);else r=t.slice(1,e+1);return"/"===(r=l.trim(r).toLowerCase()).slice(0,1)&&(r=r.slice(1)),"/"===r.slice(-1)&&(r=r.slice(0,-1)),r}function n(t){return"</"===t.slice(0,2)}function o(t,e){for(;e<t.length;e++){var r=t[e];if(" "!==r)return"="===r?e:-1}}function a(t,e){for(;e>0;e--){var r=t[e];if(" "!==r)return"="===r?e:-1}}function s(t){return function(t){return'"'===t[0]&&'"'===t[t.length-1]||"'"===t[0]&&"'"===t[t.length-1]}(t)?t.substr(1,t.length-2):t}var l=r(2),c=/[^a-zA-Z0-9_:\.\-]/gim;e.parseTag=function(t,e,r){var o="",a=0,s=!1,l=!1,c=0,u=t.length,f="",p="";for(c=0;c<u;c++){var g=t.charAt(c);if(!1===s){if("<"===g){s=c;continue}}else if(!1===l){if("<"===g){o+=r(t.slice(a,c)),s=c,a=c;continue}if(">"===g){o+=r(t.slice(a,s)),f=i(p=t.slice(s,c+1)),o+=e(s,o.length,f,p,n(p)),a=c+1,s=!1;continue}if(('"'===g||"'"===g)&&"="===t.charAt(c-1)){l=g;continue}}else if(g===l){l=!1;continue}}return a<t.length&&(o+=r(t.substr(a))),o},e.parseAttr=function(t,e){function r(t,r){if(!((t=(t=l.trim(t)).replace(c,"").toLowerCase()).length<1)){var i=e(t,r||"");i&&n.push(i)}}for(var i=0,n=[],u=!1,f=t.length,p=0;p<f;p++){var g,d=t.charAt(p);if(!1!==u||"="!==d)if(!1===u||p!==i||'"'!==d&&"'"!==d||"="!==t.charAt(p-1)){if(/\s|\n|\t/.test(d)){if(t=t.replace(/\s|\n|\t/g," "),!1===u){if(-1===(g=o(t,p))){r(l.trim(t.slice(i,p))),u=!1,i=p+1;continue}p=g-1;continue}if(-1===(g=a(t,p-1))){r(u,s(l.trim(t.slice(i,p)))),u=!1,i=p+1;continue}}}else{if(-1===(g=t.indexOf(d,p+1)))break;r(u,l.trim(t.slice(i+1,g))),u=!1,i=(p=g)+1}else u=t.slice(i,p),i=p+1}return i<t.length&&(!1===u?r(t.slice(i)):r(u,s(l.trim(t.slice(i))))),l.trim(n.join(" "))}},function(t,e){var r,i,n=Function.prototype,o=Object.prototype,a=n.toString,s=o.hasOwnProperty,l=a.call(Object),c=o.toString,u=(r=Object.getPrototypeOf,i=Object,function(t){return r(i(t))});t.exports=function(t){if(!function(t){return!!t&&"object"==typeof t}(t)||"[object Object]"!=c.call(t)||function(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(t){}return e}(t))return!1;var e=u(t);if(null===e)return!0;var r=s.call(e,"constructor")&&e.constructor;return"function"==typeof r&&r instanceof r&&a.call(r)==l}},function(t,e,r){"use strict";r.r(e),r.d(e,"Sanitizer",function(){return s});var i=r(7),n=r.n(i),o=r(0),a=r.n(o),s=function(){function t(t,e){var r,i=this;this.arcgisWhiteList={a:["href","target","style"],img:["src","width","height","border","alt","style"],video:["autoplay","controls","height","loop","muted","poster","preload","src","width"],audio:["autoplay","controls","loop","muted","preload","src"],span:["style"],table:["width","height","cellpadding","cellspacing","border","style"],div:["style","align"],font:["size","color","style"],tr:["height","valign","align","style"],td:["height","width","valign","align","colspan","rowspan","nowrap","style"],th:["height","width","valign","align","colspan","rowspan","nowrap","style"],p:["style"],b:[],strong:[],i:[],em:[],u:[],br:[],li:[],ul:[],ol:[],hr:[],tbody:[]},this.allowedProtocols=["http","https","mailto","iform","tel","flow","lfmobile","arcgis-navigator","arcgis-appstudio-player","arcgis-survey123","arcgis-collector","arcgis-workforce","arcgis-explorer","arcgis-trek2there","mspbi","comgooglemaps","pdfefile","pdfehttp","pdfehttps","boxapp","boxemm","awb","awbs","gropen","radarscope"],this.arcgisFilterOptions={allowCommentTag:!0,safeAttrValue:function(t,e,r,n){return"a"===t&&"href"===e||("img"===t||"audio"===t||"video"===t)&&"src"===e?i.sanitizeUrl(r):a.a.safeAttrValue(t,e,r,n)}},t&&!e?r=t:t&&e?(r=Object.create(this.arcgisFilterOptions),Object.keys(t).forEach(function(e){"whiteList"===e?r.whiteList=i._extendObjectOfArrays([i.arcgisWhiteList,t.whiteList||{}]):r[e]=t[e]})):(r=Object.create(this.arcgisFilterOptions)).whiteList=this.arcgisWhiteList,this.xssFilterOptions=r,this._xssFilter=new a.a.FilterXSS(r)}return t.prototype.sanitize=function(t){switch(typeof t){case"number":return isNaN(t)||!isFinite(t)?null:t;case"boolean":return t;case"string":return this._xssFilter.process(t);case"object":return this._iterateOverObject(t);default:return null}},t.prototype.sanitizeUrl=function(t){var e=this._trim(t.substring(0,t.indexOf(":")));return"/"===t||"#"===t||"#"===t[0]||this.allowedProtocols.indexOf(e.toLowerCase())>-1?a.a.escapeAttrValue(t):""},t.prototype.validate=function(t){var e=this.sanitize(t);return{isValid:t===e,sanitized:e}},t.prototype._extendObjectOfArrays=function(t){var e={};return t.forEach(function(t){Object.keys(t).forEach(function(r){Array.isArray(t[r])&&Array.isArray(e[r])?e[r]=e[r].concat(t[r]):e[r]=t[r]})}),e},t.prototype._iterateOverObject=function(t){var e=this;try{var r=!1,i=void 0;if(Array.isArray(t))i=t.reduce(function(t,i){var n=e.validate(i);return n.isValid?t.concat([i]):(r=!0,t.concat([n.sanitized]))},[]);else{if(!n()(t))return null;i=Object.keys(t).reduce(function(i,n){var o=t[n],a=e.validate(o);return a.isValid?i[n]=o:(r=!0,i[n]=a.sanitized),i},{})}return r?i:t}catch(t){return null}},t.prototype._trim=function(t){return String.prototype.trim?t.trim():t.replace(/(^\s*)|(\s*$)/g,"")},t}()},function(t,e,r){function i(t){return null==t}function n(t){(t=function(t){var e={};for(var r in t)e[r]=t[r];return e}(t||{})).whiteList=t.whiteList||o.whiteList,t.onAttr=t.onAttr||o.onAttr,t.onIgnoreAttr=t.onIgnoreAttr||o.onIgnoreAttr,t.safeAttrValue=t.safeAttrValue||o.safeAttrValue,this.options=t}var o=r(4),a=r(10);r(5),n.prototype.process=function(t){if(!(t=(t=t||"").toString()))return"";var e=this.options,r=e.whiteList,n=e.onAttr,o=e.onIgnoreAttr,s=e.safeAttrValue;return a(t,function(t,e,a,l,c){var u=r[a],f=!1;if(!0===u?f=u:"function"==typeof u?f=u(l):u instanceof RegExp&&(f=u.test(l)),!0!==f&&(f=!1),l=s(a,l)){var p,g={position:e,sourcePosition:t,source:c,isWhite:f};return f?i(p=n(a,l,g))?a+":"+l:p:i(p=o(a,l,g))?void 0:p}})},t.exports=n},function(t,e,r){var i=r(5);t.exports=function(t,e){function r(){if(!o){var r=i.trim(t.slice(a,s)),n=r.indexOf(":");if(-1!==n){var c=i.trim(r.slice(0,n)),u=i.trim(r.slice(n+1));if(c){var f=e(a,l.length,c,u,r);f&&(l+=f+"; ")}}}a=s+1}";"!==(t=i.trimRight(t))[t.length-1]&&(t+=";");for(var n=t.length,o=!1,a=0,s=0,l="";s<n;s++){var c=t[s];if("/"===c&&"*"===t[s+1]){var u=t.indexOf("*/",s+2);if(-1===u)break;a=(s=u+1)+1,o=!1}else"("===c?o=!0:")"===c?o=!1:";"===c?o||r():"\n"===c&&r()}return i.trim(l)}},function(t,e,r){function i(t){return null==t}function n(t){(t=function(t){var e={};for(var r in t)e[r]=t[r];return e}(t||{})).stripIgnoreTag&&(t.onIgnoreTag&&console.error('Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time'),t.onIgnoreTag=a.onIgnoreTagStripAll),t.whiteList=t.whiteList||a.whiteList,t.onTag=t.onTag||a.onTag,t.onTagAttr=t.onTagAttr||a.onTagAttr,t.onIgnoreTag=t.onIgnoreTag||a.onIgnoreTag,t.onIgnoreTagAttr=t.onIgnoreTagAttr||a.onIgnoreTagAttr,t.safeAttrValue=t.safeAttrValue||a.safeAttrValue,t.escapeHtml=t.escapeHtml||a.escapeHtml,this.options=t,!1===t.css?this.cssFilter=!1:(t.css=t.css||{},this.cssFilter=new o(t.css))}var o=r(1).FilterCSS,a=r(3),s=r(6),l=s.parseTag,c=s.parseAttr,u=r(2);n.prototype.process=function(t){if(!(t=(t=t||"").toString()))return"";var e=this.options,r=e.whiteList,n=e.onTag,o=e.onIgnoreTag,s=e.onTagAttr,f=e.onIgnoreTagAttr,p=e.safeAttrValue,g=e.escapeHtml,d=this.cssFilter;e.stripBlankChar&&(t=a.stripBlankChar(t)),e.allowCommentTag||(t=a.stripCommentTag(t));var h=!1;e.stripIgnoreTagBody&&(h=a.StripTagBody(e.stripIgnoreTagBody,o),o=h.onIgnoreTag);var m=l(t,function(t,e,a,l,h){var m,b={sourcePosition:t,position:e,isClosing:h,isWhite:r.hasOwnProperty(a)};if(!i(m=n(a,l,b)))return m;if(b.isWhite){if(b.isClosing)return"</"+a+">";var v=function(t){var e=u.spaceIndex(t);if(-1===e)return{html:"",closing:"/"===t[t.length-2]};var r="/"===(t=u.trim(t.slice(e+1,-1)))[t.length-1];return r&&(t=u.trim(t.slice(0,-1))),{html:t,closing:r}}(l),y=r[a],w=c(v.html,function(t,e){var r,n=-1!==u.indexOf(y,t);return i(r=s(a,t,e,n))?n?(e=p(a,t,e,d))?t+'="'+e+'"':t:i(r=f(a,t,e,n))?void 0:r:r});return l="<"+a,w&&(l+=" "+w),v.closing&&(l+=" /"),l+=">"}return i(m=o(a,l,b))?g(l):m},g);return h&&(m=h.remove(m)),m},t.exports=n}]).Sanitizer});