let taskDOM = document.querySelector("#task")
let listDOM = document.querySelector("#list")


let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));

function newElement(){
    let result = taskDOM.value.trim()
    if(result){
        let number = itemsArray.length > 0 ? itemsArray[itemsArray.length-1].id + 1 : 1
        itemsArray.push({info: result, id: number});
        localStorage.setItem('items', JSON.stringify(itemsArray));
        liMaker(result,number);
        taskDOM.value = ""
        var toastLiveSuccess = document.getElementById('liveToastSuccess')
        var toastSuccess = new bootstrap.Toast(toastLiveSuccess)
        toastSuccess.show()
    }else{
        var toastLiveError = document.getElementById('liveToastError')
        var toastError = new bootstrap.Toast(toastLiveError)
        toastError.show()
        taskDOM.value = ""
    }
}

const liMaker = (text,id) => {
    let liDOM = document.createElement('li')
    liDOM.innerHTML = `${text}<span id="${id}" class="close">x</span>`
    listDOM.appendChild(liDOM)
    let closeDOM = document.querySelectorAll('li > span.close'), i
    for (i = 0; i < closeDOM.length; ++i) {
        closeDOM[i].addEventListener("click", remove)
    }
    liDOM = document.querySelectorAll('ul#list > li'), i
    for (i = 0; i < liDOM.length; ++i) {
        liDOM[i].addEventListener("click", toggle)
    }
}

function toggle (){
    this.classList.toggle("checked");
}

data.forEach(item => {
    liMaker(item.info,item.id);
});

function remove(){
    itemsArray = itemsArray.filter(item => item.id != this.id)
    localStorage.setItem('items', JSON.stringify(itemsArray));
    this.parentElement.remove()
}