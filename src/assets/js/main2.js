
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
    
// Function mở tab
// js cũ
window.addEventListener("load", function() {
    // Ẩn tất cả các tabcontent ngoại trừ tab "Đã duyệt"
    var tabContents = document.getElementsByClassName("tabcontent");
    for (var i = 0; i < tabContents.length; i++) {
        if (tabContents[i].id !== "approved") {
            tabContents[i].style.display = "none";
        }
    }
    
    // Thêm lớp active cho tab "Đã duyệt"
    var approvedTab = document.querySelector("button.tablink[data-tab='approved']");
    if (approvedTab) {
        approvedTab.classList.add("active");
    }
});

function openTab(tabName) {
    // Ẩn tất cả các tabcontent
    var tabContents = document.getElementsByClassName("tabcontent");
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }
    
    // Loại bỏ lớp active khỏi tất cả các tablink
    var tabLinks = document.getElementsByClassName("tablink");
    for (var i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
    }
    
    // Hiển thị nội dung của tab được chọn
    document.getElementById(tabName).style.display = "block";
    
    // Thêm lớp active cho tab được chọn
    event.currentTarget.classList.add("active");
}














