import type { Subject } from '../sketch';

const GROUP = 'Engineering foundations';

export const foundations: Subject[] = [
	{
		slug: 'engineering-mathematics',
		title: 'Engineering Mathematics',
		group: GROUP,
		blurb:
			'The maths engineers use daily: how things change, how to solve many equations at once, and how to model a system over time.',
		topics: [
			{
				id: 'calculus',
				title: 'Calculus: measuring change',
				summary:
					'Calculus answers two questions: how fast is something changing right now, and how much has built up in total? A derivative gives the rate of change, and an integral gives the running total. They are opposites of each other.',
				points: [
					['Derivative', 'the slope of a curve at one exact point.'],
					['Power rule', 'the derivative of xⁿ is n·xⁿ⁻¹, so x² becomes 2x.'],
					['Integral', 'the total area under a curve.'],
					['Where it is used', 'speed from position, current from charge, power from energy.']
				],
				tip: 'Slope is the idea to hold on to. A derivative is the slope of a line that just touches the curve.',
				code: `f(x)  = x²
f'(x) = 2x
f'(3) = 6      slope at x = 3

∫₀³ x² dx = [x³/3]₀³ = 9`,
				sketch: {
					kind: 'Worked example',
					alt: 'The slope between two points on x squared gets closer to 6 as the second point moves towards x equals 3.',
					h: 235,
					nodes: [
						{ id: 'f', label: 'f(x) = x²', x: 240, y: 28, w: 170, h: 42, fill: 'yellow' },
						{
							id: 'p',
							label: 'Fixed point\nx = 3, y = 9',
							x: 92,
							y: 110,
							w: 150,
							h: 66,
							fill: 'sky'
						},
						{
							id: 'q',
							label: 'Moving point\nx = 4, y = 16',
							x: 388,
							y: 110,
							w: 160,
							h: 66,
							fill: 'mint'
						},
						{ id: 's', label: 'Slope = 7 / 1 = 7', x: 240, y: 200, w: 240, h: 50, fill: 'pink' }
					],
					edges: [
						{ from: 'p', to: 's' },
						{ from: 'q', to: 's' }
					],
					steps: [
						{
							say: 'Take two points on the curve. The gap between them is 1, and the slope is 7.',
							send: [
								['p', 's'],
								['q', 's']
							],
							light: ['q']
						},
						{
							say: 'Move the second point closer: x = 3.1. The slope becomes 6.1.',
							set: { q: 'Moving point\nx = 3.1, y = 9.61', s: 'Slope = 0.61 / 0.1 = 6.1' },
							send: [['q', 's']]
						},
						{
							say: 'Closer still: x = 3.01. The slope becomes 6.01.',
							set: { q: 'Moving point\nx = 3.01, y = 9.0601', s: 'Slope = 0.0601 / 0.01 = 6.01' },
							send: [['q', 's']]
						},
						{
							say: 'As the gap shrinks to nothing, the slope settles on exactly 6. That limit is the derivative.',
							set: { q: 'Gap shrinks to 0', s: "f'(3) = 2 × 3 = 6" },
							light: ['s']
						}
					]
				}
			},
			{
				id: 'linear-algebra',
				title: 'Linear algebra: many equations at once',
				summary:
					'Real systems have many unknowns tied together, such as the currents in a circuit. Writing them as a matrix lets you solve them with one reliable method, by hand or by computer.',
				points: [
					['Matrix', 'a grid of numbers. Ax = b packs a whole system into one line.'],
					['Gaussian elimination', 'subtract rows to remove unknowns, then work backwards.'],
					['Determinant', 'if it is zero, there is no single unique solution.'],
					['Where it is used', 'circuits, graphics, machine learning, and structural analysis.']
				],
				tip: 'Whatever you do to one side of an equation, do to the other. Row operations are just that rule, done neatly.',
				code: `[ 1  1 ] [ x ]   [ 5 ]
[ 2  1 ] [ y ] = [ 8 ]`,
				sketch: {
					kind: 'Worked example',
					alt: 'Gaussian elimination removes x from the second equation, finds y equals 2, then x equals 3.',
					h: 175,
					nodes: [
						{ id: 'r1', label: 'x + y = 5', x: 110, y: 45, w: 190, h: 50, fill: 'sky' },
						{ id: 'r2', label: '2x + y = 8', x: 110, y: 130, w: 190, h: 50, fill: 'yellow' },
						{ id: 'out', label: 'x = ?\ny = ?', x: 385, y: 88, w: 130, h: 84, fill: 'mint' }
					],
					edges: [
						{ from: 'r1', to: 'out' },
						{ from: 'r2', to: 'out' }
					],
					steps: [
						{
							say: 'Two equations and two unknowns. Each row is one equation.',
							light: ['r1', 'r2']
						},
						{
							say: 'Subtract 2 × row 1 from row 2 to remove x.',
							send: [['r1', 'r2']],
							set: { r2: '-y = -2' },
							light: ['r2']
						},
						{
							say: 'Row 2 now has one unknown, so y = 2.',
							send: [['r2', 'out']],
							set: { r2: '-y = -2', out: 'x = ?\ny = 2' }
						},
						{
							say: 'Put y = 2 back into row 1 and you get x = 3.',
							send: [['r1', 'out']],
							set: { r2: '-y = -2', r1: 'x + 2 = 5', out: 'x = 3\ny = 2' },
							light: ['out']
						},
						{
							say: 'Check it: 2(3) + 2 = 8. It works.',
							set: { r2: '2(3) + 2 = 8', r1: '3 + 2 = 5', out: 'x = 3\ny = 2' },
							light: ['r1', 'r2']
						}
					]
				}
			},
			{
				id: 'differential-equations',
				title: 'Differential equations: modelling over time',
				summary:
					'A differential equation describes how something changes based on its current state. Cooling coffee, charging capacitors and swinging springs all follow one. Solving it tells you where the system will be later.',
				points: [
					['Model', 'dT/dt = -k(T - 20): the hotter the coffee, the faster it cools.'],
					[
						'Numerical solving',
						"Euler's method takes small steps forward using the current slope."
					],
					['Step size', 'smaller steps are more accurate but take more work.'],
					[
						'Laplace transform',
						'turns these equations into algebra, which is a key tool in control systems.'
					]
				],
				tip: 'Before solving, ask what the answer should roughly look like. Coffee cools towards room temperature, and never below it.',
				code: `dT/dt = -0.1 (T - 20)
T(next) = T + step × dT/dt`,
				sketch: {
					kind: 'Loop diagram',
					alt: 'Euler steps for coffee cooling: from the temperature work out the rate, then step forward, and repeat.',
					h: 190,
					nodes: [
						{ id: 't', label: 'Coffee\n90 °C', x: 80, y: 95, w: 120, h: 72, fill: 'pink' },
						{ id: 'r', label: 'Rate now\n-7 °C/min', x: 395, y: 45, w: 140, h: 62, fill: 'yellow' },
						{ id: 's', label: 'Step 5 min\nchange -35', x: 395, y: 150, w: 140, h: 62, fill: 'sky' }
					],
					edges: [
						{ from: 't', to: 'r' },
						{ from: 'r', to: 's' },
						{ from: 's', to: 't' }
					],
					steps: [
						{
							say: 'Start at 90 °C in a 20 °C room. The rate is -0.1 × (90 - 20) = -7.',
							send: [['t', 'r']],
							light: ['r']
						},
						{
							say: 'Assume that rate holds for 5 minutes, so the coffee drops 35 °C.',
							send: [['r', 's']],
							light: ['s']
						},
						{ say: 'New temperature: 55 °C.', send: [['s', 't']], set: { t: 'Coffee\n55 °C' } },
						{
							say: 'Cooler coffee cools more slowly: the rate is now -3.5.',
							send: [['t', 'r']],
							set: { t: 'Coffee\n55 °C', r: 'Rate now\n-3.5 °C/min', s: 'Step 5 min\nchange -17.5' }
						},
						{
							say: 'New temperature: 37.5 °C. Each step shrinks, so the curve flattens towards 20 °C.',
							send: [['s', 't']],
							set: {
								t: 'Coffee\n37.5 °C',
								r: 'Rate now\n-1.75 °C/min',
								s: 'Step 5 min\nchange -8.75'
							}
						}
					]
				}
			}
		]
	},
	{
		slug: 'engineering-science',
		title: 'Engineering Science',
		group: GROUP,
		blurb:
			'The physics underneath engineering: electric circuits, forces and motion, and how energy moves and gets lost.',
		topics: [
			{
				id: 'circuits',
				title: 'Electric circuits',
				summary:
					"Voltage pushes, current flows, and resistance opposes. Ohm's law links the three, and Kirchhoff's laws let you work out any circuit. Every electronics project on this site relies on them.",
				points: [
					["Ohm's law", 'V = I × R.'],
					['Voltage law', 'all the voltage drops around a closed loop add up to the supply.'],
					['Current law', 'the current entering a junction equals the current leaving it.'],
					['Power', 'P = V × I, which is why resistors get warm.']
				],
				tip: 'Series resistors add up. Parallel resistors give a total smaller than the smallest one.',
				code: `I   = V / R = 9 V / 3 kΩ = 3 mA
V1  = 3 mA × 1 kΩ = 3 V
V2  = 3 mA × 2 kΩ = 6 V
3 V + 6 V = 9 V`,
				sketch: {
					kind: 'Circuit diagram',
					alt: 'A 9 volt battery drives 3 milliamps through a 1 kilohm and a 2 kilohm resistor in series, dropping 3 and 6 volts.',
					h: 200,
					nodes: [
						{ id: 'b', label: 'Battery\n9 V', x: 70, y: 150, w: 110, h: 66, fill: 'yellow' },
						{ id: 'r1', label: 'R1 1 kΩ', x: 240, y: 40, w: 120, h: 60, fill: 'sky' },
						{ id: 'r2', label: 'R2 2 kΩ', x: 410, y: 150, w: 120, h: 60, fill: 'mint' }
					],
					edges: [
						{ from: 'b', to: 'r1' },
						{ from: 'r1', to: 'r2' },
						{ from: 'r2', to: 'b' }
					],
					steps: [
						{ say: 'Total resistance in series is 1 kΩ + 2 kΩ = 3 kΩ.', light: ['r1', 'r2'] },
						{
							say: "Ohm's law gives the current: 9 V / 3 kΩ = 3 mA, the same everywhere in the loop.",
							send: [
								['b', 'r1'],
								['r1', 'r2'],
								['r2', 'b']
							]
						},
						{
							say: 'R1 drops 3 mA × 1 kΩ = 3 V.',
							send: [['b', 'r1']],
							set: { r1: 'R1 drops 3 V' },
							light: ['r1']
						},
						{
							say: 'R2 drops 3 mA × 2 kΩ = 6 V.',
							send: [['r1', 'r2']],
							set: { r1: 'R1 drops 3 V', r2: 'R2 drops 6 V' },
							light: ['r2']
						},
						{
							say: 'The drops add up to 9 V, so the voltage law holds.',
							set: { r1: 'R1 drops 3 V', r2: 'R2 drops 6 V' },
							light: ['b']
						}
					]
				}
			},
			{
				id: 'mechanics',
				title: 'Forces and motion',
				summary:
					"Mechanics starts from Newton's laws. If the forces on an object balance, its motion does not change. If they do not, it accelerates in the direction of the leftover force.",
				points: [
					['First law', 'no net force means no change in motion.'],
					['Second law', 'F = m × a. The net force sets the acceleration.'],
					['Third law', 'every force has an equal and opposite partner.'],
					['Free-body diagram', 'draw one object and every force on it before you do any maths.']
				],
				tip: 'Always work with the net force, not just the biggest arrow.',
				code: `F_net = 3000 N - 1000 N = 2000 N
a = F / m = 2000 / 1000 = 2 m/s²`,
				sketch: {
					kind: 'Free-body diagram',
					alt: 'A 1000 kilogram car with 3000 newtons of engine force and 1000 newtons of drag accelerates at 2 metres per second squared.',
					h: 165,
					nodes: [
						{ id: 'en', label: 'Engine\n3000 N', x: 65, y: 70, w: 110, h: 66, fill: 'mint' },
						{ id: 'car', label: 'Car\n1000 kg', x: 240, y: 70, w: 120, h: 72, fill: 'yellow' },
						{ id: 'dr', label: 'Drag\n1000 N', x: 415, y: 70, w: 110, h: 66, fill: 'pink' },
						{ id: 'a', label: 'Acceleration = ?', x: 240, y: 140, w: 200, h: 40, fill: 'sky' }
					],
					edges: [
						{ from: 'en', to: 'car' },
						{ from: 'dr', to: 'car' }
					],
					steps: [
						{ say: 'Isolate the car and draw every force on it.', light: ['car'] },
						{
							say: 'The engine pushes forwards with 3000 N.',
							send: [['en', 'car']],
							light: ['en']
						},
						{ say: 'Drag pushes back with 1000 N.', send: [['dr', 'car']], light: ['dr'] },
						{
							say: 'The net force is 2000 N forwards.',
							send: [
								['en', 'car'],
								['dr', 'car']
							],
							set: { a: 'Net force = 2000 N' },
							light: ['a']
						},
						{ say: 'a = F / m = 2000 / 1000 = 2 m/s².', set: { a: 'a = 2 m/s²' }, light: ['a'] },
						{
							say: 'As speed rises, drag grows. When drag reaches 3000 N, the forces balance and speed stays constant.',
							set: { dr: 'Drag\n3000 N', a: 'a = 0, top speed' },
							send: [
								['en', 'car'],
								['dr', 'car']
							]
						}
					]
				}
			},
			{
				id: 'energy',
				title: 'Energy and efficiency',
				summary:
					'Energy is never created or destroyed, only converted, and each conversion loses some as heat. Tracking where it goes is how engineers find what to improve.',
				points: [
					['First law', 'energy in equals energy out plus energy stored.'],
					['Second law', 'heat spreads out, so no real machine is 100% efficient.'],
					['Power', 'energy per second, measured in watts.'],
					['Efficiency', 'useful output divided by total input.']
				],
				tip: 'Multiply the efficiency of each stage. Three stages at 90% give only 73% overall.',
				sketch: {
					kind: 'Energy flow diagram',
					alt: 'Of 100 units of fuel energy, the boiler passes on 90, the turbine 40, and the generator 38, with the rest lost as heat.',
					h: 180,
					nodes: [
						{ id: 'a', label: 'Fuel\n100', x: 55, y: 55, w: 88, h: 66, fill: 'pink' },
						{ id: 'b', label: 'Boiler', x: 175, y: 55, w: 88, h: 66, fill: 'yellow' },
						{ id: 'c', label: 'Turbine', x: 297, y: 55, w: 88, h: 66, fill: 'sky' },
						{ id: 'd', label: 'Generator', x: 425, y: 55, w: 90, h: 66, fill: 'mint' },
						{ id: 'loss', label: 'Lost as heat: 0', x: 240, y: 145, w: 200, h: 44 }
					],
					edges: [
						{ from: 'a', to: 'b' },
						{ from: 'b', to: 'c' },
						{ from: 'c', to: 'd' }
					],
					steps: [
						{
							say: 'A power station starts with 100 units of chemical energy in fuel.',
							light: ['a']
						},
						{
							say: 'The boiler turns it into steam at 90% efficiency.',
							send: [['a', 'b']],
							set: { b: 'Boiler\n90', loss: 'Lost as heat: 10' }
						},
						{
							say: 'The turbine turns heat into rotation. This is the biggest loss, because of the second law.',
							send: [['b', 'c']],
							set: { b: 'Boiler\n90', c: 'Turbine\n40', loss: 'Lost as heat: 60' },
							light: ['loss']
						},
						{
							say: 'The generator makes electricity at 95% efficiency.',
							send: [['c', 'd']],
							set: {
								b: 'Boiler\n90',
								c: 'Turbine\n40',
								d: 'Generator\n38',
								loss: 'Lost as heat: 62'
							}
						},
						{
							say: 'Overall efficiency is 38%, and the other 62 units warm the surroundings.',
							set: {
								b: 'Boiler\n90',
								c: 'Turbine\n40',
								d: 'Generator\n38',
								loss: 'Lost as heat: 62'
							},
							light: ['d']
						}
					]
				}
			}
		]
	},
	{
		slug: 'environmental-sustainable-systems',
		title: 'Environmental and Sustainable System Engineering',
		group: GROUP,
		blurb:
			'How to design systems with their full environmental cost in mind, from raw materials to disposal, including the energy used by software.',
		topics: [
			{
				id: 'life-cycle',
				title: 'Life cycle assessment',
				summary:
					"A product's impact does not begin when you switch it on. Life cycle assessment measures the whole journey, so you improve the stage that matters and avoid moving the problem elsewhere.",
				points: [
					['The stages', 'raw materials, manufacturing, transport, use, and end of life.'],
					['Standard', 'ISO 14040 sets out how to run an assessment.'],
					['Hot spot', 'the stage with the biggest impact. It is often not the obvious one.'],
					['Burden shifting', 'fixing one stage in a way that makes another one worse.']
				],
				tip: 'Measure before you optimise. Hot spots often surprise people.',
				sketch: {
					kind: 'Life cycle diagram',
					alt: 'A product moves through materials, manufacture, transport, use and end of life. For a phone, manufacture is the hot spot.',
					h: 195,
					nodes: [
						{ id: 'a', label: 'Raw\nmaterials', x: 80, y: 50, w: 124, h: 64, fill: 'sky' },
						{ id: 'b', label: 'Manufacture', x: 240, y: 50, w: 124, h: 64, fill: 'yellow' },
						{ id: 'c', label: 'Transport', x: 400, y: 50, w: 124, h: 64, fill: 'sky' },
						{ id: 'd', label: 'Use', x: 400, y: 155, w: 124, h: 64, fill: 'mint' },
						{ id: 'e', label: 'End of life', x: 240, y: 155, w: 124, h: 64, fill: 'pink' }
					],
					edges: [
						{ from: 'a', to: 'b' },
						{ from: 'b', to: 'c' },
						{ from: 'c', to: 'd' },
						{ from: 'd', to: 'e' }
					],
					steps: [
						{
							say: 'Metals and minerals are mined, which has its own energy and water cost.',
							light: ['a']
						},
						{
							say: 'For a smartphone, making it is usually the biggest source of carbon.',
							send: [['a', 'b']],
							light: ['b'],
							set: { b: 'Hot spot\nfor a phone' }
						},
						{ say: 'It is shipped around the world.', send: [['b', 'c']], light: ['c'] },
						{
							say: 'For a data centre server, the hot spot flips to electricity used over its life.',
							send: [['c', 'd']],
							light: ['d'],
							set: { d: 'Hot spot\nfor a server' }
						},
						{
							say: 'At the end, it is reused, recycled or dumped. Design decisions made years earlier decide which.',
							send: [['d', 'e']],
							light: ['e']
						}
					]
				}
			},
			{
				id: 'circular',
				title: 'From linear to circular',
				summary:
					'The old model is take, make, throw away. A circular system keeps materials in use for as long as possible, and that has to be designed in from the start.',
				points: [
					['Reduce', 'use less material and energy in the first place.'],
					['Reuse and repair', 'keep the whole product working. This saves the most.'],
					['Recycle', 'recover the materials. It is the last resort, not the first.'],
					[
						'E-waste',
						'electronics contain valuable metals and hazardous ones, so proper handling matters.'
					]
				],
				tip: 'Design for repair: standard screws, replaceable batteries and available spare parts.',
				sketch: {
					kind: 'Flow diagram',
					alt: 'In a linear system a product goes to landfill. In a circular system it returns through repair and recycling.',
					h: 195,
					nodes: [
						{ id: 'make', label: 'Make', x: 75, y: 50, w: 110, h: 58, fill: 'sky' },
						{ id: 'use', label: 'Use', x: 240, y: 50, w: 110, h: 58, fill: 'yellow' },
						{ id: 'bin', label: 'Landfill', x: 405, y: 50, w: 110, h: 58, fill: 'pink' },
						{ id: 'fix', label: 'Repair', x: 240, y: 155, w: 110, h: 58, fill: 'mint' },
						{ id: 'rec', label: 'Recycle', x: 75, y: 155, w: 110, h: 58, fill: 'mint' }
					],
					edges: [
						{ from: 'make', to: 'use' },
						{ from: 'use', to: 'bin' },
						{ from: 'use', to: 'fix' },
						{ from: 'fix', to: 'rec' },
						{ from: 'rec', to: 'make' }
					],
					steps: [
						{
							say: 'Linear: make it, use it, throw it away. Every new unit needs new material.',
							hide: ['fix', 'rec'],
							send: [
								['make', 'use'],
								['use', 'bin']
							],
							light: ['bin']
						},
						{
							say: 'Circular: when it breaks, repair it so the same product carries on.',
							send: [['use', 'fix']],
							light: ['fix']
						},
						{
							say: 'When it can no longer be repaired, recover the materials.',
							send: [['fix', 'rec']],
							light: ['rec']
						},
						{
							say: 'Those materials go into the next product, and landfill gets much less.',
							send: [['rec', 'make']],
							down: ['bin']
						}
					]
				}
			},
			{
				id: 'green-software',
				title: 'Sustainable computing',
				summary:
					'Software has no weight, but it does use electricity. Efficient code, sensible hosting and good timing all cut the energy and carbon behind a system.',
				points: [
					[
						'PUE',
						'power usage effectiveness: total data centre energy divided by IT energy. Closer to 1.0 is better.'
					],
					['Efficient code', 'less CPU, less data and fewer idle servers mean less energy.'],
					['Carbon-aware', 'run flexible work when and where the grid is cleanest.'],
					[
						'Hardware lifetime',
						'keeping devices working longer avoids the carbon of making new ones.'
					]
				],
				tip: 'Switching off idle servers is the easiest saving in computing, and it cuts the bill too.',
				sketch: {
					kind: 'Scheduling diagram',
					alt: 'A flexible batch job waits until the electricity grid is powered by clean wind energy before it runs.',
					h: 180,
					nodes: [
						{ id: 'job', label: 'Nightly\nbatch job', x: 75, y: 90, w: 124, h: 66, fill: 'sky' },
						{
							id: 'grid',
							label: 'Grid now\nhigh carbon',
							x: 240,
							y: 90,
							w: 124,
							h: 66,
							fill: 'pink'
						},
						{ id: 'dc', label: 'Data centre', x: 410, y: 90, w: 120, h: 66, fill: 'yellow' }
					],
					edges: [
						{ from: 'job', to: 'grid' },
						{ from: 'grid', to: 'dc' }
					],
					steps: [
						{
							say: 'A report job can run any time tonight, so it does not need to run right now.',
							light: ['job']
						},
						{
							say: 'A carbon-aware scheduler checks the grid: it is high carbon at the moment.',
							send: [['job', 'grid']],
							light: ['grid']
						},
						{
							say: 'The job waits. A few hours later, wind power is high.',
							set: { grid: 'Grid now\nlow carbon' },
							light: ['grid']
						},
						{
							say: 'The job runs on cleaner power: the same work with less carbon.',
							send: [['grid', 'dc']],
							set: { grid: 'Grid now\nlow carbon' },
							light: ['dc']
						}
					]
				}
			}
		]
	},
	{
		slug: 'system-engineering-principles',
		title: 'System Engineering Principles',
		group: GROUP,
		blurb:
			'How to think about a whole system, not only its parts: feedback, the V-model, and finding failures before they happen.',
		topics: [
			{
				id: 'systems-thinking',
				title: 'Systems thinking',
				summary:
					'A system is more than its parts, and it can do things none of the parts can do alone. Systems engineering looks at the interactions between parts, which is where most surprises come from.',
				points: [
					['Boundary', 'decide what is inside the system and what is outside it.'],
					['Interfaces', 'where parts meet, and where integration problems appear.'],
					['Feedback', 'a system senses its own output and adjusts itself.'],
					['Emergence', 'behaviour that only appears when parts work together.']
				],
				tip: 'When a system misbehaves, look at the connections before you blame a part.',
				sketch: {
					kind: 'Control loop diagram',
					alt: 'A thermostat compares the temperature with the target, runs the heater, the room warms, and the sensor feeds back.',
					h: 200,
					nodes: [
						{ id: 'set', label: 'Target\n22 °C', x: 70, y: 50, w: 110, h: 62, fill: 'sky' },
						{ id: 'ctl', label: 'Thermostat', x: 240, y: 50, w: 120, h: 62, fill: 'yellow' },
						{ id: 'heat', label: 'Heater\noff', x: 410, y: 50, w: 110, h: 62, fill: 'pink' },
						{ id: 'room', label: 'Room\n18 °C', x: 410, y: 155, w: 110, h: 62, fill: 'mint' },
						{ id: 'sen', label: 'Sensor', x: 240, y: 155, w: 120, h: 62, fill: 'sky' }
					],
					edges: [
						{ from: 'set', to: 'ctl' },
						{ from: 'ctl', to: 'heat' },
						{ from: 'heat', to: 'room' },
						{ from: 'room', to: 'sen' },
						{ from: 'sen', to: 'ctl', label: 'feedback' }
					],
					steps: [
						{
							say: 'The target is 22 °C. The sensor reports the room is at 18 °C.',
							send: [
								['room', 'sen'],
								['sen', 'ctl']
							],
							light: ['ctl']
						},
						{
							say: 'The error is 4 °C, so the thermostat switches the heater on.',
							send: [['ctl', 'heat']],
							set: { heat: 'Heater\non' }
						},
						{
							say: 'The room warms up.',
							send: [['heat', 'room']],
							set: { heat: 'Heater\non', room: 'Room\n22 °C' }
						},
						{
							say: 'The sensor reports 22 °C, so the heater goes off. No part knows the whole plan, but the loop does the job.',
							send: [
								['room', 'sen'],
								['sen', 'ctl']
							],
							set: { room: 'Room\n22 °C' }
						}
					]
				}
			},
			{
				id: 'v-model',
				title: 'The V-model',
				summary:
					'The V-model pairs each design stage with the test that checks it. You go down the left side, breaking the system into pieces, then up the right side, proving each level works.',
				points: [
					['Left side', 'requirements, system design, detailed design.'],
					['Bottom', 'implementation.'],
					['Right side', 'unit, integration and acceptance testing.'],
					['Verification', 'did we build it right? Validation asks: did we build the right thing?']
				],
				tip: 'Write the acceptance test when you write the requirement. If you cannot, the requirement is too vague.',
				sketch: {
					kind: 'V-model diagram',
					alt: 'Requirements pair with acceptance tests, system design with integration tests, and detailed design with unit tests, with code at the bottom of the V.',
					h: 235,
					nodes: [
						{ id: 'req', label: 'Requirements', x: 75, y: 30, w: 134, h: 44, fill: 'sky' },
						{ id: 'des', label: 'System design', x: 120, y: 100, w: 134, h: 44, fill: 'sky' },
						{ id: 'det', label: 'Detail design', x: 165, y: 170, w: 124, h: 44, fill: 'sky' },
						{ id: 'code', label: 'Code', x: 240, y: 212, w: 80, h: 38, fill: 'yellow' },
						{ id: 'unit', label: 'Unit test', x: 330, y: 170, w: 110, h: 44, fill: 'mint' },
						{ id: 'int', label: 'Integration', x: 365, y: 100, w: 124, h: 44, fill: 'mint' },
						{ id: 'acc', label: 'Acceptance', x: 410, y: 30, w: 124, h: 44, fill: 'mint' }
					],
					edges: [
						{ from: 'req', to: 'acc', dashed: true, plain: true },
						{ from: 'des', to: 'int', dashed: true, plain: true },
						{ from: 'det', to: 'unit', dashed: true, plain: true }
					],
					steps: [
						{ say: 'Go down the left: define what the system must do.', light: ['req'] },
						{
							say: 'Split it into subsystems, then into detailed parts.',
							send: [
								['req', 'des'],
								['des', 'det']
							],
							light: ['des', 'det']
						},
						{
							say: 'Write the code at the bottom of the V.',
							send: [['det', 'code']],
							light: ['code']
						},
						{
							say: 'Climb the right side: unit tests check the detailed design.',
							send: [['code', 'unit']],
							light: ['unit', 'det']
						},
						{
							say: 'Integration tests check that the parts work together as designed.',
							send: [['unit', 'int']],
							light: ['int', 'des']
						},
						{
							say: 'Acceptance tests check the system against the original requirements.',
							send: [['int', 'acc']],
							light: ['acc', 'req']
						}
					]
				}
			},
			{
				id: 'fmea',
				title: 'Risk and failure analysis',
				summary:
					'FMEA, or Failure Mode and Effects Analysis, finds ways a system could fail before it does. Each risk gets a score, so effort goes to the worst problems first.',
				points: [
					['Severity', 'how bad is it if this happens? Rate it 1 to 10.'],
					['Occurrence', 'how likely is it? Rate it 1 to 10.'],
					['Detection', 'how hard is it to spot before it does harm? Rate it 1 to 10.'],
					['RPN', 'risk priority number: severity × occurrence × detection.']
				],
				tip: 'A low score does not excuse a high severity. Anything that can hurt someone needs attention regardless.',
				code: `RPN = Severity × Occurrence × Detection
      9 × 4 × 7 = 252   fix first
      3 × 5 × 2 =  30   monitor`,
				sketch: {
					kind: 'Risk scoring',
					alt: 'A sensor failure is scored for severity, occurrence and detection, giving a risk number of 252. Adding a backup sensor lowers it to 36.',
					h: 195,
					nodes: [
						{
							id: 'f',
							label: 'Failure: brake sensor stops',
							x: 240,
							y: 28,
							w: 300,
							h: 44,
							fill: 'pink'
						},
						{ id: 's', label: 'Severity\n9', x: 80, y: 115, w: 110, h: 62, fill: 'sky' },
						{ id: 'o', label: 'Occurrence\n4', x: 240, y: 115, w: 110, h: 62, fill: 'sky' },
						{ id: 'd', label: 'Detection\n7', x: 400, y: 115, w: 110, h: 62, fill: 'sky' },
						{ id: 'r', label: 'RPN = 252', x: 240, y: 172, w: 180, h: 32, fill: 'yellow' }
					],
					edges: [
						{ from: 'f', to: 's' },
						{ from: 'f', to: 'o' },
						{ from: 'f', to: 'd' }
					],
					steps: [
						{ say: 'Pick one way the system could fail.', light: ['f'] },
						{
							say: 'Score how bad it is, how likely it is, and how hard it is to detect.',
							send: [
								['f', 's'],
								['f', 'o'],
								['f', 'd']
							]
						},
						{
							say: 'Multiply them: 9 × 4 × 7 = 252. That goes to the top of the list.',
							light: ['r']
						},
						{
							say: 'Add a self-check, so a dead sensor is spotted right away. Detection drops to 1.',
							set: { d: 'Detection\n1', r: 'RPN = 36' },
							light: ['d']
						},
						{
							say: 'Severity is still 9, so keep a backup in the design as well.',
							set: { d: 'Detection\n1', r: 'RPN = 36' },
							light: ['s']
						}
					]
				}
			}
		]
	}
];
