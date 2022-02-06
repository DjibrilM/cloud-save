// const { post } = require("../../routes/admin");

let body = document.body
const Anput = document.querySelector('.note_title_input');
const textArea = document.querySelector('.Note-body-nput');
window.addEventListener('load',()=>{
   const Mode = JSON.parse(localStorage.getItem('Mode'))
   if(Mode !== null){
    Anput.style.color = '#fff';
    body.style.background = '#222';
    textArea.style.background = '#444';
    textArea.style.boxShadow = '#666'
    textArea.style.color = '#fff';
   } else
   {
       return;
   }
})


const formAppend = document.querySelector('.note_body');
const backBtn = document.querySelector('.backButton');
backBtn.addEventListener('click', ()=>{
    history.back()
})


//addnotesIn the server
const AddBtn  = document.querySelector('.save_note')
AddBtn.addEventListener('click',addNote)

function  addNote(){
let noteTile = document.querySelector('.note_title_input').value;
let noteContent = document.querySelector('.Note-body-nput').value;
const formdata = new FormData();
formdata.append('title',noteTile);
formdata.append('noteContent',noteContent)

fetch('/post_add_note',{
    method:'post',
    body:formdata
}).then(result=>{
    return result.json()
})
.then(data=>{
    console.log(data)
})
.catch(err=>{
    console.log(err)
})

}

