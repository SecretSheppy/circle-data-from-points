function addPoint() {
    let element = document.getElementById("default-point");
    let clonedElement = element.cloneNode(true);
    clonedElement.id="";
    let valueElements = clonedElement.getElementsByClassName("value-field");
    valueElements[0].value = null;
    valueElements[1].value = null;
    document.getElementById("points").appendChild(clonedElement);
}

function removePoint() {
    let points = document.getElementById("points");
    let element = points.lastChild;
    if (element.id !== "default-point") {
        points.removeChild(points.lastChild);
    }
}

function calculate() {
    let xValues = document.getElementsByClassName("x-value");
    let yValues = document.getElementsByClassName("y-value");
    let run = true;
    for (let i = 0; i < xValues.length; i++) {
        if (xValues[i].value === "") {
            run = false;
            xValues[i].style.backgroundColor = "red";
        } else {
            xValues[i].style.backgroundColor = "#fff";
        }
        if (yValues[i].value === "") {
            run = false;
            yValues[i].style.backgroundColor = "red";
        } else {
            yValues[i].style.backgroundColor = "#fff";
        }
    }
    if (run === true) {
        let arrayOfPoints = [];
        for (let i = 0; i < xValues.length; i++) {
            arrayOfPoints.push([parseInt(xValues[i].value), parseInt(yValues[i].value)]);
        }
        let circleData = leastSquareCircle(arrayOfPoints);
        document.getElementById("centre-result").innerHTML = "Centre: (" + circleData["centre"]["x"] + ", " + circleData["centre"]["y"] + ")";
        document.getElementById("radius-result").innerHTML = "Radius: " + circleData["radius"];
        document.getElementById("results").style.display = "flex";
    }
}

function closeResults() {
    document.getElementById("results").style.display = "none";
}