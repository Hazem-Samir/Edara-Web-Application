export function incorrect(text) {
    let container = document.querySelector(".incorrect");
    let div = document.createElement("div");
    div.className = "alert alert-warning";
    div.role = "alert";
    div.innerText = text;
    if (
        container.hasChildNodes()
    ) {
        container.removeChild(container.childNodes[0]);
        container.appendChild(div);
    }
    else container.appendChild(div);
}

export function RequestStatusColor() {
    let Status = document.querySelectorAll("table tbody tr td:last-child");


    Status.forEach((e) => {

        if (e.innerText === "Accepted")
            e.style.color = "green";
        else if (e.innerText === "Declined") {
            e.style.color = "red";
        }
        else if (e.innerText === "Pending") {
            e.style.color = "#a5a500";
        }

    })
}


export function showform() {
    let warehouse = document.querySelector('#form');
    warehouse.style.display = "block";
}

export function closeform() {
    let warehouse = document.querySelector('#form');
    warehouse.style.display = "none";
}

export function updateform() {
    let warehouse = document.querySelector('#updateform');
    warehouse.style.display = "block";
}


export function closeupdateform() {
    let warehouse = document.querySelector('#updateform');
    warehouse.style.display = "none";
}