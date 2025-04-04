
const text = document.querySelector("#text");
const countchar = document.querySelector("#countchar");
const countword = document.querySelector("#countword");
const countsent = document.querySelector("#countsent");
const Input = document.getElementById("Input");
const bar = document.querySelector("#bar");
const selectBox = document.querySelector("#Type");
const tarType = document.querySelector("#TarType");

text.placeholder = "Type your sentence here.";                          // Set a default placeholder to prevent errors
tarType.textContent = "character";                                      // Set a default target type to prevent errors
let percentage = 0;                                                     // Initialize percentage of user's progress
const update = ()=> {                                                   // Function that renews count and progress bar
    const maxInput = Input.value;                                       // Set target count
    
    const spaces = text.value.match(/ /g);                              // Count characters other than spaces.
    const cntchar = text.value.length - (spaces ? spaces.length : 0);
    countchar.textContent = cntchar; 

    const words = text.value.trim().split(/\s+/);                       // Count words
    const cntword = words[0] === "" ? 0 : words.length;
    countword.textContent = cntword;
   
    const sentences = text.value.match(/[。\.!?！？]/g);                 // Count sentences by finding end of sentence
    const cntsent = sentences ? sentences.length : 0;
    countsent.textContent = cntsent;

    if(tarType.textContent === `character`){                            // Renew percentage and check target count
        percentage = Math.min((cntchar / maxInput) * 100, 100);
        if (cntchar >= maxInput) {
            countchar.classList.add("alert");
        }
    }else if(tarType.textContent === `word`){
        percentage = Math.min((cntword / maxInput) * 100, 100);
        if (cntword >= maxInput) {
            countword.classList.add("alert");
        }
    }else{ 
        percentage = Math.min((cntsent / maxInput) * 100, 100);
        if (cntsent >= maxInput) {
            countsent.classList.add("alert");
        }
    }
    
    if(cntchar < maxInput || tarType.textContent !== `character`) {     // Check if the target count exceeds the limit
        countchar.classList.remove("alert");
    }
    if(cntword < maxInput || tarType.textContent !== `word`) {
        countword.classList.remove("alert");
    }
    if(cntsent < maxInput || tarType.textContent !== `sentence`) {
        countsent.classList.remove("alert");
    }

    bar.style.width = `${percentage}%`;                                 // Renew the position of Running Man

    if (text.value === "") {                                            // Display "Type your sentence here." if the text box is empty 
        text.placeholder = "Type your sentence here.";
    } else {
        text.placeholder = "";
    }
}

[text, Input].forEach(element => {                                      // Activate update function when user types or changeas target count
    element.addEventListener("input", update);
});

selectBox.addEventListener("change", () => {                            // Initialize target count when user changes target type
    tarType.textContent = selectBox.value;
    if(tarType.textContent === `character`) {
        console.log(`char`);
        Input.value = 140;
    }
    if(tarType.textContent === `word`) {
        console.log(`word`);
        Input.value = 50;
    }
    else{
        console.log(`sent`);
        Input.value = 10;
    }
    update();
});
