function processData(some_array) {

// write the correct arrow function here
// var my_function = array.map(num=>num% 2===0?--num:++num);
var my_function = array => {array2=array.map(num=>num%2===0?num+1:num-1);
let str = "[ " + array2.join(", ") + " ]";
return str
}


try {
        var random_variable = new my_function;
        console.log("Warning! Please create an arrow function. Ensure that you are creating an arrow function (=>) and not a function.")
    } catch(err) {
        //console.log("You have done it correctly.")
    }
    
    console.log(my_function(some_array));
 

}
process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   _input = _input.split(' ')
   for(var i = 0; i < _input.length; i++){
         _input[i] = Number(_input[i]);
   }
   
   processData(_input);
});

// console.log([1,2,3,4,5,7,8,9,1,0,5,4789,1,6]);