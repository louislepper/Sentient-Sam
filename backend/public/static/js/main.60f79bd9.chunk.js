(this["webpackJsonpsing-me-a-song"]=this["webpackJsonpsing-me-a-song"]||[]).push([[0],{713:function(e,t,n){e.exports=n(740)},718:function(e,t,n){},719:function(e,t,n){},740:function(e,t,n){"use strict";n.r(t);var a=n(7),o=n.n(a),r=n(29),c=n.n(r),i=(n(718),n(13)),s=(n(719),n(38)),l=n(5),u=n.n(l),d=n(9),m=n(55);n(77);var p=n(28);function f(){return"interrupted"===p.d.state||"suspended"===p.d.state?p.d._context.resume():Promise.resolve()}var h=n(0),w=n(1);function v(e){return t=function(e){for(var t=0,n=1779033703^e.length;t<e.length;t++)n=(n=Math.imul(n^e.charCodeAt(t),3432918353))<<13|n>>>19;return function(){return n=Math.imul(n^n>>>16,2246822507),n=Math.imul(n^n>>>13,3266489909),(n^=n>>>16)>>>0}}(e)(),function(){var e=t+=1831565813;return e=Math.imul(e^e>>>15,1|e),(((e^=e+Math.imul(e^e>>>7,61|e))^e>>>14)>>>0)/4294967296};var t}var g=null,b=null;function y(e,t){return E.apply(this,arguments)}function E(){return(E=Object(d.a)(u.a.mark((function e(t,n){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==b){e.next=12;break}return b="constructing",e.next=4,Promise.all(t.map(function(){var e=Object(d.a)(u.a.mark((function e(t){var n,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.wordString,a=t.wordSound,e.t0=n,e.next=4,p.e().decodeAudioData(a.slice(0));case 4:return e.t1=e.sent,e.abrupt("return",{wordString:e.t0,wordSound:e.t1});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 4:return a=e.sent,g=new N(a,"/its-not-over-til-the-bossa-nova.mp3",n),b="loading",e.next=9,g.load();case 9:b="loaded",e.next=13;break;case 12:throw new Error("Attempted to play song over already playing song.");case 13:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function S(){null!==g&&"loaded"===b&&(g.play(),b="running")}function k(){var e=Promise.resolve();return null!==g&&"running"===b&&(e=g.dispose(),g=null,b=null),e}var N=function(){function e(t,n,a){Object(h.a)(this,e),this.wordNotes=void 0,this.backingTrack=void 0,this.loaded=!1,this.topic=void 0,this.wordNotes=t.map((function(e){var t=e.wordSound;return{sound:O(t),word:e.wordString,duration:t.duration}})),this.backingTrack=new p.b({url:n,volume:-13,fadeOut:2}).toDestination(),this.topic=a}return Object(w.a)(e,[{key:"load",value:function(){var e=Object(d.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.f();case 2:this.loaded=!0;case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"play",value:function(){if(!this.loaded)throw Error("Song must be loaded before playing");for(var e=p.g(),t=v(this.topic),n=5,a=0;a<this.wordNotes.length;a++){var o=this.wordNotes[a].sound,r=.8*this.wordNotes[a].duration,c=Math.floor(2*t()*2)-2,i=.1*t()*2-.1;o.triggerAttackRelease([p.a(60+c).toFrequency()],r+i,e+n);var s=0;t()<=0&&(s=1),n+=r+i+.01+s}this.backingTrack.start(e,0,n+3)}},{key:"dispose",value:function(){for(var e=0;e<this.wordNotes.length;e++){this.wordNotes[e].sound.dispose()}return this.backingTrack.stop(p.g()),t=1500,new Promise((function(e){return setTimeout(e,t)}));var t}}]),e}();function O(e){return new p.c({urls:{C4:e},release:1}).toDestination()}var A,x=n(70),j=n(8),C={apiGateway:{URL:"/api"}},T=Object(j.a)({},C).apiGateway.URL;!function(e){e[e.SELECTION=0]="SELECTION",e[e.LOADING=1]="LOADING",e[e.PLAYING=2]="PLAYING"}(A||(A={}));var I={songStage:A.SELECTION,topic:null,words:null},L=Object(x.b)({name:"song",initialState:I,reducers:{selectTopic:function(e,t){e.songStage=A.LOADING,e.topic=t.payload},receiveSong:function(e,t){e.songStage=A.PLAYING,e.topic=t.payload.topic,e.words=t.payload.words},restart:function(e){e.songStage=A.SELECTION,e.topic=null,e.words=null}}}),P=L.actions.restart,B=L.actions,M=B.receiveSong,G=B.selectTopic,R=function(){return function(e){window.history.pushState({},"","/"),e(P())}},U=function(e){return function(t){t(G(e)),window.history.pushState({topic:e},e,"?topic="+e);var n=new URLSearchParams;return n.append("topic",e),n.append("limit","27"),fetch("".concat(T,"/vocalTrack?").concat(n.toString())).then((function(e){return e.json()})).then((function(e){var n={topic:e.topic,words:e.words};return t(M(n)),F(n.words)})).catch((function(e){return console.log("Unable to fetch song - "+e),t(R()),null}))}},D=function(e){return F(e.song.words||[])},W=function(e){return e.song.topic};function F(e){return e.map((function(e){var t=e.wordSound;return{wordString:e.wordString,wordSound:Uint8Array.from(atob(t),(function(e){return e.charCodeAt(0)})).buffer}}))}var Y=function(e){return e.song.songStage},_=L.reducer;function q(){var e=Object(a.useState)(""),t=Object(i.a)(e,2),n=t[0],r=t[1],c=Object(s.b)();function l(){return p.apply(this,arguments)}function p(){return(p=Object(d.a)(u.a.mark((function e(){var t,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=f(),e.next=3,c(U(n));case 3:return a=e.sent,e.next=6,t;case 6:if(!a){e.next=10;break}return e.next=9,y(a,n);case 9:S();case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(a.useEffect)((function(){var e,t=new URLSearchParams(window.location.search).get("topic");(e=t)&&0!==e.trim().length&&r(t||"")}),[]),o.a.createElement("div",{className:"col init"},o.a.createElement("form",{onSubmit:l},o.a.createElement("label",null,"Sing me a song about:",o.a.createElement("input",{className:"topicInput",value:n,type:"text",onChange:function(e){r(e.target.value)}})),o.a.createElement("div",null,o.a.createElement(m.AwesomeButton,{type:"primary",onPress:l},"Sing for me")),(["iPad Simulator","iPhone Simulator","iPod Simulator","iPad","iPhone","iPod"].includes(window.navigator.platform)||window.navigator.userAgent.includes("Mac")&&"ontouchend"in document)&&o.a.createElement("div",{className:"iphoneHint"},o.a.createElement("p",null,"Don't forget to unsilence your iphone (the physical switch on the top left of the phone) "))))}var z=n(62);function J(e){window.navigator.clipboard?window.navigator.clipboard.writeText(e).then((function(){console.log("Async: Copying to clipboard was successful!")}),(function(e){console.error("Async: Could not copy text: ",e)})):function(e){var t=document.createElement("textarea");t.value=e,t.style.top="0",t.style.left="0",t.style.position="fixed",document.body.appendChild(t),t.focus(),t.select();try{var n=document.execCommand("copy")?"successful":"unsuccessful";console.log("Fallback: Copying text command was "+n)}catch(a){console.error("Fallback: Oops, unable to copy",a)}document.body.removeChild(t)}(e)}function H(e){var t=Object(s.b)();function n(){return(n=Object(d.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:k(),t(R());case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var a=Object(z.d)();function r(){return(r=Object(d.a)(u.a.mark((function t(){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,f();case 2:return t.next=4,k();case 4:return t.prev=4,t.next=7,y(e.words,e.topic);case 7:S(),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(4),console.log("Unable to replay song "+t.t0);case 13:case"end":return t.stop()}}),t,null,[[4,10]])})))).apply(this,arguments)}return o.a.createElement("div",{className:"col"},o.a.createElement("div",{className:"row justify-content-md-center"},o.a.createElement("div",{className:"col-md-4"},o.a.createElement("img",{className:"playingIcon",alt:"The song has started playing",src:"music_black.svg"}))),o.a.createElement("div",{className:"row controls justify-content-md-center"},o.a.createElement("div",{className:"col-md-auto control-buttons"},o.a.createElement(m.AwesomeButton,{type:"primary",onPress:function(){return n.apply(this,arguments)}},"Start Over")),o.a.createElement("div",{className:"col-md-auto control-buttons"},o.a.createElement(m.AwesomeButton,{type:"primary",onPress:function(){return r.apply(this,arguments)}},"Replay")),o.a.createElement("div",{className:"col-md-auto control-buttons"},o.a.createElement(m.AwesomeButton,{type:"primary",onPress:function(){window.navigator.share?window.navigator.share({title:"Sentient Sam sings about "+e.topic,text:"Check out Sentient Sam. A robo-poet who'll sing about whatever you want it to.",url:window.location.href}).then((function(){return console.log("Successful share")})).catch((function(e){return console.log("Error sharing",e)})):(J(window.location.href),console.log("copied link to clipboard"),a.show("Copied link to clipboard"))}},"Copy link to song"))))}n(734);var $=n(699),K=n.n($);function Q(){return o.a.createElement("div",{className:"col"},o.a.createElement("h1",null,"Invalid State"))}function V(){var e=Object(s.c)(Y),t=Object(s.c)(D),n=Object(s.c)(W);switch(e){case A.SELECTION:return o.a.createElement(q,null);case A.PLAYING:return null==t||null==n?Q():o.a.createElement(H,{words:t,topic:n});case A.LOADING:return o.a.createElement("div",{className:"loadingAnimation"},o.a.createElement(K.a,{active:!0,color:"black",type:"line-scale-party"}));default:return Q()}}n(735);var X=n(700);function Z(){return o.a.createElement("div",{className:"aboutContent"},o.a.createElement("h2",null,"Sentient Sam"),o.a.createElement("p",null,"Sentient Sam is a robot poet designed by Louis Lepper."),o.a.createElement("p",null,"Be aware that Sam doesn't have a filter, and may accidentally say things that offend."),o.a.createElement("p",null,"If you have any questions or comments let me know at ",o.a.createElement("a",{href:"mailto:public@louislepper.co.nz"},"public@louislepper.co.nz")),o.a.createElement("p",null,"Thank you very much to ",o.a.createElement("a",{href:"https://www.freepik.com/"},"freepik.com")," for the royalty free images, and to ",o.a.createElement("a",{href:"https://www.silvermansound.com/"},"Shane Ivers")," for the backing track \"It's Not Over 'Til The Bossa Nova\"."))}var ee=function(){var e=Object(a.useState)(!1),t=Object(i.a)(e,2),n=t[0],r=t[1];return o.a.createElement("div",{className:"App"},o.a.createElement("header",null,o.a.createElement("nav",null,o.a.createElement("div",{className:"navButtons"},o.a.createElement("button",{type:"button",className:"link-button",onClick:function(){return r(!0)}},"About"),o.a.createElement(X.Modal,{open:n,onClose:function(){return r(!1)},center:!0},o.a.createElement(Z,null))))),o.a.createElement("div",{className:"container min-vh-100 song-container"},o.a.createElement("div",{className:"row min-vh-100 justify-content-center align-items-center"},o.a.createElement(V,null))),o.a.createElement("footer",null,o.a.createElement("div",{className:"attribution"},o.a.createElement("div",{className:"iconsAttribution"},"Icons made by ",o.a.createElement("a",{href:"http://www.freepik.com/",title:"Freepik"},"Freepik")," from ",o.a.createElement("a",{href:"https://www.flaticon.com/",title:"Flaticon"},"www.flaticon.com")),o.a.createElement("div",{className:"musicAttribution"},"Music: It's Not Over 'Til The Bossa Nova by Shane Ivers - ",o.a.createElement("a",{href:"https://www.silvermansound.com"},"https://www.silvermansound.com")))))},te=Object(x.a)({reducer:{song:_}}),ne=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function ae(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}n(739);var oe=n(701),re={position:z.b.BOTTOM_CENTER,timeout:3500,offset:"30px",transition:z.c.SCALE};c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(s.a,{store:te},o.a.createElement(z.a,Object.assign({template:oe.a},re),o.a.createElement(ee,null)))),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");ne?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):ae(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):ae(t,e)}))}}()}},[[713,1,2]]]);
//# sourceMappingURL=main.60f79bd9.chunk.js.map