const myLibrary = [];
let count  = 1;
// select all text inputs
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");
//select book-list div
const bookList = document.querySelector(".book-list");
// select add button
const addButton = document.querySelector(".add");
//create book-card  div
let bookCard  = document.createElement("div");
const mainContainer = document.querySelector(".main-container");
const sideBar = document.querySelector(".side-bar");

mainContainer.removeChild(sideBar);
const newBookButton = document.querySelector(".new-book");


//add an event listener to addButton
newBookButton.addEventListener("click",displaySideBar);
addButton.addEventListener("click",getInputs);

function displaySideBar(event){
    event.preventDefault();
    mainContainer.insertBefore(sideBar,bookList);
}

//function to get input values:
function getInputs(event){
    //prevent default action of add  button
    event.preventDefault();
    // create an object variable and pass input values to object
    let book = new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.value);
    //pass object to addBookToLibrary function
    addBookToLibrary(book);
    generateBookCards();
    clearInputs();
    
    
    
}

function generateBookCards(){
    bookCard  = document.createElement("div");
    bookCard.classList.add("book-card");
    bookList.appendChild(bookCard);
    let coverArt = document.createElement("div");
    bookCard.appendChild(coverArt);    
    coverArt.classList.add("cover-art");

    let title = document.createElement("div");
    let author = document.createElement("div");
    let pages = document.createElement("div");
    let read = document.createElement("div");



    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(read);

    let firstLetterOfTitle = myLibrary[count-1].title[0].toUpperCase();
    let titleVal = myLibrary[count-1].title;
    let authorVal = myLibrary[count-1].author;
    let pagesVal = myLibrary[count-1].pages;
    let readVal = myLibrary[count-1].read

    coverArt.innerHTML = firstLetterOfTitle;
    title.innerHTML = `Title: ${titleVal}`;
    author.innerHTML = `Author: ${authorVal}`;
    pages.innerHTML = `Pages: ${pagesVal}`;
    read.innerHTML = `Read: ${readVal}`;


    
    count++;
    
    
 
}


function clearInputs(){
    const inputs = document.querySelectorAll("input");
    inputs.forEach(singleInput =>singleInput.value = "");
    
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
