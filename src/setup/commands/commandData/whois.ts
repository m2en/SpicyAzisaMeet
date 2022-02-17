import { Command } from '../format';
import { User } from '../../optionTypes';

export const whoisCommand: Command = {
  name: 'whois',
  description: '指定ユーザーの情報を確認できます',
  options: [
    {
      name: 'target',
      type: User,
      description: 'ユーザーを指定してください',
      required: true
    }
  ]
};
