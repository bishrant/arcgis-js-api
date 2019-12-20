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

define(["dojo/_base/declare","dojo/_base/Deferred","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/json","dojo/store/Memory","dojo/promise/all","dojo/when","dojo/string","dojo/has","dojo/dom-class","dojo/dom-style","dojo/dom-attr","dojo/dom-construct","dijit/Tooltip","esri/layers/ArcGISImageServiceLayer","../../kernel","../../lang","../../request","../../symbols/SimpleFillSymbol","../../Color","../../renderers/ClassBreaksRenderer","../../tasks/AlgorithmicColorRamp","../../tasks/MultipartColorRamp","../RasterFunctionEditor/utils","./AnalysisBase","./_AnalysisOptions","./utils","./ItemTypes","./mixins/browselayers/BrowseLayerMixin","../../layers/RasterFunction","../../layers/ArcGISRenderingImageServiceLayer"],function(e,t,i,s,n,r,a,o,l,h,u,c,d,p,y,m,g,v,f,_,L,w,b,A,R,I,S,P,F,T,x,N,D){var C=e([P,S,x],{declaredClass:"esri.dijit.analysis.RasterAnalysisMixin",map:null,outputLayerName:null,resultParameter:"outputRaster",rasterGPToolName:"GenerateRaster",analysisType:"raster",i18n:null,returnProcessInfo:null,isPPTTool:!1,isDLTool:!1,unsupportedServiceNameCharacters:/[\s~`!#$%\^&*+=\-\[\]\\';,\/{}|\\":<>\?\.]/g,_geometryService:null,_findDeepestArgsForRerun:!1,constructor:function(e,t){this._pbConnects=[],e.containerNode&&(this.container=e.containerNode)},destroy:function(){this.inherited(arguments),s.forEach(this._pbConnects,n.disconnect),delete this._pbConnects},postMixInProperties:function(){this.inherited(arguments),i.mixin(this.i18n,this.toolNlsName)},postCreate:function(){this.inherited(arguments),c.add(this._form.domNode,"esriSimpleForm"),this._outputLayerInput.set("validator",i.hitch(this,this.validateServiceName)),this._buildUI()},startup:function(){},validateServiceName:function(e){return F.validateServiceName(e,{textInput:this._outputLayerInput})},_getJobParameters:function(){},_getRasterFunction:function(){},_getRasterArguments:function(){},_getRasterObject:function(e){var t=e||this.get("inputLayer");return I.getRasterJsonFromLayer(t)},_getOutputRasterLayerName:function(){},_getOutputItemProperties:function(){},_setDefaultInputs:function(){},_resetUI:function(){},_getDefaultOutputItemProperties:function(e,t,i){var s=this._getDefaultRenderingRule(t),n=this._getDefaultRenderer(),r=this._getDefaultPopupInfo(),a=e||1,o=i||"RSP_NearestNeighbor",l={visibility:!0,opacity:a,interpolation:o,popupInfo:r};return s&&(l.renderingRule=s),n&&(l.layerDefinition={},l.layerDefinition.drawingInfo={},l.layerDefinition.drawingInfo.renderer=n.toJson()),l},_getDefaultRenderingRule:function(e){var t=new N;t.functionName="Stretch";var i={};i.StretchType=5,i.DRA=!1,i.Gamma=[1],i.UseGamma=!0,t.functionArguments=i,t.outputPixelType="U8";var s=new N;return s.functionName="Colormap",s.functionArguments={colorRamp:e||"Aspect",Raster:t},s},_getDefaultRenderer:function(){if(this.colorValues&&this.colorValues.length&&this.classMaxValues&&this.classMaxValues.length&&this.labels&&this.labels.length){var e=this.colorValues.length;if(e===this.classMaxValues.length&&e===this.labels.length){var t,i,s,n,r=new b({field:"Value",showInAscendingOrder:!0,classificationMethod:"natural-breaks"}),a=new R;for(a.colorRamps=[],s=0;s<e;s++)n=this.colorValues[s],t&&(i=new A,i.algorithm="hsv",i.fromColor=new w(t),i.toColor=new w(n),a.colorRamps.push(i)),t=n;a&&(r.authoringInfo={},r.authoringInfo.colorRamp=a.toJson());var o,l,h=[],u=-1;for(s=0;s<e;s++)l=this.colorValues[s],o=new L("solid",null,new w({r:l[0],g:l[1],b:l[2],a:l[3]})),h.push({minValue:u,maxValue:this.classMaxValues[s],label:this.labels[s],symbol:o}),u=this.classMaxValues[s];return r.infos=h,r.attributeField="Value",r}}},_getDefaultPopupInfo:function(){return{title:this.get("outputLayerName"),description:null,fieldInfos:[{fieldName:"Raster.ServicePixelValue",label:"Service Pixel Value",isEditable:!1,isEditableOnLayer:!1,visible:!1,format:{places:2,digitSeparator:!0}},{fieldName:"Raster.ServicePixelValue.Raw",label:"Pixel Value",isEditable:!1,isEditableOnLayer:!1,visible:!0,format:{places:2,digitSeparator:!0}}],showAttachments:!1,layerOptions:{showNoDataRecords:!0,returnTopmostRaster:!0},mediaInfos:[]}},_getReRunRFxArgs:function(e,t){var i={};return this._findFunction(e,t,i),i&&i.rasterFunctionArguments},_findFunction:function(e,t,i){var s=e&&e.rasterFunction,n=this._getRasterFunction();s&&i&&"object"==typeof i&&(s!==n||(i.rasterFunction=e.rasterFunction,i.rasterFunctionArguments=e.rasterFunctionArguments,t))&&this._findFunction(e.rasterFunctionArguments&&e.rasterFunctionArguments.Raster,t,i)},_getSelectedLayerIndexFromUI:function(e,t){if(!e||!t)return-1;var i=-1;return s.forEach(e,function(e,s){e&&e.label.toLowerCase()===t.toLowerCase()&&(i=s)}),i},_setAnalysisGpServerAttr:function(e){e&&(this.analysisGpServer=e,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.rasterGPToolName))},_setInputLayersAttr:function(e){this.inputLayers=e},_setInputLayerAttr:function(e){this.inputLayer=e},_getInputLayerAttr:function(){return this.inputLayer},_getOutputLayerNameAttr:function(){return this._outputLayerInput&&(this.outputLayerName=this._outputLayerInput.get("value")),this.outputLayerName},_setOutputLayerNameAttr:function(e){this.outputLayerName=e},_setDisableRunAnalysisAttr:function(e){this._saveBtn.set("disabled",e)},_setDisableExtentAttr:function(e){this._useExtentCheck.set("checked",!e),this._useExtentCheck.set("disabled",e)},_getDisableExtentAttr:function(){this._useExtentCheck.get("disabled")},_setMapAttr:function(e){this.map=e},_getMapAttr:function(){return this.map},_setModelsAttr:function(e){this.models=e},_handleModeCrumbClick:function(e){e.preventDefault(),this._onClose(!0)},_onClose:function(e){this._removePointLayer(),e&&(this._save(),this.emit("save",{save:!0})),this.removePreviewLayerFromMap(),this.emit("close",{save:!e})},_removePointLayer:function(){this.drawnPointLayer&&(this._removeLayer(this.drawnPointLayer,this.inputLayers,this._analysisSelect),this._sourceDrawBtn.deactivate())},_removeLayer:function(e,t,i){this.map.removeLayer(e),s.forEach(t,function(s,n){if(s===e)return i.removeOption({value:n+1,label:t.name}),void t.splice(n,1)},this)},_save:function(){},_handleShowCreditsClick:function(e){e.preventDefault();var t={};this._form.validate()&&(t.inputLayer=r.toJson(F.constructAnalysisInputLyrObj(this.get("inputLayer"))),t[this.outputName]=r.toJson({serviceProperties:{name:this.get("outputLayerName")}}),this.secondaryOutputNames&&i.mixin(t,this.updateSecondaryOutputNames()),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(t.context=r.toJson({extent:this.map.extent._normalize(!0)})),this.getCreditsEstimate(this.toolName,t).then(i.hitch(this,function(e){this._usageForm.set("content",e),this._usageDialog.show()})))},updateSecondaryOutputNames:function(){var e={};return s.forEach(this.secondaryOutputNames,i.hitch(this,function(t){this.get(t)&&(e[t]=r.toJson({serviceProperties:{name:this.get(t).replace(this.unsupportedServiceNameCharacters,"_")}}))})),e},_validateRFT:function(e){if(e){var t=!1,s=this.analysisGpServer.replace("RasterAnalysisTools/GPServer","RasterRendering/ImageServer/validate"),n={renderingRule:e,f:"json"};return this._previewBtnTooltip||(this._previewBtnTooltip=new m({connectId:[this.esriAnalysisPreviewError,this.esriAnalysisPreviewWarning],label:this.i18n.previewError})),_({url:s,content:n,load:i.hitch(this,function(e){return e&&e.renderingRule&&e.renderingRule.isValid&&(t=!0),t})})}},onValidRFT:function(){this._previewBtnTooltip.label="",this._previewBtn.checked=!0,this.removePreviewErrors()},onInvalidRFT:function(){this._previewBtnTooltip.label="<div class='esriAnalysisPreviewErrorToolTip'>"+this.i18n.previewError+"</div>",this._previewBtn.checked=!1,this.esriAnalysisPreviewWarning.style.display="none",this.esriAnalysisPreviewError.style.display="block",this.onPreviewLoad()},handleExportImageFailure:function(){this._previewBtnTooltip.label="<div class='esriAnalysisPreviewErrorToolTip'>"+this.i18n.previewWarning+"</div>",this.esriAnalysisPreviewError.style.display="none",this.esriAnalysisPreviewWarning.style.display="block",this.onPreviewLoad()},onPreviewLoad:function(){this.esriAnalysisPreviewLoading.style.display="none"},removePreviewErrors:function(){this.esriAnalysisPreviewError.style.display="none",this.esriAnalysisPreviewWarning.style.display="none"},_handlePreviewBtnClick:function(e){this._form.validate()&&(this._preview?(this._preview=!this._preview,this.onPreviewLoad(),this.removePreviewErrors(),this.removePreviewLayerFromMap()):(this.removePreviewErrors(),this.esriAnalysisPreviewLoading.style.display="block",this._validateRFT(this._getRenderingRule()).then(i.hitch(this,function(e){this._preview=e,e?(this.onValidRFT(),this._showPreview()):this.onInvalidRFT()}))))},updatePreview:function(){this._preview&&(this.removePreviewErrors(),this._showPreview())},_showPreview:function(){var e=this._getRenderingRule();this.esriAnalysisPreviewLoading.style.display="block",this._addPreviewLayerToMap(e)},_addPreviewLayerToMap:function(e){this.previewLayer&&this.removePreviewLayerFromMap();var t=this.analysisGpServer.replace("RasterAnalysisTools/GPServer","RasterRendering/ImageServer"),s=new D(t,{raster:e,type:"rft"}),n=i.hitch(this,function(e){this.previewLayer=e,this.map.addLayer(this.previewLayer),this.onValidRFT()});s.loaded?n(s):(s.on("load",function(){n(s)}),s.on("error",i.hitch(this,function(){this.previewLayer?this.previewLayer.updating||this.handleExportImageFailure():this.onInvalidRFT()})),s.on("update-end",i.hitch(this,function(){this.onPreviewLoad(),this.onValidRFT()})),s.on("update-start",i.hitch(this,function(){this.onValidRFT(),this.esriAnalysisPreviewLoading.style.display="block"})))},removePreviewLayerFromMap:function(){this.previewLayer&&(this.map.removeLayer(this.previewLayer),this.previewLayer=void 0)},_getRenderingRule:function(){var e={};return this._useRFT?e=this._getRasterFunction():(e.rasterFunction=this._getRasterFunction(),e.rasterFunctionArguments=this._getRasterArguments()),r.toJson(e)},_handleSaveBtnClick:function(e){if(this._form.validate()){var t;t=this.secondaryOutputNames?this._validateSecondaryOutputNames():"done",l(t,i.hitch(this,function(){this._saveBtn.set("disabled",!0);var e=this._webLayerTypeSelect.get("value"),t={},s=this._getJobParameters();if(!f.isDefined(s)){s={},s.rasterFunction=this._getRenderingRule();var n=this._getRasterObject();n&&!this._useRFT&&(s.functionArguments=r.toJson({raster:n}))}s[this.outputName]=r.toJson({serviceProperties:{name:this.get("outputLayerName")}}),this.secondaryOutputNames&&i.mixin(s,this.updateSecondaryOutputNames()),s.returnProcessInfo=this.returnProcessInfo;var a={};if(this.showChooseExtent&&!this.get("disableExtent")&&this._useExtentCheck.get("checked")&&(a.extent=this.map.extent._normalize(!0)),s.context=r.toJson(a),t.jobParams=s,"permanentLayer"===e){t.itemParams={description:this.i18n.itemDescription,tags:h.substitute(this.i18n.itemTags,{layername:this.inputLayer&&this.inputLayer.name,fieldname:s.field||"",valuelayername:s.valuelayername||""}),snippet:this.i18n.itemSnippet};var o=this._getOutputItemProperties();o&&(t.itemParams.text=o),this.showSelectFolder&&(t.itemParams.folder=this.get("folderId")),t.analysisType=this.analysisType,this.execute(t)}else"dynamicLayer"===e&&this._handleSaveDynamicLayer(s)}))}},_handleSaveDynamicLayer:function(e){var t=this.get("inputLayer"),i=this.analysisGpServer.replace("RasterAnalysisTools/GPServer","RasterRendering/ImageServer?viewId="),s={createItemThumbnail:!1};s.url=i+t.url,s.outputLayerName=r.fromJson(e[this.outputName]).serviceProperties.name,s.analysisInfo={toolName:this.toolName,jobParams:e};var n=new N;n.functionName=this._getRasterFunction(),n.functionArguments=this._getRasterArguments(),s.renderingRule=n,s.mosaicRule=t.mosaicRule},_handleAnalysisLayerChange:function(e){if("browselayers"===e||"browse"===e){this._isAnalysisSelect=!0,this.browseType&&(this.defaultItemTypes=[],this.set("allowedItemTypes",this.browseType));var t={geometryTypes:this.checkGeometries,tags:this.tags,customCheck:this.hasCustomCheck?{customCheckHandler:i.hitch(this,this.isValidInputLayer),customCheckFailureMessage:this.customCheckFailureMessage}:void 0};this._createBrowseItems(this.getOptionsForRasterBrowseItems(e),t,this._analysisSelect)}else this.inputLayer=this.inputLayers[e],this._updateAnalysisLayerUI(!0)},addPointAnalysisLayer:function(){this._sourceDrawBtn&&(this._sourceDrawBtn.set("map",this.map),this._sourceDrawBtn.on("change",i.hitch(this,this._handleAnalysisPointSelectLayer)))},_handleAnalysisPointSelectLayer:function(e){this.inputLayers&&0!==this.inputLayers.length&&-1!==this.inputLayers.indexOf(e)||(this.drawnPointLayer=e,this.inputLayers.push(e),this.inputLayer=e,this._analysisSelect.removeOption(this._analysisSelect.getOptions()),F.populateAnalysisLayers(this,"inputLayer","inputLayers"),this._updateAnalysisLayerUI(!0))},_updateAnalysisLayerUI:function(e){"ApplyRFxTemplate"===this.toolName&&(e&&(this.outputLayerName=this._getOutputRasterLayerName()),this._outputLayerInput.set("value",this.outputLayerName)),this.inputLayer&&(this._interpolateToolDescription&&p.set(this._interpolateToolDescription,"innerHTML",h.substitute(this.i18n.toolDefine,{layername:this.inputLayer.name})),e&&(this.outputLayerName=this._getOutputRasterLayerName()||h.substitute(this.i18n.outputLayerName,{layername:this.inputLayer.name})),this._outputLayerInput.set("value",this.outputLayerName)),this._resetUI()},_handleBrowseItemsSelect:function(e,t){e&&e.selection&&F.addAnalysisReadyLayer({item:e.selection,layers:this.inputLayers,layersSelect:this._analysisSelect,browseDialog:this._browseLyrsdlg,widget:this},t).always(i.hitch(this,this._updateAnalysisLayerUI,!0))},_handleModelChange:function(e){this.model.itemId!==e&&(this.model.itemId=e,this._queryModelArguments(e))},_queryModelArguments:function(e){var t=this._toolServiceUrl,s={model:r.toJson({url:this.portalUrl+"/sharing/content/items/"+e}),context:{f:"json"}};this.set("toolServiceUrl",this.analysisGpServer+"/QueryDeepLearningModelInfo"),this._modelArguments.innerHTML="",d.set(this._queryModelArgsMsg,"display","table-row"),this.gp.submitJob(s,i.hitch(this,function(e){this.gp.getResultData(e.jobId,"outModelInfo",i.hitch(this,function(e){if(this.set("toolServiceUrl",t),d.set(this._queryModelArgsMsg,"display","none"),e&&e.value&&e.value.modelInfo){var i=r.fromJson(e.value.modelInfo).ParameterInfo;i&&i.length>0&&this._loadModelArguments(i)}}))}))},_loadModelArguments:function(e){var t=[],n=y.toDom("<tr><td colspan='2' style='width:50%'><label>"+this.i18n.nameLabel+"</label></td><td style='width:50%'><label>"+this.i18n.valueLabel+"</td></tr>");y.place(n,this._modelArguments),s.forEach(e,i.hitch(this,function(e){var i=e.name;if(["raster","model","device"].indexOf(i.toLowerCase())<0){var s=e.value,n=y.toDom("<tr><td colspan='2' style='width:50%'><label>"+i+"</label></td><td style='width:50%'><div><input type='text' data-dojo-type='dijit/form/NumberTextBox' data-dojo-props='intermediateChanges:true' style='width:100%;text-align:right' value='"+s+"'></div></td></tr>");y.place(n,this._modelArguments),t.push(n)}})),this.modelArgumentRows=t},_updateModelArguments:function(e){var t=[],i=y.toDom("<tr><td colspan='2' style='width:50%'><label>"+this.i18n.nameLabel+"</label></td><td style='width:50%'><label>"+this.i18n.valueLabel+"</td></tr>");y.place(i,this._modelArguments);for(var s in e){var n=y.toDom("<tr><td colspan='2' style='width:50%'><label>"+s+"</label></td><td style='width:50%'><div><input type='text' data-dojo-type='dijit/form/NumberTextBox' data-dojo-props='intermediateChanges:true' style='width:100%;text-align:right' value='"+e[s]+"'></div></td></tr>");y.place(n,this._modelArguments),t.push(n)}this.modelArgumentRows=t},_validateSecondaryOutputNames:function(e){var n=new t;return this.getUserProfile().then(i.hitch(this,function(e){var t=[],r=!0,a=this.portalUrl+"/sharing/rest/portals/"+e.orgId+"/isServiceNameAvailable";s.forEach(this.secondaryOutputNames,i.hitch(this,function(e){if(this.get(e)){var i={name:this.get(e).replace(this.unsupportedServiceNameCharacters,"_"),type:"Image Service",f:"json"};t.push(_({url:a,content:i}))}})),o(t).then(i.hitch(this,function(e){s.forEach(e,i.hitch(this,function(e,t){e.available||(r=!1,this.emit("job-fail",{message:this.i18n.servNameExists,type:"warning",messageCode:"AB_0002"}),n.reject())})),r&&n.resolve()}))})),n.promise},_buildUI:function(){var e=!0;this._loadConnections();var t=["ClassifyPixelsUsingDeepLearning","DetectObjectsUsingDeepLearning","CalculateSlope","DeriveAspect","MonitorVegetation","ApplyRFxTemplate","RemapValues","ExtractRaster","AggregateMultidimensionalRaster","GenerateMultidimensionalAnomaly"],n=["ClassifyPixelsUsingDeepLearning","DetectObjectsUsingDeepLearning"];if(this.isPPFTool=-1!==t.indexOf(this.toolName),this.isDLTool=-1!==n.indexOf(this.toolName),this.isDetectObjectTool="DetectObjectsUsingDeepLearning"==this.toolName,this.needRFTs="AggregateMultidimensionalRaster"==this.toolName,this.isMdTool=-1!==["AggregateMultidimensionalRaster","GenerateMultidimensionalAnomaly"].indexOf(this.toolName),this.signInPromise.then(i.hitch(this,function(){F.initHelpLinks(this.domNode,this.showHelp,{analysisGpServer:this.analysisGpServer,analysisMode:"raster"});var e,t=this.portalUrl+"/sharing/search";if(this.isDLTool){var n=[];_({url:t,content:{f:"json",q:"Deep learning package"}},{usePost:!0}).then(i.hitch(this,function(t){if(t){var r=t.results;r&&r.length>0&&(s.forEach(r,i.hitch(this,function(e){var t={value:e.id,label:e.title};n.push(t),this._modelSelect.addOption(t)})),this.models=n,this.model&&(e=this.model.itemId),this.model&&n.findIndex(function(t){return t.value===e})>=0?(this.modelArguments&&this._updateModelArguments(this.modelArguments),this._modelSelect.set("value",this.model.itemId)):this.model={itemId:0})}}))}if(this.needRFTs){var r=[];_({url:t,content:{f:"json",q:'type: "Raster function template" NOT "ArcGIS Raster Function Template"'}},{usePost:!0}).then(i.hitch(this,function(t){if(t){var n=t.results;n&&n.length>0&&(s.forEach(n,i.hitch(this,function(e){var t={value:{itemId:e.id},label:e.title};r.push(t),this._aggregationFunctionSelect.addOption(t)})),this.aggregationFunctions=r,this.aggregationFunction&&(e=this.aggregationFunction.value),this.aggregationFunction&&r.findIndex(function(t){return t.value===e})>=0||(this.aggregationFunction=r[0]),this._aggregationFunctionSelect.set("value",this.aggregationFunction))}}))}})),this.rasterFunction){var r=this._getReRunRFxArgs(this.rasterFunction,this._findDeepestArgsForRerun);r&&i.mixin(this,r)}if(this.functionArguments&&this.functionArguments.Raster&&this.set("inputLayer",this.functionArguments.Raster),this.get("showSelectAnalysisLayer")&&(this.inputLayers&&this.inputLayer&&!F.isLayerInLayers(this.inputLayer,this.inputLayers)&&this.inputLayers.push(this.inputLayer),this.get("inputLayer")||!this.get("inputLayers")||this.rerun||this.set("inputLayer",this.inputLayers[0]),F.populateAnalysisLayers(this,"inputLayer","inputLayers")),this.addAnalysisBrowseOption(),this.outputLayerName&&(this._outputLayerInput.set("value",this.outputLayerName),e=!1),(this.inputLayer||"ApplyRFxTemplate"===this.toolName)&&this._updateAnalysisLayerUI(e),d.set(this._chooseFolderRow,"display",!0===this.showSelectFolder?"block":"none"),this.showSelectFolder&&this.getFolderStore().then(i.hitch(this,function(e){this.folderStore=e,F.setupFoldersUI({folderStore:this.folderStore,folderId:this.folderId,folderName:this.folderName,folderSelect:this._webMapFolderSelect,username:this.portalUser?this.portalUser.username:""})})),this._chooseLayerTypeRow){d.set(this._chooseLayerTypeRow,"display",!0===this.showSelectLayerType?"block":"none");var o=new a({data:[{name:this.i18n.permanentLayer,id:"permanentLayer"},{name:this.i18n.dynamicLayer,id:"dynamicLayer"}]});this._webLayerTypeSelect.set("store",o),this._webLayerTypeSelect.set("value","permanentLayer")}d.set(this._chooseExtentDiv,"display",!0===this.showChooseExtent?"inline-block":"none"),d.set(this._showCreditsLink,"display",!0===this.showCredits?"block":"none"),this.inputLayer&&this.inputLayer.drawnLayer&&this._sourceDrawBtn&&this._sourceDrawBtn.set("pointFeatureLayer",this.inputLayer),this._setDefaultInputs()},addAnalysisBrowseOption:function(){this.browseType&&1===this.browseType.length&&this.browseType.indexOf(T.IS)>-1?F.addReadyToUseLayerOption(this,[{select:this._analysisSelect,disableLAAL:!0}]):F.addReadyToUseLayerOption(this,[this._analysisSelect]),this.addBrowseOption()},getOptionsForRasterBrowseItems:function(e){return this.browseType.indexOf(T.FS)>-1?{browseValue:e}:{browseValue:e,disableLAAL:!0,disableBoundary:!0}},addBrowseOption:function(){},isImageServiceLayer:function(e){return e&&(e instanceof g||"esri.layers.ArcGISImageServiceLayer"===e.declaredClass)},_loadConnections:function(){this.on("start",i.hitch(this,"_onClose",!1)),this._connect(this._closeBtn,"onclick",i.hitch(this,"_onClose",!0))},_connect:function(e,t,i){this._pbConnects.push(n.connect(e,t,i))}});return u("extend-esri")&&i.setObject("dijit.analysis.RasterAnalysisMixin",C,v),C});