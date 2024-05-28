
function previewImage(file, previewId) {
    const preview = document.getElementById(previewId);
    const reader = new FileReader();
    preview.innerHTML = '';
    reader.onloadend = function () {
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
}


document.addEventListener("DOMContentLoaded", function() {
    var tabContainer = document.querySelector(".tabs");
    
    tabContainer.addEventListener("click", function(event) {
        if (event.target.classList.contains("tab")) {
            // Remove 'active' class from all tabs
            var tabs = document.querySelectorAll(".tab");
            tabs.forEach(function(tab) {
                tab.classList.remove("active");
            });
            // Add 'active' class to the clicked tab
            event.target.classList.add("active");
        }
    });
});






