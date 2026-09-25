class TransactionsWidget {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент виджета транзакций не найден');
    }
    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    const incomeBtn = this.element.querySelector('.create-income-button');
    const expenseBtn = this.element.querySelector('.create-expense-button');

    if (incomeBtn) {
      incomeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        App.getModal('newIncome').open();
      });
    }

    if (expenseBtn) {
      expenseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        App.getModal('newExpense').open();
      });
    }
  }
}