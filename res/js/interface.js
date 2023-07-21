let POINT_ID_COUNTER = 4

function addPoint() {
    for (let i = 0; i < document.getElementById("new-points").value; i++) {
        let tableRowElement = document.createElement("tr");
        tableRowElement.id = "point-" + POINT_ID_COUNTER + "-super";

        let xValueTableField = document.createElement("td");
        let xValueInputField = document.createElement("input");
        xValueInputField.id = "point-" + POINT_ID_COUNTER;
        xValueInputField.classList.add("x-value");
        xValueTableField.appendChild(xValueInputField);
        tableRowElement.appendChild(xValueTableField);

        let yValueTableField = document.createElement("td");
        let yValueInputField = document.createElement("input");
        yValueInputField.id = "point-" + POINT_ID_COUNTER;
        yValueInputField.classList.add("y-value");
        yValueTableField.appendChild(yValueInputField);
        tableRowElement.appendChild(yValueTableField);

        let buttonsTableField = document.createElement("td");
        let buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("one-central-object");
        buttonsContainer.classList.add("bigger-buttons");

        let activeButton = document.createElement("button");
        activeButton.classList.add("active");
        activeButton.id = "point-" + POINT_ID_COUNTER + "-active";
        activeButton.setAttribute("onclick", "toggleActive(this.id)");
        activeButton.innerHTML = "Active";
        buttonsContainer.appendChild(activeButton);

        let deleteButton = document.createElement("button");
        deleteButton.setAttribute("data-id-to-delete", "point-" + POINT_ID_COUNTER + "-super");
        deleteButton.id = "point-" + POINT_ID_COUNTER + "-delete";
        deleteButton.setAttribute("onclick", "removePoint(this.id)");
        deleteButton.innerHTML = "Delete";
        buttonsContainer.appendChild(deleteButton);

        buttonsTableField.appendChild(buttonsContainer);
        tableRowElement.appendChild(buttonsTableField);
        document.getElementById("points-table").appendChild(tableRowElement);
        POINT_ID_COUNTER += 1;
    }
}

function removePoint(id) {
    let deleteButton = document.getElementById(id);
    document.getElementById(deleteButton.getAttribute("data-id-to-delete")).remove();
}

function calculate() {
    let xValues = document.getElementsByClassName("x-value");
    let yValues = document.getElementsByClassName("y-value");
    let run = true;
    for (let i = 0; i < xValues.length; i++) {
        if (document.getElementById(xValues[i].id + "-active").classList.contains("active")) {
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
    }
    if (run === true) {
        let arrayOfPoints = [];
        for (let i = 0; i < xValues.length; i++) {
            if (document.getElementById(xValues[i].id + "-active").classList.contains("active")) {
                arrayOfPoints.push([parseFloat(xValues[i].value), parseFloat(yValues[i].value)]);
            }
        }
        let circleData = leastSquareCircle(arrayOfPoints);
        /*document.getElementById("centre-result").innerHTML = "Centre: (" + circleData["centre"]["x"] + ", " + circleData["centre"]["y"] + ")";
        document.getElementById("radius-result").innerHTML = "Radius: " + circleData["radius"];
        document.getElementById("results").style.display = "flex";*/

        // TODO - .toFixed(x) rounds to decimals

        document.getElementById("centre-x").value = circleData["centre"]["x"];
        document.getElementById("centre-y").value = circleData["centre"]["y"];
        document.getElementById("radius").value = circleData["radius"];
        document.getElementById("eqn1").value = circleData["centre"]["x"];
        document.getElementById("eqn2").value = circleData["centre"]["y"];
        document.getElementById("eqn3").value = circleData["radius"];

        let historyElement = document.createElement("div");
        historyElement.classList.add("history");
        let historyElementText = document.createElement("h2");
        historyElementText.innerHTML = "( x + " + circleData["centre"]["x"] + " ) <sup>2</sup> + ( y + " + circleData["centre"]["y"] + " ) <sup>2</sup> = " + circleData["radius"] + " <sup>2</sup>"
        historyElement.appendChild(historyElementText);
        document.getElementById("session-history").prepend(historyElement);
    }
}

function toggleActive(id) {
    let elementToToggle = document.getElementById(id);
    if (elementToToggle.classList.contains("active")) {
        elementToToggle.classList.remove("active");
        elementToToggle.classList.add("inactive");
        elementToToggle.innerHTML = "Inactive";
    } else {
        elementToToggle.classList.remove("inactive");
        elementToToggle.classList.add("active");
        elementToToggle.innerHTML = "Active";
    }
}