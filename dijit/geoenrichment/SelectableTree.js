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
// See http://js.arcgis.com/3.25/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/Evented","dojo/store/util/QueryResults","dojo/store/util/SimpleQueryEngine"],function(t,e,i,n,s,r){return t(n,{idProperty:"id",bindingProperty:null,autoIdentify:!0,queryEngine:r,root:null,data:null,_hash:null,constructor:function(t,i){e.mixin(this,i),this.root={children:t||[]},e.mixin(this._provideBinding(this.root),{deepness:-1,selectCount:0,leafCount:0}),this._hash={},this.idProperty&&this.autoIdentify&&(this._autoId=1),this._initializeNode(this.root,0),this.data=this.root.children},_provideBinding:function(t){var e=this._getBinding(t);return e||(t[this.bindingProperty]=e={}),e},_getBinding:function(t){return this.bindingProperty?t[this.bindingProperty]:t},_initializeNode:function(t,e){var n=this._provideBinding(t);if(n.selected=!!n.selected,!t.children)return"number"!=typeof n.leafCount&&(n.leafCount=1),void(n.selectCount=n.selected?n.leafCount:0);n.selectCount=0,n.leafCount=0,i.forEach(t.children,function(i){this._registerNode(i);var s=this._provideBinding(i);s.parent=t,s.deepness=e,this._initializeNode(i,e+1),n.selectCount+=s.selectCount,n.leafCount+=s.leafCount},this),n.selectCount?n.selectCount==n.leafCount&&(n.selected=!0):n.selected=!1},isOwned:function(t,e){return!e&&t===this.root||this.get(this.getIdentity(t))===t},_registerNode:function(t){this._autoId&&void 0===t[this.idProperty]&&(t[this.idProperty]=this._autoId++),this.idProperty&&(this._hash[t[this.idProperty]]=t)},_unregisterNode:function(t){this.isOwned(t,!0)&&delete this._hash[t[this.idProperty]]},clear:function(){this.root.children.length&&(i.forEach(this.root.children,function(t){this._unbindNode(t)},this),this.data=this.root.children=[])},destroy:function(){this.clear()},_unbindNode:function(t){t.children&&i.forEach(t.children,function(t){delete this._getBinding(t).parent,this._unbindNode(t)},this),this._unregisterNode(t);var e=this._getBinding(t);e.parent&&(this._incrementCounts(e.parent,-e.selectCount,-e.leafCount),delete e.parent),e!==t&&delete t[this.bindingProperty]},removeNodes:function(t,e){i.forEach(t&&t.slice(),function(t){if(this.isOwned(t,!0)){var e=this._getBinding(t),n=e.parent,s=i.indexOf(n.children,t);s>=0&&n.children.splice(s,1),this._unbindNode(t)}},this),e||this.emit("updated")},addNodes:function(t,e,n){if(e){if(!this.isOwned(e)||!e.children)return!1}else e=this.root;var s=this._getBinding(e),r=s.deepness+1,o=0,d=0;return i.forEach(t,function(t){if(!this.isOwned(t)){e.children.push(t),this._registerNode(t);var i=this._provideBinding(t);i.parent=e,i.deepness=r,this._initializeNode(t,r+1),o+=i.selectCount,d+=i.leafCount}},this),this._incrementCounts(e,o,d),n||this.emit("updated"),!0},select:function(t,e){return this.changeSelect(t,!0,e)},deselect:function(t){this.changeSelect(t,!1)},changeSelect:function(t,e,n){n=n||this.root.leafCount;var s=t&&this._getBinding(t);if(s){e=!!e;var r=(e?s.leafCount:0)-s.selectCount,o=this.root.selectCount+r<=n;return t.children?(o&&(s.selected=e),i.forEach(t.children,function(t){this.changeSelect(t,e,n)},this),o):(o&&(s.selected=e,r&&this._incrementCounts(t,r)),o)}},_incrementCounts:function(t,e,i){var n=this._getBinding(t);n.selectCount+=e,i&&(n.leafCount+=i),n.selectCount?n.selectCount==n.leafCount&&(n.selected=!0):n.selected=!1,n.parent&&this._incrementCounts(n.parent,e,i)},getSelectionState:function(t){if(!this.isOwned(t))return!1;var e=this._getBinding(t);return e.selectCount&&e.selectCount!=e.leafCount?"mixed":e.selected=!!e.selectCount},getSelectedNodes:function(t){return this.getDescendingNodes(this.root,!0,t)},getDescendingNodes:function(t,e,i){if(!this.isOwned(t))return[];var n=[];return this._collectNodes(t.children,n,e,i),n},_collectNodes:function(t,e,n,s){i.forEach(t,function(t){var i=this._getBinding(t),r=null===n||void 0===n?i.leafCount:n?i.selectCount:i.leafCount-i.selectCount;r&&(!t.children||!s&&r==i.leafCount?e.push(t):this._collectNodes(t.children,e,n,s))},this)},inspectChildren:function(t,n,s,r){r&&(n=e.hitch(r,n)),t=t||this.root;var o=t.children;return o&&s&&(o=o.slice(),o.sort(s)),i.every(o,function(t){var e=n(t);return null!==e&&(!1===e||!t.children||this.inspectChildren(t,n,s))},this)},updateExpandedNodes:function(t,e){for(var i in this._hash){var n=this._hash[i];this.updateExpand(n,!!t[i])}this._updateOddEven(null,e)},updateExpand:function(t,e,i,n){if(t){var s=!1;if(t.children){var r=this._getBinding(t);r.expanded!==e&&(s=!0,r.expanded=e)}var o={};return s&&i&&this._updateOddEven(o,n),o}},_updateOddEven:function(t,e){var i=1;this.inspectChildren(null,function(e){i=1-i;var n=this._getBinding(e);return t&&n.isOdd!==i&&(t[this.getIdentity(e)]=i),n.isOdd=i,!(!e.children||!n.expanded)},e,this)},isOdd:function(t){var e=this._getBinding(t);return e&&e.isOdd},get:function(t){return this._hash[t]},getIdentity:function(t){return this.idProperty?t[this.idProperty]:null},query:function(t,e){return s(this.queryEngine(t,e)(this.data))},getChildren:function(t,e){var i=this.isOwned(t,!0)?t.children:null;return s(this.queryEngine({},e)(i||[]))},mayHaveChildren:function(t){return!!t.children}})});