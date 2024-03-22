export default class Cookie {
  constructor(name, value, expireDate) {
    this.name = name;
    this.value = value;
    this.expireDate = expireDate;
    this.initCookie();
  }

  initCookie() {
    const cookieString = `${this.name}=${this.value};expires=${this.expireDate.toUTCString()};path=/`;
    document.cookie = cookieString;
  }

  static getAll() {
    return document.cookie.split('; ').reduce((cookies, cookie) => {
      const [name, value] = cookie.split('=');
      cookies[name] = value;
      return cookies;
    }, {});
  }

  static get(name) {
    return this.getAll()[name];
  }

  static delete(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }
}