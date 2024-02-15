// const axios = require("axios");
import axios from "axios";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const apiUrl = import.meta.env.VITE_OPENAI_CHAT_API;

let previousMessages = [];


export async function useOpenAI(question) {
	const conversation = [
		{ role: "system", content: "You are a helpful assistant." },
		{
			role: "user",
			content: question,
		},
	];
	try {
		const response = await axios.post(
			apiUrl,
			{
				messages: conversation,
				temperature: 0.7,
				max_tokens: 150,
				model: "gpt-3.5-turbo-0613",
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${apiKey}`,
				},
			}
		);
		const assistantReply = response.data.choices[0].message.content;
		return `${assistantReply}`;
	} catch (error) {
		return null;
	}
}
const userQuestion = "Tell me a quote from an artist.";
useOpenAI(previousMessages, userQuestion).then((assistantReply) => {
	previousMessages.push({ role: "assistant", content: assistantReply });
});
