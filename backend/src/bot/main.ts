import 'dotenv/config'
import { Telegraf, Context, Markup } from 'telegraf'
import dotenv from "dotenv";
dotenv.config()

// Telegram Bot token(gathered from BotFather bot)
const token = process.env.TOKEN!;
// Telegram Mini Apps Web Application endpoint(URL)
const webAppUrl = process.env.APP!;

console.log(token, webAppUrl);
const bot = new Telegraf(token);


// Command /start
bot.command("start", (ctx: Context) => {
    ctx.reply("Hi there!", {
        reply_markup: {
            inline_keyboard: [
                // Play(Mini Apps) button
                [ Markup.button.webApp('Play the game', webAppUrl) ],
                // Help/Guide callback button
                [ Markup.button.callback('How to play ?', 'HELP_CALLBACK') ],                
                // TG Channel URL button
                [ { text: "Subscribe channel", url: "https://t.me/hamster_kombat" } ],
            ]
        }
    });
});


// HELP_CALLBACK callback logics
const handleHelp = (ctx: Context) => {
    ctx.reply('Вот как я могу вам помочь...');
};

// Command /help
bot.help((ctx: Context) => {
    handleHelp(ctx);
});

// Обработка нажатия кнопки "Помощь"
bot.action('HELP_CALLBACK', (ctx: Context) => {
    handleHelp(ctx);
});


// Any command 
bot.on('message', function (ctx) {
    ctx.replyWithHTML('asagsdgsdgsdgsdg', Markup.inlineKeyboard([
        [ Markup.button.url('linktext', webAppUrl) ]
   ]))
});
// REVIEW

bot.launch().then(() => {
    console.log('Bot started');
});

bot.catch((err) => {
    console.error('Bot error: ', err);
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))