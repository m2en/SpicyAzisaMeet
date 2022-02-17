import { Client } from 'discord.js';
import * as dotenv from 'dotenv';
import { helpCommand } from './command';

dotenv.config();
const token = process.env.DISCORD_TOKEN;
const logChannelId = process.env.LOG_CHANNEL_ID;
if (!token || !logChannelId) {
  throw new Error('環境変数が指定されておらず起動に失敗しました。');
}

const client = new Client({
  intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES']
});

void client.login(token);

helpCommand(client);

client.on('ready', () => {
  if (!client.user) return;
  console.log(`${client.user.username} を起動しました。`);
});
