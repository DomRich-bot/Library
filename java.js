const myLibrary = [];
const newBookButton = document.getElementById("new-book-btn");
let form = document.getElementById("new-book-form");
let popup = document.querySelector(".popup");
let closeBtn = document.querySelector(".close-popup");
const tableBody = document.querySelector("tbody");

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`;
  }
}

// Default Books
const theInstitute = new Book("The Institute", "Stephen King", "651", false);
const monster = new Book("Monster", "Walter Dean Myers", "281", true);
const coraline = new Book("Coraline", "Neil Gaiman", "163", false);
const shutterIsland = new Book("Shutter Island", "Dennis Lehane", 385, true);
myLibrary.push(coraline, theInstitute, monster, shutterIsland);

// Loop array and add objects to table
function render() {
  tableBody.innerText = "";
  for (let i = 0; i < myLibrary.length; i++) {
    let tableRow = tableBody.insertRow();
    let book = myLibrary[i];
    tableRow.insertCell().textContent = book.title;
    tableRow.insertCell().textContent = book.author;
    tableRow.insertCell().textContent = book.pages;
    tableRow.insertCell().textContent = book.read ? "Read" : "Not Read Yet";
    tableRow.insertCell().innerHTML = `
        <div class="btns"> <button class="remove" onclick="removeBook(${i})">Remove</button> 
        <button class="toggle" onclick="toggle(${i})">Status</button></div>`;
  }
}
render();

newBookButton.addEventListener("click", () => {
  form.removeAttribute("style");
  popup.removeAttribute("style");
});

// Add form created books to array
function addBookToLibrary() {
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let read = document.getElementById("read").checked;
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  console.log(newBook);
  render();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  addBookToLibrary();
  form.reset();
  form.setAttribute("style", "display:none");
  popup.setAttribute("style", "display:none");
});

closeBtn.addEventListener("click", function () {
  form.setAttribute("style", "display:none");
  popup.setAttribute("style", "display:none");
});

function removeBook(index) {
  myLibrary.splice(index, 1);
  render();
}

// Alter read status at target, refresh table
Book.prototype.toggle = function () {
  this.read = !this.read;
};
function toggle(index) {
  myLibrary[index].toggle();
  render();
}
