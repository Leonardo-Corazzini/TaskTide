const addBtn = document.querySelector('.add-button')
const overlayContainer = document.querySelector('.overlay-container')
const addForm = document.getElementById('add-form')
const confirmBtn = document.getElementById('confirm-button')
const toDoText = document.getElementById('to-do-text')
const cardBody = document.querySelector('.card-body')
const cards = document.querySelectorAll('.card')
const trashImg = document.querySelector('.trash-img')
const closeBtn = document.querySelector('.closed-btn')
const selectedIcon = document.querySelectorAll('.icon')
let icon = null


for (let i = 0; i < selectedIcon.length;i++){
    let iconChekced = selectedIcon[i]
    iconChekced.addEventListener('click',function(){
        icon = iconChekced.innerHTML
    })
}

// ascolto bottone di aggiunta task
addBtn.addEventListener('click', function () {
    overlayContainer.classList.remove('d-off')
    overlayContainer.classList.add('overflow-h')
})
// chiusura overlay
closeBtn.addEventListener('click', function(event){
        overlayContainer.classList.add('d-off')
        overlayContainer.classList.remove('overflow-h')

})
// inserimento task da parte dell'utente


addForm.addEventListener('submit', function (event) {
    event.preventDefault()
    if(toDoText.value === ''){
        toDoText.classList.add('vibration-el')
        setTimeout(() => toDoText.classList.remove('vibration-el'), 500)
    } else {
        overlayContainer.classList.add('d-off')
        overlayContainer.classList.remove('overflow-h')
        const toDoEl = createCard('div', ['to-do-element'], toDoText.value, icon, el => (el.draggable = true))
        cardBody.appendChild(toDoEl)
    
        toDoEl.addEventListener('dragstart', dragStart)
        toDoEl.addEventListener('dragend', dragEnd)
        toDoText.value = ''
        icon = null
    }

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
    this.appendChild(dragItem)
    
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


