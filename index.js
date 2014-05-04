// arrays, arrays!
var questions = [];
var answers = [];
// hold the current card
var currentCard = 0;
// we'll be doing a lot of sliding, let's make it easier
hideCard = {
    "direction": "left",
        "mode": "hide"
};
showCard = {
    "direction": "right",
        "mode": "show"
};
// to keep track of whether we're showing a question or an answer
var isQ = true;
// because typing document.getElementByClassName everytime isn't worth it
var questionInputs = document.getElementsByClassName('inputQuestions');
var answerInputs = document.getElementsByClassName('inputAnswers');
// start with the card hidden:  
$('#card').hide();


// Set the stage and define all the functions we'll use

// get the next card (temp so we can return properly)
var getNextCard = function () {
    var temp;
    if (currentCard >= (questions.length - 1)) {
        temp = 0;
    } else {
        temp = currentCard + 1;
    }
    return temp;
};

// figure out if we're showing the question or the answer, then change it
var testQuestion = function () {
    if (isQ) {
        isQ = false;
        return '<h1>' + answers[currentCard] + '</h1>';
    } else {
        isQ = true;
        return '<h1>' + questions[currentCard] + '</h1>';
    }
};

// I know, it's .. ahem.. not awesome.
var randomizeArray = function () {
    var m = questions.length,
        qTemp, aTemp, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        qTemp = questions[m];
        aTemp = answers[m];
        questions[m] = questions[i];
        answers[m] = answers[i];
        questions[i] = qTemp;
        answers[i] = aTemp;
    }

};

var clearArrays = function () {
    while (questions.length > 0) {
        questions.pop();
    }
    while (answers.length > 0) {
        answers.pop();
    }
};

// Set up the handlers and functions for actual things

// handle updating the cards
$('#saveCards').click(function () {
    if (questions.length > 0) {
        clearArrays();
    } else {
        // loop through the question inputs
        for (i = 0; i < questionInputs.length; i++) {
            // check if a question was defined in the current input
            if (questionInputs[i].value.length === 0) {
                // if not, skip it
                continue;
                // if the question was defined push it to the questions array
            } else {
                alert('The value is ' + questionInputs[i].value);
                questions.push(questionInputs[i].value);
                // check if an answer was defined for the question. If not, issue a warning
                if (answerInputs[i].value.length === 0) {
                    // we don't want more than one warning!
                    if (document.contains(document.getElementById('warning'))) {
                        continue;
                        // show the warning
                    } else {
                        $('#editCards').append('<div class="alert alert-warning alert-dismissable" id="warning"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> <strong>Warning!</strong> One or more questions was defined but left without an answer</div>');
                        // We have a question and they have a warning, so lets pretend they did it on purpose.
                        answers.push('An answer wasn\'t given :( ');
                    }
                    // if we're all good, add the answer to the answer array
                } else {
                    answers.push(answerInputs[i].value);
                }


            }
        }
        if (document.getElementById('randomizeCheckbox').checked) {
            randomizeArray();
        }
    }

});


// define flipping here
$('#card').click(function () {
    $('#card').flip({
        direction: 'tb',
        speed: 350,
        color: 'lightgrey',
        content: testQuestion()
    });
});
// ugh; jquery, jquery everwhere.  

// previous button click handler  
$('#previousCard').click(function () {
    if (currentCard == 0) {
        currentCard = questions.length - 1;
    } else {
        currentCard = currentCard - 1;
    }
    isQ = false;
    $('.card').effect('slide', {
        'direction': 'right',
        'mode': 'hide'
    }, 750).html(testQuestion()).effect('slide', {
        'direction': 'left',
        'mode': 'show'
    }, 500);
});

// next button click handler
// for now just show cards randomly, later we'll offer an option for showing them in order
$('#nextCard').click(function () {
    currentCard = getNextCard();
    if ($('#card').is(':hidden')) {
        // we want a question, so false
        isQ = false;
        $('#card').show().html(testQuestion());
        $('#placeHolder').remove();
    } else {
        // false 'cause we want a question when it slides
        isQ = false;
        $('.card').effect('slide', hideCard, 750).html(testQuestion()).effect('slide', showCard, 500);

    }
});
    