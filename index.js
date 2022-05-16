const Discord = require('discord.js');

const client = new Discord.Client();

const configs = {
  prefix: '!',
  token: 'token of bot'
};

/** 
 * @param {Discord.Message} message
 */
const clean = (message) => {
  if (!message.guild) return;
  
  if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(`:x: | You **must** have the \`manage messages\` permission!`);
  if (!message.guild.me.permissions.has("MANAGE_MESSAGES")) return message.channel.send(`:x: | I **must** have the \`manage messages\` permission!`);
  
  const messages = message.channel.messages.cache.filter(x => x.deletable && !x.pinned);
  message.channel.bulkDelete(messages).catch(() => {});
  
  message.channel.send(`:white_check_mark: | Start to supress messages`);
};

client.on('message', (message) => {
  if (!message.content.startsWith(configs.prefix) || message.author.bot) return;
  
  var args = message.content.slice(configs.prefix.length).trim().split(' ');
  const commandName = args.shift().toLowerCase();
  
  if (commandName === 'clean') return clean();
});
