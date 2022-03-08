const firstNmae = document.querySelector('.first_name');
const secondNmae = document.querySelector('.secondName')
const email = document.querySelector('.email')
const password = document.querySelector('.password');
const SignUpBtn = document.querySelector('.sign_btn');
const secretQuestion = document.querySelector('.secret_question');
const secret_answer = document.querySelector('.secret_answer')
const waringBackdrop = document.querySelector('.back_drop_2');
const worningModel = document.querySelector('.worning');
const image = document.querySelector('.choosed_image')
const fileInput = document.querySelector('.input_file')
const customerBtn = document.querySelector('.customerBtn')


SignUpBtn.disabled = true

const validation =()=>{
    if(firstNmae.value.length > 1 &&
        secondNmae.value.length > 1 &&
        email.value.length > 1 &&
        password.value.length > 4
         && secretQuestion.value.length > 2 &&
         secret_answer.value.length > 2 
        && image.src.length > 26
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
secretQuestion.addEventListener('keyup',validation)
secret_answer.addEventListener('keyup',validation)
waringBackdrop.addEventListener('click',()=>{
    waringBackdrop.classList.remove('visible');
    worningModel.classList.remove('visible');   
})

//render the selected status;
customerBtn.addEventListener('click',()=>{
fileInput.click();
})
fileInput.addEventListener("change"
, function(){
   const file = this.files[0];
   if(file){
   
   const reader = new FileReader();
   reader.onload = function (){
   const result = reader.result;
   image.src =  result;
   validation();
   }
   reader.readAsDataURL(file)
   }
})

function authRedirect (){
alert('hello world')
}
