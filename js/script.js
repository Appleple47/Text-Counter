const btn = document.querySelector("#btn");
const text = document.querySelector("#text");
const count = document.querySelector("#count");
const Input = document.getElementById("Input");
const bar = document.querySelector("#bar"); 

text.placeholder = "Type your sentence here.";
fetch('/env.json')
    .then(response => response.json())
    .then(env => {
        const GA_TRACKING_ID = env.GA_TRACKING_ID;

        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', GA_TRACKING_ID);
    })
    .catch(error => console.error('Error loading environment variables:', error));
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