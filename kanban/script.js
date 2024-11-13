const addBtn = document.querySelector('.add-button')
//console.log(addBtn);
const overlayContainer = document.querySelector('.overlay-container')
const addForm = document.getElementById('add-form')
// console.log(overlayContainer,addForm);
addBtn.addEventListener('click', function(event) {
    overlayContainer.classList.remove('d-off')
    overlayContainer.classList.add('overflow-h')
    console.log('object');
})


