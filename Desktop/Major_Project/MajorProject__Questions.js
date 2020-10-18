function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}

function populate() {
    if(quiz.isEnded()) {
        showScores();
        LinkForAns();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function LinkForAns() { 
                
                var a = document.createElement('a'); 
                
                var link = document.createTextNode("View Answers"); 
                
                a.appendChild(link); 
                
                a.title = "Link For Answers"; 
                
                a.href = ""; //Add the URL of Question&Answers file where you have placed the file.
                
                document.body.appendChild(a); 
            };

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your score is: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// create questions here
var questions = [
    new Question("Thailand announced that it has proceeded to test its novel coronavirus vaccine on which animal/bird?", ["Lizards", "Monkeys","Hens", "Pigs"], "Monkeys"),
    new Question("Which of the following statement is correct for COVID-19 spreads?", ["COVID-19 occur in all age groups.", "Coronavirus infection is mild in children.", " Older person and persons with pre-existing medical conditions are at high risk to develop serious illness.", " All the above are correct"], " All the above are correct"),
    new Question("The first case of novel coronavirus was identified in .....", ["Beijing", "Shanghai","Wuhan,Hubei", "Tianjin"], "Wuhan,Hubei"),
    new Question("From where coronavirus got its name?", ["Due to their crown-like projections.", "Due to their leaf-like projections.", " Due to their surface structure of bricks.", "None of the above"], "Due to their crown-like projections."),
    new Question("What are the precautions that need to be taken to protect from the coronavirus?", ["Add more garlic into your diet.", "Visit your doctor for antibiotics treatment", "Cover your nose and mouth when sneezing.","Wash your hands after every hour."], "Cover your nose and mouth when sneezing.")
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();
