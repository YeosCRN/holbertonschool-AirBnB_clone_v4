window.addEventListener('load', function () {
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
    // Task 4
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
    // Task 5
    $('button').click(function () {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:5001/api/v1/places_search/',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: amID })
        }).done(function (data) {
            $('section.places').empty();
            for (let i = 0; i < data.length; ++i) {
                let html = '<article><div class="title"><h2>' + data[i].name + '</h2><div class="price_by_night">' + data[i].price_by_night + '</div></div><div class="information"><div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + data[i].max_guest + ' Guests</div><div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + data[i].number_rooms + ' Bedrooms</div><div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + data[i].number_bathrooms + ' Bathroom</div></div><div class="user"></div><div class="description">' + data[i].description + '</div></article>';
                $('.places').append(html);
            }
        });
    });
});