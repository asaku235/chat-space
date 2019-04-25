json.name    @message.user.name
json.content    @message.content
json.time    @message.created_at.strftime('%Y/%m/%d %T')
json.image    @message.image.url
json.id    @message.id
