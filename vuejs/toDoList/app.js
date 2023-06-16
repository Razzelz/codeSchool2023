Vue.createApp({
    data() {
        return {
		tasks: [],
		search: "",
		filteredTasks: [],
		category: "",
		description: "",
		UIcategory: "",
		UIdescription: "",
		modalOpen: false,
		modal: {
			index: -1,
			description: "",
			category: ""
		}
        }
    },
    methods : {
            addItem: function() {
                    this.description = this.UIdescription;
                    this.category = this.UIcategory;

                    this.tasks.push({
                            description: this.description,
                            category: this.category
                    });

                    console.log(this.tasks);

                    this.UIdescription= "";
                    this.UIcategory = "";
            },
            deleteItem: function(item) {
                var index = this.tasks.indexOf(item);
                this.tasks.splice(index, 1);
            },
	    toggleModal: function(index = null) {
		    if (index !== null) {
			    this.modalOpen = true;
			    let item = this.tasks[index];
			    this.modal.index = index;
			    this.modal.description = item.description;
			    this.modal.category = item.category;
		    } else {
			    this.modalOpen = false;
		    }
	    },
	    updateTask: function() {
		    this.tasks[this.modal.index].description = this.modal.description;
		    this.tasks[this.modal.index].category = this.modal.category;
		    this.modalOpen = false;
	    }
    },
    created : function() {
    },
    watch: {
	    search(newSearch, oldSearch) {
		    console.log(newSearch);
		    this.filteredTasks= this.tasks.filter((item) => {
			    return item.description.toLowerCase().includes(newSearch.toLowerCase());
		    });
	    }
    }
}).mount("#app");
