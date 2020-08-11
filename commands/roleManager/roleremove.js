const { IDADMIN, IDPROF, IDBOT } = require('../../config')

module.exports.run = (client, message) => {
  const guildRoles = message.guild.roles.cache.array()
  const guildMembers = message.guild.members.cache.array()

  console.log(`members= ${guildMembers}`)
  console.log(`guildRoles= ${guildRoles}`)

  guildMembers.forEach((m_element) => {
    console.log(`member= ${m_element}`)
    if (
      m_element.roles.cache.has(IDADMIN) ||
      m_element.roles.cache.has(IDPROF) ||
      m_element.roles.cache.has(IDBOT)
    ) {
      console.log('Admin, aucune suppr')
    } else {
      m_element.roles.cache.forEach((r_element) => {
        console.log(
          `Suppression du role ${r_element.name} de ${m_element.user.username}`
        )
        if (r_element.id === IDADMIN || r_element.name === '@everyone') {
          console.log('Role admin ou everyone dodge')
        } else {
          m_element.roles
            .remove(r_element)
            .then(
              message.channel.send(
                `Suppression des rôles de ${m_element} effectuée`
              )
            )
        }
      })
    }
  })
}

module.exports.help = {
  name: 'roleremove',
  description: "Remove les role d'un membre du serveur",
  args: false,
  admin: true,
}
