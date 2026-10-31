<script lang="ts">
	import { onDestroy } from 'svelte';
	import { prefersReducedMotion, Tween } from 'svelte/motion';
	import SketchDrawing from '#lib/Sketch.svelte';
	import type { Sketch } from '#lib/sketch.js';

	let { sketch }: { sketch: Sketch } = $props();

	const FLIGHT = 900;

	let index = $state(0);
	let playing = $state(false);
	let timer: ReturnType<typeof setTimeout>;
	const flight = new Tween(1);

	const last = $derived(sketch.steps.length - 1);
	const step = $derived(sketch.steps[index]);
	const stamp = $derived(step.say.match(/^(SKIPPED|SET UP): /)?.[0]);

	function show(i: number) {
		index = i;
		flight.set(0, { duration: 0 });
		flight.set(1, { duration: prefersReducedMotion.current ? 0 : FLIGHT });
	}

	function waitForReader() {
		timer = setTimeout(
			() => {
				if (index === last) {
					playing = false;
					return;
				}
				show(index + 1);
				waitForReader();
			},
			FLIGHT + 1400 + step.say.length * 35
		);
	}

	function play() {
		clearTimeout(timer);
		playing = !playing;
		if (!playing) return;
		show(index === last ? 0 : index);
		waitForReader();
	}

	function jump(i: number) {
		clearTimeout(timer);
		playing = false;
		show(i);
	}

	onDestroy(() => clearTimeout(timer));
</script>

<section class="demo" aria-label="Animation demo">
	<p class="kind">{sketch.kind}</p>
	<SketchDrawing {sketch} {step} flight={flight.current} />
	<p class="say" aria-live="polite">
		<span class="count">{index + 1}/{sketch.steps.length}</span>
		{#if stamp}
			<strong class="stamp" class:bad={stamp.startsWith('SKIPPED')}>{stamp.slice(0, -2)}</strong>
			{step.say.slice(stamp.length)}
		{:else}
			{step.say}
		{/if}
	</p>
	<div class="controls">
		<button class="main" onclick={play}>
			{playing ? '❚❚ Pause' : index === last ? '↻ Replay demo' : '▶ Play demo'}
		</button>
		<button onclick={() => jump(index - 1)} disabled={index === 0}>Back</button>
		<button onclick={() => jump(index + 1)} disabled={index === last}>Next</button>
	</div>
</section>

<style>
	.demo {
		padding: 0.75rem;
		border: 2px dashed var(--ink-soft);
		border-radius: 14px 20px 12px 22px / 20px 12px 22px 14px;
		background: var(--card);
	}

	.kind {
		width: fit-content;
		margin: 0 0 0.5rem;
		padding-inline: 0.5rem;
		background: var(--sky);
		font-size: 1rem;
		rotate: -1deg;
	}

	.say {
		min-height: 5.8rem;
		margin: 0.75rem 0 0.5rem;
		font-size: 1.15rem;
		line-height: 1.3;
	}

	.count {
		color: var(--red);
		font-family: var(--font-title);
	}

	.stamp {
		padding-inline: 0.4rem;
		border: 2px solid var(--ink);
		background: var(--mint);
		font-family: var(--font-title);
		font-weight: 400;
	}

	.stamp.bad {
		background: var(--red);
		color: var(--card);
	}

	.controls {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	button {
		padding: 0.1rem 0.8rem;
		border: 2px solid var(--ink);
		border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
		background: var(--card);
		color: var(--ink);
		font: inherit;
		font-size: 1.1rem;
		cursor: pointer;
	}

	button:hover:enabled,
	.main {
		background: var(--yellow);
	}

	button:disabled {
		opacity: 0.45;
		cursor: default;
	}

	button:focus-visible {
		outline: 3px dashed var(--red);
		outline-offset: 3px;
	}
</style>
