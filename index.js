// arrays, arrays!
var questions = [];
var answers = [];
// hold the current and last card. We'll calculate next card on the fly
var currentCard = 0;
var previousCard;
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

// next button click handler
// for now just show cards randomly, later we'll offer an option for showing them in order
$('#nextCard').click(function () {
    previousCard = currentCard;
    currentCard = getRandomCard();
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


// define previous button here

// get the next card (randomly)
var getRandomCard = function () {
    randomNum = Math.floor(Math.random() * questions.length);
    return randomNum;
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

// handle updating the cards
$('#saveCards').click(function () {
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

});