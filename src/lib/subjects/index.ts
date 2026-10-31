import type { Sketch } from '../sketch';
import { computing } from './computing.js';
import { embedded } from './embedded.js';
import { foundations } from './foundations.js';
import { software } from './software.js';

export const subjects = [...foundations, ...computing, ...software, ...embedded];

export const groups = [...new Set(subjects.map((s) => s.group))];

export const map: Sketch = {
	kind: 'Subject map',
	alt: 'How the subjects build on each other: engineering foundations lead to computing, then to software engineering and embedded systems.',
	h: 200,
	nodes: [
		{ id: 'base', label: 'Engineering\nfoundations', x: 75, y: 100, w: 130, h: 72, fill: 'sky' },
		{ id: 'comp', label: 'Computing\nand code', x: 240, y: 100, w: 124, h: 72, fill: 'yellow' },
		{ id: 'soft', label: 'Software\nengineering', x: 405, y: 45, w: 130, h: 66, fill: 'mint' },
		{ id: 'emb', label: 'Embedded\nsystems', x: 405, y: 155, w: 130, h: 66, fill: 'pink' }
	],
	edges: [
		{ from: 'base', to: 'comp' },
		{ from: 'comp', to: 'soft' },
		{ from: 'comp', to: 'emb' }
	],
	steps: [
		{ say: 'Maths, science and systems thinking explain how real things behave.', light: ['base'] },
		{
			say: 'Digital logic, C, C++, algorithms and theory turn that into working programs.',
			send: [['base', 'comp']],
			light: ['comp']
		},
		{
			say: 'Software engineering is how teams build large systems that last.',
			send: [['comp', 'soft']],
			light: ['soft']
		},
		{
			say: 'Embedded systems take code into the physical world, down to individual pins.',
			send: [['comp', 'emb']],
			light: ['emb']
		}
	]
};
