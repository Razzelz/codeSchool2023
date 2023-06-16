Vue.createApp({
    data() {
        return {
		jokeData: [],
		jokeList: [],
		filteredJokeList: [],
		jokeOfTheDay: "",
		search: ""
        }
    },
    methods : {
	    getJokes: function() {
                    fetch("https://code.mollyshewchuk.com/jokes")
                            .then(response => response.json()).then((data) => {
                                    this.jokeData = data;

				    //Generate first joke
				    index = Math.ceil(Math.random() * this.jokeData.length);
				    this.jokeOfTheDay = this.jokeData[index];
                            })
            },
	    generateJoke: function() {
		    //This generate a new joke when hitting the button
		    index = Math.ceil(Math.random() * this.jokeData.length);
		    this.jokeOfTheDay = this.jokeData[index];

		    this.jokeList.push([
			    this.jokeOfTheDay
		    ])
		    console.log(this.jokeList);
	    }
    },
    created : function() {
	    this.getJokes();
    },
    watch: {
	    search(newSearch, oldSearch) {
		    console.log(newSearch);
                    this.filteredJokeList = this.jokeList.filter((joke) => {
			    return joke.toLowerCase().includes(newSearch.toLowerCase());
                    });
            }
    }

}).mount("#app");
