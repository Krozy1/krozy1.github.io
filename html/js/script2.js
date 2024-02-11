const form = document.querySelector('form');
const fullName = document.getElementById('name');
const email = document.getElementById('email');
const discord = document.getElementById('discord');
const years = document.getElementById('years');
const message = document.getElementById('message');

function sendEmail() {
    const bodyMessage = `Полное имя: ${fullName.value}<br> Почта: ${email.value}<br> Discord ID: ${discord.value}<br> Возраст: ${years.value}<br> Комментарий: ${message.value}`;

  Email.send({
    SecureToken : 'a1bde7b4-f200-433d-8a5b-c6a5c35018bb',
    To : 'Krozy.avik@gmail.com',
    From : "Krozy.avik@gmail.com",
    Subject : "Заявка на вступление",
    Body : bodyMessage
}).then(
  message => {
    if (message == 'OK'){
      Swal.fire({
        title: "Заявка отправлена!",
        text: "Ждите ответа на почту!",
        icon: "success"
      });
    }
    
  }
);
}
function checkInputs() {
  const items = document.querySelectorAll('.item');

  for (const item of items) {
    if (item.value == '') {
      item.classList.add('error');
      item.parentElement.classList.add('error');
    }

    if (items[1].value != '') {
      checkEmail();
    }

    items[1].addEventListener('keyup', () => {
      checkEmail();
    });

    item.addEventListener('keyup', () => { 
      if (item.value != '') {
        item.classList.remove('error');
        item.parentElement.classList.remove('error');
      }
      else {
        item.classList.add('error');
        item.parentElement.classList.add('error');
      } 
    });
  }
}

function checkEmail() {
  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
  const errorTxtEmail = document.querySelector('.error-txt.email')

  if (!email.value.match(emailRegex)) {
    email.classList.add('error');
    email.parentElement.classList.add('error');

    if (email.value != '') {
      errorTxtEmail.innerText = 'Введите корректную почту';
    }
    else {
      errorTxtEmail.innerText = 'Email не может быть пустым!';
    }
  }
  else {
    email.classList.remove('error');
    email.parentElement.classList.remove('error');
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkInputs();

  if (!fullName.classList.contains('error') && !email.classList.contains('error') && !discord.classList.contains('error') && !years.classList.contains('error') && !message.classList.contains('error')) {
      sendEmail();

      form.reset();
      return false;
  }

});