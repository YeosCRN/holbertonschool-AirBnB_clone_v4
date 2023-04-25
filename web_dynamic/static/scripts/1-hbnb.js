$(function () {
    $('input').css('margin-right', '10px');
    const amID = [];
    $(':checkbox').change(function () {
        if ($(this).prop("checked") == true) {
            amID.push($(this).attr("data-id"));
        } else {
            amID.pop($(this).attr("data-id"));
        }
    });
    const amName = [];
    $(':checkbox').change(function () {
        if ($(this).prop("checked") == true) {
            amName.push($(this).attr("data-name"));
        } else {
            amName.pop($(this).attr("data-name"));
        }
        if ($.isEmptyObject(amName)) {
            $('.amenities h4').html('&nbsp');
        } else {
            $('.amenities h4').text(Object.values(amName).join(', '));
        }
    });
});
