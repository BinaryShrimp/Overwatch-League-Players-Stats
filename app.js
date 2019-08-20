// function to get searched player name
function watchForm() {
    document.querySelector('.search-button').addEventListener('click', function(){
        let searchField = document.querySelector('.search-box').value;
        document.querySelector('.search-box').value = '';
        console.log(searchField);
    });
}

watchForm();