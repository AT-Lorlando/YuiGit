require('dotenv').config()
const { Client, Collection } = require('discord.js')
const { PREFIX, IDADMIN } = require('./config')
const { readdirSync } = require('fs')

const client = new Client()
client.commands = new Collection()

const loadCommands = (dir = './commands/') => {
  readdirSync(dir).forEach((dirs) => {
    const commands = readdirSync(`${dir}/${dirs}/`).filter((files) =>
      files.endsWith('.js')
    )

    for (const file of commands) {
      const getFileName = require(`${dir}/${dirs}/${file}`)
      client.commands.set(getFileName.help.name, getFileName)
      console.log(`Commande chargée: ${getFileName.help.name}`)
    }
  })
}

loadCommands()

client.on('message', (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return

  const args = message.content.slice(PREFIX.length).split(/ +/)
  const commandName = args.shift().toLowerCase()

  if (!client.commands.has(commandName)) return
  const command = client.commands.get(commandName)
  console.log(command)

  if (command.help.args && !args.length) {
    return message.channel.send("Pas d'arguments!")
  }

  if (command.help.admin && !message.member.roles.cache.has(IDADMIN)) {
    return message.channel.send(
      "Vous n'avez pas les droits admin sur ce serveur"
    )
  }

  command.run(client, message, args)
})

client.login(process.env.TOKEN)
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
