const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const bookContainer = document.getElementById('book-container');
const bookFound = document.getElementById('total-book-found');
const erorDiv = document.getElementById('eror-div');
const spinner = document.getElementById("spinner");

searchBtn.addEventListener('click', function() {
    const searchText = searchInput.value;
    if(searchText === '') {
        erorDiv.innerText = 'Search field can not be empty';
        return;
    }

    // clear dom
    bookContainer.innerHTML = "";
    // data fetching
    const url =`https://openlibrary.org/search.json?q=${searchText}`;
    spinner.classList.remove("d-none");
    fetch(url)
    .then(res => res.json())
    .then((data) => {
        // Setting a timer of 1.5s, before removing the spinnner, and showing data
        setTimeout(() => {
          spinner.classList.add("d-none");
          showData(data);
        }, 1500);
      })
      .finally(() => {
        searchInput.value = "";
      });
    // searchInput.value = '';
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
        div.classList.add("col");
        div.innerHTML = `
        <div class="card h-100">
          <img src="https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg" class="card-img-top book-cover" alt="...">
          <div class="card-body">
            <h6 class="card-title">Name: <span class="text-primary fs-6">${item.title}</span></h6>
            <h6 class="card-text">Author: <span class="text-primary fs-6">${item.author_name}</span></h6>
            <h6 class="card-text">Publisher: <span class="text-primary fs-6">${item.publisher}</span></h6>
          </div>
          <div class="card-footer">
            <small class="text-muted">First Publish : ${item.first_publish_year}</small>
          </div>
        </div>
        `
         bookContainer.appendChild(div);

    })
}
// Total Book Counting 
const showTotalBook = totalBook => {
    const foundBook = totalBook.numFound;
    console.log(foundBook)
}