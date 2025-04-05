const btn = document.querySelector("#btn");

copybtn.addEventListener("click", () => {                               // Copy text to user's clipboard when user press copy button
    navigator.clipboard.writeText(text.value)
    .then(() => {
        alert("Text copied to clipboard!");
    })
    .catch((error) => {
        console.error("Failed to copy text: ", error);
    });
});

pastebtn.addEventListener("click", () => {                              // Paste text to the textbox from user's clipboard when user press paste button
    navigator.clipboard.readText()
        .then((clipboardText) => {
            const startPos = text.selectionStart;
            const endPos = text.selectionEnd;
            const currentText = text.value;
            text.value = currentText.slice(0, startPos) + clipboardText + currentText.slice(endPos);
            text.selectionStart = text.selectionEnd = startPos + clipboardText.length;
            update();
        })
        .catch((error) => {
            console.error("Failed to paste clipboard content:", error);
        });
});

deletebtn.addEventListener("click", () => {                             // Delete text and init some value
    try{
        const result = window.confirm("The entered text will be deleted. This action cannot be undone.");
        if (result) {
            text.value = "";
            update();
            setTimeout(() => {
                window.alert("Your text has been successfully deleted.");
            }, 80);
        }
    } catch (error){
        console.error("Error:", error);
        window.alert("An error occurred: " + error.message);
    }
});

togglebtn.addEventListener("click", () => {                             // Switch light/dark mode
    document.body.classList.toggle("dark-theme");
    if(togglebtn.textContent === "Turn on Light Mode"){
        togglebtn.textContent = "Turn on Dark Mode"
    } else {
        togglebtn.textContent = "Turn on Light Mode";
    }
});
