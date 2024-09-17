function openPopup(popName) {
    document.getElementsByClassName(popName)[0].classList.add("active");
}

function closePopup(name) {
    document.getElementsByClassName(name)[0].classList.remove("active");
}
