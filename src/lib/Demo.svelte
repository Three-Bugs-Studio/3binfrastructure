<script lang="ts">
	import { onDestroy } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import { prefersReducedMotion, Tween } from 'svelte/motion';
	import { fade } from 'svelte/transition';
	import SketchDrawing from '#lib/Sketch.svelte';
	import type { Sketch } from '#lib/sketch.js';

	let { sketch }: { sketch: Sketch } = $props();

	const FLIGHT = 1100;
	const SPEEDS = [0.5, 1, 2];

	let index = $state(0);
	let playing = $state(false);
	let speed = $state(1);
	let timer: ReturnType<typeof setTimeout>;
	const flight = new Tween(1, { easing: cubicInOut });

	const last = $derived(sketch.steps.length - 1);
	const step = $derived(sketch.steps[index]);
	const stamp = $derived(step.say.match(/^(SKIPPED|SET UP): /)?.[0]);
	// long captions stay up longer, so slow readers are not rushed
	const dwell = $derived((FLIGHT + 1400 + step.say.length * 35) / speed);
	const still = $derived(prefersReducedMotion.current);

	function show(i: number) {
		index = i;
		flight.set(0, { duration: 0 });
		flight.set(1, { duration: still ? 0 : FLIGHT / speed });
	}

	function waitForReader() {
		timer = setTimeout(() => {
			if (index === last) {
				playing = false;
				return;
			}
			show(index + 1);
			waitForReader();
		}, dwell);
	}

	function play() {
		clearTimeout(timer);
		playing = !playing;
		if (!playing) return;
		show(index === last ? 0 : index);
		waitForReader();
	}

	function jump(i: number) {
		if (i < 0 || i > last) return;
		clearTimeout(timer);
		playing = false;
		show(i);
	}

	function faster() {
		speed = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length];
		if (!playing) return;
		clearTimeout(timer);
		waitForReader();
	}

	function keys(e: KeyboardEvent) {
		if (e.key === 'ArrowRight') jump(index + 1);
		else if (e.key === 'ArrowLeft') jump(index - 1);
		else if (e.key === 'Home') jump(0);
		else if (e.key === 'End') jump(last);
		else if (e.key === 'k' || (e.key === ' ' && e.target === e.currentTarget)) play();
		else return;
		e.preventDefault();
	}

	onDestroy(() => clearTimeout(timer));
</script>

<!-- focusable so arrow keys work anywhere in the demo, not only on a button -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
<section
	class="demo"
	aria-label="Animation demo. Arrow keys step, space plays."
	tabindex="0"
	onkeydown={keys}
>
	<p class="kind">{sketch.kind}</p>
	<SketchDrawing {sketch} {step} flight={flight.current} />

	<div class="track" aria-hidden="true">
		{#key `${index}-${playing}-${speed}`}
			<span
				class="fill"
				class:run={playing && index < last && !still}
				style:width="{(index / Math.max(last, 1)) * 100}%"
				style:--dwell="{dwell}ms"
				style:--next="{((index + 1) / Math.max(last, 1)) * 100}%"
			></span>
		{/key}
	</div>

	<p class="say" aria-live="polite">
		{#key index}
			<span in:fade={{ duration: still ? 0 : 250 }}>
				<span class="count">{index + 1}/{sketch.steps.length}</span>
				{#if stamp}
					<strong class="stamp" class:bad={stamp.startsWith('SKIPPED')}>{stamp.slice(0, -2)}</strong
					>
					{step.say.slice(stamp.length)}
				{:else}
					{step.say}
				{/if}
			</span>
		{/key}
	</p>

	<div class="controls">
		<button class="main" onclick={play} aria-keyshortcuts="k">
			{playing ? '❚❚ Pause' : index === last ? '↻ Replay' : '▶ Play'}
		</button>
		<button onclick={() => jump(index - 1)} disabled={index === 0} aria-label="Previous step"
			>◀</button
		>
		<ol class="pips">
			{#each sketch.steps as s, i (i)}
				<li>
					<button
						class:done={i < index}
						class:now={i === index}
						onclick={() => jump(i)}
						aria-label="Step {i + 1}: {s.say}"
						aria-current={i === index ? 'step' : undefined}
					></button>
				</li>
			{/each}
		</ol>
		<button onclick={() => jump(index + 1)} disabled={index === last} aria-label="Next step"
			>▶</button
		>
		<button class="speed" onclick={faster} aria-label="Playback speed {speed}x, change"
			>{speed}×</button
		>
	</div>
</section>

<style>
	.demo {
		padding: 0.75rem;
		border: 2px dashed var(--ink-soft);
		border-radius: 14px 20px 12px 22px / 20px 12px 22px 14px;
		background: var(--card);
	}

	.demo:focus-visible {
		outline: 3px dashed var(--red);
		outline-offset: 4px;
	}

	.kind {
		width: fit-content;
		margin: 0 0 0.5rem;
		padding-inline: 0.5rem;
		background: var(--sky);
		font-size: 1rem;
		rotate: -1deg;
	}

	/* fills towards the next step while playing, so you can see when it moves on */
	.track {
		height: 6px;
		margin-top: 0.6rem;
		border: 1.5px solid var(--ink);
		border-radius: 6px;
		overflow: hidden;
	}

	.fill {
		display: block;
		height: 100%;
		background: var(--red);
	}

	.fill.run {
		animation: fill var(--dwell) linear forwards;
	}

	@keyframes fill {
		to {
			width: var(--next);
		}
	}

	.say {
		min-height: 5.8rem;
		margin: 0.6rem 0 0.5rem;
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
		align-items: center;
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

	.speed {
		margin-left: auto;
		font-family: var(--font-title);
	}

	.pips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.pips button {
		width: 1.35rem;
		height: 1.35rem;
		padding: 0;
		border-radius: 50% 45% 55% 50%;
		transition:
			background 0.2s,
			scale 0.2s;
	}

	.pips .done {
		background: var(--ink-soft);
	}

	.pips .now {
		background: var(--red);
		scale: 1.25;
	}

	@media (prefers-reduced-motion: reduce) {
		.pips button {
			transition: none;
		}
	}
</style>
