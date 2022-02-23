export default class UserRole {
  static Regular = new UserRole('ROLE_USER');
  static Owner = new UserRole('ROLE_ADMIN');

  constructor(name) {
    this.name = name;
  }
}
