// bottoni principali
const darkBtn = document.querySelector('.dark-button')
const addBtn = document.querySelector('.add-button')
const deleteMessage = document.querySelector('.overlay-transparent-undo')
const deleteModule = document.querySelector('.delete-section')
const undoDelete = document.querySelector('.no')
const deleteAllBtn = document.querySelector('.yes')
const modBtn = document.querySelector('.modify-button')
const previewForm = document.querySelector('.preview-col')
const previewCard = document.querySelectorAll('.preview-col .col')
const renameColBtn = document.querySelectorAll('.preview-card-title')
const deleteColBtn = document.querySelectorAll('.preview-undo-btn')
const renameColText = document.querySelectorAll('.rename-col')
const confirmPreviewBtn = document.querySelector('.confirm-preview-button')
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
const closeBtn2 = document.querySelector('.modify-overlay .closed-btn')
// elementi per la gestione del drag and drop
const cardBody = document.querySelector('.card-body')
const cards = document.querySelectorAll('.card-body')
const trashImg = document.querySelector('.trash-img')





// -----------------------------------ASCOLTO DEGLI EVENTI-----------------------------------------------------
// pulsante per attivARE DARKMODE
darkBtn.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode')
    if (document.body.className === 'dark-mode') {
        trashImg.src = "../img/cestino-darkmode-chiuso.png"
    } else {
        trashImg.src = "../img/cestino-chiuso.png"
    }
})
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
        toDoEl = createCard('div', ['to-do-element', color], toDoText.value, icon, el => (el.draggable = true))

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

//modifica delle colonne
modBtn.addEventListener('click', function () {
    modOverlayContainer.classList.remove('d-off')
    modOverlayContainer.classList.add('overflow-h')
})


// renameColBtn1.addEventListener('click', function(){
//     const inputTitle1 = document.querySelector('.preview-card-title1 .rename-col')
//     inputTitle1.classList.remove('d-none')
//     const cardTitle1 = document.querySelector('.preview-card-title1 p')
//     cardTitle1.classList.add('d-none')

// })

for (let i = 0; i < renameColBtn.length; i++) {

    renameColBtn[i].addEventListener('click', function () {
        this.classList.add('d-none')
        console.log('text')
        confirmPreviewBtn.classList.remove('d-none')
        console.log(confirmPreviewBtn)
        for (let i = 0; i < renameColText.length; i++) {
            if (this.dataset.cardindex === renameColText[i].dataset.cardindex)
                renameColText[i].classList.remove('d-none')
        }

    })
}
for (let i = 0; i < deleteColBtn.length; i++) {

    deleteColBtn[i].addEventListener('click', function () {
        console.log('textvsvs')
        confirmPreviewBtn.classList.remove('d-none')
        for (let i = 0; i < previewCard.length; i++) {
            if (this.dataset.cardindex === previewCard[i].dataset.cardindex) {
                previewCard[i].dataset.delete = 'true'
                previewCard[i].remove()
            }

        }


    })
}
const cardTitle = document.querySelectorAll('.card-title h2')
const mainCols = document.querySelectorAll('.main-col')
console.log(confirmPreviewBtn)
previewForm.addEventListener('submit', function (event) {
    event.preventDefault()
    console.log('ci siamo')
    modOverlayContainer.classList.add('d-off')
    modOverlayContainer.classList.remove('overflow-h')
    confirmPreviewBtn.classList.add('d-none')
    if (renameColText[0].value) {
        cardTitle[0].innerHTML = renameColText[0].value
    }
    if (renameColText[1].value) {
        cardTitle[1].innerHTML = renameColText[1].value
    }
    if (renameColText[2].value) {
        cardTitle[2].innerHTML = renameColText[2].value
    }
    if (renameColText[3].value) {
        cardTitle[3].innerHTML = renameColText[3].value
    }

    if (previewCard[0].dataset.delete === 'true') {
        mainCols[0].remove()
    }
    if (previewCard[1].dataset.delete === 'true') {
        mainCols[1].remove()
    }
    if (previewCard[2].dataset.delete === 'true') {
        mainCols[2].remove()
    }
    if (previewCard[3].dataset.delete === 'true') {
        mainCols[3].remove()
    }







}
)
// chiusura overlay
closeBtn.addEventListener('click', function (event) {
    overlayContainer.classList.add('d-off')
    overlayContainer.classList.remove('overflow-h')
})

closeBtn2.addEventListener('click', function (event) {
    modOverlayContainer.classList.add('d-off')
    modOverlayContainer.classList.remove('overflow-h')

})

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
    if (icon !== null) {
        el.innerHTML = content + ' ' + icon
    } else {
        el.innerHTML = content
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

