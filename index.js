// arrays, arrays!
var questions = [ "Question A", "Question B", ];
var answers = [ "Answer A", "Answer B", ];
// hold the current and last card. We'll calculate next card on the fly
var currentCard;
var previousCard;
hideCard = { "direction": "left", "mode": "hide" }; 
showCard = { "direction": "right", "mode": "show"};


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
$('#nextCard').click(function() {
    previousCard = currentCard;
    currentCard = getRandomCard();
    if ($('#card').is(':hidden')) {
        $('#card').show();
        $('#placeHolder').remove();
}
     else {
                     
    $('.card').effect('slide', hideCard, 750).html('<h1>'+ questions[getRandomCard()] +'</h1>').effect('slide', showCard, 500);
}
});


// define previous button here

var getRandomCard = function () {
    randomNum = Math.floor(Math.random() * questions.length);
    return randomNum;
};

// figure out if we're showing the question or the answer, then chnage it
var isQ = true;
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




