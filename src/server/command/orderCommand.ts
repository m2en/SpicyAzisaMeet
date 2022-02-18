import { Client, Interaction } from 'discord.js';
import { orderEmbed, orderMessage } from '../orderModel/embed';
import { selectServer } from '../orderModel/selectServer';

async function getCommand(
  interaction: Interaction,
  orderMessageComponent: string
) {
  if (!interaction.isCommand() || !interaction.guild) return;
  if (interaction.commandName !== 'order') return;

  importEmbed(interaction);

  await interaction.reply({
    content: orderMessageComponent,
    embeds: [orderEmbed],
    components: [selectServer],
    ephemeral: true
  });
}

function importEmbed(interaction: Interaction) {
  const userMention = `<@${interaction.user.id}>, `;
  const orderMessageComponent = userMention + orderMessage;

  return {
    orderMessageComponent
  };
}

export function orderCommand(client: Client) {
  client.on('interactionCreate', async (interaction) => {
    try {
      const sendData = importEmbed(interaction);

      await getCommand(interaction, sendData.orderMessageComponent);
    } catch (e) {
      console.error(e);
    }
  });
}
