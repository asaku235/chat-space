$(function() {

    function appendUser(user) {
        var html = `<div class="chat-group-user clearfix">
  <p class="chat-group-user__name">${user.name}</p>
  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-id="${user.id}" data-name="${user.name}">追加</a>
</div>`
        return html;
    }

    function appendErrMsgToHTML(msg) {
        var htm = `<div class="chat-group-user clearfix">
  <p class="chat-group-user__name">${ msg }</p></div>`
        return htm;
    }

    function buildMemberHTML(user_name, user_id) {
        var html = `
  <div class="chat-group-user clearfix">
    <input value="${user_id}" type="hidden" name="group[user_ids][]" id="group_user_ids_${user_id}">
    <p class="chat-group-user__name">${user_name}</p>
    <a class="user-search-add chat-group-user__btn chat-group-user__btn--remove" data-id="${user_id}" data-name="${user_name}">削除</a>
  <div>`
        return html;
    }

    $("#user_search_field").on("keyup", function() {
        var input = $("#user_search_field").val();
        $.ajax({
                type: 'GET',
                url: '/users',
                data: { name: input },
                dataType: 'json'
            })

            .done(function(users) {
                $("#user-search-result").empty();
                if (users.length > 0) {
                    users.forEach(function(user) {
                        var html = appendUser(user);
                        $('#user-search-result').append(html);
                    });
                } else {
                    var htm = appendErrMsgToHTML("一致するユーザーはいません");
                    $('#user-search-result').append(htm);
                }
            })
            .fail(function() {
                alert('ユーザー検索に失敗しました');
            })
    });

    $("#user-search-result").on("click", ".chat-group-user__btn--add", function() {
        var user = $(this).data('name');
        var id = $(this).data('id');
        var html = buildMemberHTML(user, id);
        $('#chat-group-users').append(html);
        $(this).parent().remove();
    });

    $("#chat-group-users").on("click", ".chat-group-user__btn--remove", function() {
        $(this).parent().remove();
    });
});
