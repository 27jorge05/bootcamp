


function sockMerchant(n, ar) {

    let oddSocks = 0;
    let colorsAble = new Array(101);
    for (let i = 0; i < nroSocks; i++) {
        let currentColor = colores[i];
        if (colorsAble[currentColor] === undefined) colorsAble[currentColor] = 0;

        if (colorsAble[currentColor] % 2 === 1) oddSocks--;
        else oddSocks++;

        colorsAble[currentColor]++;
    }

    console.log("Number of odd socks:", oddSocks);

}

let nroSocks = parseInt(prompt("Write the number of socks"));

let colores = prompt("Write the socks' colors separated by space").split(" ");
// console.log(colores);
sockMerchant(nroSocks,colores);




