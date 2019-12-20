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

define(["dojo/_base/declare","dojo/_base/lang","dojo/has","../kernel","../lang","./LayerSource","./TableDataSource","./QueryDataSource","./JoinDataSource","./RasterDataSource"],function(a,e,r,t,o,c,u,s,n,d){var S=a(c,{declaredClass:"esri.layers.LayerDataSource",type:"dataLayer",constructor:function(a){if(a&&a.dataSource){var e;switch(a.dataSource.type){case"table":e=new u(a.dataSource);break;case"queryTable":e=new s(a.dataSource);break;case"joinTable":e=new n(a.dataSource);break;case"raster":e=new d(a.dataSource);break;default:e=a.dataSource}this.dataSource=e}},toJson:function(){var a={type:"dataLayer",dataSource:this.dataSource&&this.dataSource.toJson()};return o.fixJson(a)}});return r("extend-esri")&&e.setObject("layers.LayerDataSource",S,t),S});