import{B as e,o as t,c as r,w as o,M as n,e as a,A as i,J as p,K as y,a0 as f,a1 as u,P as s,Q as l,$ as c,a2 as d}from"./vendor.123e8ae1.js";import{r as h}from"./index.9a3d149a.js";import{_ as g}from"./plugin-vue_export-helper.21dcd24c.js";var A="undefined"!=typeof Symbol&&Symbol,b=function(){if("function"!=typeof Symbol||"function"!=typeof Object.getOwnPropertySymbols)return!1;if("symbol"==typeof Symbol.iterator)return!0;var e={},t=Symbol("test"),r=Object(t);if("string"==typeof t)return!1;if("[object Symbol]"!==Object.prototype.toString.call(t))return!1;if("[object Symbol]"!==Object.prototype.toString.call(r))return!1;for(t in e[t]=42,e)return!1;if("function"==typeof Object.keys&&0!==Object.keys(e).length)return!1;if("function"==typeof Object.getOwnPropertyNames&&0!==Object.getOwnPropertyNames(e).length)return!1;var o=Object.getOwnPropertySymbols(e);if(1!==o.length||o[0]!==t)return!1;if(!Object.prototype.propertyIsEnumerable.call(e,t))return!1;if("function"==typeof Object.getOwnPropertyDescriptor){var n=Object.getOwnPropertyDescriptor(e,t);if(42!==n.value||!0!==n.enumerable)return!1}return!0},v="Function.prototype.bind called on incompatible ",m=Array.prototype.slice,P=Object.prototype.toString,S=function(e){var t=this;if("function"!=typeof t||"[object Function]"!==P.call(t))throw new TypeError(v+t);for(var r,o=m.call(arguments,1),n=function(){if(this instanceof r){var n=t.apply(this,o.concat(m.call(arguments)));return Object(n)===n?n:this}return t.apply(e,o.concat(m.call(arguments)))},a=Math.max(0,t.length-o.length),i=[],p=0;p<a;p++)i.push("$"+p);if(r=Function("binder","return function ("+i.join(",")+"){ return binder.apply(this,arguments); }")(n),t.prototype){var y=function(){};y.prototype=t.prototype,r.prototype=new y,y.prototype=null}return r},w=Function.prototype.bind||S,_=w.call(Function.call,Object.prototype.hasOwnProperty),F=SyntaxError,I=Function,U=TypeError,O=function(e){try{return I('"use strict"; return ('+e+").constructor;")()}catch(t){}},E=Object.getOwnPropertyDescriptor;if(E)try{E({},"")}catch(ae){E=null}var R=function(){throw new U},j=E?function(){try{return R}catch(e){try{return E(arguments,"callee").get}catch(t){return R}}}():R,B="function"==typeof A&&"function"==typeof Symbol&&"symbol"==typeof A("foo")&&"symbol"==typeof Symbol("bar")&&b(),x=Object.getPrototypeOf||function(e){return e.__proto__},k={},M="undefined"==typeof Uint8Array?undefined:x(Uint8Array),C={"%AggregateError%":"undefined"==typeof AggregateError?undefined:AggregateError,"%Array%":Array,"%ArrayBuffer%":"undefined"==typeof ArrayBuffer?undefined:ArrayBuffer,"%ArrayIteratorPrototype%":B?x([][Symbol.iterator]()):undefined,"%AsyncFromSyncIteratorPrototype%":undefined,"%AsyncFunction%":k,"%AsyncGenerator%":k,"%AsyncGeneratorFunction%":k,"%AsyncIteratorPrototype%":k,"%Atomics%":"undefined"==typeof Atomics?undefined:Atomics,"%BigInt%":"undefined"==typeof BigInt?undefined:BigInt,"%Boolean%":Boolean,"%DataView%":"undefined"==typeof DataView?undefined:DataView,"%Date%":Date,"%decodeURI%":decodeURI,"%decodeURIComponent%":decodeURIComponent,"%encodeURI%":encodeURI,"%encodeURIComponent%":encodeURIComponent,"%Error%":Error,"%eval%":eval,"%EvalError%":EvalError,"%Float32Array%":"undefined"==typeof Float32Array?undefined:Float32Array,"%Float64Array%":"undefined"==typeof Float64Array?undefined:Float64Array,"%FinalizationRegistry%":"undefined"==typeof FinalizationRegistry?undefined:FinalizationRegistry,"%Function%":I,"%GeneratorFunction%":k,"%Int8Array%":"undefined"==typeof Int8Array?undefined:Int8Array,"%Int16Array%":"undefined"==typeof Int16Array?undefined:Int16Array,"%Int32Array%":"undefined"==typeof Int32Array?undefined:Int32Array,"%isFinite%":isFinite,"%isNaN%":isNaN,"%IteratorPrototype%":B?x(x([][Symbol.iterator]())):undefined,"%JSON%":"object"==typeof JSON?JSON:undefined,"%Map%":"undefined"==typeof Map?undefined:Map,"%MapIteratorPrototype%":"undefined"!=typeof Map&&B?x((new Map)[Symbol.iterator]()):undefined,"%Math%":Math,"%Number%":Number,"%Object%":Object,"%parseFloat%":parseFloat,"%parseInt%":parseInt,"%Promise%":"undefined"==typeof Promise?undefined:Promise,"%Proxy%":"undefined"==typeof Proxy?undefined:Proxy,"%RangeError%":RangeError,"%ReferenceError%":ReferenceError,"%Reflect%":"undefined"==typeof Reflect?undefined:Reflect,"%RegExp%":RegExp,"%Set%":"undefined"==typeof Set?undefined:Set,"%SetIteratorPrototype%":"undefined"!=typeof Set&&B?x((new Set)[Symbol.iterator]()):undefined,"%SharedArrayBuffer%":"undefined"==typeof SharedArrayBuffer?undefined:SharedArrayBuffer,"%String%":String,"%StringIteratorPrototype%":B?x(""[Symbol.iterator]()):undefined,"%Symbol%":B?Symbol:undefined,"%SyntaxError%":F,"%ThrowTypeError%":j,"%TypedArray%":M,"%TypeError%":U,"%Uint8Array%":"undefined"==typeof Uint8Array?undefined:Uint8Array,"%Uint8ClampedArray%":"undefined"==typeof Uint8ClampedArray?undefined:Uint8ClampedArray,"%Uint16Array%":"undefined"==typeof Uint16Array?undefined:Uint16Array,"%Uint32Array%":"undefined"==typeof Uint32Array?undefined:Uint32Array,"%URIError%":URIError,"%WeakMap%":"undefined"==typeof WeakMap?undefined:WeakMap,"%WeakRef%":"undefined"==typeof WeakRef?undefined:WeakRef,"%WeakSet%":"undefined"==typeof WeakSet?undefined:WeakSet},G=function e(t){var r;if("%AsyncFunction%"===t)r=O("async function () {}");else if("%GeneratorFunction%"===t)r=O("function* () {}");else if("%AsyncGeneratorFunction%"===t)r=O("async function* () {}");else if("%AsyncGenerator%"===t){var o=e("%AsyncGeneratorFunction%");o&&(r=o.prototype)}else if("%AsyncIteratorPrototype%"===t){var n=e("%AsyncGenerator%");n&&(r=x(n.prototype))}return C[t]=r,r},N={"%ArrayBufferPrototype%":["ArrayBuffer","prototype"],"%ArrayPrototype%":["Array","prototype"],"%ArrayProto_entries%":["Array","prototype","entries"],"%ArrayProto_forEach%":["Array","prototype","forEach"],"%ArrayProto_keys%":["Array","prototype","keys"],"%ArrayProto_values%":["Array","prototype","values"],"%AsyncFunctionPrototype%":["AsyncFunction","prototype"],"%AsyncGenerator%":["AsyncGeneratorFunction","prototype"],"%AsyncGeneratorPrototype%":["AsyncGeneratorFunction","prototype","prototype"],"%BooleanPrototype%":["Boolean","prototype"],"%DataViewPrototype%":["DataView","prototype"],"%DatePrototype%":["Date","prototype"],"%ErrorPrototype%":["Error","prototype"],"%EvalErrorPrototype%":["EvalError","prototype"],"%Float32ArrayPrototype%":["Float32Array","prototype"],"%Float64ArrayPrototype%":["Float64Array","prototype"],"%FunctionPrototype%":["Function","prototype"],"%Generator%":["GeneratorFunction","prototype"],"%GeneratorPrototype%":["GeneratorFunction","prototype","prototype"],"%Int8ArrayPrototype%":["Int8Array","prototype"],"%Int16ArrayPrototype%":["Int16Array","prototype"],"%Int32ArrayPrototype%":["Int32Array","prototype"],"%JSONParse%":["JSON","parse"],"%JSONStringify%":["JSON","stringify"],"%MapPrototype%":["Map","prototype"],"%NumberPrototype%":["Number","prototype"],"%ObjectPrototype%":["Object","prototype"],"%ObjProto_toString%":["Object","prototype","toString"],"%ObjProto_valueOf%":["Object","prototype","valueOf"],"%PromisePrototype%":["Promise","prototype"],"%PromiseProto_then%":["Promise","prototype","then"],"%Promise_all%":["Promise","all"],"%Promise_reject%":["Promise","reject"],"%Promise_resolve%":["Promise","resolve"],"%RangeErrorPrototype%":["RangeError","prototype"],"%ReferenceErrorPrototype%":["ReferenceError","prototype"],"%RegExpPrototype%":["RegExp","prototype"],"%SetPrototype%":["Set","prototype"],"%SharedArrayBufferPrototype%":["SharedArrayBuffer","prototype"],"%StringPrototype%":["String","prototype"],"%SymbolPrototype%":["Symbol","prototype"],"%SyntaxErrorPrototype%":["SyntaxError","prototype"],"%TypedArrayPrototype%":["TypedArray","prototype"],"%TypeErrorPrototype%":["TypeError","prototype"],"%Uint8ArrayPrototype%":["Uint8Array","prototype"],"%Uint8ClampedArrayPrototype%":["Uint8ClampedArray","prototype"],"%Uint16ArrayPrototype%":["Uint16Array","prototype"],"%Uint32ArrayPrototype%":["Uint32Array","prototype"],"%URIErrorPrototype%":["URIError","prototype"],"%WeakMapPrototype%":["WeakMap","prototype"],"%WeakSetPrototype%":["WeakSet","prototype"]},W=w,D=_,T=W.call(Function.call,Array.prototype.concat),$=W.call(Function.apply,Array.prototype.splice),L=W.call(Function.call,String.prototype.replace),z=W.call(Function.call,String.prototype.slice),J=/[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,V=/\\(\\)?/g,q=function(e){var t=z(e,0,1),r=z(e,-1);if("%"===t&&"%"!==r)throw new F("invalid intrinsic syntax, expected closing `%`");if("%"===r&&"%"!==t)throw new F("invalid intrinsic syntax, expected opening `%`");var o=[];return L(e,J,(function(e,t,r,n){o[o.length]=r?L(n,V,"$1"):t||e})),o},K=function(e,t){var r,o=e;if(D(N,o)&&(o="%"+(r=N[o])[0]+"%"),D(C,o)){var n=C[o];if(n===k&&(n=G(o)),void 0===n&&!t)throw new U("intrinsic "+e+" exists, but is not available. Please file an issue!");return{alias:r,name:o,value:n}}throw new F("intrinsic "+e+" does not exist!")},Q=function(e,t){if("string"!=typeof e||0===e.length)throw new U("intrinsic name must be a non-empty string");if(arguments.length>1&&"boolean"!=typeof t)throw new U('"allowMissing" argument must be a boolean');var r=q(e),o=r.length>0?r[0]:"",n=K("%"+o+"%",t),a=n.name,i=n.value,p=!1,y=n.alias;y&&(o=y[0],$(r,T([0,1],y)));for(var f=1,u=!0;f<r.length;f+=1){var s=r[f],l=z(s,0,1),c=z(s,-1);if(('"'===l||"'"===l||"`"===l||'"'===c||"'"===c||"`"===c)&&l!==c)throw new F("property names with quotes must have matching quotes");if("constructor"!==s&&u||(p=!0),D(C,a="%"+(o+="."+s)+"%"))i=C[a];else if(null!=i){if(!(s in i)){if(!t)throw new U("base intrinsic for "+e+" exists, but the property is not available.");return}if(E&&f+1>=r.length){var d=E(i,s);i=(u=!!d)&&"get"in d&&!("originalValue"in d.get)?d.get:i[s]}else u=D(i,s),i=i[s];u&&!p&&(C[a]=i)}}return i},Z={exports:{}};!function(e){var t=w,r=Q,o=r("%Function.prototype.apply%"),n=r("%Function.prototype.call%"),a=r("%Reflect.apply%",!0)||t.call(n,o),i=r("%Object.getOwnPropertyDescriptor%",!0),p=r("%Object.defineProperty%",!0),y=r("%Math.max%");if(p)try{p({},"a",{value:1})}catch(ae){p=null}e.exports=function(e){var r=a(t,n,arguments);if(i&&p){var o=i(r,"length");o.configurable&&p(r,"length",{value:1+y(0,e.length-(arguments.length-1))})}return r};var f=function(){return a(t,o,arguments)};p?p(e.exports,"apply",{value:f}):e.exports.apply=f}(Z);var H=Q,X=Z.exports,Y=X(H("String.prototype.indexOf")),ee=Q,te=function(e,t){var r=H(e,!!t);return"function"==typeof r&&Y(e,".prototype.")>-1?X(r):r};ee("%TypeError%"),ee("%WeakMap%",!0),ee("%Map%",!0),te("WeakMap.prototype.get",!0),te("WeakMap.prototype.set",!0),te("WeakMap.prototype.has",!0),te("Map.prototype.get",!0),te("Map.prototype.set",!0),te("Map.prototype.has",!0),function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase())}();var re={exports:{}},oe=re.exports=function(e){var t=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];function r(e,t){var r=e[0],o=e[1],n=e[2],a=e[3];o=((o+=((n=((n+=((a=((a+=((r=((r+=(o&n|~o&a)+t[0]-680876936|0)<<7|r>>>25)+o|0)&o|~r&n)+t[1]-389564586|0)<<12|a>>>20)+r|0)&r|~a&o)+t[2]+606105819|0)<<17|n>>>15)+a|0)&a|~n&r)+t[3]-1044525330|0)<<22|o>>>10)+n|0,o=((o+=((n=((n+=((a=((a+=((r=((r+=(o&n|~o&a)+t[4]-176418897|0)<<7|r>>>25)+o|0)&o|~r&n)+t[5]+1200080426|0)<<12|a>>>20)+r|0)&r|~a&o)+t[6]-1473231341|0)<<17|n>>>15)+a|0)&a|~n&r)+t[7]-45705983|0)<<22|o>>>10)+n|0,o=((o+=((n=((n+=((a=((a+=((r=((r+=(o&n|~o&a)+t[8]+1770035416|0)<<7|r>>>25)+o|0)&o|~r&n)+t[9]-1958414417|0)<<12|a>>>20)+r|0)&r|~a&o)+t[10]-42063|0)<<17|n>>>15)+a|0)&a|~n&r)+t[11]-1990404162|0)<<22|o>>>10)+n|0,o=((o+=((n=((n+=((a=((a+=((r=((r+=(o&n|~o&a)+t[12]+1804603682|0)<<7|r>>>25)+o|0)&o|~r&n)+t[13]-40341101|0)<<12|a>>>20)+r|0)&r|~a&o)+t[14]-1502002290|0)<<17|n>>>15)+a|0)&a|~n&r)+t[15]+1236535329|0)<<22|o>>>10)+n|0,o=((o+=((n=((n+=((a=((a+=((r=((r+=(o&a|n&~a)+t[1]-165796510|0)<<5|r>>>27)+o|0)&n|o&~n)+t[6]-1069501632|0)<<9|a>>>23)+r|0)&o|r&~o)+t[11]+643717713|0)<<14|n>>>18)+a|0)&r|a&~r)+t[0]-373897302|0)<<20|o>>>12)+n|0,o=((o+=((n=((n+=((a=((a+=((r=((r+=(o&a|n&~a)+t[5]-701558691|0)<<5|r>>>27)+o|0)&n|o&~n)+t[10]+38016083|0)<<9|a>>>23)+r|0)&o|r&~o)+t[15]-660478335|0)<<14|n>>>18)+a|0)&r|a&~r)+t[4]-405537848|0)<<20|o>>>12)+n|0,o=((o+=((n=((n+=((a=((a+=((r=((r+=(o&a|n&~a)+t[9]+568446438|0)<<5|r>>>27)+o|0)&n|o&~n)+t[14]-1019803690|0)<<9|a>>>23)+r|0)&o|r&~o)+t[3]-187363961|0)<<14|n>>>18)+a|0)&r|a&~r)+t[8]+1163531501|0)<<20|o>>>12)+n|0,o=((o+=((n=((n+=((a=((a+=((r=((r+=(o&a|n&~a)+t[13]-1444681467|0)<<5|r>>>27)+o|0)&n|o&~n)+t[2]-51403784|0)<<9|a>>>23)+r|0)&o|r&~o)+t[7]+1735328473|0)<<14|n>>>18)+a|0)&r|a&~r)+t[12]-1926607734|0)<<20|o>>>12)+n|0,o=((o+=((n=((n+=((a=((a+=((r=((r+=(o^n^a)+t[5]-378558|0)<<4|r>>>28)+o|0)^o^n)+t[8]-2022574463|0)<<11|a>>>21)+r|0)^r^o)+t[11]+1839030562|0)<<16|n>>>16)+a|0)^a^r)+t[14]-35309556|0)<<23|o>>>9)+n|0,o=((o+=((n=((n+=((a=((a+=((r=((r+=(o^n^a)+t[1]-1530992060|0)<<4|r>>>28)+o|0)^o^n)+t[4]+1272893353|0)<<11|a>>>21)+r|0)^r^o)+t[7]-155497632|0)<<16|n>>>16)+a|0)^a^r)+t[10]-1094730640|0)<<23|o>>>9)+n|0,o=((o+=((n=((n+=((a=((a+=((r=((r+=(o^n^a)+t[13]+681279174|0)<<4|r>>>28)+o|0)^o^n)+t[0]-358537222|0)<<11|a>>>21)+r|0)^r^o)+t[3]-722521979|0)<<16|n>>>16)+a|0)^a^r)+t[6]+76029189|0)<<23|o>>>9)+n|0,o=((o+=((n=((n+=((a=((a+=((r=((r+=(o^n^a)+t[9]-640364487|0)<<4|r>>>28)+o|0)^o^n)+t[12]-421815835|0)<<11|a>>>21)+r|0)^r^o)+t[15]+530742520|0)<<16|n>>>16)+a|0)^a^r)+t[2]-995338651|0)<<23|o>>>9)+n|0,o=((o+=((a=((a+=(o^((r=((r+=(n^(o|~a))+t[0]-198630844|0)<<6|r>>>26)+o|0)|~n))+t[7]+1126891415|0)<<10|a>>>22)+r|0)^((n=((n+=(r^(a|~o))+t[14]-1416354905|0)<<15|n>>>17)+a|0)|~r))+t[5]-57434055|0)<<21|o>>>11)+n|0,o=((o+=((a=((a+=(o^((r=((r+=(n^(o|~a))+t[12]+1700485571|0)<<6|r>>>26)+o|0)|~n))+t[3]-1894986606|0)<<10|a>>>22)+r|0)^((n=((n+=(r^(a|~o))+t[10]-1051523|0)<<15|n>>>17)+a|0)|~r))+t[1]-2054922799|0)<<21|o>>>11)+n|0,o=((o+=((a=((a+=(o^((r=((r+=(n^(o|~a))+t[8]+1873313359|0)<<6|r>>>26)+o|0)|~n))+t[15]-30611744|0)<<10|a>>>22)+r|0)^((n=((n+=(r^(a|~o))+t[6]-1560198380|0)<<15|n>>>17)+a|0)|~r))+t[13]+1309151649|0)<<21|o>>>11)+n|0,o=((o+=((a=((a+=(o^((r=((r+=(n^(o|~a))+t[4]-145523070|0)<<6|r>>>26)+o|0)|~n))+t[11]-1120210379|0)<<10|a>>>22)+r|0)^((n=((n+=(r^(a|~o))+t[2]+718787259|0)<<15|n>>>17)+a|0)|~r))+t[9]-343485551|0)<<21|o>>>11)+n|0,e[0]=r+e[0]|0,e[1]=o+e[1]|0,e[2]=n+e[2]|0,e[3]=a+e[3]|0}function o(e){var t,r=[];for(t=0;t<64;t+=4)r[t>>2]=e.charCodeAt(t)+(e.charCodeAt(t+1)<<8)+(e.charCodeAt(t+2)<<16)+(e.charCodeAt(t+3)<<24);return r}function n(e){var t,r=[];for(t=0;t<64;t+=4)r[t>>2]=e[t]+(e[t+1]<<8)+(e[t+2]<<16)+(e[t+3]<<24);return r}function a(e){var t,n,a,i,p,y,f=e.length,u=[1732584193,-271733879,-1732584194,271733878];for(t=64;t<=f;t+=64)r(u,o(e.substring(t-64,t)));for(n=(e=e.substring(t-64)).length,a=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t=0;t<n;t+=1)a[t>>2]|=e.charCodeAt(t)<<(t%4<<3);if(a[t>>2]|=128<<(t%4<<3),t>55)for(r(u,a),t=0;t<16;t+=1)a[t]=0;return i=(i=8*f).toString(16).match(/(.*?)(.{0,8})$/),p=parseInt(i[2],16),y=parseInt(i[1],16)||0,a[14]=p,a[15]=y,r(u,a),u}function i(e){var t,o,a,i,p,y,f=e.length,u=[1732584193,-271733879,-1732584194,271733878];for(t=64;t<=f;t+=64)r(u,n(e.subarray(t-64,t)));for(o=(e=t-64<f?e.subarray(t-64):new Uint8Array(0)).length,a=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t=0;t<o;t+=1)a[t>>2]|=e[t]<<(t%4<<3);if(a[t>>2]|=128<<(t%4<<3),t>55)for(r(u,a),t=0;t<16;t+=1)a[t]=0;return i=(i=8*f).toString(16).match(/(.*?)(.{0,8})$/),p=parseInt(i[2],16),y=parseInt(i[1],16)||0,a[14]=p,a[15]=y,r(u,a),u}function p(e){var r,o="";for(r=0;r<4;r+=1)o+=t[e>>8*r+4&15]+t[e>>8*r&15];return o}function y(e){var t;for(t=0;t<e.length;t+=1)e[t]=p(e[t]);return e.join("")}function f(e){return/[\u0080-\uFFFF]/.test(e)&&(e=unescape(encodeURIComponent(e))),e}function u(e,t){var r,o=e.length,n=new ArrayBuffer(o),a=new Uint8Array(n);for(r=0;r<o;r+=1)a[r]=e.charCodeAt(r);return t?a:n}function s(e){return String.fromCharCode.apply(null,new Uint8Array(e))}function l(e,t,r){var o=new Uint8Array(e.byteLength+t.byteLength);return o.set(new Uint8Array(e)),o.set(new Uint8Array(t),e.byteLength),r?o:o.buffer}function c(e){var t,r=[],o=e.length;for(t=0;t<o-1;t+=2)r.push(parseInt(e.substr(t,2),16));return String.fromCharCode.apply(String,r)}function d(){this.reset()}return y(a("hello")),"undefined"==typeof ArrayBuffer||ArrayBuffer.prototype.slice||function(){function t(e,t){return(e=0|e||0)<0?Math.max(e+t,0):Math.min(e,t)}ArrayBuffer.prototype.slice=function(r,o){var n,a,i,p,y=this.byteLength,f=t(r,y),u=y;return o!==e&&(u=t(o,y)),f>u?new ArrayBuffer(0):(n=u-f,a=new ArrayBuffer(n),i=new Uint8Array(a),p=new Uint8Array(this,f,n),i.set(p),a)}}(),d.prototype.append=function(e){return this.appendBinary(f(e)),this},d.prototype.appendBinary=function(e){this._buff+=e,this._length+=e.length;var t,n=this._buff.length;for(t=64;t<=n;t+=64)r(this._hash,o(this._buff.substring(t-64,t)));return this._buff=this._buff.substring(t-64),this},d.prototype.end=function(e){var t,r,o=this._buff,n=o.length,a=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(t=0;t<n;t+=1)a[t>>2]|=o.charCodeAt(t)<<(t%4<<3);return this._finish(a,n),r=y(this._hash),e&&(r=c(r)),this.reset(),r},d.prototype.reset=function(){return this._buff="",this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},d.prototype.getState=function(){return{buff:this._buff,length:this._length,hash:this._hash.slice()}},d.prototype.setState=function(e){return this._buff=e.buff,this._length=e.length,this._hash=e.hash,this},d.prototype.destroy=function(){delete this._hash,delete this._buff,delete this._length},d.prototype._finish=function(e,t){var o,n,a,i=t;if(e[i>>2]|=128<<(i%4<<3),i>55)for(r(this._hash,e),i=0;i<16;i+=1)e[i]=0;o=(o=8*this._length).toString(16).match(/(.*?)(.{0,8})$/),n=parseInt(o[2],16),a=parseInt(o[1],16)||0,e[14]=n,e[15]=a,r(this._hash,e)},d.hash=function(e,t){return d.hashBinary(f(e),t)},d.hashBinary=function(e,t){var r=y(a(e));return t?c(r):r},d.ArrayBuffer=function(){this.reset()},d.ArrayBuffer.prototype.append=function(e){var t,o=l(this._buff.buffer,e,!0),a=o.length;for(this._length+=e.byteLength,t=64;t<=a;t+=64)r(this._hash,n(o.subarray(t-64,t)));return this._buff=t-64<a?new Uint8Array(o.buffer.slice(t-64)):new Uint8Array(0),this},d.ArrayBuffer.prototype.end=function(e){var t,r,o=this._buff,n=o.length,a=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(t=0;t<n;t+=1)a[t>>2]|=o[t]<<(t%4<<3);return this._finish(a,n),r=y(this._hash),e&&(r=c(r)),this.reset(),r},d.ArrayBuffer.prototype.reset=function(){return this._buff=new Uint8Array(0),this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},d.ArrayBuffer.prototype.getState=function(){var e=d.prototype.getState.call(this);return e.buff=s(e.buff),e},d.ArrayBuffer.prototype.setState=function(e){return e.buff=u(e.buff,!0),d.prototype.setState.call(this,e)},d.ArrayBuffer.prototype.destroy=d.prototype.destroy,d.ArrayBuffer.prototype._finish=d.prototype._finish,d.ArrayBuffer.hash=function(e,t){var r=y(i(new Uint8Array(e)));return t?c(r):r},d}();var ne=g({setup(g){let A=e(""),b=e(0),v=e("暂停"),m=e(!1),P=e(!1),S=e(!1);const w=async e=>{console.log("tempFiles===",e);const t=await function(e,t="base64"){return new Promise((r=>{const o=new FileReader;"base64"===t?o.readAsDataURL(e):"buffer"===t&&o.readAsArrayBuffer(e),o.onload=e=>r(e.target.result)}))}(e,"buffer"),r=new oe.ArrayBuffer;let o;r.append(t),F.value=r.end(),o=/\.([0-9a-zA-Z]+)$/i.exec(e.name)[1];let n=e.size/100,a=0;for(let i=0;i<100;i++){let t={chunk:e.slice(a,a+n),filename:`${F.value}_${i}_.${o}`};a+=n,I.value.push(t)}E()},_=()=>{f({sourceType:["camera","album"],success:function(e){console.log("res===",e),A.value=e.tempFilePath,w(e.tempFile)}})};let F=e(""),I=e([]);e([]),e(0),e(0);const U=()=>{console.log("去调用接口合并文件");(e=>h("/files/mergeFile","GET",e))({hash:F.value}).then((e=>{console.log("data===",e),m.value=!1,b.value=100}))},O=(e,t)=>new Promise((t=>{const r=URL.createObjectURL(e.chunk);console.log("blobUrl===",r),d({url:"/upload/files/uploadLargeFile",filePath:r,name:"file",fileType:"video",formData:{filename:e.filename},success:e=>{console.log("uploadFileRes===",e),t(e)}})})),E=async()=>{let e=0;console.log("partList.value.length=",I.value.length),m.value=!0,v.value="暂停";for(let t of I.value){if(S.value)return;await O(t),e++,b.value=e,console.log("progressPercent.value===",b.value),e>=I.value.length&&U()}},R=()=>{P.value?(v.value="继续",P.value=!1,S.value=!0):(v.value="暂停",P.value=!0,S.value=!1,E())};return e(""),e(0),(e,f)=>{const d=u,h=s,g=l,A=c;return t(),r(g,{class:"share-wraper"},{default:o((()=>[n(' <uni-file-picker\r\n      file-mediatype="all"\r\n      @select="onSelect"\r\n      @progress="onProgress"\r\n      @success="success"\r\n      @fail="fail"\r\n    >\r\n      <button>选择文件</button>\r\n    </uni-file-picker> '),n(' <view class="progress-large-file"> '),a(d,{percent:i(b),active:"",fontSize:24,activeColor:"#00f","show-info":"","stroke-width":"3"},null,8,["percent"]),a(g,{class:"upload-text"},{default:o((()=>[i(m)?(t(),r(h,{key:0,onClick:R},{default:o((()=>[p(y(i(v)),1)])),_:1})):n("v-if",!0)])),_:1}),n(" </view> "),n(' <progress :percent="80" active :fontSize="24" activeColor="#00f" show-info stroke-width="3"/> '),a(g,null,{default:o((()=>[a(A,{onClick:_},{default:o((()=>[p("上传视频")])),_:1}),n(' <video :src="src"></video> ')])),_:1}),n(' <view>\r\n      <uni-file-picker\r\n        file-mediatype="image"\r\n        @select="onSelectImage"\r\n        @progress="progressImages"\r\n        @success="successImage"\r\n        @fail="failImage"\r\n      >\r\n        <button>选择图片</button>\r\n      </uni-file-picker>\r\n      <progress\r\n        :percent="progressImage"\r\n        active\r\n        :fontSize="24"\r\n        activeColor="#00f"\r\n        show-info\r\n        stroke-width="3"\r\n      />\r\n    </view> ')])),_:1})}}},[["__scopeId","data-v-4dc07da6"]]);export{ne as default};