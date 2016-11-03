var app = {


	qAndA:[{question: "Who is the librarian at Hogwarts?",
			pos1: "Madam Rosmerta",
			pos2: "Madam Pince",
			pos3: "Madam Skeeter",
			pos4: "Madam Hootch",
			imgUrl: "./assets/images/Madam_Pince.png"},
		   {question: "Where does Charlie Weasley work with dragons??",
			pos1: "Ireland",
			pos2: "Transylvania",
			pos3: "Romania",
			pos4: "Estonia",
			imgUrl: "./assets/images/Romania.jpg"},
		   {question: "What was Tom Riddle\'s mother\'s maiden name?",
			pos1: "Riddle",
			pos2: "Clearwater",
			pos3: "Peverell",
			pos4: "Gaunt",
			imgUrl: "./assets/images/Gaunt.png"},
		   {question: "What is the symbol for Hufflepuff house?",
			pos1: "Badger",
			pos2: "Eagle",
			pos3: "Snake",
			pos4: "Lion",
			imgUrl: "./assets/images/Badger.png"},
		   {question: "When is Harry Potter\'s Birthday?",
		    pos1: "30th August",
		    pos2: "30th July",
		    pos3: "31st July",
		    pos4: "30th June",
			imgUrl: "./assets/images/Birthday.jpg"}],

	correctAnswers: ['Madam Pince', 'Romania', 'Gaunt', 'Badger', '31st July'],
	userAnswers: [],

	incrementQs: 0,
	beginInt: 0,

	timer: 30,
	btnClicked: false,
	numberCorrect: 0,
	numberIncorrect: 0,
	numberUnAnswered: 0,
	playMusic: new Audio("./assets/sounds/quizsound.mp3"),

	beginGame: function(){
		app.playMusic.play();	
		if(app.incrementQs == app.qAndA.length){

			app.gameFinished();
			app.timer = 30;

		} else {

			if(app.incrementQs >= 1){
				clearInterval(app.displayNextInt);
				$('#gameStart').show();
				$('#divAnswers').hide();
				app.timer = 30;
				$('#time').html(app.timer); //??
			}

			$('p.questions').html(app.qAndA[app.incrementQs].question);
			$('p.answer1').html(app.qAndA[app.incrementQs].pos1);
			$('p.answer2').html(app.qAndA[app.incrementQs].pos2);
			$('p.answer3').html(app.qAndA[app.incrementQs].pos3);
			$('p.answer4').html(app.qAndA[app.incrementQs].pos4);

			app.beginInt = setInterval(app.count, 1000);

		}


	},

	count: function(){

		app.timer--;
		$('#time').html(app.timer);

		if(app.timer == 0){

			app.oufOfTime();
			app.playMusic.pause();

		} else if(app.btnClicked == true && app.correctAnswers[app.incrementQs] == app.userAnswers[app.incrementQs]){
		
			app.answersCorrect();
			app.playMusic.play();

		} else if(app.btnClicked == true && app.correctAnswers[app.incrementQs] != app.userAnswers[app.incrementQs]){

			app.answersWrong();
			app.playMusic.pause();
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
		$('#elapsedTime').html(app.timer);

		clearInterval(app.beginInt);

		var newImg = $("<img>").attr('src', app.qAndA[app.incrementQs].imgUrl).attr('width', '130px','height', '130px').attr('id', 'correctMovieImage');

		$('#pic').append(newImg);		
		app.btnClicked = false;

		app.displayNextInt = setInterval(app.beginGame, 3000);
		app.numberCorrect++;
		app.incrementQs++;
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
		$('#pCorrectAnswer span').html(app.correctAnswers[app.incrementQs]);
		$('#timeRemaining').css('display', 'block');
		$('#elapsedTime').html(app.timer);
		clearInterval(app.beginInt);

		var newImg = $("<img>").attr('src', app.qAndA[app.incrementQs].imgUrl).attr('width', '115px').attr('id', 'correctMovieImage');

		$('#pic').append(newImg);

		app.btnClicked = false;
		app.displayNextInt = setInterval(app.beginGame, 5000);
		app.numberIncorrect++;
		app.incrementQs++;
	},

	oufOfTime: function(){

		if(newImg != ""){

			$('#pic').empty();
		}

		app.userAnswers.push(""); // placeholder, MAY NEED TO CHANGE
		$('#divAnswers').show();
		$('#gameStart').hide();
		$('#pCorrectAnswer span').html(app.correctAnswers[app.incrementQs]);
		$('#pCorrectAnswer').show();
		$('#correctMsg').hide();
		$('#wrongMsg').hide();		
		$('#timeRemaining').css('display', 'block');
		$('#elapsedTime').html(app.timer);	
		clearInterval(app.beginInt);
		var newImg = $("<img>").attr('src', app.qAndA[app.incrementQs].imgUrl).attr('width', '115px').attr('id', 'correctMovieImage');

		$('#pic').append(newImg);

		app.numberUnAnswered++;

		app.displayNextInt = setInterval(app.beginGame, 5000);

		app.incrementQs++;	

	},

	restart: function(){

		app.incrementQs = 0;
		app.userAnswers.length = 0;
		$('#time').html("30");

		app.beginGame();
		$('#gameStart').show();
		$('#gameComplete').hide();
		$('#restartPlaceholder').css('display', 'none');
		clearInterval(app.displayNextInt);
		$('#elapsedTime').empty();
		app.numberCorrect = 0;
		app.numberIncorrect = 0;
		app.numberUnAnswered = 0;
	},

	gameFinished: function(){

		$('#restartPlaceholder').css('display', 'block');
		$('#divAnswers').hide();
		$('#gameStart').hide();

		$('#gameComplete').css('display', 'block');

		$('#gameOverCorrect span').html(app.numberCorrect);
		$('#gameOverIncorrect span').html(app.numberIncorrect);
		$('#unanswered span').html(app.numberUnAnswered);
		app.timer = 30;
	}
};


$(document).ready(function(){

	$('#begin').on('click', function(){

		$('div#gameStart').css('display', 'block');
		$('#btnWrapper').css('display', 'none');
		$('.questions').html(app.beginGame);

	});

	$('.answers').on('click', function(){

		app.userAnswers.push($(this).text());
		app.btnClicked = true;

	});

	$('#restartPlaceholder').on('click', function(){

		app.restart();
		
	});

});

