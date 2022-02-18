import { Client } from 'discord.js';
import * as dotenv from 'dotenv';
import { helpCommand, whoisCommand } from './command';
import { memberJoinEvent } from './event/memberJoinEvent';

dotenv.config();
const token = process.env.DISCORD_TOKEN;
export const logChannelId = process.env.LOG_CHANNEL_ID;
export const joinChannelId = process.env.JOIN_CHANNEL_ID;
if (!token || !logChannelId || !joinChannelId) {
  throw new Error('環境変数が指定されておらず起動に失敗しました。');
}

const client = new Client({
  intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES']
});

void client.login(token);

helpCommand(client);
whoisCommand(client);
// ----
memberJoinEvent(client);

client.on('ready', () => {
  if (!client.user) return;
  console.log(`${client.user.username} を起動しました。`);
});
