import { Client } from 'discord.js';
import * as dotenv from 'dotenv';
import {
  guildCommand,
  helpCommand,
  orderCommand,
  whoisCommand
} from './command';
import { memberJoinEvent } from './event/memberJoinEvent';
import { selectServerEvent } from './event/selectServerEvent';

dotenv.config();
const token = process.env.DISCORD_TOKEN;
export const logChannelId = process.env.LOG_CHANNEL_ID;
export const joinChannelId = process.env.JOIN_CHANNEL_ID;
export const unknownServerRoleId = process.env.UNKNOWN_SERVER_ID;
export const aziAdminRoleId = process.env.AZI_ADMIN_ROLE_ID;
if (!token || !logChannelId || !joinChannelId || !unknownServerRoleId) {
  throw new Error('環境変数が指定されておらず起動に失敗しました。');
}

const client = new Client({
  intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES']
});

void client.login(token);

helpCommand(client);
whoisCommand(client);
orderCommand(client);
guildCommand(client);
// ----
memberJoinEvent(client);
selectServerEvent(client);

client.on('ready', () => {
  if (!client.user) return;
  console.log(`${client.user.username} を起動しました。`);
});
