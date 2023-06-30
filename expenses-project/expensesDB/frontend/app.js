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
		},
		newExpense: {
			description: "",
			amount: "",
			category: ""
		}
        }
    },
    methods : {
	    getExpenses: function() {
		    fetch("http://localhost:8080/expenses/")
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
		    myHeaders = new Headers();
		    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

		    var encodedData = "description=" + encodeURIComponent(this.modal.description) + 
			    "&amount=" + encodeURIComponent(this.modal.amount) + 
			    "&category=" + encodeURIComponent(this.modal.category);
		    var requestOptions = {
			    method: "PUT",
			    body: encodedData,
			    headers: myHeaders
		    };

		    var expId = this.expenses[this.modal.index]._id;
		    fetch(`http://localhost:8080/expenses/${expId}`, requestOptions)
		    .then((response) => {
			    if (response.status === 204){
				    this.expenses[this.modal.index].description = this.modal.description;
				    this.expenses[this.modal.index].amount = parseFloat(this.modal.amount);
				    this.expenses[this.modal.index].category = this.modal.category;
				    this.modalOpen = false;
			    } else {
				    alert("Not able to update expense.");
			    }
		    });

	    },
	    addExpense: function() {
		    myHeaders = new Headers();
		    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

		    var encodedData = "description=" + encodeURIComponent(this.newExpense.description) + 
			    "&amount=" + encodeURIComponent(this.newExpense.amount) + 
			    "&category=" + encodeURIComponent(this.newExpense.category);
		    var requestOptions = {
			    method: "POST",
			    body: encodedData,
			    headers: myHeaders
		    };
		    fetch("http://localhost:8080/expenses", requestOptions)
		    .then((response) => {
			    if (response.status === 201){
				    response.json().then((data) => {
					    this.expenses.push(data);
					    this.newExpense = {};
				    });
				    console.log("Success");
				    this.expenses.push({
					    description: this.newExpense.description,
					    amount: this.newExpense.amount,
					    category: this.newExpense.category
				    });
				    this.newExpense = {};
			    } else {
				    alert("Not able to add expense");
			    }
		    })
	    },
	    deleteExpense: function(index) {
		    var expId = this.expenses[index]._id;

		    var requestOptions = {
			    method: "DELETE",
		    };
		    fetch(`http://localhost:8080/expenses/${expId}`, requestOptions)
		    .then((response) => {
			    if (response.status === 204) {
				    console.log("Success");
				    this.expenses.splice(index, 1);
			    } else {
				    console.log("Unable to delete expense");
			    }
		    });
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
