const { EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder, Colors } = require('discord.js')

function deleteMessage( message, time ) {

    setTimeout(() => { message.delete().catch(() => {}) }, time * 1000)
}

const { botSettings } = require('../../../config.json')

module.exports = {
    name: 'cmd2',
    aliases: ["cmd2"],
  
    execute: async (client, message, args) => {

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member

        let embed = new EmbedBuilder()
        .setImage(member.user.displayAvatarURL({dynamic: true, size: 2048}))
        .setAuthor({name: member.user.username, iconURL: member.user.displayAvatarURL({dynamic: true})})
        .setColor(Colors.Gold)

        message.channel.send({embeds: [embed]})
    },

}