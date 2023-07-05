
const { EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder} = require('discord.js')
const { botSettings } = require('../../config.json')

module.exports = async (message) => {
    const client = global.main

    if (!message.guild) return
    if (!message.content.startsWith(botSettings.main.prefix)) return
    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || [...client.commands.values()].find((e) => e.aliases && e.aliases.includes(command));
    if (!cmd) return

    cmd.execute(client, message, args);
}


module.exports.conf = {
    name: "messageCreate"
}