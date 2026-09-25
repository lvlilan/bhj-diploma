class TransactionsPage {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент страницы транзакций не найден');
    }
    this.element = element;
    this.currentAccountId = null;
    this.registerEvents();
  }

  update() {
    if (this.currentAccountId) {
      this.render({ account_id: this.currentAccountId });
    }
  }

  registerEvents() {
    const removeAccountBtn = this.element.querySelector('.remove-account');
    if (removeAccountBtn) {
      removeAccountBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.removeAccount();
      });
    }

    this.element.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('.transaction__remove');
      if (removeBtn) {
        e.preventDefault();
        const id = removeBtn.dataset.id;
        this.removeTransaction(id);
      }
    });
  }

  removeAccount() {
    if (!this.currentAccountId) {
      return;
    }

    const confirmed = confirm('Вы уверены, что хотите удалить счёт?');
    if (!confirmed) {
      return;
    }

    Account.remove({ id: this.currentAccountId }, (err, response) => {
      if (response && response.success) {
        this.currentAccountId = null;
        this.clear();
        App.updateWidgets();
        App.updateForms();
      }
    });
  }

  removeTransaction(id) {
    const confirmed = confirm('Вы уверены, что хотите удалить транзакцию?');
    if (!confirmed) {
      return;
    }

    Transaction.remove({ id }, (err, response) => {
      if (response && response.success) {
        App.update();
      }
    });
  }

  render(options = {}) {
    const accountId = options.account_id;
    if (!accountId) {
      return;
    }

    this.currentAccountId = accountId;

    Account.get(accountId, (err, response) => {
      if (response && response.success && response.data) {
        this.renderTitle(response.data.name);
      }
    });

    Transaction.list({ account_id: accountId }, (err, response) => {
      if (response && response.success && response.data) {
        this.renderTransactions(response.data);
      } else {
        this.renderTransactions([]);
      }
    });
  }

  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.currentAccountId = null;
  }

  renderTitle(name) {
    const title = this.element.querySelector('.content-title');
    if (title) {
      title.textContent = name;
    }
  }

  formatDate(date) {
    const d = new Date(date);
    const months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];

    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');

    return `${day} ${month} ${year} г. в ${hours}:${minutes}`;
  }

  getTransactionHTML(item) {
    const isIncome = item.type === 'income';
    const typeClass = isIncome ? 'transaction_income' : 'transaction_expense';
    const iconClass = isIncome ? 'fa-thumbs-o-up' : 'fa-thumbs-o-down';

    return `
      <div class="transaction ${typeClass}">
        <div class="transaction__details">
          <div class="transaction__icon">
            <span class="fa ${iconClass}"></span>
          </div>
          <div class="transaction__title">
            <div class="transaction__name">${item.name}</div>
            <div class="transaction__date">${this.formatDate(item.created_at)}</div>
          </div>
          <div class="transaction__summ">
            ${item.sum}
          </div>
          <div class="transaction__controls">
            <button class="btn btn-danger transaction__remove" data-id="${item.id}">
              <i class="fa fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderTransactions(data) {
    const content = this.element.querySelector('.content');
    if (!content) {
      return;
    }

    content.innerHTML = '';

    data.forEach((item) => {
      content.insertAdjacentHTML('beforeend', this.getTransactionHTML(item));
    });
  }
}