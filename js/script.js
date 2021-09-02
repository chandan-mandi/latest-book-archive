const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const bookContainer = document.getElementById('book-container');
const bookFound = document.getElementById('total-book-found');
const erorDiv = document.getElementById('eror-div');

searchBtn.addEventListener('click', function() {
    const searchText = searchInput.value;
    if(searchText === '') {
        erorDiv.innerText = 'Search field can not be empty';
        return;
    }

    // clear dom
    bookContainer.innerHTML = "";
    // data fetching
    const url =`http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => showData(data))
})
const showData = bookArr => {
    
    const bookArray = bookArr.docs;
    const foundBook = bookArr.numFound;
    // Error Handling
    if(bookArr.numFound === 0) {
        erorDiv.innerText = "No Result Found";
    } else {
        erorDiv.innerText = "";
    }
    bookFound.innerHTML = `
        <div class="
        col-md-12 py-2
        d-flex
        justify-content-between
        align-items-center
        d-md-block
        text-md-center">
            <h1>Total Books : <span class="text-danger">${foundBook}</span></h1>
        </div>
    `
    bookArray.forEach((item) =>{

        const div = document.createElement("div");
        div.classList.add("col-md-4");
        div.innerHTML = `
        <div class="">
            <img class="w-50" src="https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg">
            <h4>Book Name : ${item.title}</h4>
            <p>Author Name : ${item.author_name}</p>
            <p>Publisher Name : ${item.publisher}</p>
            <p>First Publish : ${item.first_publish_year}</p>
        </div>
         `;
         bookContainer.appendChild(div);

    })
}

const showTotalBook = totalBook => {
    const foundBook = totalBook.numFound;
    console.log(foundBook)
}