$(function() {
    function buildHTML(message) {
        var insertImage ＝ message.image.url? `<br><img src="${message.image.url}">`: '';
        var htm = `
            <div class="message">
              <div class="message-header">
                <div class="message-header__name">
                  ${message.name}
                </div>
                <div class="message-header__time">
                  ${message.time}
                </div>
              </div>
              <div class="message__content">
                ${message.content}
                ${insertImage}
              </div>
            </div>
          `;
        return htm;
    }
    function scroll() {
        $('.main-posts').animate({ scrollTop: $('.main-posts')[0].scrollHeight });
    }

    $('#new_message').on('submit', function(e) {
        e.preventDefault();
        var url = $(this).attr('action')
        var formData = new FormData(this);
        $.ajax({
                url: url,
                type: "POST",
                data: formData,
                dataType: 'json',
                processData: false,
                contentType: false
            })
            .done(function(data) {
                var htm = buildHTML(data);
                $('.main-posts').append(htm);
                $('.form__message').val('');
                $('.form__submit').prop('disabled', false);
                scroll();
            })
            .fail(function() {
                alert('error');
                $('.form__message').val('');
                $('.form__submit').prop('disabled', false);
            })
    })
});
