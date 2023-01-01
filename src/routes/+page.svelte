<div class="wrapper">
	{#if loading === true}
		<div class="loading-overlay">
			<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
		</div>
	{/if}
	<h1 class="row">🚀 OpenAI GPT-3</h1>
	<div class="row">
		<p class="row">
			A proof of concept showing four use cases around OpenAI's GPT-3 models.
			
		</p>
		<ul>
			<li>Intent (model) generation</li>
			<li>(Regular Expression) Entity generation</li>
			<li>Spelling and grammar checks</li>
			<li>Providing answer suggestions to questions</li>
		</ul>
	</div>
	<div class="row disclaimer">
		⚠️ &nbsp;This is a proof of concept to explore potential use cases, and is not production ready. Natural Language Generation is unpredictable and is likely to give different results for similar requests &nbsp;⚠️
	</div>
	<div class="row">
		<h3 class="row">
			Intent Generation
		</h3>
		<div class="row block-input">
			<label>Generate intent model, or a single intent</label>
			<div class="radio-container">
				{#each generateIntentOptions as value}
					<label>
						<input type="radio" {value} bind:group={generateSingleIntent}>
						{#if value === true}
							Single Intent
						{:else}
							Intent Model
						{/if}
					</label>
				{/each}
			</div>
		</div>
		{#if generateSingleIntent === true}
			<div class="row block-input">
				<label>Number of intents</label>
				<input type="number" disabled min=0 max=15 bind:value={numberOfIntents}/>
			</div>
		{:else}
			<div class="row block-input">
				<label>Number of intents</label>
				<input type="number" min=0 max=15 bind:value={numberOfIntents}/>
			</div>
		{/if}
		<div class="row block-input">
			<label>Number of utterances</label>
			<input type="number" min=0 max=15 bind:value={numberOfUtterances}/>
		</div>
		<div class="row block-input">
			<label>Company Industry</label>
			<input type="text" placeholder="Enter your companies industry..." bind:value={companyType}/>
		</div>
		<div class="row block-input">
			<label>Product Type</label>
			<input type="text" placeholder="What product will you be asked about?" bind:value={productType}/>
		</div>
		<div class="row block-button">
			<button class="primary-button" on:click={ generateIntent }>Generate</button>
		</div>
		{#if intentResultGenerated === true }
			<div class="row block-input">
				<label class="textarea-label">Generated result</label>
				<textarea class="output-container" bind:value={generatedResult} />	
			</div>
		{/if}
	</div>
	<div class="row">
		<h3>
			Entity Creation	
		</h3>
		<div class="row block-input">
			<label>Entity Type</label>
			<div class="radio-container">
				{#each entityTypes as value}
					<label>
						<input type="radio" {value} bind:group={entityType}>
						{#if value === 'regex'}
							Regular Expression	
						{:else}
							Simple	
						{/if}
					</label>
				{/each}
			</div>
		</div>
		<div class="row block-input">
			<label>Describe the entity</label>
			<input type="text" placeholder="E.g. cars, tablets, or holidays" bind:value={entityDescription}/>
		</div>
		{#if entityType === 'regex'}
			<div class="row block-input">
				<label>Number of (combined) words in the entity</label>
				<input type="number" disabled bind:value={numberOfWordsInEntity}/>
			</div>
		{:else}
			<div class="row block-input">
				<label>Number of (combined) words in the entity</label>
				<input type="number" bind:value={numberOfWordsInEntity}/>
			</div>
		{/if}
		<div class="row block-button">
			<button class="primary-button" on:click={ generateEntity}>Generate</button>
		</div>
		{#if entityGenerated === true }
			<div class="row block-input">
				<label class="textarea-label">Generated entity</label>
				<textarea class="output-container" bind:value={generatedEntity} />
			</div>
		{/if}
	</div>
	<div class="row">
		<h3>
			Answer Suggestions and Spelling/Grammar Checks
		</h3>
		<div class="row block-input">
			<label>Ask a question</label>
			<input type="text" placeholder="Throw some spelling mistakes in there" bind:value={question}/>
		</div>
		<div class="row block-button">
			<button class="ghost-button" on:click={ spellingCheck }>Spelling Check</button>
			<button class="primary-button" on:click={ createAnswerSuggestion }>Create Suggestion</button>
		</div>
		{#if answerSuggestionGenerated === true }
			<div class="row block-input">
				<label class="textarea-label">Answer Suggestion</label>
				<textarea class="output-container" bind:value={generatedAnswerSuggestion} />
			</div>
		{/if}
	</div>
</div>

<style global>
	@font-face {
		font-family: gotham-medium;
		src: url('/gotham/GothamRnd-Medium.woff');
	}

	@font-face {
		font-family: gotham;
		src: url('/gotham/GothamRnd-Book.otf');
	}

	.loading-overlay {
		background-color: rgba(193, 193, 193, 0.4);
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: gotham-medium;
		font-size: 18px;
		animation: fadeIn 1s;
		animation: fadeOut 1s;
	}

	.disclaimer {
		background-color: rgba(235, 235, 235, 0.4);
		padding: 4px 8px;
		border: 1px solid #FFBF00 !important;
		border-radius: 10px;
	}

	h1, h2, h3 {
		font-family: gotham-medium;
	}

	.wrapper {
		font-family: gotham;
		font-size: 14px;
		display: flex;
		justify-items: center;
		align-content: center;
		flex-direction: row;
		flex-wrap: wrap;
		width: 768px;
		margin: 32px auto 0 auto;
	}

	.row {
		width: 100%;
		margin: 8px 0;
	}
	
	.block-input {
		display: flex;
		justify-content: space-between;
		align-content: baseline;
		flex-direction: row;
		flex-wrap: wrap;
		width: 100%; 
	}

	.block-input > label {
		margin: auto 0;
	}

	.block-input > input {
		border: 1px solid #0074E8;
		padding: 6px;
		border-radius: 10px;
		width: 400px;
		font-family: gotham;
	}

	input[type=number]::-webkit-outer-spin-button,
	input[type=number]::-webkit-inner-spin-button {
		-webkit-appearance: none;
		-moz-appearance: none;
		apperance: none;
		margin: 0;
	}

	.block-button {
		display: flex;
		justify-content: flex-end;
		flex-direction: row;
		flex-wrap: wrap;
		width: 100%;	
	}

	button + button {
		margin-left: 8px;
	}

	.primary-button {
		background-color: #CCE5FF;
		border-radius: 25px;
		color: #036BD2;
		padding: 8px 12px;
		border: none;
		font-family: gotham-medium;
	}

	.primary-button:hover {
		color: #0A4478;
		cursor: pointer;
	}

	.primary-button:active {
		transform: translateY(1px);
	}

	.ghost-button {
		background-color: white;
		border-radius: 25px;
		border: 2px solid #0074E8;
		padding: 8px 12px;
		color: #0074E8;
		font-family: gotham-medium;
		font-weight: bold;
	}

	.ghost-button:hover {
		background-color: #E5F2FF;
		cursor: pointer;
	}

	.ghost-button:active {
		transform: translateY(1px);
	}

	.radio-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
	}

	.radio-container > label {
		width: 100%;
		display: flex;
		justify-content: flex-end;
	}

	.radio-container > label > input {
		margin-right: 8px;
	}

	.output-container {
		border: 1px solid #0074E8;
		padding: 6px;
		border-radius: 10px;
		width: 400px;
		font-family: gotham;
		height: 300px;
		resize: none;
		animation: fadeIn 1s;
	}

	@keyframes fadeIn {
		0% { opacity: 0; }
		100% { opacity: 1; }
	}

	@keyframes fadeOut {
		100% { opacity: 1; }
		0% { opacity: 0; }
	}

	.textarea-label {
		margin-top: 6.5px !important;
		animation: fadeIn 1s;
	}

	.lds-ellipsis {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
	}
	.lds-ellipsis div {
		position: absolute;
		top: 33px;
		width: 13px;
		height: 13px;
		border-radius: 50%;
		background: #036BD2;
		animation-timing-function: cubic-bezier(0, 1, 1, 0);
	}
	.lds-ellipsis div:nth-child(1) {
		left: 8px;
		animation: lds-ellipsis1 0.6s infinite;
	}
	.lds-ellipsis div:nth-child(2) {
		left: 8px;
		animation: lds-ellipsis2 0.6s infinite;
	}
	.lds-ellipsis div:nth-child(3) {
		left: 32px;
		animation: lds-ellipsis2 0.6s infinite;
	}
	.lds-ellipsis div:nth-child(4) {
		left: 56px;
		animation: lds-ellipsis3 0.6s infinite;
	}
	@keyframes lds-ellipsis1 {
		0% {
			transform: scale(0);
		}
		100% {
			transform: scale(1);
		}
	}
	@keyframes lds-ellipsis3 {
		0% {
			transform: scale(1);
		}
		100% {
			transform: scale(0);
		}
	}
	@keyframes lds-ellipsis2 {
		0% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(24px, 0);
		}
	}
</style>

<script lang="ts">
	let loading: boolean = false;

	// Generate Intent
	const generateIntentOptions = [ true, false ];
	let generateSingleIntent: boolean = false;
	let numberOfIntents: number = 2;
	let numberOfUtterances: number = 10;
	let companyType: string = '';
	let productType: string = '';
	let generatedResult: string = '';
	let intentResultGenerated = false;

	$: {
		if (generatedResult !== "") {
			intentResultGenerated = true;
		}
	}

	async function generateIntent() {
		// Set loading to true before we initialise the request
		loading = true;

		const res = await fetch(`/api/intent?numberOfIntents=${numberOfIntents}&numberOfUtterances=${numberOfUtterances}&
			companyType=${companyType}&productType=${productType}&generateSingleIntent=${generateSingleIntent}`);
		const { result, totalTokens } = await res.json();
		
		generatedResult = result;
		
		// Set loading to false after we've generated the intent
		loading = false;
	}

	// Generate Entity
	const entityTypes = [ 'regex', 'simple' ];
	let entityType: string = 'simple';
	let entityDescription: string = '';
	let numberOfWordsInEntity: number = 1;
	let generatedEntity: string = '';
	let entityGenerated: boolean = false;

	$: {
		if (generatedEntity !== '') {
			entityGenerated = true;
			console.log(generatedEntity);
		}
	}

	async function generateEntity() {
		// Set loading to truw before we initialise the request
		loading = true;

		const res = await fetch(`/api/entity?entityType=${entityType}&entityDescription=${entityDescription}&numberOfWordsInEntity=${numberOfWordsInEntity}`);

		const { result, totalTokens } = await res.json();

		generatedEntity = result;

		// Set loading to false after we've generated the entity
		loading = false;
	}

	// Spelling and grammar check + answer suggestions
	let question = '';
	let generatedAnswerSuggestion = '';
	let answerSuggestionGenerated = false; 

	$: {
		if (generatedAnswerSuggestion !== '') {
			answerSuggestionGenerated = true;
		}
	}
	
	async function createAnswerSuggestion() {
		// Set loading to truw before we initialise the request
		loading = true;

		const res = await fetch(`/api/answersuggestion?question=${question}`);
		const { result } = await res.json();

		generatedAnswerSuggestion = result;

		// Set loading to false after we've generated the entity
		loading = false;
	}

	async function spellingCheck() {
		// Set loading to truw before we initialise the request
		loading = true;

		const res = await fetch(`/api/spellingcheck?question=${question}`);

		const { result } = await res.json();

		question = result;

		// Set loading to false after we've generated the entity
		loading = false;
	}
</script>
