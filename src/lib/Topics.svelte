<script lang="ts">
	import Sketch from '#lib/Sketch.svelte';
	import type { Topic } from '#lib/sketch.js';

	let { title, intro, topics }: { title: string; intro: string; topics: Topic[] } = $props();
</script>

<h1><span class="hl">{title}</span></h1>
<p class="intro">{intro}</p>

<nav class="chips" aria-label="On this page">
	{#each topics as topic (topic.id)}
		<a href="#{topic.id}">{topic.title}</a>
	{/each}
</nav>

{#each topics as topic, i (topic.id)}
	<article id={topic.id} class="doodle">
		<h2><span class="num">{i + 1}</span> {topic.title}</h2>
		<div class="columns">
			<div>
				<p>{topic.summary}</p>
				<ul>
					{#each topic.points as [term, text] (term)}
						<li><strong>{term}:</strong> {text}</li>
					{/each}
				</ul>
			</div>
			<div class="side">
				{#if topic.sketch}<Sketch sketch={topic.sketch} />{/if}
				{#if topic.table}
					<table>
						<thead>
							<tr>
								{#each topic.table.head as cell (cell)}<th scope="col">{cell}</th>{/each}
							</tr>
						</thead>
						<tbody>
							{#each topic.table.rows as [name, ...cells] (name)}
								<tr>
									<th scope="row">{name}</th>
									{#each cells as cell, c (c)}
										<td class:bad={cell === 'possible'}>{cell}</td>
									{/each}
								</tr>
							{/each}
						</tbody>
					</table>
				{/if}
				{#if topic.code}<pre><code>{topic.code}</code></pre>{/if}
			</div>
		</div>
		<p class="note"><strong>Rule of thumb:</strong> {topic.tip}</p>
	</article>
{/each}

<style>
	article {
		margin-block: 2.5rem;
		padding: 1.5rem clamp(1rem, 4vw, 2.25rem) 1.75rem;
		scroll-margin-top: 1rem;
	}

	h2 {
		margin: 0 0 0.5rem;
	}

	.num {
		display: inline-grid;
		place-items: center;
		width: 2.6rem;
		height: 2.6rem;
		margin-right: 0.25rem;
		border: 2.5px solid var(--red);
		border-radius: 48% 52% 55% 45% / 55% 47% 53% 45%;
		color: var(--red);
		font-size: 0.8em;
		rotate: -6deg;
	}

	.columns {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2.5rem;
		align-items: center;
	}

	.columns p {
		margin-top: 0;
	}

	/* swap sides so a long page does not read like a form */
	article:nth-of-type(even) .side {
		order: -1;
	}

	.note {
		margin: 1.5rem 0 0;
		width: fit-content;
		max-width: 100%;
	}

	ul {
		margin: 0;
		padding-left: 1.25rem;
		list-style: '✎  ';
	}

	li + li {
		margin-top: 0.4rem;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 1rem;
	}

	th,
	td {
		padding: 0.4rem 0.5rem;
		border: 2px solid var(--ink);
		text-align: left;
	}

	thead th {
		background: var(--sky);
	}

	.bad {
		color: var(--red);
	}

	pre {
		margin: 1.25rem 0 0;
		padding: 1rem 1.25rem;
		border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
		background: var(--board);
		color: var(--chalk);
		font:
			0.82rem/1.55 ui-monospace,
			Consolas,
			monospace;
		white-space: pre-wrap;
	}

	@media (max-width: 52rem) {
		.columns {
			grid-template-columns: minmax(0, 1fr);
			gap: 1.25rem;
		}

		article:nth-of-type(even) .side {
			order: 0;
		}
	}
</style>
