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

define(["dojo/_base/declare","dojo/_base/lang","esri/dijit/geoenrichment/promise/all","esri/dijit/geoenrichment/when","esri/kernel","./dataProvider/_CommandSupport","./dataProvider/_SerializationSupport","./dataProvider/_ServerSerializationSupport","./dataProvider/supportClasses/areas/AnalysisAreaUtil","./dataProvider/supportClasses/areas/AnalysisAreaJsonUtil","./dataProvider/supportClasses/areas/AreasPreprocessor","./dataProvider/supportClasses/CustomReportsManager","./dataProvider/supportClasses/TemplateJsonLoader","./dataProvider/supportClasses/ReportDataProcessor","./dataProvider/supportClasses/InfographicOptionsProvider","./dataProvider/supportClasses/GEUtil","./dataProvider/supportClasses/attachments/DefaultAttachmentsStore","./dataProvider/supportClasses/attachments/CustomAttachmentsStore","./dataProvider/supportClasses/PortalManager","./dataProvider/supportClasses/data/VariablesUtil","./dataProvider/commands/mapToImage/MapToURLUtil","./core/themes/ThemeLibrary","./core/themes/ReportThemes","esri/dijit/geoenrichment/ReportPlayer/countryConfig","esri/dijit/geoenrichment/utils/ProjectionUtil","esri/dijit/geoenrichment/utils/UrlUtil"],function(e,r,t,a,o,n,i,s,l,p,c,u,m,d,h,g,f,y,A,v,C,I,P,U,b,R){return e([n,i,s],{analysisAreasLimit:-1,cacheTemplates:!0,printMapTaskUrl:null,resetReportItemsCache:!0,_infographicOptionsProvider:null,constructor:function(e){r.mixin(this,e),this._infographicOptionsProvider=new h},_getAttachmentsStore:function(e){return new f(e).initialize()},getCustomReports:function(e){return u.getCustomReports(e)},_currentContext:null,getReportData:function(e,o){var n=this,i=o&&o.progressCallback||function(){},s=r.mixin({},e);return s.portalUrl=R.getPortalUrl(s.portalUrl),s.hierarchy||s.analysisAreas.some(function(e){if(e.geographies&&e.geographies[0].hierarchy)return s.hierarchy=e.geographies[0].hierarchy,!0}),n.resetReportItemsCache&&u.resetCache(),n._currentContext=s,s.analysisAreas=p.areasFromJson(s.analysisAreas),s.combinedAreasInfo=s.combinedAreasInfo&&p.combinedAreasInfoFromJson(s.combinedAreasInfo)||{},l.populateCombinedAreasInfo(s.combinedAreasInfo,s.analysisAreas),s.fieldData={runReportTaskIDs:null,metadata:{},areaData:[],errors:[]},t([a(u.tryFindReportIdByAlias(s),function(e){s.reportID=e||s.reportID}),this._discoverPortal(s),function(){return s.variables&&a(v.preprocessVariables(s.variables,s.portalUrl),function(e){s.variables=e})}()]).then(function(){return a(c.preprocessAreas(s,{analysisAreasLimit:n.analysisAreasLimit}),function(){i(.25),setTimeout(function(){n._onCreateReportStarted()});var e={initGE:g.initialize(),countryInfo:g.getCountryInfo(s.countryID),infographicOptions:n._infographicOptionsProvider.getInfographicOptions(s),attachmentsStore:s.attachmentsProvider?y(s.attachmentsProvider):n._getAttachmentsStore(s.analysisAreas)};return s.reportID?(e.reportObject=u.getCustomReportByID(s),e.templateJsonInfo=m.getTemplateJsonByID(s,n.cacheTemplates),e.runReportResult=d.runReportAndGetData(s)):s.variables&&(e.reportObject=u.getFakeCustomReportByContext(s),e.templateJsonInfo=m.createTemplateJsonFromVariables(s),e.runReportResult=d.runReportFromVariables(s)),t(e).then(function(e){var r=e.reportObject,t=e.infographicOptions,o=e.attachmentsStore,n=e.templateJsonInfo.templateJson,l=e.templateJsonInfo.templateVariableProvider,p=e.runReportResult;return i(.75),n&&r&&s.fieldData?(d.applyRunReportAndGetDataResults(p,s),U.setCountry(e.countryInfo.country),U.setHierarchyID(s.hierarchy),U.setGeographiesModel(e.countryInfo.geographiesModels[U.getHierarchyID()]),a(o&&d.populateReportDataFromAttachmentsStore(s,o),function(){return i(1),n.theme||(n.theme=I.getReportThemeById(r.isGraphicReport?P.GRAPHIC:P.CLASSIC)),{isClassic:!r.isGraphicReport,isMultiFeature:r.isMultiFeature&&s.analysisAreas.length>1,reportType:r.type,reportTitle:s.reportTitle||r.title,templateJson:n,reportObject:r,fieldData:s.fieldData,analysisAreas:s.analysisAreas,combinedAreasInfo:s.combinedAreasInfo,reverseAnalysisAreasOnMap:s.reverseAnalysisAreasOnMap,infographicOptions:t,attachmentsStore:o,geClient:g.getClient(),templateVariableProvider:l,customLogo:s.customLogo,config:{portalUrl:s.portalUrl,geoenrichmentUrl:s.geoenrichmentUrl,geometryServiceUrl:s.geometryServiceUrl,printMapTaskUrl:s.printMapTaskUrl,countryID:s.countryID,hierarchy:s.hierarchy,reportID:s.reportID,variables:s.variables}}})):null})})})},_discoverPortal:function(e){var r=this;return A.getPortalInfo(e.portalUrl).then(function(t){e.geoenrichmentUrl=e.geoenrichmentUrl||t.portal.helperServices.geoenrichment.url;var a=o.id.findCredential(e.portalUrl),n=a&&a.token;g.setGeoenrichmentUrl(e.geoenrichmentUrl,n),r._infographicOptionsProvider.setServerUrl(e.geoenrichmentUrl,n),e.geometryServiceUrl=e.geometryServiceUrl||t.portal.helperServices.geometry.url,b.setGeometryServiceUrl(e.geometryServiceUrl),e.printMapTaskUrl=e.printMapTaskUrl||t.portal.helperServices.printTask.url,C.setPrintMapTaskUrl(e.printMapTaskUrl)})},reportDataToSingleAreaReportData:function(e,t){var a=t.currentFeatureIndex||0,o=r.mixin({},e.fieldData);o.areaData=[o.areaData[a]];var n=[r.mixin({},e.analysisAreas[a])];c.removeGroupInfo(n);var i=e.infographicOptions&&this._infographicOptionsProvider.getInfographicOptionsFromJson(e.infographicOptions.toJsonAt(a)),s=e.attachmentsStore,l=s&&{getAttachments:function(){return s.setCurrentAnalysisAreaIndex&&s.setCurrentAnalysisAreaIndex(a),s.getAttachments()},getAttributes:function(){return s.setCurrentAnalysisAreaIndex&&s.setCurrentAnalysisAreaIndex(a),s.getAttributes()},getNotes:function(){return s.setCurrentAnalysisAreaIndex&&s.setCurrentAnalysisAreaIndex(a),s.getNotes()}};return{isClassic:e.isClassic,isMultiFeature:!1,reportType:e.reportType,reportTitle:t.reportTitle,templateJson:t.templateJson,reportObject:e.reportObject,fieldData:o,analysisAreas:n,combinedAreasInfo:null,reverseAnalysisAreasOnMap:!1,infographicOptions:i,attachmentsStore:l,geClient:e.geClient,templateVariableProvider:e.templateVariableProvider,config:e.config}},_getCurrentContext:function(){return this._currentContext},_onCreateReportStarted:function(){},enrichFieldData:function(e,r){return d.enrichFieldData(e,r)}})});