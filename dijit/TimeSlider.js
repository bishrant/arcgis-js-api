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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/connect","dojo/_base/kernel","dojo/has","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/dom-geometry","dijit/_Widget","dijit/_Templated","dijit/form/HorizontalSlider","dijit/form/HorizontalRule","dijit/form/HorizontalRuleLabels","dojox/timing/_base","dojox/form/RangeSlider","dojo/text!dojox/form/resources/HorizontalRangeSlider.html","../kernel","../lang","../TimeExtent","./_EventedWidget","dojo/text!./templates/TimeSlider.html","dojo/i18n!../nls/jsapi"],function(t,e,i,s,n,r,h,a,l,o,m,u,d,_,c,T,g,S,f,p,b,x,C){var v=t([b,o,m],{declaredClass:"esri.dijit.TimeSlider",widgetsInTemplate:!0,templateString:x,intermediateChanges:!1,_slideDuration:1e3,_defaultCount:10,_eventMap:{"time-extent-change":!0,play:!0,pause:!0,next:!0,previous:!0},constructor:function(t,i){e.mixin(this,C.widgets.timeSlider),this._iconClass="tsButton tsPlayButton",this.playing=!1,this.loop=!1,this.thumbCount=1,this.thumbMovingRate=1e3,this._createTimeInstants=!1,this._options=e.mixin({excludeDataAtTrailingThumb:!1,excludeDataAtLeadingThumb:!1},t.options||{})},postCreate:function(){this.inherited(arguments)},startup:function(){this.inherited(arguments),this._timer=new c.Timer,this._timer.setInterval(this.thumbMovingRate),this._timer.onTick=e.hitch(this,"_bumpSlider",1),this._createSlider()},destroy:function(){this._timer.stop(),this._timer=null,this.timeStops=null,this._slider.destroy(),this._slider=null,this._hTicks&&(this._hTicks.destroyRecursive(),this._hTicks=null),this._hLabels&&(this._hLabels.destroyRecursive(),this._hLabels=null),this.inherited(arguments)},onTimeExtentChange:function(){},onPlay:function(){},onPause:function(){},onNext:function(){},onPrevious:function(){},_onHorizontalChange:function(){var t=this._sliderToTimeExtent();this.onTimeExtentChange(t)},_onPlay:function(){this.playing=!this.playing,this._updateUI(),this.playing?(this._timer.start(),this.onPlay(this._sliderToTimeExtent())):(this._timer.stop(),this.onPause(this._sliderToTimeExtent()));var t=this._getSliderValue();this._offset=e.isArray(t)?t[1]-t[0]:0},_onNext:function(){this.playing||(this._bumpSlider(1),this.onNext(this._sliderToTimeExtent()))},_onPrev:function(){this.playing||(this._bumpSlider(-1),this.onPrevious(this._sliderToTimeExtent()))},createTimeStopsByCount:function(t,e){if(!t||!t.startTime||!t.endTime)return void console.log(this.NLS_invalidTimeExtent);e=e||this._defaultCount;var i=Math.ceil((t.endTime-t.startTime)/(e-1));this.createTimeStopsByTimeInterval(t,i,"esriTimeUnitsMilliseconds")},createTimeStopsByTimeInterval:function(t,e,i,s){if(!t||!t.startTime||!t.endTime)return void console.log(this.NLS_invalidTimeExtent);this.fullTimeExtent=new p(t.startTime,t.endTime),s&&!0===s.resetStartTime&&this._resetStartTime(this.fullTimeExtent,i),this._timeIntervalUnits=i;for(var n=this.fullTimeExtent.startTime,r=[];n<=t.endTime;)r.push(n),n=t._getOffsettedDate(n,e,i);r.length>0&&r[r.length-1]<t.endTime&&r.push(n),this.setTimeStops(r)},getCurrentTimeExtent:function(){return this._sliderToTimeExtent()},setTimeStops:function(t){this.timeStops=t||[],this._numStops=this.timeStops.length,this._numTicks=this._numStops,!1===f.isDefined(this.fullTimeExtent)&&(this.fullTimeExtent=new p(t[0],t[t.length-1]))},setLoop:function(t){this.loop=t},setThumbCount:function(t){this.thumbCount=t,this.singleThumbAsTimeInstant(this._createTimeInstants),this._slider&&this._createSlider()},setThumbIndexes:function(t){this.thumbIndexes=e.clone(t)||[0,1],this._initializeThumbs()},setThumbMovingRate:function(t){this.thumbMovingRate=t,this._timer&&this._timer.setInterval(this.thumbMovingRate)},setLabels:function(t){this.labels=t,this._slider&&this._createSlider()},setTickCount:function(t){this._numTicks=t,this._slider&&this._createSlider()},singleThumbAsTimeInstant:function(t){this._createTimeInstants=t&&1===this.thumbCount},next:function(){this._onNext()},pause:function(){this.playing=!1,this._updateUI(),this._timer.stop()},play:function(){!0!==this.playing&&(this.playing=!1,this._onPlay())},previous:function(){this._onPrev()},_setIntermediateChangesAttr:function(t){this.intermediateChanges=!!t,this._slider&&this._slider.set("intermediateChanges",!!t)},_updateUI:function(){r.remove(this.playPauseBtn.iconNode,this._iconClass),this._iconClass=this.playing?"tsButton tsPauseButton":"tsButton tsPlayButton",r.add(this.playPauseBtn.iconNode,this._iconClass),this.previousBtn.set("disabled",this.playing),this.nextBtn.set("disabled",this.playing)},_createSlider:function(){this._slider&&(this._slider.destroy(),this._slider=null);for(var t=this.domNode;t.parentNode&&!t.dir;)t=t.parentNode;var n={onChange:e.hitch(this,"_onHorizontalChange"),showButtons:!1,discreteValues:this._numStops,slideDuration:this._slideDuration,class:"ts",dir:"ltr",intermediateChanges:this.intermediateChanges};this._ts=h.create("div",{},s.query(".tsTmp",this.domNode)[0],"first"),this._timeSliderTicks=h.create("div",{},this._ts,"first"),this._timeSliderLabels=h.create("div",{},this._ts),2===this.thumbCount?this._createRangeSlider(n):this._createSingleSlider(n),this.thumbIndexes=this.thumbIndexes||[0,1],this._createHorizRule(),this._createLabels(),!0===this._createTimeInstants&&s.query(".dijitSliderProgressBarH, .dijitSliderLeftBumper, .dijitSliderRightBumper",this._ts).forEach(function(t){a.set(t,{background:"none"})}),this._initializeThumbs(),i.disconnect(this._onChangeConnect),this._onChangeConnect=i.connect(this._slider,"onChange",e.hitch(this,"_updateThumbIndexes"))},_createRangeSlider:function(e){this._isRangeSlider=!0;var i=t([u,T],{templateString:g});this._slider=new i(e,this._ts)},_createSingleSlider:function(t){this._isRangeSlider=!1,this._slider=new u(t,this._ts)},_createHorizRule:function(){this._hTicks&&(this._hTicks.destroyRecursive(),this._hTicks=null),this._numTicks<2||(this._hTicks=new d({container:"topDecoration",ruleStyle:"",class:"tsTicks",count:this._numTicks},this._timeSliderTicks))},_createLabels:function(){this._hLabels&&(this._hLabels.destroyRecursive(),this._hLabels=null),this.labels&&this.labels.length>0&&(this._hLabels=new _({labels:this.labels,labelStyle:"",class:"tsLabels"},this._timeSliderLabels))},_initializeThumbs:function(){if(this._slider){this._offset=this._toSliderValue(this.thumbIndexes[1])||0;var t=this._toSliderValue(this.thumbIndexes[0]);if(t=t>this._slider.maximum||t<this._slider.minimum?this._slider.minimum:t,!0===this._isRangeSlider){var e=this._toSliderValue(this.thumbIndexes[1]);e=e>this._slider.maximum||e<this._slider.minimum?this._slider.maximum:e,e=e<t?t:e,this._setSliderValue([t,e])}else this._setSliderValue(t);this._onHorizontalChange()}},_bumpSlider:function(t){var i=this._getSliderValue(),s=i,n=s,r=t;if(e.isArray(i)&&(n=i[0],s=i[1],r=[{change:t,useMaxValue:!0},{change:t,useMaxValue:!1}]),Math.abs(n-this._slider.minimum)<1e-10&&t<0||Math.abs(s-this._slider.maximum)<1e-10&&t>0){if(this._timer.isRunning)if(this.loop){this._timer.stop(),this._setSliderValue(this._getSliderMinValue());var h=this._sliderToTimeExtent();this.onTimeExtentChange(h),this._timer.start(),this.playing=!0}else this.pause()}else this._slider._bumpValue(r)},_updateThumbIndexes:function(){var t=this._getSliderValue();e.isArray(t)?(this.thumbIndexes[0]=this._toSliderIndex(t[0]),this.thumbIndexes[1]=this._toSliderIndex(t[1])):this.thumbIndexes[0]=this._toSliderIndex(t)},_sliderToTimeExtent:function(){if(this.timeStops&&0!==this.timeStops.length){var t,i,s=new p,n=this._getSliderValue();return e.isArray(n)?(n[0]>n[1]?(i=n[0],t=n[1]):(t=n[0],i=n[1]),s.startTime=new Date(this.timeStops[this._toSliderIndex(t)]),s.endTime=new Date(this.timeStops[this._toSliderIndex(i)]),this._adjustTimeExtent(s)):(s.startTime=!0===this._createTimeInstants?new Date(this.timeStops[this._toSliderIndex(n)]):new Date(this.fullTimeExtent.startTime),s.endTime=!0===this._createTimeInstants?s.startTime:new Date(this.timeStops[this._toSliderIndex(n)])),s}},_adjustTimeExtent:function(t){if((!1!==this._options.excludeDataAtTrailingThumb||!1!==this._options.excludeDataAtLeadingThumb)&&t.startTime.getTime()!==t.endTime.getTime()){if(this._options.excludeDataAtTrailingThumb){var e=t.startTime;e.setUTCSeconds(e.getUTCSeconds()+1)}if(this._options.excludeDataAtLeadingThumb){var i=t.endTime;i.setUTCSeconds(i.getUTCSeconds()-1)}}},_resetStartTime:function(t,e){switch(e){case"esriTimeUnitsSeconds":t.startTime.setUTCMilliseconds(0);break;case"esriTimeUnitsMinutes":t.startTime.setUTCSeconds(0,0,0);break;case"esriTimeUnitsHours":t.startTime.setUTCMinutes(0,0,0);break;case"esriTimeUnitsDays":t.startTime.setUTCHours(0,0,0,0);break;case"esriTimeUnitsWeeks":t.startTime.setUTCDate(t.startTime.getUTCDate()-t.startTime.getUTCDay());break;case"esriTimeUnitsMonths":t.startTime.setUTCDate(1),t.startTime.setUTCHours(0,0,0,0);break;case"esriTimeUnitsDecades":t.startTime.setUTCFullYear(t.startTime.getUTCFullYear()-t.startTime.getUTCFullYear()%10);break;case"esriTimeUnitsCenturies":t.startTime.setUTCFullYear(t.startTime.getUTCFullYear()-t.startTime.getUTCFullYear()%100)}},_getSliderMinValue:function(){return this._isRangeSlider?[this._slider.minimum,this._slider.minimum+this._offset]:this._slider.minimum},_toSliderIndex:function(t){var e=Math.floor((t-this._slider.minimum)*this._numStops/(this._slider.maximum-this._slider.minimum));return e<0&&(e=0),e>=this._numStops&&(e=this._numStops-1),e},_toSliderValue:function(t){return t*(this._slider.maximum-this._slider.minimum)/(this._numStops-1)+this._slider.minimum},_getSliderValue:function(){return this._slider.get("value")},_setSliderValue:function(t){this._slider._setValueAttr(t,!1,!1)}});return n("extend-esri")&&e.setObject("dijit.TimeSlider",v,S),v});