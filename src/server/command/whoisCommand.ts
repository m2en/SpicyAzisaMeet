import {
  Client,
  GuildMember,
  Interaction,
  MessageEmbed,
  User
} from 'discord.js';
import { aziAdminRoleId } from '../index';
import { commandPermissionErrorMsg } from './message/message';

function getGuildMemberInfo(
  guildMember: GuildMember,
  whoisEmbed: MessageEmbed,
  userAccount: User
) {
  if (guildMember) {
    if (guildMember.bannable) {
      whoisEmbed.addField(
        'BANされているか',
        guildMember.bannable ? 'Yes' : 'No'
      );
    }
    if (guildMember.communicationDisabledUntilTimestamp) {
      const timeout = Math.floor(
        guildMember.communicationDisabledUntilTimestamp / 1000
      );
      whoisEmbed.addField('タイムアウト解除まで', `<t:${timeout}:R>`);
    }
    if (guildMember.displayColor) {
      whoisEmbed.addField('アカウントカラー', `${guildMember.displayColor}`);
    }
    if (guildMember.displayName) {
      whoisEmbed.addField('ニックネーム', `${guildMember.displayName}`);
    }
    if (guildMember.moderatable) {
      whoisEmbed.addField(
        'モデレートアクション実行可能か',
        guildMember.moderatable ? '可能' : '不可能'
      );
    }
    if (guildMember.pending) {
      whoisEmbed.addField(
        'メンバーシップゲート通過済みか',
        guildMember.pending ? '通過済み' : '未通過'
      );
    }
    if (guildMember.joinedTimestamp) {
      const joinAt = Math.floor(guildMember.joinedTimestamp / 1000);
      whoisEmbed.addField('参加日', `<t:${joinAt}:F>(<t:${joinAt}:R>)`);
    }
    // -----
    if (userAccount.avatar) {
      whoisEmbed.setThumbnail(String(userAccount.avatarURL()));
    }
    if (userAccount.banner) {
      whoisEmbed.setImage(String(userAccount.bannerURL()));
    }
  }
}

async function runCommand(client: Client, interaction: Interaction) {
  if (!interaction.isCommand() || !interaction.guild) return;
  if (interaction.commandName !== 'whois') return;

  const commandAuthorMember = await interaction.guild.members.fetch(
    `${interaction.user.id}`
  );
  if (!commandAuthorMember) return;
  if (!commandAuthorMember.roles.cache.get(String(aziAdminRoleId))) {
    await interaction.reply({ content: commandPermissionErrorMsg });
    return;
  }

  const target = interaction.options.getUser('target');
  if (!target) return;

  const userAccount = await client.users.fetch(target.id);
  const guildMember = await interaction.guild.members.fetch(target.id);

  const createTime = Math.floor(userAccount.createdTimestamp / 1000);

  const whoisEmbed = new MessageEmbed()
    .setColor('AQUA')
    .setTitle(`ユーザー情報: ${userAccount.username}`)
    .addField('名前', `${userAccount.username}`)
    .addField('ID', `${userAccount.id}`)
    .addField('メンション', `<@${userAccount.id}>`)
    .addField('Tag', `${userAccount.tag}`)
    .addField('BOTか', userAccount.bot ? 'Yes' : 'No')
    .addField('システムユーザーか', userAccount.system ? 'Yes' : 'No');

  getGuildMemberInfo(guildMember, whoisEmbed, userAccount);

  whoisEmbed.addField('作成日時', `<t:${createTime}:F>(<t:${createTime}:R>)`);

  await interaction.reply({ embeds: [whoisEmbed] });
}

export function whoisCommand(client: Client) {
  client.on('interactionCreate', async (interaction) => {
    try {
      await runCommand(client, interaction);
    } catch (e) {
      console.error(e);
    }
  });
}
