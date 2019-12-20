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

define(["dojo/_base/declare","dojo/_base/lang","esri/dijit/geoenrichment/when","dojox/uuid/generateRandomUuid","dojo/dom-class","dojo/dom-construct","dijit/_WidgetBase","dijit/_TemplatedMixin","esri/dijit/geoenrichment/Pagination","esri/dijit/geoenrichment/PageNavigator","../../supportClasses/ViewModes","../../supportClasses/tableJson/TableJsonUtil","../../supportClasses/tableJson/TablePrettyParameters","../../sections/supportClasses/SectionContentFitModes","../utils/InfographicThemeUtil","esri/dijit/geoenrichment/utils/DomUtil","esri/dijit/geoenrichment/utils/InvokeUtil","esri/dijit/geoenrichment/utils/ObjectUtil","dojo/text!../../templates/PaginatableTableInfographic.html"],function(t,i,e,n,o,s,a,h,r,c,l,d,g,u,_,p,f,m,y){var P=t([a,h],{templateString:y,viewModel:null,theme:null,parentWidget:null,currentFeatureIndex:null,isEditMode:!1,minRowHeight:40,maxBulletsLimit:5,hasResizableColumns:!0,allowSorting:!0,noDataText:null,hideElementsIfEmpty:!0,canShowEmptyView:!0,pagination:null,pageNavigator:null,_titleSection:null,_sections:null,_currentInfographicJson:null,_isSinglePage:!1,_sectionJsons:null,_columnWidths:null,postCreate:function(){this.inherited(arguments),this._showEmptyView(!1),this._sections=[],this._createPagination(),this._createPageNavigator()},_createPagination:function(){var t=this;this.pagination=new r({createItemContainer:i.hitch(this,this._createItemContainer),scrollAnimation:"slide",cyclicPagination:!1,autoCenter:"stretch:1,1",detachChildrenUponHiding:!0,onPageChanged:function(){t.pageNavigator.setCurrentPageIndex(t.pagination.get("currentPage"))},onNodePlaced:function(i,e){t._updateItemContainer(i,e)}}).placeAt(this.paginationDiv),this.own(this.pagination),this.pagination.set("items",[]),this.pagination.startup()},_createPageNavigator:function(){var t=this;this.pageNavigator=new c({showArrows:!1,getNumPages:function(){return t.pagination.get("items").length},onPageChanged:function(i){t.pagination.set("currentPage",i)}}).placeAt(this.pageNavigatorDiv),this.own(this.pageNavigator)},_createItemContainer:function(){var t=s.create("div",{class:"paginatableTableInfographic_paginationRoot"});return t.style.width=this._getPageWidth()+"px",t.style.height=this._getPageHeight()+"px",t},_updateItemContainer:function(t,n){var o,a=this;if(t&&t.parentNode){s.empty(t);var h=this._getSectionByJson(n);if(h&&h.domNode)h.placeAt(t),this._columnWidths&&(o=h.getTables()[0],this._columnWidths.forEach(function(t,i){o.columns[i].style.width=t}),o.refresh());else{h&&h.destroy();var r={};r.initialWidth=this._getPageWidth(),r.initialHeight=this._getPageHeight(),r.json=n,r.viewModel=this.viewModel,r.theme=this.theme,r.parentWidget=this,r.noContentOffset=!0,r.tableParams={allowSorting:this.allowSorting,trimTextIfOverflows:!0,autoDetectUrl:!0,keepGridWidthWhenResized:!0,hasResizableColumns:this.hasResizableColumns,disableResizableColumnsAutoDetection:!this.hasResizableColumns,fitParentWhenResized:!0,enableAsyncRendering:!this.isEditMode,asyncBatchSize:n.stack[0].data.columns.length,layoutDefaults:{columnMinWidth:g.MIN_COLUMN_WIDTH},onColumnWidthChanged:function(){a._columnWidths=o&&o.columns.map(function(t){return t.style.width}),a._onColumnWidthsChanged()}},r.initialViewMode=this.isEditMode?l.EDIT:l.PREVIEW_VALUES,i.mixin(r,this._prepareSectionCreationParams(r)),this._columnWidths&&this._columnWidths.forEach(function(t,i){n.stack[0].data.columns[i].style.width=t}),h=this.viewModel.layoutBuilder.createElement("section",r,t),this._sections.push(h),this._putSectionToHash(h,n),o=h.getTables()[0],e(o.getRenderPromise(),function(){o.domNode&&(a._resizeSection(h),o.onSortingChanged=function(t){a._setSorting(t)},a._sorting&&o.setSorting(a._sorting,{doNotRefresh:!0}))})}return h}},_onColumnWidthsChanged:function(){},_resizeSection:function(t){if(this._currentInfographicJson.scaleToFitHeight){var i=0,e=t.getTables();e.forEach(function(t){i+=t.store.data.length}),e.forEach(function(t,e){var n=t.store.data.length,o=n/i,s=Math.max(this._getPageHeight()*o,n*this.minRowHeight);t.resizeToFitHeight(s,!1)},this)}this._adjustTablesVertically(t),t.fitContentNicely({fitMode:u.WIDTH})},_adjustTablesVertically:function(t){var i=0;t.getTables().forEach(function(t,e){e>0&&t.setPosition(void 0,i),i+=t.domNode.clientHeight},this)},_prepareSectionCreationParams:function(t){return null},_getPageWidth:function(){return this.width},_getPageHeight:function(){return this.height-this._getTitleHeight()-this._getFooterHeight()},_getTitleHeight:function(){return this._currentInfographicJson.titleSectionJson?d.getTableHeight(this._currentInfographicJson.titleSectionJson.stack[0])+g.TITLE_GAP:0},hasTitle:function(){return this._getTitleHeight()>0},_getFooterHeight:function(){return this._isSinglePage?0:30},_sectionsHash:null,_getSectionByJson:function(t){return this._sectionsHash=this._sectionsHash||{},t._idInPagination||(t._idInPagination=n()),this._sectionsHash[t._idInPagination]},_putSectionToHash:function(t,i){this._sectionsHash&&(this._sectionsHash[i._idInPagination]=t)},_updatePromise:null,updateInfographic:function(t){if(this.domNode)return this._currentInfographicJson=t,this._updateInfographicJsonTheme(),this._currentInfographicJson.style.backgroundColor&&(this.domNode.style.backgroundColor=this._currentInfographicJson.style.backgroundColor),this.onContentLoadingStart(),this._updateContent(),this.onShowWaiting(this._updatePromise),this._updatePromise.finally(function(){this.onContentLoadingEnd()}.bind(this)),this._updatePromise},_updateInfographicJsonTheme:function(){var t=this.viewModel.getStaticInfographicDefaultStyles(this.theme);_.applyThemeSettingsPaginatableInfographicJson(this._currentInfographicJson,t)},getUpdatePromise:function(){return this._updatePromise},_updateContent:function(){return this._updatePromise=f.invoke(this,"_doUpdateContent",50)},_doUpdateContent:function(){if(this.domNode&&this.width)return this._destroySections(),e(this._buildSectionJsonsAndStat(),function(t){if(this._showEmptyView(!1),this._sectionJsons=t&&t.sectionJsons,!this._sectionJsons||!this._sectionJsons.length)if(!this.hideElementsIfEmpty&&t&&t.unitedSectionJson){var e=i.clone(t.unitedSectionJson);this._currentInfographicJson.scaleToFitHeight&&(e.stack[0].data.data[0].style.height=this.minRowHeight),this._sectionJsons=t.sectionJsons=[e],this._showEmptyView(!0,this._getTitleHeight()-this._getFooterHeight()+e.stack[0].data.data[0].style.height),p.show(this.dataDiv)}else this._sectionJsons=null,t=null,this._showEmptyView(!0);if(!t)return void this.onContentUpdated();this._syncJsonDimensions(),this.domNode.style.width=this.width+"px",this.domNode.style.height=this.height+"px",this._isSinglePage=1===t.sectionJsons.length,o[this._isSinglePage?"add":"remove"](this.domNode,"singlePage"),this._renderParts(t),this.onContentUpdated()}.bind(this))},_buildSectionJsonsAndStat:function(){},_renderParts:function(t){this._renderTitleSection(),this._renderData(t),this._renderNavigation(t),this._renderFootNote(),o[this.footnoteDiv.innerHTML?"add":"remove"](this.domNode,"hasFootnote")},_renderTitleSection:function(){if(this._currentInfographicJson.titleSectionJson){var t={};t.initialWidth=this._getPageWidth(),t.json=this._currentInfographicJson.titleSectionJson,t.viewModel=this.viewModel,t.theme=this.theme,t.parentWidget=this,t.noContentOffset=!0,t.tableParams={trimTextIfOverflows:!0},t.initialViewMode=this.isEditMode?l.EDIT:l.PREVIEW_VALUES,i.mixin(t,this._prepareTitleSectionCreationParams()),this._titleSection=this.viewModel.layoutBuilder.createElement("section",t,this.titleDiv),this._titleSection.fitContentNicely({fitMode:u.WIDTH})}},_prepareTitleSectionCreationParams:function(){return null},_renderData:function(t){this.paginationDiv.style.top=this._getTitleHeight()?this._getTitleHeight()+"px":"",this.paginationDiv.style.bottom=this._getFooterHeight()?this._getFooterHeight()+"px":"",this.pagination.set("items",t.sectionJsons),this.pagination.resize()},_renderNavigation:function(t){this.pageNavigator.showAsBullets(t.sectionJsons.length<=this.maxBulletsLimit),this.pageNavigator.reset(),this.pageNavigator.currentPageLabel.style.color=this.viewModel.getDocumentDefaultStyles(this.theme).color},_renderFootNote:function(){},_emptyPlaceholderTopOffset:0,_showEmptyView:function(t,i){this.canShowEmptyView&&(this._emptyPlaceholderTopOffset=i||0,p[t?"hide":"show"](this.dataDiv),p[t?"show":"hide"](this.noDataPlaceHolder),t&&this._syncEmptyViewPlaceholder(),t&&setTimeout(this._syncEmptyViewPlaceholder.bind(this)))},_syncEmptyViewPlaceholder:function(){this.noDataPlaceHolder&&(this.noDataPlaceHolderLabel.innerHTML=this.noDataText,this.noDataPlaceHolder.style.marginTop=this._emptyPlaceholderTopOffset/2+(this.height-this.noDataPlaceHolder.clientHeight)/2+"px")},_sorting:null,_setSorting:function(t){return this._sorting=t,this._updateContent()},notifyShown:function(){this._sections.forEach(function(t){t.notifyShown()})},width:null,height:null,resize:function(t,i){return void 0!==t&&(this.width=t,this.height=i),this._checkNeedResize()&&this._updateContent()},_checkNeedResize:function(){return this._currentInfographicJson&&this.width&&this.height&&(!m.compareEqual(this._currentInfographicJson.style.width,this.width,1)||!m.compareEqual(this._currentInfographicJson.style.height,this.height,1))},_syncJsonDimensions:function(){this._currentInfographicJson.style=this._currentInfographicJson.style||{},this._currentInfographicJson.style.width=this.width,this._currentInfographicJson.style.height=this.height},toJson:function(){return i.clone(this._currentInfographicJson)},onContentLoadingStart:function(){},onContentLoadingEnd:function(){},onContentUpdated:function(){},onShowWaiting:function(t){},_destroySections:function(){this._titleSection&&this._titleSection.destroy(),this._titleSection=null,this._sections.forEach(function(t){t.destroy()}),this._sections.length=0},destroy:function(){this._destroySections(),this.inherited(arguments)}});return P.MIN_ROW_HEIGHT=40,P.BOTTOM_AREA_HEIGHT=30,P});