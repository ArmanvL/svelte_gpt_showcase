import { error } from '@sveltejs/kit';
import { Configuration, OpenAIApi } from 'openai';
import { env } from '$env/dynamic/private';

console.log(env)
console.log('===================================')
console.log(process.env)

const configuration = new Configuration({
	apiKey: env.OPEN_AI_APIKEY,
});

const openai = new OpenAIApi(configuration);

export async function GET({ url }) {
	const numberOfIntents: string = url.searchParams.get('numberOfIntents');
	const numberOfUtterances: string = url.searchParams.get('numberOfUtterances');
	const companyType: string = url.searchParams.get('companyType');
	const productType: string = url.searchParams.get('productType');
	const generateSingleIntent: boolean = url.searchParams.get('generateSingleIntent') === 'true';

	let prompt = '';

	if (generateSingleIntent) {
		prompt = `Generate an intent with ${numberOfUtterances} utterances for a company in the ${companyType} vertical that sells ${productType}`;
	} else {
		prompt = `Generate an intent model with ${numberOfIntents} intents and ${numberOfUtterances} utterances per intent for a company in the ${companyType} vertical that sells ${productType}`;
	}

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
	} catch (err) {
		console.error(err.response.data);
		throw error(400, { message: 'Something went wrong when generating the response' })
	}
}
