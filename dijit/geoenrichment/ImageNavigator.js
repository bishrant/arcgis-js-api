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

define(["dojo/_base/declare","dojo/on","esri/dijit/geoenrichment/when","dojo/string","dojo/dom-class","dojo/dom-construct","dijit/_WidgetBase","dijit/_TemplatedMixin","./Pagination","./lists/FlowList","./utils/DeviceUtil","./utils/DnDUtil","./utils/DomUtil","./utils/WaitingUtil","./ReportPlayer/core/annotations/utils/CircularMaskUtil","dojo/text!./templates/ImageNavigator.html","dojo/i18n!../../nls/jsapi"],function(t,e,i,a,s,n,o,h,l,g,r,m,u,d,c,_,I){function v(t,e,a){return a=a||{},d.showProgress(e),i(t.getThumbnail(),function(t){if(d.removeProgress(e),t){var i=n.create("div",{class:"imageNode esriGEAbsoluteStretched"},e);i.style.backgroundImage="url("+t+")",a.useCircularMask?setTimeout(function(){c.setCircularMask(a.useCircularMask,i,t)},0):a.scaleToCover&&(i.style.backgroundSize="cover")}else if(a.pagination)var i=n.create("div",{class:"thumbnailIsUnavailable",innerHTML:I.previewNotAvailable},e);else{var i=n.create("div",{class:"imageNode esriGEAbsoluteStretched noImage"},e);i.style.backgroundImage=""}})}I=I.geoenrichment.dijit.ReportPlayer.ImageNavigator;var p=t(null,{createPresentation:function(t,e,i,a){var s=n.create("div",{class:"imageThumbnailListItemRoot"},i);return v(t,s),this.selectPresentation(s,e),s},selectPresentation:function(t,e){s[e?"add":"remove"](t,"imageThumbnailListItemRootSelected")}});return t([o,h],{templateString:_,nls:I,showNotes:!0,showThumbnails:!1,showNavigationLabel:!1,enableAllImagesButton:!0,pagination:null,thumbnailList:null,allImagesList:null,postCreate:function(){this.inherited(arguments),this._initPagination(),this._initThumbnailsList(),this._updateUI(),u.hide(this.noImagePlaceHolder),this._addImageListeners(),this._setViewMode("singleImage"),s[r.isMobileDevice()?"add":"remove"](this.domNode,"mobile")},_initThumbnailsList:function(){this.showThumbnails&&(this.thumbnailList=this._createAllImagesList(this.thumbnailListDiv))},_initAllImagesList:function(){this.allImagesList||(this.allImagesList=this._createAllImagesList(this.allImagesListDiv,"esriGEAbsoluteStretched")),this.allImagesList.setItems(this._images,!0),this.allImagesList.setSelectedIndex(this._imageIndex),this.allImagesList.domNode.style.height=this._height+"px"},_createAllImagesList:function(t,e){var i=this,a=new g({class:"imageThumbnailList "+(e||""),items:[],itemRenderer:new p,noDragTolerance:r.isMobileDevice()?m.MOBILE_TOLERANCE:0,onChange:function(){i._imageIndex=a.items.indexOf(a.selectedItem),i._setViewMode("singleImage"),i._showImage()}}).placeAt(t);return this.own(a),a},_initPagination:function(){var t=this;this.pagination=new l({createItemContainer:function(){var e=n.create("div",{class:"imageNavigator_imagePaginationRoot"});return t._containerHeight>0&&(e.style.height=t._containerHeight+"px"),m.addNoDragClickHandler(e,function(){t._onImageClicked(e)},{tolerance:r.isMobileDevice()?m.MOBILE_TOLERANCE:2}),e},updateItemContainer:function(e,a){n.empty(e),t.onContentLoadingStart(),i(v(a,e,{useCircularMask:t._useCircularMask,scaleToCover:t._scaleToCover,pagination:!0}),function(){t.onContentLoadingEnd()})},scrollAnimation:"slide",autoCenter:"$stretch:1,1"}).placeAt(this.imagePaginationDiv),this.own(this.pagination),this.pagination.set("items",[]),this.pagination.startup()},_onImageClicked:function(t){var e=this._getCurrentImage();i(e&&e.getAttachmentUrl&&e.getAttachmentUrl(),function(t){t&&window.open(t,"_blank")})},_updateUI:function(){u[this.showNotes?"show":"hide"](this.imageNoteContainerDiv),u[this.showThumbnails?"show":"hide"](this.thumbnailListDiv),u[this.showNavigationLabel?"show":"hide"](this.navigatorLabel)},_imageIndex:0,_addImageListeners:function(){var t=this;e(this.prevImageButton,"click",function(){0!=t._imageIndex&&(t._imageIndex--,t._showImage())}),e(this.nextImageButton,"click",function(){t._imageIndex!=t._images.length-1&&(t._imageIndex++,t._showImage())}),this.enableAllImagesButton&&e(this.showAllImagesButton,"click",function(){t._setViewMode("allImages")})},_updateImageButtons:function(){s[this._imageIndex>0?"remove":"add"](this.prevImageButton,"esriGEImageNavigatorPaginationLeftButtonDisabled"),s[this._imageIndex<this._images.length-1?"remove":"add"](this.nextImageButton,"esriGEImageNavigatorPaginationRightButtonDisabled")},_getCurrentImage:function(){return this._images[this._imageIndex]},_showImage:function(){var t=this._getCurrentImage();t?(u.show(this.imageContainerOuter),u.hide(this.noImagePlaceHolder),this.pagination.resize(),this.pagination.set("currentPage",this._imageIndex),this._imageIndex=this.pagination.currentPage,this.thumbnailList&&this.thumbnailList.setSelectedIndex(this._imageIndex)):(u.hide(this.imageContainerOuter),u.show(this.noImagePlaceHolder)),s[t?"remove":"add"](this.domNode,"hasNoImages"),this._updateImageButtons(),this._updateNavigatorLabel(),this._showNote()},_updateNavigatorLabel:function(){this.navigatorLabel.innerHTML=a.substitute(I.paginationLabel,{n:this._imageIndex+1,m:this._images.length})},_showNote:function(){var t=this._getCurrentImage();this.imageNoteLabel.innerHTML=t&&t.description||"",this.imageNoteContainerDiv.style.visibility=this.imageNoteLabel.innerHTML?"visible":"hidden"},_attachmentStore:null,_useCircularMask:null,_scaleToCover:null,update:function(t,e){var a=t&&(!this._attachmentStore||this._attachmentStore._site!==t._site);this._attachmentStore=t||this._attachmentStore,this._updateWithAdditionalParameters(e),this._updateUI(),a&&(this._images=[],this._imageIndex=0,this.pagination.set("items",[]),this._showImage());var s=this;return i(this._attachmentStore&&this._attachmentStore.getAttachments(),function(t){s._images=t||[],s.pagination.set("items",s._images),s._showImage(),s.thumbnailList&&(s.thumbnailList.setItems(s._images),s.thumbnailList.setSelectedIndex(s._imageIndex)),s._height&&s.setHeight(s._height)})},_updateWithAdditionalParameters:function(t){t=t||{},this._useCircularMask=t.useCircularMask,s[t.alwaysShowCaptions?"add":"remove"](this.domNode,"fixedCaptions"),this._scaleToCover=t.scaleToCover},_mode:null,_setViewMode:function(t){u.hide([this.singleImageView,this.allImagesView]),"singleImage"==t?u.show(this.singleImageView):(u.show(this.allImagesView),this._initAllImagesList()),this._mode=t},isAllImagesShown:function(){return"allImages"===this._mode},getImageIndex:function(){return this._imageIndex},setImageIndex:function(t){this._imageIndex=t,this._showImage()},_height:0,_containerHeight:0,setHeight:function(t){this._height=t,this._containerHeight=t-(this.showThumbnails?50:0),this.imageContainer.style.height=this._containerHeight+"px",this.noImagePlaceHolder.style.paddingTop=(t-169)/2+"px";var e=(this._containerHeight-this.prevImageButton.clientHeight)/2;this.prevImageButton.style.top=e+"px",this.nextImageButton.style.top=e+"px",this.pagination.resize(),this.allImagesList&&(this.allImagesList.domNode.style.height=this._height+"px")},onContentLoadingStart:function(){},onContentLoadingEnd:function(){}})});