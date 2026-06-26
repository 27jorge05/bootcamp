

function processData(myArray) {
    myArray.sort((a,b)=>b-a);
    let unique =[...new Set(myArray)];
    console.log(unique[1]);
    
}

// tail starts here
process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input.split('\n')[1].split(' ').map(Number));
});
















function nameday(number){

}
function findDay(myDate) {
    // Return day for date myDate(MM/DD/YYYY)
    // Note that myDate contains the date in string format
    const d=new Date(myDate);
    let day = d.toLocaleDateString("es",{weekday:"short", year:"numeric",month:"long",day:"numeric"});
    console.log(day);
    
    // console.log(nameday(d.getDay()));
}

// tail starts here
process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
    var dates = _input.split('\n');
    // console.log(dates);

    for (var i = 0; i < dates.length - 1; i++) {
        findDay(dates[i]);
    }
});
