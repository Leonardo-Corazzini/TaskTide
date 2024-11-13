const addBtn = document.querySelector('.add-button')
//console.log(addBtn);
const overlayContainer = document.querySelector('.overlay-container')
const addForm = document.getElementById('add-form')
// console.log(overlayContainer,addForm);
const toDoText = document.getElementById('to-do-text')
const cardBody = document.querySelector('.card-body')
const cards = document.querySelectorAll('.card')



addBtn.addEventListener('click', function (event) {
    overlayContainer.classList.remove('d-off')
    overlayContainer.classList.add('overflow-h')
    console.log('object');
})


addForm.addEventListener('submit', function (event) {
    event.preventDefault()
    overlayContainer.classList.add('d-off')
    overlayContainer.classList.remove('overflow-h')
    const toDoEl = createCard('div', ['to-do-element'], toDoText.value, el => (el.draggable = true))
    cardBody.appendChild(toDoEl)

    toDoEl.addEventListener('dragstart', dragStart)
    toDoEl.addEventListener('dragend', dragEnd)

})

cards.forEach((el) => {
    el.addEventListener('dragover', dragOver)
    el.addEventListener('dragenter', dragEnter)
    el.addEventListener('dragleave', dragLeave)
    el.addEventListener('drop', drop)

})

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

function createCard(
    tagName,
    classList = [],
    content,
    callback = false
) {
    const el = document.createElement(tagName);

    if (classList.length > 0) {
        el.classList.add(...classList);
    }

    if (callback) {
        callback(el);
    }

    el.innerText = content

    return el;
}
