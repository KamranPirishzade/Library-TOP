const myLibrary = [
  new Book("J.R.R Tolkien", "The Hobbit", 295, false),
  new Book("J.R.R Tolkien", "The Hobbit", 295, false),
  new Book("J.R.R Tolkien", "The Hobbit", 295, false),
];
function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

updateLibrary();

function addBookToLibrary(form) {
  const formData = new FormData(form);
  const author = formData.get("author");
  const title = formData.get("title");
  const pages = formData.get("pages");
  const read = Boolean(formData.get("read"));
  const newBook = new Book(author, title, pages, read);
  myLibrary.push(newBook);
  console.log(myLibrary);
}

function updateLibrary() {
  myLibrary.forEach((book) => {
    let bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.innerHTML = `
  <h1>${book.title}</h1>
  <h3>${book.author}</h3>
  <p>Pages: ${book.pages}</p>
  <p>${book.read ? "Already read" : "Not read yet"}</p>
  `;
    document.querySelector(".books").appendChild(bookDiv);
  });
}

let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  document.querySelector(".books").innerHTML = "";
  addBookToLibrary(form);
  updateLibrary();
});
