<script lang="ts">
	import { edgePath, size, SKETCH_WIDTH, type Sketch, type SketchNode } from '#lib/sketch.js';

	let { sketch }: { sketch: Sketch } = $props();

	const node = (id: string) => sketch.nodes.find((n) => n.id === id)!;

	const fill = (n: SketchNode) => (n.fill ? `var(--${n.fill})` : 'var(--card)');

	// Person labels sit under the figure; everything else is centred in its shape.
	const labelY = (n: SketchNode, line: number, lines: number) =>
		n.shape === 'person' ? n.y + 46 + line * 19 : n.y + (line - (lines - 1) / 2) * 19;
</script>

<svg viewBox="0 0 {SKETCH_WIDTH} {sketch.h}" role="img" aria-label={sketch.alt}>
	<g class="ink">
		{#each sketch.nodes as n (n.id)}
			{@const { w, h } = size(n)}
			{#if n.shape === 'db'}
				<path
					fill={fill(n)}
					d="M{n.x - w / 2} {n.y - h / 2 + 10}a{w / 2} 10 0 0 1 {w} 0v{h - 20}a{w /
						2} 10 0 0 1 {-w} 0z"
				/>
				<path fill="none" d="M{n.x - w / 2} {n.y - h / 2 + 10}a{w / 2} 10 0 0 0 {w} 0" />
			{:else if n.shape === 'person'}
				<circle cx={n.x} cy={n.y - 21} r="11" fill="var(--card)" />
				<path
					fill="none"
					d="M{n.x} {n.y - 10}v22M{n.x - 15} {n.y - 3}h30M{n.x} {n.y + 12}l-12 19M{n.x} {n.y +
						12}l12 19"
				/>
			{:else if n.shape !== 'text'}
				<rect x={n.x - w / 2} y={n.y - h / 2} width={w} height={h} rx="7" fill={fill(n)} />
			{/if}
		{/each}

		{#each sketch.edges as e (e.from + e.to)}
			{@const path = edgePath(node(e.from), node(e.to))}
			<path fill="none" d={path.line} stroke-dasharray={e.dashed ? '7 7' : undefined} />
			{#if !e.plain}<path fill="none" d={path.head} />{/if}
		{/each}
	</g>

	{#each sketch.nodes as n (n.id)}
		{@const lines = n.label.split('\n')}
		<text class:caption={n.shape === 'text'}>
			{#each lines as line, i (i)}
				<tspan x={n.x} y={labelY(n, i, lines.length)}>{line}</tspan>
			{/each}
		</text>
	{/each}

	{#each sketch.edges as e (e.from + e.to)}
		{#if e.label}
			{@const { mid } = edgePath(node(e.from), node(e.to))}
			<text class="edge" x={mid.x} y={mid.y}>{e.label}</text>
		{/if}
	{/each}
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

	text {
		fill: var(--ink);
		font-size: 17px;
		text-anchor: middle;
		dominant-baseline: central;
	}

	.caption {
		fill: var(--blue);
		font-family: var(--font-title);
		font-size: 22px;
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
