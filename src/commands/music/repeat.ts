import { Message } from 'eris';

import { IMClient } from '../../client';
import { BotCommand, CommandGroup } from '../../types';
import { Command, Context } from '../Command';

export default class extends Command {
	public constructor(client: IMClient) {
		super(client, {
			name: BotCommand.repeat,
			aliases: ['loop'],
			group: CommandGroup.Music,
			guildOnly: true
		});
	}

	public async action(
		message: Message,
		args: any[],
		flags: {},
		{ t, guild }: Context
	): Promise<any> {
		const conn = await this.client.music.getMusicConnection(guild);
		if (!conn.isConnected()) {
			this.sendReply(message, 'I am currently not playing any music');
			return;
		}

		conn.setRepeat(!conn.isRepeating());

		if (conn.isRepeating()) {
			this.sendReply(message, 'Your playlist is now set to repeat');
		} else {
			this.sendReply(message, `Your songs won't repeat anymore`);
		}
	}
}