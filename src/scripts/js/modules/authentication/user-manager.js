export default class UserManager {
  constructor() {
    this.users = JSON.parse(localStorage.getItem("users")) || [];
  }

  addUser(user) {
    this.users.push(user);
    localStorage.setItem("users", JSON.stringify(this.users));
  }

  findUser(email, password) {
    return this.users.find(
      (user) => user.email === email && user.password === password
    );
  }
}
