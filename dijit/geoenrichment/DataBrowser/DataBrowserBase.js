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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/kernel","dojo/dom-class","dojo/dom-construct","esri/dijit/geoenrichment/when","dojox/mvc/sync","../_Wizard","./ShoppingCart","esri/dijit/geoenrichment/utils/TooltipUtil","../utils/animation/AnimationHelper","dojo/i18n!../../../nls/jsapi"],function(t,e,i,a,n,o,s,r,c,h,l,u){u=u.geoenrichment.dijit;var g=t(r,{CATEGORIES_PAGE:"categories",COLLECTIONS_PAGE:"collections",VARIABLES_PAGE:"variables",title:u.DataBrowser.title,okButton:u.WizardButtons.apply,backButton:u.WizardButtons.back,pageBackButton:u.WizardButtons.back,cancelButton:u.WizardButtons.cancel,countryID:null,hierarchyID:null,allowHierarchies:!1,countryBox:!0,selection:null,variables:null,selectionLimit:-1,variableQuery:null,favorites:null,variableInfo:!0,shoppingCart:!0,langCode:i.locale,_contentFactory:null,_manager:null,_titleNode:null,_breadcrumb:null,_shoppingCart:null,_initialStartup:function(){this.variables.langCode=this.langCode,this._manager=this._contentFactory.createManager(this),this._manager.selectionLimit>0&&(this._manager.onLimit=e.hitch(this,this._onLimit),1==this._manager.selectionLimit&&this._manager.watch("selection",e.hitch(this,this._onOK))),s(this,"variableQuery",this._manager,"variableQuery"),this._manager.multipleSelectIsAllowed()&&this._manager.watch("selection",e.hitch(this,this._updateSelectionFromManager)),this._manager.allowShoppingCart&&(this._shoppingCart="function"==typeof this.shoppingCart?this.shoppingCart(this.variables):"object"==typeof this.shoppingCart&&this.shoppingCart.placeAt?this.shoppingCart:new c({variables:this.variables}),"object"!=typeof this.shoppingCart&&this.own(this._shoppingCart),this._syncManagerWithShoppingCart()),this._breadcrumb=this._contentFactory.createBreadcrumb({onCategoriesClick:e.hitch(this,this._loadCategoriesPage),onDCsClick:e.hitch(this,this._loadCollectionsPage)}),this._breadcrumb.domNode.style.display="none",this.own(this._breadcrumb),this._manager.flyAnim=this._breadcrumb.flyAnim=new l(this.domNode),a.add(this.domNode,"DataBrowser"),this._shoppingCart&&this._shoppingCart.placeAt(this.domNode),this._breadcrumb.placeAt(this.domNode),this._addTitleNode();var t=this;this._manager.createVariableGrid=function(e,i){return e=e||{},e.manager=this,t._contentFactory.createVariableGrid(e,i)},this._addAutoTooltip()},_syncManagerWithShoppingCart:function(){s(this._manager,"selection",this._shoppingCart,"selection")},_addAutoTooltip:function(){h.autoTooltip(this.domNode)},_addTitleNode:function(){var t=n.create("div",{style:"position: absolute; top: 0;"},this.domNode);this._titleNode=n.create("div",{class:"DataBrowser_Title",innerHTML:this.title},t)},_updateSelectionFromManager:function(){if(this.selection!=this._manager.selection){var t=this._manager.selection.length>this.selection.length;this._set("selection",this._manager.selection),t&&this._onSelect()}},_NUMBER_STATE_RE:/^n\//,_setSelectionAttr:function(t){if(this._manager&&this._manager.multipleSelectIsAllowed()&&(t=t||[],this.selection!==t))return t=t.map(function(t){return t.replace(this._NUMBER_STATE_RE,"")},this),this.selection=t,this._manager.changeSelection(t)},_setTitleAttr:function(t){this._set("title",t)},startup:function(){this._started||(this._initialStartup(),this.inherited(arguments),this._shoppingCart&&this._shoppingCart.startup(),this._launch())},_setCountryIDAttr:function(t,e){if(t!=this._getQueryCountryID()){if(t&&this.allowHierarchies){var i=t.substr(3);t=t.substr(0,2),this._set("hierarchyID",i)}this._set("countryID",t),this._manager&&!e&&(t=this._getQueryCountryID(),this._started?this._loadCategoriesPage().changeCountry(t):(this._manager.set("variableQuery",{countryID:t}),this._manager.variables.synchronize(t)))}},_setHierarchyIDAttr:function(t){this._setCountryIDAttr(this._getQueryCountryID(this.countryID,t))},_getQueryCountryID:function(t,e){return void 0===t&&(t=this.countryID,e=this.hierarchyID),this.allowHierarchies&&t&&e?t+"/"+e:t},launch:function(t){if(t){var i=this._getQueryCountryID();t=e.mixin({},t),void 0===t.countryID&&(t.countryID=i),this._manager.set("variableQuery",t),i!=t.countryID&&this._set("countryID",t.countryID)}this._started&&this._launch()},_launch:function(){var t=this;this.showProgress(this._manager.validateQuery()).then(function(e){t._manager.validateSelection(),t._loadNextPage(e)})},showProgress:function(t){return t},_loadNextPage:function(t){var e=this._manager.variableQuery;if(e.searchString||e.favorites||e.dataCollectionID)this._loadVariablesPage(t);else if(e.categoryID){var i=this;this._isNonEmptyCategory(function(t){t?i._loadCollectionsPage():i._loadVariablesPage()})}else this._loadCategoriesPage()},_loadPreviousPage:function(){if("collections"==this.currentPageId)this._loadCategoriesPage();else{var t=this;this._isNonEmptyCategory(function(e){e?t._loadCollectionsPage():t._loadCategoriesPage()})}},_loadCategoriesPage:function(){var t=this.pages.categories;return t||(t=this.pages.categories=this._contentFactory.createPage("categories",{pageId:"categories",countryBox:this.countryBox,allowHierarchies:this.allowHierarchies,manager:this._manager,backButton:this.backButton,okButton:this._manager.multipleSelectIsAllowed()?this.okButton:null,cancelButton:this.cancelButton,onSelect:e.hitch(this,this._loadNextPage),onSearch:e.hitch(this,this._loadNextPage),onCountryChange:e.hitch(this,function(t){this.set("countryID",t,!0)})}),t.on("back",e.hitch(this,this._onBack)),t.on("ok",e.hitch(this,this._onOK)),t.on("cancel",e.hitch(this,this._onCancel))),this.loadPage("categories"),t},_loadCollectionsPage:function(){var t=this.pages.collections;return t||(t=this.pages.collections=this._contentFactory.createPage("collections",{pageId:"collections",manager:this._manager,backButton:this.pageBackButton,okButton:this._manager.multipleSelectIsAllowed()?this.okButton:null,cancelButton:this.cancelButton,onSelect:e.hitch(this,this._loadNextPage)}),t.on("back",e.hitch(this,this._loadPreviousPage)),t.on("ok",e.hitch(this,this._onOK)),t.on("cancel",e.hitch(this,this._onCancel))),t.lastDataCollectionID=this._manager.variableQuery.dataCollectionID,this.loadPage("collections"),t},_loadVariablesPage:function(t){var i=this.pages.variables;return i||(i=this.pages.variables=this._contentFactory.createPage("variables",{pageId:"variables",manager:this._manager,backButton:this.pageBackButton,okButton:this._manager.multipleSelectIsAllowed()?this.okButton:null,cancelButton:this.cancelButton}),i.on("back",e.hitch(this,this._loadPreviousPage)),i.on("ok",e.hitch(this,this._onOK)),i.on("cancel",e.hitch(this,this._onCancel))),i.searchResults=t,this.loadPage("variables"),i},loadPage:function(t){switch(t){case"categories":this._manager.set("variableQuery",this._manager.composeQuery());break;case"collections":this._manager.set("variableQuery",this._manager.composeQuery("categoryID"))}this.currentPage&&this.currentPage.set("pageIsActive",!1);var e=this.pages[t]&&this.pages[t]._started;this.inherited(arguments),e&&this.currentPage.set("pageIsActive",!0);var i=this;setTimeout(function(){i._updateBreadcrumb(t)}),this.emit("PageLoaded",{pageName:t})},_updateBreadcrumb:function(t){if(this._breadcrumb.domNode)switch(t){case"categories":this._breadcrumb.domNode.style.display="none",this._breadcrumb.clearSelection();break;case"collections":this._breadcrumb.domNode.style.display="",this._breadcrumb.selectCategory(this._manager.getCategory());break;case"variables":this._breadcrumb.domNode.style.display="";var e=this;this._isNonEmptyCategory(function(t,i){if(t||!i){var a=e._manager.getDataCollection();a||(a=e._prepareNoDCBreadcrumbInfo()),e._breadcrumb.selectDataCollection(a,i)}else e._breadcrumb.selectCategory(i)})}},_prepareNoDCBreadcrumbInfo:function(){return{title:this._manager.variableQuery.favorites?u.DataVariablesPage.favoriteVariablesTitle:u.DataVariablesPage.allVariablesTitle}},_isNonEmptyCategory:function(t){var e=this;o(this._manager.getCategory(),function(i){var a=!!i&&(e.variables.getPopularVariables(i).length||i.dataCollections.length>1);t(a,i)})},onPageLoaded:function(){},_onLimit:function(){var t=this;setTimeout(function(){t.emit("Limit",{selectionLimit:t._manager.selectionLimit})})},onLimit:function(){},_onBack:function(){this.emit("Back")},onBack:function(){},_onOK:function(){1==this._manager.selectionLimit&&(this._updateSelectionFromManager(),this._manager.selection.length&&(this._manager.selection=[])),this.emit("OK",{selection:this.selection,variableQuery:this.variableQuery})},onOK:function(){},_onCancel:function(){this.emit("Cancel")},onCancel:function(){},_onSelect:function(){this.emit("Select")},onSelect:function(){}});return g.CATEGORIES_PAGE="categories",g.COLLECTIONS_PAGE="collections",g.VARIABLES_PAGE="variables",g});