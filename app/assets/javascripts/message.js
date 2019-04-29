$(function() {
    function buildHTML(message) {
        var image = ""
        message.image ? image = `<img src="${message.image}">` : image = "";
        var html =
            `<div class="message"  data-message-id="${message.id}">
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
                ${image}
              </div>
            </div>`;
        return html;
    };
    function scroll() {
        $('.main-body').animate({ scrollTop: $('.main-body')[0].scrollHeight }, 'fast');
    };
    $('#new_message').on('submit', function(e) {
        e.preventDefault();
        var formData = new FormData(this);
        var url = $(this).attr('action');
        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
            dataType: 'json',
            processData: false,
            contentType: false
        })
        .done(function(data) {
            var html = buildHTML(data);
            $('.main-posts').append(html);
            $('#new_message')[0].reset();
            scroll();
            $('.form__submit').prop('disabled', false);
        })
        .fail(function() {
            alert('error')
        })
    });
    var interval = setInterval(function() {
        if (window.location.href.match(/\/groups\/\d+\/messages/)) {
          var last_message_id = $('.message').last().data('message-id');
          var groupId = location.pathname.split('/')[2];
        $.ajax({
            url: `/groups/${groupId}/api/messages`,
            type: 'GET',
            dataType: 'json',
            data: {id: last_message_id }
        })
        .done(function(messages) {
            var insertHTML = "";
            messages.forEach(function(message) {
                if (message.id > last_message_id) {
                    insertHTML = buildHTML(message);
                    $('.main-posts').append(insertHTML);
                };
            });
        })
        .fail(function() {
            //console.log('error');
        })
        }
    }, 5000);
});
