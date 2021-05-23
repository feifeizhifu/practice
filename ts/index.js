var a = [1, 2, 3];
var b = [1, 2, 3];
var c = ["s"];
//枚举
var Color;
(function (Color) {
  Color[(Color["red"] = 0)] = "red";
  Color[(Color["green"] = 1)] = "green";
  Color[(Color["blue"] = 2)] = "blue";
})(Color || (Color = {}));
console.log(Color[0]); //red
var Status;
(function (Status) {
  Status[(Status["success"] = 1)] = "success";
  Status[(Status["fail"] = 3)] = "fail";
})(Status || (Status = {}));
console.log(Status.fail); //3
var obj = 4;
console.log(obj.subStr());
