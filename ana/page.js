// Adımlar
const a = document.getElementById("a");
// Banner
const b = document.getElementById("b");
// Banner, açiklama
const ba = document.getElementById("ba");

//Dropdown
function showDropdown() {
  document.getElementById("ld-dropdown-content").classList.toggle("show");
}
function setLanguageTurkish() {
  document.getElementById("ld-dropdown-button").innerHTML = "Türkçe";
}
function setLanguageEnglish() {
  document.getElementById("ld-dropdown-button").innerHTML = "English";
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".ld-dropbtn")) {
    var dropdowns = document.getElementsByClassName("ld-dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
