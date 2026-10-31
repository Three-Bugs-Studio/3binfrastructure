<script lang="ts">
	import '../app.css';
	import favicon from '#lib/assets/favicon.svg';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	const links = [
		{ href: resolve('/architecture'), label: 'System Architecture' },
		{ href: resolve('/databases'), label: 'Database Concepts' },
		{ href: resolve('/courses'), label: 'Courses' }
	];
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<svg width="0" height="0" aria-hidden="true" class="filters">
	<!-- pushes straight edges around a little so they look drawn by hand -->
	<filter id="sketch">
		<feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" seed="7" />
		<feDisplacementMap in="SourceGraphic" scale="4" xChannelSelector="R" yChannelSelector="G" />
	</filter>
</svg>

<a class="skip" href="#main">Skip to content</a>

<header>
	<a class="brand" href={resolve('/')}>3B <span class="hl">Infrastructure</span></a>
	<nav class="chips" aria-label="Main">
		{#each links as link (link.href)}
			<a href={link.href} aria-current={page.url.pathname === link.href ? 'page' : undefined}>
				{link.label}
			</a>
		{/each}
	</nav>
</header>

<main id="main">
	{@render children()}
</main>

<footer>Hand-drawn notes on building software. Free to read, nothing to sign up for.</footer>

<style>
	.filters {
		position: absolute;
	}

	.skip {
		position: absolute;
		left: -100vw;
	}

	.skip:focus {
		left: 1rem;
		top: 0.5rem;
		padding: 0.25rem 0.75rem;
		background: var(--yellow);
	}

	header,
	main,
	footer {
		max-width: 70rem;
		margin-inline: auto;
		padding-inline: 1rem;
	}

	header {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem 2rem;
		padding-block: 1.25rem;
	}

	.brand {
		color: var(--ink);
		font-family: var(--font-title);
		font-size: 2rem;
		text-decoration: none;
		rotate: -1deg;
	}

	footer {
		padding-block: 2rem;
		color: var(--ink-soft);
		text-align: center;
	}
</style>
