struct Rpc{
  1:string name
  2:string ext
}
struct Result{
  1:i32 code
  2:string result
}
service SharedService{
  Rpc getRpc()
  Result deal(1:string method, 2:string params )
}
