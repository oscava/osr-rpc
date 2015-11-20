var Class = require("osr-class");
var Thrift = require("thrift");
var SharedService = require("../thrift/gen-nodejs/SharedService");
var ttypes = require("../thrift/gen-nodejs/rpcService_types");
var Client = Class.extends({
  $ : function(){
    this.name = "Thrift's Client";
  },
  connect: function( port, host ){
    port = port || 8881;
    host = host || '127.0.0.1';
    this.connection = Thrift.createConnection( host, port);
    // this.connection.on("error",function(err){
    //   console.log("error",err);
    // });
    this.client = Thrift.createClient(SharedService,this.connection);
    // this.client.getRpc(function( err, rpcserver ){
    //   console.log("getRpc",err,rpcserver);
    // });
  },
  deal:function( method, args ,callback){
    var method = method;
    var args = JSON.stringify(args);
    this.client.deal(method,args,callback);
  }
});

module.exports = Client;
