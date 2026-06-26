process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;
var heightTree = new Array(61);
process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();    
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////
function generatorSequence (){
    heightTree[0]=1;
    for (let i =1;i<61;i+=2) heightTree[i]=2*heightTree[i-1],heightTree[i+1]=heightTree[i]+1 ;
    

}
function main() {
    var t = parseInt(readLine());
    for(var a0 = 0; a0 < t; a0++){
        var n = parseInt(readLine());
        // generatorSequence();
        // console.log(heightTree[n]);
        n=(1<<(Math.floor((n+1)/2)+1))-1-n%2;
        // n=n;
        console.log(n);
        
    }

}
