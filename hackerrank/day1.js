
function processData(input) {
    var marks = marks(input);
    var MARKS_TEST = marks;
    //Head Ends Here
//Do not declare variable marks.
//Write your code below this line.
 if (marks>90)console.log("AA");
    else if (marks>80)console.log("AB");
    else if (marks>70)console.log("BB");
    else if (marks>60)console.log("BC");
    else if (marks>50)console.log("CC");
    else if (marks>40)console.log("CD");
    else if (marks>30)console.log("DD");
    else console.log("FF");
//Tail Begins
    try {
        if(marks != MARKS_TEST){
            console.log("It seems you have edited the value of variable 'marks'. Please try again.");
        } 
    } 
    catch(err) {
        console.log(err.message);
    }
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});