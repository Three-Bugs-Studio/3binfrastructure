<script lang="ts">
	import {
		edgePath,
		size,
		SKETCH_WIDTH,
		type DemoStep,
		type Sketch,
		type SketchNode
	} from '#lib/sketch.js';
	import { prefersReducedMotion } from 'svelte/motion';
	import { fade } from 'svelte/transition';

	let { sketch, step, flight = 1 }: { sketch: Sketch; step?: DemoStep; flight?: number } = $props();

	const shown = (id: string) => !step?.hide?.includes(id);
	const node = (id: string) => sketch.nodes.find((n) => n.id === id)!;
	const nodes = $derived(sketch.nodes.filter((n) => shown(n.id)));
	const edges = $derived(sketch.edges.filter((e) => shown(e.from) && shown(e.to)));

	// the wire a dot rides on turns red, whichever way the dot travels
	const busy = (from: string, to: string) =>
		!!step?.send?.some(([a, b]) => (a === from && b === to) || (a === to && b === from));
	const appear = $derived({ duration: prefersReducedMotion.current ? 0 : 350 });

	// a rounded box as one path, so the red pen can draw it with pathLength
	const ring = (x: number, y: number, w: number, h: number, r = 12) =>
		`M${x + r} ${y}H${x + w - r}A${r} ${r} 0 0 1 ${x + w} ${y + r}V${y + h - r}A${r} ${r} 0 0 1 ${x + w - r} ${y + h}H${x + r}A${r} ${r} 0 0 1 ${x} ${y + h - r}V${y + r}A${r} ${r} 0 0 1 ${x + r} ${y}`;

	const fill = (n: SketchNode) => (n.fill ? `var(--${n.fill})` : 'var(--card)');

	// Person labels sit under the figure, boundary labels along the top edge.
	const labelY = (n: SketchNode, line: number, lines: number) => {
		if (n.shape === 'person') return n.y + 46 + line * 19;
		if (n.shape === 'boundary') return n.y - size(n).h / 2 + 15;
		return n.y + (line - (lines - 1) / 2) * 19;
	};
</script>

<svg viewBox="0 0 {SKETCH_WIDTH} {sketch.h}" role="img" aria-label={sketch.alt}>
	<g class="ink">
		{#each nodes as n (n.id)}
			{@const { w, h } = size(n)}
			{@const left = n.x - w / 2}
			{@const top = n.y - h / 2}
			<g class="node" class:off={step?.down?.includes(n.id)} in:fade={appear}>
				{#if n.shape === 'db'}
					<path
						fill={fill(n)}
						d="M{left} {top + 10}a{w / 2} 10 0 0 1 {w} 0v{h - 20}a{w / 2} 10 0 0 1 {-w} 0z"
					/>
					<path fill="none" d="M{left} {top + 10}a{w / 2} 10 0 0 0 {w} 0" />
				{:else if n.shape === 'person'}
					<circle cx={n.x} cy={n.y - 21} r="11" fill="var(--card)" />
					<path
						fill="none"
						d="M{n.x} {n.y - 10}v22M{n.x - 15} {n.y - 3}h30M{n.x} {n.y + 12}l-12 19M{n.x} {n.y +
							12}l12 19"
					/>
				{:else if n.shape === 'boundary'}
					<rect x={left} y={top} width={w} height={h} rx="10" fill="none" stroke-dasharray="9 7" />
				{:else if n.shape === 'lifeline'}
					<rect x={left} y={top} width={w} height={h} rx="7" fill={fill(n)} />
					<path fill="none" stroke-dasharray="6 7" d="M{n.x} {top + h}V{sketch.h - 6}" />
				{:else if n.shape !== 'text' && n.shape !== 'dot'}
					<rect x={left} y={top} width={w} height={h} rx="7" fill={fill(n)} />
				{/if}
			</g>
		{/each}

		{#each edges as e (e.from + e.to)}
			{@const path = edgePath(node(e.from), node(e.to))}
			<g class="wire" class:busy={busy(e.from, e.to)} in:fade={appear}>
				<path fill="none" d={path.line} stroke-dasharray={e.dashed ? '7 7' : undefined} />
				{#if !e.plain}<path fill="none" d={path.head} />{/if}
			</g>
		{/each}

		{#each nodes as n (n.id)}
			{@const { w, h } = size(n)}
			{@const left = n.x - w / 2}
			{@const top = n.y - h / 2}
			{#if step?.light?.includes(n.id)}
				<path class="mark draw" pathLength="1" d={ring(left - 5, top - 5, w + 10, h + 10)} />
			{/if}
			{#if step?.down?.includes(n.id)}
				<path
					class="mark draw"
					pathLength="1"
					d="M{left} {top}L{left + w} {top + h}M{left + w} {top}L{left} {top + h}"
				/>
			{/if}
		{/each}
	</g>

	{#each nodes as n (n.id)}
		{@const lines = (step?.set?.[n.id] ?? n.label).split('\n')}
		<text class:caption={n.shape === 'text' || n.shape === 'boundary'} in:fade={appear}>
			{#each lines as line, i (i)}
				<tspan x={n.x} y={labelY(n, i, lines.length)}>{line}</tspan>
			{/each}
		</text>
	{/each}

	{#each edges as e (e.from + e.to)}
		{#if e.label}
			{@const { mid } = edgePath(node(e.from), node(e.to))}
			<text class="edge" x={mid.x} y={mid.y}>{e.label}</text>
		{/if}
	{/each}

	{#if flight < 1}
		{#each step?.send ?? [] as [from, to], i (i)}
			{@const path = edgePath(node(from), node(to))}
			{#each [0.12, 0.06] as lag, t (t)}
				{@const tail = path.point(Math.max(0, flight - lag))}
				<circle class="trail" cx={tail.x} cy={tail.y} r={3 + t * 1.5} />
			{/each}
			{@const dot = path.point(flight)}
			<circle class="packet" cx={dot.x} cy={dot.y} r="7" />
		{/each}
	{/if}
</svg>

<style>
	svg {
		display: block;
		width: 100%;
		height: auto;
		overflow: visible;
	}

	.ink {
		stroke: var(--ink);
		stroke-width: 2.4;
		stroke-linecap: round;
		stroke-linejoin: round;
		filter: url(#sketch);
	}

	.node {
		transition: opacity 0.4s;
	}

	.off {
		opacity: 0.35;
	}

	.wire path {
		transition: stroke 0.3s;
	}

	.busy path {
		stroke: var(--red);
		stroke-width: 3;
	}

	/* the red pen draws each mark instead of it popping in */
	.draw {
		stroke-dasharray: 1;
		animation: pen 0.5s ease-out both;
	}

	@keyframes pen {
		from {
			stroke-dashoffset: 1;
		}
		to {
			stroke-dashoffset: 0;
		}
	}

	.trail {
		fill: var(--red);
		opacity: 0.35;
	}

	@media (prefers-reduced-motion: reduce) {
		.node,
		.wire path {
			transition: none;
		}

		.draw {
			animation: none;
		}
	}

	.mark {
		fill: none;
		stroke: var(--red);
		stroke-width: 3.2;
	}

	.packet {
		fill: var(--red);
		stroke: var(--ink);
		stroke-width: 2;
	}

	text {
		fill: var(--ink);
		font-size: 17px;
		text-anchor: middle;
		dominant-baseline: central;
	}

	.caption {
		fill: var(--blue);
		font-family: var(--font-title);
		font-size: 19px;
	}

	.edge {
		fill: var(--red);
		font-size: 15px;
		paint-order: stroke;
		stroke: var(--card);
		stroke-width: 5px;
		stroke-linejoin: round;
	}
</style>
