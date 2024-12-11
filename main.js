// Mendefinisikan fungsi untuk menyimpan buku ke localStorage
function saveBookToStorage() {
    localStorage.setItem('books', JSON.stringify(books));
}

  // Mendefinisikan fungsi untuk memuat buku dari localStorage
function loadBooksFromStorage() {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
    return JSON.parse(storedBooks);
    }
    return [];
}

  // Mendefinisikan array books untuk menyimpan data buku
let books = loadBooksFromStorage();

  // Mendefinisikan fungsi untuk menampilkan buku pada rak buku
function showBooks() {
    const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
    const completeBookshelfList = document.getElementById('completeBookshelfList');
  
    incompleteBookshelfList.innerHTML = '';
    completeBookshelfList.innerHTML = '';
  
    books.forEach((book) => {
      const bookItem = document.createElement('article');
      bookItem.classList.add('book_item');
      const bookTitle = document.createElement('h3');
      bookTitle.textContent = book.title;
      const bookAuthor = document.createElement('p');
      bookAuthor.textContent = `Penulis: ${book.author}`;
      const bookYear = document.createElement('p');
      bookYear.textContent = `Tahun: ${book.year}`;
      const bookAction = document.createElement('div');
      bookAction.classList.add('action');
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Hapus buku';
      deleteButton.classList.add('red');
      deleteButton.addEventListener('click', () => {
        deleteBook(book.id);
      });
      bookAction.appendChild(deleteButton);
  
      if (book.isComplete) {
        const undoButton = document.createElement('button');
        undoButton.textContent = 'Belum selesai di Baca';
        undoButton.classList.add('green');
        undoButton.addEventListener('click', () => {
          moveBookToIncomplete(book.id);
        });
        bookAction.appendChild(undoButton);
  
        bookItem.appendChild(bookTitle);
        bookItem.appendChild(bookAuthor);
        bookItem.appendChild(bookYear);
        bookItem.appendChild(bookAction);
        completeBookshelfList.appendChild(bookItem);
      } else {
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Selesai dibaca';
        completeButton.classList.add('green');
        completeButton.addEventListener('click', () => {
          moveBookToComplete(book.id);
        });
        bookAction.appendChild(completeButton);
  
        bookItem.appendChild(bookTitle);
        bookItem.appendChild(bookAuthor);
        bookItem.appendChild(bookYear);
        bookItem.appendChild(bookAction);
        incompleteBookshelfList.appendChild(bookItem);
      }
    });
    saveBookToStorage();
  }
  
  // Mendefinisikan fungsi untuk menambahkan buku
  function addBook(title, author, year, isComplete) {
    const newBook = {
      id: +new Date(),
      title,
      author,
      year: parseInt(year), // Mengubah year menjadi number
      isComplete,
    };
    books.push(newBook);
    saveBookToStorage();
    showBooks();
  }
  

  
  // Mendefinisikan fungsi untuk menghapus buku
  function deleteBook(bookId) {
    books = books.filter((book) => book.id !== bookId);
    saveBookToStorage();
    showBooks();
  }
  
  // Mendefinisikan fungsi untuk memindahkan buku ke rak "Belum selesai dibaca"
  function moveBookToIncomplete(bookId) {
    const bookIndex = books.findIndex((book) => book.id === bookId);
    if (bookIndex !== -1) {
      books[bookIndex].isComplete = false;
      saveBookToStorage();
      showBooks();
    }
  }
  
  // Mendefinisikan fungsi untuk memindahkan buku ke rak "Selesai dibaca"
  function moveBookToComplete(bookId) {
    const bookIndex = books.findIndex((book) => book.id === bookId);
    if (bookIndex !== -1) {
      books[bookIndex].isComplete = true;
      saveBookToStorage();
      showBooks();
    }
  }
  
  // Mendefinisikan event listener untuk form input buku
  const inputBookForm = document.getElementById('inputBook');
  inputBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('inputBookTitle').value;
    const author = document.getElementById('inputBookAuthor').value;
    const year = document.getElementById('inputBookYear').value;
    const isComplete = document.getElementById('inputBookIsComplete').checked;
  
    if (title && author && year) {
      addBook(title, author, year, isComplete);
    }
  
    inputBookForm.reset();
  });
  
  // Panggil fungsi untuk menampilkan buku saat halaman dimuat
  showBooks();
  
  // Mendefinisikan event listener untuk form pencarian buku
const searchBookForm = document.getElementById('searchBook');
searchBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTitle = document.getElementById('searchBookTitle').value;

  if (searchTitle) {
    const searchResult = books.filter((book) => book.title.toLowerCase().includes(searchTitle.toLowerCase()));
    displaySearchResults(searchResult);
  } else {
    showBooks();
  }

  searchBookForm.reset();
});

// Mendefinisikan fungsi untuk menampilkan hasil pencarian
function displaySearchResults(results) {
  const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
  const completeBookshelfList = document.getElementById('completeBookshelfList');

  incompleteBookshelfList.innerHTML = '';
  completeBookshelfList.innerHTML = '';

  // Mencari buku
  results.forEach((book) => {
    const bookItem = document.createElement('article');
    bookItem.classList.add('book_item');
    const bookTitle = document.createElement('h3');
    bookTitle.textContent = book.title;
    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = `Penulis: ${book.author}`;
    const bookYear = document.createElement('p');
    bookYear.textContent = `Tahun: ${book.year}`;
    const bookAction = document.createElement('div');
    bookAction.classList.add('action');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Hapus buku';
    deleteButton.classList.add('red');
    deleteButton.addEventListener('click', () => {
      deleteBook(book.id);
    });
    bookAction.appendChild(deleteButton);

    if (book.isComplete) {
      const undoButton = document.createElement('button');
      undoButton.textContent = 'Belum selesai di Baca';
      undoButton.classList.add('green');
      undoButton.addEventListener('click', () => {
        moveBookToIncomplete(book.id);
      });
      bookAction.appendChild(undoButton);

      bookItem.appendChild(bookTitle);
      bookItem.appendChild(bookAuthor);
      bookItem.appendChild(bookYear);
      bookItem.appendChild(bookAction);
      completeBookshelfList.appendChild(bookItem);
    } else {
      const completeButton = document.createElement('button');
      completeButton.textContent = 'Selesai dibaca';
      completeButton.classList.add('green');
      completeButton.addEventListener('click', () => {
        moveBookToComplete(book.id);
      });
      bookAction.appendChild(completeButton);

      bookItem.appendChild(bookTitle);
      bookItem.appendChild(bookAuthor);
      bookItem.appendChild(bookYear);
      bookItem.appendChild(bookAction);
      incompleteBookshelfList.appendChild(bookItem);
    }
  });
}