<script lang="ts">
	import Demo from '#lib/Demo.svelte';
	import type { Topic } from '#lib/sketch.js';

	let {
		title,
		intro,
		topics,
		source
	}: {
		title: string;
		intro: string;
		topics: Topic[];
		source?: { label: string; url: string };
	} = $props();
</script>

<h1><span class="hl">{title}</span></h1>
<p class="intro">
	{intro}
	{#if source}Based on <a href={source.url} rel="external noopener">{source.label}</a>, rewritten in
		our own words.{/if}
	Press play on any sketch to watch it happen.
</p>

<nav class="chips" aria-label="On this page">
	{#each topics as topic (topic.id)}
		<a href="#{topic.id}">{topic.title}</a>
	{/each}
</nav>

{#each topics as topic, i (topic.id)}
	{#if topic.part}<h2 class="part"><span class="hl">{topic.part}</span></h2>{/if}
	<article id={topic.id} class="doodle">
		<h3><span class="num">{i + 1}</span> {topic.title}</h3>
		<div class="columns">
			<div>
				<p>{topic.summary}</p>
				<ul>
					{#each topic.points as [term, text] (term)}
						<li><strong>{term}:</strong> {text}</li>
					{/each}
				</ul>
				{#if topic.code}<pre><code>{topic.code}</code></pre>{/if}
			</div>
			<div class="side">
				<Demo sketch={topic.sketch} />
				{#if topic.table}
					<table>
						<thead>
							<tr>
								{#each topic.table.head as cell (cell)}<th scope="col">{cell}</th>{/each}
							</tr>
						</thead>
						<tbody>
							{#each topic.table.rows as [name, ...cells], r (r)}
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
			</div>
		</div>
		{#if topic.skip}<p class="note warn"><strong>If you skip this:</strong> {topic.skip}</p>{/if}
		<p class="note"><strong>Rule of thumb:</strong> {topic.tip}</p>
		{#if topic.links}
			<p class="links">
				Read more:
				{#each topic.links as [label, url], l (url)}
					{#if l > 0}·{/if}
					<a href={url} rel="external noopener">{label}</a>
				{/each}
			</p>
		{/if}
	</article>
{/each}

<style>
	.part {
		margin-block: 3.5rem -0.5rem;
	}

	article {
		margin-block: 2.5rem;
		padding: 1.5rem clamp(1rem, 4vw, 2.25rem) 1.75rem;
		scroll-margin-top: 1rem;
	}

	h3 {
		margin: 0 0 0.5rem;
		font-size: clamp(1.9rem, 4vw, 2.5rem);
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
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		gap: 2.5rem;
	}

	.columns p {
		margin-top: 0;
	}

	/* swap sides so a long page does not read like a form */
	article:nth-of-type(even) .side {
		order: -1;
	}

	.note {
		margin: 1.25rem 0 0;
		width: fit-content;
		max-width: 100%;
	}

	.warn {
		background: var(--pink);
		rotate: 0.4deg;
	}

	.links {
		margin: 1rem 0 0;
		font-size: 1.05rem;
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
		margin-top: 1.25rem;
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
		border-radius: 14px 18px 12px 20px / 18px 12px 20px 14px;
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
