import { Client, Guild, Interaction, MessageEmbed } from 'discord.js';
import { selectServerButtonId } from '../orderModel/selectServer';
import { logChannelId, unknownServerRoleId } from '../index';
import { addRoleReason } from '../command/message/message';

async function getButtonInteraction(interaction: Interaction) {
  const addRoleGuild = interaction.guild;
  if (!addRoleGuild) return;
  const logChannel = await interaction.guild.channels.fetch(
    String(logChannelId)
  );
  if (!logChannel) return;
  if (!logChannel.isText()) return;

  if (!interaction.isSelectMenu()) return;
  if (interaction.customId !== selectServerButtonId) return;
  const getButton = interaction.values;

  const roleEmbed = createEmbed(getButton, interaction);

  await interaction.reply({
    content: '希望サーバーを選択しました。連絡をお待ち下さいませ。',
    ephemeral: true
  });
  await logChannel.send({ embeds: [roleEmbed] });

  return {
    getButton,
    addRoleGuild
  };
}

// ロールを取得
async function addRole(
  getButton: string[],
  addRoleGuild: Guild,
  interaction: Interaction
) {
  if (!addRoleGuild) {
    throw new Error('ロールを検索するギルドを取得することができませんでした。');
  }
  const selectAuthor = await addRoleGuild.members.fetch(interaction.user.id);
  if (!selectAuthor) {
    throw new Error(
      'ロールを付与するべきユーザーをDiscord API側から取得することができませんでした。'
    );
  }

  if (getButton.find((name) => name.match('希望先未決定'))) {
    const unknownServerRole = addRoleGuild.roles.cache.find(
      (role) => role.id === unknownServerRoleId
    );
    if (!unknownServerRole) {
      throw new Error(
        '"希望先未決定" のロールを見つけることができませんでした。IDを間違えている可能性があります。'
      );
    }

    console.log(`${interaction.user.username} が` + addRoleReason);
    await selectAuthor.roles.add(unknownServerRole, addRoleReason);
  }

  // "addRoleGuild" から "(選択サーバー)希望者" を取得する
  // なんかエラー出る, いつか直す
  const addRole = addRoleGuild.roles.cache.find(
    (role) => role.name === String(getButton) + '希望者'
  );
  if (!addRole) {
    throw new Error(
      '希望者ロールを見つけることができませんでした。開発者に連絡してください。'
    );
  }

  console.log(`${interaction.user.username} が` + addRoleReason);
  await selectAuthor.roles.add(addRole, addRoleReason);

  return {
    addRole
  };
}

function createEmbed(getButton: string[], interaction: Interaction) {
  const addRoleAt = Math.floor(interaction.createdTimestamp / 1000);

  return new MessageEmbed()
    .setTitle('面接希望の選択')
    .setDescription(`<t:${addRoleAt}:F> (<t:${addRoleAt}:R>)`)
    .setColor('AQUA')
    .addField('希望サーバー', String(getButton));
}

async function selectSystem(interaction: Interaction) {
  const buttonData = await getButtonInteraction(interaction);
  if (!buttonData) return;
  const { getButton, addRoleGuild } = buttonData;

  const roleData = await addRole(getButton, addRoleGuild, interaction);
  if (!roleData) return;
}

export function selectServerEvent(client: Client) {
  client.on('interactionCreate', async (interaction) => {
    try {
      await selectSystem(interaction);
    } catch (e) {
      console.error(e);
    }
  });
}
