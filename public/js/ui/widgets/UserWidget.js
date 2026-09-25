class UserWidget {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент виджета пользователя не найден');
    }
    this.element = element;
  }

  update() {
    const user = User.current();
    const userName = this.element.querySelector('.user-name');

    if (user && userName) {
      userName.textContent = user.name;
    }
  }
}