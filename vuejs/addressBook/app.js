Vue.createApp({
    data() {
        return {
                UIname: "",
                UIaddress: "",
                
                name: "",
                address: "",
      
                history: [
                ]
        }   
    },
    methods : {     
            enterInfo: function() {
                    this.name = this.UIname;
                    this.address = this.UIaddress;
                    
                    this.history.push({
                            name: this.name,
                            address: this.address
                    });
                    
                    console.log(this.history);
            
                    this.UIname = "";
                    this.UIaddress= "";
            },      
            deleteItem: function(item) {
                    var index = this.history.indexOf(item);
                    this.history.splice(index, 1);
            }
    },
    created : function() {
    }
}).mount("#app");

