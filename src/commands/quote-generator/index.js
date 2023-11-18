import { SlashCommandBuilder } from "discord.js";
import { tags } from "@src/resources/quote-generator/tags.js";

export const data = new SlashCommandBuilder()
    .setName("quote-generator")
    .setDescription(
        "Generate random quote from the site https://github.com/lukePeavey/quotable",
    )
    .addStringOption((option) => {
        const allTags = Object.values(tags).map((data) => data.slug);
        option
            .setName("tag")
            .setDescription("The tag of the quote")
            .addChoices(
                ...allTags.slice(0, 25).map((tag) => ({
                    name: tag,
                    value: tag,
                })),
            );
        return option;
    });

const getTags = async () => {
    const tagResponse = await fetch("https://api.quotable.io/tags");
    const tagJson = await tagResponse.json();

    return Object.values(tagJson).map((data) => data.slug);
};

const getQuote = async (tag = null) => {
    let request = "https://api.quotable.io/random";

    if (tag) {
        request += `?tags=${tag}`;
    }

    const quoteResponse = await fetch(request);
    const quoteJson = await quoteResponse.json();

    if (quoteJson.hasOwnProperty("statusCode")) {
        return "I do not have a quote for this request";
    } else {
        return `Here's a quote: ${quoteJson.content}`;
    }
};

export const execute = async (interaction) => {
    const tag = interaction.options.getString("tag");

    // get list of tags
    const slugs = await getTags();

    if (tag && !slugs.includes(tag)) {
        await interaction.reply("I'm sorry. This tag is not available.");
        return;
    }

    // get random quote based on the tag
    const quote = await getQuote(tag);

    await interaction.reply(quote);
};
