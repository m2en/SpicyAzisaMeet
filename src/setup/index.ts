import * as dotenv from 'dotenv';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { commands } from './commands';

dotenv.config();
const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
if (!token || !clientId || !guildId) {
  throw new Error('Environment variables must be specified.');
}

const rest = new REST({ version: '9' }).setToken(token);

void (async () => {
  try {
    console.log('Start the registration of application commands.');

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: []
    });
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands
    });

    console.log('Registration of the application command has been completed.');
  } catch (e) {
    console.error(JSON.stringify(e));
  }
})();
