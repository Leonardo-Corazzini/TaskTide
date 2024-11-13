const addBtn = document.querySelector('.add-button')
//console.log(addBtn);
const overlayContainer = document.querySelector('.overlay-container')
const addForm = document.getElementById('add-form')
// console.log(overlayContainer,addForm);
const toDoText = document.getElementById('to-do-text')
const cardBody = document.querySelector('.card-body')



addBtn.addEventListener('click', function(event) {
    overlayContainer.classList.remove('d-off')
    overlayContainer.classList.add('overflow-h')
    console.log('object');
})


addForm.addEventListener('submit', function(event) {
    event.preventDefault()
    overlayContainer.classList.add('d-off')
    overlayContainer.classList.remove('overflow-h')
    const toDoEl = createCard('div', ['to-do-element'], [], el=>(el.innerText = toDoText.value))
    cardBody.appendChild(toDoEl)

    
})




function createCard(
    tagName,
    classList = [],
    content = [],
    callback = false
) {
    const el = document.createElement(tagName);

    if (classList.length > 0) {
        el.classList.add(...classList);
    }


    if (callback) {
        callback(el);
    }
    if (Array.isArray(content)) {
        for (let i = 0; i < content.length; i++) {
            if (content[i] instanceof HTMLElement) {
                el.appendChild(content[i]);
            }
        }
    } else {
        console.error("Non posso aggiungere l'elemento");
    }
    return el;
}
