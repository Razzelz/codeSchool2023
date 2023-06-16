Vue.createApp({
    data() {
        return {
		kilobytes: "",
		bytes: "",
		displayBytes: null,
		displayMegabits: null
        }
    },
    methods : {
	    convertToB: function (){
		    // kilobytes to bytes
		    let answer = this.kilobytes * 1000;
		    this.displayBytes = answer;
	    },

	    convertToMb: function (){
		    // bytes to megabits
		    let answer = (this.bytes * 0.000008).toFixed(5);
		    this.displayMegabits = answer;
	    },

	    numValid: function (num){
		    return num.length > 0 && !isNaN(num);
	    }

    },
    created : function() {
    }
}).mount("#app");
