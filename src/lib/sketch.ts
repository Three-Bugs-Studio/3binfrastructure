export type SketchNode = {
	id: string;
	label: string;
	x: number; // centre of the shape
	y: number;
	w?: number;
	h?: number;
	// list a boundary before the nodes inside it, so it is drawn behind them
	shape?: 'box' | 'db' | 'person' | 'text' | 'boundary' | 'lifeline' | 'dot';
	fill?: 'yellow' | 'pink' | 'mint' | 'sky';
};

export type SketchEdge = {
	from: string;
	to: string;
	label?: string;
	dashed?: boolean;
	plain?: boolean; // no arrow head
};

// Each step describes its whole picture, so stepping backwards needs no undo logic.
export type DemoStep = {
	say: string;
	send?: [from: string, to: string][]; // dots that travel between nodes
	light?: string[]; // circled in red pen
	down?: string[]; // crossed out
	hide?: string[]; // not on the page yet
	set?: Record<string, string>; // labels that differ during this step
};

export type Sketch = {
	kind: string; // the type of diagram, shown as a label
	alt: string;
	h: number;
	nodes: SketchNode[];
	edges: SketchEdge[];
	steps: DemoStep[];
};

export type Topic = {
	id: string;
	part?: string; // starts a new group of topics on the page
	title: string;
	summary: string;
	points: [term: string, text: string][];
	tip: string;
	skip?: string; // what goes wrong without this
	code?: string;
	sketch: Sketch;
	table?: { head: string[]; rows: string[][] };
	links?: [label: string, url: string][];
};

export type Subject = {
	slug: string;
	title: string;
	group: string;
	blurb: string;
	topics: Topic[];
};

// Every sketch shares one width so text stays the same size across diagrams.
export const SKETCH_WIDTH = 480;

export function size(n: SketchNode) {
	if (n.shape === 'person') return { w: n.w ?? 40, h: n.h ?? 64 };
	if (n.shape === 'dot') return { w: 0, h: 0 };
	if (n.shape === 'lifeline') return { w: n.w ?? 110, h: n.h ?? 38 };
	return { w: n.w ?? 110, h: n.h ?? 52 };
}

// Where a line from the centre of `a` towards `b` leaves the box around `a`.
function exitPoint(a: SketchNode, b: SketchNode) {
	const { w, h } = size(a);
	const dx = b.x - a.x;
	const dy = b.y - a.y;
	const gap = 7;
	const t = Math.min(
		dx ? (w / 2 + gap) / Math.abs(dx) : Infinity,
		dy ? (h / 2 + gap) / Math.abs(dy) : Infinity
	);
	return { x: Math.round(a.x + dx * t), y: Math.round(a.y + dy * t) };
}

export function edgePath(a: SketchNode, b: SketchNode) {
	const start = exitPoint(a, b);
	const end = exitPoint(b, a);
	// a slight bow makes a straight line look drawn by hand
	const cx = Math.round((start.x + end.x) / 2 - (end.y - start.y) * 0.07);
	const cy = Math.round((start.y + end.y) / 2 + (end.x - start.x) * 0.07);
	const angle = Math.atan2(end.y - cy, end.x - cx);
	const barb = (turn: number) =>
		`${(end.x - 13 * Math.cos(angle + turn)).toFixed(1)} ${(end.y - 13 * Math.sin(angle + turn)).toFixed(1)}`;
	// quadratic Bezier at t, so a dot can ride along the drawn line
	const point = (t: number) => ({
		x: (1 - t) ** 2 * start.x + 2 * (1 - t) * t * cx + t ** 2 * end.x,
		y: (1 - t) ** 2 * start.y + 2 * (1 - t) * t * cy + t ** 2 * end.y
	});

	return {
		line: `M${start.x} ${start.y}Q${cx} ${cy} ${end.x} ${end.y}`,
		head: `M${barb(0.5)}L${end.x} ${end.y}L${barb(-0.5)}`,
		mid: point(0.5),
		point
	};
}
