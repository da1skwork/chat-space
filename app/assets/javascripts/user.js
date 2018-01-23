$(function(){
var search_list = $(".user-search-result");
var add_member = $(".chat-group-form__field--right__member");


function appendUser(user){
  var html= `<div class="chat-group-user clearfix ${user.name}">
              <p class="chat-group-user__name"> ${ user.name }</p>
              <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
            </div>`

  search_list.append(html);
}

function appendMember(user_name,user_id) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
                  <p class='chat-group-user__name'>${ user_name }</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
  add_member.append(html);
}

  $("#user-search-field").on('keyup', function(){
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $('.user-search-result').empty();
      if (users.length !==0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
    })

    .fail(function() {
      alert('ユーザー検索に失敗しました');
    });
  });

  $('.user-search-result').on('click','a',function(){
    var user_name = $(this).attr('data-user-name');
    var user_id = $(this).attr('data-user-id');
    $(this).parent().remove();
      appendMember(user_name, user_id);
  });

  $('.chat-group-form__field--right__member').on('click','a',function(){
    console.log($(this).parent());
    $(this).parent().remove();
  });

});
