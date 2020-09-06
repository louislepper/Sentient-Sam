(this["webpackJsonpsing-me-a-song"]=this["webpackJsonpsing-me-a-song"]||[]).push([[0],{713:function(e,t,n){e.exports=n(740)},718:function(e,t,n){},719:function(e,t,n){},740:function(e,t,n){"use strict";n.r(t);var o=n(6),a=n.n(o),r=n(29),c=n.n(r),i=(n(718),n(13)),s=(n(719),n(38)),l=n(5),u=n.n(l),p=n(9),d=n(55);n(77);var m=n(22),f=new m.c,h=new m.a(1e-37);function w(){m.k(),console.log("Audio context state: "+m.g.state),f.connect(h),f.start(),h.toDestination()}var v=n(11),g=n(0),b=n(1);function y(e){return t=function(e){for(var t=0,n=1779033703^e.length;t<e.length;t++)n=(n=Math.imul(n^e.charCodeAt(t),3432918353))<<13|n>>>19;return function(){return n=Math.imul(n^n>>>16,2246822507),n=Math.imul(n^n>>>13,3266489909),(n^=n>>>16)>>>0}}(e)(),function(){var e=t+=1831565813;return e=Math.imul(e^e>>>15,1|e),(((e^=e+Math.imul(e^e>>>7,61|e))^e>>>14)>>>0)/4294967296};var t}var E=null,S=null;function k(e,t){return N.apply(this,arguments)}function N(){return(N=Object(p.a)(u.a.mark((function e(t,n){var o;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==S){e.next=12;break}return S="constructing",e.next=4,Promise.all(t.map(function(){var e=Object(p.a)(u.a.mark((function e(t){var n,o;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.wordString,o=t.wordSound,e.t0=n,e.next=4,m.h().decodeAudioData(o.slice(0));case 4:return e.t1=e.sent,e.abrupt("return",{wordString:e.t0,wordSound:e.t1});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 4:return o=e.sent,E=new A(o,"/its-not-over-til-the-bossa-nova.mp3",n),S="loading",e.next=9,E.load();case 9:S="loaded",e.next=13;break;case 12:throw new Error("Attempted to play song over already playing song.");case 13:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function O(){var e=Promise.resolve();return null!=E&&"running"===S&&(e=E.stop().then((function(){S="loaded"}))),e}function x(){null!==E&&"loaded"===S&&(E.play(),S="running")}function T(){return j.apply(this,arguments)}function j(){return(j=Object(p.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null===E||"running"!==S){e.next=9;break}return S="disposing",t=E,e.next=5,t.stop();case 5:return e.next=7,t.dispose();case 7:E=null,S=null;case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}m.f.on("start",(function(){console.log("Transport started")})),m.f.on("stop",(function(){console.log("Transport stopped")})),m.f.on("pause",(function(){console.log("Transport paused")}));var A=function(){function e(t,n,o){Object(g.a)(this,e),this.wordNotes=void 0,this.backingTrack=void 0,this.loaded=!1,this.topic=void 0,this.finishTime=void 0,this.fadeoutDuration=2,this.fadeoutDurationMs=1e3*this.fadeoutDuration,this.topic=o;var a=y(this.topic);this.backingTrack=new m.d({url:n,volume:-13,fadeOut:this.fadeoutDuration}).toDestination().sync();var r=5;this.wordNotes=t.reduce((function(e,t){var n=t.wordSound,o=function(e){return new m.e({urls:{C4:e},release:1}).toDestination().sync()}(n),c=n.duration,i=.8*c+(.1*a()*2-.1),s=Math.floor(2*a()*2)-2,l=[m.b(60+s).toFrequency()],u={sampler:o,word:t.wordString,originalDuration:c,duration:i,note:l,startTime:r},p=0;return a()<=0&&(p=1),r+=i+.01+p,[].concat(Object(v.a)(e),[u])}),[]),this.finishTime=r+this.fadeoutDuration;this.backingTrack.start(0,0,this.finishTime);for(var c=0;c<this.wordNotes.length;c++){this.wordNotes[c].sampler.triggerAttackRelease(this.wordNotes[c].note||440,this.wordNotes[c].duration||1,(this.wordNotes[c].startTime||0)+0)}m.f.loop=!1,console.log("Song constructed")}return Object(b.a)(e,[{key:"load",value:function(){var e=Object(p.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.i();case 2:this.loaded=!0,console.log("Song loaded");case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"play",value:function(){if(!this.loaded)throw Error("Song must be loaded before playing");m.f.start(m.j()),console.log("Song playing")}},{key:"stop",value:function(){console.log("Song stopping");var e,t=m.j();return m.f.stop(t),e=this.fadeoutDurationMs,new Promise((function(t){return setTimeout(t,e)}))}},{key:"dispose",value:function(){var e=Object(p.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(console.log("Song disposing"),m.f.cancel(0),t=0;t<this.wordNotes.length;t++)this.wordNotes[t].sampler.dispose();this.backingTrack.dispose(),console.log("Song disposed");case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),e}();var C,I=n(70),L=n(8),P={apiGateway:{URL:"/api"}},D=Object(L.a)({},P).apiGateway.URL;!function(e){e[e.SELECTION=0]="SELECTION",e[e.LOADING=1]="LOADING",e[e.PLAYING=2]="PLAYING"}(C||(C={}));var M={songStage:C.SELECTION,topic:null,words:null},B=Object(I.b)({name:"song",initialState:M,reducers:{selectTopic:function(e,t){e.songStage=C.LOADING,e.topic=t.payload},receiveSong:function(e,t){e.songStage=C.PLAYING,e.topic=t.payload.topic,e.words=t.payload.words.map((function(e){return e.wordString}))},restart:function(e){e.songStage=C.SELECTION,e.topic=null,e.words=null}}}),G=B.actions.restart,R=B.actions,U=R.receiveSong,W=R.selectTopic,F=function(){return function(e){window.history.pushState({},"","/"),e(G())}};var Y=function(e){return function(t){t(W(e)),window.history.pushState({topic:e},e,"?topic="+e);var n,o=new URLSearchParams;return o.append("topic",e),o.append("limit","27"),(n="".concat(D,"/vocalTrack?").concat(o.toString()),fetch(n).then((function(e){if(!e.ok)throw new Error(e.statusText);return e.json()}))).then((function(e){var n={topic:e.topic,words:e.words};return t(U(n)),e.words.map((function(e){var t=e.wordSound;return{wordString:e.wordString,wordSound:Uint8Array.from(atob(t),(function(e){return e.charCodeAt(0)})).buffer}}))})).catch((function(e){return console.log("Unable to fetch song - "+e),t(F()),null}))}},z=function(e){return e.song.words||[]},q=function(e){return e.song.topic};var J=function(e){return e.song.songStage},_=B.reducer;function H(){var e=Object(o.useState)(""),t=Object(i.a)(e,2),n=t[0],r=t[1],c=Object(s.b)();function l(){return m.apply(this,arguments)}function m(){return(m=Object(p.a)(u.a.mark((function e(){var t,o;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=w(),e.next=3,c(Y(n));case 3:return o=e.sent,e.next=6,t;case 6:if(!o){e.next=17;break}return e.prev=7,e.next=10,k(o,n);case 10:x(),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(7),console.log("Got an error, heading back to selection. "+e.t0),c(F());case 17:case"end":return e.stop()}}),e,null,[[7,13]])})))).apply(this,arguments)}return Object(o.useEffect)((function(){var e,t=new URLSearchParams(window.location.search).get("topic");(e=t)&&0!==e.trim().length&&r(t||"")}),[]),a.a.createElement("div",{className:"col init"},a.a.createElement("form",{onSubmit:l},a.a.createElement("label",null,"Sing me a song about:",a.a.createElement("input",{className:"topicInput",value:n,type:"text",onChange:function(e){r(e.target.value)}})),a.a.createElement("div",null,a.a.createElement(d.AwesomeButton,{type:"primary",onPress:l},"Sing for me")),(["iPad Simulator","iPhone Simulator","iPod Simulator","iPad","iPhone","iPod"].includes(window.navigator.platform)||window.navigator.userAgent.includes("Mac")&&"ontouchend"in document)&&a.a.createElement("div",{className:"iphoneHint"},a.a.createElement("p",null,"Don't forget to unsilence your iphone (the physical switch on the top left of the phone) "))))}var $=n(62);function K(e){window.navigator.clipboard?window.navigator.clipboard.writeText(e).then((function(){console.log("Async: Copying to clipboard was successful!")}),(function(e){console.error("Async: Could not copy text: ",e)})):function(e){var t=document.createElement("textarea");t.value=e,t.style.top="0",t.style.left="0",t.style.position="fixed",document.body.appendChild(t),t.focus(),t.select();try{var n=document.execCommand("copy")?"successful":"unsuccessful";console.log("Fallback: Copying text command was "+n)}catch(o){console.error("Fallback: Oops, unable to copy",o)}document.body.removeChild(t)}(e)}function Q(e){var t=Object(s.b)();function n(){return(n=Object(p.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:T(),t(F());case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var o=Object($.d)();function r(){return(r=Object(p.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,O();case 3:return e.next=5,w();case 5:x(),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log("Unable to replay song "+e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}return a.a.createElement("div",{className:"col"},a.a.createElement("div",{className:"row justify-content-md-center"},a.a.createElement("div",{className:"col-md-4"},a.a.createElement("img",{className:"playingIcon",alt:"The song has started playing",src:"music_black.svg"}),a.a.createElement("h1",{className:"songTitle"},"\u201c",e.topic,"\u201d"))),a.a.createElement("div",{className:"row controls justify-content-md-center"},a.a.createElement("div",{className:"col-md-auto control-buttons"},a.a.createElement(d.AwesomeButton,{type:"primary",onPress:function(){return n.apply(this,arguments)}},"Start Over")),a.a.createElement("div",{className:"col-md-auto control-buttons"},a.a.createElement(d.AwesomeButton,{type:"primary",onPress:function(){return r.apply(this,arguments)}},"Replay")),a.a.createElement("div",{className:"col-md-auto control-buttons"},a.a.createElement(d.AwesomeButton,{type:"primary",onPress:function(){window.navigator.share?window.navigator.share({title:"Sentient Sam sings about "+e.topic,text:"Check out Sentient Sam. A robo-poet who'll sing about whatever you want it to.",url:window.location.href}).then((function(){return console.log("Successful share")})).catch((function(e){return console.log("Error sharing",e)})):(K(window.location.href),console.log("copied link to clipboard"),o.show("Copied link to clipboard"))}},"Copy link to song"))))}n(734);var V=n(699),X=n.n(V);function Z(){return a.a.createElement("div",{className:"col"},a.a.createElement("h1",null,"Invalid State"))}function ee(){var e=Object(s.c)(J),t=Object(s.c)(z),n=Object(s.c)(q);switch(e){case C.SELECTION:return a.a.createElement(H,null);case C.PLAYING:return null==t||null==n?Z():a.a.createElement(Q,{words:t,topic:n});case C.LOADING:return a.a.createElement("div",{className:"loadingAnimation"},a.a.createElement(X.a,{active:!0,color:"black",type:"line-scale-party"}),a.a.createElement("br",null),a.a.createElement("br",null),a.a.createElement("br",null),a.a.createElement("p",null,"loading..."));default:return Z()}}n(735);var te=n(700);function ne(){return a.a.createElement("div",{className:"aboutContent"},a.a.createElement("h2",null,"Sentient Sam"),a.a.createElement("p",null,"Sentient Sam is a robot poet designed by ",a.a.createElement("a",{href:"http://louislepper.co.nz"},"Louis Lepper"),"."),a.a.createElement("p",null,"Be aware that Sam doesn't have a filter, and may accidentally say things that offend."),a.a.createElement("p",null,"If you have any questions or comments let me know at ",a.a.createElement("a",{href:"mailto:public@louislepper.co.nz"},"public@louislepper.co.nz")),a.a.createElement("p",null,"Check out the sourcecode at ",a.a.createElement("a",{href:"https://github.com/louislepper/Sentient-Sam"},"https://github.com/louislepper/Sentient-Sam"),"."),a.a.createElement("p",null,"Thank you very much to ",a.a.createElement("a",{href:"https://www.freepik.com/"},"freepik.com")," for the royalty free images, and to ",a.a.createElement("a",{href:"https://www.silvermansound.com/"},"Shane Ivers")," for the backing track \"It's Not Over 'Til The Bossa Nova\"."))}var oe=function(){var e=Object(o.useState)(!1),t=Object(i.a)(e,2),n=t[0],r=t[1];return a.a.createElement("div",{className:"App"},a.a.createElement("p",{className:"fontPreloader"},"."),a.a.createElement("header",null,a.a.createElement("nav",null,a.a.createElement("div",{className:"navButtons"},a.a.createElement("button",{type:"button",className:"link-button",onClick:function(){return r(!0)}},"About"),a.a.createElement(te.Modal,{open:n,onClose:function(){return r(!1)},center:!0},a.a.createElement(ne,null))))),a.a.createElement("div",{className:"container min-vh-100 song-container"},a.a.createElement("div",{className:"row min-vh-100 justify-content-center align-items-center"},a.a.createElement(ee,null))),a.a.createElement("footer",null,a.a.createElement("div",{className:"attribution"},a.a.createElement("div",{className:"iconsAttribution"},"Icons made by ",a.a.createElement("a",{href:"http://www.freepik.com/",title:"Freepik"},"Freepik")," from ",a.a.createElement("a",{href:"https://www.flaticon.com/",title:"Flaticon"},"www.flaticon.com")),a.a.createElement("div",{className:"musicAttribution"},"Music: It's Not Over 'Til The Bossa Nova by Shane Ivers - ",a.a.createElement("a",{href:"https://www.silvermansound.com"},"https://www.silvermansound.com")))))},ae=Object(I.a)({reducer:{song:_}}),re=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function ce(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}n(739);var ie=n(701),se={position:$.b.BOTTOM_CENTER,timeout:3500,offset:"30px",transition:$.c.SCALE};c.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(s.a,{store:ae},a.a.createElement($.a,Object.assign({template:ie.a},se),a.a.createElement(oe,null)))),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");re?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var o=n.headers.get("content-type");404===n.status||null!=o&&-1===o.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):ce(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):ce(t,e)}))}}()}},[[713,1,2]]]);
//# sourceMappingURL=main.2c34e812.chunk.js.map