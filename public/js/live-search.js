

const input = document.querySelector('.search_input');
const result_box = document.querySelector('.live_search_box');
const resultContainer = document.querySelector('.result-container')
const closeSearcModel = result_box.querySelector('.close_search_model')

const search  =(event)=>{
result_box.style.display  = 'block'

if(event.target.value.trim() === ''){
result_box.style.display  = 'none'
return;
}

if(event.target.value.length < 1){
    result_box.style.display  = 'none'
    resultContainer.innerHTML = `
    <div class="result-container"></div>
    `
return;
}
const formdata = new FormData();
formdata.append('title', event.target.value)

fetch('/search_img',{
    body:formdata,
    method:'post'
}).then(Result=>{
return Result.json()
}).then(data=>{
if(event.target.value.length > 0 && data.length < 1){
 resultContainer.innerHTML = `
 <h4>Nothing  Found</h4>
 <p>make sure that you wrote it well !</p> 
 `
return
}
// console.log(event.target.value.length)
resultContainer.innerHTML = `
<div class="result-container"></div>
`
data.forEach(element => {
const link = document.createElement('a');
link.innerHTML = `
<a href="djibril">${element.title}</a>
`
resultContainer.append(link);
});
})
}
//closeModelByclick
const closeSearchModel = ()=>{
result_box.style.display  = 'none' 
resultContainer.innerHTML = `
<div class="result-container"></div>`
input.value = ''
}
input.addEventListener('keyup', search)
closeSearcModel.addEventListener('click',closeSearchModel)
