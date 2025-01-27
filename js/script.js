const btn = document.querySelector("#btn");
const text = document.querySelector("#text");
const countchar = document.querySelector("#countchar");
const countword = document.querySelector("#countword");
const countsent = document.querySelector("#countsent");
const Input = document.getElementById("Input");
const bar = document.querySelector("#bar");
const selectBox = document.querySelector("#Type");
const tarType = document.querySelector("#TarType");

text.placeholder = "Type your sentence here.";
Input.addEventListener("input", (event) => {
    const maxInput = Input.value;
    const charlen = text.value.length;
    const percentage = Math.min((charlen / maxInput) * 100, 100);
    if (charlen >= maxInput) {
        countchar.classList.add("alert");
    } else {
        countchar.classList.remove("alert");
    }

    bar.style.width = `${percentage}%`;
    console.log(`${maxInput}`)   
    const spaces = text.value.match(/ /g);
    countchar.textContent = charlen - (spaces ? spaces.length : 0);
});

text.addEventListener("input", (event) => {
    const maxInput = Input.value;
    const value = event.target.value;
    const charlen = text.value.length;
    const spaces = text.value.match(/ /g);
    countchar.textContent = charlen - (spaces ? spaces.length : 0);
    const words = text.value.trim().split(/\s+/);
    const wordCount = words[0] === "" ? 0 : words.length;
    const sentences = text.value.match(/[。\.!?！？]/g);
    countsent.textContent = sentences ? sentences.length : 0;
    countword.textContent = wordCount;
    console.log(`countword is ${countword}`);
    console.log("Current value:", value);
    const percentage = Math.min((charlen / maxInput) * 100, 100);
    bar.style.width = `${percentage}%`;
    console.log(`countsent is ${countsent}`);
    console.log(`spaces is ${spaces}`);
    if (text.value === "") {
        text.placeholder = "Type your sentence here.";
    } else {
        text.placeholder = "";
    }
    if (charlen >= maxInput) {
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

selectBox.addEventListener("change", () => {
    tarType.textContent = selectBox.value;
    if(tarType.textContent === `character(s)`) {
        console.log(`char`);
        Input.value = 140;
    }
    if(tarType.textContent === `word(s)`) {
        console.log(`word`);
        Input.value = 50;
    }
    if(tarType.textContent === `sentence(s)`) {
        console.log(`sent`);
        Input.value = 10;
    }
});