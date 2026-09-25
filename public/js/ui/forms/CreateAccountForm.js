class CreateAccountForm extends AsyncForm {
  onSubmit(data) {
    Account.create(data, (err, response) => {
      if (response && response.success) {
        this.element.reset();
        App.getModal('newAccount').close();
        App.update();
      }
    });
  }
}