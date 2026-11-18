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
		{
			title: 'Engineering foundations',
			say: 'Maths, science and systems thinking explain how real things behave.',
			detail:
				'This group covers calculus, linear algebra, physics and the habit of modelling a system as parts with inputs and outputs. It comes first because circuits, signals and algorithms are all described in that maths. Without it, later topics become rules to memorise instead of ideas you can reason about.',
			light: ['base']
		},
		{
			title: 'Computing and code',
			say: 'Digital logic, C, C++, algorithms and theory turn that into working programs.',
			detail:
				'Here logic gates, number systems, programming and complexity theory show how a machine follows instructions. It sits in the middle because both later branches depend on it. C matters most, since it stays close to the hardware and is still the main language for operating systems and microcontrollers.',
			send: [['base', 'comp']],
			light: ['comp']
		},
		{
			title: 'Software engineering',
			say: 'Software engineering is how teams build large systems that last.',
			detail:
				'This branch covers requirements, design, testing, version control and working in a team on code that lives for years. It builds on programming because the hard part is now managing size and change, not writing one function. Code review and automated tests exist because no single person can hold a large codebase in their head.',
			send: [['comp', 'soft']],
			light: ['soft']
		},
		{
			title: 'Embedded systems',
			say: 'Embedded systems take code into the physical world, down to individual pins.',
			detail:
				'This branch puts code on boards such as Arduino, Nuvoton microcontrollers and the Raspberry Pi, reading sensors and driving motors through GPIO pins. It leans on both maths and C, because timing, voltage and tight memory all matter at once. A missed deadline here can make a motor overshoot, so real-time thinking is central.',
			send: [['comp', 'emb']],
			light: ['emb']
		}
	]
};
