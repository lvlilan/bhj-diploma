class CreateTransactionForm extends AsyncForm {
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  renderAccountsList() {
    Account.list({}, (err, response) => {
      if (response && response.success && response.data) {
        const select = this.element.querySelector('.accounts-select');
        if (!select) return;

        select.innerHTML = '';

        response.data.forEach((account) => {
          const option = document.createElement('option');
          option.value = account.id;
          option.textContent = account.name;
          select.appendChild(option);
        });
      }
    });
  }

  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response && response.success) {
        this.element.reset();
        App.update();

        const type = data.type;
        const modalName = type === 'income' ? 'newIncome' : 'newExpense';
        App.getModal(modalName).close();
      }
    });
  }
}