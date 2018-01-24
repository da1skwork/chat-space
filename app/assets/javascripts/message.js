$(function(){
  function buildHTML(message){
    var image = ""
    if (message.image.url){
      var image = '<img src= "${ message.image }", class= "message-list__image">'
    }
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
})
