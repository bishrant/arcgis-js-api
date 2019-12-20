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

define(["../../../kernel","../../../lang","dijit/registry","dijit/form/Select","dijit/form/ValidationTextBox","dijit/_WidgetBase","dijit/_TemplatedMixin","dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/dom-style","dojo/dom-construct","dojo/has","dojo/on","dojo/Evented","dojo/i18n!../../../nls/jsapi","dojo/i18n!../nls/AddMergingAttributes"],function(e,t,i,s,r,n,l,a,o,d,h,c,u,p,m,g,y){var v=o([n,l,m],{declaredClass:"esri.dijit.analysis.components.AddMergingAttributes",mergeLayer:null,inputLayer:null,restDelimiter:" ",summaryFields:[],showGeoAnalyticsParams:null,allowStringType:!0,allowDateType:!0,emptyValue:"",i18n:g.common,rows:[],includedFields:{},totalFieldsCount:0,trueCount:0,triggerChange:!0,inputLayerFields:{},removeAllBool:!1,inputSelectTdWidth:"85%",removeTdWidth:"2%",allowedTypes:{esriFieldTypeSmallInteger:"number",esriFieldTypeInteger:"number",esriFieldTypeSingle:"number",esriFieldTypeDouble:"number",esriFieldTypeString:"string",esriFieldTypeDate:"date"},constructor:function(e){!0===e.addAsRow?this.templateString="<tr data-dojo-attach-point='_emptyMergeFieldsRow'><td colspan='3' class='clear'></td></tr>":this.templateString="<table class='fullSpread'><tr data-dojo-attach-point='_emptyMergeFieldsRow'><td colspan='3' class='clear'></tr></table>"},postMixInProperties:function(){this.inherited(arguments),d.mixin(this.i18n,y)},postCreate:function(){this.inherited(arguments)},destroy:function(){this.inherited(arguments)},_createRow:function(){var e,t,i,s,r,n,l,a,o;return!(!this.inputLayer||!this.mergeLayer)&&(e=c.create("tr",null,this._emptyMergeFieldsRow,"before"),t=c.create("td",{style:{width:this.inputSelectTdWidth},colspan:2},e),i=c.create("td",{class:"removeTd",style:{width:this.removeTdWidth,maxWidth:"12px",paddingLeft:"0.35em"}},e),s=this._createAttrSelect(t),r=this._createStatsSelect(t),n=this._createAttrRenameBox(t),l=this._createAttrMatchSelect(t),a=this._createRemoveIcon(i,e),o={attrSelect:s,statsSelect:r,attrRenameBox:n,attrMatchSelect:l,removeIcon:a},this._linkChildComponents(o,e),this.rows.push(e),!0)},_createAttrSelect:function(e){var t,i,r;return t=new s({maxHeight:200,class:"esriLeadingMargin1 mediumInput attrSelect esriTrailingMargin05",style:{overflowX:"hidden",tableLayout:"fixed",display:"inline-block",width:"29%"}},c.create("select",null,e)),i=this._getFilteredAttrOptions(this.emptyValue),t.addOption(i),r=t.watch("value",this._handleAttrSelectUpdate),this.own(r),t},_createStatsSelect:function(e){var t,i;return t=new s({maxHeight:200,class:"mediumInput statsSelect esriTrailingMargin05",style:{overflowX:"hidden",tableLayout:"fixed",display:"inline-block",width:"28.5%"}},c.create("select",null,e)),i=t.on("change",this._handleStatsValueChange),this.own(i),this._addOperationOptions({selectWidget:t,emptyValue:this.emptyValue}),t},_createAttrRenameBox:function(e){return new r({maxHeight:200,class:"attrSelect",style:{overflow:"hidden",tableLayout:"fixed",display:"none",width:"29%"}},c.create("validationtextbox",null,e))},_createAttrMatchSelect:function(e){var t;return t=new s({maxHeight:200,class:"mediumInput attrSelect",style:{overflowX:"hidden",tableLayout:"fixed",display:"none",width:"29%"}},c.create("select",null,e)),this._addAttributeSelectOptions({selectWidget:t,layer:this.inputLayer,emptyValue:this.emptyValue}),t},_createRemoveIcon:function(e,t){var i,s;return i=c.create("a",{title:this.i18n.removeAttrStats,class:"closeIcon statsRemove",innerHTML:"<img src='"+require.toUrl("./images/close.gif")+"' border='0''/>",style:{visibility:"hidden"}},e),s=p(i,"click",d.hitch(this,this._remove,t)),this.own(s),i},_addAttributeSelectOptions:function(e){var t,i,s,r=[];if(r.push({value:e.emptyValue,label:this.i18n.attribute}),void 0!==e.layer&&""!==e.layer)for(t=0;t<e.layer.fields.length;t++)i=e.layer.fields[t],void 0!==this.allowedTypes[i.type]&&i.name!==e.layer.objectIdField&&(s=this.allowedTypes[i.type],r.push({value:i.name,label:i.alias&&""!==i.alias?i.alias:i.name,type:s}));return void 0!==e.selectWidget&&(e.selectWidget.options=[],e.selectWidget.addOption(r),e.selectWidget.set("value",e.emptyValue)),r},_addOperationOptions:function(e){var i=e.selectWidget,s=[{value:"Rename",label:this.i18n.rename},{value:"Remove",label:this.i18n.remove},{value:"Match",label:this.i18n.match}],r=t.isDefined(e.emptyValue)?e.emptyValue:"0";i.addOption({value:r,label:this.i18n.operation}),i.addOption(s),i.set("value",r)},_linkChildComponents:function(e,t){var i;for(i in e)e[i].childComponents=e,e[i].referenceWidget=this;t.childComponents=e,this._currentChildComponents=e},_getMergingAttributesAttr:function(){var e,t,i,s,r,n,l,a=[];for(e=0;e<this.rows.length;e++)t=this.rows[e].childComponents,i=t.attrSelect,s=t.statsSelect,n=t.attrRenameBox,r=t.attrMatchSelect,""!==i.get("value")&&""!==s.get("value")&&(l=i.get("value")+this.restDelimiter+s.get("value"),"Remove"===s.get("value")?a.push(l):"Rename"===s.get("value")?a.push(l+this.restDelimiter+n.get("value")):"Match"===s.get("value")&&a.push(l+this.restDelimiter+r.get("value")));return this.showGeoAnalyticsParams?this._stringToGax(a):a},loadOptions:function(e){var t,i,s;for(this._resetOptions(),this.triggerChange=!1,t=0;t<e.length;t++)i=e[t],"string"==typeof i&&(s=i.split(" ")),this._currentChildComponents.attrSelect.set("value",s?s[0]:i.mergeLayerField),this._currentChildComponents.statsSelect.set("value",s?s[1]:i.mergeType,!1),this._currentChildComponents.attrSelect.set("required",!0),this._currentChildComponents.statsSelect.set("required",!0),s&&"Rename"===s[1]||"Rename"===i.mergeType?(this._currentChildComponents.attrRenameBox.set("value",s?s[2]:i.mergeValue),this._currentChildComponents.attrRenameBox.domNode.style.display="inline-block",this._currentChildComponents.attrRenameBox.set("required",!0)):(s&&"Match"===s[1]||"Match"===i.mergeType)&&(this._updateAttrMatchSelectOptions(this._currentChildComponents.attrSelect,this._currentChildComponents.attrMatchSelect),this._currentChildComponents.attrMatchSelect.set("value",s?s[2]:i.mergeValue,!1),this._currentChildComponents.attrMatchSelect.domNode.style.display="inline-block",this._currentChildComponents.attrMatchSelect.set("required",!0)),this.includedFields[s?s[0]:i.mergeLayerField].included=!0,this.trueCount=this.trueCount+1,this._appendRow();this._updateAttrSelectOptions(),this.triggerChange=!0},_stringToGax:function(e){var t,i,s;for(t=0;t<e.length;t++)i=e[t].split(this.restDelimiter),s={},s.mergeLayerField=i[0],s.mergeType=i[1],3===i.length&&(s.mergeValue=i[2]),e[t]=s;return e},_handleAttrSelectUpdate:function(e,t,i){var s,r,n;s=this.get("childComponents").statsSelect,r=this.get("childComponents").attrMatchSelect,n=this.get("referenceWidget"),!1!==n.triggerChange&&(""!==t&&n._refreshOptions(t,!1),n._refreshOptions(i,!0),""!==i?s.set("required",!0):s.set("required",!1),""!==i&&""!==s.get("value")&&("Match"===s.get("value")&&n._updateAttrMatchSelectOptions(this,r),n._appendRow()))},_handleStatsValueChange:function(e){var t,i,s,r;i=this.get("childComponents").attrSelect,s=i.get("childComponents").attrMatchSelect,r=i.get("childComponents").attrRenameBox,t=this.get("referenceWidget"),"Rename"===e?(r.domNode.style.display="inline-block",s.domNode.style.display="none",r.set("required",!0),s.set("required",!1)):"Remove"===e||""===e?(r.domNode.style.display="none",s.domNode.style.display="none",r.set("required",!1),s.set("required",!1)):"Match"===e&&(s.domNode.style.display="inline-block",r.domNode.style.display="none",r.set("required",!1),s.set("required",!0)),""!==e?i.set("required",!0):i.set("required",!1),""!==i.get("value")&&""!==e&&("Match"===this.get("value")&&t._updateAttrMatchSelectOptions(i,s),t._appendRow())},_appendRow:function(){this.trueCount<this.totalFieldsCount&&!this._hasUnassignedRow()&&(h.set(this._currentChildComponents.removeIcon,"visibility","visible"),this._createRow())},_setMergeLayerAttr:function(e){this.mergeLayer=e,this.includedFields=this._createFieldsDictionary(this.mergeLayer,!0),this._refreshTotalFieldsCount(),this.mergeLayer?this._resetOptions():this._removeAll()},_setInputLayerAttr:function(e){this.inputLayer=e,this.inputLayerFields=this._createFieldsDictionary(this.inputLayer,!1),this.inputLayer?this._resetOptions():this._removeAll()},_refreshTotalFieldsCount:function(){var e,t;if(this.totalFieldsCount=0,void 0!==this.mergeLayer&&""!==this.mergeLayer)for(e=0;e<this.mergeLayer.fields.length;e++)t=this.mergeLayer.fields[e].type,void 0!==this.allowedTypes[t]&&(this.totalFieldsCount=this.totalFieldsCount+1)},_createFieldsDictionary:function(e,t){var i,s,r,n={},l=[];if(void 0!==e&&""!==e)for(l=this._addAttributeSelectOptions({layer:e,emptyValue:this.emptyValue}),i=0;i<l.length;i++)s=l[i].value,r=l[i],!0===t&&(r.included=!1),n[s]=r;return n},_resetOptions:function(){this._removeAll(),this._createRow()},_removeAll:function(){this.removeAllBool=!0,a.forEach(this.rows,this._remove,this),this.rows=[],this.trueCount=0,this.removeAllBool=!1},_remove:function(e){var t,i;t=this._destroyRow(e),this.removeAllBool||(i=this.rows.indexOf(e),this.rows.splice(i,1),this._refreshOptions(t,!1))},_destroyRow:function(e){var t=e.childComponents.attrSelect.get("value");return a.forEach(i.findWidgets(e),function(e,t){e.destroyRecursive()},this),c.destroy(e),t},_refreshOptions:function(e,t){this._toggleIsIncluded(e,t),this._updateAttrSelectOptions()},_toggleIsIncluded:function(e,t){var i;e!==this.emptyValue&&(i=this.includedFields[e],!0===t&&!0!==i.included?(this.trueCount=this.trueCount+1,i.included=t):!1===t&&!1!==i.included&&(this.trueCount=this.trueCount-1,i.included=t))},_updateAttrSelectOptions:function(){var e,t,i,s;for(e=0;e<this.rows.length;e++)t=this.rows[e].childComponents.attrSelect,i=t.get("value"),t.options=[],s=this._getFilteredAttrOptions(i),t.addOption(s)},_getFilteredAttrOptions:function(e){var t,i,s=[];for(t in this.includedFields)i=d.clone(this.includedFields[t]),t===e?(i.selected=!0,s.push(i)):!1!==i.included&&t!==this.emptyValue||s.push(i);return s},_updateAttrMatchSelectOptions:function(e,t){var i,s,r=e.get("value"),n=this.includedFields[r].type,l=[];t.options=[];for(i in this.inputLayerFields)s=d.clone(this.inputLayerFields[i]),s.type!==n&&s.value!==this.emptyValue||l.push(s);t.addOption(l)},_hasUnassignedRow:function(){return a.some(this.rows,function(e){var t,i,s;return t=e.childComponents,i=t.attrSelect,s=t.statsSelect,""===i.get("value")||""===s.get("value")})}});return u("extend-esri")&&d.setObject("dijit.analysis.components.AddMergingAttributes",v,e),v});