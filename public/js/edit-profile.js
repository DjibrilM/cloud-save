 
const uploadBtn  = document.querySelector('.image_upload');
const profile_img = document.querySelector('.profile_img_img')
const first_input = document.querySelector('.firstName');
const second_name_input = document.querySelector('.secondName');
const email_input = document.querySelector('.email');
const password_input = document.querySelector('.password');
const file_picker_input =  document.querySelector('.file_picker');
const edit_button = document.querySelector('.Edit')


edit_button.disabled = true

const validation =()=>{
    if(first_input.value.length > 1 &&
        second_name_input.value.length > 1 &&
        email_input.value.length > 1 &&
        password_input.value.length > 4
         && email_input.value.length > 2 
        && profile_img.src.length > 22
         ){
    edit_button.disabled = false
       }else
       {
        edit_button.disabled = true;  
       }
}


first_input.addEventListener('keyup',validation)
second_name_input.addEventListener('keyup',validation)
email_input.addEventListener('keyup',validation)
password_input.addEventListener('keyup',validation)

//render the selected status;
uploadBtn.addEventListener('click',()=>{
file_picker_input.click();
})
file_picker_input.addEventListener("change"
, function(){
   const file = this.files[0];
   if(file){
   
   const reader = new FileReader();
   reader.onload = function (){
   const result = reader.result;
   profile_img.src =  result;
   validation();
   }
   reader.readAsDataURL(file)
   }
})
function authRedirect (){
alert('hello world')
}


//reset_password-request
const reset_password = ()=>{
const form_data = new FormData();
form_data.append('firstaName',first_input);
form_data.append('secondName',second_name_input);
form_data.append('email',email_input);
form_data.append('password',password_input);

fetch('/set-profile',{
method:'post',
body:form_data
})
.then(result=>{
    return result.json()
}).then(data=>{
    console.log(data)
}).catch(err=>{
    alert(err)
    console.log(err);
})
}
edit_button.addEventListener('click',reset_password)
