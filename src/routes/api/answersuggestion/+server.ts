import { error } from '@sveltejs/kit';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
	// apiKey: process.env.OPENAI_API_KEY,
	apiKey: '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'
});

const openai = new OpenAIApi(configuration);

export async function GET({ url }) {
	const question = url.searchParams.get('question');

	const prompt = `Suggest an answer to this question: ${question}`;

	try {
		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt,
			max_tokens: 4096 - prompt.length,
		});

		const {
			choices,
			usage: {
				total_tokens: totalTokens
			}
		} = response.data;

		const {
			text: result
		} = choices[0]

		return new Response(JSON.stringify({ result: result.trim(), totalTokens }));
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ type: 'error', message: 'Something went wrong when generating the intent model' }));
	}
}
