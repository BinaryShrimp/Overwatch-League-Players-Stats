// When "search player" is pressed
document.querySelector('.search-player').addEventListener('click', function() {
    document.querySelector('.landing-page').classList.add('hide');      
    document.querySelector('.all-player-section').classList.add('hide');            
    document.querySelector('.search-player').classList.add('selected');
    document.querySelector('.all-player').classList.remove('selected');
    document.querySelector('.Search-player-section').classList.remove('hide');
      
});

// when all players is pressed
document.querySelector('.all-player').addEventListener('click', function() {
    document.querySelector('.landing-page').classList.add('hide');
    document.querySelector('.Search-player-section').classList.add('hide');
    document.querySelector('.all-player').classList.add('selected');
    document.querySelector('.search-player').classList.remove('selected');
    showAllPlayers();
    document.querySelector('.all-player-section').classList.remove('hide'); 
});