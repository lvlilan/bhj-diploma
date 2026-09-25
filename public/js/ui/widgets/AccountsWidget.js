class AccountsWidget {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент виджета счетов не найден');
    }
    this.element = element;
    this.registerEvents();
    this.update();
  }

  registerEvents() {
    const createBtn = this.element.querySelector('.create-account');
    if (createBtn) {
      createBtn.addEventListener('click', (e) => {
        e.preventDefault();
        App.getModal('createAccount').open();
      });
    }

    this.element.addEventListener('click', (e) => {
      const accountItem = e.target.closest('.account');
      if (accountItem) {
        e.preventDefault();
        this.onSelectAccount(accountItem);
      }
    });
  }

  update() {
    const user = User.current();
    if (!user) {
      return;
    }

    Account.list({}, (err, response) => {
      if (response && response.success && response.data) {
        this.clear();
        this.renderItems(response.data);
      }
    });
  }

  clear() {
    const accounts = this.element.querySelectorAll('.account');
    accounts.forEach((item) => item.remove());
  }

  onSelectAccount(element) {
    const active = this.element.querySelector('.account.active');
    if (active) {
      active.classList.remove('active');
    }
    element.classList.add('active');

    const id = element.dataset.id;
    App.showPage('transactions', { account_id: id });
  }

  getAccountHTML(item) {
    return `
      <li class="account" data-id="${item.id}">
        <a href="#">
          <span>${item.name}</span>
        </a>
      </li>
    `;
  }

  renderItems(data) {
    data.forEach((item) => {
      const html = this.getAccountHTML(item);
      this.element.insertAdjacentHTML('beforeend', html);
    });
  }
}