import s from "hls.js";
class o extends Audio {
  constructor() {
    super(), this.key = "rplayer-volume", this.volume = this.isAppleDevice() ? 1 : parseFloat(localStorage.getItem(this.key) || "0.2");
  }
  async playSrc(e) {
    const l = e.indexOf(".m3u8") > 0;
    if (this.isPaused(e))
      this.play();
    else {
      this.stop(), l && !this.canPlayType("application/vnd.apple.mpegurl") ? s.isSupported() && (this.hls = new s(), this instanceof HTMLAudioElement && this.hls.attachMedia(this), this.hls.loadSource(e), await new Promise((t) => {
        var i;
        (i = this.hls) == null || i.on(s.Events.MANIFEST_PARSED, () => {
          t();
        });
      })) : (this.src = e, await new Promise((t) => {
        this.addEventListener("loadedmetadata", () => {
          t();
        });
      }));
      try {
        await this.play();
      } catch (t) {
        console.error("Error on play", t);
      }
    }
  }
  mute() {
    this.muted = !this.muted;
  }
  stop() {
    this.pause(), this.currentTime = 0, this.hls && (this.hls.destroy(), this.hls = null);
  }
  /**
   * @param {number} secondes
   */
  rewind(e) {
    this.currentTime = this.currentTime - e;
  }
  upVolume() {
    !this.isAppleDevice() && this.volume < 1 && (this.volume = parseFloat((this.volume + 0.1).toFixed(1)), localStorage.setItem(this.key, this.volume.toString()));
  }
  downVolume() {
    !this.isAppleDevice() && this.volume > 0.1 ? (this.volume = parseFloat((this.volume - 0.1).toFixed(1)), localStorage.setItem(this.key, this.volume.toString())) : this.isAppleDevice() || (this.volume = 0, localStorage.setItem(this.key, "0"));
  }
  /**
   * @returns {boolean}
   */
  get isHls() {
    return this.hls !== null && this.hls instanceof s;
  }
  /**
   * @returns {string | undefined}
   */
  get url() {
    var e;
    return this.isHls ? (e = this.hls) == null ? void 0 : e.url : this.src;
  }
  /**
   * @returns {boolean}
   */
  get playing() {
    return this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2;
  }
  /**
   * @returns {boolean}
   */
  isAppleDevice() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }
  /**
   * @param {string} src
   * @returns
   */
  isPaused(e) {
    return this.currentTime > 0 && !this.playing && this.url === e;
  }
}
export {
  o as default
};
