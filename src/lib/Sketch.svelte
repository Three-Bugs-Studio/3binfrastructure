<script lang="ts">
	import {
		edgePath,
		size,
		SKETCH_WIDTH,
		type DemoStep,
		type Sketch,
		type SketchNode
	} from '#lib/sketch.js';

	let { sketch, step, flight = 1 }: { sketch: Sketch; step?: DemoStep; flight?: number } = $props();

	const shown = (id: string) => !step?.hide?.includes(id);
	const node = (id: string) => sketch.nodes.find((n) => n.id === id)!;
	const nodes = $derived(sketch.nodes.filter((n) => shown(n.id)));
	const edges = $derived(sketch.edges.filter((e) => shown(e.from) && shown(e.to)));

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
			<g class:off={step?.down?.includes(n.id)}>
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
			<path fill="none" d={path.line} stroke-dasharray={e.dashed ? '7 7' : undefined} />
			{#if !e.plain}<path fill="none" d={path.head} />{/if}
		{/each}

		{#each nodes as n (n.id)}
			{@const { w, h } = size(n)}
			{@const left = n.x - w / 2}
			{@const top = n.y - h / 2}
			{#if step?.light?.includes(n.id)}
				<rect class="mark" x={left - 5} y={top - 5} width={w + 10} height={h + 10} rx="12" />
			{/if}
			{#if step?.down?.includes(n.id)}
				<path
					class="mark"
					d="M{left} {top}L{left + w} {top + h}M{left + w} {top}L{left} {top + h}"
				/>
			{/if}
		{/each}
	</g>

	{#each nodes as n (n.id)}
		{@const lines = (step?.set?.[n.id] ?? n.label).split('\n')}
		<text class:caption={n.shape === 'text' || n.shape === 'boundary'}>
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
			{@const dot = edgePath(node(from), node(to)).point(flight)}
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

	.off {
		opacity: 0.35;
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
