let myLibrary = [
  new Book("J.R.R Tolkien", "The Hobbit", 295, false),
  new Book("J.R.R Tolkien", "The Hobbit", 295, false),
  new Book("J.R.R Tolkien", "The Hobbit", 295, false),
];
function Book(author, title, pages, read) {
  this.id = crypto.randomUUID();
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

let showFormBtn = document.querySelector(".showBtn");
let modal = document.querySelector("#formModal");
let overlay = document.querySelector(".overlay");
let closeBtn = document.querySelector(".close");
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
  document.querySelector(".books").replaceChildren();
  myLibrary.forEach((book) => {
    let bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.setAttribute("key", book.id);
    bookDiv.innerHTML = `
  <h1>${book.title}</h1>
  <h3>${book.author}</h3>
  <p>${book.read ? "Already read" : "Not read yet"}</p>
  <p>Pages: ${book.pages}</p>
  `;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      myLibrary = myLibrary.filter((bookItem) => bookItem.id !== book.id);
      updateLibrary();
    });
    deleteBtn.classList.add("delete");
    bookDiv.appendChild(deleteBtn);
    const toggleRead = document.createElement("button");
    toggleRead.textContent = book.read ? "Not read yet" : "I read it";
    toggleRead.addEventListener("click", (e) => {
      book.read = !book.read;
      updateLibrary();
    });
    toggleRead.classList.add("toggle");
    bookDiv.appendChild(toggleRead);
    document.querySelector(".books").appendChild(bookDiv);
  });
}

let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary(form);
  updateLibrary();
  modal.close();
  overlay.style.display = "none";
  e.target.reset();
});

showFormBtn.addEventListener("click", () => {
  modal.showModal();
  overlay.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  modal.close();
  overlay.style.display = "none";
  form.reset();
});
