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

define(["require","exports","../../../core/libs/gl-matrix/mat4","../GeometryUtils","./BackgroundRenderer","./CircleRenderer","./FadeRecorder","./FillRenderer","./LineRenderer","./SymbolRenderer","./TileInfoRenderer","../../webgl/FramebufferObject"],function(e,t,r,i,n,s,o,a,d,h,l,c){return function(){function e(){this._extrudeRotateVector=new Float32Array([0,0,1]),this._extrudeScaleVector=new Float32Array([1,1,1]),this._state={rotation:0,width:0,height:0},this._cachedWidth=0,this._cachedHeight=0,this._cachedRotation=0}return e.prototype.initialize=function(e,t,r){void 0===r&&(r=!0),this._SpriteMosaic=e,this._glyphMosaic=t,this._ignoreSpeed=!r,this._backgroundRenderer=new n,this._lineRenderer=new d,this._fillRenderer=new a,this._symbolRenderer=new h,this._circleRenderer=new s,this._tileInfoRenderer=new l,this._fadeRecorder=new o.FadeRecorder(300),this._extrudeMatrix=new Float32Array(16),this._extrudeNoRotationMatrix=new Float32Array(16),this._backgroundColor=new Float32Array([1,0,0,1])},e.prototype.dispose=function(){this._backgroundRenderer&&(this._backgroundRenderer.dispose(),this._backgroundRenderer=null),this._lineRenderer&&(this._lineRenderer.dispose(),this._lineRenderer=null),this._fillRenderer&&(this._fillRenderer.dispose(),this._fillRenderer=null),this._symbolRenderer&&(this._symbolRenderer.dispose(),this._symbolRenderer=null),this._circleRenderer&&(this._circleRenderer.dispose(),this._circleRenderer=null),this._tileInfoRenderer&&(this._tileInfoRenderer.dispose(),this._tileInfoRenderer=null),this._hittestFBO&&(this._hittestFBO.dispose(),this._hittestFBO=null)},e.prototype.setStateParams=function(e,t,n){this._fadeRecorder.recordLevel(n),this._state=e,this._state.width===this._cachedWidth&&this._state.height===this._cachedHeight&&this._state.rotation===this._cachedRotation||(this._extrudeScaleVector[0]=2/e.width,this._extrudeScaleVector[1]=-2/e.height,r.identity(this._extrudeMatrix),r.rotate(this._extrudeMatrix,this._extrudeMatrix,-e.rotation*i.C_DEG_TO_RAD,this._extrudeRotateVector),r.scale(this._extrudeMatrix,this._extrudeMatrix,this._extrudeScaleVector),r.transpose(this._extrudeMatrix,this._extrudeMatrix),r.identity(this._extrudeNoRotationMatrix),r.scale(this._extrudeNoRotationMatrix,this._extrudeNoRotationMatrix,this._extrudeScaleVector),r.transpose(this._extrudeNoRotationMatrix,this._extrudeNoRotationMatrix),this._cachedWidth=this._state.width,this._cachedHeight=this._state.height,this._cachedRotation=this._state.rotation)},e.prototype.drawClippingMasks=function(e,t){if(0!==t.length){e.setDepthWriteEnabled(!1),e.setDepthTestEnabled(!1),e.setStencilTestEnabled(!0),e.setBlendingEnabled(!1),e.setColorMask(!1,!1,!1,!1),e.setStencilOp(7680,7680,7681),e.setStencilWriteMask(255),e.setClearStencil(0);var r=e.gl;e.clear(r.STENCIL_BUFFER_BIT);for(var i=0,n=t;i<n.length;i++){var s=n[i];s.attached&&s.visible&&(e.setStencilFunctionSeparate(1032,519,s.stencilData.reference,s.stencilData.mask),this._backgroundRenderer.renderSolidColor(e,{u_matrix:s.tileTransform.transform,u_normalized_origin:s.tileTransform.displayCoord,u_coord_range:s.coordRange,u_depth:0,u_color:this._backgroundColor}))}e.setColorMask(!0,!0,!0,!0),e.setBlendingEnabled(!0)}},e.prototype.renderDebug=function(e,t){var r=t.key;this._backgroundColor.set([r.col%2,r.row%2,r.col%2==0&&r.row%2==0?1:0,.5]),this._backgroundRenderer.renderSolidColor(e,{u_matrix:t.tileTransform.transform,u_normalized_origin:t.tileTransform.displayCoord,u_coord_range:t.coordRange,u_depth:0,u_color:this._backgroundColor})},e.prototype.renderBucket=function(e,t,r,i,n,s,o,a){if(!(void 0!==o.minzoom&&o.minzoom>r||s.key.level===i&&void 0!==o.maxzoom&&o.maxzoom<=r))switch(t.type){case 0:2!==n&&this._renderBackground(e,t,r,n,s,o,a);break;case 1:2!==n&&this._renderFill(e,t,r,n,s,o,a);break;case 2:1!==n&&3!==n||this._renderLine(e,t,r,n,s,o,a);break;case 3:2!==n&&3!==n||this._renderSymbol(e,t,r,n,i,s,o,a);break;case 4:2!==n&&3!==n||this._renderCircle(e,t,r,n,i,s,o,a)}},e.prototype.renderTileInfo=function(e,t){this._tileInfoRenderer.render(e,t)},e.prototype.needsRedraw=function(){return this._fadeRecorder.needsRedraw()},e.prototype.hitTest=function(e,t,r,i,n,s,o){var a=[0,0],d=[0,0],h=e.state;h.toMap(a,[0,0]),h.toMap(d,[s,s]);var l=i.filter(function(e){return!(a[0]>e.bounds[2]||d[0]<e.bounds[0]||a[1]<e.bounds[3]||d[1]>e.bounds[1])});if(0===l.length)return[];l.sort(function(e,t){return e.key.level-t.key.level});for(var _=l.length,u=1;u<=_;u++){var p=l[u-1];p.attached&&(p.stencilData.reference=u,p.stencilData.mask=255)}o(h,n,l);var f=e.context;this._hittestFBO||(this._hittestFBO=c.create(f,{colorTarget:0,depthStencilTarget:3,width:s,height:s}));var R=f.getViewport(),b=f.getBoundFramebufferObject();f.bindFramebuffer(this._hittestFBO),f.setViewport(0,0,s,s);var x=f.gl;f.setDepthWriteEnabled(!0),f.setStencilWriteMask(255),f.setClearColor(1,1,1,1),f.setClearDepth(1),f.setClearStencil(0),f.clear(x.COLOR_BUFFER_BIT|x.DEPTH_BUFFER_BIT|x.STENCIL_BUFFER_BIT),f.setDepthWriteEnabled(!1),this.drawClippingMasks(f,l),f.setBlendingEnabled(!1),f.setStencilWriteMask(0),f.setStencilOp(7680,7680,7681),f.setDepthFunction(515),f.setDepthTestEnabled(!0),f.setDepthWriteEnabled(!0),f.setStencilTestEnabled(!0);for(var g=0;g<_;g++){var p=l[g];p.attached&&p.doRender(e)}f.setStencilTestEnabled(!1),f.setDepthTestEnabled(!1),this._readbackBuffer||(this._readbackBuffer=new Uint8Array(4*s*s),this._readbackBuffer32=new Uint32Array(this._readbackBuffer.buffer)),this._hittestFBO.readPixels(0,0,s,s,6408,5121,this._readbackBuffer);var y=new Set,k=s*s,M=Math.round(k/2),S=this._readbackBuffer32[M];4294967295!==S&&y.add(S);for(var u=0;u<k;u++)4294967295!==(S=this._readbackBuffer32[u])&&y.add(S);f.bindFramebuffer(b),f.setViewport(R.x,R.y,R.width,R.height);var m=[];return y.forEach(function(e){m.push(e)}),m},e.prototype._renderBackground=function(e,t,r,i,n,s,o){this._backgroundRenderer.render(e,t,r,i,n,s,this._SpriteMosaic,this._SpriteMosaic.pixelRatio,o)},e.prototype._renderLine=function(e,t,r,i,n,s,o){this._lineRenderer.render(e,t,r,i,this._state,n,s,this._SpriteMosaic,this._extrudeMatrix,this._SpriteMosaic.pixelRatio,o)},e.prototype._renderFill=function(e,t,r,i,n,s,o){this._fillRenderer.render(e,t,r,this._state.rotation,i,n,s,this._SpriteMosaic,this._extrudeMatrix,this._SpriteMosaic.pixelRatio,o)},e.prototype._renderCircle=function(e,t,r,i,n,s,o,a){var d=!0;n===s.key.level&&(d=!1),e.setStencilTestEnabled(d),this._circleRenderer.render(e,t,r,i,this._state.rotation,s,o,this._extrudeMatrix,a)},e.prototype._renderSymbol=function(e,t,r,i,n,s,o,a){var d=!0;n===s.key.level&&(d=!1),e.setStencilTestEnabled(d),this._symbolRenderer.render(e,t,r,i,this._state.rotation,this._fadeRecorder.getFadeValues(this._ignoreSpeed),s,o,this._SpriteMosaic,this._glyphMosaic,this._extrudeMatrix,this._extrudeNoRotationMatrix,this._SpriteMosaic.pixelRatio,a)},e}()});