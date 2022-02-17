import { MessageActionRow, MessageSelectMenu } from 'discord.js';

export const selectServerButtonId = 'select_server';

// TODO: Conflictを用意する
export const selectServer = new MessageActionRow().setComponents([
  new MessageSelectMenu().setCustomId(selectServerButtonId).addOptions([
    {
      label: 'Life',
      description: 'アジ鯖の中心的な生活サーバー。',
      value: 'life'
    },
    {
      label: 'Vanilife',
      description: 'Minecraftのバニラに近い生活サーバー',
      value: 'ばにらいふ！'
    },
    {
      label: 'Leon Gun War',
      description: '全面戦争型、銃撃戦FPSサーバー。',
      value: 'lgw'
    },
    {
      label: 'Diverse',
      description: '究極の多様性を体感せよ！！',
      value: 'diverse'
    },
    {
      label: 'A Fall New World',
      description: 'この世界にあるのは、 岩盤一つだけ。',
      value: 'afnw'
    },
    {
      label: 'Coretol',
      description: 'MMORPGサーバー',
      value: 'coretol'
    },
    {
      label: 'JunkGames',
      description: 'ミニゲームサーバー',
      value: 'jg'
    },
    {
      label: 'CardianPVP',
      description: '* (説明なし) *',
      value: 'cp'
    }
  ])
]);
