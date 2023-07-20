// method: https://lucidar.me/en/mathematics/least-squares-fitting-of-circle/
// method: https://www.youtube.com/watch?v=4J30jzc3DD8

/**
 * transposes an array
 * @param {array} matrix
 * @returns {array}
 */
const transpose = (matrix) => {
    return matrix[0].map((_, columnIndex) => matrix.map(row => row[columnIndex]))
}


function leastSquareCircle (arrayOfPoints) {

    // empty arrays
    let arrayA = [];
    let arrayB = [];

    // filling arrays
    for (let i = 0; i < arrayOfPoints.length; i++) {

        // matrix A rows in format x, y, 1
        arrayA.push([arrayOfPoints[i][0], arrayOfPoints[i][1], 1]);

        // matrix B rows in format x ** 2 + y ** 2
        arrayB.push([arrayOfPoints[i][0] ** 2 + arrayOfPoints[i][1] ** 2])

    }

    console.log(arrayA);
    console.log(arrayB);

    // calculating A+

    let aPlus = math.multiply(
        transpose(arrayA),
        numeric.inv(
            math.multiply(
                arrayA,
                transpose(arrayA)
            )
        )
    );

    console.log(aPlus);

    let arrayX = math.multiply(
        aPlus,
        arrayB
    )

    let a = arrayX[0],
        b = arrayX[1],
        c = arrayX[2];

    let circleData = {
        "centre": {
            "x": a/2,
            "y": b/2
        },
        "radius": (math.sqrt(4 * c + a ** 2 + b ** 2)) / 2
    }

    return circleData;
}