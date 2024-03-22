export default class Cookie {
  constructor(name, value, expireDate) {
    this.name = name;
    this.value = value;
    this.expireDate = expireDate;
    this.initCookie();
  }
  initCookie() {
    let cookieString = `${this.name}=${this.value}`;
    const expires = new Date(this.expireDate).toUTCString();
    cookieString += `; expires=${expires}`;
    document.cookie = cookieString;
  }
  deleteCookie() {
    // this.setCookie(this.name, "", { expires: new Date(0) });
    // delete this.cookies[this.name];
    // browser.cookies.remove({name: this.name});
    document.cookie = `${this.name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
  static getExistingCookies() {
    const cookieString = document.cookie;
    console.log(document.cookie);
    let cookies = {};
    if (cookieString !== "") {
      const cookieArray = cookieString.split("; ");
      console.log(cookieArray);
      cookieArray.forEach((cookie) => {
        const [name, value] = cookie.split("=");
        cookies[name] = value;
      });
    }
    return cookies;
  }
  static checkCookie(name) {
    const allCookies = this.getExistingCookies();
    return allCookies[name] !== null;
  }
  static getCookie(name) {
    const allCookies = this.getExistingCookies();
    return new Cookie(name, allCookies[name]);
  }
}
