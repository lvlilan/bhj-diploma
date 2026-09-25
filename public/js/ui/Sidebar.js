class Sidebar {
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  static initToggleButton() {
    const toggleButton = document.querySelector('.sidebar-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.classList.toggle('sidebar-open');
        document.body.classList.toggle('sidebar-collapse');
      });
    }
  }

  static initAuthLinks() {
    const loginLink = document.querySelector('.menu-item_login');
    const registerLink = document.querySelector('.menu-item_register');
    const logoutLink = document.querySelector('.menu-item_logout');

    if (loginLink) {
      loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        App.getModal('login').open();
      });
    }

    if (registerLink) {
      registerLink.addEventListener('click', (e) => {
        e.preventDefault();
        App.getModal('register').open();
      });
    }

    if (logoutLink) {
      logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        User.logout((err, response) => {
          if (response && response.success) {
            App.setState('init');
          }
        });
      });
    }
  }
}