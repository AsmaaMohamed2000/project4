let form = document.querySelector('form');
let firstName = document.getElementById('Firstname');
let secondName = document.getElementById('Secondname');
let email = document.querySelector('input[type="email"]');
let password = document.querySelector('input[type="password"]');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (
    email.value !== '' &&
    password.value !== '' &&
    firstName.value !== '' &&
    secondName.value !== ''
  ) {
    localStorage.setItem('firstName', firstName.value);
    localStorage.setItem('secondName', secondName.value);
    localStorage.setItem('email', email.value);
    localStorage.setItem('password', password.value);
    alert('account created successfuly')
    window.location.href = 'login.html';
  }
  else{
    alert('Fill all inputs')
  }
});
