// Load books and borrowing history from localStorage
let books = JSON.parse(localStorage.getItem('books')) || [];
let borrowHistory = JSON.parse(localStorage.getItem('borrowHistory')) || [];

// Function to Add Book
function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;

    if (title && author && genre) {
        const newBook = { title, author, genre };
        books.push(newBook);

        // Update localStorage
        localStorage.setItem('books', JSON.stringify(books));

        // Update the book list and category dropdown
        displayBooks();
        updateCategories();

        // Clear the form fields
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('genre').value = '';
    } else {
        alert('Please fill in all fields');
    }
}

// Function to Display Books
function displayBooks() {
    const bookList = document.getElementById('book-list');
    const category = document.getElementById('category').value;
    const searchQuery = document.getElementById('search').value.toLowerCase();

    bookList.innerHTML = '';

    books
        .filter(book => (category === 'all' || book.genre === category) && book.title.toLowerCase().includes(searchQuery))
        .forEach((book, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${book.title} by ${book.author} - Genre: ${book.genre}
                <button onclick="borrowBook(${index})">Borrow</button>
            `;
            bookList.appendChild(li);
        });
}

// Function to Borrow Book
function borrowBook(index) {
    const book = books[index];
    borrowHistory.push(book);

    // Save to localStorage
    localStorage.setItem('borrowHistory', JSON.stringify(borrowHistory));

    // Display borrowing history
    displayBorrowHistory();
}

// Function to Display Borrowing History
function displayBorrowHistory() {
    const borrowList = document.getElementById('borrow-history');
    borrowList.innerHTML = '';

    borrowHistory.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author} (Genre: ${book.genre})`;
        borrowList.appendChild(li);
    });
}

// Function to Update Categories in Dropdown
function updateCategories() {
    const categoryDropdown = document.getElementById('category');
    const uniqueGenres = ['all', ...new Set(books.map(book => book.genre))];

    categoryDropdown.innerHTML = uniqueGenres.map(genre => `<option value="${genre}">${genre}</option>`).join('');
}

// Function to Filter Books by Category
function filterByCategory() {
    displayBooks();
}

// Function to Search Books
function searchBooks() {
    displayBooks();
}

// On page load, display books and borrowing history
window.onload = () => {
    displayBooks();
    updateCategories();
    displayBorrowHistory();
};
