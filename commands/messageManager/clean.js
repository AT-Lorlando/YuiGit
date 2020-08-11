module.exports.run = (client, message, args) => {

  if(args[0]=="all")
  {
    message.channel.bulkDelete(args[1], true);
  }
}

module.exports.help = {
  name: 'clean',
  description: "Remove les messages",
  args: true,
  admin: true,
}
