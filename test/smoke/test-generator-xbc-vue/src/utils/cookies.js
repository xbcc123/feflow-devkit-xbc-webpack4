export default {
  setCookie(name, value) {
    const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (let i = keys.length; i--;) {
        if (name === keys[i]) {
          this.delCookie(name);
        }
      }
    }
    const Days = 10;
    const exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${escape(value)};expires=${exp.toGMTString()}`;
  },

  getCookie(name) {
    let arr,
      reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
    if ((arr = document.cookie.match(reg))) {
      return unescape(arr[2]);
    } else {
      return null;
    }
  },

  delCookie(name) {
    const exp = new Date();
    exp.setTime(exp.getTime() - 1);
    const cval = this.getCookie(name);
    if (cval != null) {
      document.cookie = `${name}=${cval};expires=${exp.toGMTString()}`;
    }
  },

  clearCookie() {
    const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (let i = keys.length; i--;) {
        document.cookie = `${keys[i]}=0;expires=${new Date(0).toUTCString()}`;
      }
    }
  },
};
