const btn = document.querySelector("#btn");
const text = document.querySelector("#text");
const countchar = document.querySelector("#countchar");
const countword = document.querySelector("#countword");
const countsent = document.querySelector("#countsent");
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
        countchar.classList.add("alert");
    } else {
        countchar.classList.remove("alert");
    }
    const spaces = text.value.match(/ /g);
    countchar.textContent = length - (spaces ? spaces.length : 0);
});

text.addEventListener("input", (event) => {
    const maxInput = Input.value;
    const value = event.target.value;
    const length = text.value.length;
    const spaces = text.value.match(/ /g);
    countchar.textContent = length - (spaces ? spaces.length : 0);
    const words = text.value.trim().split(/\s+/);
    const wordCount = words[0] === "" ? 0 : words.length;
    const sentences = text.value.match(/[。\.!?！？]/g);
    countsent.textContent = sentences ? sentences.length : 0;
    countword.textContent = wordCount;
    console.log(`countword is ${countword}`);
    console.log("Current value:", value);
    const percentage = Math.min((length / maxInput) * 100, 100);
    bar.style.width = `${percentage}%`;
    console.log(`countsent is ${countsent}`);
    console.log(`spaces is ${spaces}`);
    if (text.value === "") {
        text.placeholder = "Type your sentence here.";
    } else {
        text.placeholder = "";
    }
    if (length >= maxInput) {
        countchar.classList.add("alert");
    } else {
        countchar.classList.remove("alert");
    }
});

togglebtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    if(togglebtn.textContent === "Turn on Light Mode"){
        togglebtn.textContent = "Turn on Dark Mode"
    } else {
        togglebtn.textContent = "Turn on Light Mode";
    }
});
deletebtn.addEventListener("click", () => {
    var result = window.confirm("The entered text will be deleted. This action cannot be undone.");
    if (result) {
        text.value = "";
        countchar.textContent = 0;
        countword.textContent = 0;
        countsent.textContent = 0;
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