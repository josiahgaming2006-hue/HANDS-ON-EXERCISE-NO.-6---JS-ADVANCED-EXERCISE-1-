const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btnHighest = document.getElementById("btnHighest");
const btnLowest = document.getElementById("btnLowest");
const btnSortAsc = document.getElementById("btnSortAsc");
const btnSortDesc = document.getElementById("btnSortDesc");
const txtNum = document.getElementById("txtNum");
const tbl = document.getElementById("tblNumbers");

let numbersArr = [];
let total = 0;


function insertNumber() {

    const value = txtNum.value.trim();
    const regex = /^[0-9]+$/;

    if (!regex.test(value)) {
        alert("Please input a valid positive number");
        txtNum.value = "";
        return;
    }

    numbersArr.push(parseInt(value));
    txtNum.value = "";
    iterateNumbers();
}


btn1.addEventListener("click", insertNumber);

txtNum.addEventListener("keydown", function (e) {
    if (e.key === "Enter") insertNumber();
});

btn2.addEventListener("click", () => {
    txtNum.value = "";
});

btn3.addEventListener("click", () => {
    numbersArr = [];
    total = 0;
    tbl.innerHTML = "";
    hideResultButtons();
});

btnSortAsc.addEventListener("click", () => {
    numbersArr.sort((a, b) => a - b);
    iterateNumbers();
});

btnSortDesc.addEventListener("click", () => {
    numbersArr.sort((a, b) => b - a);
    iterateNumbers();
});


btn4.addEventListener("click", () => {

    removeExtraRows();

    const tr = document.createElement("tr");
    tr.id = "totalRow";

    const tdLabel = document.createElement("td");
    tdLabel.innerHTML = "<b>TOTAL</b>";

    const tdValue = document.createElement("td");
    tdValue.innerHTML = "<u>" + total + "</u>";

    tr.appendChild(tdLabel);
    tr.appendChild(tdValue);
    tbl.appendChild(tr);
});


btnHighest.addEventListener("click", () => {

    removeExtraRows();

    const highest = Math.max(...numbersArr);

    const tr = document.createElement("tr");
    tr.id = "highestRow";

    const tdLabel = document.createElement("td");
    tdLabel.innerHTML = "<b>HIGHEST</b>";

    const tdValue = document.createElement("td");
    tdValue.innerHTML = "<u>" + highest + "</u>";

    tr.appendChild(tdLabel);
    tr.appendChild(tdValue);
    tbl.appendChild(tr);
});


btnLowest.addEventListener("click", () => {

    removeExtraRows();

    const lowest = Math.min(...numbersArr);

    const tr = document.createElement("tr");
    tr.id = "lowestRow";

    const tdLabel = document.createElement("td");
    tdLabel.innerHTML = "<b>LOWEST</b>";

    const tdValue = document.createElement("td");
    tdValue.innerHTML = "<u>" + lowest + "</u>";

    tr.appendChild(tdLabel);
    tr.appendChild(tdValue);
    tbl.appendChild(tr);
});


function deleteNumber(index) {
    numbersArr.splice(index, 1);
    iterateNumbers();
}


function editNumber(index) {

    const newValue = prompt("Enter new number:", numbersArr[index]);
    const regex = /^[0-9]+$/;

    if (newValue === null) return;

    if (!regex.test(newValue)) {
        alert("Invalid number!");
        return;
    }

    numbersArr[index] = parseInt(newValue);
    iterateNumbers();
}


function iterateNumbers() {

    tbl.innerHTML = "";
    total = 0;

    if (numbersArr.length === 0) {
        hideResultButtons();
        return;
    }

    for (let i = 0; i < numbersArr.length; i++) {

        total += numbersArr[i];

        const tr = document.createElement("tr");

        const tdNumber = document.createElement("td");
        tdNumber.style.width = "70px";
        tdNumber.textContent = numbersArr[i];

        const tdType = document.createElement("td");
        tdType.style.width = "70px";

        if (numbersArr[i] % 2 === 0) {
            tdType.textContent = "EVEN";
            tdType.style.color = "green";
        } else {
            tdType.textContent = "ODD";
            tdType.style.color = "blue";
        }

        const tdDelete = document.createElement("td");
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Remove";
        deleteBtn.onclick = () => deleteNumber(i);
        tdDelete.appendChild(deleteBtn);

        const tdEdit = document.createElement("td");
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editNumber(i);
        tdEdit.appendChild(editBtn);

        tr.appendChild(tdNumber);
        tr.appendChild(tdType);
        tr.appendChild(tdDelete);
        tr.appendChild(tdEdit);

        tbl.appendChild(tr);
    }

    showResultButtons();
}


function showResultButtons() {
    btn4.style.display = "inline";
    btnHighest.style.display = "inline";
    btnLowest.style.display = "inline";
}

function hideResultButtons() {
    btn4.style.display = "none";
    btnHighest.style.display = "none";
    btnLowest.style.display = "none";
}

function removeExtraRows() {
    const totalRow = document.getElementById("totalRow");
    const highestRow = document.getElementById("highestRow");
    const lowestRow = document.getElementById("lowestRow");

    if (totalRow) totalRow.remove();
    if (highestRow) highestRow.remove();
    if (lowestRow) lowestRow.remove();
}