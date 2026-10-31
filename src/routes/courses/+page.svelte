<script lang="ts">
	import { courses } from '#lib/courses.js';
</script>

<svelte:head>
	<title>Software Engineering Courses | 3B Infrastructure</title>
	<meta
		name="description"
		content="A hand-picked path of software engineering courses, from a first programming class to distributed systems."
	/>
</svelte:head>

<h1><span class="hl">Courses</span></h1>
<p class="intro">
	A hand-picked path through software engineering, mostly free university courses. Follow the steps
	in order, or start wherever your gaps are. Courses run on other sites, so check each page for its
	current dates and prices.
</p>

{#each courses as step, i (step.title)}
	<section>
		<h2><span class="step">Step {i + 1}</span> {step.title}</h2>
		<p class="why">{step.why}</p>
		<ul>
			{#each step.courses as course (course.url)}
				<li class="doodle">
					<h3><a href={course.url} rel="external noopener">{course.name}</a></h3>
					<p class="by">{course.by}</p>
					<p>{course.about}</p>
					<p class="cost">{course.cost}</p>
				</li>
			{/each}
		</ul>
	</section>
{/each}

<style>
	section {
		margin-block: 3rem;
	}

	h2 {
		margin-bottom: 0.25rem;
	}

	.step {
		color: var(--red);
	}

	.why {
		margin-top: 0;
		color: var(--ink-soft);
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
		display: flex;
		flex-direction: column;
		padding: 1.1rem 1.25rem;
	}

	h3 {
		margin: 0;
		font-size: 1.6rem;
	}

	p {
		margin: 0.25rem 0;
	}

	.by {
		color: var(--ink-soft);
	}

	.cost {
		align-self: flex-start;
		margin-top: auto;
		padding-inline: 0.4rem;
		background: var(--mint);
		font-size: 1rem;
		rotate: -1deg;
	}
</style>
