// Global variables to check if answer is correct
var val1 = 0;
var val2 = 0;
var curr_operator = 0;
var calculatedAnswer = 0;

const operators = ["+", "*"];

function generateQuestion(){
	// Generates random numbers for problem
	val1 = Math.floor(Math.random() *51);
	val2 = Math.floor(Math.random() *51);

	var question = document.querySelector("#question");
	console.log(question);

	// Randomizer to pick between operators
	var randomIndex = Math.floor(Math.random() * 2);

	var operator = operators[randomIndex];
	curr_operator = operator;

	question.innerHTML = val1 + " "  + operator + " " + val2;

	console.log(val1);
	console.log(val2);
	calculateAnswer();
}

function calculateAnswer() {
	if (curr_operator == "+"){
		calculatedAnswer = val1 + val2;
		console.log("Correct answer: " + calculatedAnswer);
	} else if(curr_operator == "*"){
		calculatedAnswer = val1 * val2;
		console.log(calculatedAnswer);
	}
}

submit_button.onclick = function(){
        //Get the value of the user input
        var answer = document.querySelector("#answer-box").value;

        //Records the guess history
        var li = document.createElement("li");
        li.innerHTML = answer;
        document.getElementById("answer_history").appendChild(li);

        //clear box after hitting button to prepare for next guess
        document.querySelector("#answer-box").value = '';

	if (answer == calculatedAnswer){
		var output = document.querySelector("#output");
		output.innerHTML = "Correct!".fontcolor("#475D32");
		generateQuestion();
		document.getElementById("answer_history").innerHTML = "";
	} else {
		var output = document.querySelector("#output");
		output.innerHTML = "Incorrect, try again.".fontcolor("#A63A3E");
	}
}

generateQuestion();
calculateAnswer();
