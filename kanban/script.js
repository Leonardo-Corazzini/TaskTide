// bottoni principali
const darkBtn = document.querySelector('.dark-button')
const addBtn = document.querySelector('.add-button')
const modBtn = document.querySelector('.modify-button')
const toDoBtn = document.querySelector('.todolist-button')
const box = document.querySelector('.box')
const checkBox = document.querySelector('.check-box')



//elementi della sezione overlay con form aggiunta testo icona e colori
const overlayContainer = document.querySelector('.overlay-container')
const modOverlayContainer = document.querySelector('.modify-overlay')
const addForm = document.getElementById('add-form')
const toDoText = document.getElementById('to-do-text')
const selectedIcon = document.querySelectorAll('.icon')
const selectedColor = document.querySelectorAll('.color-section > *')
// const colorPicker = document.querySelector('.color-picker')
const randomBgColor = document.querySelector('.random-bg')
const questionMark = document.querySelector('.fa-question')
let toDoEl
let icon = null
let color = null
let misteryColor = null
let arrayColor = []
const undoBtn = document.getElementById('undo-button')
const confirmBtn = document.getElementById('confirm-button')
const closeBtn = document.querySelector('.closed-btn')




// elementi per la gestione del drag and drop
const cardBody = document.querySelector('.card-body')
const cards = document.querySelectorAll('.card-body')
const trashImg = document.querySelector('.trash-img')




// overlay per la modifca della kanban
const previewForm = document.querySelector('.preview-col')
let previewCard = document.querySelectorAll('.preview-col .col')
const renameColBtn = document.querySelectorAll('.preview-card-title')
let deleteColBtn = document.querySelectorAll('.preview-undo-btn')
const renameColText = document.querySelectorAll('.rename-col')
const cardTitle = document.querySelectorAll('.card-title h2')
const previewCardTitle = document.querySelectorAll('.preview-card-title p')
let mainCols = document.querySelectorAll('.main-col')
const confirmPreviewBtn = document.querySelector('.confirm-preview-button')
const addColPreviewBtn = document.querySelector('.add-col-preview-button')
const closeBtn2 = document.querySelector('.modify-overlay .closed-btn')
const addCol = document.querySelector('.add-col')
const mainContent = document.querySelector('.main-content')
const toDoCol = document.querySelector('.to-do-col')

// overlay per elimazione task
const deleteMessage = document.querySelector('.overlay-transparent-undo')
const deleteModule = document.querySelector('.delete-section')
const undoDelete = document.querySelector('.no')
const deleteAllBtn = document.querySelector('.yes')







// -----------------------------------DARK MODE--------------------------------------------------------
// ascolto evento bottono per darkmode
darkBtn.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode')
    if (document.body.className === 'dark-mode') {
        trashImg.src = "../img/cestino-darkmode-chiuso.png"
    } else {
        trashImg.src = "../img/cestino-chiuso.png"
    }
})



// -----------------------------------AGGIUNTA TASK-----------------------------------------------------
// ascolto bottone di aggiunta task
addBtn.addEventListener('click', function () {
    overlayContainer.classList.remove('d-off')
    overlayContainer.classList.add('overflow-h')
})
// aggiunto evento di click su ogni icona
for (let i = 0; i < selectedIcon.length; i++) {
    let iconChecked = selectedIcon[i]

    iconChecked.addEventListener('click', function () {
        removeIconFocus()
        iconChecked.classList.add('focus')
        icon = iconChecked.innerHTML
    })
}
// aggiunto evento di click su ogni colore
for (let i = 0; i < selectedColor.length; i++) {
    let colorChecked = selectedColor[i]
    colorChecked.addEventListener('click', function (event) {
        removeColorFocus()
        if (event.target === randomBgColor || event.target === questionMark) {
            misteryColor = `background-color: ${randomColor()}; color:${colorText()};`
            colorChecked.classList.add('focus')
        } else {
            color = colorChecked.className
            colorChecked.classList.add('focus')
        }


    })
}
// pulsante annulla
undoBtn.addEventListener('click', function (event) {
    event.preventDefault()
    removeIconFocus()
    removeColorFocus()
    toDoText.value = ''
    icon = null
    color = null
    misteryColor = null
    arrayColor = []
})
// inserimento task da parte dell'utente
addForm.addEventListener('submit', function (event) {
    event.preventDefault()
    if (toDoText.value === '') {
        toDoText.classList.add('vibration-el')
        setTimeout(() => toDoText.classList.remove('vibration-el'), 500)
        confirmBtn.classList.add('vibration-btn')
        setTimeout(() => confirmBtn.classList.remove('vibration-btn'), 500)
    } else {
        removeIconFocus()
        removeColorFocus()
        overlayContainer.classList.add('d-off')
        overlayContainer.classList.remove('overflow-h')
        toDoEl = createTask('div', ['to-do-element', color], toDoText.value, icon, el => (el.draggable = true))

        toDoEl.style = misteryColor

        if (mainCols[0].classList.contains('d-none')) {
            cards[4].appendChild(toDoEl)
        } else if (mainCols[0].dataset.delete === 'false') {
            cards[0].appendChild(toDoEl)
        } else if (mainCols[0].dataset.delete === 'true' && mainCols[1].dataset.delete === 'false') {
            cards[1].appendChild(toDoEl)
        } else if (mainCols[1].dataset.delete === 'true' && mainCols[2].dataset.delete === 'false') {
            cards[2].appendChild(toDoEl)
        } else if (mainCols[2].dataset.delete === 'true' && mainCols[3].dataset.delete === 'false') {
            cards[3].appendChild(toDoEl)
        }

        toDoEl.addEventListener('dragstart', dragStart)
        toDoEl.addEventListener('dragend', dragEnd)
        addEventToDoTask()
        toDoText.value = ''
        icon = null
        color = null
        misteryColor = null
        arrayColor = []

    }

})
closeBtn.addEventListener('click', function (event) {
    overlayContainer.classList.add('d-off')
    overlayContainer.classList.remove('overflow-h')
})



// -----------------------------------MODIFICA CARD-----------------------------------------------------

// ascolto bottono modifca
modBtn.addEventListener('click', function () {
    modOverlayContainer.classList.remove('d-off')
    modOverlayContainer.classList.add('overflow-h')
})

// assegnazione a tutte le card ascolto evento per rinominare la colonna
for (let i = 0; i < renameColBtn.length; i++) {

    renameColBtn[i].addEventListener('click', function () {
        this.classList.add('d-none')
        confirmPreviewBtn.classList.remove('d-none')
        for (let i = 0; i < renameColText.length; i++) {
            if (this.dataset.cardindex === renameColText[i].dataset.cardindex)
                renameColText[i].classList.remove('d-none')
        }

    })
}
// assegnazione a tutte le card ascolto evento per eliminare la colonna
for (let i = 0; i < deleteColBtn.length; i++) {

    deleteColBtn[i].addEventListener('click', function () {
        confirmPreviewBtn.classList.remove('d-none')
        addCol.classList.remove('d-none')
        for (let i = 0; i < previewCard.length; i++) {
            if (this.dataset.cardindex === previewCard[i].dataset.cardindex) {
                previewCard[i].dataset.delete = 'true'
                previewCard[i].classList.add('d-none')
            }
        }
    })
}

// conferma dei dati della personalizzazione
previewForm.addEventListener('submit', function (event) {
    event.preventDefault()
    modOverlayContainer.classList.add('d-off')
    modOverlayContainer.classList.remove('overflow-h')
    confirmPreviewBtn.classList.add('d-none')
   
    renameCol(renameColText, cardTitle, renameColBtn)

    renameColPreview(previewCardTitle, cardTitle)
    
    removeCol(previewCard, mainCols)

     previewCard = document.querySelectorAll('.preview-col .col')
     for (let i = 0; i < previewCard.length; i++){
        if(!previewCard[i].classList.contains('d-none')){
            mainCols[i].classList.remove('d-none')
        }
     }

  })
// aggiungi colonna
addColPreviewBtn.addEventListener('click', function (event) {
    event.preventDefault()
    confirmPreviewBtn.classList.remove('d-none')
    let tempPreviewCol = document.querySelectorAll('.preview-col .col.d-none')
    tempPreviewCol[0].classList.remove('d-none')
    if(tempPreviewCol.length === 1){
        addCol.classList.add('d-none')
    }
})


// chiusura overlay

closeBtn2.addEventListener('click', function (event) {
    modOverlayContainer.classList.add('d-off')
    modOverlayContainer.classList.remove('overflow-h')
    for (let i = 0; i < renameColBtn.length; i++) {


        renameColBtn[i].classList.remove('d-none')
        confirmPreviewBtn.classList.add('d-none')
        renameColText[i].classList.add('d-none')
        renameColText[i].value = ''
    }
})


// -----------------------------------TO DO LIST MODE-----------------------------------------------------
toDoBtn.addEventListener('click', function () {

    
    modBtn.classList.toggle('d-none')
    box.classList.toggle('d-none')
    checkBox.classList.toggle('d-none')
    toDoCol.classList.toggle('d-none')
    let tempPreviewCol = document.querySelectorAll('.preview-col .col.d-none')
    const count = previewCard.length - tempPreviewCol.length
    for (let i = 0; i < mainCols.length; i++) {
        if(!toDoCol.classList.contains('d-none')){
            mainCols[i].classList.add('d-none')  
        } else{
            for (let y = 0; y < count; y++) {
                mainCols[y].classList.remove('d-none')
                
            }
            
        }
    } 
    
})


// -----------------------------------ELIMINAZIONE TOTALE TASK-----------------------------------------------------
// rimozione di tutte task al cliccare del cestino
trashImg.addEventListener('click', function () {
    deleteMessage.classList.remove('d-none')
    deleteModule.classList.add('popup')
})
undoDelete.addEventListener('click', function () {
    deleteMessage.classList.add('d-none')
})
deleteAllBtn.addEventListener('click', function () {
    deleteMessage.classList.add('d-none')
    if (toDoEl) {
        const deleEl = document.querySelectorAll('.to-do-element')
        for (let i = 0; i < deleEl.length; i++) {
            deleEl[i].classList.add('exit')
            setTimeout(() => {
                deleEl[i].remove()
            }, 1000);

        }

    }
})

deleteMessage.addEventListener('click', function (event) {
    if (event.target === deleteMessage) {
        deleteModule.classList.remove('popup')
        deleteModule.classList.add('vibration-undo')
        setTimeout(() => deleteModule.classList.remove('vibration-undo'), 500)
    }

})






// -----------------------------------EVENTI DRAG AND DROP-----------------------------------------------------

// aggiunto eventi di drag and drop alle card
cards.forEach((el) => {
    el.addEventListener('dragover', dragOver)
    el.addEventListener('dragenter', dragEnter)
    el.addEventListener('dragleave', dragLeave)
    el.addEventListener('drop', drop)
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

// aggiunto eventi di drag and drop al cestino
trashImg.addEventListener('dragenter', function (event) {
    if (document.body.className === 'dark-mode') {
        trashImg.src = "../img/cestino-darkmode-aperto.png"
    } else {
        trashImg.src = "../img/cestino-aperto.png"
    }


    console.log('entrato');
})

trashImg.addEventListener('dragleave', function (event) {
    if (document.body.className === 'dark-mode') {
        trashImg.src = "../img/cestino-darkmode-chiuso.png"
    } else {
        trashImg.src = "../img/cestino-chiuso.png"
    }

    console.log('uscito');
})

trashImg.addEventListener('dragover', function (event) {
    event.preventDefault()

})

trashImg.addEventListener('drop', function (event) {
    if (document.body.className === 'dark-mode') {
        trashImg.src = "../img/cestino-darkmode-chiuso.png"
    } else {
        trashImg.src = "../img/cestino-chiuso.png"
    }
    dragItem.remove()
    console.log('sto eliminando');
})









// -----------------------------------FUNZIONI---------------------------------------------------------------
// funzione rimozione focus

function removeIconFocus() {
    for (let i = 0; i < selectedIcon.length; i++) {
        let iconNoChecked = selectedIcon[i]
        iconNoChecked.classList.remove('focus')
    }
}
function removeColorFocus() {
    for (let i = 0; i < selectedColor.length; i++) {
        let colorNoChecked = selectedColor[i]
        colorNoChecked.classList.remove('focus')
    }
}

// utilities function
function createTask(
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
    if (icon !== null) {
        el.innerHTML = content + ' ' + icon
    } else {
        el.innerHTML = content
    }


    return el;
}
function myCreateCol(
    tagnName,
    classList = [],
    content = [],
    callback = false
) {
    // Creo l'elemento
    const el = document.createElement(tagnName);

    // Aggiungo le classi
    if (classList.length > 0) {
        el.classList.add(...classList);
    }

    // Esegui la callback passando l'elemento
    if (callback) {
        callback(el);
    }

    // Contenuto
    if (Array.isArray(content)) {
        for (let i = 0; i < content.length; i++) {
            el.appendChild(content[i]);
        }
    } else if (content instanceof HTMLElement) {
        el.appendChild(content);
    } else if (typeof content === "string") {
        el.innerHTML = content;
    } else {
        console.error("Non posso aggiungere l'elemento");
    }
    return el;
}


function randomColor() {
    const num1 = getRandomInt(1, 255)
    const num2 = getRandomInt(1, 255)
    const num3 = getRandomInt(1, 255)
    arrayColor.push(num1, num2, num3)
    let casualColor = `rgb(${num1},${num2},${num3})`
    return casualColor
}
function colorText() {
    let colorString = 'black'
    let r = arrayColor[0]
    let g = arrayColor[1]
    let b = arrayColor[2]
    const luminosity = 0.2126 * r + 0.7152 * g + 0.0722 * b
    if (luminosity > 128) {
        colorString = 'white'
    }
    return colorString
}



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function renameCol(arrayOne, arrayTwo, arrayTree) {
    for (let i = 0; i < arrayOne.length; i++) {

        const inputTextPreview = arrayOne[i]
        const colText = arrayTwo[i];
        const previewBtn = arrayTree[i]
        if (inputTextPreview.value) {
            colText.innerHTML = inputTextPreview.value
            inputTextPreview.classList.add('d-none')
            previewBtn.classList.remove('d-none')
        }
    }
}

function renameColPreview(arrayOne, arrayTwo) {
    for (let i = 0; i < arrayOne.length; i++) {
        const colTextPreview = arrayOne[i]
        const colText = arrayTwo[i];
        colTextPreview.innerHTML = colText.innerHTML
    }
}

function removeCol(arrayOne, arrayTwo) {
    for (let i = 0; i < arrayOne.length; i++) {

        const previewCard = arrayOne[i]
        const mainCol = arrayTwo[i];

        if (previewCard.dataset.delete === 'true') {
            mainCol.dataset.delete = 'true'
            mainCol.classList.add('d-none')
        }




    }
}
function addEventToDoTask(){
    let toDoTask = document.querySelectorAll('.to-do-col .to-do-element')
   
    for (let i = 0; i < toDoTask.length; i++) {
        
        toDoTask[i].addEventListener('click',function(){
            console.log('sto cliccando',this)
            this.classList.toggle('checked')
        })
        
    }
}