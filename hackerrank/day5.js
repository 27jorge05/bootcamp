function processData(my_array) {
//Write your code below this line.
    
    my_array.forEach(word =>  [...word].reverse().join("")===word&&console.log(word)   );

} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   _input = _input.split(' ') 
   processData(_input);
});