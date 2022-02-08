const file_picker = document.querySelector('.file_picker')
const uploadBtn = document.querySelector('.upload_btn')
const imageNameInput = document.querySelector('.image_name')
const imageInput = document.querySelector('.image_file');
const selected_img = document.querySelector('.img__');
const Add_btn = document.querySelector('.add_btn')
const backdrop = document.querySelector('.backdrop');
const upload_model = document.querySelector('.upload_box');
const loading_model  = document.querySelector('.loading_backdrop')
const scrolls = document.querySelector('.scroll')
const imageConteiner = document.querySelector('.image_container__')
const not_file_img = document.querySelector('.no__lists')
const bodyEl = document.body
uploadBtn.disabled = true


function defaultBtn(){
    imageInput.click()
    }
    file_picker.addEventListener('click',defaultBtn)

 

imageInput.addEventListener("change"
, function(){
   const file = this.files[0];
   if(file){
    
   const reader = new FileReader();
   reader.onload = function (){
   const result = reader.result;
//    console.log(result)
   selected_img.src =  result;
   if(imageNameInput.value.length > 1 &&  selected_img.src.length > 26){
    uploadBtn.disabled = false
}else
{
    uploadBtn.disabled = true  
}
   }
   reader.readAsDataURL(file)
   }
})

imageNameInput.addEventListener('keyup',function(){
    if(imageNameInput.value.length > 1 &&  selected_img.src.length > 26){
        uploadBtn.disabled = false
    }else
    {
        uploadBtn.disabled = true  

    }
})


//toggle model
Add_btn.addEventListener('click',()=>{
    scrolls.scrollIntoView({behavior:'smooth'}) 
    bodyEl.style.overflow = 'hidden'
    backdrop.classList.add('visible');
    setTimeout(() => {
        backdrop.style.opacity = '1'
        upload_model.classList.add('visible')
    }, 700);
})

const disableModels = ()=>{
    uploadBtn.disabled = true
    imageNameInput.value = '';
    imageInput.value =''
    selected_img.src = null
    selected_img.src.length = 0;
    bodyEl.style.overflow = 'auto'
    backdrop.classList.remove('visible')
    upload_model.classList.remove('visible')
    backdrop.style.opacity = '0'   
}
backdrop.addEventListener('click',()=>{
disableModels()
})


const appendImge = (src)=>{
const imageEl = document.createElement('div');
imageEl.className = 'image_box';
imageEl.innerHTML = `

            <img src="/${src}" alt="" class="image_loaded">
            <div class="drop_box">
                <img src="images/trash-alt.svg" alt="">
            </div>
`
imageConteiner.append(imageEl)
}


//send the data to the server
const sendImg = ()=>{

const title = imageNameInput.value;
const image = imageInput.files[0];
loading_model.style.display = 'block';
disableModels();

const data = new FormData()
data.append('title',title)
data.append('image',image)
fetch('/post_images',{
    body:data,
    method:'post'
}).then(result=>{
return result.json()
}).then(data=>{
   setTimeout(() => {
    loading_model.style.display = 'none';   
   }, 1000);
   if(not_file_img){
    console.log(not_file_img);
    not_file_img.style.display = 'none';
   }
   appendImge(data.data.imagepath)
   
})
.catch(err=>{
 console.log(err)
})
}
uploadBtn.addEventListener('click',sendImg)
