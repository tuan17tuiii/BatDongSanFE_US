
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

