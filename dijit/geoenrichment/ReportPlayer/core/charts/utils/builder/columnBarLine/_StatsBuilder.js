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

define(["dojo/_base/declare","../../../../supportClasses/conditionalStyling/ConditionalStyleUtil","../../../../sections/dynamicSettings/supportClasses/FilterUtil","../../ChartTypes","../utils/ChartDataUtil"],function(e,t,s,i,a){return e(null,{_visualProperties:null,_seriesItems:null,_viewModel:null,_currentFeatureIndex:null,_isMultiFeatureChart:null,_excludedSeriesHash:null,_comparisonFeatureAttributes:null,_chartType:null,_isSecondaryPlot:!1,_oppositeDirections:!1,_totalStats:null,_seriesValues:null,_seriesStats:null,constructor:function(e){this._visualProperties=e.visualProperties,this._seriesItems=e.seriesItems,this._viewModel=e.viewModel,this._currentFeatureIndex=e.currentFeatureIndex,this._isMultiFeatureChart=e.isMultiFeatureChart,this._excludedSeriesHash=e.excludedSeriesHash||{},this._comparisonFeatureAttributes=e.comparisonFeatureAttributes,this._chartType=e.chartType,this._isSecondaryPlot=e.isSecondaryPlot,this._oppositeDirections=e.oppositeDirections,this._calcValuesForAllSeries(),this._calcInSeriesStats(),this._visualProperties.isStacked&&this._calcInStackStats(),this._calcTotalStats()},gettatisticsForSeriesAt:function(e){return this._seriesStats[e]},getTotalStats:function(){return this._totalStats},_calcValuesForAllSeries:function(){var e=this._visualProperties,r=this._seriesItems,n=this._viewModel,l=this._currentFeatureIndex,u=this._isMultiFeatureChart,o=this._comparisonFeatureAttributes,h=this._chartType,c=r.length>1&&e.renderColumnBarsInOppositeDirections;this._seriesValues=this._seriesItems.map(function(_,S){var d=2===r.length&&(c||this._oppositeDirections&&this._isSecondaryPlot)?a.CHART_DATA_SMOOTH:null;if(e.filter&&e.filter.ranges)d=a.getChartData({filterRangesStats:s.getRangeStatistics(e.filter.ranges),numPoints:r[0].points.length,chartData:d,visualProperties:e});else if(e.conditionalStyling){var m=t.getStatistics(e.conditionalStyling);m&&r.length&&(d=a.getChartData({conditionalStats:m,numPoints:r[0].points.length,chartData:d,visualProperties:e}))}return _.points.map(function(t,s){if(t.hidden)return{value:void 0};var r=a.getPointValue({point:t,index:s,seriesIndex:S,maxValue:!1,chartType:h,visualProperties:e,viewModel:n,currentFeatureIndex:u?i.isLineLike(h)?S:s:l,chartData:d,isComparisonSeries:_.isComparisonSeries,comparisonFeatureAttribute:o&&o[0]}),c=n.getBenchmarkController&&n.getBenchmarkController();if(i.isBenchmarkSupported(h,u)&&c&&c.getAreaIndex()>=0&&c.getAreaIndex()!==l){return{value:r-a.getPointValue({point:t,index:s,seriesIndex:S,maxValue:!1,chartType:h,visualProperties:e,viewModel:n,currentFeatureIndex:c.getAreaIndex(),chartData:d,isComparisonSeries:!1}),isBenchmarked:!0,ownValue:r}}return{value:r}})},this)},_calcInSeriesStats:function(){this._seriesStats=this._seriesItems.map(function(e,t){var s=this._excludedSeriesHash[e.label],i=0,a=0,r=1e6,n=-1e6,l=0;return s||e.points.forEach(function(e,s){if(!e.hidden){l++;var u=this._getValueAt(t,s);i+=u,a+=Math.abs(u),r=Math.min(r,u),n=Math.max(n,u)}},this),{values:this._seriesValues[t],sumInSeries:i,absSumInSeries:a,minInSeries:r,maxInSeries:n,avgInSeries:i/l}},this)},_calcInStackStats:function(){this._seriesItems[0].points.forEach(function(e,t){var s=0,i=[],a=[];this._seriesItems.forEach(function(a,r){if(!this._excludedSeriesHash[a.label]&&!e.hidden){var n=this._getValueAt(r,t);i[r]=n,s+=Math.abs(n)}},this),this._seriesItems.forEach(function(r,n){if(!this._excludedSeriesHash[r.label]&&!e.hidden){var l=this._seriesStats[n];l.stackValues=l.stackValues||[],l.stackValues[t]=i,l.weightsInStack=l.weightsInStack||[];var u=this._getValueAt(n,t),o=l.weightsInStack[t]=u/s;l.stackValuesAsWeighedPercents=l.stackValuesAsWeighedPercents||[],l.stackValuesAsWeighedPercents[t]=a,a[n]=100*o}},this)},this)},_calcTotalStats:function(){var e=this._totalStats={minYValue:1/0,maxYValue:-1/0,stackedValues:this._visualProperties.isStacked?[]:null,crossSeriesStats:null};this._seriesItems.forEach(function(t,s){if(!this._excludedSeriesHash[t.label]){var i=this._seriesStats[s];t.points.forEach(function(t,a){if(!t.hidden){var r=this._getValueAt(s,a),r=this._visualProperties.showValuesAsWeightInStack?100*i.weightsInStack[a]:this._visualProperties.yAxis.showValuesAsWeightsInSeries?r/i.absSumInSeries*100:r;if(e.stackedValues){e.stackedValues[a]=e.stackedValues[a]||0;var n=e.stackedValues[a]+=r;e.minYValue=Math.min(n,e.minYValue),e.maxYValue=this._visualProperties.showValuesAsWeightInStack?100:Math.max(n,e.maxYValue)}else e.minYValue=Math.min(r,e.minYValue),e.maxYValue=Math.max(r,e.maxYValue)}},this)}},this),e.crossSeriesStats=this._isMultiFeatureChart&&this._collectCrossSeriesStats()},_collectCrossSeriesStats:function(){return this._seriesStats[0].values.map(function(e,t){var s=0,i=0,a=1e6,r=-1e6;return this._seriesStats.forEach(function(e){var n=e.values[t].value||0;s+=n,i+=Math.abs(n),a=Math.min(a,n),r=Math.max(r,n)}),{sum:s,absSum:i,min:a,max:r,avg:s/this._seriesStats.length}},this)},_getValueAt:function(e,t){var s=this._seriesValues[e],i=s&&s[t];return i&&i.value||0}})});