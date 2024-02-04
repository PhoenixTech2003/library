class Book{
    library = [];

    addBooktoLibrary(title,author,pages,readStatus){
        let bookDetails = {
            title : title,
            author : author,
            pages : pages,
            readStatus: readStatus
        };

        this.library.push(bookDetails);
    }

    removeBookFromLibrary(index){
        this.library.splice(index,1);
    }

    toggleReadStatus(index){
       let readStatus = this.library[index].readStatus;
        if (readStatus === "No"){
            this.library[index].readStatus = "Yes";

        }
        else{

            this.library[index].readStatus = "No"
        }
            
    }

}

class displayController{
   static book = new Book();
    constructor(){
        this.bindEvents();
    }




    static addClasses(element,className){
       return element.classList.add(className);
        
    } 

    
   static generateBookCard(){
            displayController.removeExistingBookCard();
            displayController.book.library.forEach((value,index) =>{
                let bookCard = document.createElement("div");
                displayController.addClasses(bookCard,"book-card");
                bookCard.dataset.bookIndex = index;
                displayController.cacheDom().containers.bookList.append(bookCard);
                let coverArt = document.createElement("div");
                coverArt.classList.add("cover-art");
                let coverArtLetter = displayController.book.library[index].title.charAt(0);
                let currentBookCard = document.querySelector(`.book-card[data-book-index = "${index}"] `);
                coverArt.innerHTML = coverArtLetter;
                currentBookCard.append(coverArt);
                let title = document.createElement("div");
                let author = document.createElement("div");
                let pages = document.createElement("div");
                let readStatus = document.createElement("div");
                let toggleRead = document.createElement("button");
                let removeBtn = document.createElement("button");
                toggleRead.dataset.bookIndex = index;
                removeBtn.dataset.bookIndex = index;
                removeBtn.classList.add("remove-book");
                title.innerHTML = `Title : ${value.title} `;
                author.innerHTML = `Author : ${value.author} `;
                pages.innerHTML = `Pages : ${value.pages} `;
                readStatus.innerHTML = `Read Status : ${value.readStatus}`;
                removeBtn.innerHTML = "REMOVE BOOK";
                if(value.readStatus == "No"){
                    toggleRead.classList.add("not-read-book");
                    toggleRead.innerHTML = "NOT READ";
                }
                else if(value.readStatus == "Yes"){
                    toggleRead.classList.add("read-book");
                    toggleRead.innerHTML = "READ BOOK";

                }
                currentBookCard.append(title);
                currentBookCard.append(author);
                currentBookCard.append(pages);
                currentBookCard.append(readStatus);
                currentBookCard.append(toggleRead);
                currentBookCard.append(removeBtn);
                
                 
            }

            )       
    }



    static removeExistingBookCard(){
        displayController.cacheDom().containers.bookCards.forEach(bookCard=>{
            displayController.cacheDom().containers.bookList.removeChild(bookCard)
        })
    }
    


    static cacheDom (){
        let containers ={
            bookList : document.querySelector(".book-list"),
            bookCards : document.querySelectorAll(".book-card")
        }
        let inputs = {
            titleInput : document.querySelector("input#title").value,
            authorInput : document.querySelector("input#author").value,
            pagesInput : document.querySelector("input#pages").value,
            readStatusInput : document.querySelector("#read-status").value,
            allInputs : document.querySelectorAll("form > input")
        }

        let buttons = {
            displaySideBar : document.querySelector("button.new-book"),
            addBook : document.querySelector("button.add"),
            removeBook : document.querySelectorAll(".remove-book")

        };
        return {inputs, buttons,containers}

    
    }


    
   bindEvents(){
        displayController.cacheDom().buttons.addBook.addEventListener("click",this.readInputs);
        displayController.cacheDom().buttons.addBook.addEventListener("click",displayController.generateBookCard);
        document.addEventListener("click",this.removeBook);
        document.addEventListener("click",this.toggleStatus);
    }

    toggleStatus(event){
        let element = event.target;
        if(element.className == "read-book" || element.className == "not-read-book"){
            displayController.book.toggleReadStatus(element.dataset.bookIndex);
            displayController.generateBookCard();
        }
    }

    removeBook(event){
        let element = event.target;
        if(element.className == "remove-book"){
            console.log(displayController.book.library);
            console.log(element.dataset.bookIndex);

            displayController.book.removeBookFromLibrary(element.dataset.bookIndex);
            displayController.generateBookCard();
        }
    }
    
   readInputs(event){
        event.preventDefault();
        let title = displayController.cacheDom().inputs.titleInput;
        let author =displayController.cacheDom().inputs.authorInput;
        let pages = displayController.cacheDom().inputs.pagesInput;
        let readStatus = displayController.cacheDom().inputs.readStatusInput;
        displayController.book.addBooktoLibrary(title,author,pages,readStatus);
        console.log(displayController.book.library)
        displayController.clearInputs();
        
    }


    
    static clearInputs(){
        displayController.cacheDom().inputs.allInputs.forEach(inputField => inputField.value = "");
    }


}

let app = new displayController();
