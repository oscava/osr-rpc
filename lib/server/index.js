var Class = require("osr-class");
var Thrift = require("thrift");
var SharedService = require("../thrift/gen-nodejs/SharedService");
var ttypes = require("../thrift/gen-nodejs/rpcService_types");
var _ = require("osr-utils");
var Server = Class.extends({
  $ : function( name ){
    this.name = name;
    this.route = {};
    var _this = this;
    this.server = Thrift.createServer(SharedService,this);
  },
  listen: function( port ){
    this.port = port || 8881;
    // this.server.on("error",function(err){
    //   console.log(err);
    // });
    this.server.listen(this.port);
  },
  getRpc: function( callback ){
    // console.log("===",this.route);
    var rpc = new ttypes.Rpc({ name: this.name, route: JSON.stringify(this.route)});
    callback( null, rpc);
  },
  deal: function( method, args , callback ){
    var result = new ttypes.Result();
    if(_.isFunction(this[method])){
      args = JSON.parse(args);
      result.code = 1;
      var fn = function( err, _result ){
        if(!err){
          result.result = JSON.stringify(_result);
        }
        callback( err , result );
      }
      this[method].apply(this,args.concat(fn));
    }else{
      result.code = 0;
      callback( new Error("方法未找到") , result)
    }
  }
});
module.exports = Server;
