import { helpCommand } from './commandData/help';
import { Command } from './format';
import { whoisCommand } from './commandData/whois';
import { orderCommand } from './commandData/order';
import { guildCommand } from './commandData/guild';

export const commands: Command[] = [
  helpCommand,
  whoisCommand,
  orderCommand,
  guildCommand
];
