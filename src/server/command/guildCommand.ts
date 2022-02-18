import { Client, Guild, Interaction, MessageEmbed } from 'discord.js';

async function getCommand(interaction: Interaction, createEmbed: MessageEmbed) {
  if (!interaction.guild || !interaction.isCommand()) return;
  if (interaction.commandName !== 'guild') return;

  await interaction.reply({ embeds: [createEmbed] });
}

async function getGuild(client: Client, interaction: Interaction) {
  const guildId = interaction.guild?.id;
  if (!guildId) {
    throw new Error('ギルドデータを正しく取得できませんでした。');
  }

  // Interactionでギルドデータを取得することもできるが、安全性確保のため、Discord APIからfetchする
  const guildData = await client.guilds.fetch(guildId);
  if (!guildData) {
    throw new Error(
      'ギルドデータをDiscord APIから正しくfetchできませんでした。'
    );
  }

  return guildData; //: Guild
}

function createEmbed(guildData: Guild) {
  return new MessageEmbed()
    .setTitle('この面接サーバーの情報')
    .setColor('AQUA')
    .addField('サーバー名', guildData.name)
    .addField('サーバーID', guildData.id)
    .addField('サーバー人数', String(guildData.memberCount));
}

async function guildCommandSystem(client: Client, interaction: Interaction) {
  const importGuildData = await getGuild(client, interaction);
  if (!importGuildData) return;

  const sendEmbed = createEmbed(importGuildData);

  await getCommand(interaction, sendEmbed);
}

export function guildCommand(client: Client) {
  client.on('interactionCreate', async (interaction) => {
    try {
      await guildCommandSystem(client, interaction);
    } catch (e) {
      console.error(e);
    }
  });
}
