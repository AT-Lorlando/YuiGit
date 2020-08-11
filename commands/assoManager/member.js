module.exports.run = (client, message, args) => {
  const guild = message.guild;
  const membre = guild.members.cache.find(user => user.displayName === args[0])

  if(membre) {
    message.channel.send(`Membre: ${membre}
  Tag: ${membre.user.tag}
  ID: ${membre.id}`)
  }
  else
  {
    message.channel.send('Je n\'ai pas trouvé ce membre')
  }
}

module.exports.help = {
  name: 'member',
  description: "Donne les infos sur un membre",
  args: true,
  admin: false,
}
