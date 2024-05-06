/*! For license information please see bundle.e985dca9944f3a225bc2.js.LICENSE.txt */
(()=>{var e={484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",s="second",i="minute",r="hour",a="day",o="week",l="month",c="quarter",u="year",d="date",f="Invalid Date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,p=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},m=function(e,t,n){var s=String(e);return!s||s.length>=t?e:""+Array(t+1-s.length).join(n)+e},_={s:m,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),s=Math.floor(n/60),i=n%60;return(t<=0?"+":"-")+m(s,2,"0")+":"+m(i,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var s=12*(n.year()-t.year())+(n.month()-t.month()),i=t.clone().add(s,l),r=n-i<0,a=t.clone().add(s+(r?-1:1),l);return+(-(s+(n-i)/(r?i-a:a-i))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:l,y:u,w:o,d:a,D:d,h:r,m:i,s,ms:n,Q:c}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},$="en",g={};g[$]=v;var y="$isDayjsObject",b=function(e){return e instanceof E||!(!e||!e[y])},M=function e(t,n,s){var i;if(!t)return $;if("string"==typeof t){var r=t.toLowerCase();g[r]&&(i=r),n&&(g[r]=n,i=r);var a=t.split("-");if(!i&&a.length>1)return e(a[0])}else{var o=t.name;g[o]=t,i=o}return!s&&i&&($=i),i||!s&&$},D=function(e,t){if(b(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new E(n)},T=_;T.l=M,T.i=b,T.w=function(e,t){return D(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var E=function(){function v(e){this.$L=M(e.locale,null,!0),this.parse(e),this.$x=this.$x||e.x||{},this[y]=!0}var m=v.prototype;return m.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(T.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var s=t.match(h);if(s){var i=s[2]-1||0,r=(s[7]||"0").substring(0,3);return n?new Date(Date.UTC(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)):new Date(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)}}return new Date(t)}(e),this.init()},m.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},m.$utils=function(){return T},m.isValid=function(){return!(this.$d.toString()===f)},m.isSame=function(e,t){var n=D(e);return this.startOf(t)<=n&&n<=this.endOf(t)},m.isAfter=function(e,t){return D(e)<this.startOf(t)},m.isBefore=function(e,t){return this.endOf(t)<D(e)},m.$g=function(e,t,n){return T.u(e)?this[t]:this.set(n,e)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(e,t){var n=this,c=!!T.u(t)||t,f=T.p(e),h=function(e,t){var s=T.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return c?s:s.endOf(a)},p=function(e,t){return T.w(n.toDate()[e].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},v=this.$W,m=this.$M,_=this.$D,$="set"+(this.$u?"UTC":"");switch(f){case u:return c?h(1,0):h(31,11);case l:return c?h(1,m):h(0,m+1);case o:var g=this.$locale().weekStart||0,y=(v<g?v+7:v)-g;return h(c?_-y:_+(6-y),m);case a:case d:return p($+"Hours",0);case r:return p($+"Minutes",1);case i:return p($+"Seconds",2);case s:return p($+"Milliseconds",3);default:return this.clone()}},m.endOf=function(e){return this.startOf(e,!1)},m.$set=function(e,t){var o,c=T.p(e),f="set"+(this.$u?"UTC":""),h=(o={},o[a]=f+"Date",o[d]=f+"Date",o[l]=f+"Month",o[u]=f+"FullYear",o[r]=f+"Hours",o[i]=f+"Minutes",o[s]=f+"Seconds",o[n]=f+"Milliseconds",o)[c],p=c===a?this.$D+(t-this.$W):t;if(c===l||c===u){var v=this.clone().set(d,1);v.$d[h](p),v.init(),this.$d=v.set(d,Math.min(this.$D,v.daysInMonth())).$d}else h&&this.$d[h](p);return this.init(),this},m.set=function(e,t){return this.clone().$set(e,t)},m.get=function(e){return this[T.p(e)]()},m.add=function(n,c){var d,f=this;n=Number(n);var h=T.p(c),p=function(e){var t=D(f);return T.w(t.date(t.date()+Math.round(e*n)),f)};if(h===l)return this.set(l,this.$M+n);if(h===u)return this.set(u,this.$y+n);if(h===a)return p(1);if(h===o)return p(7);var v=(d={},d[i]=e,d[r]=t,d[s]=1e3,d)[h]||1,m=this.$d.getTime()+n*v;return T.w(m,this)},m.subtract=function(e,t){return this.add(-1*e,t)},m.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||f;var s=e||"YYYY-MM-DDTHH:mm:ssZ",i=T.z(this),r=this.$H,a=this.$m,o=this.$M,l=n.weekdays,c=n.months,u=n.meridiem,d=function(e,n,i,r){return e&&(e[n]||e(t,s))||i[n].slice(0,r)},h=function(e){return T.s(r%12||12,e,"0")},v=u||function(e,t,n){var s=e<12?"AM":"PM";return n?s.toLowerCase():s};return s.replace(p,(function(e,s){return s||function(e){switch(e){case"YY":return String(t.$y).slice(-2);case"YYYY":return T.s(t.$y,4,"0");case"M":return o+1;case"MM":return T.s(o+1,2,"0");case"MMM":return d(n.monthsShort,o,c,3);case"MMMM":return d(c,o);case"D":return t.$D;case"DD":return T.s(t.$D,2,"0");case"d":return String(t.$W);case"dd":return d(n.weekdaysMin,t.$W,l,2);case"ddd":return d(n.weekdaysShort,t.$W,l,3);case"dddd":return l[t.$W];case"H":return String(r);case"HH":return T.s(r,2,"0");case"h":return h(1);case"hh":return h(2);case"a":return v(r,a,!0);case"A":return v(r,a,!1);case"m":return String(a);case"mm":return T.s(a,2,"0");case"s":return String(t.$s);case"ss":return T.s(t.$s,2,"0");case"SSS":return T.s(t.$ms,3,"0");case"Z":return i}return null}(e)||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,d,f){var h,p=this,v=T.p(d),m=D(n),_=(m.utcOffset()-this.utcOffset())*e,$=this-m,g=function(){return T.m(p,m)};switch(v){case u:h=g()/12;break;case l:h=g();break;case c:h=g()/3;break;case o:h=($-_)/6048e5;break;case a:h=($-_)/864e5;break;case r:h=$/t;break;case i:h=$/e;break;case s:h=$/1e3;break;default:h=$}return f?h:T.a(h)},m.daysInMonth=function(){return this.endOf(l).$D},m.$locale=function(){return g[this.$L]},m.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),s=M(e,t,!0);return s&&(n.$L=s),n},m.clone=function(){return T.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},v}(),S=E.prototype;return D.prototype=S,[["$ms",n],["$s",s],["$m",i],["$H",r],["$W",a],["$M",l],["$y",u],["$D",d]].forEach((function(e){S[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),D.extend=function(e,t){return e.$i||(e(t,E,D),e.$i=!0),D},D.locale=M,D.isDayjs=b,D.unix=function(e){return D(1e3*e)},D.en=g[$],D.Ls=g,D.p={},D}()}},t={};function n(s){var i=t[s];if(void 0!==i)return i.exports;var r=t[s]={exports:{}};return e[s].call(r.exports,r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var s in t)n.o(t,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";function e(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function t(e,t,n="beforeend"){t.insertAdjacentElement(n,e.getElement())}const s=(e=0,t=0)=>{const n=Math.abs(e),s=Math.abs(t),i=Math.min(n,s),r=Math.max(n,s),a=Math.ceil(i),o=Math.floor(r),l=Math.random()*(o-a+1)+a;return Math.floor(l)},i=()=>{const e=s(0,1);return Boolean(e)},r=(e,t)=>{const n=new Date,s=t.getTime()-e.getTime();return n.setTime(e.getTime()+Math.random()*s),n},a=e=>!Array.isArray(e)||!e.length,o=e=>a(e)?null:e[s(0,e.length-1)],l=(e=[],t=1,n=1)=>{if(!e||t<1||n<0)return[];const{length:i}=e;if(!i)return[];if(1===t)return[o(e)];if(t>=i)return structuredClone(e);const r=((e=0,t=0)=>{const n=[];return()=>{let i=s(e,t);if(n.length>=t-e+1)return null;for(;n.includes(i);)i=s(e,t);return n.push(i),i}})(0,i-1);return Array.from({length:s(n,t)},(()=>e[r()]))},c=(e,t,...n)=>e?e.map((e=>t(e,...n))).join(" "):"",u=(e,t,n="id")=>e.find((e=>e[n]===t)),d=e=>e.charAt(0).toUpperCase()+e.slice(1),f=({filter:e,isActive:t})=>`<div class="trip-filters__filter">\n  <input id="filter-${e}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${e}" ${t?"checked":""}>\n  <label class="trip-filters__filter-label" for="filter-${e}">${e}</label>\n</div>`,h=({name:e,isEnabled:t},n)=>`<div class="trip-sort__item  trip-sort__item--${e}">\n  <input id="sort-${e}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${e}" ${e===n?"checked":""} ${t?"":"disabled"}>\n  <label class="trip-sort__btn" for="sort-${e}">${e}</label>\n</div>`;class p{constructor(e){this.info=e}getTemplate(){return(({title:e,dates:t,cost:n})=>`<section class="trip-main__trip-info  trip-info">\n  <div class="trip-info__main">\n    <h1 class="trip-info__title">${e}</h1>\n    <p class="trip-info__dates">${t}</p>\n  </div>\n  <p class="trip-info__cost">\n    Total: €&nbsp;<span class="trip-info__cost-value">${n}</span>\n  </p>\n</section>`)(this.info)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class v{getTemplate(){return'<ul class="trip-events__list"></ul>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}var m=n(484),_=n.n(m);const $="DD/MM/YY HH:mm",g="YYYY-MM-DDTHH:mm",y="HH:mm",b=(e,t)=>e?_()(e).format(t):"",M=({title:e,price:t})=>`<li class="event__offer">\n  <span class="event__offer-title">${e}</span>\n  +€&nbsp;\n  <span class="event__offer-price">${t}</span>\n</li>`;class D{constructor(e,t,n){this.event=e,this.destinationName=t,this.offers=n}getTemplate(){const{event:e,destinationName:t}=this;return((e,t,n)=>{const{type:s,basePrice:i,dateFrom:r,dateTo:a,isFavorite:o}=e,l=b(r,"YYYY-MM-DD"),u=b(r,"MMM DD"),f=b(r,g),h=b(r,y),p=b(a,g),v=b(a,y);return`<li class="trip-events__item">\n  <div class="event">\n    <time class="event__date" datetime="${l}">${u}</time>\n    <div class="event__type">\n      <img class="event__type-icon" width="42" height="42" src="img/icons/${s}.png" alt="Event type icon">\n    </div>\n    <h3 class="event__title">${d(s)} ${t}</h3>\n    <div class="event__schedule">\n      <p class="event__time">\n        <time class="event__start-time" datetime="${f}">${h}</time>\n        —\n        <time class="event__end-time" datetime="${p}">${v}</time>\n      </p>\n      <p class="event__duration">${((e,t)=>{const n=t.getTime()-e.getTime(),s=Math.round(n/1e3),i=Math.round(s/60),r=i%60,a=(i-r)/60,o=a%24,l=(a-o)/24,c=[];return l>0&&(l<10&&c.push("0"),c.push(l,"D ")),(o>0||l>0)&&(o<10&&c.push("0"),c.push(o,"H ")),r<10&&c.push("0"),c.push(r,"M"),c.join("")})(r,a)}</p>\n    </div>\n    <p class="event__price">\n      €&nbsp;<span class="event__price-value">${i}</span>\n    </p>\n    ${(e=>`<h4 class="visually-hidden">Offers:</h4>\n<ul class="event__selected-offers">\n    ${c(e,M)}\n</ul>`)(n)}\n    <button class="event__favorite-btn${o?" event__favorite-btn--active":""}" type="button">\n      <span class="visually-hidden">Add to favorite</span>\n      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>\n      </svg>\n    </button>\n    <button class="event__rollup-btn" type="button">\n      <span class="visually-hidden">Open event</span>\n    </button>\n    </div>\n</li>`})(e,t,this.offers)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const T=e=>`<div class="event__type-item">\n  <input id="event-type-${e}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${e}">\n  <label class="event__type-label  event__type-label--${e}" for="event-type-${e}-1">${d(e)}</label>\n</div>`,E=e=>`<option value="${e}"></option>`,S=({id:e,name:t,title:n,price:s,checked:i=!1})=>`<div class="event__offer-selector">\n  <input class="event__offer-checkbox  visually-hidden" id="${e}" type="checkbox" name="${t}" ${i?"checked":""}>\n  <label class="event__offer-label" for="${e}">\n    <span class="event__offer-title">${n}</span>\n    +€&nbsp;\n    <span class="event__offer-price">${s}</span>\n  </label>\n</div>`,w=({src:e,description:t})=>`<img class="event__photo" src="${e}" alt="${t}">`,O=(e,t,n,s,i)=>{const{type:r,dateFrom:o,dateTo:l,basePrice:u}=e,f=s.name;return`<li class="trip-events__item">\n  <form class="event event--edit" action="#" method="post">\n    <header class="event__header">\n      <div class="event__type-wrapper">\n        <label class="event__type  event__type-btn" for="event-type-toggle-1">\n          <span class="visually-hidden">Choose event type</span>\n          <img class="event__type-icon" width="17" height="17" src="img/icons/${r}.png" alt="Event type icon">\n        </label>\n        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n          ${(e=>`<div class="event__type-list">\n  <fieldset class="event__type-group">\n    <legend class="visually-hidden">Event type</legend>\n    ${c(e,T)}\n  </fieldset>\n</div>`)(t)}\n      </div>\n\n      <div class="event__field-group  event__field-group--destination">\n        <label class="event__label  event__type-output" for="event-destination-1">\n          ${d(r)}\n        </label>\n        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${f}" list="destination-list-1">\n          ${(e=>`<datalist id="destination-list-1">\n    ${c(e,E)}\n</datalist>`)(n)}\n      </div>\n\n      <div class="event__field-group  event__field-group--time">\n        <label class="visually-hidden" for="event-start-time-1">From</label>\n        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${b(o,$)}">\n        —\n        <label class="visually-hidden" for="event-end-time-1">To</label>\n        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${b(l,$)}">\n      </div>\n\n      <div class="event__field-group  event__field-group--price">\n        <label class="event__label" for="event-price-1">\n          <span class="visually-hidden">Price</span>\n          €\n        </label>\n        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${u}">\n      </div>\n\n      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n      <button class="event__reset-btn" type="reset">Cancel</button>\n    </header>\n    <section class="event__details">\n      ${(e=>a(e)?"":`<div class="event__offer-selector">\n  <section class="event__section  event__section--offers">\n    <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n    <div class="event__available-offers">\n      ${c(e,S)}\n    </div>\n</section>`)(i)}\n      ${(({description:e,pictures:t})=>e?`<section class="event__section  event__section--destination">\n  <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n  <p class="event__destination-description">${e}</p>\n  ${(e=>a(e)?"":`<div class="event__photos-container">\n  <div class="event__photos-tape">\n    ${c(e,w)}\n  </div>\n</div>`)(t)}\n</section>`:"")(s)}\n    </section>\n  </form>\n<li>`};class A{constructor(e,t,n,s,i){this.event=e,this.types=t,this.destinationNames=n,this.destination=s,this.offers=i}getTemplate(){const{event:e,types:t,destinationNames:n,destination:s,offers:i}=this;return O(e,t,n,s,i)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class N{getTemplate(){return'<p class="trip-events__msg">Loading...</p>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const k=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"],C=["everything","future","present","past"],x=[{name:"day",isEnabled:!0},{name:"event",isEnabled:!1},{name:"time",isEnabled:!0},{name:"price",isEnabled:!0},{name:"offers",isEnabled:!0}],I={Price:{MIN:1e3,MAX:5e3},Date:{MIN:new Date(2024,0,1),MAX:new Date(2024,5,1)},COUNT:4},Y=["Amsterdam","Geneva","Chamonix","Moscow","Tomsk","Tokyo","New York","London"],L={TITLES:["Travel by train","Choose seats","Add meal","Switch to comfort class","Add luggage","Order Uber","Rent a car","Add breakfast","Book tickets","Lunch in city"],PRICES:[40,5,15,100,30,20,200,50,40,30]},H={DESCRIPTIONS:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus".split(".").map((e=>`${e.trim()}.`)),MAX_COUNT:5},P={DESTINATIONS_COUNT:3,DATE_MAX:30},j=document.body,U=j.querySelector("div.page-body__container.page-header__container"),F=U.querySelector("div.trip-main"),q=U.querySelector("div.trip-controls__filters"),W=j.querySelector("section.trip-events"),X=new class{constructor(){const{destinations:e,offers:t,events:n}=(e=>{const t=Y.map(((e,t)=>{let n="",r=[];if(i()){n=l(H.DESCRIPTIONS,H.MAX_COUNT).join(" ");const e=((e,t)=>{const n=s(0,4);return n>0?Array.from({length:n},(()=>s(1,5))):null})();e&&(r=e.map((e=>({src:`img/photos/${e}.jpg`,description:`title - ${e}`}))))}return{id:`destination-${t}`,name:e,description:n,pictures:r}})),n=e.map((e=>{const{TITLES:t}=L;let n=[];if(i()){const e=l(t,s(0,t.length-1));e&&(n=e.map((e=>{const n=t.indexOf(e),s=`offer-${n}`;return{id:`${s}-1`,name:s,title:e,price:L.PRICES[n]}})))}return{type:e,offers:n}})),a=Array.from({length:I.COUNT},((a,c)=>((e,t,n,a)=>{const{MIN:c,MAX:u}=I.Price,d=s(c,u),f=((e,t)=>{const n=e.filter((e=>e.type===t))[0]?.offers;return n?n.map((e=>e.id)):[]})(n,t),h=f?l(f,f.length-1):[],{MIN:p,MAX:v}=I.Date,m=r(p,v);return{id:e,type:t,basePrice:d,dateFrom:m,dateTo:r(m,v),isFavorite:i(),offers:h,destination:o(a.map((e=>e.id)))}})(c+1,o(e),n,t)));return{destinations:t,offers:n,events:a}})(k);this.destinations=e,this.offers=t,this.events=n}getInfo(){return(e=>{const{DESTINATIONS_COUNT:t,DATE_MAX:n}=P;return{title:l(e,t,t).map((e=>e.name)).join(" — "),dates:`${s(1,n)}&nbsp;—&nbsp;${s(1,n)} Mar`,cost:s(1e4,2e4)}})(this.destinations)}getDestinationNames(){return this.destinations.map((e=>e.name))}getDestinationById(e){return u(this.destinations,e)}getAvailableEventOffers(e){const{type:t,offers:n}=e,s=u(this.offers,t,"type"),i=s?.offers;return a(i)?[]:a(n)?i:i.map((e=>({...e,checked:n.includes(e.id)})))}getEventOffers(e){const{type:t,offers:n}=e,s=u(this.offers,t,"type"),i=s?.offers;return a(i)?[]:a(n)?i:i.filter((e=>n.includes(e.id)))}getEvents(){return this.events}},B=new class{constructor({containerElement:e,eventsModel:t}){this.containerElement=e,this.eventsModel=t}init(){const e=this.eventsModel.getInfo();t(new p(e),this.containerElement,"afterbegin")}}({containerElement:F,eventsModel:X}),R=new class{eventsListComponent=new v;constructor({containerElement:e,eventsModel:t}){this.containerElement=e,this.eventsModel=t}init(){const e=this.eventsListComponent.getElement(),{eventsModel:n}=this,s=n.getDestinationNames(),i=[...n.getEvents()];this.events=i;const r=i[0],a=n.getDestinationById(r.destination),o=n.getAvailableEventOffers(r);t(new A(r,k,s,a,o),e);for(let s=1;s<i.length;s++){const r=i[s],{name:a}=n.getDestinationById(r.destination),o=n.getEventOffers(r);t(new D(r,a,o),e)}t(this.eventsListComponent,this.containerElement),t(new N,this.containerElement)}}({containerElement:W,eventsModel:X}),z=o(C);t(new class{constructor(e,t){this.filters=e.map((e=>({filter:e,isActive:e===t})))}getTemplate(){return e=this.filters,`<form class="trip-filters" action="#" method="get">\n  ${c(e,f)}\n</form>`;var e}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}(C,z),q);const J=o(x.filter((e=>e.isEnabled)))?.name;t(new class{constructor(e,t){this.sortings=e,this.activeSorting=t}getTemplate(){return((e,t)=>`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n  ${c(e,h,t)}\n</form>`)(this.sortings,this.activeSorting)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}(x,J),W),B.init(),R.init()})()})();
//# sourceMappingURL=bundle.e985dca9944f3a225bc2.js.map