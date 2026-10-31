<script lang="ts">
	import Topics from '#lib/Topics.svelte';
	import { aws } from '#lib/aws.js';
</script>

<svelte:head>
	<title>Scalable Systems on AWS | 3B Infrastructure</title>
	<meta
		name="description"
		content="Animated, hand-drawn notes on building scalable systems on AWS: load balancing, Auto Scaling, Lambda, SQS, RDS, DynamoDB and more."
	/>
</svelte:head>

<Topics
	title="Scalable Systems on AWS"
	intro="How to grow a system on Amazon Web Services without falling over, from the Well-Architected Framework to a full reference design. Each note links to the official AWS docs."
	topics={aws}
/>
