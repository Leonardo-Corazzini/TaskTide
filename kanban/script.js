const addBtn = document.querySelector('.add-button')
const overlayContainer = document.querySelector('.overlay-container')
const addForm = document.getElementById('add-form')
const confirmBtn = document.getElementById('confirm-button')
const toDoText = document.getElementById('to-do-text')
const cardBody = document.querySelector('.card-body')
const cards = document.querySelectorAll('.card-body')
const trashImg = document.querySelector('.trash-img')
const closeBtn = document.querySelector('.closed-btn')
const selectedIcon = document.querySelectorAll('.icon')
const selectedColor = document.querySelectorAll('.color-section > *')
// const colorPicker = document.querySelector('.color-picker')
const randomBgColor = document.querySelector('.random-bg')
const questionMark = document.querySelector('.fa-question')
let icon = null
let color = null
let misteryColor = null
let arrayColor = []
const darkBtn = document.querySelector('.dark-button')


// pulsante per attivARE DARKMODE
darkBtn.addEventListener('click', function(){
   document.body.classList.toggle('dark-mode')
})
// ascolto bottone di aggiunta task
addBtn.addEventListener('click', function () {
    overlayContainer.classList.remove('d-off')
    overlayContainer.classList.add('overflow-h')
})
// aggiunto evento di click su ogni icona
for (let i = 0; i < selectedIcon.length;i++){
    let iconChekced = selectedIcon[i]

    iconChekced.addEventListener('click',function(){
        removeIconFocus()
        iconChekced.classList.add('focus')
        icon = iconChekced.innerHTML
    })
}
// aggiunto evento di click su ogni colore
for (let i = 0; i < selectedColor.length;i++){
    let colorChecked = selectedColor[i]
    colorChecked.addEventListener('click',function(event){
        removeColorFocus()
        if (event.target === randomBgColor || event.target === questionMark){
            misteryColor = `background-color: ${randomColor()}; color:${colorText()};`
            colorChecked.classList.add('focus')
        } else {
            color = colorChecked.className
            colorChecked.classList.add('focus')
        }
        

    })
}
// rimozione focus sul click dell'overlay ma fuori dal form
overlayContainer.addEventListener('click',function(event){
    if (event.target === overlayContainer){
        removeIconFocus()
        removeColorFocus()
    }
       
})
// inserimento task da parte dell'utente


addForm.addEventListener('submit', function (event) {
    event.preventDefault()
    if(toDoText.value === ''){
        toDoText.classList.add('vibration-el')
        setTimeout(() => toDoText.classList.remove('vibration-el'), 500)
        confirmBtn.classList.add('vibration-btn')
        setTimeout(() => confirmBtn.classList.remove('vibration-btn'), 500)
    } else {
        removeIconFocus()
        removeColorFocus()
        overlayContainer.classList.add('d-off')
        overlayContainer.classList.remove('overflow-h')
        const toDoEl = createCard('div', ['to-do-element', color], toDoText.value, icon, el => (el.draggable = true))
    
        toDoEl.style = misteryColor
        cardBody.appendChild(toDoEl)
    
        toDoEl.addEventListener('dragstart', dragStart)
        toDoEl.addEventListener('dragend', dragEnd)
        toDoText.value = ''
        icon = null
        color = null
        misteryColor = null
        arrayColor = []
        
    }

})


// chiusura overlay
closeBtn.addEventListener('click', function(event){
        overlayContainer.classList.add('d-off')
        overlayContainer.classList.remove('overflow-h')
        removeIconFocus()
        removeColorFocus()

})



// aggiunto eventi di drag and drop alle card
cards.forEach((el) => {
    el.addEventListener('dragover', dragOver)
    el.addEventListener('dragenter', dragEnter)
    el.addEventListener('dragleave', dragLeave)
    el.addEventListener('drop', drop)
})
// aggiunto eventi di drag and drop al cestino
trashImg.addEventListener('dragenter', function(event){
    trashImg.src = "../img/cestino-aperto.png"
    
    console.log('entrato');
})

trashImg.addEventListener('dragleave', function(event){
    trashImg.src = "../img/cestino-chiuso.png"
    
    console.log('uscito');
})

trashImg.addEventListener('dragover', function(event){
    event.preventDefault()

})

trashImg.addEventListener('drop', function(event){
    trashImg.src = "../img/cestino-chiuso.png"
    dragItem.remove()
    console.log('sto eliminando');
})

// funzioni di drag and drop della task
let dragItem = null

function dragStart() {
    setTimeout(() => this.classList.add('d-none'), 0)
    dragItem = this
    console.log('on');
}

function dragEnd() {
    this.classList.remove('d-none')
    console.log('off');
    dragItem = null
    
}

function dragOver(event) {
    event.preventDefault()
    
    console.log('sto tenendo');
}

function dragEnter() {
    
    console.log('Enter');
}

function dragLeave() {
    console.log('Leave');
}

function drop() {
    console.log('droppato');
    this.append(dragItem)
    
}

// funzione rimozione focus

function removeIconFocus(){
    for (let i = 0; i < selectedIcon.length;i++){
        let iconNoChekced = selectedIcon[i]
        iconNoChekced.classList.remove('focus')
    }
}
function removeColorFocus(){
    for (let i = 0; i < selectedColor.length;i++){
        let colorNoChecked = selectedColor[i]
        colorNoChecked.classList.remove('focus')
    }
}

// utilities function
function createCard(
    tagName,
    classList = [],
    content,
    icon,
    callback = false
) {
    const el = document.createElement(tagName);

    if (classList.length > 0) {
        el.classList.add(...classList);
    }

    if (callback) {
        callback(el);
    }
    if (icon !== null){
        el.innerHTML = content + ' ' + icon
    } else {
        el.innerHTML = content
    }
    

    return el;
}

function randomColor(){
    const num1 = getRandomInt(1,255)
    const num2 = getRandomInt(1,255)
    const num3 = getRandomInt(1,255)
    arrayColor.push(num1,num2,num3)
    let casualColor = `rgb(${num1},${num2},${num3})`
    return casualColor
}
function colorText(){
    let colorString = 'black'
    let r = arrayColor[0]
    let g = arrayColor[1]
    let b = arrayColor[2]
    const luminosity = 0.2126 * r +  0.7152 * g + 0.0722 * b
    if(luminosity > 128) {
        colorString = 'white'
    }
    return colorString
}



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

