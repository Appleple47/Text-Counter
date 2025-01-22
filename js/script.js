const btn = document.querySelector("#btn");
const text = document.querySelector("#text");
const count = document.querySelector("#count");
const Input = document.getElementById("Input");
const bar = document.querySelector("#bar"); 

text.placeholder = "Type your sentence here.";
Input.addEventListener("input", (event) => {
    const maxInput = Input.value;
    const length = text.value.length;
    const percentage = Math.min((length / maxInput) * 100, 100);
    bar.style.width = `${percentage}%`;
    console.log(`${maxInput}`)
    if (length >= maxInput) {
        count.classList.add("alert");
    } else {
        count.classList.remove("alert");
    }
});

text.addEventListener("input", (event) => {
    const maxInput = Input.value;
    const value = event.target.value;
    const length = text.value.length;
    count.textContent = length;
    console.log("Current value:", value);
    const percentage = Math.min((length / maxInput) * 100, 100);
    bar.style.width = `${percentage}%`;
    if (text.value === "") {
        text.placeholder = "Type your sentence here.";
    } else {
        text.placeholder = "";
    }
    if (length >= maxInput) {
        count.classList.add("alert");
    } else {
        count.classList.remove("alert");
    }
});

togglebtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    if(btn.textContent === "Turn on Light Mode"){
        btn.textContent = "Turn on Dark Mode"
    } else {
        btn.textContent = "Turn on Light Mode";
    }
});
deletebtn.addEventListener("click", () => {
    var result = window.confirm("The entered text will be deleted. This action cannot be undone.");
    if (result) {
        text.value = "";
        count.textContent = 0;
        percentage = 0;
        bar.style.width = `${percentage}%`;
        setTimeout(() => {
            window.alert("Your text has been successfully deleted.");
        }, 50);
    }
});

copybtn.addEventListener("click", () => {

    navigator.clipboard.writeText(text.value)
        .then(() => {
            alert("Text copied to clipboard!");
        })
        .catch((error) => {
            console.error("Failed to copy text: ", error);
        });
});