<script lang="ts">
	import Topics from '#lib/Topics.svelte';
	import { vps } from '#lib/vps.js';
</script>

<svelte:head>
	<title>Deploying on a VPS | 3B Infrastructure</title>
	<meta
		name="description"
		content="Everything to do after buying a VPS, step by step, with animated demos of what happens if you skip each step."
	/>
</svelte:head>

<Topics
	title="Deploying on a VPS"
	intro="Everything to do after buying a VPS, in order. Each demo plays the disaster first, marked SKIPPED, then the same moment marked SET UP."
	topics={vps}
/>
