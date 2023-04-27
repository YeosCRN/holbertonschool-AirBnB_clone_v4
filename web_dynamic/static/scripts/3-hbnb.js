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
    $.get('http://localhost:5001/api/v1/status/', function (data) {
        if (data.status === 'OK') {
            $('div#api_status').addClass('available');
        } else {
            $('div#api_status').removeClass('available');
        }
    });
    $.ajax({
        url: 'http://localhost:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        data: '{}',
        dataType: 'json',
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                let place = data[i];
                $('.places').append(
                    '<article><h2>' + place.name + '</h2>\
                    <div class="price_by_night"><p>$' + place.price_by_night + '</p>\
                    </div><div class="information"><div class="max_guest"><div class="guest_image"></div>\
                    <p>' + place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div>\
                    <p>' + place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div>\
                    <p>' + place.number_bathrooms + '</p></div></div>\
                    <div class="description"><p>' + place.description + '</p></div></article>');
            };
        }
    });
});
