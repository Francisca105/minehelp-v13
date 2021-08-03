const {bot} = require('../index');

bot.on("ready", async () => {

    await bot.user.setActivity("working!")
    console.log(`[BOT] ${bot.user.username} (${bot.user.id}) online.`)

    bot.user.setActivity(`created by Francisca.105#8965`)
})