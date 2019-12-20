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

define(["../core/declare","../core/lang","../core/kebabDictionary","../core/Error","../core/Logger","../core/accessorSupport/ensureType","../support/arcadeUtils","../symbols/Symbol","../symbols/PolygonSymbol3D","../symbols/support/jsonUtils","../symbols/support/typeUtils","./Renderer","./support/LegendOptions","./support/ClassBreakInfo"],function(e,n,t,i,s,a,r,l,o,u,c,f,p,d){var m=s.getLogger("esri.renderers.ClassBreaksRenderer");p=p.LegendOptions,d=d.ClassBreakInfo;var h=t({esriNormalizeByLog:"log",esriNormalizeByPercentOfTotal:"percent-of-total",esriNormalizeByField:"field"}),y=a.ensureType(d),g=e(f,{declaredClass:"esri.renderers.ClassBreaksRenderer",properties:{backgroundFillSymbol:{types:{base:l,key:"type",typeMap:{"simple-fill":c.types.typeMap["simple-fill"],"picture-fill":c.types.typeMap["picture-fill"],"polygon-3d":c.types.typeMap["polygon-3d"]}},value:null,json:{origins:{"web-scene":{read:u.read,write:{target:{backgroundFillSymbol:{type:o}},writer:u.writeTarget}}},read:u.read,write:u.writeTarget}},classBreakInfos:{type:[d],json:{read:function(e,n,t){if(Array.isArray(e)){var i=n.minValue;return e.map(function(e){var n=new d;return n.read(e,t),null==n.minValue&&(n.minValue=i),null==n.maxValue&&(n.maxValue=n.minValue),i=n.maxValue,n})}},write:function(e,n,t,i){e=e.map(function(e){return e.write({},i)}),this._areClassBreaksConsecutive()&&e.forEach(function(e){delete e.classMinValue}),n[t]=e}}},minValue:{type:Number,readOnly:!0,dependsOn:["classBreakInfos"],get:function(){return this.classBreakInfos[0]&&this.classBreakInfos[0].minValue||0},json:{read:!1,write:{overridePolicy:function(){return 0!==this.classBreakInfos.length&&this._areClassBreaksConsecutive()?{enabled:!0}:{enabled:!1}}}}},defaultLabel:{type:String,value:null,json:{write:!0}},defaultSymbol:{types:c.rendererTypes,value:null,json:{origins:{"web-scene":{read:u.read,write:{target:{defaultSymbol:{types:c.rendererTypes3D}},writer:u.writeTarget}}},read:u.read,write:u.writeTarget}},valueExpression:{type:String,value:null,json:{write:!0}},valueExpressionTitle:{type:String,value:null,json:{write:!0}},compiledFunc:{dependsOn:["valueExpression"],get:function(){return r.createFunction(this.valueExpression)}},legendOptions:{type:p,value:null,json:{write:!0}},field:{value:null,cast:function(e){return null==e?e:"function"==typeof e?e:a.ensureString(e)},json:{type:String,write:function(e,n,t,s){"string"==typeof e?n[t]=e:s&&s.messages?s.messages.push(new i("property:unsupported","ClassBreaksRenderer.field set to a function cannot be written to JSON")):m.error(".field: cannot write field to JSON since it's not a string value")}}},isMaxInclusive:!0,normalizationField:{type:String,value:null,json:{write:!0}},normalizationTotal:{type:Number,value:null,json:{write:!0}},normalizationType:{type:String,value:null,dependsOn:["normalizationField","normalizationTotal"],get:function(){var e=this._get("normalizationType"),n=!!this.normalizationField,t=null!=this.normalizationTotal;return n||t?(e=n&&"field"||t&&"percent-of-total",n&&t&&console.warn("warning: both normalizationField and normalizationTotal are set!")):"field"!==e&&"percent-of-total"!==e||(e=null),e},json:{read:h.fromJSON,write:function(e,n){var t=h.toJSON(e);t&&(n.normalizationType=t)}}},requiredFields:{dependsOn:["field","normalizationField","valueExpression"]},type:{value:"class-breaks",json:{write:function(e,n){n.type="classBreaks"}}}},constructor:function(){this.classBreakInfos=[]},addClassBreakInfo:function(e,t,i){var s;s="number"==typeof e?new d({minValue:e,maxValue:t,symbol:i}):y(n.clone(e)),this.classBreakInfos.push(s),1===this.classBreakInfos.length&&this.notifyChange("minValue")},removeClassBreakInfo:function(e,n){var t,i,s=this.classBreakInfos.length;for(i=0;i<s;i++)if(t=[this.classBreakInfos[i].minValue,this.classBreakInfos[i].maxValue],t[0]==e&&t[1]==n){this.classBreakInfos.splice(i,1);break}},getBreakIndex:function(e,n){var t,i,s,a=this.field,l=e.attributes,o=this.classBreakInfos.length,u=this.isMaxInclusive;if(this.valueExpression)t=r.executeFunction(this.compiledFunc,r.createExecContext(e,r.getViewInfo(n)));else if("function"==typeof a)t=a(e);else{t=parseFloat(l[a]);var c,f,p=this.normalizationType;if(p)if(c=parseFloat(this.normalizationTotal),f=parseFloat(l[this.normalizationField]),"log"===p)t=Math.log(t)*Math.LOG10E;else if("percent-of-total"!==p||isNaN(c)){if("field"===p&&!isNaN(f)){if(isNaN(t)||isNaN(f))return-1;t/=f}}else t=t/c*100}if(null!=t&&!isNaN(t)&&"number"==typeof t)for(i=0;i<o;i++)if(s=[this.classBreakInfos[i].minValue,this.classBreakInfos[i].maxValue],s[0]<=t&&(u?t<=s[1]:t<s[1]))return i;return-1},getClassBreakInfo:function(e,n){var t=this.getBreakIndex(e,n);return-1!==t?this.classBreakInfos[t]:null},getSymbol:function(e,n){var t=this.getBreakIndex(e,n);return t>-1?this.classBreakInfos[t].symbol:this.defaultSymbol},getSymbols:function(){var e=[];return this.classBreakInfos.forEach(function(n){n.symbol&&e.push(n.symbol)}),this.defaultSymbol&&e.push(this.defaultSymbol),e},clone:function(){return new g({field:this.field,backgroundFillSymbol:this.backgroundFillSymbol&&this.backgroundFillSymbol.clone(),defaultLabel:this.defaultLabel,defaultSymbol:this.defaultSymbol&&this.defaultSymbol.clone(),valueExpression:this.valueExpression,valueExpressionTitle:this.valueExpressionTitle,classBreakInfos:n.clone(this.classBreakInfos),isMaxInclusive:this.isMaxInclusive,normalizationField:this.normalizationField,normalizationTotal:this.normalizationTotal,normalizationType:this.normalizationType,visualVariables:n.clone(this.visualVariables),legendOptions:n.clone(this.legendOptions),authoringInfo:this.authoringInfo&&this.authoringInfo.clone()})},collectRequiredFields:function(e){this.inherited(arguments),[this.field,this.normalizationField].forEach(function(n){n&&(e[n]=!0)}),this.valueExpression&&r.extractFieldNames(this.valueExpression).forEach(function(n){e[n]=!0})},_areClassBreaksConsecutive:function(){for(var e=this.classBreakInfos,n=1;n<e.length;n++)if(e[n-1].maxValue!==e[n].minValue)return!1;return!0}});return g});