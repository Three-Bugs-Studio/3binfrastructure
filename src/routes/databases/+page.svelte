<script lang="ts">
	import Topics from '#lib/Topics.svelte';
	import { databases } from '#lib/databases.js';
</script>

<svelte:head>
	<title>Database Concepts | 3B Infrastructure</title>
	<meta
		name="description"
		content="Hand-drawn notes on database concepts: keys, normalization, ACID, isolation, indexes, replication, sharding, CAP and NoSQL."
	/>
</svelte:head>

<Topics
	title="Database Concepts"
	intro="How data is modelled, kept safe and spread across machines. These ideas apply whichever database you end up using."
	topics={databases}
/>
