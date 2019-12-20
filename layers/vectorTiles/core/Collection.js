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

define(["require","exports","./tsSupport/declareExtendsHelper","./tsSupport/decorateHelper","dojo/aspect","./Accessor","./ArrayPool","./Evented","./lang","./ObjectPool","./scheduling","./accessorSupport/decorators","./accessorSupport/ensureType"],function(e,t,i,r,n,s,o,h,a,l,c,f,p){function u(e){return!!e&&(e.isInstanceOf&&e.isInstanceOf(w))}function g(e){return e?u(e)?e.toArray():e.length?Array.prototype.slice.apply(e):[]:[]}function v(e){if(e&&e.length)return e[0]}function m(e,t,i,r){for(var n=Math.min(e.length-i,t.length-r),s=0;s<n&&e[i+s]===t[r+s];)s++;return s}function d(e,t,i,r){t&&t.forEach(function(t,n,s){e.push(t),d(e,i.call(r,t,n,s),i,r)})}var _=function(){function e(){this.target=null,this.cancellable=!1,this.defaultPrevented=!1}return e.prototype.preventDefault=function(){this.cancellable&&(this.defaultPrevented=!0)},e.prototype.reset=function(e){this.defaultPrevented=!1,this.item=e},e}(),y=function(){},C=new l(_,!0,function(e){e.item=null,e.target=null}),A=new Set,b=new Set,x=new Set,O=new Map,E=0,w=function(e){function t(t){var i=e.call(this,t)||this;return i._boundDispatch=i._dispatchColChange.bind(i),i._chgListeners=[],i._notifications=null,i._timer=null,i.length=0,i._items=[],Object.defineProperty(i,"uid",{value:E++}),i}return i(t,e),s=t,t.ofType=function(e){if(!e)return s;if(O.has(e))return O.get(e);var t;if("function"==typeof e)t=e.prototype.declaredClass;else if(e.base)t=e.base.prototype.declaredClass;else for(var i in e.typeMap){var r=e.typeMap[i].prototype.declaredClass;t?t+=" | "+r:t=r}var n=s.createSubclass({declaredClass:"esri.core.Collection<"+t+">"}),o={Type:e,ensureType:"function"==typeof e?p.ensureType(e):p.ensureOneOfType(e)};return Object.defineProperty(n.prototype,"itemType",{value:o}),O.set(e,n),n},t.prototype.normalizeCtorArgs=function(e){return e?Array.isArray(e)||u(e)?{items:e}:e:{}},Object.defineProperty(t.prototype,"items",{get:function(){return this._items},set:function(e){this._emitBeforeChanges()||(this._splice.apply(this,[0,this.length].concat(g(e))),this._emitAfterChanges())},enumerable:!0,configurable:!0}),t.prototype.on=function(e,t){var i;if(Array.isArray(e)?i=e:e.indexOf(",")>-1&&(i=e.split(/\s*,\s*/)),i){for(var r=[],s=0,o=i;s<o.length;s++){var h=o[s];r.push(this.on(h,t))}return r.remove=function(){for(var e=0;e<r.length;e++)r[e].remove()},r}if("change"===e){var a=this._chgListeners,l={removed:!1,callback:t};return a.push(l),this._notifications&&this._notifications.push({listeners:a.slice(),items:this._items.slice(),changes:[]}),{remove:function(){this.remove=y,l.removed=!0,a.splice(a.indexOf(l),1)}}}return n.after(this,"on"+e,t,!0)},t.prototype.hasEventListener=function(e){return"change"===e?this._chgListeners.length>0:this.inherited(arguments)},t.prototype.add=function(e,t){if(this._emitBeforeChanges())return this;var i=this.getNextIndex(t);return this._splice(i,0,e),this._emitAfterChanges(),this},t.prototype.addMany=function(e,t){if(void 0===t&&(t=this._items.length),!e||!e.length)return this;if(this._emitBeforeChanges())return this;var i=this.getNextIndex(t);return this._splice.apply(this,[i,0].concat(g(e))),this._emitAfterChanges(),this},t.prototype.removeAll=function(){if(!this.length||this._emitBeforeChanges())return[];var e=this._splice(0,this.length)||[];return this._emitAfterChanges(),e},t.prototype.clone=function(){return this._createNewInstance({items:this._items.map(a.clone)})},t.prototype.concat=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var i=e.map(g);return this._createNewInstance({items:(r=this._items).concat.apply(r,i)});var r},t.prototype.drain=function(e,t){if(this.length&&!this._emitBeforeChanges()){for(var i=this._splice(0,this.length),r=i.length,n=0;n<r;n++)e.call(t,i[n],n,i);this._emitAfterChanges()}},t.prototype.every=function(e,t){return this._items.every(e,t)},t.prototype.filter=function(e,t){var i;return i=2===arguments.length?this._items.filter(e,t):this._items.filter(e),this._createNewInstance({items:i})},t.prototype.find=function(e,t){if("function"!=typeof e)throw new TypeError(e+" is not a function");for(var i=this._items,r=i.length,n=0;n<r;n++){var s=i[n];if(e.call(t,s,n,i))return s}},t.prototype.findIndex=function(e,t){if("function"!=typeof e)throw new TypeError(e+" is not a function");for(var i=this._items,r=i.length,n=0;n<r;n++){var s=i[n];if(e.call(t,s,n,i))return n}return-1},t.prototype.flatten=function(e,t){var i=[];return d(i,this,e,t),new s(i)},t.prototype.forEach=function(e,t){for(var i=this._items,r=i.length,n=0;n<r;n++)e.call(t,i[n],n,i)},t.prototype.getItemAt=function(e){return this._items[e]},t.prototype.getNextIndex=function(e){var t=this.length;return e=null==e?t:e,e<0?e=0:e>t&&(e=t),e},t.prototype.includes=function(e,t){return void 0===t&&(t=0),!!arguments.length&&-1!==this._items.indexOf(e,t)},t.prototype.indexOf=function(e,t){return void 0===t&&(t=0),this._items.indexOf(e,t)},t.prototype.join=function(e){return void 0===e&&(e=","),this._items.join(e)},t.prototype.lastIndexOf=function(e,t){return void 0===t&&(t=this.length-1),this._items.lastIndexOf(e,t)},t.prototype.map=function(e,t){var i=this._items.map(e,t);return new s({items:i})},t.prototype.reorder=function(e,t){void 0===t&&(t=this.length-1);var i=this.indexOf(e);if(-1!==i){if(t<0?t=0:t>=this.length&&(t=this.length-1),i!==t){if(this._emitBeforeChanges())return e;this._splice(i,1),this._splice(t,0,e),this._emitAfterChanges()}return e}},t.prototype.pop=function(){if(this.length&&!this._emitBeforeChanges()){var e=v(this._splice(this.length-1,1));return this._emitAfterChanges(),e}},t.prototype.push=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return this._emitBeforeChanges()?this.length:(this._splice.apply(this,[this.length,0].concat(e)),this._emitAfterChanges(),this.length)},t.prototype.reduce=function(e,t){var i=this._items;return 2===arguments.length?i.reduce(e,t):i.reduce(e)},t.prototype.reduceRight=function(e,t){var i=this._items;return 2===arguments.length?i.reduceRight(e,t):i.reduceRight(e)},t.prototype.remove=function(e){return this.removeAt(this.indexOf(e))},t.prototype.removeAt=function(e){if(!(e<0||e>=this.length||this._emitBeforeChanges())){var t=v(this._splice(e,1));return this._emitAfterChanges(),t}},t.prototype.removeMany=function(e){if(!e||!e.length||this._emitBeforeChanges())return[];for(var t=u(e)?e.toArray():e,i=this._items,r=[],n=t.length,s=0;s<n;s++){var o=t[s],h=i.indexOf(o);if(h>-1){var a=1+m(t,i,s+1,h+1),l=this._splice(h,a);l&&l.length>0&&r.push.apply(r,l),s+=a-1}}return this._emitAfterChanges(),r},t.prototype.reverse=function(){if(this._emitBeforeChanges())return this;var e=this._splice(0,this.length);return e&&(e.reverse(),this._splice.apply(this,[0,0].concat(e))),this._emitAfterChanges(),this},t.prototype.shift=function(){if(this.length&&!this._emitBeforeChanges()){var e=v(this._splice(0,1));return this._emitAfterChanges(),e}},t.prototype.slice=function(e,t){return void 0===e&&(e=0),void 0===t&&(t=this.length),this._createNewInstance({items:this._items.slice(e,t)})},t.prototype.some=function(e,t){return this._items.some(e,t)},t.prototype.sort=function(e){if(!this.length||this._emitBeforeChanges())return this;var t=this._splice(0,this.length);return arguments.length?t.sort(e):t.sort(),this._splice.apply(this,[0,0].concat(t)),this},t.prototype.splice=function(e,t){for(var i=[],r=2;r<arguments.length;r++)i[r-2]=arguments[r];if(this._emitBeforeChanges())return[];var n=this._splice.apply(this,[e,t].concat(i))||[];return this._emitAfterChanges(),n},t.prototype.toArray=function(){return this._items.slice()},t.prototype.toJSON=function(){return this.toArray()},t.prototype.toLocaleString=function(){return this._items.toLocaleString()},t.prototype.toString=function(){return this._items.toString()},t.prototype.unshift=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return this._emitBeforeChanges()?this.length:(this._splice.apply(this,[0,0].concat(e)),this._emitAfterChanges(),this.length)},t.prototype._createNewInstance=function(e){return new this.constructor(e)},t.prototype._splice=function(e,t){for(var i=[],r=2;r<arguments.length;r++)i[r-2]=arguments[r];var n,s,o=this._items,h=this.constructor.prototype.itemType;if(!this._notifications&&this.hasEventListener("change")&&(this._notifications=[{listeners:this._chgListeners.slice(),items:this._items.slice(),changes:[]}],this._timer&&this._timer.remove(),this._timer=c.schedule(this._boundDispatch)),t){if(s=o.splice(e,t),this.hasEventListener("before-remove")){var a=C.acquire();a.target=this,a.cancellable=!0;for(var l=0,f=s.length;l<f;l++)n=s[l],a.reset(n),this.emit("before-remove",a),a.defaultPrevented&&(s.splice(l,1),o.splice(e,0,n),e+=1,l-=1,f-=1);C.release(a)}if(this.length=this._items.length,this.hasEventListener("after-remove")){var p=C.acquire();p.target=this,p.cancellable=!1;for(var f=s.length,l=0;l<f;l++)p.reset(s[l]),this.emit("after-remove",p);C.release(p)}}if(i&&i.length){if(h){for(var u=[],g=0,v=i;g<v.length;g++){var m=v[g],d=h.ensureType(m);null==d&&null!=m||u.push(d)}i=u}var _=this.hasEventListener("before-add"),y=this.hasEventListener("after-add"),A=e===this.length;if(_||y){var b=C.acquire();b.target=this,b.cancellable=!0;var x=C.acquire();x.target=this,x.cancellable=!1;for(var O=0,E=i;O<E.length;O++){var w=E[O];_?(b.reset(w),this.emit("before-add",b),b.defaultPrevented||(A?o.push(w):o.splice(e++,0,w),this._set("length",o.length),y&&(x.reset(w),this.emit("after-add",x)))):(A?o.push(w):o.splice(e++,0,w),this._set("length",o.length),x.reset(w),this.emit("after-add",x))}C.release(b)}else A?o.push.apply(o,i):o.splice.apply(o,[e,0].concat(i)),this._set("length",o.length)}return(i&&i.length||s&&s.length)&&this._notifyChangeEvent(i,s),s},t.prototype._emitBeforeChanges=function(){var e=!1;if(this.hasEventListener("before-changes")){var t=C.acquire();t.target=this,t.cancellable=!0,this.emit("before-changes",t),e=t.defaultPrevented,C.release(t)}return e},t.prototype._emitAfterChanges=function(){if(this.hasEventListener("after-changes")){var e=C.acquire();e.target=this,e.cancellable=!1,this.emit("after-changes",e),C.release(e)}},t.prototype._notifyChangeEvent=function(e,t){this.hasEventListener("change")&&this._notifications[this._notifications.length-1].changes.push({added:e,removed:t})},t.prototype._dispatchColChange=function(){if(this._timer&&(this._timer.remove(),this._timer=null),this._notifications){var e=this._notifications;this._notifications=null;for(var t=this,i=0,r=e;i<r.length;i++){var n=r[i];!function(e){var i=e.changes;A.clear(),b.clear(),x.clear();for(var r=0,n=i;r<n.length;r++){var s=n[r],h=s.added,a=s.removed;if(h)if(0===x.size&&0===b.size)for(var l=0,c=h;l<c.length;l++){var f=c[l];A.add(f)}else for(var p=0,u=h;p<u.length;p++){var f=u[p];b.has(f)?(x.add(f),b.delete(f)):x.has(f)||A.add(f)}if(a)if(0===x.size&&0===A.size)for(var g=0,v=a;g<v.length;g++){var f=v[g];b.add(f)}else for(var m=0,d=a;m<d.length;m++){var f=d[m];A.has(f)?A.delete(f):(x.delete(f),b.add(f))}}var _=o.acquire();A.forEach(function(e){_.push(e)});var y=o.acquire();b.forEach(function(e){y.push(e)});var C=t._items,O=e.items,E=o.acquire();if(x.forEach(function(e){O.indexOf(e)!==C.indexOf(e)&&E.push(e)}),e.listeners&&(_.length||y.length||E.length))for(var w={target:t,added:_,removed:y,moved:E},B=e.listeners,L=B.length,I=0;I<L;I++){var S=e.listeners[I];S.removed||S.callback.call(t,w)}o.release(_),o.release(y),o.release(E)}(n)}A.clear(),b.clear(),x.clear()}},t.isCollection=u,r([f.property()],t.prototype,"length",void 0),r([f.property()],t.prototype,"items",null),t=s=r([f.subclass("esri.core.Collection")],t);var s}(f.declared(s,h));return w});