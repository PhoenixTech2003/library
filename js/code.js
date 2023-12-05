const myLibrary = [];

// select all text inputs
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");
// select add button
const addButton = document.querySelector(".add");
//add an event listener to addButton
addButton.addEventListener("click",getInputs);

//function to get input values:
function getInputs(event){
    //prevent default action of add  button
    event.preventDefault();
    // create an object variable and pass input values to object
    let book = new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.value);
    //pass object to addBookToLibrary function
    addBookToLibrary(book);

}
    

function Book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(object){
    myLibrary.push(object);
}

