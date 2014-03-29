// arrays, arrays!
var questions = [ "Question A", "Question B", "Question C", ];
var answers = [ "Answer A", "Answer B", "Answer C", ];
// hold the current and last card. We'll calculate next card on the fly
var currentCard = 0;
var previousCard;
// we'll be doing a lot of sliding, let's make it easier
hideCard = { "direction": "left", "mode": "hide" }; 
showCard = { "direction": "right", "mode": "show"};
// to keep track of whether we're showing a question or an answer
var isQ = true;


// start with the card hidden:  
$('#card').hide();


// define next button here
$("#card").click(function() {
  $("#card").flip({
      direction: 'tb',
      speed: 350,
      color: 'lightgrey',
      content: testQuestion()
  });
});

// next button click handler
// for now just show cards randomly, later we'll offer an option for showing them in order
$('#nextCard').click(function() {
    previousCard = currentCard;
    currentCard = getRandomCard();
    if ($('#card').is(':hidden')) {
        $('#card').show().html('<h1>' + questions[0] + '</h1>');
        $('#placeHolder').remove();
}
     else {                 
    $('.card').effect('slide', hideCard, 750).html('<h1>'+ questions[currentCard] +'</h1>').effect('slide', showCard, 500);
    isQ = true;
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




