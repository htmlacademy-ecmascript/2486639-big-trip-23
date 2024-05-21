/*! For license information please see bundle.1d1a7dfa7381c148a1c6.js.LICENSE.txt */
(()=>{var e={10:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});var s=n(537),i=n.n(s),r=n(645),o=n.n(r)()(i());o.push([e.id,".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n","",{version:3,sources:["webpack://./src/framework/view/abstract-view.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;;;;;IAKE,2BAA2B;EAC7B;;EAEA;;;;IAIE,0BAA0B;EAC5B;AACF",sourcesContent:[".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n"],sourceRoot:""}]);const a=o},645:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",s=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),s&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),s&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,s,i,r){"string"==typeof e&&(e=[[null,e,void 0]]);var o={};if(s)for(var a=0;a<this.length;a++){var l=this[a][0];null!=l&&(o[l]=!0)}for(var c=0;c<e.length;c++){var u=[].concat(e[c]);s&&o[u[0]]||(void 0!==r&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=r),n&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=n):u[2]=n),i&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=i):u[4]="".concat(i)),t.push(u))}},t}},537:e=>{"use strict";e.exports=function(e){var t=e[1],n=e[3];if(!n)return t;if("function"==typeof btoa){var s=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),i="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),r="/*# ".concat(i," */");return[t].concat([r]).join("\n")}return[t].join("\n")}},484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",s="second",i="minute",r="hour",o="day",a="week",l="month",c="quarter",u="year",d="date",v="Invalid Date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,m=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,p={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},f=function(e,t,n){var s=String(e);return!s||s.length>=t?e:""+Array(t+1-s.length).join(n)+e},E={s:f,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),s=Math.floor(n/60),i=n%60;return(t<=0?"+":"-")+f(s,2,"0")+":"+f(i,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var s=12*(n.year()-t.year())+(n.month()-t.month()),i=t.clone().add(s,l),r=n-i<0,o=t.clone().add(s+(r?-1:1),l);return+(-(s+(n-i)/(r?i-o:o-i))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:l,y:u,w:a,d:o,D:d,h:r,m:i,s,ms:n,Q:c}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},_="en",g={};g[_]=p;var y="$isDayjsObject",$=function(e){return e instanceof w||!(!e||!e[y])},C=function e(t,n,s){var i;if(!t)return _;if("string"==typeof t){var r=t.toLowerCase();g[r]&&(i=r),n&&(g[r]=n,i=r);var o=t.split("-");if(!i&&o.length>1)return e(o[0])}else{var a=t.name;g[a]=t,i=a}return!s&&i&&(_=i),i||!s&&_},b=function(e,t){if($(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new w(n)},M=E;M.l=C,M.i=$,M.w=function(e,t){return b(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var w=function(){function p(e){this.$L=C(e.locale,null,!0),this.parse(e),this.$x=this.$x||e.x||{},this[y]=!0}var f=p.prototype;return f.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(M.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var s=t.match(h);if(s){var i=s[2]-1||0,r=(s[7]||"0").substring(0,3);return n?new Date(Date.UTC(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)):new Date(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)}}return new Date(t)}(e),this.init()},f.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},f.$utils=function(){return M},f.isValid=function(){return!(this.$d.toString()===v)},f.isSame=function(e,t){var n=b(e);return this.startOf(t)<=n&&n<=this.endOf(t)},f.isAfter=function(e,t){return b(e)<this.startOf(t)},f.isBefore=function(e,t){return this.endOf(t)<b(e)},f.$g=function(e,t,n){return M.u(e)?this[t]:this.set(n,e)},f.unix=function(){return Math.floor(this.valueOf()/1e3)},f.valueOf=function(){return this.$d.getTime()},f.startOf=function(e,t){var n=this,c=!!M.u(t)||t,v=M.p(e),h=function(e,t){var s=M.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return c?s:s.endOf(o)},m=function(e,t){return M.w(n.toDate()[e].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},p=this.$W,f=this.$M,E=this.$D,_="set"+(this.$u?"UTC":"");switch(v){case u:return c?h(1,0):h(31,11);case l:return c?h(1,f):h(0,f+1);case a:var g=this.$locale().weekStart||0,y=(p<g?p+7:p)-g;return h(c?E-y:E+(6-y),f);case o:case d:return m(_+"Hours",0);case r:return m(_+"Minutes",1);case i:return m(_+"Seconds",2);case s:return m(_+"Milliseconds",3);default:return this.clone()}},f.endOf=function(e){return this.startOf(e,!1)},f.$set=function(e,t){var a,c=M.p(e),v="set"+(this.$u?"UTC":""),h=(a={},a[o]=v+"Date",a[d]=v+"Date",a[l]=v+"Month",a[u]=v+"FullYear",a[r]=v+"Hours",a[i]=v+"Minutes",a[s]=v+"Seconds",a[n]=v+"Milliseconds",a)[c],m=c===o?this.$D+(t-this.$W):t;if(c===l||c===u){var p=this.clone().set(d,1);p.$d[h](m),p.init(),this.$d=p.set(d,Math.min(this.$D,p.daysInMonth())).$d}else h&&this.$d[h](m);return this.init(),this},f.set=function(e,t){return this.clone().$set(e,t)},f.get=function(e){return this[M.p(e)]()},f.add=function(n,c){var d,v=this;n=Number(n);var h=M.p(c),m=function(e){var t=b(v);return M.w(t.date(t.date()+Math.round(e*n)),v)};if(h===l)return this.set(l,this.$M+n);if(h===u)return this.set(u,this.$y+n);if(h===o)return m(1);if(h===a)return m(7);var p=(d={},d[i]=e,d[r]=t,d[s]=1e3,d)[h]||1,f=this.$d.getTime()+n*p;return M.w(f,this)},f.subtract=function(e,t){return this.add(-1*e,t)},f.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||v;var s=e||"YYYY-MM-DDTHH:mm:ssZ",i=M.z(this),r=this.$H,o=this.$m,a=this.$M,l=n.weekdays,c=n.months,u=n.meridiem,d=function(e,n,i,r){return e&&(e[n]||e(t,s))||i[n].slice(0,r)},h=function(e){return M.s(r%12||12,e,"0")},p=u||function(e,t,n){var s=e<12?"AM":"PM";return n?s.toLowerCase():s};return s.replace(m,(function(e,s){return s||function(e){switch(e){case"YY":return String(t.$y).slice(-2);case"YYYY":return M.s(t.$y,4,"0");case"M":return a+1;case"MM":return M.s(a+1,2,"0");case"MMM":return d(n.monthsShort,a,c,3);case"MMMM":return d(c,a);case"D":return t.$D;case"DD":return M.s(t.$D,2,"0");case"d":return String(t.$W);case"dd":return d(n.weekdaysMin,t.$W,l,2);case"ddd":return d(n.weekdaysShort,t.$W,l,3);case"dddd":return l[t.$W];case"H":return String(r);case"HH":return M.s(r,2,"0");case"h":return h(1);case"hh":return h(2);case"a":return p(r,o,!0);case"A":return p(r,o,!1);case"m":return String(o);case"mm":return M.s(o,2,"0");case"s":return String(t.$s);case"ss":return M.s(t.$s,2,"0");case"SSS":return M.s(t.$ms,3,"0");case"Z":return i}return null}(e)||i.replace(":","")}))},f.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},f.diff=function(n,d,v){var h,m=this,p=M.p(d),f=b(n),E=(f.utcOffset()-this.utcOffset())*e,_=this-f,g=function(){return M.m(m,f)};switch(p){case u:h=g()/12;break;case l:h=g();break;case c:h=g()/3;break;case a:h=(_-E)/6048e5;break;case o:h=(_-E)/864e5;break;case r:h=_/t;break;case i:h=_/e;break;case s:h=_/1e3;break;default:h=_}return v?h:M.a(h)},f.daysInMonth=function(){return this.endOf(l).$D},f.$locale=function(){return g[this.$L]},f.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),s=C(e,t,!0);return s&&(n.$L=s),n},f.clone=function(){return M.w(this.$d,this)},f.toDate=function(){return new Date(this.valueOf())},f.toJSON=function(){return this.isValid()?this.toISOString():null},f.toISOString=function(){return this.$d.toISOString()},f.toString=function(){return this.$d.toUTCString()},p}(),F=w.prototype;return b.prototype=F,[["$ms",n],["$s",s],["$m",i],["$H",r],["$W",o],["$M",l],["$y",u],["$D",d]].forEach((function(e){F[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),b.extend=function(e,t){return e.$i||(e(t,w,b),e.$i=!0),b},b.locale=C,b.isDayjs=$,b.unix=function(e){return b(1e3*e)},b.en=g[_],b.Ls=g,b.p={},b}()},379:e=>{"use strict";var t=[];function n(e){for(var n=-1,s=0;s<t.length;s++)if(t[s].identifier===e){n=s;break}return n}function s(e,s){for(var r={},o=[],a=0;a<e.length;a++){var l=e[a],c=s.base?l[0]+s.base:l[0],u=r[c]||0,d="".concat(c," ").concat(u);r[c]=u+1;var v=n(d),h={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==v)t[v].references++,t[v].updater(h);else{var m=i(h,s);s.byIndex=a,t.splice(a,0,{identifier:d,updater:m,references:1})}o.push(d)}return o}function i(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,i){var r=s(e=e||[],i=i||{});return function(e){e=e||[];for(var o=0;o<r.length;o++){var a=n(r[o]);t[a].references--}for(var l=s(e,i),c=0;c<r.length;c++){var u=n(r[c]);0===t[u].references&&(t[u].updater(),t.splice(u,1))}r=l}}},569:e=>{"use strict";var t={};e.exports=function(e,n){var s=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(n)}},216:e=>{"use strict";e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{"use strict";e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{"use strict";e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var s="";n.supports&&(s+="@supports (".concat(n.supports,") {")),n.media&&(s+="@media ".concat(n.media," {"));var i=void 0!==n.layer;i&&(s+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),s+=n.css,i&&(s+="}"),n.media&&(s+="}"),n.supports&&(s+="}");var r=n.sourceMap;r&&"undefined"!=typeof btoa&&(s+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),t.styleTagTransform(s,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{"use strict";e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function n(s){var i=t[s];if(void 0!==i)return i.exports;var r=t[s]={id:s,exports:{}};return e[s].call(r.exports,r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var s in t)n.o(t,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.nc=void 0,(()=>{"use strict";var e=n(379),t=n.n(e),s=n(795),i=n.n(s),r=n(569),o=n.n(r),a=n(565),l=n.n(a),c=n(216),u=n.n(c),d=n(589),v=n.n(d),h=n(10),m={};m.styleTagTransform=v(),m.setAttributes=l(),m.insert=o().bind(null,"head"),m.domAPI=i(),m.insertStyleElement=u(),t()(h.Z,m),h.Z&&h.Z.locals&&h.Z.locals;const p="shake";class f{#e=null;constructor(){if(new.target===f)throw new Error("Can't instantiate AbstractView, only concrete one.")}get element(){return this.#e||(this.#e=function(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}(this.template)),this.#e}get template(){throw new Error("Abstract method not implemented: get template")}removeElement(){this.#e=null}shake(e){this.element.classList.add(p),setTimeout((()=>{this.element.classList.remove(p),e?.()}),600)}}function E(e,t,n="beforeend"){if(!(e instanceof f))throw new Error("Can render only components");if(null===t)throw new Error("Container element doesn't exist");t.insertAdjacentElement(n,e.element)}function _(e,t){if(!(e instanceof f&&t instanceof f))throw new Error("Can replace only components");const n=e.element,s=t.element,i=s.parentElement;if(null===i)throw new Error("Parent element doesn't exist");i.replaceChild(n,s)}function g(e){if(null!==e){if(!(e instanceof f))throw new Error("Can remove only components");e.element.remove(),e.removeElement()}}const y=e=>!Array.isArray(e)||!e.length,$=e=>"INPUT"===e.tagName,C=(e,t,n="id")=>e.findIndex((e=>e[n]===t)),b=(e,t,n="id")=>e[C(e,t,n)],M=(e=0,t=0)=>{const n=Math.abs(e),s=Math.abs(t),i=Math.min(n,s),r=Math.max(n,s),o=Math.ceil(i),a=Math.floor(r),l=Math.random()*(a-o+1)+o;return Math.floor(l)},w=()=>{const e=M(0,1);return Boolean(e)},F=(e,t)=>{const n=new Date,s=t.getTime()-e.getTime();return n.setTime(e.getTime()+Math.random()*s),n},D=(e,t)=>{const n=F(e,t);return{dateFrom:n,dateTo:F(n,t)}},A=e=>y(e)?null:e[M(0,e.length-1)],S=(e=[],t=1,n=1)=>{if(!e||t<1||n<0)return[];const{length:s}=e;if(!s)return[];if(1===t)return[A(e)];if(t>=s)return structuredClone(e);const i=((e=0,t=0)=>{const n=[];return()=>{let s=M(e,t);if(n.length>=t-e+1)return null;for(;n.includes(s);)s=M(e,t);return n.push(s),s}})(0,s-1);return Array.from({length:M(n,t)},(()=>e[i()]))},T={MIN:new Date(2024,0,1),MAX:new Date(2024,5,1)},O=["Amsterdam","Geneva","Chamonix","Moscow","Tomsk","Tokyo","New York","London"],k={TITLES:["Travel by train","Choose seats","Add meal","Switch to comfort class","Add luggage","Order Uber","Rent a car","Add breakfast","Book tickets","Lunch in city"],PRICES:[40,5,15,100,30,20,200,50,40,30]},N={DESCRIPTIONS:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus".split(".").map((e=>`${e.trim()}.`)),MAX_COUNT:5};var x=n(484),I=n.n(x);const P=e=>e.charAt(0).toUpperCase()+e.slice(1),L=e=>e<10?`0${e}`:e.toString(),B="DD/MM/YY HH:mm",H="DD MMM",Y="YYYY-MM-DDTHH:mm",R="HH:mm",j=(e,t)=>e?I()(e).format(t):"",q=(e,t)=>I()(t).diff(e,"minute");class U extends f{#t=null;constructor(e){super(),this.#t=e}get template(){return(({title:e,dateFrom:t,dateTo:n,cost:s})=>`<section class="trip-main__trip-info  trip-info">\n  <div class="trip-info__main">\n    <h1 class="trip-info__title">${e}</h1>\n    <p class="trip-info__dates">${j(t,H)}&nbsp;—&nbsp;${j(n,H)}</p>\n  </div>\n  <p class="trip-info__cost">\n    Total: €&nbsp;<span class="trip-info__cost-value">${s}</span>\n  </p>\n</section>`)(this.#t)}}class G{#n=null;#s=null;constructor({containerElement:e,eventsModel:t}){this.#n=e,this.#s=t}init(){const{events:e,destinations:t}=this.#s;e.length&&E(new U((e=>{const t=S(e,3,3).map((e=>e.name)).join(" — "),{dateFrom:n,dateTo:s}=D(T.MIN,T.MAX);return{title:t,dateFrom:n,dateTo:s,cost:M(1e4,2e4)}})(t)),this.#n,"afterbegin")}}const W=(e,t,...n)=>{if(e instanceof Array)return e?e.map((e=>t(e,...n))).join(" "):"";if(e instanceof Map){const s=[];return e.forEach(((e,i)=>{s.push(t(e,i,...n))})),s.join("")}return e instanceof Object?Object.entries(e).map((([e,s])=>t(s,e,...n))).join(""):""},X=({title:e,price:t})=>`<li class="event__offer">\n  <span class="event__offer-title">${e}</span>\n  +€&nbsp;\n  <span class="event__offer-price">${t}</span>\n</li>`;class V extends f{#i=null;#r=null;#o=[];#a=null;#l=null;constructor({event:e,destinationName:t,eventOffers:n,onFavoriteClick:s,onEditClick:i}){super(),this.#i=e,this.#r=t,this.#o=n,this.#a=s,this.#l=i,this.element.querySelector(".event__favorite-btn").addEventListener("click",this.#c),this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#u)}get template(){return((e,t,n)=>{const{type:s,basePrice:i,dateFrom:r,dateTo:o,isFavorite:a}=e,l=j(r,"YYYY-MM-DD"),c=j(r,"MMM DD"),u=j(r,Y),d=j(r,R),v=j(o,Y),h=j(o,R);return`<li class="trip-events__item">\n  <div class="event">\n    <time class="event__date" datetime="${l}">${c}</time>\n    <div class="event__type">\n      <img class="event__type-icon" width="42" height="42" src="img/icons/${s}.png" alt="Event type icon">\n    </div>\n    <h3 class="event__title">${P(s)} ${t}</h3>\n    <div class="event__schedule">\n      <p class="event__time">\n        <time class="event__start-time" datetime="${u}">${d}</time>\n        —\n        <time class="event__end-time" datetime="${v}">${h}</time>\n      </p>\n      <p class="event__duration">${((e,t)=>{const n=q(e,t),s=n%60,i=(n-s)/60,r=i%24,o=(i-r)/24,a=[];return o>0&&a.push(L(o),"D "),(r>0||o>0)&&a.push(L(r),"H "),a.push(L(s),"M"),a.join("")})(r,o)}</p>\n    </div>\n    <p class="event__price">\n      €&nbsp;<span class="event__price-value">${i}</span>\n    </p>\n    ${m=n,`<h4 class="visually-hidden">Offers:</h4>\n<ul class="event__selected-offers">\n    ${W(m,X)}\n</ul>`}\n    <button class="event__favorite-btn ${a?"event__favorite-btn--active":""}" type="button">\n      <span class="visually-hidden">Add to favorite</span>\n      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>\n      </svg>\n    </button>\n    <button class="event__rollup-btn" type="button">\n      <span class="visually-hidden">Open event</span>\n    </button>\n  </div>\n</li>`;var m})(this.#i,this.#r,this.#o)}#c=()=>{this.#a()};#u=()=>{this.#l()}}class Z extends f{_state={};updateElement(e){e&&(this._setState(e),this.#d())}_restoreHandlers(){throw new Error("Abstract method not implemented: restoreHandlers")}_setState(e){this._state=structuredClone({...this._state,...e})}#d(){const e=this.element,t=e.parentElement;this.removeElement();const n=this.element;t.replaceChild(n,e),this._restoreHandlers()}}const z=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"],J={id:null,type:z[5],basePrice:0,dateFrom:null,dateTo:null,isFavorite:!1,offers:[],destanation:null},K={EVERYTHING:"everything",FUTURE:"future",PRESENT:"present",PAST:"past"},Q=K.EVERYTHING,ee=[K.FUTURE,K.PAST],te={DAY:"day",EVENT:"event",TIME:"time",PRICE:"price",OFFERS:"offers"},ne=te.DAY,se=[te.EVENT,te.OFFERS],ie=(e,t)=>`<div class="event__type-item">\n  <input id="event-type-${e}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${e}" ${e===t?"checked":""}>\n  <label class="event__type-label  event__type-label--${e}" for="event-type-${e}-1">${P(e)}</label>\n</div>`,re=({name:e})=>`<option value="${e}"></option>`,oe=({id:e,name:t,title:n,price:s},i)=>`<div class="event__offer-selector">\n  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${e}" type="checkbox" name="${t}" data-offer-id="${e}" ${i.includes(e)?"checked":""}>\n  <label class="event__offer-label" for="event-offer-${e}">\n    <span class="event__offer-title">${n}</span>\n    +€&nbsp;\n    <span class="event__offer-price">${s}</span>\n  </label>\n</div>`,ae=({src:e,description:t})=>`<img class="event__photo" src="${e}" alt="${t}">`,le=(e,t,n)=>!y(e)||n?.description?`<section class="event__details">\n  ${((e,t)=>y(e)?"":`<div class="event__offer-selector">\n  <section class="event__section  event__section--offers">\n    <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n    <div class="event__available-offers">\n      ${W(e,oe,t)}\n    </div>\n</section>`)(e,t)}\n  ${n?(({description:e,pictures:t})=>e?`<section class="event__section  event__section--destination">\n  <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n  <p class="event__destination-description">${e}</p>\n  ${(e=>y(e)?"":`<div class="event__photos-container">\n  <div class="event__photos-tape">\n    ${W(e,ae)}\n  </div>\n</div>`)(t)}\n</section>`:"")(n):""}\n</section>`:"";class ce extends Z{#v=null;#h=!1;#m=null;#p=null;#f=null;#E=null;#_=null;#g=null;constructor({event:e,destinations:t,onGetTypeOffers:n,onGetDestinationByName:s,onFormSubmit:i,onDelete:r,onFormClose:o}){super(),this.#v=e,this.#h=null===e.id,this._setState({...e}),this.#m=t,this.#p=n,this.#f=s,this.#E=i,this.#_=r,this.#g=o,this._restoreHandlers()}get template(){return((e,t,n)=>{const{type:s,destination:i,typeOffers:r,offers:o,dateFrom:a,dateTo:l,basePrice:c}=e,u=i?i.name:"",d=n?"Cancel":"Delete";return`<li class="trip-events__item">\n  <form class="event event--edit" action="#" method="post">\n    <header class="event__header">\n      <div class="event__type-wrapper">\n        <label class="event__type  event__type-btn" for="event-type-toggle-1">\n          <span class="visually-hidden">Choose event type</span>\n          <img class="event__type-icon" width="17" height="17" src="img/icons/${s}.png" alt="Event type icon">\n        </label>\n        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n          ${v=z,h=s,`<div class="event__type-list">\n  <fieldset class="event__type-group">\n    <legend class="visually-hidden">Event type</legend>\n    ${W(v,ie,h)}\n  </fieldset>\n</div>`}\n      </div>\n\n      <div class="event__field-group  event__field-group--destination">\n        <label class="event__label  event__type-output" for="event-destination-1">\n          ${P(s)}\n        </label>\n        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${u}" list="destination-list-1">\n          ${(e=>`<datalist id="destination-list-1">\n    ${W(e,re)}\n</datalist>`)(t)}\n      </div>\n\n      <div class="event__field-group  event__field-group--time">\n        <label class="visually-hidden" for="event-start-time-1">From</label>\n        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${j(a,B)}">\n        —\n        <label class="visually-hidden" for="event-end-time-1">To</label>\n        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${j(l,B)}">\n      </div>\n\n      <div class="event__field-group  event__field-group--price">\n        <label class="event__label" for="event-price-1">\n          <span class="visually-hidden">Price</span>\n          €\n        </label>\n        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${c}">\n      </div>\n\n      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n      <button class="event__reset-btn" type="reset">${d}</button>\n      ${n?"":'<button class="event__rollup-btn" type="button"><span class="visually-hidden">Open event</span></button>'}\n    </header>\n    ${le(r,o,i)}\n  </form>\n<li>`;var v,h})(this._state,this.#m,this.#h)}_restoreHandlers(){this.element.querySelector(".event__type-list").addEventListener("click",this.#y),this.element.querySelector(".event__input--destination").addEventListener("change",this.#$),this.element.querySelector(".event__input--price").addEventListener("input",this.#C),this._state.typeOffers.length&&this.element.querySelector(".event__available-offers").addEventListener("change",this.#b);const e=this.element.querySelector(".event--edit");e.addEventListener("submit",this.#M),e.addEventListener("reset",this.#w),this.element.querySelector(".event__reset-btn").addEventListener("click",this.#F),this.#h||this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#D)}resetForm(){this.element.firstElementChild.reset()}#y=e=>{if($(e.target)){e.preventDefault();const t=e.target.value,n=this.#p(e.target.value),s=[];this.updateElement({type:t,typeOffers:n,offers:s})}};#$=e=>{if($(e.target)){e.preventDefault();const t=this.#f(e.target.value);this.updateElement({destination:t})}};#C=e=>{const t=e.target.value;this._setState({basePrice:t})};#b=e=>{if($(e.target)){const{checked:t,dataset:{offerId:n}}=e.target,{offers:s}=this._state;t?s.push(n):((e,t)=>{const n=e.indexOf(t);-1!==n&&e.splice(n,1)})(s,n),this._setState({offers:s})}};#M=e=>{e.preventDefault(),this.#E(ce.parseStateToEvent(this._state))};#w=e=>{e.preventDefault(),this.updateElement({...this.#v})};#F=e=>{e.preventDefault(),this.#h?(this.resetForm(),this.#g()):this.#_(this._state.id)};#D=e=>{e.preventDefault(),this.resetForm(),this.#g()};static parseStateToEvent(e){const t={...e};return t.destination=e.destination.id,delete t.typeOffers,t}}class ue{#n=null;#s=null;#i=null;#A=null;#S=null;#T=null;#O=null;#k=null;#N=null;constructor({containerElement:e,eventsModel:t,onEventFormOpen:n,onEventFormClose:s,onEventChange:i,onEventDelete:r}){this.#n=e,this.#s=t,this.#T=n,this.#O=s,this.#k=i,this.#N=r}destroy(){g(this.#A),g(this.#S)}init(e){this.#i=e;const{destinations:t}=this.#s,{type:n,offers:s}=e,i=b(t,e.destination),r=this.#s.getTypeOffers(n),o=this.#S;this.#S=new ce({event:{...e,destination:i,typeOffers:r},destinations:t,onGetTypeOffers:this.#p,onGetDestinationByName:this.#f,onFormSubmit:this.#E,onDelete:this.#_,onFormClose:this.#g});const a=this.#A;this.#A=new V({event:e,destinationName:i?.name,eventOffers:r.filter((e=>s.includes(e.id))),onFavoriteClick:this.#a,onEditClick:this.#l}),a&&o?(_(this.#A,a),g(a),g(o)):(E(this.#A,this.#n),e.id||this.#x())}#x(){_(this.#S,this.#A),document.addEventListener("keydown",this.#I),this.#T(this)}resetEventForm=()=>{this.#S.resetForm()};closeEventForm=()=>{this.#P(),this.#O()};#P=()=>{_(this.#A,this.#S),document.removeEventListener("keydown",this.#I)};#l=()=>{this.#x()};#a=()=>{const e=!this.#i.isFavorite;this.#k({...this.#i,isFavorite:e})};#p=e=>this.#s.getTypeOffers(e);#f=e=>b(this.#s.destinations,e,"name");#E=e=>{this.#P(),this.#k({...e}),this.#O()};#_=e=>{this.#P(),this.#O(),this.#N(e)};#g=()=>{this.closeEventForm()};#I=e=>{(e=>"Escape"===e.key)(e)&&(e.preventDefault(),this.resetEventForm(),this.closeEventForm())}}class de extends f{get template(){return'<ul class="trip-events__list"></ul>'}}class ve extends f{#L="";constructor(e){super(),this.#L=e}get template(){return`<p class="trip-events__msg">${this.#L}</p>`}}class he{#n=null;#s=null;#B=[];#H=!1;#Y=new Map;#R=null;#j=new ve("Click New Event to create your first point");#q=new de;#U=null;constructor({containerElement:e,eventsModel:t,onAddNewEventClose:n}){this.#n=e,this.#s=t,this.#U=n}init(e){this.#B=e,this.#G(),this.#W()}AddEvent(){this.#H||(this.#H=!0,this.#B.length||(g(this.#j),E(this.#q,this.#n)),this.#X(J))}#G(){this.#Y.forEach((e=>e.destroy())),this.#Y.clear()}#W(){this.#B.length?(this.#B.forEach((e=>this.#X(e))),E(this.#q,this.#n)):E(this.#j,this.#n)}#X(e){const t=new ue({containerElement:this.#q.element,eventsModel:this.#s,onEventFormOpen:this.#T,onEventFormClose:this.#O,onEventChange:this.#k,onEventDelete:this.#N});t.init(e),this.#Y.set(e.id,t)}#V=()=>{this.#R&&(this.#H?this.#R.destroy():(this.#R.resetEventForm(),this.#R.closeEventForm()),this.#O())};#T=e=>{this.#V(),this.#R=e};#O=()=>{this.#R=null,this.#H&&(this.#H=!1,this.#Y.get(null).destroy(),this.#Y.delete(null),this.#B.length||E(this.#j,this.#n),this.#U())};#k=e=>{const t=this.#H?this.#B.length+1:e.id;if(this.#H){this.#H=!1;const n=this.#Y.get(null);this.#Y.delete(null),e.id=t,this.#B.push(e),this.#Y.set(t,n),this.#U()}else this.#B[C(this.#B,t)]=e;this.#Y.get(t).init(e)};#N=e=>{const t=C(this.#B,e);this.#B.splice(t,1),this.#Y.get(e).destroy(),this.#B.length||E(this.#j,this.#n)}}const me={[K.EVERYTHING]:()=>!0,[K.FUTURE]:(e,t,n)=>e>n,[K.PRESENT]:(e,t,n)=>e<=n&&t>=n,[K.PAST]:(e,t,n)=>t<n},pe=(e,t,n,s)=>`<div class="trip-filters__filter">\n  <input id="filter-${e}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${e}" ${e===n?"checked":""} ${s.includes(e)?"disabled":""}>\n  <label class="trip-filters__filter-label" for="filter-${e}">${e}</label>\n</div>`;class fe extends f{#B=[];constructor(e){super(),this.#B=e}get template(){const e=this.#B.length?this.#Z():ee;return`<form class="trip-filters" action="#" method="get">\n  ${W(K,pe,Q,e)}\n</form>`}#Z(){const e=Date.now();return Object.entries(K).map((([,e])=>e)).filter((t=>!((e,t,n)=>{const s=me[t];return e.some((e=>{const{dateFrom:t,dateTo:i}=e;return s(t,i,n)}))})(this.#B,t,e)))}}const Ee=(e,t,n,s)=>`<div class="trip-sort__item  trip-sort__item--${e}">\n  <input id="sort-${e}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${e}" ${e===n?"checked":""} ${s.includes(e)?"disabled":""} data-sorting-type="${e}">\n  <label class="trip-sort__btn" for="sort-${e}">${e}</label>\n</div>`;class _e extends f{#z=null;constructor(e){super(),this.#z=e,this.element.addEventListener("change",this.#J)}get template(){return`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n  ${W(te,Ee,ne,se)}\n</form>`}#J=e=>{this.#z(e.target.dataset.sortingType)}}const ge={[te.DAY]:(e,t)=>q(t.dateFrom,e.dateFrom),[te.TIME]:(e,t)=>q(t.dateFrom,t.dateTo)-q(e.dateFrom,e.dateTo),[te.PRICE]:(e,t)=>t.basePrice-e.basePrice},ye=new class{#m=[];#K=new Map;#B=[];constructor(){const{destinations:e,offers:t,events:n}=(e=>{const t=O.map(((e,t)=>{let n="",s=[];if(w()){n=S(N.DESCRIPTIONS,N.MAX_COUNT).join(" ");const e=((e,t)=>{const n=M(0,4);return n>0?Array.from({length:n},(()=>M(1,5))):null})();e&&(s=e.map((e=>({src:`img/photos/${e}.jpg`,description:`title - ${e}`}))))}return{id:`destination-${t}`,name:e,description:n,pictures:s}})),n=e.map((e=>{const{TITLES:t}=k;let n=[];if(w()){const s=S(t,M(0,t.length-1));s&&(n=s.map((n=>{const s=t.indexOf(n),i=`${e}-offer-${s}`;return{id:`${i}-1`,name:i,title:n,price:k.PRICES[s]}})))}return{type:e,offers:n}})),s=Array.from({length:M(0,10)},((s,i)=>((e,t,n,s)=>{const i=M(1e3,5e3),r=((e,t)=>{const n=e.filter((e=>e.type===t))[0]?.offers;return n?n.map((e=>e.id)):[]})(n,t),o=r?S(r,r.length-1):[],{dateFrom:a,dateTo:l}=D(T.MIN,T.MAX);return{id:e,type:t,basePrice:i,dateFrom:a,dateTo:l,isFavorite:w(),offers:o,destination:A(s.map((e=>e.id)))}})(i+1,A(e),n,t)));return{destinations:t,offers:n,events:s}})(z);this.#m=e,t.forEach((({type:e,offers:t})=>{this.#K.set(e,{name,offers:t})})),this.#B=n}get destinations(){return this.#m}get offers(){return this.#K}get events(){return[...this.#B]}getTypeOffers(e){const t=this.#K.get(e);return t?t.offers:[]}},$e=new class{#n=null;#s=null;#Q=null;#ee=null;#te=null;#ne=null;#se=null;#ie=null;#re=null;#B=[];#oe=ne;constructor({containerElement:e,eventsModel:t}){this.#n=e,this.#s=t;const n=e.querySelector(".page-header__container"),s=n.querySelector(".trip-main");this.#te=n.querySelector(".trip-controls__filters"),this.#ne=e.querySelector(".trip-events"),this.#Q=new G({containerElement:s,eventsModel:t}),this.#ee=new he({containerElement:this.#ne,eventsModel:t,onAddNewEventClose:this.#U}),this.#ie=new fe(t.events),this.#re=new _e(this.#z),this.#se=n.querySelector(".trip-main__event-add-btn"),this.#se.addEventListener("click",this.#ae)}init(){this.#B=this.#s.events,this.#le()}#le(){this.#ce(),this.#ue(),this.#de()}#ce(){this.#Q.init()}#ue(){E(this.#ie,this.#te)}#de(){this.#B.length&&(E(this.#re,this.#ne),this.#B.filter((()=>!0)),this.#B.sort(ge[this.#oe])),this.#ee.init(this.#B)}#U=()=>{this.#se.disabled=!1};#ae=e=>{e.preventDefault(),this.#se.disabled=!0,this.#ee.AddEvent()};#z=e=>{this.#oe=e,this.#de()}}({containerElement:document.body,eventsModel:ye});$e.init()})()})();
//# sourceMappingURL=bundle.1d1a7dfa7381c148a1c6.js.map