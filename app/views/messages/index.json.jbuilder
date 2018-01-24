json.array! @messages do |message|
  json.user_name  message.user.name
  json.created_at format_posted_time(message.created_at)
  json.content  message.content
  json.image  message.image.url
  json.id message.id
end

