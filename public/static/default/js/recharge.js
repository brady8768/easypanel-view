$(function () {

    $('#quick').on('click', 'button', function () {
        $('#quick button').removeClass('btn-success').addClass('btn-secondary');
        $(this).removeClass('btn-secondary').addClass('btn-success');
    });

    $('#pay').on('click', 'button', function () {
        $('#pay button').removeClass('btn-success').addClass('btn-secondary');
        $(this).removeClass('btn-secondary').addClass('btn-success');
    });

    $('#submit').click(function () {
        alert('没开发完');
    });

});