$(document).ready(function(){
var triviaGame = {


	qAndA:[{
		question: "Who is the librarian at Hogwarts?",
			ans1: "Madam Rosmerta",
			ans2: "Madam Pince",
			ans3: "Madam Skeeter",
			ans4: "Madam Hootch",
			imgUrl: "./assets/images/Madam_Pince.png"},
	   {
	   	question: "Where does Charlie Weasley work with dragons??",
			ans1: "Ireland",
			ans2: "Transylvania",
			ans3: "Romania",
			ans4: "Estonia",
			imgUrl: "./assets/images/Romania.jpg"},
		{
	   	question: "What was Tom Riddle\'s mother\'s maiden name?",
			ans1: "Riddle",
			ans2: "Clearwater",
			ans3: "Peverell",
			ans4: "Gaunt",
			imgUrl: "./assets/images/Gaunt.png"},
	   {
	   	question: "What is the symbol for Hufflepuff house?",
			ans1: "Badger",
			ans2: "Eagle",
			ans3: "Snake",
			ans4: "Lion",
			imgUrl: "./assets/images/Badger.png"},
		{
		question: "When is Harry Potter\'s Birthday?",
		    ans1: "30th August",
		    ans2: "30th July",
		    ans3: "31st July",
		    ans4: "30th June",
			imgUrl: "./assets/images/Birthday.jpg"}],

	correctAnswers: ['Madam Pince', 'Romania', 'Gaunt', 'Badger', '31st July'],
	userAnswers: [],

	questionCount: 0,
	beginInt: 0,

	timer: 30,
	btnClicked: false,
	numberCorrect: 0,
	numberIncorrect: 0,
	numberUnAnswered: 0,
	playMusic: new Audio("./assets/sounds/quizsound.mp3"),

	beginGame: function(){
		triviaGame.playMusic.play();	
		if(triviaGame.questionCount == triviaGame.qAndA.length){

			triviaGame.gameFinished();
			triviaGame.timer = 30;

		} else {

			if(triviaGame.questionCount >= 1){
				clearInterval(triviaGame.displayNextInt);
				$('#gameStart').show();
				$('#divAnswers').hide();
				triviaGame.timer = 30;
				$('#time').html(triviaGame.timer); //??
			}

			$('p.questions').html(triviaGame.qAndA[triviaGame.questionCount].question);
			$('button.answer1').html(triviaGame.qAndA[triviaGame.questionCount].ans1);
			$('button.answer2').html(triviaGame.qAndA[triviaGame.questionCount].ans2);
			$('button.answer3').html(triviaGame.qAndA[triviaGame.questionCount].ans3);
			$('button.answer4').html(triviaGame.qAndA[triviaGame.questionCount].ans4);

			triviaGame.beginInt = setInterval(triviaGame.countDown, 1000);

		}

	},

	countDown: function(){

		triviaGame.timer--;
		$('#time').html(triviaGame.timer);

		if(triviaGame.timer == 0){

			triviaGame.oufOfTime();
			triviaGame.playMusic.pause();

		} else if(triviaGame.btnClicked == true && triviaGame.correctAnswers[triviaGame.questionCount] == triviaGame.userAnswers[triviaGame.questionCount]){
		
			triviaGame.answersCorrect();
			triviaGame.playMusic.play();

		} else if(triviaGame.btnClicked == true && triviaGame.correctAnswers[triviaGame.questionCount] != triviaGame.userAnswers[triviaGame.questionCount]){

			triviaGame.answersWrong();
			triviaGame.playMusic.pause();
		}

	},

	answersCorrect: function(){

		if(newImg != ""){

			$('#pic').empty();
		}

		$('#divAnswers').show();
		$('#gameStart').hide();
		$('#outOfTime').hide();
		$('#wrongMsg').hide();	
		$('#correctMsg').show();
		$('#pCorrectAnswer').hide();	
		$('#answers').css('display', 'block');
		$('#timeRemaining').css('display', 'block');
		$('#elapsedTime').html(triviaGame.timer);

		clearInterval(triviaGame.beginInt);

		var newImg = $("<img>").attr('src', triviaGame.qAndA[triviaGame.questionCount].imgUrl).attr('width', '130px','height', '130px').attr('id', 'correctMovieImage');

		$('#pic').append(newImg);		
		triviaGame.btnClicked = false;

		triviaGame.displayNextInt = setInterval(triviaGame.beginGame, 3000);
		triviaGame.numberCorrect++;
		triviaGame.questionCount++;
	},

	answersWrong: function(){

		if(newImg != ""){

			$('#pic').empty();
		}

		$('#divAnswers').show();
		$('#gameStart').hide();
		$('#outOfTime').hide();
		$('#wrongMsg').show();
		$('#correctMsg').hide();
		$('#pCorrectAnswer').show();
		$('#pCorrectAnswer span').html(triviaGame.correctAnswers[triviaGame.questionCount]);
		$('#timeRemaining').css('display', 'block');
		$('#elapsedTime').html(triviaGame.timer);
		clearInterval(triviaGame.beginInt);

		var newImg = $("<img>").attr('src', triviaGame.qAndA[triviaGame.questionCount].imgUrl).attr('width', '115px').attr('id', 'correctMovieImage');

		$('#pic').append(newImg);

		triviaGame.btnClicked = false;
		triviaGame.displayNextInt = setInterval(triviaGame.beginGame, 5000);
		triviaGame.numberIncorrect++;
		triviaGame.questionCount++;
	},

	oufOfTime: function(){

		if(newImg != ""){

			$('#pic').empty();
		}

		triviaGame.userAnswers.push(""); // placeholder, MAY NEED TO CHANGE
		$('#divAnswers').show();
		$('#gameStart').hide();
		$('#pCorrectAnswer span').html(triviaGame.correctAnswers[triviaGame.questionCount]);
		$('#pCorrectAnswer').show();
		$('#correctMsg').hide();
		$('#wrongMsg').hide();		
		$('#timeRemaining').css('display', 'block');
		$('#elapsedTime').html(triviaGame.timer);	
		clearInterval(triviaGame.beginInt);
		var newImg = $("<img>").attr('src', triviaGame.qAndA[triviaGame.questionCount].imgUrl).attr('width', '115px').attr('id', 'correctMovieImage');

		$('#pic').append(newImg);

		triviaGame.numberUnAnswered++;

		triviaGame.displayNextInt = setInterval(triviaGame.beginGame, 5000);

		triviaGame.questionCount++;	

	},
//Restart function
	restart: function(){

		triviaGame.questionCount = 0;
		triviaGame.userAnswers.length = 0;
		$('#time').html("30");

		triviaGame.beginGame();
		$('#gameStart').show();
		$('#gameComplete').hide();
		$('#restartPlaceholder').css('display', 'none');
		clearInterval(triviaGame.displayNextInt);
		$('#elapsedTime').empty();
		triviaGame.numberCorrect = 0;
		triviaGame.numberIncorrect = 0;
		triviaGame.numberUnAnswered = 0;
	},

	gameFinished: function(){

		$('#restartPlaceholder').css('display', 'block');
		$('#divAnswers').hide();
		$('#gameStart').hide();

		$('#gameComplete').css('display', 'block');

		$('#gameOverCorrect span').html(triviaGame.numberCorrect);
		$('#gameOverIncorrect span').html(triviaGame.numberIncorrect);
		$('#unanswered span').html(triviaGame.numberUnAnswered);
		triviaGame.timer = 30;
	}
};




	$('#begin').on('click', function(){

		$('div#gameStart').css('display', 'block');
		$('#btnWrapper').css('display', 'none');
		$('.questions').html(triviaGame.beginGame);

	});

	$('.answers').on('click', function(){

		triviaGame.userAnswers.push($(this).text());
		triviaGame.btnClicked = true;

	});

	$('#restartPlaceholder').on('click', function(){

		triviaGame.restart();
		
	});


});