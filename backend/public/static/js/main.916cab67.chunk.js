(this["webpackJsonpsing-me-a-song"]=this["webpackJsonpsing-me-a-song"]||[]).push([[0],{713:function(e,t,n){e.exports=n(740)},718:function(e,t,n){},719:function(e,t,n){},740:function(e,t,n){"use strict";n.r(t);var o=n(7),a=n.n(o),r=n(29),c=n.n(r),i=(n(718),n(13)),s=(n(719),n(38)),l=n(5),u=n.n(l),p=n(9),d=n(55);n(77);var m=n(22);function f(){m.j(),console.log("State"+m.f.state);var e=(new m.b).toDestination(),t=m.f.createGain();return t.gain.value=1e-37,e.connect(t),e.start(),Promise.resolve()}var h=n(11),v=n(0),w=n(1);function g(e){return t=function(e){for(var t=0,n=1779033703^e.length;t<e.length;t++)n=(n=Math.imul(n^e.charCodeAt(t),3432918353))<<13|n>>>19;return function(){return n=Math.imul(n^n>>>16,2246822507),n=Math.imul(n^n>>>13,3266489909),(n^=n>>>16)>>>0}}(e)(),function(){var e=t+=1831565813;return e=Math.imul(e^e>>>15,1|e),(((e^=e+Math.imul(e^e>>>7,61|e))^e>>>14)>>>0)/4294967296};var t}var b=null,y=null;function E(e,t){return S.apply(this,arguments)}function S(){return(S=Object(p.a)(u.a.mark((function e(t,n){var o;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==y){e.next=12;break}return y="constructing",e.next=4,Promise.all(t.map(function(){var e=Object(p.a)(u.a.mark((function e(t){var n,o;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.wordString,o=t.wordSound,e.t0=n,e.next=4,m.g().decodeAudioData(o.slice(0));case 4:return e.t1=e.sent,e.abrupt("return",{wordString:e.t0,wordSound:e.t1});case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 4:return o=e.sent,b=new T(o,"/its-not-over-til-the-bossa-nova.mp3",n),y="loading",e.next=9,b.load();case 9:y="loaded",e.next=13;break;case 12:throw new Error("Attempted to play song over already playing song.");case 13:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function k(){var e=Promise.resolve();return null!=b&&"running"===y&&(e=b.stop().then((function(){y="loaded"}))),e}function N(){null!==b&&"loaded"===y&&(b.play(),y="running")}function O(){return x.apply(this,arguments)}function x(){return(x=Object(p.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null===b||"running"!==y){e.next=9;break}return y="disposing",t=b,e.next=5,t.stop();case 5:return e.next=7,t.dispose();case 7:b=null,y=null;case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}m.e.on("start",(function(){console.log("Transport started")})),m.e.on("stop",(function(){console.log("Transport stopped")})),m.e.on("pause",(function(){console.log("Transport paused")}));var T=function(){function e(t,n,o){Object(v.a)(this,e),this.wordNotes=void 0,this.backingTrack=void 0,this.loaded=!1,this.topic=void 0,this.finishTime=void 0,this.fadeoutDuration=2,this.fadeoutDurationMs=1e3*this.fadeoutDuration,this.topic=o;var a=g(this.topic);this.backingTrack=new m.c({url:n,volume:-13,fadeOut:this.fadeoutDuration}).toDestination().sync();var r=5;this.wordNotes=t.reduce((function(e,t){var n=t.wordSound,o=function(e){return new m.d({urls:{C4:e},release:1}).toDestination().sync()}(n),c=n.duration,i=.8*c+(.1*a()*2-.1),s=Math.floor(2*a()*2)-2,l=[m.a(60+s).toFrequency()],u={sampler:o,word:t.wordString,originalDuration:c,duration:i,note:l,startTime:r},p=0;return a()<=0&&(p=1),r+=i+.01+p,[].concat(Object(h.a)(e),[u])}),[]),this.finishTime=r+this.fadeoutDuration;this.backingTrack.start(0,0,this.finishTime);for(var c=0;c<this.wordNotes.length;c++){this.wordNotes[c].sampler.triggerAttackRelease(this.wordNotes[c].note||440,this.wordNotes[c].duration||1,(this.wordNotes[c].startTime||0)+0)}m.e.loop=!1,console.log("Song constructed")}return Object(w.a)(e,[{key:"load",value:function(){var e=Object(p.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.h();case 2:this.loaded=!0,console.log("Song loaded");case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"play",value:function(){if(!this.loaded)throw Error("Song must be loaded before playing");m.e.start(m.i()),console.log("Song playing")}},{key:"stop",value:function(){console.log("Song stopping");var e,t=m.i();return m.e.stop(t),e=this.fadeoutDurationMs,new Promise((function(t){return setTimeout(t,e)}))}},{key:"dispose",value:function(){var e=Object(p.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(console.log("Song disposing"),m.e.cancel(0),t=0;t<this.wordNotes.length;t++)this.wordNotes[t].sampler.dispose();this.backingTrack.dispose(),console.log("Song disposed");case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),e}();var j,A=n(70),C=n(8),I={apiGateway:{URL:"/api"}},L=Object(C.a)({},I).apiGateway.URL;!function(e){e[e.SELECTION=0]="SELECTION",e[e.LOADING=1]="LOADING",e[e.PLAYING=2]="PLAYING"}(j||(j={}));var P={songStage:j.SELECTION,topic:null,words:null},D=Object(A.b)({name:"song",initialState:P,reducers:{selectTopic:function(e,t){e.songStage=j.LOADING,e.topic=t.payload},receiveSong:function(e,t){e.songStage=j.PLAYING,e.topic=t.payload.topic,e.words=t.payload.words.map((function(e){return e.wordString}))},restart:function(e){e.songStage=j.SELECTION,e.topic=null,e.words=null}}}),M=D.actions.restart,G=D.actions,B=G.receiveSong,R=G.selectTopic,U=function(){return function(e){window.history.pushState({},"","/"),e(M())}};var W=function(e){return function(t){t(R(e)),window.history.pushState({topic:e},e,"?topic="+e);var n,o=new URLSearchParams;return o.append("topic",e),o.append("limit","27"),(n="".concat(L,"/vocalTrack?").concat(o.toString()),fetch(n).then((function(e){if(!e.ok)throw new Error(e.statusText);return e.json()}))).then((function(e){var n={topic:e.topic,words:e.words};return t(B(n)),e.words.map((function(e){var t=e.wordSound;return{wordString:e.wordString,wordSound:Uint8Array.from(atob(t),(function(e){return e.charCodeAt(0)})).buffer}}))})).catch((function(e){return console.log("Unable to fetch song - "+e),t(U()),null}))}},F=function(e){return e.song.words||[]},Y=function(e){return e.song.topic};var z=function(e){return e.song.songStage},q=D.reducer;function J(){var e=Object(o.useState)(""),t=Object(i.a)(e,2),n=t[0],r=t[1],c=Object(s.b)();function l(){return m.apply(this,arguments)}function m(){return(m=Object(p.a)(u.a.mark((function e(){var t,o;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=f(),e.next=3,c(W(n));case 3:return o=e.sent,e.next=6,t;case 6:if(!o){e.next=17;break}return e.prev=7,e.next=10,E(o,n);case 10:N(),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(7),console.log("Got an error, heading back to selection. "+e.t0),c(U());case 17:case"end":return e.stop()}}),e,null,[[7,13]])})))).apply(this,arguments)}return Object(o.useEffect)((function(){var e,t=new URLSearchParams(window.location.search).get("topic");(e=t)&&0!==e.trim().length&&r(t||"")}),[]),a.a.createElement("div",{className:"col init"},a.a.createElement("form",{onSubmit:l},a.a.createElement("label",null,"Sing me a song about:",a.a.createElement("input",{className:"topicInput",value:n,type:"text",onChange:function(e){r(e.target.value)}})),a.a.createElement("div",null,a.a.createElement(d.AwesomeButton,{type:"primary",onPress:l},"Sing for me")),(["iPad Simulator","iPhone Simulator","iPod Simulator","iPad","iPhone","iPod"].includes(window.navigator.platform)||window.navigator.userAgent.includes("Mac")&&"ontouchend"in document)&&a.a.createElement("div",{className:"iphoneHint"},a.a.createElement("p",null,"Don't forget to unsilence your iphone (the physical switch on the top left of the phone) "))))}var _=n(62);function H(e){window.navigator.clipboard?window.navigator.clipboard.writeText(e).then((function(){console.log("Async: Copying to clipboard was successful!")}),(function(e){console.error("Async: Could not copy text: ",e)})):function(e){var t=document.createElement("textarea");t.value=e,t.style.top="0",t.style.left="0",t.style.position="fixed",document.body.appendChild(t),t.focus(),t.select();try{var n=document.execCommand("copy")?"successful":"unsuccessful";console.log("Fallback: Copying text command was "+n)}catch(o){console.error("Fallback: Oops, unable to copy",o)}document.body.removeChild(t)}(e)}function $(e){var t=Object(s.b)();function n(){return(n=Object(p.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:O(),t(U());case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var o=Object(_.d)();function r(){return(r=Object(p.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,k();case 3:return e.next=5,f();case 5:N(),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log("Unable to replay song "+e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}return a.a.createElement("div",{className:"col"},a.a.createElement("div",{className:"row justify-content-md-center"},a.a.createElement("div",{className:"col-md-4"},a.a.createElement("img",{className:"playingIcon",alt:"The song has started playing",src:"music_black.svg"}),a.a.createElement("h1",{className:"songTitle"},"\u201c",e.topic,"\u201d"))),a.a.createElement("div",{className:"row controls justify-content-md-center"},a.a.createElement("div",{className:"col-md-auto control-buttons"},a.a.createElement(d.AwesomeButton,{type:"primary",onPress:function(){return n.apply(this,arguments)}},"Start Over")),a.a.createElement("div",{className:"col-md-auto control-buttons"},a.a.createElement(d.AwesomeButton,{type:"primary",onPress:function(){return r.apply(this,arguments)}},"Replay")),a.a.createElement("div",{className:"col-md-auto control-buttons"},a.a.createElement(d.AwesomeButton,{type:"primary",onPress:function(){window.navigator.share?window.navigator.share({title:"Sentient Sam sings about "+e.topic,text:"Check out Sentient Sam. A robo-poet who'll sing about whatever you want it to.",url:window.location.href}).then((function(){return console.log("Successful share")})).catch((function(e){return console.log("Error sharing",e)})):(H(window.location.href),console.log("copied link to clipboard"),o.show("Copied link to clipboard"))}},"Copy link to song"))))}n(734);var K=n(699),Q=n.n(K);function V(){return a.a.createElement("div",{className:"col"},a.a.createElement("h1",null,"Invalid State"))}function X(){var e=Object(s.c)(z),t=Object(s.c)(F),n=Object(s.c)(Y);switch(e){case j.SELECTION:return a.a.createElement(J,null);case j.PLAYING:return null==t||null==n?V():a.a.createElement($,{words:t,topic:n});case j.LOADING:return a.a.createElement("div",{className:"loadingAnimation"},a.a.createElement(Q.a,{active:!0,color:"black",type:"line-scale-party"}),a.a.createElement("br",null),a.a.createElement("br",null),a.a.createElement("br",null),a.a.createElement("p",null,"loading..."));default:return V()}}n(735);var Z=n(700);function ee(){return a.a.createElement("div",{className:"aboutContent"},a.a.createElement("h2",null,"Sentient Sam"),a.a.createElement("p",null,"Sentient Sam is a robot poet designed by ",a.a.createElement("a",{href:"http://louislepper.co.nz"},"Louis Lepper"),"."),a.a.createElement("p",null,"Be aware that Sam doesn't have a filter, and may accidentally say things that offend."),a.a.createElement("p",null,"If you have any questions or comments let me know at ",a.a.createElement("a",{href:"mailto:public@louislepper.co.nz"},"public@louislepper.co.nz")),a.a.createElement("p",null,"Check out the sourcecode at ",a.a.createElement("a",{href:"https://github.com/louislepper/Sentient-Sam"},"https://github.com/louislepper/Sentient-Sam"),"."),a.a.createElement("p",null,"Thank you very much to ",a.a.createElement("a",{href:"https://www.freepik.com/"},"freepik.com")," for the royalty free images, and to ",a.a.createElement("a",{href:"https://www.silvermansound.com/"},"Shane Ivers")," for the backing track \"It's Not Over 'Til The Bossa Nova\"."))}var te=function(){var e=Object(o.useState)(!1),t=Object(i.a)(e,2),n=t[0],r=t[1];return a.a.createElement("div",{className:"App"},a.a.createElement("header",null,a.a.createElement("nav",null,a.a.createElement("div",{className:"navButtons"},a.a.createElement("button",{type:"button",className:"link-button",onClick:function(){return r(!0)}},"About"),a.a.createElement(Z.Modal,{open:n,onClose:function(){return r(!1)},center:!0},a.a.createElement(ee,null))))),a.a.createElement("div",{className:"container min-vh-100 song-container"},a.a.createElement("div",{className:"row min-vh-100 justify-content-center align-items-center"},a.a.createElement(X,null))),a.a.createElement("footer",null,a.a.createElement("div",{className:"attribution"},a.a.createElement("div",{className:"iconsAttribution"},"Icons made by ",a.a.createElement("a",{href:"http://www.freepik.com/",title:"Freepik"},"Freepik")," from ",a.a.createElement("a",{href:"https://www.flaticon.com/",title:"Flaticon"},"www.flaticon.com")),a.a.createElement("div",{className:"musicAttribution"},"Music: It's Not Over 'Til The Bossa Nova by Shane Ivers - ",a.a.createElement("a",{href:"https://www.silvermansound.com"},"https://www.silvermansound.com")))))},ne=Object(A.a)({reducer:{song:q}}),oe=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function ae(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}n(739);var re=n(701),ce={position:_.b.BOTTOM_CENTER,timeout:3500,offset:"30px",transition:_.c.SCALE};c.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(s.a,{store:ne},a.a.createElement(_.a,Object.assign({template:re.a},ce),a.a.createElement(te,null)))),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");oe?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var o=n.headers.get("content-type");404===n.status||null!=o&&-1===o.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):ae(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):ae(t,e)}))}}()}},[[713,1,2]]]);
//# sourceMappingURL=main.916cab67.chunk.js.map