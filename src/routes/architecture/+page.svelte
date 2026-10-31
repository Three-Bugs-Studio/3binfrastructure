<script lang="ts">
	import Topics from '#lib/Topics.svelte';
	import { architecture } from '#lib/architecture.js';
</script>

<svelte:head>
	<title>System Architecture | 3B Infrastructure</title>
	<meta
		name="description"
		content="Animated, hand-drawn notes on system architecture: styles, trade-offs, how to design a system, and C4 diagrams."
	/>
</svelte:head>

<Topics
	title="System Architecture"
	intro="How the big pieces of a software system fit together, and what each choice costs you. Each note uses the kind of diagram that suits it, and the last part draws one shop at every C4 level."
	topics={architecture}
	source={{
		label: "Catio's guide to system architecture",
		url: 'https://www.catio.tech/blog/system-architecture'
	}}
/>
