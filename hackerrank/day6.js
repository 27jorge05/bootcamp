function processData(input) {
    //Enter your code here
    let inputs=input.split("\n");
    let [n,k]=inputs[0].split(" ");
    // console.log(typeof [inputs[1].split(" ")]);
    let array=inputs[1].split(" ").map(Number).sort((a,b)=> a-b);
    let acum=0;
    let cant=0;
    array.forEach(num => acum+num<=k && (acum=acum+num,cant++));
    // console.log(array);
    console.log(cant);
} 
function processData2(input) {
    let [a,b]=input.split`\n`, k=a.split` `[1], acum=0, size=0,array=b.split` `.map(Number).sort((a,b)=> a-b).forEach(num=>acum+num<=k &&(acum=acum+num,size++))
    console.log(size);
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData2(_input);
});
