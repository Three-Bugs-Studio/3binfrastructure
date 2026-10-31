import assert from 'node:assert/strict';
import { test } from 'node:test';
import { architecture } from '../src/lib/architecture.ts';
import { aws } from '../src/lib/aws.ts';
import { courses, path } from '../src/lib/courses.ts';
import { databases } from '../src/lib/databases.ts';
import { devops } from '../src/lib/devops.ts';
import { edgePath, size, SKETCH_WIDTH } from '../src/lib/sketch.ts';
import { computing } from '../src/lib/subjects/computing.ts';
import { embedded } from '../src/lib/subjects/embedded.ts';
import { foundations } from '../src/lib/subjects/foundations.ts';
import { software } from '../src/lib/subjects/software.ts';
import { vps } from '../src/lib/vps.ts';

const subjects = [...foundations, ...computing, ...software, ...embedded];
const pages = [architecture, databases, aws, devops, vps, ...subjects.map((s) => s.topics)];
const topics = pages.flat();
const sketches = [...topics.map((t) => t.sketch), path];
const unboxed = ['text', 'boundary', 'dot'];

test('topic ids are unique within a page, since they are anchors', () => {
	for (const list of pages) {
		const ids = list.map((t) => t.id);
		assert.equal(new Set(ids).size, ids.length);
	}
});

test('all 16 subjects exist, with unique page addresses and at least three topics', () => {
	assert.equal(subjects.length, 16);
	assert.equal(new Set(subjects.map((s) => s.slug)).size, 16);
	for (const s of subjects) assert.ok(s.topics.length >= 3, s.slug);
});

test('every topic has an animated demo with at least three steps', () => {
	for (const t of topics) assert.ok(t.sketch?.steps?.length >= 3, t.id);
});

test('every demo moves something or changes the picture on each step after the first', () => {
	for (const { alt, steps } of sketches) {
		for (const step of steps.slice(1)) {
			const change = step.send || step.light || step.down || step.hide || step.set;
			assert.ok(change || steps.indexOf(step) === steps.length - 1, `${step.say}: ${alt}`);
		}
	}
});

test('every diagram says what kind of diagram it is', () => {
	for (const s of sketches) assert.ok(s.kind, s.alt);
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
				if (a === b || unboxed.includes(a.shape) || unboxed.includes(b.shape)) continue;
				const dx = Math.abs(a.x - b.x) - (size(a).w + size(b).w) / 2;
				const dy = Math.abs(a.y - b.y) - (size(a).h + size(b).h) / 2;
				assert.ok(dx >= 0 || dy >= 0, `${a.id} overlaps ${b.id}: ${alt}`);
			}
		}
	}
});

test('sketch edges and demo steps only mention real nodes', () => {
	for (const { alt, nodes, edges, steps } of sketches) {
		const ids = nodes.map((n) => n.id);
		assert.equal(new Set(ids).size, ids.length, alt);
		for (const e of edges) assert.ok(ids.includes(e.from) && ids.includes(e.to), alt);
		const keys = edges.map((e) => e.from + e.to);
		assert.equal(new Set(keys).size, keys.length, alt);
		for (const step of steps) {
			const used = [
				...(step.send ?? []).flat(),
				...(step.light ?? []),
				...(step.down ?? []),
				...(step.hide ?? []),
				...Object.keys(step.set ?? {})
			];
			for (const id of used) assert.ok(ids.includes(id), `${id} in "${step.say}"`);
		}
	}
});

test('a demo never sends a dot from or to a hidden node', () => {
	for (const { steps } of sketches) {
		for (const step of steps) {
			for (const id of (step.send ?? []).flat()) {
				assert.ok(!step.hide?.includes(id), `${id} in "${step.say}"`);
			}
		}
	}
});

test('edgePath stops short of both boxes and points at the target', () => {
	const a = { id: 'a', label: 'a', x: 50, y: 50, w: 40, h: 40 };
	const b = { id: 'b', label: 'b', x: 250, y: 50, w: 40, h: 40 };
	const { line, head } = edgePath(a, b);
	assert.equal(line, 'M77 50Q150 60 223 50'); // 7px clear of each box, bowed by 7%
	assert.ok(head.includes('L223 50L'));
});

test('a dot rides the drawn line from start to end', () => {
	const a = { id: 'a', label: 'a', x: 50, y: 50, w: 40, h: 40 };
	const b = { id: 'b', label: 'b', x: 250, y: 50, w: 40, h: 40 };
	const { point } = edgePath(a, b);
	assert.deepEqual(point(0), { x: 77, y: 50 });
	assert.deepEqual(point(1), { x: 223, y: 50 });
	assert.equal(point(0.5).y, 55);
});

test('course and reference links are https and not repeated within a list', () => {
	const urls = courses.flatMap((s) => s.courses.map((c) => c.url));
	for (const url of urls) assert.equal(new URL(url).protocol, 'https:');
	assert.equal(new Set(urls).size, urls.length);
	for (const t of topics) {
		for (const [, url] of t.links ?? []) assert.equal(new URL(url).protocol, 'https:', t.id);
	}
});
