const fs = require('fs')
const {bot} = require('../index');
const discord = require('discord.js');
const config = require('../config.json')

bot.on("messageCreate", async message => {
  let request_paid = bot.channels.cache.get(config.c_paid)

  if(message.author.bot || message.channel.type === "dm") return;

  let mention = [`<@${bot.user.id}>`, `<@!${bot.user.id}>`];
      mention.find(mention => {
        if (message.content === mention) {
                message.channel.send({embeds: [new discord.MessageEmbed()
                .setDescription(`Hello ${message.author.username}! I am ${bot.user.username} and I was created by Francisca.105#8965.`)
                .setColor(bot.cor)
                .setThumbnail(bot.user.avatarURL())
                ]})
            }
        })

  
        if(message.channel.id === request_paid.id) {
          let content = message.content.toLowerCase()
          let split = content.split('\n')

          if(!content.includes('[service]') || !content.includes('[request]') || !content.includes('[budget]')) return Delete(message)
          if(!content.startsWith('[service]') || !split[1].startsWith('[request]') || !split[2].startsWith('[budget]')) return Delete(message)

          let budget = split[2].substring(9)

          if(budget.length ===0) return Delete(message)

          if(!budget.includes('$') && !budget.includes('€')) return Delete(message, 'you must contain dollar / euro sign')

          let medium = budget.split('-')

          if(medium.length === 1) {
            if(budget.includes('$')) {

              let quantity = budget.split('$')
              let qnt = quantity.filter(e => e !== '')
              if(isNaN(qnt)) return Delete(message, 'please give a budget')
              
            }else if(budget.includes('€')) {

              let quantity = budget.split('€')
              let qnt = quantity.filter(e => e !== '')
              if(isNaN(qnt)) return Delete(message, 'please give a budget')

            }
          } else if(medium.length === 2) {
            if(budget.includes('€')) {

            let quantity1 = medium[0].split('€')
            let qnt1 = quantity1.filter(e => e !== '')

            let quantity2 = medium[1].split('€')
            let qnt2 = quantity2.filter(e => e !== '')

            if(isNaN(qnt1) || isNaN(qnt2)) return Delete(message, 'please give a budget')

            } else if(budget.includes('$')) {

              let quantity1 = medium[0].split('$')
              let qnt1 = quantity1.filter(e => e !== '')

              let quantity2 = medium[1].split('$')
              let qnt2 = quantity2.filter(e => e !== '')

              if(isNaN(qnt1) || isNaN(qnt2)) return Delete(message, 'please give a budget')

            }
          } else return Delete(message, 'i don\'t understand the budget that you are providing')
        }

})

function Delete (msg, extra) {
  msg.delete()
  msg.channel.send({content: `Please, ${extra||'follow the official format'}.`}).then(a => {
    setTimeout(() => {
      a.delete()
    }, 5000)
  })
}