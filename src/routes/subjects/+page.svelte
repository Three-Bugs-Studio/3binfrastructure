<script lang="ts">
	import { resolve } from '$app/paths';
	import Demo from '#lib/Demo.svelte';
	import { groups, map, subjects } from '#lib/subjects/index.js';
</script>

<svelte:head>
	<title>Engineering Subjects | 3B Infrastructure</title>
	<meta
		name="description"
		content="Animated, hand-drawn notes on 16 engineering subjects, from maths and C programming to Arduino, Nuvoton and real-time Raspberry Pi."
	/>
</svelte:head>

<h1><span class="hl">Engineering Subjects</span></h1>
<p class="intro">
	The core ideas from each subject of a software engineering degree, explained in plain English with
	demos you can play. Use these as a first explanation or a revision aid, alongside your own course.
</p>

<div class="map"><Demo sketch={map} /></div>

{#each groups as group (group)}
	<section>
		<h2><span class="hl">{group}</span></h2>
		<ul>
			{#each subjects.filter((s) => s.group === group) as subject (subject.slug)}
				<li class="doodle">
					<h3>
						<a href={resolve('/subjects/[slug]', { slug: subject.slug })}>{subject.title}</a>
					</h3>
					<p>{subject.blurb}</p>
					<p class="count">{subject.topics.length} topics</p>
				</li>
			{/each}
		</ul>
	</section>
{/each}

<style>
	.map {
		max-width: 34rem;
		margin-top: 1.5rem;
	}

	section {
		margin-block: 3rem;
	}

	ul {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(19rem, 100%), 1fr));
		gap: 1.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		position: relative;
		display: flex;
		flex-direction: column;
		padding: 1.1rem 1.25rem;
	}

	h3 {
		margin: 0;
		font-size: 1.6rem;
	}

	/* the whole card is the link target */
	a::after {
		content: '';
		position: absolute;
		inset: 0;
	}

	p {
		margin: 0.4rem 0 0;
	}

	.count {
		margin-top: auto;
		padding-top: 0.5rem;
		color: var(--ink-soft);
		font-size: 1.05rem;
	}
</style>
