Vue.createApp({
	data() {
		return {
			user: "User",
			name: null,
			items: [
				{text: "Beige", show: false, color: "#D4D6B9"},
				{text: "Gray-blue", show: false, color: "#66717E"},
				{text: "Purple", show: false, color: "#383B53"}
			],
		}
	},
	methods: {
		toggleColor: function(item) {
			console.log(item);
			item.show = !item.show;
		},
		changeName: function() {
			this.user = this.name;
		},
	}
}).mount("#app");
