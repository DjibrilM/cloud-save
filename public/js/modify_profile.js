 const backdropModel = document.querySelector('.backdrop');
 const firstName = document.querySelector('.firstName').value
 const secondName = document.querySelector('.secondName').value
 const email = document.querySelector('.email').value
 const password = document.querySelector('.password').value
 const userId = document.querySelector('.__id').value
 const image = document.querySelector('.img_data')
 const updatingBtn  = document.querySelector('.Edit2')


  

//function for each event listener
const hiddeTheWornigModel = ()=>{
backdropModel.classList.add('invisible')
}

const resetProfile = ()=>{
const prifileImg = image.value
console.log(prifileImg);
const formdata = new FormData();
formdata.append('firstsName',firstName)
formdata.append('secondName',secondName)
formdata.append('email',email)
formdata.append('password',password)
formdata.append('_id',userId)
formdata.append('file',prifileImg)
fetch('/profile-reset',{
method:'post',
body:formdata
})
.then(result=>{
    console.log(result)
   return result.json()
}).then(data=>{
    console.log(data)
}).catch(err=>{
    console.log('some thing went wrong in the request !')
})

}







 // event_listerner
 backdropModel.addEventListener('click',hiddeTheWornigModel)
 updatingBtn.addEventListener('click',resetProfile)
