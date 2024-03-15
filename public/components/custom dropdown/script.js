const body = document.querySelector("body");
const optionMenu = document.querySelector(".select-menu"),
    selectBtn = optionMenu.querySelector(".select-btn"),
    options = optionMenu.querySelectorAll(".option"),
    sBtn_text = optionMenu.querySelector(".sBtn-text");

selectBtn.addEventListener("click", () => optionMenu.classList.toggle("active"));

options.forEach(option => {
    option.addEventListener("click", () => {
        let selectedOption = option.querySelector(".option-text").innerText;
        sBtn_text.innerText = selectedOption;
        optionMenu.classList.remove("active");

        // Change font of the body based on the selected option
        switch (selectedOption) {
            case "Inter":
                body.style.fontFamily = "Inter";
                body.style.fontWeight = "400"
                break;
            case "Inconsolata":
                body.style.fontFamily = "Inconsolata";
                body.style.fontWeight = "400"
                break;
            case "Loba":
                body.style.fontFamily = "Loba";
                body.style.fontWeight = "400"
                break;
            default:
                body.style.fontFamily = "Inter";
                body.style.fontWeight = "400" // Default font
        }
    })
})