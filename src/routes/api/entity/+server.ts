import { error } from '@sveltejs/kit';
import { Configuration, OpenAIApi } from 'openai';
import { env } from '$env/dynamic/private';

const configuration = new Configuration({
	apiKey: env.OPEN_AI_APIKEY,
});

const openai = new OpenAIApi(configuration);

export async function GET({ url }) {
	const entityType = url.searchParams.get('entityType');
	const entityDescription = url.searchParams.get('entityDescription');
	const numberOfWordsInEntity = url.searchParams.get('numberOfWordsInEntity');

	let prompt = '';

	entityType === 'regex' ? 
		prompt = `Generate an regular expression to capture ${entityDescription}` :
		prompt = `Generate a NLP entity with ${numberOfWordsInEntity} words for ${entityDescription}`

	console.log(prompt);

	try {
		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt,
			max_tokens: 4096 - prompt.length,
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
		throw error(400, { message: 'Something went wrong when generating the response' })
	}
}
