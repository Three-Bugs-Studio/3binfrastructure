<script lang="ts">
	import Topics from '#lib/Topics.svelte';
	import { devops } from '#lib/devops.js';
</script>

<svelte:head>
	<title>DevOps | 3B Infrastructure</title>
	<meta
		name="description"
		content="Animated, hand-drawn notes on DevOps: CI/CD, Docker, Kubernetes, Infrastructure as Code, deployment strategies, observability and SRE."
	/>
</svelte:head>

<Topics
	title="DevOps"
	intro="How teams ship software often and safely: from the first commit, through the pipeline, to keeping it running in production."
	topics={devops}
/>
