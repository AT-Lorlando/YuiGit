module.exports.run = (client, message) => {
  message.channel.send('Pong!')
}

module.exports.help = {
  name: 'ping',
  description: 'Renvoie pong!',
  args: false,
  admin: false,
}
