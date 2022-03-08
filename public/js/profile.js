const edit_profile_btn = document.querySelector('.Edit2');
const editInput = document.querySelector('.__password_edit');
const userProfile = document.querySelector('.loaded_profile')

edit_profile_btn.addEventListener('click',()=>{
toggleEidt('visible','invisible')
})
//toggle function
function toggleEidt (visible,invisible){
editInput.classList.add(visible);
userProfile.classList.add(invisible);
}



