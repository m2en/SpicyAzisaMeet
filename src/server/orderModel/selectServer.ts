/**
 * ban-ts-comment - 理由
 * 設定ファイル保持のため
 */

import { MessageActionRow, MessageSelectMenu } from 'discord.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { selectServerData } from '../../config/SelectServer.json';

export const selectServerButtonId = 'select_server';

export const selectServer = new MessageActionRow().setComponents([
  new MessageSelectMenu()
    .setCustomId(selectServerButtonId)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    .addOptions(selectServerData)
]);
