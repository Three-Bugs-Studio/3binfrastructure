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
	const dwell = $derived((FLIGHT + 1400 + (step.say + step.detail).length * 35) / speed);
	const still = $derived(prefersReducedMotion.current);
	// the legend lists only the marks this demo actually uses
	const legend = $derived(
		(
			[
				['send', 'dot', 'data moving'],
				['light', 'ring', 'look here'],
				['down', 'cross', 'down or gone']
			] as const
		).filter(([key]) => sketch.steps.some((s) => s[key]))
	);

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

	function replay() {
		playing = false;
		index = 0;
		play();
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
		else if (e.key === 'r') replay();
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
	aria-label="Animation demo. Arrow keys step, space plays, R replays."
	tabindex="0"
	onkeydown={keys}
>
	<div class="layout">
		<div class="stage">
			<p class="kind">{sketch.kind}</p>
			<SketchDrawing {sketch} {step} flight={flight.current} />
			<div class="foot">
				<ul class="legend">
					{#each legend as [key, mark, label] (key)}
						<li><span class="mark {mark}" aria-hidden="true"></span>{label}</li>
					{/each}
				</ul>
				<button
					class="icon"
					onclick={replay}
					aria-label="Replay from the start"
					aria-keyshortcuts="r">↻</button
				>
				<button
					class="icon"
					onclick={play}
					aria-label={playing ? 'Pause' : 'Play'}
					aria-keyshortcuts="k">{playing ? '❚❚' : '▶'}</button
				>
				<button class="icon speed" onclick={faster} aria-label="Playback speed {speed}x, change"
					>{speed}×</button
				>
			</div>
		</div>

		<div class="panel">
			<p class="head">
				<span>Step {index + 1} of {sketch.steps.length}</span>
				{#if stamp}
					<strong class="stamp" class:bad={stamp.startsWith('SKIPPED')}>{stamp.slice(0, -2)}</strong
					>
				{/if}
			</p>
			<div class="story" aria-live="polite">
				{#key index}
					<div in:fade={{ duration: still ? 0 : 250 }}>
						<p class="title">{step.title}</p>
						<p class="say">{step.say.slice(stamp?.length ?? 0)}</p>
						<p class="detail">{step.detail}</p>
					</div>
				{/key}
			</div>
			<div class="nav">
				<button onclick={() => jump(index - 1)} disabled={index === 0}>← Back</button>
				<button class="next" onclick={() => jump(index === last ? 0 : index + 1)}>
					{index === last ? '↻ Start over' : `Next: ${sketch.steps[index + 1].title} →`}
				</button>
			</div>
			<p class="keys" aria-hidden="true">
				<kbd>←</kbd><kbd>→</kbd> step · <kbd>R</kbd> replay · <kbd>Space</kbd> play
			</p>
		</div>

		<ol class="steps">
			{#each sketch.steps as s, i (i)}
				<li>
					{#if i > 0}
						<!-- the line into the next step fills while playing, so you see when it moves on -->
						<span class="line" class:full={i <= index} aria-hidden="true">
							{#key `${index}-${playing}-${speed}`}
								<span
									class="fill"
									class:run={playing && i === index + 1 && !still}
									style:--dwell="{dwell}ms"
								></span>
							{/key}
						</span>
					{/if}
					<button
						class:done={i < index}
						class:now={i === index}
						onclick={() => jump(i)}
						aria-label="Step {i + 1}: {s.title}"
						aria-current={i === index ? 'step' : undefined}>{i + 1}</button
					>
				</li>
			{/each}
		</ol>
	</div>
</section>

<style>
	.demo {
		container-type: inline-size;
		padding: 0.75rem;
		border: 2px dashed var(--ink-soft);
		border-radius: 14px 20px 12px 22px / 20px 12px 22px 14px;
		background: var(--card);
	}

	.demo:focus-visible {
		outline: 3px dashed var(--red);
		outline-offset: 4px;
	}

	.layout {
		display: grid;
		grid-template-areas: 'stage' 'panel' 'steps';
		gap: 0.75rem;
	}

	/* wide enough: the story sits beside the drawing, like a lesson player */
	@container (min-width: 44rem) {
		.layout {
			grid-template-columns: minmax(0, 1fr) minmax(16rem, 21rem);
			grid-template-areas: 'stage panel' 'steps panel';
		}
	}

	.stage {
		grid-area: stage;
		padding: 0.6rem;
		border: 1.5px solid var(--ink-soft);
		border-radius: 12px;
		background: radial-gradient(var(--grid) 1.5px, transparent 1.5px) 0 0 / 18px 18px;
	}

	.kind {
		width: fit-content;
		margin: 0 0 0.5rem;
		padding-inline: 0.5rem;
		background: var(--sky);
		font-size: 1rem;
		rotate: -1deg;
	}

	.foot {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		margin-top: 0.4rem;
	}

	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: 0.2rem 0.9rem;
		margin: 0 auto 0 0;
		padding: 0;
		color: var(--ink-soft);
		font-size: 0.95rem;
		list-style: none;
	}

	.legend li {
		display: flex;
		align-items: center;
		gap: 0.3rem;
	}

	.mark {
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 50%;
	}

	.dot {
		border: 1.5px solid var(--ink);
		background: var(--red);
	}

	.ring {
		border: 2px solid var(--red);
	}

	.cross {
		background:
			linear-gradient(45deg, transparent 42%, var(--red) 42% 58%, transparent 58%),
			linear-gradient(-45deg, transparent 42%, var(--red) 42% 58%, transparent 58%);
		border-radius: 0;
	}

	.panel {
		grid-area: panel;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		margin: 0;
		color: var(--red);
		font-family: var(--font-title);
		font-size: 1.05rem;
	}

	.stamp {
		padding-inline: 0.4rem;
		border: 2px solid var(--ink);
		background: var(--mint);
		color: var(--ink);
		font-weight: 400;
		rotate: 2deg;
	}

	.stamp.bad {
		background: var(--red);
		color: var(--card);
	}

	/* very tall sketches would push the controls off screen on a wide page */
	.stage :global(svg) {
		max-height: 30rem;
	}

	.story {
		flex: 1;
		min-height: 9rem;
	}

	.story p {
		margin: 0 0 0.5rem;
	}

	.title {
		font-family: var(--font-title);
		font-size: 1.5rem;
		line-height: 1.1;
	}

	.say {
		font-size: 1.15rem;
		line-height: 1.3;
	}

	.detail {
		color: var(--ink-soft);
		font-size: 1.02rem;
		line-height: 1.35;
	}

	.nav {
		display: flex;
		gap: 0.5rem;
	}

	.nav button {
		flex: 1;
	}

	.nav .next {
		flex: 2;
		background: var(--yellow);
	}

	.keys {
		margin: 0;
		color: var(--ink-soft);
		font-size: 0.9rem;
	}

	kbd {
		margin-right: 0.15rem;
		padding: 0 0.3rem;
		border: 1.5px solid var(--ink-soft);
		border-radius: 4px;
		font: inherit;
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

	button:hover:enabled {
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

	.icon {
		min-width: 2.2rem;
		padding: 0.05rem 0.4rem;
		border-radius: 50% 45% 55% 50%;
	}

	.speed {
		font-family: var(--font-title);
	}

	.steps {
		grid-area: steps;
		display: flex;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.steps li {
		display: flex;
		flex: 1;
		align-items: center;
	}

	.steps li:first-child {
		flex: 0;
	}

	.line {
		flex: 1;
		height: 4px;
		margin-inline: 0.2rem;
		border-radius: 4px;
		background: var(--grid);
		overflow: hidden;
	}

	.fill {
		display: block;
		width: 0;
		height: 100%;
		background: var(--red);
	}

	.full .fill {
		width: 100%;
		background: var(--ink-soft);
	}

	.fill.run {
		animation: fill var(--dwell) linear forwards;
	}

	@keyframes fill {
		to {
			width: 100%;
		}
	}

	.steps button {
		width: 1.9rem;
		height: 1.9rem;
		padding: 0;
		border-radius: 50% 45% 55% 50%;
		font-family: var(--font-title);
		font-size: 1rem;
		transition:
			background 0.2s,
			scale 0.2s;
	}

	.steps .done {
		background: var(--mint);
	}

	.steps .now {
		background: var(--red);
		color: var(--card);
		scale: 1.15;
	}

	@media (prefers-reduced-motion: reduce) {
		.steps button {
			transition: none;
		}
	}
</style>
