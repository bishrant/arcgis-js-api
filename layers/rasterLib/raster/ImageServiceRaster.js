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
// See http://js.arcgis.com/3.32/esri/copyright.txt for details.

define(["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/Deferred","dojo/_base/array","dojo/_base/config","dojo/_base/json","dojo/sniff","dojo/DeferredList","dojo/when","../../../kernel","../../../Evented","../../../request","../../../geometry/Extent","../../../geometry/Point","../../../SpatialReference","../../../deferredUtils","../../../urlUtils","../../MosaicRule","../../ImageServiceParameters","../../PixelBlock","./RasterInfo","./BasicRaster","../../rasterFormats/rasterCodec","../tile/RasterTileInfo"],(function(e,t,i,n,r,a,s,o,l,c,u,h,m,d,f,p,g,I,v,_,x,b,R,y,P){var j=t([R],{declaredClass:"esri.layers.rasterLib.raster.ImageServiceRaster",sourceType:"ImageService",constructor:function(e){e&&(this._imageServiceParams=e.imageServiceParameters,this._commonReqParams=e._commonReqParams,this._imageServiceParams||(this._imageServiceParams={interpolation:e.interpolation,pixelType:e.pixelType,format:e.format||"lerc",compressionQuality:e.compressionQuality,bandIds:e.bandIds,noDataInterpretation:e.noDataInterpretation,adjustAspectRatio:e.adjustAspectRatio,mosaicRule:e.mosaicRule,renderingRule:e.interpolation}))},open:function(){var e=new n;if(this.serviceInfo&&this.rasterInfo)return this.loaded=!0,this._findCredential(),this.setFetchParameters(this._imageServiceParams),e.resolve(this),e.promise;var t=this.serviceInfo||this._generateServiceInfo(this._imageServiceParams&&this._imageServiceParams.renderingRule),r=i.hitch(this,(function(t){this.serviceInfo=t,this._findCredential();var n=this._parseRasterInfo(t),r={};t.defaultMosaicMethod?(r.method=t.defaultMosaicMethod,r.operation=t.mosaicOperator,r.sortField=t.sortField,r.sortValue=t.sortValue):r.method=v.METHOD_NONE,this.serviceInfo.defaultMosaicRule=new v(r),this.serviceInfo.defaultMosaicRule.ascending=!0;var a=this._getColormap(this),s=this._getHistograms(this),o=this._getRasterAttributeTable(this),c=this._getKeyProperties(this),u=this._getMultidimensionalInfo();new l([a,s,o,c,u]).then(i.hitch(this,(function(t){t[0][0]&&(n.colormap=t[0][1]),t[1][0]&&(n.histograms=t[1][1]),t[2][0]&&(n.vat=t[2][1]),t[3][0]&&(n.keyProperties=t[3][1]),t[4][0]&&(n.multidimensionalInfo=t[4][1]),this.loaded=!0,this.rasterInfo=n,this.setFetchParameters(this._imageServiceParams),e.resolve(this)})))})),a=i.hitch(this,(function(t){this.loaded=!0,e.reject(t)}));return c(t,r,a),e.promise},setFetchParameters:function(e,t){if(t)this.imageServiceParams=e;else{var i=this.imageServiceParameters;i&&e?Object.keys(e).forEach((function(t){i[t]=e[t]})):this.imageServiceParams=e}this._constructGetImageParams(),this._getRasterIdentifier(!0)},read:function(e){if(e.pixelBlock||e.texture){var t=new n;return t.resolve(e),t.promise}if(!1===e.virtual&&this.tileInfo&&!this.tileInfo.virtual)return this.readTile(e);var r=e.extent,a=r.spatialReference.wkid||s.toJson(r.spatialReference.toJson(!1)),o=e.timeExtent?e.timeExtent.toJson().join(","):null,l=this.url+"/exportImage",c=i.mixin({},this._commonReqParams,{bbox:r.xmin+","+r.ymin+","+r.xmax+","+r.ymax,imageSR:a,bboxSR:a,size:e.width+","+e.height,time:o},this.disableClientCaching?{_ts:(new Date).getTime()}:{}),u={width:e.width,height:e.height,planes:null,pixelType:null,format:null,decodeFunc:null,isPoint:!1};return this._requestPixels({url:l,payload:c,decodeParams:u,tileOptions:e})},readTile:function(e){var t=this.tileBoundary&&this.tileBoundary[e.level];if(t&&(t.minRow>e.row||t.maxRow<e.row||t.minCol>e.col||t.maxCol<e.col)){var i=new n;return i.resolve(e),i.promise}var r=this.url+"/tile/"+e.level+"/"+e.row+"/"+e.col,a={width:this.tileInfo.cols,height:this.tileInfo.rows,planes:null,pixelType:null,format:null,decodeFunc:null,isPoint:"elevation"===e.tileType.toLowerCase()};return this._requestPixels({url:r+(this.disableClientCaching?"?_ts= "+(new Date).getTime():""),payload:{},decodeParams:a,tileOptions:e})},toJson:function(){return{url:this.url,tileInfo:this.tileInfo,rasterInfo:this.rasterInfo,serviceInfo:this.serviceInfo,sourceType:this.sourceType,_commonReqParams:this._commonReqParams,_rasterId:this._rasterId}},_generateServiceInfo:function(e){var t=this.url,i=new n(g._dfdCanceller);return i._pendingDfd=m({url:t,content:{f:"json",renderingRule:e?s.toJson(e.toJson()):null},handleAs:"json",callbackParamName:"callback"}),i._pendingDfd.then((function(e){i.callback(e)}),(function(e){i.errback(e)})),i},_parseRasterInfo:function(e){var t,i,n=new b;if(n.bandCount=e.bandCount,n.extent=new d(e.fullExtent),n.spatialReference=e.spatialReference,n.pixelType=e.pixelType,n.width=Math.floor((e.fullExtent.xmax-e.fullExtent.xmin)/e.pixelSizeX+.5),n.height=Math.floor((e.fullExtent.ymax-e.fullExtent.ymin)/e.pixelSizeY+.5),n.cellSize=new f({x:e.pixelSizeX,y:e.pixelSizeY,spatialReference:e.spatialReference}),e.minValues&&e.minValues.length>0&&e.maxValues&&e.stdvValues&&e.meanValues){for(t=[],i=0;i<e.minValues.length;i++)t.push({min:e.minValues[i],max:e.maxValues[i],mean:e.meanValues[i],stddev:e.stdvValues[i]});e.bandCount!==t.length&&(t=null)}if(this.dataType=e.serviceDataType.replace("esriImageServiceDataType",""),n.statistics=t,e.objectIdField&&e.fields&&(n.catalogInfo={objectIdField:e.objectIdField,fields:e.fields}),n.timeInfo=e.timeInfo,e.tileInfo){this.tileInfo=new P(e.tileInfo),this.tileInfo.tileType=e.cacheType||"Map",n.tileInfo=this.tileInfo;var r=n.extent,a=this.tileInfo.origin,s=this.tileInfo.cols,o=this.tileInfo.rows;this.tileBoundary=this.tileInfo.lods.map((function(e){return{minCol:Math.floor((r.xmin-a.x+.1*e.resolution)/s/e.resolution),maxCol:Math.floor((r.xmax-a.x-.1*e.resolution)/s/e.resolution),minRow:Math.floor((a.y-r.ymax+.1*e.resolution)/o/e.resolution),maxRow:Math.floor((a.y-r.ymin-.1*e.resolution)/o/e.resolution)}}))}return n},_getColormap:function(e){var t=this.url+"/colormap",i=new n(g._dfdCanceller),r=this.serviceInfo.hasColormap||this.rasterInfo&&this.rasterInfo.hasColormap;return this.serviceInfo.currentVersion>10&&r?(i._pendingDfd=m({url:t,content:{f:"json"},handleAs:"json",callbackParamName:"callback"}),i._pendingDfd.then((function(e){i.callback(e.colormap)}),(function(e){i.errback(e)}))):i.callback(null),i},_getHistograms:function(e){var t=this.url+"/histograms",i=new n(g._dfdCanceller),r={f:"json"},a=this.serviceInfo.hasHistograms||this.rasterInfo&&this.rasterInfo.hasHistograms;return e&&e.renderingRule&&(r.renderingRule=s.toJson(e.renderingRule.toJson()),a=!0),this.serviceInfo.currentVersion>10&&a?(i._pendingDfd=m({url:t,content:r,handleAs:"json",callbackParamName:"callback"}),i._pendingDfd.then((function(e){i.callback(e.histograms)}),(function(e){i.errback(e)}))):i.callback(null),i},_getRasterAttributeTable:function(e){var t=this.url+"/rasterAttributeTable",i=new n(g._dfdCanceller),r={f:"json"},a=this.serviceInfo.hasRasterAttributeTable;return e&&e.renderingRule&&(r.renderingRule=s.toJson(e.renderingRule.toJson()),a=!0),this.serviceInfo.currentVersion>10&&a?(i._pendingDfd=m({url:t,content:r,handleAs:"json",callbackParamName:"callback"}),i._pendingDfd.then((function(e){i.callback(e)}),(function(e){i.errback(e)}))):i.callback(null),i},_getKeyProperties:function(e){var t=this.url+"/keyProperties",i=new n(g._dfdCanceller),r={f:"json"};return e&&e.renderingRule&&(r.renderingRule=s.toJson(e.renderingRule.toJson())),this.serviceInfo.currentVersion>10?(i._pendingDfd=m({url:t,content:r,handleAs:"json",callbackParamName:"callback"}),i._pendingDfd.then((function(e){i.callback(e)}),(function(e){i.errback(e)}))):i.callback(null),i},_getMultidimensionalInfo:function(){var e=this.url+"/multidimensionalInfo",t=new n(g._dfdCanceller);return this.serviceInfo.currentVersion>=10.3&&this.serviceInfo.hasMultidimensions?(t._pendingDfd=m({url:e,content:{f:"json"},handleAs:"json",callbackParamName:"callback"}),t._pendingDfd.then(i.hitch(this,(function(e){t.callback(e.multidimensionalInfo)})),(function(e){t.errback(e)}))):t.callback(null),t},_initializationFailed:function(){},_constructGetImageParams:function(){var e=this.imageServiceParams||{},t=i.mixin({},this._query,{f:"image",interpolation:e.interpolation,pixelType:e.pixelType,format:e.format||"lerc",compressionQuality:e.compressionQuality,bandIds:e.bandIds?e.bandIds.join(","):null,noData:null!=e.noData?e.noData.join(","):null,noDataInterpretation:e.noDataInterpretation,adjustAspectRatio:null==e.adjustAspectRatio?null:e.adjustAspectRatio,mosaicRule:e.mosaicRule?s.toJson(e.mosaicRule.toJson()):null,renderingRule:e.renderingRule?s.toJson(e.renderingRule.toJson()):null,token:this.credential&&this.credential.token||null});"lerc"===t.format.toLowerCase()?(t.compressionTolerance=e.compressionTolerance,this.serviceInfo.currentVersion>=10.5&&(t.lercVersion=e.lercVersion||2)):"tiff"===t.format.toLowerCase()?t.compression=e.compression:["jpg","jpeg","jpg","jpgpng"].indexOf(t.format.toLowerCase())>-1&&(t.compression=e.compression),this._commonReqParams=t},_getRasterIdentifier:function(e){if(this._rasterId)return this._rasterId;var t=this.url.replace("http:","").replace("https:",""),i=[],n=this.imageServiceParams||{};i.push(t),i.push(n.interpolation),i.push(n.pixelType),i.push(n.compressionQuality),i.push(n.bandIds?n.bandIds.join(","):""),i.push(n.mosaicRule?s.toJson(n.mosaicRule.toJson()):""),i.push(n.renderingRule?s.toJson(n.renderingRule.toJson()):"");var r=i.join("|");return this._rasterId=this._computeSignature(r),this._rasterId},_wrapExtent:function(e){var t,i=e.spatialReference._getInfo();if(i){var n=i.valid[0],r=i.valid[1];(e.xmin<n-this.resolution.x||e.xmax>r+this.resolution.y)&&(t=new d((e.xmin-n)%(r-n),e.ymin,(e.xmax-r)%(r-n),e.ymax,e.spatialReference)).xmax<t.xmin&&(t=null)}return t||e}});return o("extend-esri")&&i.setObject("layers.rasterLib.raster.ImageServiceRaster",j,u),j}));