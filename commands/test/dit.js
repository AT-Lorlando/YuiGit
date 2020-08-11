module.exports.run = (client, message, args) => {
  message.channel.bulkDelete(1, true);

  message.channel.send(args.join(' '))
}

module.exports.help = {
  name: 'dit',
  description: "Renvoie ce que dit l'utilisateur.",
  args: true,
  admin: false,
}
