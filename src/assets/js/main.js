

(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        console.log("remove trong spiner");
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
                console.log("remove");
            }
        }, 1);
    };
    spinner();

    $(document).ready(function () {
        $('#number-list li').removeClass('selected');
        // Đặt giá trị của input có ID là 'ress' thành rỗng

        // Thêm sự kiện click cho mỗi mục trong danh sách có id 'number-list'
        $('#number-list li').each(function () {
            $(this).on('click', function () {
                // Xóa class 'selected' khỏi tất cả các mục
                $('#number-list li').removeClass('selected');
                // Thêm class 'selected' vào mục đã nhấp
                $(this).addClass('selected');
                // Lấy giá trị từ thuộc tính data-value
                var selectedValue = $(this).attr('data-value');
                // Cập nhật giá trị đã chọn
                $('#selected-value').text(selectedValue);
                // In giá trị đã chọn vào thẻ span có ID là 'spaner'
                $('#spaner').text(selectedValue);
                // Cập nhật giá trị của input có ID là 'ress'
                $('#ress').val(selectedValue);
                $('#b').val(selectedValue);
              

                // Lưu giá trị đã chọn vào localStorage
                localStorage.setItem('selectedNumber', selectedValue);
            });
        });

        // Khôi phục giá trị đã lưu khi tải trang
        var savedValue = localStorage.getItem('selectedNumber');
        if (savedValue) {
            var selectedItem = $('#number-list li[data-value="' + savedValue + '"]');
            if (selectedItem.length > 0) {
                selectedItem.addClass('selected');
                $('#selected-value').text(savedValue);
                // In giá trị đã chọn vào thẻ span có ID là 'spaner'
                $('#spaner').text(savedValue);
                // Cập nhật giá trị của input có ID là 'ress'
                $('#ress').val(savedValue);
                $('#b').val(savedValue);
            }
        }
        $('#ress').val('price');
    });
    $(document).ready(function () {
        $('#number-list-2 li').removeClass('selected');
        // Đặt giá trị của input có ID là 'ress' thành rỗng

        // Thêm sự kiện click cho mỗi mục trong danh sách có id 'number-list'
        $('#number-list-2 li').each(function () {
            $(this).on('click', function () {
                // Xóa class 'selected' khỏi tất cả các mục
                $('#number-list-2 li').removeClass('selected');
                // Thêm class 'selected' vào mục đã nhấp
                $(this).addClass('selected');
                // Lấy giá trị từ thuộc tính data-value
                var selectedValue = $(this).attr('data-value2');
                // Cập nhật giá trị đã chọn
                $('#selected-value2').text(selectedValue);
                // In giá trị đã chọn vào thẻ span có ID là 'spaner'
                $('#spaner2').text(selectedValue);
                // Cập nhật giá trị của input có ID là 'ress'
                $('#resss').val(selectedValue);
                $('#c').val(selectedValue);
                // Lưu giá trị đã chọn vào localStorage
                localStorage.setItem('selectedNumber2', selectedValue);
            });
        });

        // Khôi phục giá trị đã lưu khi tải trang
        var savedValue = localStorage.getItem('selectedNumber2');
        if (savedValue) {
            var selectedItem = $('#number-list-2 li[data-value2="' + savedValue + '"]');
            if (selectedItem.length > 0) {
                selectedItem.addClass('selected2');
                $('#selected-value2').text(savedValue);
           
                // In giá trị đã chọn vào thẻ span có ID là 'spaner'

                // Cập nhật giá trị của input có ID là 'ress'
                $('#resss').val(savedValue);
                $('#c').val(savedValue);
            }
        }
        $('#resss').val('area');
        console.log("day area");
    });



    $(document).ready(function () {
        $(".slider").each(function () {
            var slider = $(this),
                handle,
                handleObj;

            slider.slider({
                range: true,
                values: [1800, 7800],
                min: 500,
                step: 5,
                minRange: 1000,
                max: 12000,
                create(event, ui) {
                    var values = slider.slider("values");
                    $(slider.data("value-0")).html(values[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, "&thinsp;"));
                    $(slider.data("value-1")).html(values[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, "&thinsp;"));
                    $(slider.data("range")).html((values[1] - values[0]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "&thinsp;"));
                },
                slide(event, ui) {
                    $(slider.data("value-0")).html(ui.values[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, "&thinsp;"));
                    $(slider.data("value-1")).html(ui.values[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, "&thinsp;"));
                    $(slider.data("range")).html((ui.values[1] - ui.values[0]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "&thinsp;"));

                    // Ghi giá trị của slider vào input có id là "inputt"
                    $("#ress").val(ui.values.join(" - "));
                    $("#b").val(ui.values.join(" - "));
                }
            });
        });
    });


    $(document).ready(function () {
        $(".slider1").each(function () {
            var slider = $(this),
                handle,
                handleObj;

            slider.slider({
                range: true,
                values: [30, 500],
                min: 30,
                step: 5,
                minRange: 10,
                max: 500,
                create(event, ui) {
                    var values = slider.slider("values");
                    $(slider.data("value-2")).html(values[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, "&thinsp;"));
                    $(slider.data("value-3")).html(values[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, "&thinsp;"));
                    $(slider.data("range")).html((values[1] - values[0]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "&thinsp;"));
                },
                slide(event, ui) {
                    $(slider.data("value-2")).html(ui.values[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, "&thinsp;"));
                    $(slider.data("value-3")).html(ui.values[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, "&thinsp;"));
                    $(slider.data("range")).html((ui.values[1] - ui.values[0]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "&thinsp;"));

                    // Ghi giá trị của slider vào input có id là "inputt"
                    $("#resss").val(ui.values.join(" - "));
                    $("#c").val(ui.values.join(" - "));
                }
            });
        });
    });


    $(document).ready(function () {
        var isPanelVisible = false;
    
        $('.toggleButton').click(function (event) {
            var mouseX = event.pageX;
            var mouseY = event.pageY;
    
            // Nếu panel đang mở, thì đóng nó
            if (isPanelVisible) {
                $('#panel').fadeOut();
                isPanelVisible = false;
            } else {
                // Nếu panel đang đóng, thì mở nó
                $('#panel').css({
                    top: mouseY - 240,
                    left: mouseX - 300
                }).fadeIn();
                isPanelVisible = true;
            }
    
            // Đảm bảo rằng các panel khác đều đóng khi mở một panel mới
            $('#panel1').fadeOut();
            $('#panel2').fadeOut();
        });
    });
    

    $(document).ready(function () {
        $('.toggleButton1').click(function (event) {
            // Lấy vị trí của chuột
            var mouseX = event.pageX;
            var mouseY = event.pageY;
    
            // Kiểm tra trạng thái hiện tại của #panel1
            var panel1 = $('#panel1');
            var isPanel1Visible = panel1.is(':visible');
    
            // Thiết lập vị trí và hiển thị hoặc ẩn #panel1
            if (isPanel1Visible) {
                panel1.fadeOut();
            } else {
                panel1.css({
                    top: mouseY - 240,
                    left: mouseX - 300
                }).fadeIn();
            }
    
            // Ẩn các panel khác
            $('#panel').fadeOut();
            $('#panel2').fadeOut();
        });
    });
    

    $(document).ready(function () {
        $('.toggleButton2').click(function (event) {
            var mouseX = event.pageX;
            var mouseY = event.pageY;
            var panel1 = $('#panel2');
            var isPanel1Visible = panel1.is(':visible');
    
            // Thiết lập vị trí và hiển thị hoặc ẩn #panel1
            if (isPanel1Visible) {
                panel1.fadeOut();
            } else {
                panel1.css({
                    top: mouseY - 240,
                    left: mouseX - 300
                }).fadeIn();
            }
    
            // Ẩn các panel khác
            $('#panel1').fadeOut();
            $('#panel').fadeOut();
        });
    });
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.nav-bar').addClass('sticky-top');
        } else {
            $('.nav-bar').removeClass('sticky-top');
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });
    $(document).ready(function () {
        let currentBanner = 1;
        setInterval(function () {
            if (currentBanner === 1) {
                $('.banner1').css('opacity', 0).css('z-index', 1);
                $('.banner2').css('opacity', 1).css('z-index', 2);
                currentBanner = 2;
            } else {
                $('.banner1').css('opacity', 1).css('z-index', 2);
                $('.banner2').css('opacity', 0).css('z-index', 1);
                currentBanner = 1;
            }
        }, 3000); // 3 giây để đổi hình
    });

    // Header carousel

    // ham inkq iput tinh tp
    $(document).ready(function () {
        $('#panel select').change(function () {
            // Kiểm tra xem tất cả các select box đã được chọn chưa
            if ($('#provinces').val() && $('#districts').val() && $('#wards').val()) {
                // Lấy giá trị của các select box đã chọn
                var provinceName = $('#provinces option:selected').text();
            

                // Tạo địa chỉ từ các giá trị đã chọn
                var address = provinceName

                // Gán địa chỉ vào input có id là "ress"
                $('#ress1').val(address);
                $('#a').val(address);
            }
        });
    });
    $(document).ready(function() {
        console.log("Document is ready");
    
        // Sử dụng sự kiện ủy quyền
        $(document).on('click', '.change_main_image', function() {
          console.log("Thumbnail clicked");
    
          // Lấy đường dẫn của ảnh được click
          var newImageSrc = $(this).attr('src');
          console.log("New image source: " + newImageSrc);
    
          // Thay đổi đường dẫn của ảnh chính
          $('#main-image').fadeOut(300, function() {
            $(this).attr('src', newImageSrc).fadeIn(300);
          });
        });
      });
    
    

    // Testimonials carousel
})(jQuery);

