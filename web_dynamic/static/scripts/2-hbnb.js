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
    $('#api_status').css({
        'position': 'absolute',
        'margin-top': '-55px',
        'right': '30px',
        'height': '40px',
        'width': '40px',
        'background-color': '#cccccc',
        'rigth': '30px',
        'margin-rigth': '30px',
        'border-radius': '50%',
        'display': 'inline-block'
    });
    $.get('http://0.0.0.0:5001/api/v1/status/',
        { status: '' }, function (data) {
            if (data.status === 'OK') {
                $('div #api_status').addClass('available');
                alert('funciona');
            } else {
                $('div #api_status').removeClass('available');
                alert('no funciona');
            }
        });
});
