var movieToGuess;
var movieGuessed = [];
var maxGuessCount = 6;
var userGuessCount = 0;
var invalidCharGuess = 0;
var charGuessArr = [];
var randMovieNum;
var wins = 0,
    losses = 0,
    guesses = 0;
var movieList = [{ "name": "DHOOM", "imageref":"assets/images/dhoom2.jpg", "vidref": "https://www.youtube.com/embed/G2r0mVq6YD0?start=37&autoplay=1" },
    { "name": "ROBOT", "imageref": "assets/images/robot.jpg", "vidref": "https://www.youtube.com/embed/f5sjTkaiYhM?start=70&autoplay=1" },
    { "name": "DHONI", "imageref": "assets/images/dhoni.jpg", "vidref": "https://www.youtube.com/embed/b0sPaAy9yUQ?start=10&autoplay=1" },
    { "name": "KAABIL", "imageref": "assets/images/kaabil.jpg", "vidref": "https://www.youtube.com/embed/Ghr94S7cYOg?autoplay=1" },
    { "name": "BHOOMI", "imageref": "assets/images/bhoomi.jpg", "vidref": "https://www.youtube.com/embed/p-DkU5OQSN4?autoplay=1" }
];

var isGuessMovieDisplayed = false;
var randMovie, randMovieArr, randMovieArrCharLength;


function randomMovieToGuess() {
    var randomMovie;
    randMovieNum = Math.floor((Math.random() * movieList.length));
    randomMovie = movieList[randMovieNum].name;
    return randomMovie;
}

function getMovieNameInArray(movieName) {
    return movieName.split('');
}

function displayMovieToGuessOnUI(movieNameArr) {
    // $(movieName).each(console.log()); //$('.gamesection').append('<h3>').text('_')
    var charCSS = { 'width': '30px', 'padding': '3px', 'background': 'lightgreen', 'margin': '5px 2px' };

    $(movieNameArr).each(function(index) {
        $('.movienamedisplay').append($('<button>').text('_').css(charCSS).addClass('char_' + index));
    })
    console.log(movieNameArr);
    isGuessMovieDisplayed = true;
}

function displayInvalidCharOnUI(char) {
    var charCSS = { 'width': '30px', 'padding': '3px', 'background': 'orange', 'margin': '5px 2px' };
    $('.invalidchardisplay').append($('<button>').text(char).css(charCSS));
}

function isCharExistsInMovie(singleChar, movieNameArr) {
    return movieNameArr.includes(singleChar);
}

function updateScoreCard() {
    $('.wins button').text(wins);
    $('.losses button').text(losses);
    $('.guess button').text(guesses);
}

$(document).keyup(function(key) {
    // $('.rightcontent h2').text('Game Started');
    var key_Code = key.which;
    var key_Name = String.fromCharCode(key.keyCode);


    console.log(key_Code, key_Name);
    // var randMovie;// = randomMovieToGuess();
    // console.log(randMovie);
    // var randMovieArr;// = getMovieNameInArray(randMovie)
    // console.log(randMovieArr.length);

    if (randMovieArrCharLength <= 0 || invalidCharGuess >= maxGuessCount) {
        if (randMovieArrCharLength <= 0) {
            wins++;
        }
        if (invalidCharGuess >= maxGuessCount) {
            losses++;
        }

        alert('Game is Over... reload the page to run again');
        return;
    }

    if (!isGuessMovieDisplayed) {
        randMovie = randomMovieToGuess();
        randMovieArr = getMovieNameInArray(randMovie);
        randMovieArrCharLength = randMovieArr.length;
        displayMovieToGuessOnUI(randMovieArr);
    } else {
        if (charGuessArr.includes(key_Name)) {
            console.log('Key already used : ' + key_Name);
            return;
        } else {
            charGuessArr.push(key_Name);
        }

        if (isCharExistsInMovie(key_Name, randMovieArr)) {
            // validCharGuessArr.push(key_Name);
            // var positionOfCharInMovieArr = randMovieArr.indexOf(key_Name);
            var positionOfCharInMovieArr = $.map(randMovieArr, function(val, index) { if (val === key_Name) return index; })

            if (positionOfCharInMovieArr.length > 1) {
                randMovieArrCharLength = randMovieArrCharLength - positionOfCharInMovieArr.length;
            } else {

                randMovieArrCharLength--;
            }

            console.log('Movie chars to guess : ' + randMovieArrCharLength);
            console.log(positionOfCharInMovieArr)
            $(positionOfCharInMovieArr).each(function(index) { $('.char_' + positionOfCharInMovieArr[index]).text(key_Name) });
        } else {
            invalidCharGuess++;
            console.log('invalid Guess count ', invalidCharGuess)
            displayInvalidCharOnUI(key_Name);
        }
    }

    if (randMovieArrCharLength <= 0 || invalidCharGuess >= maxGuessCount) {
        if (randMovieArrCharLength <= 0) {
            wins++;
            $('.moviepic img').attr('src',movieList[randMovieNum].imageref);
            $('.movievideo iframe').attr('src',movieList[randMovieNum].vidref);
        }
        if (invalidCharGuess >= maxGuessCount) {
            losses++;
        }
        updateScoreCard();

    }

    // console.log('Random movie is : ' + randMovieNum, movieList[randMovieNum].name)
    // console.log(movieList.movies, Object.keys(movieList).length, Object.keys(movieList.movies).length)


})