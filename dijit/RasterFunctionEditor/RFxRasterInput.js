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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/has","dojo/store/Memory","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","esri/domUtils","../../kernel","../../layers/ArcGISImageServiceLayer","../../layers/ImageServiceParameters","../../layers/MosaicRule","../../layers/RasterFunction","./utils","../analysis/utils","../analysis/mixins/browselayers/BrowseLayerMixin","../analysis/ItemTypes","dojo/i18n!../../nls/jsapi","dojo/text!./templates/RFxRasterInput.html"],(function(e,t,a,i,s,o,r,l,n,h,u,m,c,d,_,b,x,f,y,p){var v=e([o,r,l,x],{templateString:p,declaredClass:"esri.dijit.RasterFunctionEditor.RFxRasterInput",allowScalar:!1,selectDefault:!0,showBrowseLayers:!0,useArcGISComponents:!0,constructor:function(e){t.mixin(this,e),this.inherited(arguments),this._i18n=y.widgets.rasterFunctionEditor},startup:function(){this._comboBox.set("validator",t.hitch(this,this.validator)),this._comboBox.set("placeHolder",this._i18n.rfxRasterInput.selectLayer),this.on("add-ready-to-use-layer",t.hitch(this,(function(e){this.emit("add-layer",e)}))),this.inherited(arguments),this.rfxVariable?this._setRfxVariableAttr(this.rfxVariable):this.value&&this._setValueAttr(this.value)},validator:function(e,t){if(""===e)return!1;var a=this._getStoreItems(e);return!!(a&&a.length>0)||(this._getFormattedValue(this.value)===e||(!(!this.rfxVariable||this._getFormattedValueFromVariable(this.rfxVariable)!==e)||(this.allowScalar&&""!==e?!isNaN(+e):void 0)))},_handleComboBoxChange:function(e){if("separator"!==e&&""!==e)return"browselayers"===e?(this.set("allowedItemTypes",[f.IS]),this.defaultItemTypes=[],void this._createBrowseItems({},{layerTypes:[f.IS]},this._comboBox)):void(this.value&&e===this.value.name||(this.value=this.get("value"),this.emit("change",t.clone(this.value))));this.value?this._comboBox.set("displayedValue",this.value.name):this._comboBox.reset()},getSelectedLayer:function(e){if(null!=(e=e||this._comboBox&&this._comboBox.value)&&this._comboBox){var t;t="object"==typeof e?e:{name:e};var a=this._comboBox.store&&this._comboBox.store.query(t),i=a&&a[0];if(i)return this.inputLayers[i.id]}},_getFormattedValue:function(e){return null==e?"":e.type&&"scalar"===e.type.toLowerCase()?String(e.value):e.name?e.name:e.datasetName&&e.datasetName.name?e.datasetName.name:void 0},_getFormattedValueFromVariable:function(e){if(e){var t=_.getArgRFT(e);return t?"<"+(t.function&&t.function.name)+"."+this._i18n.rfxArgsEditor.outputRaster+">":"<"+this._i18n.rfxRasterInput.rfxVariable+": "+e.name+">"}},_setInputLayersAttr:function(e){this.inputLayers=e&&e.map((function(e){return e})),this._initStore()},_setAllowScalarAttr:function(e){this.allowScalar=!!e,this.allowScalar||(this._comboBox.textbox.readOnly=!0)},_setRfxVariableAttr:function(e){if(this._set("rfxVariable",e),e){if(e.value)return this._setValueAttr(e.value);this._comboBox.attr("value",this._getFormattedValueFromVariable(e),!1),_.getArgRFT(e)&&this._comboBox.set("disabled",!0)}},_setValueAttr:function(e){if(e){var t=this._getFormattedValue(e);!this.getSelectedLayer(e.name)&&e.url&&this._addValueAsItem(e),this._comboBox.set("value",t),this.value=e}else this._comboBox.attr("value","",!1)},_addRFTLayerValue:function(e){this.inputLayers.push(e);var t=this._comboBox.get("store"),a=t&&t.data,i=a.splice(a.length-2,2),o={id:a.length,label:e.name,name:e.name,url:e.url};a.push(o),a=a.concat(i);var r=new s({data:a,idProperty:"id"});this._comboBox.set("store",r),this._comboBox.set("value",o.name)},_getValueAttr:function(){var e=this._comboBox.value;e=e.trim();var t=this.getSelectedLayer(e);return t?(n.show(this._zoomToRaster),"browselayers"===t.id?t:_.getRasterJsonFromLayer(t)):this.rfxVariable&&this._getFormattedValueFromVariable(this.rfxVariable)===e?void 0:this.allowScalar&&this._comboBox.isValid()?(n.hide(this._zoomToRaster),{type:"Scalar",value:+e}):this.value},_addValueAsItem:function(e){if(e){var a=t.clone(e);a.name||(a.name=_.getImageServiceTitle(a.url));var i=new m;a.mosaicRule&&(i.mosaicRule=new c(a.mosaicRule)),a.renderingRule&&(i.renderingRule=new d(a.renderingRule));var s=new u(a.url,{id:a.name+(new Date).toString(),imageServiceParameters:i});s.name=a.name,this.inputLayers.push(s),this._initStore()}},_getStoreItems:function(e){return this._comboBox.store&&this._comboBox.store.query({name:e})},_initStore:function(){var e=[];a.forEach(this.inputLayers,(function(t,a){e.push({id:a,name:t.name,label:t.name,url:t.url})}),this);var t=new s({data:e,idProperty:"id"});this._comboBox.set("labelAttr","label"),this._comboBox.set("labelType","html"),this._comboBox.set("store",t),this._comboBox.reset(),b.addReadyToUseLayerOption(this,[this._comboBox]),this.selectDefault&&e.length&&(void 0===this.value||null===this.value)&&this.set("value",e[0])},_handleBrowseItemsSelect:function(e){e&&e.selection&&b.addAnalysisReadyLayer({item:e.selection,layers:this.inputLayers,layersSelect:this._comboBox,posIncrement:1,browseDialog:e.dialog||this._browsedlg,widget:this})},_setBrowsePropertiesAttr:function(e){e&&(this.isSingleTenant=!0,this.map=e.map?e.map:this.map,this.portalUrl=e.portalUrl?e.portalUrl:this.portalUrl,this.portalSelf=e.portalSelf?e.portalSelf:this.portalSelf)},_onZoomToRasterClick:function(){var e=this._comboBox.value,t=this.getSelectedLayer(e);t&&t.initialExtent&&this.emit("zoom-to-extent",{layerExtent:t.initialExtent})}});return i("extend-esri")&&t.setObject("dijit.RasterFunctionEditor.RFxRasterInput",v,h),v}));