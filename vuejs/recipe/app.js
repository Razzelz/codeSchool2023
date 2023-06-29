Vue.createApp({
    data() {
        return {
		recipes: [],
		search: ""
        }
    },
    methods : {
	    searchRecipes: function() {
                    fetch(`https://code.mollyshewchuk.com/recipes?q=${this.search}`)
                    .then(response => response.json())
                    .then(data => {
                            this.recipes = data;
			    this.sortRecipes();
                            console.log(this.recipes);
                    })
	    },
	    getRecipes: function() {
		    fetch("https://code.mollyshewchuk.com/recipes")
		    .then(response => response.json())
		    .then(data => {
			    this.recipes = data;
			    this.sortRecipes();
			    console.log(this.recipes);
		    })
	    },
            sortRecipes: function(){
		    //This is another way to sort
		    //this.recipes = this.recipes.sort((a, b) => {
		    //        if (a.title > b.title) return 1;
		    //        if (a.title < b.title) return -1;
		    //        return 0;
		    //})
		    function compareStrings(a, b) {
		            a = a.toLowerCase();
		            b = b.toLowerCase();
		            return (a < b) ? -1: (a > b) ? 1 : 0;
		    }
                    this.recipes.sort(function(a, b) {
		            return compareStrings(a.title, b.title);
		    });
            },

    },
    created : function() {
	    this.getRecipes();
    }
}).mount("#app");
