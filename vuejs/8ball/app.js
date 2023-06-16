Vue.createApp({
    data() {
        return {
		message: "",
		options: [
			"Yes",
			"No",
			"Ask again tomorrow",
			"Probably",
			"Probably not"
		],
		question: "",
		history: [
		]
        }
    },
    methods : {
	    askQuestion: function() {
		    let index = Math.floor(Math.random() * this.options.length);
		    let message = this.options[index];
		    this.message = message;

		    this.history.push({
			    question: this.question,
			    answer: this.message
		    });

		    console.log(this.history);

		    this.question = "";
	    },
	    questionValid: function() {
		    //returns true if ? as last character. Else, false
		    return this.question[this.question.length - 1] == '?';
	    },
	    deleteItem: function(item) {
		    var index = this.history.indexOf(item);
		    this.history.splice(index, 1);
	    }
    },
    created : function() {
    }
}).mount("#app");
