<script lang="ts">
	import Topics from '#lib/Topics.svelte';
	import { architecture } from '#lib/architecture.js';
</script>

<svelte:head>
	<title>System Architecture | 3B Infrastructure</title>
	<meta
		name="description"
		content="Hand-drawn notes on system architecture: layers, microservices, scaling, caching, queues and reliability."
	/>
</svelte:head>

<Topics
	title="System Architecture"
	intro="How the big pieces of a software system fit together, and what each choice costs you. Read in order, or jump straight to a topic."
	topics={architecture}
/>
