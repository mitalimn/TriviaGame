$(document).ready(function(){
var number=30;
	var triviaGame = {
		firstPage :$('#firstPage'),
		quizPage: $('#quizPage'),
		gameEnd:$('#gameEnd'),
		winCount :0,
		totalAnswers: 5,
		rightAnswerCount:0,
		wrongAnswerCount:0,
		notAttemptedCount:0,
		totalCorrect: $('#totalCorrect'),
		totalIncorrect:$('#totalIncorrect'),
		totalNotAttempted:$('#totalNotAttempted'),
		displayRightWrong:$('#displayRightWrong'),
		answersUL:$('#answersUL'),
		timeSeconds:$('#timeSeconds'),
		playButton: $('#playButton'),
		optionsLi:[],
		answersUL:$('#answersUL'),
		qdisplay:$('.qdisplay'),
		questionCount:4,
		
		//Arrays for storing Question and Answers

		questionAnswers : [{
			question : 'Who is the librarian at Hogwarts?',
			answers : [{
				answer : 'Madam Rosmerta',
				correct: false,
			},
			{
				answer :'Madam Pince',
				correct :true,
			},
			{
				answer: 'Madam Skeeter',
				correct : false,
			},
			{
				answer :'Madam Hootch',
				correct : false,
			}]
			
		},{
			question : 'Where does Charlie Weasley work with dragons?',
			answers :[{
				answer : 'Ireland',
				correct : false,
			},
			{
				answer : 'Romania',
				correct : true,
			} ,
			{
				answer : 'Transylvania',
				correct : false,
			},
			{
				answer : 'Estonia',
				correct : false,
			}]
		},
		{
			question : 'What was Tom Riddle\'s mother\'s maiden name?',
			answers: [{
				answer :'Riddle',
				correct :false,
			},

			{
				answer : 'Clearwater',
				correct : false,
			},
			{
				answer : 'Peverell',
				correct : false ,
			},
			{
				answer : 'Gaunt',
				correct : true,
			}]
		},
		{
			question : 'What is the symbol for Hufflepuff house?',
			answers :[{
				answer : 'Badger',
				correct : true,
			},
			{
				answer : 'Lion',
				correct : false,
			},
			{
				answer : 'Eagle',
				correct : false,
			},{
				answer : 'Snake',
				correct : false,
			}]
		},
		{
			question : 'When is Harry Potter\'s Birthday?',
			answers: [{
				answer : '30th July',
				correct : false,
			},
			{
				answer : '31st July',
				correct : true,
			},
			{
				answer : '31st August',
				correct : false,
			},{
				answer : '30th June',
				correct :  false,
			}],
		}],//Ends Question Ans array

		//Function to display 4 options to the question displayed
		answerCount:4,
		current_question: 0,
		rightAnswer: null,

		hideGameScreen : function(){
			console.log("Inside hide game screenfunction");
			this.quizPage.hide();
		},
		hideGameEnd : function(){
			this.gameEnd.hide();
		},

		showGameScreen : function(){
			this.quizPage.show();
		},
		showGameEndScreen : function(){
			this.gameEnd.show();
		},

		displayOption : function(){
			console.log("display options");
			for (i=0;i<this.answerCount; i++){
				newLi = document.createElement('li');
				$(newLi).addClass('list-answers options-Li').attr('data-index',i);
				this.optionsLi.push(newLi); //optionsLi is an array
				$(this.answersUL).append(newLi);
			}
		},

		displayQsAs : function(){
			console.log("display qstn");
			this.qdisplay.html(this.questionAnswers[this.current_question].question);

				//display options for the above question

			for(var j=0;j<4;j++){
				console.log("all 4 option");
				console.log(this.questionAnswers[this.current_question].answers[j].answer);	
				console.log(this.optionsLi);
				$(this.optionsLi[j]).html(this.questionAnswers[this.current_question].answers[j].answer);
			}
			
		},

		playGame : function(){
			this.quizTimer();
			console.log("playgame runs");
		},

		quizTimer : function(){

			console.log("inside quizTimer function");
            if(number!=0)
			Window.counter = setInterval(function(){ // Decrease number by one.


            console.log("inside decrement function" );
            number--;
            // Show the number in the #show-number tag.
            $('#timeSeconds').html(number);

            // Once number hits zero...
            if (number< 0){
                // ...run the stop function.
                console.log("inside timer if");
                //stop();
                clearInterval(Window.counter);
                $('#timeSeconds').html('0');
                        
         	} 1000});
			triviaGame.showGameScreen();
			triviaGame.showGameEndScreen();
			triviaGame.playButton.fadeOut();
		},

		//restart function
		restart : function(){

		},

		
		//Based on the users option this funtion checks if its right or wrong 
		guessTheAnswer : function(dataid){
			clearInterval(Window.counter);

			dataIndex = parseInt(dataid);
			if(dataIndex === this.rightAnswer){
				this.rightAnswerCount++;
				this.displayRightWrong.html("Right Answer");
			}
			// else{
			// 	this.wrongAnswerCount++;
			// 	this.displayRightWrong.html("Wrong Answer - the correct answer is ");
			// 	this.rightAnswer.optionsLi
			// }
		},

		//function for timer
   
    

	} //End TriviaGame
	console.log("hiding game screen");
	triviaGame.hideGameScreen();
	triviaGame.hideGameEnd();
	//display timer
	console.log("timer");
	$('#playButton').on('click', function(){
		triviaGame.playGame();
	});
	//display questions


	$('#restartButton').on('click', function(){

	});

	

	triviaGame.displayOption();
	triviaGame.displayQsAs();
	//display options

	//once the user click on the options 
	//pass the data index of li element
	
	triviaGame.answersUL.on("click", 'options-Li', function(){
		console.log("li clicked");
		triviaGame.guessTheAnswer(this.getAttribute("data-index"));
	});
	

});

