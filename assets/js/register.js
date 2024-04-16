import { User } from "./class.js";

const registerForm = document.querySelector("#register-form");
const userNameInp = document.querySelector("#user-name");
const userEmailInp = document.querySelector("#user-email");
const userPasswordInp = document.querySelector("#user-password");
const userConfirmPassInp = document.querySelector("#user-confirm-password");

function inputValidation() {
  // const inps = document.querySelectorAll('.form-control')
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // inps.forEach(input => {});
  if (userNameInp.value.length < 3 ) {
    userNameInp.nextElementSibling.classList.replace('d-none','d-block')
  }
  else{
    userNameInp.nextElementSibling.classList.replace('d-block','d-none')
  }
  if (!emailPattern.test(userEmailInp.value)) {
    userEmailInp.nextElementSibling.classList.replace('d-none','d-block')
  }
  else{
    userEmailInp.nextElementSibling.classList.replace('d-block','d-none')
  }

  if (!passwordPattern.test(userPasswordInp.value)) {
    userPasswordInp.nextElementSibling.classList.replace('d-none','d-block')
  }
   else{
      userPasswordInp.nextElementSibling.classList.replace('d-block','d-none')
      if (userPasswordInp.value !== userConfirmPassInp.value) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "password no same confirm password",
          showConfirmButton: false,
          timer: 1500,
        })
      } 
      else{
        return true
      }
    }
}


registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputValidation()) {
    const newUser = new User(
      userNameInp.value,
      userEmailInp.value,
      userPasswordInp.value
    );
    resetForm();
    //set user to localStorage
    const localUsers = JSON.parse(localStorage.getItem('users'));
    localUsers.push(newUser);
    localStorage.setItem('users',JSON.stringify(localUsers));
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "User Signed Up successfully",
      showConfirmButton: false,
      timer: 1500,
    }).then((result) => {
      //redirect login page
      window.location.replace("login.html");
    });
  }
  // else{
  //   Swal.fire({
  //     position: "top-end",
  //     icon: "error",
  //     title: "User Signed not succes",
  //     showConfirmButton: false,
  //     timer: 1500,
  //   })
  // }
});

function resetForm() {
  userNameInp.value = "";
  userEmailInp.value = "";
  userPasswordInp.value = "";
  userConfirmPassInp.value = "";
}
