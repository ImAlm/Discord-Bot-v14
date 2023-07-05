const { Client, Collection, GatewayIntentBits, Partials, EmbedBuilder, ChannelType, ActionRowBuilder, ButtonBuilder, SelectMenuBuilder, PermissionsBitField, ButtonStyle, ActivityType, AttachmentBuilder } = require("discord.js");
const client = global.main = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildModeration], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember]});
//

const fs = require('fs')
const mongoose = require('mongoose')
const path = require("path");
const { readdirSync } = require("fs")
const { botSettings } = require('../config.json')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { joinVoiceChannel } = require('@discordjs/voice')
const rest = new REST({ version: '10' }).setToken(botSettings.main.token);

const commands = client.commands = new Collection()
const aliases = client.aliases = new Collection()

class Handler {

    async Login() {

        client.login(botSettings.main.token).then( async (x) => {
            console.log(`[ + ] - Supervisor aktifliğini sağladı.`)

            client.user.setActivity(`${botSettings.main.status}`, { type: ActivityType.Listening })

            const VoiceChannel = client.channels.cache.get(botSettings.main.voice);
    
            await joinVoiceChannel({
                channelId: VoiceChannel.id,
                guildId: VoiceChannel.guild.id,
                adapterCreator: VoiceChannel.guild.voiceAdapterCreator,
                selfDeaf: true,
                group: client.user.id
            });

        }).catch(err => {
            return console.log(`[ - ] - Supervisor başlatılırken bir hata ile karşılaşıldı.`)
        })


    }

    async defEvents() {

        let eventsPath = path.join(__dirname, "./Events")
        fs.readdirSync(eventsPath).forEach( file => {
            let prop = require(`./Events/${file}`);
            if (!prop.conf) return;
            client.on(prop.conf.name, prop);
        } )
    }

    async defCommands() {

        let normalCommandsPath = path.join(__dirname, "./Commands")
        fs.readdirSync(normalCommandsPath).forEach( async (commandFolder) => {

            let findPath = path.join(__dirname, `./Commands/${commandFolder}`)
            fs.readdirSync( findPath ).forEach( async go => {

                let prop = require(`./Commands/${commandFolder}/${go}`)
                
                //console.log(`[ Komutlar ] - ${prop.name} ${prop.name} adlı komut yüklendi.`)
                commands.set(prop.name, prop)
                prop.aliases.forEach(x => {
                    aliases.set(x, prop.name)
                })
            } )
        })
    }

    async Start() {

        await this.Login()
        return;
    }
}

module.exports = new Handler()