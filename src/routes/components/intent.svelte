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

<script lang="ts">
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
		const res = await fetch(`/api/intent?numberOfIntents=${numberOfIntents}&numberOfUtterances=${numberOfUtterances}&
			companyType=${companyType}&productType=${productType}&generateSingleIntent=${generateSingleIntent}`);
		const { result, totalTokens } = await res.json();
		
		generatedResult = result;
	}
</script>
