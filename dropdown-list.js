document.addEventListener("DOMContentLoaded", function() {
    const toggle = document.querySelector(".dropdown-toggle");
    const dropdown = document.querySelector(".dropdown-list");
    const arrow = document.getElementById("arrow");

    toggle.addEventListener("click", function(e) {
        e.preventDefault(); // impede redirecionamento
        dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";

        // troca o ícone da seta
        if (arrow.classList.contains("bi-arrow-down-circle")) {
            arrow.classList.remove("bi-arrow-down-circle");
            arrow.classList.add("bi-arrow-up-circle");
        } else {
            arrow.classList.remove("bi-arrow-up-circle");
            arrow.classList.add("bi-arrow-down-circle");
        }
    });
});