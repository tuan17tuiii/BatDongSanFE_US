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

    $(document).ready(function() {
        $('#number-list li').removeClass('selected');
    // Đặt giá trị của input có ID là 'ress' thành rỗng
   
        // Thêm sự kiện click cho mỗi mục trong danh sách có id 'number-list'
        $('#number-list li').each(function() {
            $(this).on('click', function() {
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
            }
        }
        $('#ress').val('1234');
    });
    
    
    
    $(document).ready(function() {
        $(".slider").each(function() {
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
                }
            });
        });
    });
    
    
    
    $(document).ready(function () {
        $('.toggleButton').click(function () {
            $('#panel').fadeToggle();
            if ($(this).text() === "Show Panel") {

            } else {

            }
        });
    });

    $(document).ready(function () {
        $('.toggleButton1').click(function () {
            $('#panel1').fadeToggle();
            if ($(this).text() === "Show Panel") {

            } else {

            }
        });
    });
    $(document).ready(function () {
        $('.toggleButton2').click(function () {
            $('#panel2').fadeToggle();
            if ($(this).text() === "Show Panel") {

            } else {

            }
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
  

    // Testimonials carousel
})(jQuery);

