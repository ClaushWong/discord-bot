import * as Test from "./commands/test";
import * as QuoteGenerator from "./commands/quote-generator";

export const onClientReady = (c: any) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
};

export const onHandleInteraction = async (interaction: any) => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.commandName;

    switch (command) {
        case "test":
            return await Test.execute(interaction);
        case "quote-generator":
            return await QuoteGenerator.execute(interaction);
        default:
            await interaction.reply("Invalid command");
    }
};
