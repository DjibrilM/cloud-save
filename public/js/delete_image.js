
const images_box = document.querySelectorAll('.image_box');
const imageContainer = document.querySelector('.image_container__');
const empty_list = document.querySelector('.empty_list')
const deleteWrning = document.querySelector('.worning');
const warningBackdrop = document.querySelector('.WrningBack_drop')
// const emptyList = document.createElement('div');
// emptyList.className = 'no__lists'
// emptyList.innerHTML = `
// <h1 class="no_list">List Empty</h1>
// <div class="no_list_box">
// <img src="/images/download (8).svg" alt="">
// </div>`;

//delete request 
const deleteFunction = (id,mageEl)=>{
const formdata = new FormData();
formdata.append('id',id)
fetch('/delete',{
    body:formdata,
    method:'delete'
}).then(result=>{
   return result.json()
}).then(data=>{
    console.log(data)
  return  mageEl.remove();
})
.then(emptyFile=>{
    if(imageContainer.children.length < 1){
        
        empty_list.innerHTML = `
        <h1 class="no_list">List Empty</h1>
        <div class="no_list_box">
        <img src="/images/download (8).svg" alt="">
        </div>
        `;
        // empty_list.style.display = 'block'
        empty_list.style.display = 'block';
       }
       warningBackdrop.style.display = 'none';
       deleteWrning.style.display = 'none';     
})
.catch(error=>{
    console.log(error)
})
}

// for(const element of  images_box) {
// const image_id = element.querySelector('input').value
// const btnElement =  element.querySelector('.drop_box');
// btnElement.addEventListener('click',()=>{
// console.log(element)
// deleteWrning.style.display = 'block';
// warningBackdrop.style.display = 'block';
// deleteWrning.querySelector('button:nth-child(1)').addEventListener('click',()=>{
// deleteFunction(image_id,element)
// })

//     deleteWrning.querySelector('button:nth-child(2)').addEventListener('click',()=>{    
//     warningBackdrop.style.display = 'none';
//     deleteWrning.style.display = 'none';
//     console.log(element,'element ')
//     })
       


// });
// }




function deleFunc (event){
const btnElement = event.target.closest('.drop_box')
const imageId = btnElement.parentElement.querySelector('input').value
const imageEl = btnElement.parentElement

  deleteWrning.style.display = 'block';
  warningBackdrop.style.display = 'block';
  deleteWrning.querySelector('button:nth-child(1)').addEventListener('click',()=>{
  deleteFunction(imageId,imageEl)
  })



    deleteWrning.querySelector('button:nth-child(2)').addEventListener('click',()=>{   
    location.reload(); 
    })
}


 

