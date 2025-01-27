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
tarType.textContent = "character";
// Function that renew count and progress bar
const update = ()=> {
    // Count characters other than spaces.
    const maxInput = Input.value;
    const spaces = text.value.match(/ /g);
    const cntchar = text.value.length - (spaces ? spaces.length : 0);
    countchar.textContent = cntchar; 
    // Count words
    const words = text.value.trim().split(/\s+/);
    const cntword = words[0] === "" ? 0 : words.length;
    countword.textContent = cntword;
    // Count sentences by finding end of sentence
    const sentences = text.value.match(/[。\.!?！？]/g);
    const cntsent = sentences ? sentences.length : 0;
    countsent.textContent = cntsent;

    let percentage = 0; // Init percentage

    // Renew percentage and check target count
    if(tarType.textContent === `character`){
        percentage = Math.min((cntchar / maxInput) * 100, 100);
        if (cntchar >= maxInput) {
            countchar.classList.add("alert");
        }
    }else if(tarType.textContent === `word`){
        percentage = Math.min((cntword / maxInput) * 100, 100);
        if (cntword >= maxInput) {
            countword.classList.add("alert");
        }
    }else if(tarType.textContent === `sentence`){ 
        percentage = Math.min((cntsent / maxInput) * 100, 100);
        if (cntsent >= maxInput) {
            countsent.classList.add("alert");
        }
    }
    // Check if the target count exceeds the limit
    if(cntchar < maxInput || tarType.textContent !== `character`) {
        countchar.classList.remove("alert");
    }
    if(cntword < maxInput || tarType.textContent !== `word`) {
        countword.classList.remove("alert");
    }
    if(cntsent < maxInput || tarType.textContent !== `sentence`) {
        countsent.classList.remove("alert");
    }
    bar.style.width = `${percentage}%`;
    if (text.value === "") {
        text.placeholder = "Type your sentence here.";
    } else {
        text.placeholder = "";
    }
}

// Activate update function when user types
text.addEventListener("input", (event) => {
    update();
});
// Activate update function when change target count
Input.addEventListener("input", (event) => {
    update();
});
// Init target count when user change target type
selectBox.addEventListener("change", () => {
    tarType.textContent = selectBox.value;
    if(tarType.textContent === `character`) {
        console.log(`char`);
        Input.value = 140;
    }
    if(tarType.textContent === `word`) {
        console.log(`word`);
        Input.value = 50;
    }
    if(tarType.textContent === `sentence`) {
        console.log(`sent`);
        Input.value = 10;
    }
    update();
});

// Copy text to user's clipboard when user press copy button
copybtn.addEventListener("click", () => {
    navigator.clipboard.writeText(text.value)
    .then(() => {
        alert("Text copied to clipboard!");
    })
    .catch((error) => {
        console.error("Failed to copy text: ", error);
    });
});
// Delete text and init some value
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
// Switch dark and light mode
togglebtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    if(togglebtn.textContent === "Turn on Light Mode"){
        togglebtn.textContent = "Turn on Dark Mode"
    } else {
        togglebtn.textContent = "Turn on Light Mode";
    }
});