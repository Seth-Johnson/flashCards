// arrays, arrays!
var questions = [];
var answers = [];
// hold the current and last card. We'll calculate next card on the fly
var currentCard = 0;
var previousCard;
// we'll be doing a lot of sliding, let's make it easier
hideCard = { "direction": "left", "mode": "hide" }; 
showCard = { "direction": "right", "mode": "show"};
// to keep track of whether we're showing a question or an answer
var isQ = true;
// because typing document.getElementByClassName everytime isn't worth it
var questionInputs = document.getElementsByClassName('inputQuestions');
var answerInputs = document.getElementsByClassName('inputAnswers');


// start with the card hidden:  
$('#card').hide();


// define flipping here
$('#card').click(function() {
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
$('#nextCard').click(function() {
    previousCard = currentCard;
    currentCard = getRandomCard();
    if ($('#card').is(':hidden')) {
        // we want a question, so false
        isQ = false;
        $('#card').show().html(testQuestion());
        $('#placeHolder').remove();
}
     else {
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

// figure out if we're showing the question or the answer, then chnage it
var testQuestion = function() {
    if (isQ) {
        isQ = false;
        return '<h1>' + answers[currentCard] + '</h1>';
    }
    else {
        isQ = true;
        return '<h1>' + questions[currentCard] + '</h1>';
    }
};

$('#saveCards').click(function() {
        for (i=0; i<questionInputs.length; i++) {
            if (questionInputs[i].value.length == 0) {
                continue;
            }
            else {
                alert('The value is ' + questionInputs[i].value);
                questions.push(questionInputs[i].value);
                if (answerInputs[i].value.length === 0) {
                    if (document.contains(document.getElementById('warning'))) {
                        continue;
                    }
                    else {
                        $('#editCards').append('<div class="alert alert-warning alert-dismissable" id="warning"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button> <strong>Warning!</strong> One or more questions was defined but left without an answer</div>');
                        answers.push('An answer wasn\'t given :( ')
                    }
                }
                else {
                    answers.push(answerInputs[i].value);
                }
                    
            
    }
}
  
  });



