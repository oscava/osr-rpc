var Client = require("../").Client;

var MyClient = Client.extends({
	start: function( port, host){
		
		this.connect( port, host );
		
		this.connection.on('error',function( error ){
			console.log("===",error);
		});
		
		this.client.getRpc( function( err, routes ){
			// console.log( err, routes.ext );
			console.log(JSON.parse(routes.ext));
		});
	}
})

var client = new MyClient();


client.start()