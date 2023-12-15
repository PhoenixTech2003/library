const myLibrary = []; //array to store book objects

let book;


const addBookBtn =document.querySelector(".add");//select button to add book to library
//create an event listener for the addBookBtn to add to library
addBookBtn.addEventListener("click",function(event){
    event.preventDefault();
    addBookToLibrary();
    clearInputFields();
    generateBookCard();
});

document.addEventListener("click",function(event){
    //create variable for selected elements
    let element = event.target;
    //if element === remove button
    if(element.className === "remove-book"){
        //create variable to store remove book data attribute
        let bookNumber = element.dataset.removeBtnNumber;
        //call remove book function and pass data attribute
        removeBook(bookNumber);
        //call generate book card function
        generateBookCard();
    }

    //if element class name === "read book":
    if (element.className === "read-book"){
        //create variable to store book data attribute
        let toggleBtnNumber = element.dataset.readStatusNumber;
        //call toggle read function and pass index and read status
        book.toggleReadStatus(toggleBtnNumber,"No");
        //call generateBookCard function
        generateBookCard();
    }
    //if element class name === "read book":
    if (element.className === "not-read-book"){
        //create variable to store book data attribute
        let toggleBtnNumber = element.dataset.readStatusNumber
        //call toggle read function and pass index and read status
        book.toggleReadStatus(toggleBtnNumber,"Yes");
        //call generateBookCard function
        generateBookCard();
    }   
});

const newBookBtn = document.querySelector(".new-book");//select the new book button
const sideBar = document.querySelector(".side-bar");//select the side bar
const mainContainer = document.querySelector(".main-container");//select the main container
const listOfBooks = document.querySelector(".book-list");//select book list element
//remove the side bar from the container
mainContainer.removeChild(sideBar);
//add an event listener to the new book button that adds the side bar to main container
newBookBtn.addEventListener("click",()=>mainContainer.insertBefore(sideBar,listOfBooks));



//constructor for creating book objects
function Book(title, author, pages, readStatus){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;


}

//function that toggles the read status of a book
Book.prototype.toggleReadStatus = function (indexOfBook,readStatus){
    //select the title and assign read status
    myLibrary[indexOfBook].readStatus = readStatus;

};

//function that adds a book to myLibrary array
function addBookToLibrary(){

    let bookDetails = getBookDetails();//variable to store return value of getBookDetails

    book = new Book(bookDetails.title,bookDetails.author,bookDetails.pages,bookDetails.readStatus);//create object that receives properties of a book

    //push to myLibrary array
    myLibrary.push(book);
    


}

//function to get details from the DOM
function getBookDetails(){    
    //select all side-bar input elements text
    const titleInput = document.querySelector("#title").value;
    const authorInput = document.querySelector("#author").value;
    const pagesInput = document.querySelector("#pages").value;
    const readStatusInput = document.querySelector("#read-status").value;

     //create object to store book details
    let bookDetails = {
        title: titleInput,
        author: authorInput,
        pages: pagesInput,
        readStatus:readStatusInput
    };
    
    
    //return  the book details object
    return bookDetails;
}

//function to clear input fields
function clearInputFields(){

    //select all input fields apart from the option box
    const inputFields = document.querySelectorAll("form > input");
    //set value = "" for each input field
    inputFields.forEach(inputField => inputField.value = "");
    
}

//function to create book cards
function generateBookCard(){
    const bookListContainer = document.querySelector(".book-list"); //select the book list div to append and remove book cards
    
    let lengthOfArray = myLibrary.length; //get length of myLibrary array
    //remove existing book cards to regenerate after adding new book card
    const bookCardContainer = document.querySelectorAll(".book-card");
    bookCardContainer.forEach(bookCard => bookListContainer.removeChild(bookCard));
    //use for loop to generate book cards
    for(let index = 0; index < lengthOfArray; index++){
        
        let bookCard = document.createElement("div"); //create blank div element for the book cards
        //append book card to book list div
        bookListContainer.append(bookCard);
        //add book card class to book card div
        bookCard.className = "book-card";
        bookCard.dataset.cardNumber = index;//add a data atribute to each book card for identification
        //select the book card using the data atribute
        bookCard = document.querySelector(`.book-card[data-card-number = "${index}" ]`);
        const coverArtContainer = document.createElement("div");//create a div for the cover art
        let coverArtLetter = myLibrary[index].title.charAt(0);//select the first letter of the book title to be used for the cover art
        //append cover art div to selected book card
        bookCard.append(coverArtContainer);
        //add the cover art class to the coveart art div
        coverArtContainer.className = "cover-art";
        coverArtContainer.innerHTML = coverArtLetter;//insert the first letter in the inner html of the cover art div
        //create variable to store title of book
        let bookTitle = myLibrary[index].title;
        //create variable to store author of book
        let bookAuthor = myLibrary[index].author;
        //create variable to store pages of book
        let bookPages = myLibrary[index].pages;
        //create variable to store read status of book
        let bookReadStatus = myLibrary[index].readStatus;

        //create div to store the book title
        let bookTitleContainer = document.createElement("div");
        //append book title div to book card
        bookCard.append(bookTitleContainer);
        bookTitleContainer.innerHTML =`Title: ${bookTitle}` ;//set inner html = bookTile
        

        //create div to store the book author
        let bookAuthorContainer = document.createElement("div");
        //append book title div to book card
        bookCard.append(bookAuthorContainer);
        bookAuthorContainer.innerHTML =`Author: ${bookAuthor}` //set inner html = bookAuthor

         //create div to store the book pages
         let bookPagesContainer = document.createElement("div");
        //append book pages div to book card
        bookCard.append(bookPagesContainer);
        bookPagesContainer.innerHTML = `Pages: ${bookPages}`//set inner html = bookPages

         //create div to store the book read status
         let bookReadStatusContainer = document.createElement("div");
        //append book read status div to book card
        bookCard.append(bookReadStatusContainer);
        //set inner html = bookReadStatus
        bookReadStatusContainer.innerHTML = `Read Status: ${bookReadStatus}`;

       let readStatusBtn = document.createElement("button"); //create a read status button
        //append read status button
        bookCard.append(readStatusBtn);
        //add data attribute to identify toggle buttons
        readStatusBtn.dataset.readStatusNumber = index;
        //if read status === no:
        if (bookReadStatus === "No"){
            //add not read class to read status button
            readStatusBtn.classList.add("not-read-book");
            readStatusBtn.innerHTML = "Not Read";

        }
        //else
        else{
            //add read book class to read status button
            readStatusBtn.classList.add("read-book");
            readStatusBtn.innerHTML = "Read Book";


        }

        let removeBtn = document.createElement("button");//create a remove button
        //append it to book card
        bookCard.append(removeBtn);
        //give it a class of remove book
        removeBtn.className = "remove-book";
        //add a data attribute of removeBtnNumber
        removeBtn.dataset.removeBtnNumber = index;
        removeBtn.innerHTML = "Remove Book";//add inner html = remove book



        
    }
        
    

}

function removeBook(indexNumber){
    myLibrary.splice(indexNumber,1);

}
