import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("test")
    .setDescription("It's a testing commands");

export const execute = async (interaction) => {
    await interaction.reply("testing!");
};
