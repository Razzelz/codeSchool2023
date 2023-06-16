Vue.createApp({
	data() {
		return {
			message: "hello",
			items: [
				{text: "item 1", show: true, color: "#D1CAA1"},
				{text: "item 2", show: true, color: "#D4D6B9"},
				{text: "item 3", show: true, color: "#66717E"},
				{text: "item 4", show: true, color: "#383B53"}
			],
			showText: true
		}
	},
	methods: {
		toggleColor: function(item) {
			console.log(item);
			item.show = !item.show;
		},
		appendText: function(item) {
			item.text += "-";
		},
		toggleText: function() {
			this.showText = !this.showText;
		}

	}
}).mount("#app");
