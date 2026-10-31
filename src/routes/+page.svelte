<script lang="ts">
	import { resolve } from '$app/paths';
	import Demo from '#lib/Demo.svelte';
	import { architecture } from '#lib/architecture.js';
	import { aws } from '#lib/aws.js';
	import { courses } from '#lib/courses.js';
	import { databases } from '#lib/databases.js';
	import { devops } from '#lib/devops.js';
	import type { Sketch } from '#lib/sketch.js';
	import { subjects } from '#lib/subjects/index.js';
	import { vps } from '#lib/vps.js';

	const hero: Sketch = {
		kind: 'A tiny system',
		alt: 'A small system: a user reaches a load balancer that shares requests between two app servers, which use a cache and a database.',
		h: 250,
		nodes: [
			{ id: 'user', label: 'You', x: 35, y: 105, shape: 'person' },
			{ id: 'lb', label: 'Load\nbalancer', x: 160, y: 125, w: 100, h: 64, fill: 'yellow' },
			{ id: 'a', label: 'App', x: 300, y: 55, w: 80, fill: 'sky' },
			{ id: 'b', label: 'App', x: 300, y: 195, w: 80, fill: 'sky' },
			{ id: 'cache', label: 'Cache', x: 430, y: 55, w: 88, fill: 'pink' },
			{ id: 'db', label: 'Database', x: 425, y: 195, w: 96, h: 74, shape: 'db', fill: 'mint' }
		],
		edges: [
			{ from: 'user', to: 'lb' },
			{ from: 'lb', to: 'a' },
			{ from: 'lb', to: 'b' },
			{ from: 'a', to: 'cache' },
			{ from: 'a', to: 'db' },
			{ from: 'b', to: 'db' }
		],
		steps: [
			{
				say: 'You click a link, and your request sets off.',
				send: [['user', 'lb']],
				light: ['user']
			},
			{
				say: 'A load balancer picks a server that is not busy.',
				send: [['lb', 'a']],
				light: ['lb']
			},
			{
				say: 'The server checks the cache, the quickest place to look.',
				send: [['a', 'cache']],
				light: ['cache']
			},
			{
				say: 'It is not there, so the server asks the database.',
				send: [['a', 'db']],
				light: ['db']
			},
			{
				say: 'If one server dies, the other carries on and you never notice.',
				down: ['a'],
				send: [
					['lb', 'b'],
					['b', 'db']
				]
			}
		]
	};

	const sections = [
		{
			href: resolve('/architecture'),
			title: 'System Architecture',
			text: 'Architecture styles, trade-offs, how to design a system, and C4 diagrams at every level.',
			count: `${architecture.length} topics`,
			color: 'var(--yellow)',
			tilt: '-1.5deg'
		},
		{
			href: resolve('/databases'),
			title: 'Database Concepts',
			text: 'Keys, normalization, ACID, indexes, replication, sharding, CAP and NoSQL.',
			count: `${databases.length} topics`,
			color: 'var(--sky)',
			tilt: '1deg'
		},
		{
			href: resolve('/aws'),
			title: 'AWS Scaling',
			text: 'Load balancing, Auto Scaling, Lambda, queues and databases that grow with you.',
			count: `${aws.length} topics`,
			color: 'var(--mint)',
			tilt: '0.75deg'
		},
		{
			href: resolve('/devops'),
			title: 'DevOps',
			text: 'CI/CD, Docker, Kubernetes, safe releases, observability and incident response.',
			count: `${devops.length} topics`,
			color: 'var(--pink)',
			tilt: '-1deg'
		},
		{
			href: resolve('/vps'),
			title: 'VPS Deploy',
			text: 'What to do after buying a VPS, and what goes wrong at each step if you skip it.',
			count: `${vps.length} steps`,
			color: 'var(--yellow)',
			tilt: '1deg'
		},
		{
			href: resolve('/subjects'),
			title: 'Subjects',
			text: 'From engineering maths and C to Arduino, Nuvoton and real-time Raspberry Pi.',
			count: `${subjects.length} subjects`,
			color: 'var(--mint)',
			tilt: '-1deg'
		},
		{
			href: resolve('/courses'),
			title: 'Courses',
			text: 'A hand-picked path from your first program to distributed systems.',
			count: `${courses.length} steps`,
			color: 'var(--sky)',
			tilt: '-0.75deg'
		}
	];
</script>

<svelte:head>
	<title>3B Infrastructure | Hand-drawn notes on building software</title>
	<meta
		name="description"
		content="Learn system architecture, database concepts and software engineering courses through simple hand-drawn notes."
	/>
</svelte:head>

<section class="hero">
	<div>
		<h1>How software really works, <span class="hl">drawn by hand.</span></h1>
		<p class="intro">
			A notebook of plain-English explanations and scribbled diagrams on system architecture,
			databases, and the courses worth taking. Pick a page and start reading.
		</p>
	</div>
	<Demo sketch={hero} />
</section>

<ul class="cards">
	{#each sections as section (section.href)}
		<li style:--note={section.color} style:--tilt={section.tilt}>
			<h2><a href={section.href}>{section.title}</a></h2>
			<p>{section.text}</p>
			<p class="count">{section.count}</p>
		</li>
	{/each}
</ul>

<style>
	.hero {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2.5rem;
		align-items: center;
		margin-block: 1rem 3.5rem;
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(17rem, 100%), 1fr));
		gap: 2.25rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		position: relative;
		display: flex;
		flex-direction: column;
		padding: 1.75rem 1.5rem 1.25rem;
		background: var(--note);
		box-shadow: 2px 5px 9px rgb(0 0 0 / 0.18);
		rotate: var(--tilt);
	}

	/* strip of tape holding the note to the page */
	li::before {
		content: '';
		position: absolute;
		top: -0.75rem;
		left: calc(50% - 3rem);
		width: 6rem;
		height: 1.5rem;
		background: rgb(255 255 255 / 0.65);
		box-shadow: 0 1px 2px rgb(0 0 0 / 0.2);
		rotate: -3deg;
	}

	h2 {
		margin: 0 0 0.5rem;
	}

	a {
		color: var(--ink);
	}

	/* the whole note is the link target */
	a::after {
		content: '';
		position: absolute;
		inset: 0;
	}

	p {
		margin: 0;
	}

	.count {
		margin-top: auto;
		padding-top: 0.75rem;
		color: var(--ink-soft);
	}

	@media (prefers-reduced-motion: no-preference) {
		li {
			transition: rotate 0.15s;
		}

		li:hover {
			rotate: 0deg;
		}
	}

	@media (max-width: 52rem) {
		.hero {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
