module.exports.run = (client, message, args) => {
  message.channel.send(args.join(' '))
}

module.exports.help = {
  name: 'say',
  description: "Renvoie ce que dit l'utilisateur.",
  args: true,
  admin: false,
}
