import { helpCommand } from './commandData/help';
import { Command } from './format';
import { whoisCommand } from './commandData/whois';
import { orderCommand } from './commandData/order';
import { countCommand } from './commandData/count';

export const commands: Command[] = [
  helpCommand,
  whoisCommand,
  orderCommand,
  countCommand
];
