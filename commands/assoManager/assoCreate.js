module.exports.run = (client, message, args) => {
  const guild = message.guild;
  const nameAsso = args[0];
  const prez = guild.members.cache.find(user => user.id === args[1])
  let Bureau = args.slice(2)
  let membre;
  const everyone = '742101548490031125'
  const Prezs = guild.roles.cache.find(role => role.id === '742317210780827658')

  guild.roles.create({
    data: {
      name: `Président ${nameAsso}`,
      color: 'BLUE',
      position: 2,
    }
  })
  .then(rolePresident => {
    guild.roles.create({
      data: {
        name: `Bureau ${nameAsso}`,
        color: 'BLUE',
        position: 2,
      }
    })
      .then(roleBureau => {
      guild.roles.create({
        data: {
          name: `${nameAsso}`,
          color: 'BLUE',
          position: 2,
          hoist: true,
        }
      })
        .then(roleGeneral => {
          let rolesArray = [rolePresident, Prezs, roleBureau, roleGeneral]
          prez.roles.add(rolesArray)
          let rolesArrayBis = rolesArray.slice(2)
          if(Bureau.length != 0){
            Bureau.forEach(element => {
              membre = guild.members.cache.find(user => user.id === element)
              membre.roles.add(rolesArrayBis)
            });
          }
          guild.channels.create(`╔════ ${nameAsso} ════╗`, {
            type: 'category',
            permissionOverwrites: [
              {
                id: roleGeneral,
                allow: ['VIEW_CHANNEL', 'CONNECT'],
             },
             {
               id: everyone,
               deny: ['VIEW_CHANNEL', 'CONNECT'],
             }]
            })
            .then(category => {
              guild.channels.create(`❖┊bureau-💎`, {
                type: 'text',
                parent: category,
                permissionOverwrites: [
                  {
                    id: roleGeneral,
                    deny: ['VIEW_CHANNEL'],
                  },
                  {
                   id: everyone,
                   deny: ['VIEW_CHANNEL'],
                  },
                  {
                   id: roleBureau,
                   allow: ['VIEW_CHANNEL'],
                  }]
              })
              guild.channels.create(`❖┊général-💬`, {
                type: 'text',
                parent: category,
                permissionOverwrites: [
                  {
                   id: roleGeneral,
                   allow: ['VIEW_CHANNEL'],
                  },
                  {
                   id: everyone,
                   deny: ['VIEW_CHANNEL'],
                  },
                  {
                   id: roleBureau,
                   allow: ['VIEW_CHANNEL'],
                  }]
              })
              guild.channels.create(`❖┊annonces-📢`, {
                type: 'text',
                parent: category,
                permissionOverwrites: [
                  {
                   id: roleGeneral,
                   allow: ['VIEW_CHANNEL'],
                   deny: ['SEND_MESSAGES'],
                  },
                  {
                   id: everyone,
                   deny: ['VIEW_CHANNEL'],
                  },
                  {
                   id: roleBureau,
                   allow: ['VIEW_CHANNEL','SEND_MESSAGES'],
                  }]
              })
              guild.channels.create(`❖ | Vocal 🔊`, {
                type: 'voice',
                parent: category,
                permissionOverwrites: [
                  {
                   id: roleGeneral,
                   allow: ['CONNECT'],
                  },
                  {
                   id: everyone,
                   deny: ['CONNECT','VIEW_CHANNEL'],
                  },
                  {
                   id: roleBureau,
                   allow: ['CONNECT'],
                  }]
              })
              guild.channels.create(`❖ | Bureau 🔊`, {
                type: 'voice',
                parent: category,
                permissionOverwrites: [
                  {
                   id: roleGeneral,
                   allow: ['VIEW_CHANNEL'],
                   deny: ['CONNECT'],
                  },
                  {
                   id: everyone,
                   deny: ['VIEW_CHANNEL','CONNECT'],
                  },
                  {
                   id: roleBureau,
                   allow: ['VIEW_CHANNEL','CONNECT'],
                  }]
              })
            })
        })
    })
  })
}

module.exports.help = {
  name: 'assocreate',
  description: "Ajoute une association au serveur",
  args: true,
  admin: true,
}
