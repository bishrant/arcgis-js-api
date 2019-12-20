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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/Color","dojo/_base/window","dojo/has","dojo/sniff","dojo/keys","dojo/dom-construct","dojo/dom-style","dojo/dom-geometry","../kernel","../sniff","./_toolbar","../symbols/SimpleMarkerSymbol","../symbols/SimpleLineSymbol","../symbols/SimpleFillSymbol","../graphic","../geometry/jsonUtils","../geometry/webMercatorUtils","../geometry/Polyline","../geometry/Polygon","../geometry/Multipoint","../geometry/Rect","dojo/i18n!../nls/jsapi"],function(e,t,n,o,i,s,a,r,c,h,l,_,p,d,g,y,u,m,M,w,R,E,f,T,O,L){var b=e(g,{declaredClass:"esri.toolbars.Draw",_eventMap:{"draw-complete":!0,"draw-end":["geometry"]},constructor:function(e,n){this.markerSymbol=new y(y.STYLE_SOLID,10,new u(u.STYLE_SOLID,new i([255,0,0]),2),new i([0,0,0,.25])),this.lineSymbol=new u(u.STYLE_SOLID,new i([255,0,0]),2),this.fillSymbol=new m(m.STYLE_SOLID,new u(u.STYLE_SOLID,new i([255,0,0]),2),new i([0,0,0,.25])),this._points=[],this._mouse=!a("esri-touch")&&!a("esri-pointer"),this._defaultOptions={showTooltips:!0,drawTime:75,tolerance:8,tooltipOffset:15},this._options=t.mixin(t.mixin({},this._defaultOptions),n||{}),(r("ios")||r("android"))&&(this._options.showTooltips=!1),this._onKeyDownHandler=t.hitch(this,this._onKeyDownHandler),this._onMouseDownHandler=t.hitch(this,this._onMouseDownHandler),this._onMouseUpHandler=t.hitch(this,this._onMouseUpHandler),this._onClickHandler=t.hitch(this,this._onClickHandler),this._onMouseMoveHandler=t.hitch(this,this._onMouseMoveHandler),this._onMouseDragHandler=t.hitch(this,this._onMouseDragHandler),this._onDblClickHandler=t.hitch(this,this._onDblClickHandler),this._updateTooltip=t.hitch(this,this._updateTooltip),this._hideTooltip=t.hitch(this,this._hideTooltip),this._redrawGraphic=t.hitch(this,this._redrawGraphic)},_geometryType:null,respectDrawingVertexOrder:!1,setRespectDrawingVertexOrder:function(e){this.respectDrawingVertexOrder=e},setMarkerSymbol:function(e){this.markerSymbol=e},setLineSymbol:function(e){this.lineSymbol=e},setFillSymbol:function(e){this.fillSymbol=e},activate:function(e,n){this._geometryType&&this.deactivate();var i=this.map,s=o.connect,r=b;switch(this._options=t.mixin(t.mixin({},this._options),n||{}),i.navigationManager.setImmediateClick(!1),e){case r.ARROW:case r.LEFT_ARROW:case r.RIGHT_ARROW:case r.UP_ARROW:case r.DOWN_ARROW:case r.TRIANGLE:case r.CIRCLE:case r.ELLIPSE:case r.RECTANGLE:this._deactivateMapTools(!0,!1,!1,!0),this._onClickHandler_connect=s(i,"onClick",this._onClickHandler),this._mouse?(this._onMouseDownHandler_connect=s(i,"onMouseDown",this._onMouseDownHandler),this._onMouseDragHandler_connect=s(i,"onMouseDrag",this._onMouseDragHandler),this._onMouseUpHandler_connect=s(i,"onMouseUp",this._onMouseUpHandler)):(this._onMouseDownHandler2_connect=s(i,"onMouseDragStart",this._onMouseDownHandler),this._onMouseDragHandler2_connect=s(i,"onMouseDrag",this._onMouseDragHandler),this._onMouseUpHandler2_connect=s(i,"onMouseDragEnd",this._onMouseUpHandler)),a("esri-touch")&&!a("esri-pointer")&&(this._onMouseDownHandler2_connect=s(i,"onSwipeStart",this._onMouseDownHandler),this._onMouseDragHandler2_connect=s(i,"onSwipeMove",this._onMouseDragHandler),this._onMouseUpHandler2_connect=s(i,"onSwipeEnd",this._onMouseUpHandler));break;case r.POINT:this._onClickHandler_connect=s(i,"onClick",this._onClickHandler);break;case r.LINE:case r.EXTENT:case r.FREEHAND_POLYLINE:case r.FREEHAND_POLYGON:this._deactivateMapTools(!0,!1,!1,!0),this._mouse?(this._onMouseDownHandler_connect=s(i,"onMouseDown",this._onMouseDownHandler),this._onMouseDragHandler_connect=s(i,"onMouseDrag",this._onMouseDragHandler),this._onMouseUpHandler_connect=s(i,"onMouseUp",this._onMouseUpHandler)):(this._onMouseDownHandler_connect=s(i,"onMouseDragStart",this._onMouseDownHandler),this._onMouseDragHandler_connect=s(i,"onMouseDrag",this._onMouseDragHandler),this._onMouseUpHandler_connect=s(i,"onMouseDragEnd",this._onMouseUpHandler)),a("esri-touch")&&!a("esri-pointer")&&(this._onMouseDownHandler2_connect=s(i,"onSwipeStart",this._onMouseDownHandler),this._onMouseDragHandler2_connect=s(i,"onSwipeMove",this._onMouseDragHandler),this._onMouseUpHandler2_connect=s(i,"onSwipeEnd",this._onMouseUpHandler));break;case r.POLYLINE:case r.POLYGON:case r.MULTI_POINT:i.navigationManager.setImmediateClick(!0),this._onClickHandler_connect=s(i,"onClick",this._onClickHandler),this._onDblClickHandler_connect=s(i,"onDblClick",this._onDblClickHandler),this._dblClickZoom=i.isDoubleClickZoom,i.disableDoubleClickZoom();break;default:return void console.error("Unsupported geometry type: "+e)}this._onKeyDown_connect=s(i,"onKeyDown",this._onKeyDownHandler),this._redrawConnect=s(i,"onExtentChange",this._redrawGraphic),this._geometryType=e,this._toggleTooltip(!0),i.snappingManager&&"freehandpolyline"!==this._geometryType&&"freehandpolygon"!==this._geometryType&&(i.snappingManager._startSelectionLayerQuery(),i.snappingManager._setUpSnapping()),this.onActivate(this._geometryType)},deactivate:function(){var e=this.map;this._clear();var t=o.disconnect;switch(t(this._onMouseMoveHandler_connect),t(this._onMouseDownHandler_connect),t(this._onMouseDragHandler_connect),t(this._onMouseUpHandler_connect),t(this._onMouseDownHandler2_connect),t(this._onMouseDragHandler2_connect),t(this._onMouseUpHandler2_connect),t(this._onClickHandler_connect),t(this._onDblClickHandler_connect),t(this._onKeyDown_connect),t(this._redrawConnect),this._onMouseDownHandler_connect=this._onMouseMoveHandler_connect=this._onMouseDragHandler_connect=this._onMouseUpHandler_connect=this._onMouseDownHandler2_connect=this._onMouseDragHandler2_connect=this._onMouseUpHandler2_connect=this._onClickHandler_connect=this._onDblClickHandler_connect=this._onKeyDown_connect=this._redrawConnect=null,e.snappingManager&&(e.snappingManager._stopSelectionLayerQuery(),e.snappingManager._killOffSnapping()),this._geometryType){case b.CIRCLE:case b.ELLIPSE:case b.TRIANGLE:case b.ARROW:case b.LEFT_ARROW:case b.RIGHT_ARROW:case b.UP_ARROW:case b.DOWN_ARROW:case b.RECTANGLE:case b.LINE:case b.EXTENT:case b.FREEHAND_POLYLINE:case b.FREEHAND_POLYGON:this._activateMapTools(!0,!1,!1,!0);break;case b.POLYLINE:case b.POLYGON:case b.MULTI_POINT:this._dblClickZoom&&e.enableDoubleClickZoom()}var n=this._geometryType;this._geometryType=null,e.navigationManager.setImmediateClick(!1),this._toggleTooltip(!1),this.onDeactivate(n)},_clear:function(){this._graphic&&this.map.graphics.remove(this._graphic,!0),this._graphic=null,this.map.snappingManager&&this.map.snappingManager._setGraphic(null),this._points=[]},finishDrawing:function(){var e,t=this._points,i=this.map,s=i.spatialReference,a=b;switch(t=t.slice(0,t.length),this._geometryType){case a.POLYLINE:if(!this._graphic||t.length<2)return;e=new E(s),e.addPath([].concat(t));break;case a.POLYGON:if(!this._graphic||t.length<3)return;e=new f(s);var r=[].concat(t,[t[0].offset(0,0)]);f.prototype.isClockwise(r)||this.respectDrawingVertexOrder||(console.debug(this.declaredClass+" :  Polygons drawn in anti-clockwise direction will be reversed to be clockwise."),r.reverse()),e.addRing(r);break;case a.MULTI_POINT:e=new T(s),n.forEach(t,function(t){e.addPoint(t)})}o.disconnect(this._onMouseMoveHandler_connect),this._clear(),this._setTooltipMessage(0),this._drawEnd(e)},_drawEnd:function(e){if(e){var t,n=this.map.spatialReference;this.onDrawEnd(e),n&&(n.isWebMercator()?t=R.webMercatorToGeographic(e,!0):4326===n.wkid&&(t=w.fromJson(e.toJson()))),this.onDrawComplete({geometry:e,geographicGeometry:t})}},_normalizeRect:function(e,t,n){var o=e.x,i=e.y,s=t.x,a=t.y,r=Math.abs(o-s),c=Math.abs(i-a);return{x:Math.min(o,s),y:Math.max(i,a),width:r,height:c,spatialReference:n}},_onMouseDownHandler:function(e){this._dragged=!1;var t;this.map.snappingManager&&(t=this.map.snappingManager._snappingPoint);var n=t||e.mapPoint,o=b,i=this.map,s=i.spatialReference;switch(this._points.push(n.offset(0,0)),this._geometryType){case o.LINE:this._graphic=i.graphics.add(new M(new E({paths:[[[n.x,n.y],[n.x,n.y]]],spatialReference:s}),this.lineSymbol),!0),i.snappingManager&&i.snappingManager._setGraphic(this._graphic);break;case o.EXTENT:break;case o.FREEHAND_POLYLINE:this._oldPoint=e.screenPoint;var r=new E(s);r.addPath(this._points),this._graphic=i.graphics.add(new M(r,this.lineSymbol),!0),i.snappingManager&&i.snappingManager._setGraphic(this._graphic);break;case o.CIRCLE:case o.ELLIPSE:case o.TRIANGLE:case o.ARROW:case o.LEFT_ARROW:case o.RIGHT_ARROW:case o.UP_ARROW:case o.DOWN_ARROW:case o.RECTANGLE:case o.FREEHAND_POLYGON:this._oldPoint=e.screenPoint;var c=new f(s);c.addRing(this._points),this._graphic=i.graphics.add(new M(c,this.fillSymbol),!0),i.snappingManager&&i.snappingManager._setGraphic(this._graphic)}a("esri-touch")&&e.preventDefault(),1===this._points.length&&this.onDrawStart()},_onMouseMoveHandler:function(e){var t;this.map.snappingManager&&(t=this.map.snappingManager._snappingPoint);var n=t||e.mapPoint,o=this._graphic.geometry;switch(this._geometryType){case b.POLYLINE:case b.POLYGON:var i=this._points.length,s=!!o.getPoint(0,i);n=n.offset(0,0),s?o.setPoint(0,i,n):o.insertPoint(0,i,n),this._graphic.setGeometry(o)}},_onMouseDragHandler:function(e){if(this._graphic||this._points.length){if(a("esri-touch")&&!this._points.length)return void e.preventDefault();this._dragged=!0;var n;this.map.snappingManager&&(n=this.map.snappingManager._snappingPoint);var o=this._points[0],i=n||e.mapPoint,s=this.map,r=s.spatialReference,c=this._graphic,h=b,l=s.toScreen(o),_=s.toScreen(i),p=[],d=_.x-l.x,g=_.y-l.y,y=Math.sqrt(d*d+g*g);switch(this._geometryType){case h.CIRCLE:this._hideTooltip(),c.geometry=f.createCircle({center:l,r:y,numberOfPoints:60,map:s}),c.setGeometry(c.geometry);break;case h.ELLIPSE:this._hideTooltip(),c.geometry=f.createEllipse({center:l,longAxis:d,shortAxis:g,numberOfPoints:60,map:s}),c.setGeometry(c.geometry);break;case h.TRIANGLE:this._hideTooltip(),p=[[0,-y],[.8660254037844386*y,.5*y],[-.8660254037844386*y,.5*y],[0,-y]],c.geometry=this._toPolygon(p,l.x,l.y),c.setGeometry(c.geometry);break;case h.ARROW:this._hideTooltip();var u=g/y,m=d/y,w=g/d,R=.25*m*y,E=.25*y/w,T=.25*u*y;p=[[d,g],[d-R*(1+24/E),g+24*m-T],[d-R*(1+12/E),g+12*m-T],[-12*u,12*m],[12*u,-12*m],[d-R*(1-12/E),g-12*m-T],[d-R*(1-24/E),g-24*m-T],[d,g]],c.geometry=this._toPolygon(p,l.x,l.y),c.setGeometry(c.geometry);break;case h.LEFT_ARROW:this._hideTooltip(),p=d<=0?[[d,0],[.75*d,g],[.75*d,.5*g],[0,.5*g],[0,-.5*g],[.75*d,-.5*g],[.75*d,-g],[d,0]]:[[0,0],[.25*d,g],[.25*d,.5*g],[d,.5*g],[d,-.5*g],[.25*d,-.5*g],[.25*d,-g],[0,0]],c.geometry=this._toPolygon(p,l.x,l.y),c.setGeometry(c.geometry);break;case h.RIGHT_ARROW:this._hideTooltip(),p=d>=0?[[d,0],[.75*d,g],[.75*d,.5*g],[0,.5*g],[0,-.5*g],[.75*d,-.5*g],[.75*d,-g],[d,0]]:[[0,0],[.25*d,g],[.25*d,.5*g],[d,.5*g],[d,-.5*g],[.25*d,-.5*g],[.25*d,-g],[0,0]],c.geometry=this._toPolygon(p,l.x,l.y),c.setGeometry(c.geometry);break;case h.UP_ARROW:this._hideTooltip(),p=g<=0?[[0,g],[-d,.75*g],[-.5*d,.75*g],[-.5*d,0],[.5*d,0],[.5*d,.75*g],[d,.75*g],[0,g]]:[[0,0],[-d,.25*g],[-.5*d,.25*g],[-.5*d,g],[.5*d,g],[.5*d,.25*g],[d,.25*g],[0,0]],c.geometry=this._toPolygon(p,l.x,l.y),c.setGeometry(c.geometry);break;case h.DOWN_ARROW:this._hideTooltip(),p=g>=0?[[0,g],[-d,.75*g],[-.5*d,.75*g],[-.5*d,0],[.5*d,0],[.5*d,.75*g],[d,.75*g],[0,g]]:[[0,0],[-d,.25*g],[-.5*d,.25*g],[-.5*d,g],[.5*d,g],[.5*d,.25*g],[d,.25*g],[0,0]],c.geometry=this._toPolygon(p,l.x,l.y),c.setGeometry(c.geometry);break;case h.RECTANGLE:this._hideTooltip(),p=[[0,0],[d,0],[d,g],[0,g],[0,0]],c.geometry=this._toPolygon(p,l.x,l.y),c.setGeometry(c.geometry);break;case h.LINE:c.setGeometry(t.mixin(c.geometry,{paths:[[[o.x,o.y],[i.x,i.y]]]}));break;case h.EXTENT:c&&s.graphics.remove(c,!0);var L=new O(this._normalizeRect(o,i,r));L._originOnly=!0,this._graphic=s.graphics.add(new M(L,this.fillSymbol),!0),s.snappingManager&&s.snappingManager._setGraphic(this._graphic);break;case h.FREEHAND_POLYLINE:case h.FREEHAND_POLYGON:if(this._hideTooltip(),!1===this._canDrawFreehandPoint(e))return void(a("esri-touch")&&e.preventDefault());this._points.push(e.mapPoint.offset(0,0)),c.geometry._insertPoints([i.offset(0,0)],0),c.setGeometry(c.geometry)}a("esri-touch")&&e.preventDefault()}},_canDrawFreehandPoint:function(e){if(!this._oldPoint)return!1;var t=this._oldPoint.x-e.screenPoint.x;t=t<0?-1*t:t;var n=this._oldPoint.y-e.screenPoint.y;n=n<0?-1*n:n;var o=this._options.tolerance;if(t<o&&n<o)return!1;var i=new Date;return!(i-this._startTime<this._options.drawTime)&&(this._startTime=i,this._oldPoint=e.screenPoint,!0)},_onMouseUpHandler:function(e){if(!this._dragged||!this._graphic)return void this._clear();0===this._points.length&&this._points.push(e.mapPoint.offset(0,0));var t;this.map.snappingManager&&(t=this.map.snappingManager._snappingPoint);var n,o=this._points[0],i=t||e.mapPoint,s=this.map,r=s.spatialReference,c=b;switch(this._geometryType){case c.CIRCLE:case c.ELLIPSE:case c.TRIANGLE:case c.ARROW:case c.LEFT_ARROW:case c.RIGHT_ARROW:case c.UP_ARROW:case c.DOWN_ARROW:case c.RECTANGLE:n=this._graphic.geometry;break;case c.LINE:n=new E({paths:[[[o.x,o.y],[i.x,i.y]]],spatialReference:r});break;case c.EXTENT:n=new O(this._normalizeRect(o,i,r)).getExtent();break;case c.FREEHAND_POLYLINE:n=new E(r),n.addPath([].concat(this._points,[i.offset(0,0)]));break;case c.FREEHAND_POLYGON:n=new f(r);var h=[].concat(this._points,[i.offset(0,0),this._points[0].offset(0,0)]);f.prototype.isClockwise(h)||this.respectDrawingVertexOrder||(console.debug(this.declaredClass+" :  Polygons drawn in anti-clockwise direction will be reversed to be clockwise."),h.reverse()),n.addRing(h)}a("esri-touch")&&e.preventDefault(),this._clear(),this._drawEnd(n)},_onClickHandler:function(e){var t;this.map.snappingManager&&(t=this.map.snappingManager._snappingPoint);var n,i=t||e.mapPoint,s=this.map,a=s.toScreen(i),r=b;switch(this._points.push(i.offset(0,0)),this._geometryType){case r.POINT:this.onDrawStart(),this._drawEnd(i.offset(0,0)),this._setTooltipMessage(0);break;case r.POLYLINE:if(1===this._points.length){var c=new E(s.spatialReference);c.addPath(this._points),this._graphic=s.graphics.add(new M(c,this.lineSymbol),!0),s.snappingManager&&s.snappingManager._setGraphic(this._graphic),this._onMouseMoveHandler_connect=o.connect(s,"onMouseMove",this._onMouseMoveHandler),this.onDrawStart()}else this._graphic.geometry._insertPoints([i.offset(0,0)],0),this._graphic.setGeometry(this._graphic.geometry).setSymbol(this.lineSymbol);break;case r.POLYGON:1===this._points.length?(n=new f(s.spatialReference),n.addRing(this._points),this._graphic=s.graphics.add(new M(n,this.fillSymbol),!0),s.snappingManager&&s.snappingManager._setGraphic(this._graphic),this._onMouseMoveHandler_connect=o.connect(s,"onMouseMove",this._onMouseMoveHandler),this.onDrawStart()):(this._graphic.geometry._insertPoints([i.offset(0,0)],0),this._graphic.setGeometry(this._graphic.geometry).setSymbol(this.fillSymbol));break;case r.MULTI_POINT:var h=this._points;if(1===h.length){var l=new T(s.spatialReference);l.addPoint(h[h.length-1]),this._graphic=s.graphics.add(new M(l,this.markerSymbol),!0),s.snappingManager&&s.snappingManager._setGraphic(this._graphic),this.onDrawStart()}else this._graphic.geometry.addPoint(h[h.length-1]),this._graphic.setGeometry(this._graphic.geometry).setSymbol(this.markerSymbol);break;case r.ARROW:this._addShape([[0,0],[-24,24],[-24,12],[-96,12],[-96,-12],[-24,-12],[-24,-24],[0,0]],a.x,a.y);break;case r.LEFT_ARROW:this._addShape([[0,0],[24,24],[24,12],[96,12],[96,-12],[24,-12],[24,-24],[0,0]],a.x,a.y);break;case r.RIGHT_ARROW:this._addShape([[0,0],[-24,24],[-24,12],[-96,12],[-96,-12],[-24,-12],[-24,-24],[0,0]],a.x,a.y);break;case r.UP_ARROW:this._addShape([[0,0],[-24,24],[-12,24],[-12,96],[12,96],[12,24],[24,24],[0,0]],a.x,a.y);break;case r.DOWN_ARROW:this._addShape([[0,0],[-24,-24],[-12,-24],[-12,-96],[12,-96],[12,-24],[24,-24],[0,0]],a.x,a.y);break;case r.TRIANGLE:this._addShape([[0,-48],[41.56921938165306,24],[-41.56921938165306,24],[0,-48]],a.x,a.y);break;case r.RECTANGLE:this._addShape([[0,-96],[96,-96],[96,0],[0,0],[0,-96]],a.x-48,a.y+48);break;case r.CIRCLE:this._clear(),this.onDrawStart(),this._drawEnd(f.createCircle({center:a,r:48,numberOfPoints:60,map:s}));break;case r.ELLIPSE:this._clear(),this.onDrawStart(),this._drawEnd(f.createEllipse({center:a,longAxis:48,shortAxis:24,numberOfPoints:60,map:s}))}this._setTooltipMessage(this._points.length)},_addShape:function(e,t,n){this._setTooltipMessage(0),this._clear(),this.onDrawStart(),this._drawEnd(this._toPolygon(e,t,n))},_toPolygon:function(e,t,o){var i=this.map,s=new f(i.spatialReference);return s.addRing(n.map(e,function(e){return i.toMap({x:e[0]+t,y:e[1]+o})})),s},_onDblClickHandler:function(e){var t,i=this._points,s=this.map,r=s.spatialReference,c=b;a("esri-touch")&&i.push(e.mapPoint);var h=i[i.length-1],l=i[i.length-2];switch(i=h&&l&&h.x===l.x&&h.y===l.y?i.slice(0,i.length-1):i.slice(0,i.length),this._geometryType){case c.POLYLINE:if(!this._graphic||i.length<2)return o.disconnect(this._onMouseMoveHandler_connect),this._clear(),void this._onClickHandler(e);t=new E(r),t.addPath([].concat(i));break;case c.POLYGON:if(!this._graphic||i.length<2)return o.disconnect(this._onMouseMoveHandler_connect),this._clear(),void this._onClickHandler(e);t=new f(r);var _=[].concat(i,[i[0].offset(0,0)]);f.prototype.isClockwise(_)||this.respectDrawingVertexOrder||(console.debug(this.declaredClass+" :  Polygons drawn in anti-clockwise direction will be reversed to be clockwise."),_.reverse()),t.addRing(_);break;case c.MULTI_POINT:t=new T(r),n.forEach(i,function(e){t.addPoint(e)})}o.disconnect(this._onMouseMoveHandler_connect),this._clear(),this._setTooltipMessage(0),this._drawEnd(t)},_onKeyDownHandler:function(e){e.keyCode===c.ESCAPE&&(o.disconnect(this._onMouseMoveHandler_connect),this._clear(),this._setTooltipMessage(0))},_toggleTooltip:function(e){if(this._options.showTooltips)if(e){if(this._tooltip)return;var t=this.map.container;this._tooltip=h.create("div",{class:"esriMapTooltip"},t),_.isBodyLtr()||l.set(this._tooltip,"direction","rtl"),this._tooltip.style.display="none",this._tooltip.style.position="fixed",this._setTooltipMessage(0),this._onTooltipMouseEnterHandler_connect=o.connect(this.map,"onMouseOver",this._updateTooltip),this._onTooltipMouseLeaveHandler_connect=o.connect(this.map,"onMouseOut",this._hideTooltip),this._onTooltipMouseMoveHandler_connect=o.connect(this.map,"onMouseMove",this._updateTooltip)}else this._tooltip&&(o.disconnect(this._onTooltipMouseEnterHandler_connect),o.disconnect(this._onTooltipMouseLeaveHandler_connect),o.disconnect(this._onTooltipMouseMoveHandler_connect),h.destroy(this._tooltip),this._tooltip=null)},_hideTooltip:function(){var e=this._tooltip;e&&(e.style.display="none")},_setTooltipMessage:function(e){var t=this._tooltip;if(t){var n=e,o="";switch(this._geometryType){case b.POINT:o=L.toolbars.draw.addPoint;break;case b.ARROW:case b.LEFT_ARROW:case b.RIGHT_ARROW:case b.UP_ARROW:case b.DOWN_ARROW:case b.TRIANGLE:case b.RECTANGLE:case b.CIRCLE:case b.ELLIPSE:o=L.toolbars.draw.addShape;break;case b.LINE:case b.EXTENT:case b.FREEHAND_POLYLINE:case b.FREEHAND_POLYGON:o=L.toolbars.draw.freehand;break;case b.POLYLINE:case b.POLYGON:o=L.toolbars.draw.start,1===n?o=L.toolbars.draw.resume:n>=2&&(o=L.toolbars.draw.complete);break;case b.MULTI_POINT:o=L.toolbars.draw.addMultipoint,n>=1&&(o=L.toolbars.draw.finish)}t.innerHTML=o}},_updateTooltip:function(e){var t=this._tooltip;if(t){var n,o;e.clientX||e.pageY?(n=e.clientX,o=e.clientY):(n=e.clientX+s.body().scrollLeft-s.body().clientLeft,o=e.clientY+s.body().scrollTop-s.body().clientTop),t.style.display="none",l.set(t,{left:n+this._options.tooltipOffset+"px",top:o+"px"}),t.style.display=""}},_redrawGraphic:function(e,t,n,o){if(n||this.map.wrapAround180){var i=this._graphic;i&&i.setGeometry(i.geometry)}},onActivate:function(){},onDeactivate:function(){},onDrawComplete:function(){},onDrawStart:function(){},onDrawEnd:function(){}});return t.mixin(b,{POINT:"point",MULTI_POINT:"multipoint",LINE:"line",EXTENT:"extent",POLYLINE:"polyline",POLYGON:"polygon",FREEHAND_POLYLINE:"freehandpolyline",FREEHAND_POLYGON:"freehandpolygon",ARROW:"arrow",LEFT_ARROW:"leftarrow",RIGHT_ARROW:"rightarrow",UP_ARROW:"uparrow",DOWN_ARROW:"downarrow",TRIANGLE:"triangle",CIRCLE:"circle",ELLIPSE:"ellipse",RECTANGLE:"rectangle"}),a("extend-esri")&&t.setObject("toolbars.Draw",b,p),b});