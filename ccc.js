class UserManager {
  constructor() {
    this.users = {};
  }

  createUser(userId, name, email) {
    if (typeof userId !== "number" || !name || !email) {
      return { "create user failed": "Invalid input" };
    }
    if (this.users[userId]) {
      return { "create user failed": "User already exists" };
    }
    for (const u of Object.values(this.users)) {
      if (u.email === email) {
        return { "create user failed": "User already exists" };
      }
    }
    this.users[userId] = { id: userId, name, email };
    return { "create user success": this.users[userId] };
  }

  getAllUsers() {
    return Object.values(this.users).sort((a, b) => a.id - b.id);
  }

  getUserById(userId) {
    return this.users[userId] || { "get user failed": "NOT FOUND" };
  }

  updateUserEmail(userId, newEmail) {
    const user = this.users[userId];
    if (!user) {
      return { "update email failed": "User not found" };
    }

    for (const u of Object.values(this.users)) {
      if (u.email === newEmail) {
        return { "update email failed": "Email already in use" };
      }
    }
    user.email = newEmail;
    return { "update email success": user };
  }

 
  deleteUser(userId) {
    if (!this.users[userId]) {
      return { "delete user failed": "User not found" };
    }
    const deletedUser = this.users[userId];
    delete this.users[userId];
    return { "delete user success": deletedUser };
  }
}

const manager = new UserManager();
manager.createUser(3, "Ali", "ali@mail.com");
manager.createUser(1, "anfal", "anfal@mail.com");
manager.createUser(2, "Noor", "noor@mail.com");

console.log(manager.getAllUsers());

console.log(manager.updateUserEmail(2, "noor.new@mail.com"));

console.log(manager.getAllUsers());

console.log(manager.deleteUser(1)); 
console.log(manager.getAllUsers());
