import { error } from '@sveltejs/kit';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
	// apiKey: process.env.OPENAI_API_KEY,
	apiKey: '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'
});

const openai = new OpenAIApi(configuration);

export async function GET({ url }) {
	const question = url.searchParams.get('question');

	try {
		const response = await openai.createEdit({
			model: "text-davinci-edit-001",
			input: question,
			instruction: 'Fix grammar and spelling'
		});

		console.log(response.data);

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
		return new Response(JSON.stringify({ type: 'error', message: 'Something went wrong when generating the intent model' }));
	}
}
