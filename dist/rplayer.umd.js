(function(t,i){typeof exports=="object"&&typeof module<"u"?module.exports=i(require("hls.js")):typeof define=="function"&&define.amd?define(["hls.js"],i):(t=typeof globalThis<"u"?globalThis:t||self,t.rPlayer=i(t.Hls))})(this,function(t){"use strict";class i extends Audio{constructor(){super(),this.key="rplayer-volume",this.volume=parseFloat(localStorage.getItem(this.key)??"0.2")}async playSrc(e){const h=e.indexOf(".m3u8")>0;if(this.isPaused(e))this.play();else{this.stop(),h?t.isSupported()&&(this.hls=new t,this instanceof HTMLAudioElement&&this.hls.attachMedia(this),this.hls.loadSource(e),await new Promise(s=>{var n;(n=this.hls)==null||n.on(t.Events.MANIFEST_PARSED,()=>{s()})})):(this.src=e,await new Promise(s=>{this.addEventListener("loadedmetadata",()=>{s()})}));try{await this.play()}catch(s){console.error("Error on play",s)}}}mute(){this.muted=!this.muted}stop(){this.pause(),this.currentTime=0,this.hls&&(this.hls.destroy(),this.hls=null)}upVolume(){this.setVolume(this.volume+.1)}downVolume(){this.setVolume(this.volume-.1)}rewind(e){this.currentTime=this.currentTime-e}setVolume(e){if(e>=0&&e<=1){const h=Math.round(e*10)/10;if(h!==this.volume){this.volume=h;const s=new Event("volumechange");this.dispatchEvent(s),localStorage.setItem(this.key,h.toFixed(1))}}}isPaused(e){return this.currentTime>0&&!this.playing&&this.url===e}get isHls(){return this.hls!==null&&this.hls instanceof t}get url(){var e;return this.isHls?(e=this.hls)==null?void 0:e.url:this.src}get playing(){return this.currentTime>0&&!this.paused&&!this.ended&&this.readyState>2}}return i});
