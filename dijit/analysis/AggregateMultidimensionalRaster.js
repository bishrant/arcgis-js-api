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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/json","dojo/_base/connect","dojo/has","dojo/dom-class","dojo/dom-style","dojo/string","dojo/dom-construct","dojo/query","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/registry","dijit/form/CheckBox","dijit/form/Select","../../kernel","../../lang","./RasterAnalysisMixin","./utils","./AnalysisRegistry","./ItemTypes","dojo/i18n!../../nls/jsapi","dojo/i18n!./nls/AggregateMultidimensionalRaster","dojo/text!./templates/AggregateMultidimensionalRaster.html"],function(e,t,i,n,a,s,l,o,r,g,h,u,d,c,v,_,m,R,A,f,L,S,b,y,p,E,D,M){var I=e([u,d,c,v,_,S],{declaredClass:"esri.dijit.analysis.AggregateMultidimensionalRaster",templateString:M,widgetsInTemplate:!0,inputLayers:null,inputLayer:null,dimension:null,dimensions:null,variables:null,variableList:null,aggregationFunctions:null,aggregationMethod:"MEAN",aggregationFunction:null,aggregationDefinition:"ALL",intervalKeyword:"HOURLY",intervalValue:1,intervalUnit:"Hours",intervalRanges:null,ignoreNoData:!0,_emptyValue:-12345678,toolName:"AggregateMultidimensionalRaster",helpFileName:"AggregateMultidimensionalRaster",toolNlsName:E.aggregateMultidimensionalRasterTool,rasterGPToolName:"AggregateMultidimensionalRaster",resultParameter:"outputMultidimensionalRaster",browseType:[p.IS],hasCustomCheck:!0,customCheckFailureMessage:E.customCheckFailureMessage.integerService,constructor:function(e,t){this._pbConnects=[],this._statsRows=[],e.containerNode&&(this.container=e.containerNode),e.rerun&&(e.inputMultidimensionalRaster=e.inputLayer)},postMixInProperties:function(){this.inherited(arguments),t.mixin(this.i18n,D)},_getJobParameters:function(){var e=n.toJson(b.constructAnalysisInputLyrObj(this.get("inputLayer"))),i=this.get("dimension"),a=this.get("variables"),s=this._getAggregationMethodParam(),l=this._getAggregationDefinitionParam(),o=this.get("ignoreNoData");return t.mixin({inputMultidimensionalRaster:e,dimension:i,variables:a,ignoreNoData:o},t.mixin(s,l))},_setDefaultInputs:function(){this.dimension&&this.dimensions&&this._dimensionSelect.set("value",this.dimension),this.variables&&this._variables.set("value",this.variables),this.aggregationMethod&&this._loadAggregationMethod(!0),this.aggregationDefinition&&this._loadAggregationDefinition(!0);var e=0;this.aggregationFunctions&&i.forEach(this.aggregationFunctions,function(t,i){this._aggregationFunctionSelect.addOption({value:i,label:t.name}),0!==i||this.rerun?this.aggregationFunction&&this.aggregationFunction.name===this.aggregationFunction.name&&this.aggregationFunction.url===this.aggregationFunction.url&&(e=i):this.set("aggregationFunction",t)},this),this.aggregationFunction&&e>0&&this._aggregationFunctionSelect.set("value",e),this.aggregationDefinition&&this._loadAggregationDefinition(!0),this.intervalKeyword&&this._loadIntervalKeyword(!0),this.intervalValue&&this._intervalValue.set("value",this.intervalValue),this.intervalUnit&&this._loadIntervalUnit(),this.intervalRanges&&this._intervalRanges.set("value",this.intervalRanges),this._ignoreNoDataCheck.set("checked",this.ignoreNoData)},_resetUI:function(){this.inputLayer&&(this.outputLayerName=r.substitute(this.i18n.outputLayerName,{layername:this.inputLayer.name}),this._outputLayerInput.set("value",this.outputLayerName),this.inputLayer.getMultidimensionalInfo().then(t.hitch(this,function(e){this.variableList=e.variables,this.set("variables",this.variableList)})))},_loadAggregationMethod:function(e){this._aggregationMethodSelect.removeOption(this._aggregationMethodSelect.getOptions());var t=e&&this.aggregationMethod;this._aggregationMethodSelect.addOption([{value:"MEAN",label:this.i18n.mean,selected:"MEAN"===t},{value:"MAJORITY",label:this.i18n.majority,selected:"MAJORITY"===t},{value:"MAXIMUM",label:this.i18n.maximum,selected:"MAXIMUM"===t},{value:"MEDIAN",label:this.i18n.median,selected:"MEDIAN"===t},{value:"MINIMUM",label:this.i18n.minimum,selected:"MINIMUM"===t},{value:"MINORITY",label:this.i18n.minority,selected:"MINORITY"===t},{value:"RANGE",label:this.i18n.range,selected:"RANGE"===t},{value:"STD",label:this.i18n.standardDeviation,selected:"STD"===t},{value:"SUM",label:this.i18n.sum,selected:"SUM"===t},{value:"VARIETY",label:this.i18n.variety,selected:"VARIETY"===t},{value:"CUSTOM",label:this.i18n.custom,selected:"CUSTOM"===t}])},_loadAggregationDefinition:function(e){this._aggregationDefinitionSelect.removeOption(this._aggregationDefinitionSelect.getOptions());var t=e&&this.aggregationDefinition;this.dimension=this.get("dimension"),"StdTime"!==this.dimension?this._aggregationDefinitionSelect.addOption([{value:"ALL",label:this.i18n.all,selected:"ALL"===t},{value:"INTERVAL_VALUE",label:this.i18n.intervalValue,selected:"INTERVAL_VALUE"===t},{value:"INTERVAL_RANGES",label:this.i18n.intervalRanges,selected:"INTERVAL_RANGES"===t}]):this._aggregationDefinitionSelect.addOption([{value:"ALL",label:this.i18n.all,selected:"ALL"===t},{value:"INTERVAL_KEYWORD",label:this.i18n.intervalKeyword,selected:"INTERVAL_KEYWORD"===t},{value:"INTERVAL_VALUE",label:this.i18n.intervalValue,selected:"INTERVAL_VALUE"===t},{value:"INTERVAL_RANGES",label:this.i18n.intervalRanges,selected:"INTERVAL_RANGES"===t}]),this._handleAggregationDefinitionChange("ALL")},_loadIntervalKeyword:function(e){this._intervalKeywordSelect.removeOption(this._intervalKeywordSelect.getOptions());var t=e&&this.intervalKeyword;this._intervalKeywordSelect.addOption([{value:"HOURLY",label:this.i18n.hourly,selected:"HOURLY"===t},{value:"DAILY",label:this.i18n.daily,selected:"DAILY"===t},{value:"WEEKLY",label:this.i18n.weekly,selected:"WEEKLY"===t},{value:"MONTHLY",label:this.i18n.monthly,selected:"MONTHLY"===t},{value:"QUARTERLY",label:this.i18n.quarterly,selected:"QUARTERLY"===t},{value:"YEARLY",label:this.i18n.yearly,selected:"YEARLY"===t},{value:"DEKADLY",label:this.i18n.dekadly,selected:"DEKADLY"===t},{value:"PENTADLY",label:this.i18n.pentadly,selected:"PENTADLY"===t},{value:"RECURRING_DAILY",label:this.i18n.recurringDaily,selected:"RECURRING_DAILY"===t},{value:"RECURRING_WEEKLY",label:this.i18n.recurringWeekly,selected:"RECURRING_WEEKLY"===t},{value:"RECURRING_MONTHLY",label:this.i18n.recurringMonthly,selected:"RECURRING_MONTHLY"===t},{value:"RECURRING_QUARTERLY",label:this.i18n.recurringQuarterly,selected:"RECURRING_QUARTERLY"===t}])},_loadIntervalUnit:function(e){this._intervalUnitSelect.removeOption(this._intervalUnitSelect.getOptions());var t=e&&this.intervalUnit;this._intervalUnitSelect.addOption([{value:"HOURS",label:this.i18n.hours,selected:"HOURS"===t},{value:"DAYS",label:this.i18n.days,selected:"DAYS"===t},{value:"WEEKS",label:this.i18n.weeks,selected:"WEEKS"===t},{value:"MONTHS",label:this.i18n.months,selected:"MONTHS"===t},{value:"YEARS",label:this.i18n.years,selected:"YEARS"===t}])},_loadValueRanges:function(){this._removeStatsRows();var e=this.get("variables"),t=this.get("dimension");if(e&&t){var i=e.split(",")[0],n=this.variableList.find(function(e){return e.name===i}).dimensions.find(function(e){return e.name===t}).values,a=[];n.forEach(function(e){var i=e.toString(),n=e;if("StdTime"===t){var s=new Date(e);n=s.toISOString().split(".")[0],i=s.toLocaleString()}a.push({value:n,label:i})}),this._options=a,this._createStatsRow()}},_createStatsRow:function(){var e,i,n,s,l,o,r;return e=g.create("tr",null,this._intervalRangeListRow,"before"),n=g.create("td",{style:{width:"45%"}},e),i=g.create("td",{style:{width:"45%"}},e),s=new A({maxHeight:200,class:"esriLeadingMargin05 mediumInput esriTrailingMargin025 attrSelect",style:{tableLayout:"fixed",overflowX:"hidden"}},g.create("select",null,n)),l=new A({class:"mediumInput statsSelect",style:{tableLayout:"fixed",overflowX:"hidden"}},g.create("select",null,i)),this.addRangeOptions({selectWidget:s,label:this.i18n.minimumValueLabel}),this.addRangeOptions({selectWidget:l,label:this.i18n.maximumValueLabel}),s.set("statisticSelect",l),a.connect(s,"onChange",this._handleAttrSelectChange),r=g.create("td",{class:"shortTextInput removeTd",style:{display:"none",maxWidth:"12px"}},e),o=g.create("a",{title:this.i18n.removeAttrStats,class:"closeIcon statsRemove",innerHTML:"<img src='"+require.toUrl("./images/close.gif")+"' border='0''/>"},r),a.connect(o,"onclick",t.hitch(this,this._removeStatsRow,e)),this._statsRows.push(e),l.set("attributeSelect",s),l.set("removeTd",r),l.set("isnewRowAdded",!1),l.set("referenceWidget",this),l.watch("value",this._handleStatsValueUpdate),this._currentStatsSelect=l,this._currentAttrSelect=s,!0},addRangeOptions:function(e){var t=e.selectWidget;t.removeOption(t.getOptions()),t.addOption([{value:this._emptyValue,label:e.label}]),t.addOption(this._options)},_removeStatsRow:function(e){i.forEach(m.findWidgets(e),function(e){e.destroyRecursive()}),g.destroy(e)},_removeStatsRows:function(){i.forEach(this._statsRows,this._removeStatsRow,this),this._statsRows=[]},_handleDimensionChange:function(e){var t;if(this.dimension!==e){if(this.dimension=e,this.variableList){var i=this.variableList.filter(function(t){return t.dimensions.some(function(t){return t.name===e})});this.set("variables",i),i.length>0&&(t=i[0].dimensions.filter(function(t){return t.name===e})[0].interval)&&this.set("intervalValue",t)}this._loadAggregationDefinition(this.aggregationDefinition)}},_handleAggregationMethodChange:function(e){this._showDiv(this._aggregationFunctionLabelRow,"CUSTOM"==e),this._showDiv(this._aggregationFunctionSelectRow,"CUSTOM"==e)},_handleAggregationDefinitionChange:function(e){this._showDiv(this._intervalKeywordSelectRow,"INTERVAL_KEYWORD"==e&&"StdTime"===this.dimension),this._showDiv(this._intervalKeywordLabelRow,"INTERVAL_KEYWORD"==e&&"StdTime"===this.dimension),this._showDiv(this._intervalValueRow,"INTERVAL_VALUE"==e),this._showDiv(this._intervalUnitRow,"INTERVAL_VALUE"==e&&"StdTime"===this.dimension),this._showDiv(this._intervalRangesLabelRow,"INTERVAL_RANGES"==e),this._showDiv(this._intervalRangesRow,"INTERVAL_RANGES"==e),"INTERVAL_RANGES"==e&&this._loadValueRanges()},_handleAttrSelectChange:function(e){var i,n,a,s;i=this.get("statisticSelect"),s=this._emptyValue,e!==s&&i.get("value")!==s&&(i.get("isnewRowAdded")||(n=i.get("removeTd"),o.set(n,"display","block"),a=i.get("referenceWidget"),t.hitch(a,a._createStatsRow()),i.set("isnewRowAdded",!0)))},_handleStatsValueUpdate:function(e,i,n){var a,s,l,r;this.get("attributeSelect")&&(a=this.get("attributeSelect"),r=this._emptyValue,a.get("value")&&a.get("value")!==r&&n&&n!==r&&(this.get("isnewRowAdded")||(s=this.get("removeTd"),o.set(s,"display","block"),l=this.get("referenceWidget"),t.hitch(l,l._createStatsRow()),this.set("isnewRowAdded",!0))))},isMultidimensionalLayer:function(e){return e.hasMultidimensions},_showDiv:function(e,t){o.set(e,"display",t?"block":"none")},_getAggregationMethodParam:function(){var e=this.get("aggregationMethod");return"CUSTOM"===e?{aggregationMethod:e,aggregationFunction:JSON.stringify(this.get("aggregationFunction"))}:{aggregationMethod:e}},_getAggregationDefinitionParam:function(){var e=this.get("aggregationDefinition");return"INTERVAL_KEYWORD"===e?{aggregationDefinition:e,intervalKeyword:this.get("intervalKeyword")}:"INTERVAL_VALUE"===e?{aggregationDefinition:e,intervalValue:this.get("intervalValue"),intervalUnit:this.get("intervalUnit")}:"INTERVAL_RANGES"===e?{aggregationDefinition:e,intervalRanges:this.get("intervalRanges")}:{aggregationDefinition:e}},_setInputLayersAttr:function(e){this.inputLayers=i.filter(e,t.hitch(this,function(e){return this.isMultidimensionalLayer(e)}))},isValidInputLayer:function(e){return this.isMultidimensionalLayer(e)},_getInputLayersAttr:function(){return this.inputLayers},_setDimensionAttr:function(e){this.dimension=e,this._loadAggregationDefinition(this.AggregationDefinition)},_getDimensionAttr:function(){return this._dimensionSelect&&this._dimensionSelect.get("value")&&(this.dimension=this._dimensionSelect.get("value")),this.dimension},_setDimensionsAttr:function(e){var t;this.dimensions!==e&&this.inputLayer&&(this._dimensionSelect.removeOption(this._dimensionSelect.getOptions()),i.forEach(e,function(e){this._dimensionSelect.addOption({value:e.name,label:e.name})},this),this.dimension?this._dimensionSelect.set("value",this.dimension):(this.dimension=this._dimensionSelect.get("value"),t=this._dimensionSelect.get("value"),this._loadAggregationDefinition(),this.set("intervalValue",e.find(function(e){return e.name==t}).interval)))},_getDimensionsAttr:function(){return this.dimensions},_setVariablesAttr:function(e){var t=!1,n=" checked";this._variablesList.innerHTML="",i.forEach(e,function(e){var a,s,l,o="",r=e.dimensions;r&&r.length>0&&(a=null,i.forEach(r,function(e){a=e.name+"="+e.values.length+",",o+=a}),o=o.slice(0,-1),s=e.name+" ["+o+"] ("+e.description+")",l=g.toDom("<tr><td colspan='3'><label class='esriLeadingMargin1 esriSelectLabel'><input type='checkbox' data-dojo-type='dijit/form/CheckBox' value="+e.name+n+"/>"+s+"</label></td></tr>"),g.place(l,this._variablesList),n="",t||this.dimensions===r||(this.set("dimensions",r),t=!0))},this),this._showDiv(this._variablesListLabel,this.variableList.length>0)},_getVariablesAttr:function(){var e=this._variablesList.querySelectorAll("input:checked");if(e&&e.length>0){var t=[];return e.forEach(function(e){t.push(e.value)}),t.join(",")}return""},_setAggregationMethodAttr:function(e){this.aggregationMethod=e},_getAggregationMethodAttr:function(){return this._aggregationMethodSelect&&this._aggregationMethodSelect.get("value")&&(this.aggregationMethod=this._aggregationMethodSelect.get("value")),this.aggregationMethod},_setAggregationDefinitionAttr:function(e){this.aggregationDefinition=e},_getAggregationDefinitionAttr:function(){return this._aggregationDefinitionSelect&&this._aggregationDefinitionSelect.get("value")&&(this.aggregationDefinition=this._aggregationDefinitionSelect.get("value")),this.aggregationDefinition},_setAggregationFunctionAttr:function(e){this.aggregationFunction=e},_getAggregationFunctionAttr:function(){return this._aggregationFunctionSelect&&this._aggregationFunctionSelect.get("value")&&(this.aggregationFunction=this._aggregationFunctionSelect.get("value")),this.aggregationFunction},_setIntervalKeywordAttr:function(e){this.intervalKeyword=e},_getIntervalKeywordAttr:function(){return this._intervalKeywordSelect&&this._intervalKeywordSelect.get("value")&&(this.intervalKeyword=this._intervalKeywordSelect.get("value")),this.intervalKeyword},_setIntervalValueAttr:function(e){this.intervalValue=e,this._intervalValue.set("value",e)},_getIntervalValueAttr:function(){return this._intervalValue&&this._intervalValue.get("value")&&(this.intervalValue=this._intervalValue.get("value")),this.intervalValue},_setIntervalUnitAttr:function(e){this.intervalUnit=e},_getIntervalUnitAttr:function(){return this._intervalUnitSelect&&this._intervalUnitSelect.get("value")&&(this.intervalUnit=this._intervalUnitSelect.get("value")),this.intervalUnit},_setIntervalRangesAttr:function(e){this.intervalRanges=e},_getIntervalRangesAttr:function(){var e,t,i=[],n=this._emptyValue;return h(".statsSelect",this.domNode).forEach(function(a){e=m.byNode(a),t=e.get("attributeSelect"),t.get("value")!==n&&e.get("value")!==n&&i.push(t.get("value")+" "+e.get("value"))}),i.join(";")},_setIgnoreNoDataAttr:function(e){this.ignoreNoData=e},_getIgnoreNoDataAttr:function(){return this._ignoreNoDataCheck&&(this.ignoreNoData=this._ignoreNoDataCheck.get("checked")),this.ignoreNoData}});return s("extend-esri")&&t.setObject("dijit.analysis.AggregateMultidimensionalRaster",I,f),I});