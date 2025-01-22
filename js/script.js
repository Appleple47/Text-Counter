const btn = document.querySelector("#btn");
const text = document.querySelector("#text");
const count = document.querySelector("#count");
const Input = document.getElementById("Input");
const bar = document.querySelector("#bar"); 

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
    if (length >= maxInput) {
        count.classList.add("alert");
    } else {
        count.classList.remove("alert");
    }
    
});

modebtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    if(btn.textContent === "Turn on Right Mode"){
        btn.textContent = "Turn on Dark Mode"
    } else {
        btn.textContent = "Turn on Right Mode";
    }
});
dltbtn.addEventListener("click", () => {
    var result = window.confirm("入力した文章を削除します. 元に戻す事はできません. ");
    if (result) {
        text.value = ""; // テキストを削除
        count.textContent = 0;
        percentage = 0;
        bar.style.width = `${percentage}%`;
        setTimeout(() => {
            window.alert("文章を削除しました."); // 少し遅れてアラートを表示
        }, 50); // 0.05秒後にアラートを表示
    }
});