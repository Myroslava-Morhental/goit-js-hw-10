const STORAGE_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

const formEl = document.querySelector('.feedback-form');

// Витягла дані з локалстореджа
const formDataStorage = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
console.log(formDataStorage);
// Якщо пусті дані - то нічого не потрібно змінювати, якщо не пусті - записати
// в обєкт та поля форми
if (formDataStorage) {
  formData.email = formDataStorage.email ?? '';
  formData.message = formDataStorage.message ?? '';
}
formEl.elements.email.value = formData.email;
formEl.elements.message.value = formData.message;

formEl.addEventListener('input', handleInput);
formEl.addEventListener('submit', handleSubmit);

function handleInput(event) {
  const fieldName = event.target.name;
  const fieldValue = event.target.value.trim();

  if (!(fieldName in formData)) {
    return;
  }

  formData[fieldName] = fieldValue;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function handleSubmit(event) {
  event.preventDefault();
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);
  localStorage.removeItem(STORAGE_KEY);
  formData.email = '';
  formData.message = '';
  formEl.reset();
}
