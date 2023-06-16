Vue.createApp({
    data() {
        return {
		expenses: [],
		//balance: null
		search: "",
		filteredExpenses: [],
		sortOrder: "",
		modalOpen: false,
		modal: {
			index: -1,
			description: "",
			amount: "",
			category: ""
		}
        }
    },
    methods : {
	    getExpenses: function() {
		    fetch("https://expenses.codeschool.cloud/expenses")
			    .then(response => response.json()).then((data) => {
				    this.expenses = data;
			    })
	    },
	    clearField: function(){
		    this.search = "";
	    },
	    sortExpenses: function(){
		    if (this.sortOrder == 'asc') {
			    function compare(a, b) {
				    if (a.amount > b.amount) return -1;
				    if (a.amount < b.amount) return 1;
				    return 0;
			    }
			    this.sortOrder = 'desc';
		    } else {
			    function compare(a, b) {
				    if (a.amount < b.amount) return -1;
				    if (a.amount > b.amount) return 1;
				    return 0;
			    }
			    this.sortOrder = 'asc';

		    }
		    this.expenses.sort(compare);
	    },
	    toggleModal: function(index = null) {
		    if (index !== null) {
			    this.modalOpen = true;
			    let exp = this.expenses[index];
			    this.modal.index = index;
			    this.modal.description = exp.description;
			    this.modal.amount = exp.amount;
			    this.modal.category = exp.category;
		    } else {
			    this.modalOpen = false;
		    }
	    },
	    updateExpense: function() {
		    this.expenses[this.modal.index].description = this.modal.description;
		    this.expenses[this.modal.index].amount = parseFloat(this.modal.amount);
		    this.expenses[this.modal.index].category = this.modal.category;
		    this.modalOpen = false;
	    }
    },
    created : function() {
	    this.getExpenses();
    },
    //watch: {
    //        expenses(newExp, oldExp){
    //    	    this.expenses.forEach(e => {
    //    		    this.balance += e.amount;
    //    	    });
    //    	}
    //}
    computed: {
	    balance() {
		    if (this.search.length > 0 && this.filteredExpenses.length > 0){
			    return this.filteredExpenses.reduce((total, expense) => (total + expense.amount), 0);
		    } else {
			    return this.expenses.reduce((total, expense) => (total + expense.amount), 0);
		    }
	    }
    },
    watch: {
	    search(newSearch, oldSearch) {
		    console.log(newSearch);
		    this.filteredExpenses = this.expenses.filter((expense) => {
			    return expense.description.toLowerCase().includes(newSearch.toLowerCase());
		    });
	    }
    }
}).mount("#app");
