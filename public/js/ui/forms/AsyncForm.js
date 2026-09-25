class AsyncForm {
  constructor(element) {
    if (!element) {
      throw new Error('Элемент формы не найден');
    }
    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    this.element.addEventListener('submit', (e) => {
      e.preventDefault();
      this.submit();
    });
  }

  getData() {
    const formData = new FormData(this.element);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    return data;
  }

  onSubmit(options) {
  }

  submit() {
    this.onSubmit(this.getData());
  }
}