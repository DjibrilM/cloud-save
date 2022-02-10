const LoadingBckDrop = document.querySelector('.loading_page')
const main = document.querySelector('main');
const menuBtn = document.querySelector('.menu_btn');
const menuBox = document.querySelector('.menu_sercle');
const togglePlace = document.querySelector('.toogle_place')
const toggleBtn = document.querySelector('.toggle_btn');
const lightMode = document.querySelector('#light');
const darkMode = document.querySelector('#dark');
const body = document.body;
const inputSearch = document.querySelector('.search-input_container');
const inputSearchBtn = document.querySelector('.search-input_container button')
const text = document.querySelectorAll('.text_color');
const notes = document.querySelectorAll('.noteList');



window.addEventListener('load', ()=>{
    
    setTimeout(() => {
        LoadingBckDrop.classList.add('backgrop_close');
        LoadingBckDrop.addEventListener('transitionend', ()=>{
            LoadingBckDrop.remove();
            main.style.opacity = 1;
            main.style.overflow = 'auto';
            main.style.height = 'auto';
            body.style.overflow = 'auto';
            // document.querySelector('a').style.color = '#eee';
        })
    }, 0);



    //setting the modeColor 
    const takeTheModeChoosed = JSON.parse(localStorage.getItem('Mode'));
    if(takeTheModeChoosed !== null){
    body.classList.add(takeTheModeChoosed[0]);
    toggleBtn.classList.add(takeTheModeChoosed[1]);
    inputSearch.classList.add(takeTheModeChoosed[2]);
    for(const texts of text ){
        texts.classList.add(takeTheModeChoosed[3]);
    }
    for(const note of notes ){
        note.classList.add(takeTheModeChoosed[4]);
    }
    }else{
        text.forEach(texts => {
            texts.style.color = '#333';
        });
    }
})


//DISPLAY THE DARK MODE
let test  = 0;
menuBtn.addEventListener('click', ()=>{
    menuBox.classList.toggle('actived');
    togglePlace.classList.toggle('toogle_place');
    
    if(test === 0)
    {
        menuBtn.src = '/images/close.svg'
        test = 1
    }else if(test === 1)
    {
        menuBtn.src = '/images/align-right.svg'
        test = 0;
    }
})

//Dark mode SetUp
darkMode.addEventListener('click', ()=> {
 
   const arryOfClassList  = ['blackBackground',
                             'toogleBtnToleft',
                             'inputDark' ,
                             'darkColor',
                              'noteBlack',   
                            ]

                            localStorage.setItem('Mode', JSON.stringify(arryOfClassList));
                            body.classList.add('blackBackground');
                            toggleBtn.classList.add('toogleBtnToleft');
                            inputSearch.classList.add('inputDark');
                            // inputSearchBtn.classList.add('blackBackground');
                          text.forEach(texts => {
                            texts.style.color  ='#eee';
                          });
                            for(const note of notes ){
                                note.classList.add('noteBlack');
                            }
                            
})

//setting of the ligthMode 

lightMode.addEventListener('click', ()=>{
    body.style.transition = '1s'
    body.classList.remove('blackBackground');
    toggleBtn.classList.remove('toogleBtnToleft');
    inputSearch.classList.remove('inputDark');
    // inputSearchBtn.classList.add('blackBackground');
    text.forEach(texts => {
        texts.style.color  = 'black';
    });
    for(const note of notes ){
        note.classList.remove('noteBlack');  

    }
    localStorage.clear('Mode');
})
//populate the image picker







