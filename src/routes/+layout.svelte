<script lang="ts">
	import '../app.css';
	import favicon from '#lib/assets/favicon.svg';
	import logo from '#lib/assets/logo.svg';
	import { asset, resolve } from '$app/paths';
	import { page } from '$app/state';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	const links = [
		{ href: resolve('/architecture'), label: 'Architecture' },
		{ href: resolve('/databases'), label: 'Databases' },
		{ href: resolve('/aws'), label: 'AWS Scaling' },
		{ href: resolve('/devops'), label: 'DevOps' },
		{ href: resolve('/vps'), label: 'VPS Deploy' },
		{ href: resolve('/subjects'), label: 'Subjects' },
		{ href: resolve('/courses'), label: 'Courses' }
	];
</script>

<svelte:head>
	<link rel="icon" href={asset('favicon.ico')} sizes="32x32" />
	<link rel="icon" href={favicon} type="image/svg+xml" />
	<link rel="apple-touch-icon" href={asset('apple-touch-icon.png')} />
	<link rel="manifest" href={asset('site.webmanifest')} />
	<meta name="theme-color" content="#ffe761" />
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
	<a class="brand" href={resolve('/')}><img src={logo} alt="3B Infrastructure home" /></a>
	<nav class="chips" aria-label="Main">
		{#each links as link (link.href)}
			<a
				href={link.href}
				aria-current={page.url.pathname.startsWith(link.href) ? 'page' : undefined}
			>
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
		rotate: -1deg;
	}

	.brand img {
		display: block;
		height: 3.75rem;
		max-width: 100%;
	}

	footer {
		padding-block: 2rem;
		color: var(--ink-soft);
		text-align: center;
	}
</style>
