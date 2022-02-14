export default class UserRole {
  static Regular = new UserRole('user');
  static Owner = new UserRole('owner');

  constructor(name) {
    this.name = name;
  }
}
