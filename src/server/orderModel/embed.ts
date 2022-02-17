import { MessageEmbed } from 'discord.js';

export const orderMessage =
  '**下の埋め込みが見えない場合**' +
  'この下の埋め込み表示が見れない場合、**「ユーザー設定」→「テキスト・画像」**の**「チャットで投稿されたリンクのサイト情報を表示する」**を有効にしてください。';

export const orderEmbed = new MessageEmbed()
  .setTitle('希望先サーバーの選択')
  .setDescription('面接を希望するサーバーを下から選んでください。')
  .setColor('AQUA');
