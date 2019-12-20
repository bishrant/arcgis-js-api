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

define(["dojo/_base/declare","./SectionContentFitModes","../../grid/coreUtils/GridDataUtil","../../infographics/InfographicTypes","esri/dijit/geoenrichment/utils/FitUtil"],function(t,e,i,a,s){var n=t(null,{section:null,_width:0,_height:0,constructor:function(t){this.section=t},getWidth:function(){return this._width},setWidth:function(t,e){e=e||{},t=Math.max(0,t);var i=this._width;this._width=t,this.section.domNode.style.width=t+"px",this.section.hasFixedLayout?this.section.getTables().forEach(function(i){(i.getMaxWidth()!==t||e.forceResize)&&i.setMaxWidth(t,{resizeToFitAllowedWidth:e.resizeContentToFit,preserveRightOffset:e.preserveRightOffset})}):e.resizeContentProportionally&&i&&t&&i!==t&&this.scaleFloatingContentProportionally({xScale:t/i,yScale:1})},getHeight:function(t){if(!this.section.hasFixedLayout)return this._height;var e=0;return this.section._stackElements.forEach(function(i){switch(i.stackId){case"table":e+=i.getHeight(t),i.isLocatorTable&&i.isLocatorTable()&&(e+=i.getLocatorTablePreviewExtraHeight());break;case"img":case"map":break;case"hr":case"pageBreak":e+=i.clientHeight}}),e},getResizedHeight:function(){return this.section.hasFixedLayout?this.getHeight(!0):this._height},setHeight:function(t,e){if(this._setHeight(t,e),this.section.hasFixedLayout){var i=this;this.section.getTables().forEach(function(t){t.needScaleToFitHeight()&&i._scaleFixedTableToFitHeight(t)})}},updateHeightAfterContentChange:function(){this.section.hasFixedLayout&&this._setHeight(this.getResizedHeight())},_setHeight:function(t,e){if(t=Math.max(0,t),this.section.hasFixedLayout){var i=this.section.getLastTable();i&&i.setSpaceAfter(t-this.getHeight())}var a=this._height;this._height=t,this.section.domNode.style.height=t+"px",!this.section.hasFixedLayout&&e&&e.resizeContentProportionally&&a&&t&&a!==t&&this.scaleFloatingContentProportionally({xScale:1,yScale:t/a})},scaleFloatingContentProportionally:function(t){this.section.hasFixedLayout||1===t.xScale&&1===t.yScale||this.section._stackElements.length>1||this.section._stackElements.forEach(function(e){switch(e.stackId){case"table":e.scaleProportionallyWithinParent(t);break;case"img":case"map":e.scaleProportionallyWithinParent(t)}})},getFloatingContentBox:function(){function t(t){e.minX=Math.min(e.minX,t.l),e.minY=Math.min(e.minY,t.t),e.maxX=Math.max(e.maxX,t.l+t.w),e.maxY=Math.max(e.maxY,t.t+t.h)}var e={minX:1/0,minY:1/0,maxX:0,maxY:0};return this.section._stackElements.forEach(function(e){switch(e.stackId){case"table":t(e.getTableBox());break;case"img":case"map":t(e.getImageBox(!1))}}),{l:e.minX,t:e.minY,w:e.maxX-e.minX,h:e.maxY-e.minY}},fitContentNicely:function(t,e){t=t||{},this.section.hasFixedLayout?this._fitFixedTablesNicely(t,e):this._fitFloatingContentNicely(t,e)},_fitFixedTablesNicely:function(t,i){if(t.fitMode!==e.NONE){t.fitMode===e.ALL&&delete t.fitMode;var a=this;(i||this.section.getTables()).forEach(function(i){"table"===i.stackId&&(t.fitMode!==e.WIDTH&&t.fitMode||i.resizeToFitAllowedWidth(),t.fitMode!==e.HEIGHT&&t.fitMode||a._scaleFixedTableToFitHeight(i))}),this.section._notifyContentChanged()}},_scaleFixedTableToFitHeight:function(t){t.resizeToFitHeight(this.section.getResizedHeight()),t.setSpaceAfter(0)},_fitFloatingContentNicely:function(t,i){var a=t.fitMode;if(a!==e.NONE&&(i=i||this.section._stackElements,i.length&&!(this.section._stackElements.length>1))){var s;1===i.length&&(s=this._getTransformParamsForSpecificSingleElement(i)),s=s||this._getTransformParamsForOtherElement(i,a),i.forEach(function(t){switch(t.stackId){case"table":case"img":case"map":t.scaleProportionallyWithinParent(s.scaleParams),t.setPosition(s.deltaLeft+t.getLeft(),s.deltaTop+t.getTop())}})}},_getTransformParamsForSpecificSingleElement:function(t){var e,a,n,o=this.section.getTables()[0],h=o&&o.isSingleCelledTable()&&i.getFieldInfo(o.getFirstCell());if("img"===t[0].stackId||h&&h.isImage||h&&h.isShape){var c=this.getFloatingContentBox(),l=s.fitBox(c,{w:this._width,h:this._height},{hAlign:"center",vAlign:"middle"});e={xScale:l.ratio,yScale:l.ratio},a=l.x-c.l*e.xScale,n=l.y-c.t*e.yScale}return e&&{scaleParams:e,deltaLeft:a,deltaTop:n}},_getTransformParamsForOtherElement:function(t,i){var a,s,n,o=this.getFloatingContentBox();i===e.SINGLE_ALL_COMPLEX_WIDTH&&(i=t.length>1?e.WIDTH:e.ALL);var h=this._getContentFitOffset(t),c=this.section.getWidth()-2*h,l=this._height-2*h;return t.length>1&&o.h>l&&(i=e.ALL),a={xScale:i===e.HEIGHT?1:c/o.w,yScale:i===e.WIDTH?1:l/o.h},s=h-o.l*a.xScale,n=h-o.t*a.yScale,{scaleParams:a,deltaLeft:s,deltaTop:n}},_getContentFitOffset:function(t){var e=this.section.getTables()[0],s=e&&e.isSingleCelledTable()&&i.getFieldInfo(e.getFirstCell()),n=s&&s.isInfographic&&s.infographicJson.style&&s.infographicJson.style.padding;return this.section.noContentOffset?0:t.length>1?5:this.section.hasMapImages()?0:this.section.hasChart()?0:this.section.hasInfographic(a.ATTACHMENTS)?n||0:a.isTableLike(this.section.getInfographicType())?"number"==typeof n?n:this.section.viewModel.getCurrentTheme(this.section.theme).table.dataTablePadding||0:this.section.hasInfographic()?"number"==typeof n?n:this.section.viewModel.getStaticInfographicDefaultStyles(this.section.theme).padding||0:e&&(this.section.isImageTable(e)||s&&s.isShape)?0:this.section.viewModel.getCurrentTheme(this.section.theme).table.dataTablePadding||0},getPreferredHeight:function(){var t=this.section.getInfographicWithTable();if(!t||!t.infographic.getPreferredHeight)return 0;var e=t.table.getTableBox();return e.t+(this.getResizedHeight()-e.t-e.h)+(t.infographic.getPreferredHeight()||0)}});return n.IMAGE_FIT_PRETTY_OFFSET=0,n});