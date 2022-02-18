import { Client, GuildMember } from 'discord.js';
import { orderEmbed, orderMessage } from '../orderModel/embed';
import { joinChannelId } from '../index';
import { selectServer } from '../orderModel/selectServer';

function getEvent(member: GuildMember) {
  return `<@${member.user.id}>, `;
}

async function sendEmbed(userMention: string, client: Client) {
  const joinChannel = await client.channels.fetch(String(joinChannelId));
  if (!joinChannel || !joinChannel.isText()) {
    throw new Error(
      'ログチャンネルは存在しない、またはテキストチャンネルではない可能性があります。'
    );
  }

  await joinChannel.send({
    content: userMention + orderMessage,
    embeds: [orderEmbed],
    components: [selectServer]
  });
}

async function joinSystem(client: Client, member: GuildMember) {
  const userData = getEvent(member);
  if (!userData) return;
  await sendEmbed(userData, client);
}

export function memberJoinEvent(client: Client) {
  client.on('guildMemberAdd', async (member) => {
    try {
      await joinSystem(client, member);
    } catch (e) {
      console.error(e);
    }
  });
}
