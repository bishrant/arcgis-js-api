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

/**
   * @license
   * Copyright 2000, Silicon Graphics, Inc. All Rights Reserved.
   * Copyright 2015, Google Inc. All Rights Reserved.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to
   * deal in the Software without restriction, including without limitation the
   * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
   * sell copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice including the dates of first publication and
   * either this permission notice or a reference to http://oss.sgi.com/projects/FreeB/
   * shall be included in all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
   * SILICON GRAPHICS, INC. BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
   * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR
   * IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   *
   * Original Code. The Original Code is: OpenGL Sample Implementation,
   * Version 1.2.1, released January 26, 2000, developed by Silicon Graphics,
   * Inc. The Original Code is Copyright (c) 1991-2000 Silicon Graphics, Inc.
   * Copyright in any portions created by third parties is as indicated
   * elsewhere herein. All Rights Reserved.
   */

define([],function(){"use strict";var e={};return e.DEBUG=!1,e.assert=function(t,s){if(e.DEBUG&&!t)throw new Error("Assertion failed"+(s?": "+s:""))},e.GLU_TESS_MAX_COORD=1e150,e.TRUE_PROJECT=!1,e.GLU_TESS_DEFAULT_TOLERANCE=0,e.windingRule={GLU_TESS_WINDING_ODD:100130,GLU_TESS_WINDING_NONZERO:100131,GLU_TESS_WINDING_POSITIVE:100132,GLU_TESS_WINDING_NEGATIVE:100133,GLU_TESS_WINDING_ABS_GEQ_TWO:100134},e.primitiveType={GL_LINE_LOOP:2,GL_TRIANGLES:4,GL_TRIANGLE_STRIP:5,GL_TRIANGLE_FAN:6},e.errorType={GLU_TESS_MISSING_BEGIN_POLYGON:100151,GLU_TESS_MISSING_END_POLYGON:100153,GLU_TESS_MISSING_BEGIN_CONTOUR:100152,GLU_TESS_MISSING_END_CONTOUR:100154,GLU_TESS_COORD_TOO_LARGE:100155,GLU_TESS_NEED_COMBINE_CALLBACK:100156},e.gluEnum={GLU_TESS_BEGIN:100100,GLU_TESS_VERTEX:100101,GLU_TESS_END:100102,GLU_TESS_ERROR:100103,GLU_TESS_EDGE_FLAG:100104,GLU_TESS_COMBINE:100105,GLU_TESS_BEGIN_DATA:100106,GLU_TESS_VERTEX_DATA:100107,GLU_TESS_END_DATA:100108,GLU_TESS_ERROR_DATA:100109,GLU_TESS_EDGE_FLAG_DATA:100110,GLU_TESS_COMBINE_DATA:100111,GLU_TESS_MESH:100112,GLU_TESS_TOLERANCE:100142,GLU_TESS_WINDING_RULE:100140,GLU_TESS_BOUNDARY_ONLY:100141,GLU_INVALID_ENUM:100900,GLU_INVALID_VALUE:100901},e.PQHandle,e.geom={},e.geom.vertEq=function(e,t){return e.s===t.s&&e.t===t.t},e.geom.vertLeq=function(e,t){return e.s<t.s||e.s===t.s&&e.t<=t.t},e.geom.edgeEval=function(t,s,r){e.assert(e.geom.vertLeq(t,s)&&e.geom.vertLeq(s,r));var i=s.s-t.s,n=r.s-s.s;return i+n>0?i<n?s.t-t.t+(t.t-r.t)*(i/(i+n)):s.t-r.t+(r.t-t.t)*(n/(i+n)):0},e.geom.edgeSign=function(t,s,r){e.assert(e.geom.vertLeq(t,s)&&e.geom.vertLeq(s,r));var i=s.s-t.s,n=r.s-s.s;return i+n>0?(s.t-r.t)*i+(s.t-t.t)*n:0},e.geom.transLeq=function(e,t){return e.t<t.t||e.t===t.t&&e.s<=t.s},e.geom.transEval=function(t,s,r){e.assert(e.geom.transLeq(t,s)&&e.geom.transLeq(s,r));var i=s.t-t.t,n=r.t-s.t;return i+n>0?i<n?s.s-t.s+(t.s-r.s)*(i/(i+n)):s.s-r.s+(r.s-t.s)*(n/(i+n)):0},e.geom.transSign=function(t,s,r){e.assert(e.geom.transLeq(t,s)&&e.geom.transLeq(s,r));var i=s.t-t.t,n=r.t-s.t;return i+n>0?(s.s-r.s)*i+(s.s-t.s)*n:0},e.geom.edgeGoesLeft=function(t){return e.geom.vertLeq(t.dst(),t.org)},e.geom.edgeGoesRight=function(t){return e.geom.vertLeq(t.org,t.dst())},e.geom.vertL1dist=function(e,t){return Math.abs(e.s-t.s)+Math.abs(e.t-t.t)},e.geom.vertCCW=function(e,t,s){return e.s*(t.t-s.t)+t.s*(s.t-e.t)+s.s*(e.t-t.t)>=0},e.geom.interpolate_=function(e,t,s,r){return e=e<0?0:e,s=s<0?0:s,e<=s?0===s?(t+r)/2:t+e/(e+s)*(r-t):r+s/(e+s)*(t-r)},e.geom.edgeIntersect=function(t,s,r,i,n){var o,a,l;e.geom.vertLeq(t,s)||(l=t,t=s,s=l),e.geom.vertLeq(r,i)||(l=r,r=i,i=l),e.geom.vertLeq(t,r)||(l=t,t=r,r=l,l=s,s=i,i=l),e.geom.vertLeq(r,s)?e.geom.vertLeq(s,i)?(o=e.geom.edgeEval(t,r,s),a=e.geom.edgeEval(r,s,i),o+a<0&&(o=-o,a=-a),n.s=e.geom.interpolate_(o,r.s,a,s.s)):(o=e.geom.edgeSign(t,r,s),a=-e.geom.edgeSign(t,i,s),o+a<0&&(o=-o,a=-a),n.s=e.geom.interpolate_(o,r.s,a,i.s)):n.s=(r.s+s.s)/2,e.geom.transLeq(t,s)||(l=t,t=s,s=l),e.geom.transLeq(r,i)||(l=r,r=i,i=l),e.geom.transLeq(t,r)||(l=t,t=r,r=l,l=s,s=i,i=l),e.geom.transLeq(r,s)?e.geom.transLeq(s,i)?(o=e.geom.transEval(t,r,s),a=e.geom.transEval(r,s,i),o+a<0&&(o=-o,a=-a),n.t=e.geom.interpolate_(o,r.t,a,s.t)):(o=e.geom.transSign(t,r,s),a=-e.geom.transSign(t,i,s),o+a<0&&(o=-o,a=-a),n.t=e.geom.interpolate_(o,r.t,a,i.t)):n.t=(r.t+s.t)/2},e.mesh={},e.mesh.makeEdge=function(t){var s=e.mesh.makeEdgePair_(t.eHead);return e.mesh.makeVertex_(s,t.vHead),e.mesh.makeVertex_(s.sym,t.vHead),e.mesh.makeFace_(s,t.fHead),s},e.mesh.meshSplice=function(t,s){var r=!1,i=!1;t!==s&&(s.org!==t.org&&(i=!0,e.mesh.killVertex_(s.org,t.org)),s.lFace!==t.lFace&&(r=!0,e.mesh.killFace_(s.lFace,t.lFace)),e.mesh.splice_(s,t),i||(e.mesh.makeVertex_(s,t.org),t.org.anEdge=t),r||(e.mesh.makeFace_(s,t.lFace),t.lFace.anEdge=t))},e.mesh.deleteEdge=function(t){var s=t.sym,r=!1;t.lFace!==t.rFace()&&(r=!0,e.mesh.killFace_(t.lFace,t.rFace())),t.oNext===t?e.mesh.killVertex_(t.org,null):(t.rFace().anEdge=t.oPrev(),t.org.anEdge=t.oNext,e.mesh.splice_(t,t.oPrev()),r||e.mesh.makeFace_(t,t.lFace)),s.oNext===s?(e.mesh.killVertex_(s.org,null),e.mesh.killFace_(s.lFace,null)):(t.lFace.anEdge=s.oPrev(),s.org.anEdge=s.oNext,e.mesh.splice_(s,s.oPrev())),e.mesh.killEdge_(t)},e.mesh.addEdgeVertex=function(t){var s=e.mesh.makeEdgePair_(t),r=s.sym;return e.mesh.splice_(s,t.lNext),s.org=t.dst(),e.mesh.makeVertex_(r,s.org),s.lFace=r.lFace=t.lFace,s},e.mesh.splitEdge=function(t){var s=e.mesh.addEdgeVertex(t),r=s.sym;return e.mesh.splice_(t.sym,t.sym.oPrev()),e.mesh.splice_(t.sym,r),t.sym.org=r.org,r.dst().anEdge=r.sym,r.sym.lFace=t.rFace(),r.winding=t.winding,r.sym.winding=t.sym.winding,r},e.mesh.connect=function(t,s){var r=!1,i=e.mesh.makeEdgePair_(t),n=i.sym;return s.lFace!==t.lFace&&(r=!0,e.mesh.killFace_(s.lFace,t.lFace)),e.mesh.splice_(i,t.lNext),e.mesh.splice_(n,s),i.org=t.dst(),n.org=s.org,i.lFace=n.lFace=t.lFace,t.lFace.anEdge=n,r||e.mesh.makeFace_(i,t.lFace),i},e.mesh.zapFace=function(t){var s,r=t.anEdge,i=r.lNext;do{if(s=i,i=s.lNext,s.lFace=null,null===s.rFace()){s.oNext===s?e.mesh.killVertex_(s.org,null):(s.org.anEdge=s.oNext,e.mesh.splice_(s,s.oPrev()));var n=s.sym;n.oNext===n?e.mesh.killVertex_(n.org,null):(n.org.anEdge=n.oNext,e.mesh.splice_(n,n.oPrev())),e.mesh.killEdge_(s)}}while(s!==r);var o=t.prev,a=t.next;a.prev=o,o.next=a},e.mesh.meshUnion=function(e,t){var s=e.fHead,r=e.vHead,i=e.eHead,n=t.fHead,o=t.vHead,a=t.eHead;return n.next!==n&&(s.prev.next=n.next,n.next.prev=s.prev,n.prev.next=s,s.prev=n.prev),o.next!==o&&(r.prev.next=o.next,o.next.prev=r.prev,o.prev.next=r,r.prev=o.prev),a.next!==a&&(i.sym.next.sym.next=a.next,a.next.sym.next=i.sym.next,a.sym.next.sym.next=i,i.sym.next=a.sym.next),e},e.mesh.deleteMesh=function(e){},e.mesh.makeEdgePair_=function(t){var s=new e.GluHalfEdge,r=new e.GluHalfEdge,i=t.sym.next;return r.next=i,i.sym.next=s,s.next=t,t.sym.next=r,s.sym=r,s.oNext=s,s.lNext=r,r.sym=s,r.oNext=r,r.lNext=s,s},e.mesh.splice_=function(e,t){var s=e.oNext,r=t.oNext;s.sym.lNext=t,r.sym.lNext=e,e.oNext=r,t.oNext=s},e.mesh.makeVertex_=function(t,s){var r=s.prev,i=new e.GluVertex(s,r);r.next=i,s.prev=i,i.anEdge=t;var n=t;do{n.org=i,n=n.oNext}while(n!==t)},e.mesh.makeFace_=function(t,s){var r=s.prev,i=new e.GluFace(s,r);r.next=i,s.prev=i,i.anEdge=t,i.inside=s.inside;var n=t;do{n.lFace=i,n=n.lNext}while(n!==t)},e.mesh.killEdge_=function(e){var t=e.next,s=e.sym.next;t.sym.next=s,s.sym.next=t},e.mesh.killVertex_=function(e,t){var s=e.anEdge,r=s;do{r.org=t,r=r.oNext}while(r!==s);var i=e.prev,n=e.next;n.prev=i,i.next=n},e.mesh.killFace_=function(e,t){var s=e.anEdge,r=s;do{r.lFace=t,r=r.lNext}while(r!==s);var i=e.prev,n=e.next;n.prev=i,i.next=n},e.normal={},e.normal.S_UNIT_X_=1,e.normal.S_UNIT_Y_=0,e.normal.projectPolygon=function(t,s,r,i){var n=!1,o=[s,r,i];0===s&&0===r&&0===i&&(e.normal.computeNormal_(t,o),n=!0);var a,l=e.normal.longAxis_(o),_=t.mesh.vHead;if(e.TRUE_PROJECT){e.normal.normalize_(o);var g=[0,0,0],d=[0,0,0];g[l]=0,g[(l+1)%3]=e.normal.S_UNIT_X_,g[(l+2)%3]=e.normal.S_UNIT_Y_;var h=e.normal.dot_(g,o);for(g[0]-=h*o[0],g[1]-=h*o[1],g[2]-=h*o[2],e.normal.normalize_(g),d[0]=o[1]*g[2]-o[2]*g[1],d[1]=o[2]*g[0]-o[0]*g[2],d[2]=o[0]*g[1]-o[1]*g[0],e.normal.normalize_(d),a=_.next;a!==_;a=a.next)a.s=e.normal.dot_(a.coords,g),a.t=e.normal.dot_(a.coords,d)}else{var c=(l+1)%3,u=(l+2)%3,p=o[l]>0?1:-1;for(a=_.next;a!==_;a=a.next)a.s=a.coords[c],a.t=p*a.coords[u]}n&&e.normal.checkOrientation_(t)},e.normal.dot_=function(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]},e.normal.normalize_=function(t){var s=t[0]*t[0]+t[1]*t[1]+t[2]*t[2];e.assert(s>0),s=Math.sqrt(s),t[0]/=s,t[1]/=s,t[2]/=s},e.normal.longAxis_=function(e){var t=0;return Math.abs(e[1])>Math.abs(e[0])&&(t=1),Math.abs(e[2])>Math.abs(e[t])&&(t=2),t},e.normal.computeNormal_=function(t,s){var r,i=[-2*e.GLU_TESS_MAX_COORD,-2*e.GLU_TESS_MAX_COORD,-2*e.GLU_TESS_MAX_COORD],n=[2*e.GLU_TESS_MAX_COORD,2*e.GLU_TESS_MAX_COORD,2*e.GLU_TESS_MAX_COORD],o=[],a=[],l=t.mesh.vHead;for(r=l.next;r!==l;r=r.next)for(var _=0;_<3;++_){var g=r.coords[_];g<n[_]&&(n[_]=g,a[_]=r),g>i[_]&&(i[_]=g,o[_]=r)}var d=0;if(i[1]-n[1]>i[0]-n[0]&&(d=1),i[2]-n[2]>i[d]-n[d]&&(d=2),n[d]>=i[d])return s[0]=0,s[1]=0,void(s[2]=1);var h=0,c=a[d],u=o[d],p=[0,0,0],m=[c.coords[0]-u.coords[0],c.coords[1]-u.coords[1],c.coords[2]-u.coords[2]],E=[0,0,0];for(r=l.next;r!==l;r=r.next){E[0]=r.coords[0]-u.coords[0],E[1]=r.coords[1]-u.coords[1],E[2]=r.coords[2]-u.coords[2],p[0]=m[1]*E[2]-m[2]*E[1],p[1]=m[2]*E[0]-m[0]*E[2],p[2]=m[0]*E[1]-m[1]*E[0];var v=p[0]*p[0]+p[1]*p[1]+p[2]*p[2];v>h&&(h=v,s[0]=p[0],s[1]=p[1],s[2]=p[2])}h<=0&&(s[0]=s[1]=s[2]=0,s[e.normal.longAxis_(m)]=1)},e.normal.checkOrientation_=function(e){for(var t=0,s=e.mesh.fHead,r=s.next;r!==s;r=r.next){var i=r.anEdge;if(!(i.winding<=0))do{t+=(i.org.s-i.dst().s)*(i.org.t+i.dst().t),i=i.lNext}while(i!==r.anEdge)}if(t<0)for(var n=e.mesh.vHead,o=n.next;o!==n;o=o.next)o.t=-o.t},e.render={},e.render.renderMesh=function(t,s,r){for(var i=!1,n=-1,o=s.fHead.prev;o!==s.fHead;o=o.prev)if(o.inside){i||(t.callBeginCallback(e.primitiveType.GL_TRIANGLES),i=!0);var a=o.anEdge;e.assert(a.lNext.lNext.lNext===a,"renderMesh called with non-triangulated mesh");do{if(r){var l=a.rFace().inside?0:1;n!==l&&(n=l,t.callEdgeFlagCallback(!!n))}t.callVertexCallback(a.org.data),a=a.lNext}while(a!==o.anEdge)}i&&t.callEndCallback()},e.render.renderBoundary=function(t,s){for(var r=s.fHead.next;r!==s.fHead;r=r.next)if(r.inside){t.callBeginCallback(e.primitiveType.GL_LINE_LOOP);var i=r.anEdge;do{t.callVertexCallback(i.org.data),i=i.lNext}while(i!==r.anEdge);t.callEndCallback()}},e.sweep={},e.sweep.SENTINEL_COORD_=4*e.GLU_TESS_MAX_COORD,e.sweep.TOLERANCE_NONZERO_=!1,e.sweep.computeInterior=function(t){t.fatalError=!1,e.sweep.removeDegenerateEdges_(t),e.sweep.initPriorityQ_(t),e.sweep.initEdgeDict_(t);for(var s;null!==(s=t.pq.extractMin());){for(;;){var r=t.pq.minimum();if(null===r||!e.geom.vertEq(r,s))break;r=t.pq.extractMin(),e.sweep.spliceMergeVertices_(t,s.anEdge,r.anEdge)}e.sweep.sweepEvent_(t,s)}var i=t.dict.getMin().getKey();t.event=i.eUp.org,e.sweep.doneEdgeDict_(t),e.sweep.donePriorityQ_(t),e.sweep.removeDegenerateFaces_(t.mesh),t.mesh.checkMesh()},e.sweep.addWinding_=function(e,t){e.winding+=t.winding,e.sym.winding+=t.sym.winding},e.sweep.edgeLeq_=function(t,s,r){var i=t.event,n=s.eUp,o=r.eUp;return n.dst()===i?o.dst()===i?e.geom.vertLeq(n.org,o.org)?e.geom.edgeSign(o.dst(),n.org,o.org)<=0:e.geom.edgeSign(n.dst(),o.org,n.org)>=0:e.geom.edgeSign(o.dst(),i,o.org)<=0:o.dst()===i?e.geom.edgeSign(n.dst(),i,n.org)>=0:e.geom.edgeEval(n.dst(),i,n.org)>=e.geom.edgeEval(o.dst(),i,o.org)},e.sweep.deleteRegion_=function(t,s){s.fixUpperEdge&&e.assert(0===s.eUp.winding),s.eUp.activeRegion=null,t.dict.deleteNode(s.nodeUp),s.nodeUp=null},e.sweep.fixUpperEdge_=function(t,s){e.assert(t.fixUpperEdge),e.mesh.deleteEdge(t.eUp),t.fixUpperEdge=!1,t.eUp=s,s.activeRegion=t},e.sweep.topLeftRegion_=function(t){var s=t.eUp.org;do{t=t.regionAbove()}while(t.eUp.org===s);if(t.fixUpperEdge){var r=e.mesh.connect(t.regionBelow().eUp.sym,t.eUp.lNext);e.sweep.fixUpperEdge_(t,r),t=t.regionAbove()}return t},e.sweep.topRightRegion_=function(e){var t=e.eUp.dst();do{e=e.regionAbove()}while(e.eUp.dst()===t);return e},e.sweep.addRegionBelow_=function(t,s,r){var i=new e.ActiveRegion;return i.eUp=r,i.nodeUp=t.dict.insertBefore(s.nodeUp,i),r.activeRegion=i,i},e.sweep.isWindingInside_=function(t,s){switch(t.windingRule){case e.windingRule.GLU_TESS_WINDING_ODD:return 0!=(1&s);case e.windingRule.GLU_TESS_WINDING_NONZERO:return 0!==s;case e.windingRule.GLU_TESS_WINDING_POSITIVE:return s>0;case e.windingRule.GLU_TESS_WINDING_NEGATIVE:return s<0;case e.windingRule.GLU_TESS_WINDING_ABS_GEQ_TWO:return s>=2||s<=-2}return e.assert(!1),!1},e.sweep.computeWinding_=function(t,s){s.windingNumber=s.regionAbove().windingNumber+s.eUp.winding,s.inside=e.sweep.isWindingInside_(t,s.windingNumber)},e.sweep.finishRegion_=function(t,s){var r=s.eUp,i=r.lFace;i.inside=s.inside,i.anEdge=r,e.sweep.deleteRegion_(t,s)},e.sweep.finishLeftRegions_=function(t,s,r){for(var i=s,n=s.eUp;i!==r;){i.fixUpperEdge=!1;var o=i.regionBelow(),a=o.eUp;if(a.org!==n.org){if(!o.fixUpperEdge){e.sweep.finishRegion_(t,i);break}a=e.mesh.connect(n.lPrev(),a.sym),e.sweep.fixUpperEdge_(o,a)}n.oNext!==a&&(e.mesh.meshSplice(a.oPrev(),a),e.mesh.meshSplice(n,a)),e.sweep.finishRegion_(t,i),n=o.eUp,i=o}return n},e.sweep.addRightEdges_=function(t,s,r,i,n,o){var a=!0,l=r;do{e.assert(e.geom.vertLeq(l.org,l.dst())),e.sweep.addRegionBelow_(t,s,l.sym),l=l.oNext}while(l!==i);null===n&&(n=s.regionBelow().eUp.rPrev());for(var _,g=s,d=n;_=g.regionBelow(),l=_.eUp.sym,l.org===d.org;)l.oNext!==d&&(e.mesh.meshSplice(l.oPrev(),l),e.mesh.meshSplice(d.oPrev(),l)),_.windingNumber=g.windingNumber-l.winding,_.inside=e.sweep.isWindingInside_(t,_.windingNumber),g.dirty=!0,!a&&e.sweep.checkForRightSplice_(t,g)&&(e.sweep.addWinding_(l,d),e.sweep.deleteRegion_(t,g),e.mesh.deleteEdge(d)),a=!1,g=_,d=l;g.dirty=!0,e.assert(g.windingNumber-l.winding===_.windingNumber),o&&e.sweep.walkDirtyRegions_(t,g)},e.sweep.callCombine_=function(t,s,r,i,n){var o=[s.coords[0],s.coords[1],s.coords[2]];s.data=null,s.data=t.callCombineCallback(o,r,i),null===s.data&&(n?t.fatalError||(t.callErrorCallback(e.errorType.GLU_TESS_NEED_COMBINE_CALLBACK),t.fatalError=!0):s.data=r[0])},e.sweep.spliceMergeVertices_=function(t,s,r){var i=[null,null,null,null],n=[.5,.5,0,0];i[0]=s.org.data,i[1]=r.org.data,e.sweep.callCombine_(t,s.org,i,n,!1),e.mesh.meshSplice(s,r)},e.sweep.vertexWeights_=function(t,s,r,i,n){var o=e.geom.vertL1dist(s,t),a=e.geom.vertL1dist(r,t),l=n,_=n+1;i[l]=.5*a/(o+a),i[_]=.5*o/(o+a),t.coords[0]+=i[l]*s.coords[0]+i[_]*r.coords[0],t.coords[1]+=i[l]*s.coords[1]+i[_]*r.coords[1],t.coords[2]+=i[l]*s.coords[2]+i[_]*r.coords[2]},e.sweep.getIntersectData_=function(t,s,r,i,n,o){var a=[0,0,0,0],l=[r.data,i.data,n.data,o.data];s.coords[0]=s.coords[1]=s.coords[2]=0,e.sweep.vertexWeights_(s,r,i,a,0),e.sweep.vertexWeights_(s,n,o,a,2),e.sweep.callCombine_(t,s,l,a,!0)},e.sweep.checkForRightSplice_=function(t,s){var r=s.regionBelow(),i=s.eUp,n=r.eUp;if(e.geom.vertLeq(i.org,n.org)){if(e.geom.edgeSign(n.dst(),i.org,n.org)>0)return!1;e.geom.vertEq(i.org,n.org)?i.org!==n.org&&(t.pq.remove(i.org.pqHandle),e.sweep.spliceMergeVertices_(t,n.oPrev(),i)):(e.mesh.splitEdge(n.sym),e.mesh.meshSplice(i,n.oPrev()),s.dirty=r.dirty=!0)}else{if(e.geom.edgeSign(i.dst(),n.org,i.org)<0)return!1;s.regionAbove().dirty=s.dirty=!0,e.mesh.splitEdge(i.sym),e.mesh.meshSplice(n.oPrev(),i)}return!0},e.sweep.checkForLeftSplice_=function(t,s){var r,i=s.regionBelow(),n=s.eUp,o=i.eUp;if(e.assert(!e.geom.vertEq(n.dst(),o.dst())),e.geom.vertLeq(n.dst(),o.dst())){if(e.geom.edgeSign(n.dst(),o.dst(),n.org)<0)return!1;s.regionAbove().dirty=s.dirty=!0,r=e.mesh.splitEdge(n),e.mesh.meshSplice(o.sym,r),r.lFace.inside=s.inside}else{if(e.geom.edgeSign(o.dst(),n.dst(),o.org)>0)return!1;s.dirty=i.dirty=!0,r=e.mesh.splitEdge(o),e.mesh.meshSplice(n.lNext,o.sym),r.rFace().inside=s.inside}return!0},e.sweep.checkForIntersect_=function(t,s){var r=s.regionBelow(),i=s.eUp,n=r.eUp,o=i.org,a=n.org,l=i.dst(),_=n.dst(),g=new e.GluVertex;if(e.assert(!e.geom.vertEq(_,l)),e.assert(e.geom.edgeSign(l,t.event,o)<=0),e.assert(e.geom.edgeSign(_,t.event,a)>=0),e.assert(o!==t.event&&a!==t.event),e.assert(!s.fixUpperEdge&&!r.fixUpperEdge),o===a)return!1;if(Math.min(o.t,l.t)>Math.max(a.t,_.t))return!1;if(e.geom.vertLeq(o,a)){if(e.geom.edgeSign(_,o,a)>0)return!1}else if(e.geom.edgeSign(l,a,o)<0)return!1;e.geom.edgeIntersect(l,o,_,a,g),e.assert(Math.min(o.t,l.t)<=g.t),e.assert(g.t<=Math.max(a.t,_.t)),e.assert(Math.min(_.s,l.s)<=g.s),e.assert(g.s<=Math.max(a.s,o.s)),e.geom.vertLeq(g,t.event)&&(g.s=t.event.s,g.t=t.event.t);var d=e.geom.vertLeq(o,a)?o:a;if(e.geom.vertLeq(d,g)&&(g.s=d.s,g.t=d.t),e.geom.vertEq(g,o)||e.geom.vertEq(g,a))return e.sweep.checkForRightSplice_(t,s),!1;if(!e.geom.vertEq(l,t.event)&&e.geom.edgeSign(l,t.event,g)>=0||!e.geom.vertEq(_,t.event)&&e.geom.edgeSign(_,t.event,g)<=0){if(_===t.event)return e.mesh.splitEdge(i.sym),e.mesh.meshSplice(n.sym,i),s=e.sweep.topLeftRegion_(s),i=s.regionBelow().eUp,e.sweep.finishLeftRegions_(t,s.regionBelow(),r),e.sweep.addRightEdges_(t,s,i.oPrev(),i,i,!0),!0;if(l===t.event){e.mesh.splitEdge(n.sym),e.mesh.meshSplice(i.lNext,n.oPrev()),r=s,s=e.sweep.topRightRegion_(s);var h=s.regionBelow().eUp.rPrev();return r.eUp=n.oPrev(),n=e.sweep.finishLeftRegions_(t,r,null),e.sweep.addRightEdges_(t,s,n.oNext,i.rPrev(),h,!0),!0}return e.geom.edgeSign(l,t.event,g)>=0&&(s.regionAbove().dirty=s.dirty=!0,e.mesh.splitEdge(i.sym),i.org.s=t.event.s,i.org.t=t.event.t),e.geom.edgeSign(_,t.event,g)<=0&&(s.dirty=r.dirty=!0,e.mesh.splitEdge(n.sym),n.org.s=t.event.s,n.org.t=t.event.t),!1}return e.mesh.splitEdge(i.sym),e.mesh.splitEdge(n.sym),e.mesh.meshSplice(n.oPrev(),i),i.org.s=g.s,i.org.t=g.t,i.org.pqHandle=t.pq.insert(i.org),e.sweep.getIntersectData_(t,i.org,o,l,a,_),s.regionAbove().dirty=s.dirty=r.dirty=!0,!1},e.sweep.walkDirtyRegions_=function(t,s){for(var r=s.regionBelow();;){for(;r.dirty;)s=r,r=r.regionBelow();if(!s.dirty&&(r=s,null===(s=s.regionAbove())||!s.dirty))return;s.dirty=!1;var i=s.eUp,n=r.eUp;if(i.dst()!==n.dst()&&e.sweep.checkForLeftSplice_(t,s)&&(r.fixUpperEdge?(e.sweep.deleteRegion_(t,r),e.mesh.deleteEdge(n),r=s.regionBelow(),n=r.eUp):s.fixUpperEdge&&(e.sweep.deleteRegion_(t,s),e.mesh.deleteEdge(i),s=r.regionAbove(),i=s.eUp)),i.org!==n.org)if(i.dst()===n.dst()||s.fixUpperEdge||r.fixUpperEdge||i.dst()!==t.event&&n.dst()!==t.event)e.sweep.checkForRightSplice_(t,s);else if(e.sweep.checkForIntersect_(t,s))return;i.org===n.org&&i.dst()===n.dst()&&(e.sweep.addWinding_(n,i),e.sweep.deleteRegion_(t,s),e.mesh.deleteEdge(i),s=r.regionAbove())}},e.sweep.connectRightVertex_=function(t,s,r){var i=r.oNext,n=s.regionBelow(),o=s.eUp,a=n.eUp,l=!1;if(o.dst()!==a.dst()&&e.sweep.checkForIntersect_(t,s),e.geom.vertEq(o.org,t.event)&&(e.mesh.meshSplice(i.oPrev(),o),s=e.sweep.topLeftRegion_(s),i=s.regionBelow().eUp,e.sweep.finishLeftRegions_(t,s.regionBelow(),n),l=!0),e.geom.vertEq(a.org,t.event)&&(e.mesh.meshSplice(r,a.oPrev()),r=e.sweep.finishLeftRegions_(t,n,null),l=!0),l)return void e.sweep.addRightEdges_(t,s,r.oNext,i,i,!0);var _;_=e.geom.vertLeq(a.org,o.org)?a.oPrev():o,_=e.mesh.connect(r.lPrev(),_),e.sweep.addRightEdges_(t,s,_,_.oNext,_.oNext,!1),_.sym.activeRegion.fixUpperEdge=!0,e.sweep.walkDirtyRegions_(t,s)},e.sweep.connectLeftDegenerate_=function(t,s,r){var i=s.eUp;if(e.geom.vertEq(i.org,r))return e.assert(e.sweep.TOLERANCE_NONZERO_),void(e.sweep.TOLERANCE_NONZERO_&&e.sweep.spliceMergeVertices_(t,i,r.anEdge));if(!e.geom.vertEq(i.dst(),r))return e.mesh.splitEdge(i.sym),s.fixUpperEdge&&(e.mesh.deleteEdge(i.oNext),s.fixUpperEdge=!1),e.mesh.meshSplice(r.anEdge,i),void e.sweep.sweepEvent_(t,r);if(e.assert(e.sweep.TOLERANCE_NONZERO_),e.sweep.TOLERANCE_NONZERO_){s=e.sweep.topRightRegion_(s);var n=s.regionBelow(),o=n.eUp.sym,a=o.oNext,l=a;n.fixUpperEdge&&(e.assert(a!==o),e.sweep.deleteRegion_(t,n),e.mesh.deleteEdge(o),o=a.oPrev()),e.mesh.meshSplice(r.anEdge,o),e.geom.edgeGoesLeft(a)||(a=null),e.sweep.addRightEdges_(t,s,o.oNext,l,a,!0)}},e.sweep.connectLeftVertex_=function(t,s){var r=new e.ActiveRegion;r.eUp=s.anEdge.sym;var i=t.dict.search(r).getKey(),n=i.regionBelow(),o=i.eUp,a=n.eUp;if(0===e.geom.edgeSign(o.dst(),s,o.org))return void e.sweep.connectLeftDegenerate_(t,i,s);var l,_=e.geom.vertLeq(a.dst(),o.dst())?i:n;if(i.inside||_.fixUpperEdge){if(_===i)l=e.mesh.connect(s.anEdge.sym,o.lNext);else{l=e.mesh.connect(a.dNext(),s.anEdge).sym}_.fixUpperEdge?e.sweep.fixUpperEdge_(_,l):e.sweep.computeWinding_(t,e.sweep.addRegionBelow_(t,i,l)),e.sweep.sweepEvent_(t,s)}else e.sweep.addRightEdges_(t,i,s.anEdge,s.anEdge,null,!0)},e.sweep.sweepEvent_=function(t,s){t.event=s;for(var r=s.anEdge;null===r.activeRegion;)if((r=r.oNext)===s.anEdge)return void e.sweep.connectLeftVertex_(t,s);var i=e.sweep.topLeftRegion_(r.activeRegion),n=i.regionBelow(),o=n.eUp,a=e.sweep.finishLeftRegions_(t,n,null);a.oNext===o?e.sweep.connectRightVertex_(t,i,a):e.sweep.addRightEdges_(t,i,a.oNext,o,o,!0)},e.sweep.addSentinel_=function(t,s){var r=new e.ActiveRegion,i=e.mesh.makeEdge(t.mesh);i.org.s=e.sweep.SENTINEL_COORD_,i.org.t=s,i.dst().s=-e.sweep.SENTINEL_COORD_,i.dst().t=s,t.event=i.dst(),r.eUp=i,r.windingNumber=0,r.inside=!1,r.fixUpperEdge=!1,r.sentinel=!0,r.dirty=!1,r.nodeUp=t.dict.insert(r)},e.sweep.initEdgeDict_=function(t){t.dict=new e.Dict(t,e.sweep.edgeLeq_),e.sweep.addSentinel_(t,-e.sweep.SENTINEL_COORD_),e.sweep.addSentinel_(t,e.sweep.SENTINEL_COORD_)},e.sweep.doneEdgeDict_=function(t){for(var s,r=0;null!==(s=t.dict.getMin().getKey());)s.sentinel||(e.assert(s.fixUpperEdge),e.assert(1==++r)),e.assert(0===s.windingNumber),e.sweep.deleteRegion_(t,s);t.dict=null},e.sweep.removeDegenerateEdges_=function(t){for(var s,r=t.mesh.eHead,i=r.next;i!==r;i=s){s=i.next;var n=i.lNext;e.geom.vertEq(i.org,i.dst())&&i.lNext.lNext!==i&&(e.sweep.spliceMergeVertices_(t,n,i),e.mesh.deleteEdge(i),i=n,n=i.lNext),n.lNext===i&&(n!==i&&(n!==s&&n!==s.sym||(s=s.next),e.mesh.deleteEdge(n)),i!==s&&i!==s.sym||(s=s.next),e.mesh.deleteEdge(i))}},e.sweep.initPriorityQ_=function(t){var s=new e.PriorityQ;t.pq=s;var r,i=t.mesh.vHead;for(r=i.next;r!==i;r=r.next)r.pqHandle=s.insert(r);s.init()},e.sweep.donePriorityQ_=function(e){e.pq.deleteQ(),e.pq=null},e.sweep.removeDegenerateFaces_=function(t){for(var s,r=t.fHead.next;r!==t.fHead;r=s){s=r.next;var i=r.anEdge;e.assert(i.lNext!==i),i.lNext.lNext===i&&(e.sweep.addWinding_(i.oNext,i),e.mesh.deleteEdge(i))}},e.tessmono={},e.tessmono.tessellateMonoRegion_=function(t){var s=t.anEdge;for(e.assert(s.lNext!==s&&s.lNext.lNext!==s);e.geom.vertLeq(s.dst(),s.org);s=s.lPrev());for(;e.geom.vertLeq(s.org,s.dst());s=s.lNext);for(var r,i=s.lPrev();s.lNext!==i;)if(e.geom.vertLeq(s.dst(),i.org)){for(;i.lNext!==s&&(e.geom.edgeGoesLeft(i.lNext)||e.geom.edgeSign(i.org,i.dst(),i.lNext.dst())<=0);)r=e.mesh.connect(i.lNext,i),i=r.sym;i=i.lPrev()}else{for(;i.lNext!==s&&(e.geom.edgeGoesRight(s.lPrev())||e.geom.edgeSign(s.dst(),s.org,s.lPrev().org)>=0);)r=e.mesh.connect(s,s.lPrev()),s=r.sym;s=s.lNext}for(e.assert(i.lNext!==s);i.lNext.lNext!==s;)r=e.mesh.connect(i.lNext,i),i=r.sym},e.tessmono.tessellateInterior=function(t){for(var s,r=t.fHead.next;r!==t.fHead;r=s)s=r.next,r.inside&&e.tessmono.tessellateMonoRegion_(r)},e.tessmono.discardExterior=function(t){for(var s,r=t.fHead.next;r!==t.fHead;r=s)s=r.next,r.inside||e.mesh.zapFace(r)},e.tessmono.setWindingNumber=function(t,s,r){for(var i,n=t.eHead.next;n!==t.eHead;n=i)i=n.next,n.rFace().inside!==n.lFace.inside?n.winding=n.lFace.inside?s:-s:r?e.mesh.deleteEdge(n):n.winding=0},e.Dict=function(t,s){this.head_=new e.DictNode,this.frame_=t,this.leq_=s},e.Dict.prototype.deleteDict_=function(){},e.Dict.prototype.insertBefore=function(t,s){do{t=t.prev}while(null!==t.key&&!this.leq_(this.frame_,t.key,s));var r=new e.DictNode(s,t.next,t);return t.next.prev=r,t.next=r,r},e.Dict.prototype.insert=function(e){return this.insertBefore(this.head_,e)},e.Dict.prototype.deleteNode=function(e){e.next.prev=e.prev,e.prev.next=e.next},e.Dict.prototype.search=function(e){var t=this.head_;do{t=t.next}while(null!==t.key&&!this.leq_(this.frame_,e,t.key));return t},e.Dict.prototype.getMin=function(){return this.head_.next},e.Dict.prototype.getMax=function(){return this.head_.prev},e.DictNode=function(e,t,s){this.key=e||null,this.next=t||this,this.prev=s||this},e.DictNode.prototype.getKey=function(){return this.key},e.DictNode.prototype.getSuccessor=function(){return this.next},e.DictNode.prototype.getPredecessor=function(){return this.prev},e.GluTesselator=function(){this.state_=e.GluTesselator.tessState_.T_DORMANT,this.lastEdge_=null,this.mesh=null,this.errorCallback_=null,this.normal_=[0,0,0],this.windingRule=e.windingRule.GLU_TESS_WINDING_ODD,this.fatalError=!1,this.dict=null,this.pq=null,this.event=null,this.combineCallback_=null,this.boundaryOnly_=!1,this.beginCallback_=null,this.edgeFlagCallback_=null,this.vertexCallback_=null,this.endCallback_=null,this.meshCallback_=null,this.polygonData_=null},e.GluTesselator.tessState_={T_DORMANT:0,T_IN_POLYGON:1,T_IN_CONTOUR:2},e.GluTesselator.prototype.gluDeleteTess=function(){this.requireState_(e.GluTesselator.tessState_.T_DORMANT)},e.GluTesselator.prototype.gluTessProperty=function(t,s){switch(t){case e.gluEnum.GLU_TESS_TOLERANCE:return;case e.gluEnum.GLU_TESS_WINDING_RULE:var r=s;switch(r){case e.windingRule.GLU_TESS_WINDING_ODD:case e.windingRule.GLU_TESS_WINDING_NONZERO:case e.windingRule.GLU_TESS_WINDING_POSITIVE:case e.windingRule.GLU_TESS_WINDING_NEGATIVE:case e.windingRule.GLU_TESS_WINDING_ABS_GEQ_TWO:return void(this.windingRule=r)}break;case e.gluEnum.GLU_TESS_BOUNDARY_ONLY:return void(this.boundaryOnly_=!!s);default:return void this.callErrorCallback(e.gluEnum.GLU_INVALID_ENUM)}this.callErrorCallback(e.gluEnum.GLU_INVALID_VALUE)},e.GluTesselator.prototype.gluGetTessProperty=function(t){switch(t){case e.gluEnum.GLU_TESS_TOLERANCE:return 0;case e.gluEnum.GLU_TESS_WINDING_RULE:var s=this.windingRule;return e.assert(s===e.windingRule.GLU_TESS_WINDING_ODD||s===e.windingRule.GLU_TESS_WINDING_NONZERO||s===e.windingRule.GLU_TESS_WINDING_POSITIVE||s===e.windingRule.GLU_TESS_WINDING_NEGATIVE||s===e.windingRule.GLU_TESS_WINDING_ABS_GEQ_TWO),s;case e.gluEnum.GLU_TESS_BOUNDARY_ONLY:return e.assert(!0===this.boundaryOnly_||!1===this.boundaryOnly_),this.boundaryOnly_;default:this.callErrorCallback(e.gluEnum.GLU_INVALID_ENUM)}return!1},e.GluTesselator.prototype.gluTessNormal=function(e,t,s){this.normal_[0]=e,this.normal_[1]=t,this.normal_[2]=s},e.GluTesselator.prototype.gluTessCallback=function(t,s){var r=s||null;switch(t){case e.gluEnum.GLU_TESS_BEGIN:case e.gluEnum.GLU_TESS_BEGIN_DATA:return void(this.beginCallback_=r);case e.gluEnum.GLU_TESS_EDGE_FLAG:case e.gluEnum.GLU_TESS_EDGE_FLAG_DATA:return void(this.edgeFlagCallback_=r);case e.gluEnum.GLU_TESS_VERTEX:case e.gluEnum.GLU_TESS_VERTEX_DATA:return void(this.vertexCallback_=r);case e.gluEnum.GLU_TESS_END:case e.gluEnum.GLU_TESS_END_DATA:return void(this.endCallback_=r);case e.gluEnum.GLU_TESS_ERROR:case e.gluEnum.GLU_TESS_ERROR_DATA:return void(this.errorCallback_=r);case e.gluEnum.GLU_TESS_COMBINE:case e.gluEnum.GLU_TESS_COMBINE_DATA:return void(this.combineCallback_=r);case e.gluEnum.GLU_TESS_MESH:return void(this.meshCallback_=r);default:return void this.callErrorCallback(e.gluEnum.GLU_INVALID_ENUM)}},e.GluTesselator.prototype.gluTessVertex=function(t,s){var r=!1,i=[0,0,0];this.requireState_(e.GluTesselator.tessState_.T_IN_CONTOUR);for(var n=0;n<3;++n){var o=t[n];o<-e.GLU_TESS_MAX_COORD&&(o=-e.GLU_TESS_MAX_COORD,r=!0),o>e.GLU_TESS_MAX_COORD&&(o=e.GLU_TESS_MAX_COORD,r=!0),i[n]=o}r&&this.callErrorCallback(e.errorType.GLU_TESS_COORD_TOO_LARGE),this.addVertex_(i,s)},e.GluTesselator.prototype.gluTessBeginPolygon=function(t){this.requireState_(e.GluTesselator.tessState_.T_DORMANT),this.state_=e.GluTesselator.tessState_.T_IN_POLYGON,this.mesh=new e.GluMesh,this.polygonData_=t},e.GluTesselator.prototype.gluTessBeginContour=function(){this.requireState_(e.GluTesselator.tessState_.T_IN_POLYGON),this.state_=e.GluTesselator.tessState_.T_IN_CONTOUR,this.lastEdge_=null},e.GluTesselator.prototype.gluTessEndContour=function(){this.requireState_(e.GluTesselator.tessState_.T_IN_CONTOUR),this.state_=e.GluTesselator.tessState_.T_IN_POLYGON},e.GluTesselator.prototype.gluTessEndPolygon=function(){if(this.requireState_(e.GluTesselator.tessState_.T_IN_POLYGON),this.state_=e.GluTesselator.tessState_.T_DORMANT,e.normal.projectPolygon(this,this.normal_[0],this.normal_[1],this.normal_[2]),e.sweep.computeInterior(this),!this.fatalError){var t=this.mesh;if(this.boundaryOnly_?e.tessmono.setWindingNumber(t,1,!0):e.tessmono.tessellateInterior(t),this.mesh.checkMesh(),this.beginCallback_||this.endCallback_||this.vertexCallback_||this.edgeFlagCallback_)if(this.boundaryOnly_)e.render.renderBoundary(this,this.mesh);else{var s=!!this.edgeFlagCallback_;e.render.renderMesh(this,this.mesh,s)}if(this.meshCallback_)return e.tessmono.discardExterior(this.mesh),this.meshCallback_(this.mesh),this.mesh=null,void(this.polygonData_=null)}e.mesh.deleteMesh(this.mesh),this.polygonData_=null,this.mesh=null},e.GluTesselator.prototype.requireState_=function(e){this.state_!==e&&this.gotoState_(e)},e.GluTesselator.prototype.gotoState_=function(t){for(;this.state_!==t;)if(this.state_<t)switch(this.state_){case e.GluTesselator.tessState_.T_DORMANT:this.callErrorCallback(e.errorType.GLU_TESS_MISSING_BEGIN_POLYGON),this.gluTessBeginPolygon(null);break;case e.GluTesselator.tessState_.T_IN_POLYGON:this.callErrorCallback(e.errorType.GLU_TESS_MISSING_BEGIN_CONTOUR),this.gluTessBeginContour()}else switch(this.state_){case e.GluTesselator.tessState_.T_IN_CONTOUR:this.callErrorCallback(e.errorType.GLU_TESS_MISSING_END_CONTOUR),this.gluTessEndContour();break;case e.GluTesselator.tessState_.T_IN_POLYGON:this.callErrorCallback(e.errorType.GLU_TESS_MISSING_END_POLYGON),this.gluTessEndPolygon()}},e.GluTesselator.prototype.addVertex_=function(t,s){var r=this.lastEdge_;null===r?(r=e.mesh.makeEdge(this.mesh),e.mesh.meshSplice(r,r.sym)):(e.mesh.splitEdge(r),r=r.lNext),r.org.data=s,r.org.coords[0]=t[0],r.org.coords[1]=t[1],r.org.coords[2]=t[2],r.winding=1,r.sym.winding=-1,this.lastEdge_=r},e.GluTesselator.prototype.callBeginCallback=function(e){this.beginCallback_&&this.beginCallback_(e,this.polygonData_)},e.GluTesselator.prototype.callVertexCallback=function(e){this.vertexCallback_&&this.vertexCallback_(e,this.polygonData_)},e.GluTesselator.prototype.callEdgeFlagCallback=function(e){this.edgeFlagCallback_&&this.edgeFlagCallback_(e,this.polygonData_)},e.GluTesselator.prototype.callEndCallback=function(){this.endCallback_&&this.endCallback_(this.polygonData_)},e.GluTesselator.prototype.callCombineCallback=function(e,t,s){return this.combineCallback_?this.combineCallback_(e,t,s,this.polygonData_)||null:null},e.GluTesselator.prototype.callErrorCallback=function(e){this.errorCallback_&&this.errorCallback_(e,this.polygonData_)},e.GluFace=function(e,t){this.next=e||this,this.prev=t||this,this.anEdge=null,this.inside=!1},e.GluHalfEdge=function(e){this.next=e||this,this.sym=null,this.oNext=null,this.lNext=null,this.org=null,this.lFace=null,this.activeRegion=null,this.winding=0},e.GluHalfEdge.prototype.rFace=function(){return this.sym.lFace},e.GluHalfEdge.prototype.dst=function(){return this.sym.org},e.GluHalfEdge.prototype.oPrev=function(){return this.sym.lNext},e.GluHalfEdge.prototype.lPrev=function(){return this.oNext.sym},e.GluHalfEdge.prototype.dPrev=function(){return this.lNext.sym},e.GluHalfEdge.prototype.rPrev=function(){return this.sym.oNext},e.GluHalfEdge.prototype.dNext=function(){return this.rPrev().sym},e.GluHalfEdge.prototype.rNext=function(){return this.oPrev().sym},e.GluMesh=function(){this.vHead=new e.GluVertex,this.fHead=new e.GluFace,this.eHead=new e.GluHalfEdge,this.eHeadSym=new e.GluHalfEdge,this.eHead.sym=this.eHeadSym,this.eHeadSym.sym=this.eHead},e.GluMesh.prototype.checkMesh=function(){if(e.DEBUG){var t,s,r=this.fHead,i=this.vHead,n=this.eHead,o=r;for(o=r;(s=o.next)!==r;o=s){e.assert(s.prev===o),t=s.anEdge;do{e.assert(t.sym!==t),e.assert(t.sym.sym===t),e.assert(t.lNext.oNext.sym===t),e.assert(t.oNext.sym.lNext===t),e.assert(t.lFace===s),t=t.lNext}while(t!==s.anEdge)}e.assert(s.prev===o&&null===s.anEdge);var a,l=i;for(l=i;(a=l.next)!==i;l=a){e.assert(a.prev===l),t=a.anEdge;do{e.assert(t.sym!==t),e.assert(t.sym.sym===t),e.assert(t.lNext.oNext.sym===t),e.assert(t.oNext.sym.lNext===t),e.assert(t.org===a),t=t.oNext}while(t!==a.anEdge)}e.assert(a.prev===l&&null===a.anEdge&&null===a.data);var _=n;for(_=n;(t=_.next)!==n;_=t)e.assert(t.sym.next===_.sym),e.assert(t.sym!==t),e.assert(t.sym.sym===t),e.assert(null!==t.org),e.assert(null!==t.dst()),e.assert(t.lNext.oNext.sym===t),e.assert(t.oNext.sym.lNext===t);e.assert(t.sym.next===_.sym&&t.sym===this.eHeadSym&&t.sym.sym===t&&null===t.org&&null===t.dst()&&null===t.lFace&&null===t.rFace())}},e.GluVertex=function(e,t){
this.next=e||this,this.prev=t||this,this.anEdge=null,this.data=null,this.coords=[0,0,0],this.s=0,this.t=0,this.pqHandle=0},e.PriorityQ=function(){this.verts_=[],this.order_=null,this.size_=0,this.initialized_=!1,this.heap_=new e.PriorityQHeap},e.PriorityQ.prototype.deleteQ=function(){this.heap_=null,this.order_=null,this.verts_=null},e.PriorityQ.prototype.init=function(){this.order_=[];for(var t=0;t<this.size_;t++)this.order_[t]=t;var s=function(t){return function(s,r){return e.geom.vertLeq(t[s],t[r])?1:-1}}(this.verts_);if(this.order_.sort(s),this.initialized_=!0,this.heap_.init(),e.DEBUG){var r=0+this.size_-1;for(t=0;t<r;++t)e.assert(e.geom.vertLeq(this.verts_[this.order_[t+1]],this.verts_[this.order_[t]]))}},e.PriorityQ.prototype.insert=function(e){if(this.initialized_)return this.heap_.insert(e);var t=this.size_++;return this.verts_[t]=e,-(t+1)},e.PriorityQ.prototype.extractMin=function(){if(0===this.size_)return this.heap_.extractMin();var t=this.verts_[this.order_[this.size_-1]];if(!this.heap_.isEmpty()){var s=this.heap_.minimum();if(e.geom.vertLeq(s,t))return this.heap_.extractMin()}do{--this.size_}while(this.size_>0&&null===this.verts_[this.order_[this.size_-1]]);return t},e.PriorityQ.prototype.minimum=function(){if(0===this.size_)return this.heap_.minimum();var t=this.verts_[this.order_[this.size_-1]];if(!this.heap_.isEmpty()){var s=this.heap_.minimum();if(e.geom.vertLeq(s,t))return s}return t},e.PriorityQ.prototype.remove=function(t){if(t>=0)return void this.heap_.remove(t);for(t=-(t+1),e.assert(t<this.verts_.length&&null!==this.verts_[t]),this.verts_[t]=null;this.size_>0&&null===this.verts_[this.order_[this.size_-1]];)--this.size_},e.PriorityQHeap=function(){this.heap_=e.PriorityQHeap.reallocNumeric_([0],e.PriorityQHeap.INIT_SIZE_+1),this.verts_=[null,null],this.handles_=[0,0],this.size_=0,this.max_=e.PriorityQHeap.INIT_SIZE_,this.freeList_=0,this.initialized_=!1,this.heap_[1]=1},e.PriorityQHeap.INIT_SIZE_=32,e.PriorityQHeap.reallocNumeric_=function(e,t){for(var s=new Array(t),r=0;r<e.length;r++)s[r]=e[r];for(;r<t;r++)s[r]=0;return s},e.PriorityQHeap.prototype.init=function(){for(var e=this.size_;e>=1;--e)this.floatDown_(e);this.initialized_=!0},e.PriorityQHeap.prototype.insert=function(t){var s=++this.size_;2*s>this.max_&&(this.max_*=2,this.handles_=e.PriorityQHeap.reallocNumeric_(this.handles_,this.max_+1));var r;return 0===this.freeList_?r=s:(r=this.freeList_,this.freeList_=this.handles_[this.freeList_]),this.verts_[r]=t,this.handles_[r]=s,this.heap_[s]=r,this.initialized_&&this.floatUp_(s),r},e.PriorityQHeap.prototype.isEmpty=function(){return 0===this.size_},e.PriorityQHeap.prototype.minimum=function(){return this.verts_[this.heap_[1]]},e.PriorityQHeap.prototype.extractMin=function(){var e=this.heap_,t=this.verts_,s=this.handles_,r=e[1],i=t[r];return this.size_>0&&(e[1]=e[this.size_],s[e[1]]=1,t[r]=null,s[r]=this.freeList_,this.freeList_=r,--this.size_>0&&this.floatDown_(1)),i},e.PriorityQHeap.prototype.remove=function(t){var s=this.heap_,r=this.verts_,i=this.handles_;e.assert(t>=1&&t<=this.max_&&null!==r[t]);var n=i[t];if(s[n]=s[this.size_],i[s[n]]=n,n<=--this.size_)if(n<=1)this.floatDown_(n);else{var o=r[s[n]],a=r[s[n>>1]];e.geom.vertLeq(a,o)?this.floatDown_(n):this.floatUp_(n)}r[t]=null,i[t]=this.freeList_,this.freeList_=t},e.PriorityQHeap.prototype.floatDown_=function(t){for(var s=this.heap_,r=this.verts_,i=this.handles_,n=t,o=s[n];;){var a=n<<1;a<this.size_&&e.geom.vertLeq(r[s[a+1]],r[s[a]])&&(a+=1),e.assert(a<=this.max_);var l=s[a];if(a>this.size_||e.geom.vertLeq(r[o],r[l]))return s[n]=o,void(i[o]=n);s[n]=l,i[l]=n,n=a}},e.PriorityQHeap.prototype.floatUp_=function(t){for(var s=this.heap_,r=this.verts_,i=this.handles_,n=t,o=s[n];;){var a=n>>1,l=s[a];if(0===a||e.geom.vertLeq(r[l],r[o]))return s[n]=o,void(i[o]=n);s[n]=l,i[l]=n,n=a}},e.ActiveRegion=function(){this.eUp=null,this.nodeUp=null,this.windingNumber=0,this.inside=!1,this.sentinel=!1,this.dirty=!1,this.fixUpperEdge=!1},e.ActiveRegion.prototype.regionBelow=function(){return this.nodeUp.getPredecessor().getKey()},e.ActiveRegion.prototype.regionAbove=function(){return this.nodeUp.getSuccessor().getKey()},e});