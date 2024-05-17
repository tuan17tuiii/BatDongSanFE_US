$(document).ready(function(){
    // Hàm này sẽ chạy khi trang web được tải xong
    calculateRelativePosition("panel", "ress1");
});

function calculateRelativePosition(childElementId, parentElementId) {
    var childElement = $("#" + childElementId);
    var parentElement = $("#" + parentElementId);

    // Kiểm tra xem cả phần tử con và phần tử cha có tồn tại không
    if (childElement.length && parentElement.length) {
        // Lấy thông tin vị trí của phần tử cha
        var parentPosition = parentElement.offset();

        // Lấy thông tin vị trí của phần tử con
        var childPosition = childElement.offset();

        // Tính toán vị trí mới của phần tử con dựa trên vị trí của phần tử cha
        var newTop = parentPosition.top - 220;
        var newLeft =parentPosition.left-10 ;

        // Cập nhật vị trí mới của phần tử con
        childElement.css({top: newTop + "px", left: newLeft + "px"});
    } else {
        console.log("Phần tử con hoặc phần tử cha không tồn tại.");
    }
}
$(document).ready(function(){
    // Hàm này sẽ chạy khi trang web được tải xong
    calculateRelativePosition("panel1", "ress");
});

function calculateRelativePosition(childElementId, parentElementId) {
    var childElement = $("#" + childElementId);
    var parentElement = $("#" + parentElementId);

    // Kiểm tra xem cả phần tử con và phần tử cha có tồn tại không
    if (childElement.length && parentElement.length) {
        // Lấy thông tin vị trí của phần tử cha
        var parentPosition = parentElement.offset();

        // Lấy thông tin vị trí của phần tử con
        var childPosition = childElement.offset();

        // Tính toán vị trí mới của phần tử con dựa trên vị trí của phần tử cha
        var newTop = parentPosition.top - 220;
        var newLeft =parentPosition.left-10 ;

        // Cập nhật vị trí mới của phần tử con
        childElement.css({top: newTop + "px", left: newLeft + "px"});
    } else {
        console.log("Phần tử con hoặc phần tử cha không tồn tại.");
    }
}
$(document).ready(function(){
    // Hàm này sẽ chạy khi trang web được tải xong
    calculateRelativePosition("panel2", "resss");
});

function calculateRelativePosition(childElementId, parentElementId) {
    var childElement = $("#" + childElementId);
    var parentElement = $("#" + parentElementId);

    // Kiểm tra xem cả phần tử con và phần tử cha có tồn tại không
    if (childElement.length && parentElement.length) {
        // Lấy thông tin vị trí của phần tử cha
        var parentPosition = parentElement.offset();

        // Lấy thông tin vị trí của phần tử con
        var childPosition = childElement.offset();

        // Tính toán vị trí mới của phần tử con dựa trên vị trí của phần tử cha
        var newTop = parentPosition.top-220;
        var newLeft =parentPosition.left-10 ;
        // Cập nhật vị trí mới của phần tử con
        childElement.css({top: newTop + "px", left: newLeft + "px"});
        console.log(newTop + "px",newLeft + "px");
    } else {
        console.log("Phần tử con hoặc phần tử cha không tồn tại.");
    }
}
