var _input = "";
var _currentline = 0;
var _lines = "";

process.stdin.on("data", function (input) {
  _input += input;
});
process.stdin.on("end", function () {
  _lines = _input.split("\n");

  main();
});
function readLine() {
  return _lines[_currentline++];
}
function main() {
  let line;
  let maxClock = 0;
  let hopeOldArray;
  let hopeNewArray;
  let ft = true;
  while ((line = readLine())) {
    let numbers = line.split(" ").map(Number);
    hopeOldArray = hopeNewArray;
    ft && ((hopeOldArray = new Array(numbers.length)), (ft = false));
    hopeNewArray = new Array(numbers.length);
    // console.log("numbers: ",numbers, typeof numbers[0]);

    for (let i = 1; i < numbers.length - 1; i++) {
      if (numbers[i - 1] != 0 && numbers[i + 1] != 0 && numbers[i] != 0)
        hopeNewArray[i] = [
          2,
          numbers[i] + numbers[i + 1] + numbers[i -1] 
        ];
      
      if (
        hopeOldArray[i] != undefined &&
        numbers[i] != 0 &&
        hopeOldArray[i][0] === 2
    )
    hopeNewArray[i] = [3, hopeOldArray[i][1] + numbers[i]];
    
      if (
        hopeOldArray[i] != undefined &&
        numbers[i - 1] != 0 &&
        numbers[i] != 0 &&
        numbers[i + 1] != 0 &&
        hopeOldArray[i][0] === 3
      )
        hopeOldArray[i][1] + numbers[i] + numbers[i - 1] + numbers[i + 1] >
          maxClock &&
          (maxClock =
            hopeOldArray[i][1] + numbers[i] + numbers[i - 1] + numbers[i + 1]);
    }
    // console.log(hopeNewArray)
    // console.log(` fin array ${line}  ${maxClock}`);
  }
  console.log(maxClock);
}
