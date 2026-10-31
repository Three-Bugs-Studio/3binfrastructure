<script lang="ts">
	import { resolve } from '$app/paths';
	import Topics from '#lib/Topics.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const subject = $derived(data.subject);
</script>

<svelte:head>
	<title>{subject.title} | 3B Infrastructure</title>
	<meta name="description" content={subject.blurb} />
</svelte:head>

<p class="back"><a href={resolve('/subjects')}>All subjects</a></p>

<!-- a fresh set of demos per subject, so step counters never carry over -->
{#key subject.slug}
	<Topics title={subject.title} intro={subject.blurb} topics={subject.topics} />
{/key}

<style>
	.back {
		margin: 1rem 0 -1.5rem;
	}
</style>
