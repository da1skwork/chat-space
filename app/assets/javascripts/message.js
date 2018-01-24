$(function(){
  function buildHTML(message){
    if (message.image){
      var image = '<img src= "${ message.image }", class= "message-list__image">'
    }
    else {
      var image = ""
    };
    var html = `<li class= "message-list">
                  <p class= "message-list__username">
                    ${ message.user_name }
                  </p>
                  <p class= "message-list__date">
                    ${ message.created_at }
                  </p>
                  <p class= "message-list__comment">
                    ${ message.content }
                  </p>
                  ${image}
                </li>`
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__message').val("");
      $('.hidden').val("");
      $('html,body').animate({
        scrollTop: $(document).height()});
    })
    .fail(function(){
      alert('error');
    })
  });

  $(function(){
    if (location.href.match(/\/groups\/\d+\/messages/)){
      setInterval(function(){
        var url = location.href
        $.ajax({
          url: url,
          type: 'GET',
          dataType: "json"
        })
        .done(function(messages){
          if (messages.length !== 0) {
            $('.messages').empty();
            messages.forEach(function(message){
              var html = buildHTML(message);
              $('.messages').append(html);
            })
          }
        })
        .fail(function(){
          alert('error');
        });
      },5000);
    }
  })
})
