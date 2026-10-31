import assert from 'node:assert/strict';
import { test } from 'node:test';
import { architecture } from '../src/lib/architecture.ts';
import { courses } from '../src/lib/courses.ts';
import { databases } from '../src/lib/databases.ts';
import { edgePath, size, SKETCH_WIDTH } from '../src/lib/sketch.ts';

const topics = [...architecture, ...databases];
const sketches = topics.flatMap((t) => (t.sketch ? [t.sketch] : []));

test('topic ids are unique within a page, since they are anchors', () => {
	for (const list of [architecture, databases]) {
		const ids = list.map((t) => t.id);
		assert.equal(new Set(ids).size, ids.length);
	}
});

test('every topic shows a sketch or a table', () => {
	for (const t of topics) assert.ok(t.sketch || t.table, t.id);
});

test('sketch nodes fit their canvas and do not overlap', () => {
	for (const { alt, h, nodes } of sketches) {
		for (const n of nodes) {
			const s = size(n);
			if (n.shape === 'text') continue;
			assert.ok(n.x - s.w / 2 >= 0 && n.x + s.w / 2 <= SKETCH_WIDTH, `${n.id} x: ${alt}`);
			assert.ok(n.y - s.h / 2 >= 0 && n.y + s.h / 2 <= h, `${n.id} y: ${alt}`);
		}
		for (const a of nodes) {
			for (const b of nodes) {
				if (a === b || a.shape === 'text' || b.shape === 'text') continue;
				const dx = Math.abs(a.x - b.x) - (size(a).w + size(b).w) / 2;
				const dy = Math.abs(a.y - b.y) - (size(a).h + size(b).h) / 2;
				assert.ok(dx >= 0 || dy >= 0, `${a.id} overlaps ${b.id}: ${alt}`);
			}
		}
	}
});

test('sketch edges join real nodes, and each pair appears once', () => {
	for (const { alt, nodes, edges } of sketches) {
		const ids = nodes.map((n) => n.id);
		assert.equal(new Set(ids).size, ids.length, alt);
		for (const e of edges) assert.ok(ids.includes(e.from) && ids.includes(e.to), alt);
		const keys = edges.map((e) => e.from + e.to);
		assert.equal(new Set(keys).size, keys.length, alt);
	}
});

test('edgePath stops short of both boxes and points at the target', () => {
	const a = { id: 'a', label: 'a', x: 50, y: 50, w: 40, h: 40 };
	const b = { id: 'b', label: 'b', x: 250, y: 50, w: 40, h: 40 };
	const { line, head } = edgePath(a, b);
	assert.equal(line, 'M77 50Q150 60 223 50'); // 7px clear of each box, bowed by 7%
	assert.ok(head.includes('L223 50L'));
});

test('course links are https and not repeated', () => {
	const urls = courses.flatMap((s) => s.courses.map((c) => c.url));
	for (const url of urls) assert.equal(new URL(url).protocol, 'https:');
	assert.equal(new Set(urls).size, urls.length);
});
