import {
  Client,
  MessageActionRow,
  MessageButton,
  MessageEmbed
} from 'discord.js';

export function helpCommand(client: Client) {
  client.on('interactionCreate', async (interaction) => {
    if (!interaction.guild || !interaction.isCommand()) return;
    if (interaction.commandName !== 'help') return;

    const helpEmbed = new MessageEmbed()
      .setTitle(`面接BOT v${process.env.npm_package_version ?? '不明'}`)
      .setColor('BLUE')
      .addField('/help', 'ヘルプの表示', true)
      .addField('/order', 'サーバーの再希望', true)
      .addField('/guild', 'このサーバーの情報参照(運営のみ使用可能)', true)
      // 長いので下のフィールドのは unInline
      .addField('/whois <user>', '指定ユーザーの情報参照(運営のみ使用可能)');
    const githubLink = new MessageButton()
      .setLabel('リポジトリ')
      .setStyle('LINK')
      .setURL('https://github.com/merunno/SpicyAzisaMeet');

    await interaction.reply({
      embeds: [helpEmbed],
      components: [new MessageActionRow().setComponents([githubLink])]
    });
  });
}
