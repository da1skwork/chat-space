$(function(){
  function buildHTML(message){
    var html = `<li class= "message-list">
                          <p class= "message-list__username">
                            ${message.user_name}
                          </p>
                          <p class= "message-list__date">
                            format_posted_time(${message.created_at})
                          </p>
                          if ${message.content}.present?
                            <p class= "message-list__comment">
                              ${message.content}
                            </p>
                          end
                          <img ${message.image.url}, class= "message-list__image" if ${message.image}.present?
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
  })
})
