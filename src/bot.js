// import discord.js components
import { Client, Events, GatewayIntentBits } from "discord.js";
import { onClientReady, onHandleInteraction } from "./bot.process";

// create a new Client instance
const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

// call to make sure it is online on client side (our side)
client.once(Events.ClientReady, onClientReady);

client.login(process.env.DISCORD_TOKEN);

client.on(Events.InteractionCreate, onHandleInteraction);
