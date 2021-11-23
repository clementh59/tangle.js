// Copyright 2021 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Arguments, Argv } from "yargs";
import ICommand from "../../ICommand";
import ICommandParam from "../../ICommandParam";
import AnchorMsgCommand from "./anchorMsgCommand";
import CreateChannelCommand from "./createChannelCommand";
import FetchMsgCommand from "./fetchMsgCommand";
import InspectChannelCommand from "./inspectChannelCommand";
import SeedChannelCommand from "./seedChannelCommand";

const params: ICommandParam[] = [];

const subCommands: Record<string, ICommand> = {
    create: new CreateChannelCommand(),
    anchor: new AnchorMsgCommand(),
    fetch: new FetchMsgCommand(),
    inspect: new InspectChannelCommand(),
    seed: new SeedChannelCommand()
};

export class ChannelCommand implements ICommand {
    public name: string = "channel";

    public description: string = "Streams Channels operations (Powered by IOTA Streams)";

    public subCommands: Record<string, ICommand> = subCommands;

    public async execute(args: Arguments): Promise<boolean> {
        return true;
    }

    public register(yargs: Argv): void {
        for (const aParam of params) {
            yargs.option(aParam.name, aParam.options);
        }

        for (const name of Object.keys(subCommands)) {
            const command: ICommand = subCommands[name];

            yargs.command(
                command.name,
                command.description,
                commandYargs => {
                    command.register(commandYargs);
                },
                async commandYargs => command.execute(commandYargs)
            );
        }
    }
}
