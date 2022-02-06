const firstNmae = document.querySelector('.first_name');
const secondNmae = document.querySelector('.secondName')
const email = document.querySelector('.email')
const password = document.querySelector('.password');
const SignUpBtn = document.querySelector('.sign_btn');


SignUpBtn.disabled = true

const validation =()=>{
    if(firstNmae.value.length > 1 &&
        secondNmae.value.length > 1 &&
        email.value.length > 3 &&
        password.value.length > 4
         ){
    SignUpBtn.disabled = false
    console.log('btn disabled')
       }else
       {
        SignUpBtn.disabled = true;  
       }
}

 

firstNmae.addEventListener('keyup',validation)
secondNmae.addEventListener('keyup',validation)
email.addEventListener('keyup',validation)
password.addEventListener('keyup',validation)




//render the selected status;

