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

define(["dojo/_base/declare","dojo/_base/lang","dojo/on","dojo/string","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/form/TextBox","esri/dijit/geoenrichment/TriStateItem","esri/dijit/geoenrichment/utils/DomUtil","esri/dijit/geoenrichment/utils/RadioButtonUtil","esri/dijit/geoenrichment/utils/TooltipUtil","esri/dijit/geoenrichment/OnDemandSelect","esri/dijit/geoenrichment/ReportPlayer/core/supportClasses/DocumentOptions","esri/dijit/geoenrichment/ReportPlayer/printing/PageSizeUtil","esri/dijit/geoenrichment/ReportPlayer/PlayerCommands","dojo/text!./templates/PageOptionsDialogContent.html","dojo/i18n!esri/nls/jsapi"],function(e,t,i,o,s,a,n,c,l,r,h,d,u,p,g,x,S){S=S.geoenrichment.dijit.ReportPlayer.PageOptionsDialog;var k={};return k[g.HTML]=S.createHTMLLabel,k[g.IMAGE]=S.createImageLabel,k[g.PDF]=S.createPDFLabel,k[g.PRINT]=S.printLabel,k[g.DYNAMIC_HTML]=S.createDynamicHTMLLabel,e([s,a],{templateString:x,nls:S,exportSelect:null,sizeList:null,autoScaleCheckbox:null,splitPagesCheckbox:null,addHeaderCheckbox:null,addDataSourceCheckbox:null,addFooterCheckbox:null,dataDrillingCheckbox:null,orientationButtons:null,reportTitleTextBox:null,reportSubtitleTextBox:null,fallbackMapsCheckbox:null,postCreate:function(){var e=this;this.inherited(arguments),i(this.exportButton,"click",function(){e.onPrint()}),i(this.cancelButton,"click",function(){e.onCancel()}),this.exportSelect=new d({class:"exportSelect",listClass:"esriGEOnDemandSelectSpacedOut",options:[],onChange:function(){e._currentSettings.commandId=e.exportSelect.get("value"),e._syncViewForSelectedCommand()}}).placeAt(this.exportSelectDiv),this.own(this.exportSelect),this.autoScaleCheckbox=new c(this.autoScaleLabel),this.autoScaleCheckbox.set("checked",!0),this.sizeList=new d({class:"sizeList",listClass:"esriGEOnDemandSelectSpacedOut esriGEOnDemandSelectUnlimitedTallList",onChange:function(){e._updateLandscapePortraitBlock()}}).placeAt(this.sizeListDiv),this.own(this.sizeList),this.orientationButtons=r.createRadioButtonGroup({parentNodes:[this.portraitRadioButtonDiv,this.landscapeRadioButtonDiv],customIDs:["portrait","landscape"],labels:[S.portrait,S.landscape],labelClasses:"esriGEClickable"}),this.own(this.orientationButtons),this.splitPagesCheckbox=new c(this.splitPagesLabel),this.splitPagesCheckbox.set("checked",!1),this.addHeaderCheckbox=new c(this.headerLabel),this.addHeaderCheckbox.onClick=function(){this._syncHeaderTitleBlockVisibility()}.bind(this),this.addDataSourceCheckbox=new c(this.dataSourceLabel),this.addFooterCheckbox=new c(this.footerLabel),this.reportTitleTextBox=new n({value:"",placeHolder:S.titlePlaceholder}).placeAt(this.reportTitleTextBoxDiv),this.own(this.reportTitleTextBox),this.reportSubtitleTextBox=new n({value:"",placeHolder:S.subtitlePlaceholder}).placeAt(this.reportSubtitleTextBoxDiv),this.own(this.reportSubtitleTextBox),this.dataDrillingCheckbox=new c(this.dataDrillingLabel),this.dataDrillingCheckbox.set("checked",!0),this.fallbackMapsCheckbox=new c(this.fallbackMapsLabel),this.fallbackMapsCheckbox.set("checked",!0),h.setTooltipToNode(this.autoScaleInfoIcon,S.autoScaleRowsTooltip)},_currentSettings:null,update:function(e){this._currentSettings=t.mixin({},e),this._configureExportOptions(e),this._configurePageSize(e),this._configureHeaderAndFooter(e),this._syncViewForSelectedCommand()},_configureExportOptions:function(e){if(!e.exportCommands||!e.exportCommands.length)return void l.hide(this.exportOptionsBlock);l.show(this.exportOptionsBlock);var t=e.exportCommands.map(function(e){return{label:e.label,value:e.id}});this.exportSelect.set("options",t),this.exportSelect.set("value",e.commandId||t[0])},_syncViewForSelectedCommand:function(){this.exportButton.innerHTML=k[this._currentSettings.commandId],l.hide([this.staticExportSettings,this.dynamicExportSettings]),l.show(this._currentSettings.commandId===g.DYNAMIC_HTML?this.dynamicExportSettings:this.staticExportSettings),l[this._currentSettings.canAutoScale&&this._currentSettings.commandId!==g.DYNAMIC_HTML?"show":"hide"](this.autoScaleBlock)},_configureHeaderAndFooter:function(e){this.reportTitleTextBox.set("value",e.reportTitle||""),this.reportSubtitleTextBox.set("value",e.reportSubtitle||""),this._syncHeaderTitleBlockVisibility()},_syncHeaderTitleBlockVisibility:function(){l[this.addHeaderCheckbox.get("checked")?"show":"hide"](this.reportTitleBlock)},_configurePageSize:function(e){var t,i=!u.hasStandardSize(e.pageSettings.pagesize);if(i){var s=u.getPageDim(e.pageSettings.pagesize,e.pageSettings.orientation,{places:2});t=o.substitute(S.customWithDimensions,{w:s.w,h:s.h})}this.sizeList.set("options",p.getSupportedPageSizes(i,t)),this.sizeList.set("value",i?"custom":e.pageSettings.pagesize),this.orientationButtons.check(e.pageSettings.orientation),this._updateLandscapePortraitBlock()},_updateLandscapePortraitBlock:function(){l["custom"===this.sizeList.get("value")?"hide":"show"](this.landscapePortraitBlock),l[this._canSplitPages()?"show":"hide"](this.splitPagesBlock)},_canSplitPages:function(){return"custom"!==this.sizeList.get("value")&&this._currentSettings.canSplitPages},getSettings:function(){var e=t.mixin({},this._currentSettings.pageSettings);return"custom"!==this.sizeList.get("value")&&(e.orientation=this.orientationButtons.getValue(),e.pagesize=this.sizeList.get("value")),{noAutoScale:!this.autoScaleCheckbox.get("checked"),addHeader:this.addHeaderCheckbox.get("checked"),addDataSource:this.addDataSourceCheckbox.get("checked"),addFooter:this.addFooterCheckbox.get("checked"),allowDataDrilling:this.dataDrillingCheckbox.get("checked"),allowFallbackMaps:this.fallbackMapsCheckbox.get("checked"),splitPages:this._canSplitPages()&&this.splitPagesCheckbox.get("checked"),reportTitle:this.reportTitleTextBox.get("value"),reportSubtitle:this.reportSubtitleTextBox.get("value"),pageSettings:e,commandId:this._currentSettings.commandId}},setState:function(e){this.autoScaleCheckbox.set("checked",!e.noAutoScale),this.addHeaderCheckbox.set("checked",e.addHeader),this.addDataSourceCheckbox.set("checked",e.addDataSource),this.addFooterCheckbox.set("checked",e.addFooter),this.dataDrillingCheckbox.set("checked",e.allowDataDrilling),this.fallbackMapsCheckbox.set("checked",e.allowFallbackMaps),this.splitPagesCheckbox.set("checked",e.splitPages),this._syncHeaderTitleBlockVisibility(),this.exportSelect.options.some(function(t){return t.value===e.commandId})||(e.commandId=this.exportSelect.options[0]&&this.exportSelect.options[0].value),e.commandId&&(this.exportSelect.set("value",e.commandId),this.exportSelect.onChange())},onPrint:function(){},onCancel:function(){}})});