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
				links: [
					[
						'MIT 18.01SC Single Variable Calculus',
						'https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/'
					],
					[
						'OpenStax: Defining the derivative',
						'https://openstax.org/books/calculus-volume-1/pages/3-1-defining-the-derivative'
					]
				],
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
				links: [
					[
						'MIT 18.06 Linear Algebra',
						'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/'
					]
				],
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
				links: [
					[
						'MIT 18.03 Differential Equations',
						'https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/'
					],
					[
						"OpenStax: Euler's method",
						'https://openstax.org/books/calculus-volume-2/pages/4-2-direction-fields-and-numerical-methods'
					]
				],
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
			},
			{
				id: 'statistics',
				title: 'Probability and statistics: living with spread',
				summary:
					'No two parts come off a line exactly the same. Statistics describes the spread with a mean and a standard deviation. Probability then tells you how many parts will land outside their limits.',
				points: [
					['Mean', 'the average of all the measurements.'],
					['Standard deviation', 'how far a typical value sits from the mean.'],
					[
						'Normal distribution',
						'the bell curve. About 68% of values fall within 1 standard deviation, 95% within 2, and 99.7% within 3.'
					],
					[
						'Sample',
						'test a few parts to learn about all of them. More samples give a surer answer.'
					]
				],
				tip: 'Always quote the spread with the average. "100 Ω on average" says nothing about the worst part.',
				skip: 'You design for the average part, and the unlucky ones fail in the field.',
				code: `mean 100 Ω, standard deviation 1 Ω
within ±2 sd (98 to 102 Ω)  ≈ 95.4%
outside ±2 sd                ≈ 4.6%, about 46 in 1000`,
				links: [
					[
						'MIT 18.05 Probability and Statistics',
						'https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/'
					],
					[
						'NIST: The normal distribution',
						'https://www.itl.nist.gov/div898/handbook/pmc/section5/pmc51.htm'
					]
				],
				sketch: {
					kind: 'Worked example',
					alt: 'A sample of resistors gives a mean of 100 ohms and a spread of 1 ohm, so about 95 percent fall inside 98 to 102 ohms.',
					h: 200,
					nodes: [
						{
							id: 'lot',
							label: 'Batch of\n1000 resistors',
							x: 80,
							y: 50,
							w: 140,
							h: 62,
							fill: 'sky'
						},
						{
							id: 'smp',
							label: 'Measure\n30 of them',
							x: 240,
							y: 50,
							w: 130,
							h: 62,
							fill: 'yellow'
						},
						{ id: 'mean', label: 'Mean\n= ?', x: 400, y: 50, w: 130, h: 62, fill: 'mint' },
						{ id: 'sd', label: 'Spread\n= ?', x: 400, y: 150, w: 130, h: 62, fill: 'mint' },
						{ id: 'res', label: 'Inside limits: ?', x: 165, y: 150, w: 230, h: 62, fill: 'pink' }
					],
					edges: [
						{ from: 'lot', to: 'smp' },
						{ from: 'smp', to: 'mean' },
						{ from: 'smp', to: 'sd' },
						{ from: 'sd', to: 'res' }
					],
					steps: [
						{
							say: 'A factory makes 1000 resistors marked 100 Ω. No two are exactly alike.',
							light: ['lot']
						},
						{
							say: 'Testing every one is slow, so measure a sample of 30.',
							send: [['lot', 'smp']],
							light: ['smp']
						},
						{
							say: 'Their average is 100.0 Ω. That is the mean.',
							send: [['smp', 'mean']],
							set: { mean: 'Mean\n100.0 Ω' }
						},
						{
							say: 'A typical resistor sits 1 Ω from the mean. That is the standard deviation.',
							send: [['smp', 'sd']],
							set: { mean: 'Mean\n100.0 Ω', sd: 'Spread\n1 Ω' }
						},
						{
							say: 'The limits are 98 to 102 Ω, which is ±2 standard deviations. About 95% pass.',
							send: [['sd', 'res']],
							set: { mean: 'Mean\n100.0 Ω', sd: 'Spread\n1 Ω', res: 'Inside 98-102 Ω:\nabout 95%' },
							light: ['res']
						},
						{
							say: 'So about 46 in 1000 fail. To fix that, shrink the spread, not the average.',
							set: { mean: 'Mean\n100.0 Ω', sd: 'Spread\n1 Ω', res: 'About 46\nin 1000 fail' },
							light: ['sd']
						}
					]
				}
			},
			{
				id: 'fourier',
				title: 'Fourier series: signals as sums of waves',
				summary:
					'Any repeating signal can be built by adding sine waves of different frequencies. Fourier analysis finds which frequencies are in a signal and how strong each one is. Engineers use it to filter noise, compress sound and study vibration.',
				points: [
					['Fundamental', 'the lowest frequency, the rate at which the signal repeats.'],
					['Harmonics', 'whole-number multiples of the fundamental: 2f, 3f, 4f and so on.'],
					[
						'Square wave',
						'holds only the odd harmonics, and the nth one is 1/n as strong as the first.'
					],
					['Spectrum', 'a chart of strength against frequency, the signal seen from a new angle.']
				],
				tip: 'Sharp edges need many high harmonics. That is why fast digital signals cause radio interference.',
				code: `square(t) = 4/π × ( sin ωt + sin 3ωt / 3 + sin 5ωt / 5 + … )`,
				links: [
					[
						'MIT 18.03SC: Fourier series',
						'https://ocw.mit.edu/courses/18-03sc-differential-equations-fall-2011/pages/unit-iii-fourier-series-and-laplace-transform/'
					],
					['Stanford EE261 The Fourier Transform', 'https://see.stanford.edu/Course/EE261'],
					['Square wave (Wikipedia)', 'https://en.wikipedia.org/wiki/Square_wave_(waveform)']
				],
				sketch: {
					kind: 'Build-up diagram',
					alt: 'Sine waves at f, 3f and 5f, at sizes 1, one third and one fifth, add up to something close to a square wave.',
					h: 230,
					nodes: [
						{ id: 'h1', label: 'Sine at f\nsize 1', x: 85, y: 40, w: 150, h: 60, fill: 'sky' },
						{ id: 'h3', label: 'Sine at 3f\nsize 1/3', x: 85, y: 115, w: 150, h: 60, fill: 'sky' },
						{ id: 'h5', label: 'Sine at 5f\nsize 1/5', x: 85, y: 190, w: 150, h: 60, fill: 'sky' },
						{ id: 'sum', label: 'Sum', x: 360, y: 115, w: 170, h: 80, fill: 'yellow' }
					],
					edges: [
						{ from: 'h1', to: 'sum' },
						{ from: 'h3', to: 'sum' },
						{ from: 'h5', to: 'sum' }
					],
					steps: [
						{
							say: 'Start with one sine wave at the square wave’s own frequency. It is a rough match.',
							hide: ['h3', 'h5'],
							send: [['h1', 'sum']],
							set: { sum: 'Sum: a plain\nsine wave' }
						},
						{
							say: 'Add the 3rd harmonic at one third the size. The top starts to flatten.',
							hide: ['h5'],
							send: [['h3', 'sum']],
							set: { sum: 'Sum: flatter\ntop' }
						},
						{
							say: 'Add the 5th harmonic at one fifth the size. The edges get steeper.',
							send: [['h5', 'sum']],
							set: { sum: 'Sum: nearly\nsquare' }
						},
						{
							say: 'Keep adding odd harmonics, each smaller than the last, and the sum closes in on a square wave.',
							send: [['h5', 'sum']],
							set: { h5: 'Then 7f, 9f…\n1/7, 1/9…', sum: 'Sum: square\nwave' },
							light: ['sum']
						},
						{
							say: 'A small overshoot stays at each edge, however many you add. This is the Gibbs effect.',
							set: { h5: 'Then 7f, 9f…\n1/7, 1/9…', sum: 'Square, with\nedge overshoot' },
							light: ['sum']
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
				links: [
					[
						"OpenStax: Kirchhoff's rules",
						'https://openstax.org/books/university-physics-volume-2/pages/10-3-kirchhoffs-rules'
					],
					[
						'MIT 6.002 Circuits and Electronics',
						'https://ocw.mit.edu/courses/6-002-circuits-and-electronics-spring-2007/'
					]
				],
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
				links: [
					[
						"OpenStax: Newton's second law",
						'https://openstax.org/books/university-physics-volume-1/pages/5-3-newtons-second-law'
					],
					[
						'MIT 8.01SC Classical Mechanics',
						'https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/'
					]
				],
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
				links: [
					[
						'OpenStax: The Carnot cycle',
						'https://openstax.org/books/university-physics-volume-2/pages/4-5-the-carnot-cycle'
					],
					[
						'Energy conversion efficiency (Wikipedia)',
						'https://en.wikipedia.org/wiki/Energy_conversion_efficiency'
					]
				],
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
			},
			{
				id: 'materials',
				title: 'Stress, strain and stiffness',
				summary:
					'Load a part and it stretches a little. Stress is the force on each square metre of material, and strain is how far it stretched compared with its length. Their ratio tells you how stiff the material is.',
				points: [
					['Stress', 'force divided by area: σ = F / A, measured in pascals.'],
					['Strain', 'change in length divided by original length. It has no units.'],
					[
						"Young's modulus",
						'E = stress / strain. Steel is about 200 GPa, aluminium about 70 GPa.'
					],
					['Yield strength', 'past this stress, the part stays bent when the load comes off.']
				],
				tip: 'Keep the working stress well below yield. A safety factor of 2 or more is common.',
				code: `σ  = F / A = 10 000 N / 0.0001 m² = 100 MPa
ε  = σ / E = 100 MPa / 200 GPa   = 0.0005
ΔL = ε × L = 0.0005 × 2 m        = 1 mm`,
				links: [
					[
						'OpenStax: Stress, strain and elastic modulus',
						'https://openstax.org/books/university-physics-volume-1/pages/12-3-stress-strain-and-elastic-modulus'
					],
					[
						'MIT 2.001 Mechanics and Materials I',
						'https://ocw.mit.edu/courses/2-001-mechanics-materials-i-fall-2006/'
					]
				],
				sketch: {
					kind: 'Worked example',
					alt: 'A 10 kilonewton load on a steel bar gives 100 megapascals of stress, a strain of 0.0005 and a stretch of 1 millimetre.',
					h: 190,
					nodes: [
						{ id: 'load', label: 'Load\n10 kN', x: 65, y: 50, w: 110, h: 62, fill: 'pink' },
						{
							id: 'bar',
							label: 'Steel bar\n100 mm², 2 m',
							x: 235,
							y: 50,
							w: 160,
							h: 62,
							fill: 'yellow'
						},
						{ id: 'st', label: 'Stress\n= ?', x: 405, y: 50, w: 140, h: 62, fill: 'sky' },
						{ id: 'sn', label: 'Strain\n= ?', x: 405, y: 145, w: 140, h: 62, fill: 'sky' },
						{ id: 'dl', label: 'Stretch\n= ?', x: 200, y: 145, w: 150, h: 62, fill: 'mint' }
					],
					edges: [
						{ from: 'load', to: 'bar' },
						{ from: 'bar', to: 'st' },
						{ from: 'st', to: 'sn' },
						{ from: 'sn', to: 'dl' }
					],
					steps: [
						{
							say: 'A 2 m steel bar with a 100 mm² cross-section carries a 10 kN load.',
							send: [['load', 'bar']],
							light: ['bar']
						},
						{
							say: 'Stress is force over area: 10 000 N / 0.0001 m² = 100 MPa.',
							send: [['bar', 'st']],
							set: { st: 'Stress\n100 MPa' }
						},
						{
							say: 'Steel’s modulus is 200 GPa, so the strain is 100 MPa / 200 GPa = 0.0005.',
							send: [['st', 'sn']],
							set: { st: 'Stress\n100 MPa', sn: 'Strain\n0.0005' }
						},
						{
							say: 'The bar stretches 0.0005 × 2 m = 1 mm. Stiff, but never perfectly rigid.',
							send: [['sn', 'dl']],
							set: { st: 'Stress\n100 MPa', sn: 'Strain\n0.0005', dl: 'Stretch\n1 mm' },
							light: ['dl']
						},
						{
							say: 'Mild steel yields at about 250 MPa, so this bar has a safety factor of 2.5.',
							set: { st: '100 MPa of\n250 yield', sn: 'Strain\n0.0005', dl: 'Stretch\n1 mm' },
							light: ['st']
						}
					]
				}
			},
			{
				id: 'heat-transfer',
				title: 'Heat transfer',
				summary:
					'Heat always flows from hot to cold, in three ways: conduction through solids, convection carried by a moving fluid, and radiation as infrared light. Engineers work out the rate so a chip stays cool or a house stays warm.',
				points: [
					['Conduction', 'heat passing through a material. Rate = k × A × ΔT / thickness.'],
					['Convection', 'moving air or liquid carries heat away. A fan speeds it up.'],
					['Radiation', 'every warm surface gives off infrared light, even in a vacuum.'],
					[
						'Thermal resistance',
						'works like electrical resistance: temperature rise = heat flow × resistance.'
					]
				],
				tip: 'Thermal resistances in series add up, just like resistors. Find the biggest one and fix that first.',
				code: `rise = 50 W × (0.5 + 0.5) °C/W = 50 °C
chip = 25 °C + 50 °C = 75 °C`,
				links: [
					[
						'OpenStax: Mechanisms of heat transfer',
						'https://openstax.org/books/university-physics-volume-2/pages/1-6-mechanisms-of-heat-transfer'
					]
				],
				sketch: {
					kind: 'Thermal circuit',
					alt: 'Fifty watts flows from a chip through thermal paste and a heatsink into 25 degree air, so the chip runs at 75 degrees, or 62.5 with a fan.',
					h: 185,
					nodes: [
						{ id: 'chip', label: 'Chip\n50 W', x: 60, y: 50, w: 100, h: 62, fill: 'pink' },
						{ id: 'paste', label: 'Paste\n0.5 °C/W', x: 180, y: 50, w: 110, h: 62, fill: 'yellow' },
						{ id: 'sink', label: 'Heatsink\n0.5 °C/W', x: 305, y: 50, w: 116, h: 62, fill: 'sky' },
						{ id: 'air', label: 'Air\n25 °C', x: 425, y: 50, w: 90, h: 62, fill: 'mint' },
						{ id: 'temp', label: 'Chip temp = ?', x: 240, y: 145, w: 240, h: 50 }
					],
					edges: [
						{ from: 'chip', to: 'paste' },
						{ from: 'paste', to: 'sink' },
						{ from: 'sink', to: 'air' }
					],
					steps: [
						{
							say: 'A chip turns 50 W into heat, and all of it must reach the 25 °C air.',
							light: ['chip']
						},
						{
							say: 'Conduction carries it through the thermal paste. Each watt costs 0.5 °C, so 25 °C.',
							send: [['chip', 'paste']],
							set: { paste: 'Paste\n25 °C rise' }
						},
						{
							say: 'Convection carries it off the fins into the air: another 25 °C.',
							send: [['paste', 'sink']],
							set: { paste: 'Paste\n25 °C rise', sink: 'Heatsink\n25 °C rise' }
						},
						{
							say: 'The resistances are in series, so the chip sits 50 °C above the air.',
							send: [['sink', 'air']],
							set: {
								paste: 'Paste\n25 °C rise',
								sink: 'Heatsink\n25 °C rise',
								temp: 'Chip = 25 + 50 = 75 °C'
							},
							light: ['temp']
						},
						{
							say: 'A fan halves the heatsink’s resistance to 0.25 °C/W. The chip drops to 62.5 °C.',
							send: [['sink', 'air']],
							set: {
								paste: 'Paste\n25 °C rise',
								sink: 'With fan\n12.5 °C rise',
								temp: 'Chip = 62.5 °C'
							},
							light: ['sink']
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
				links: [
					[
						'Life-cycle assessment (Wikipedia)',
						'https://en.wikipedia.org/wiki/Life-cycle_assessment'
					]
				],
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
				links: [
					[
						'Ellen MacArthur Foundation: circular economy',
						'https://www.ellenmacarthurfoundation.org/topics/circular-economy-introduction/overview'
					],
					['Waste hierarchy (Wikipedia)', 'https://en.wikipedia.org/wiki/Waste_hierarchy']
				],
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
				links: [
					[
						'Microsoft Learn: Sustainable software engineering',
						'https://learn.microsoft.com/en-us/training/modules/sustainable-software-engineering-overview/'
					],
					[
						'Power usage effectiveness (Wikipedia)',
						'https://en.wikipedia.org/wiki/Power_usage_effectiveness'
					]
				],
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
			},
			{
				id: 'carbon-accounting',
				title: 'Carbon accounting: scopes 1, 2 and 3',
				summary:
					'You cannot cut what you have not counted. The GHG Protocol sorts an organisation’s emissions into three scopes, so nothing is counted twice and nothing large is missed.',
				points: [
					[
						'Scope 1',
						'direct emissions from sources you own, such as company vans and gas boilers.'
					],
					['Scope 2', 'emissions from making the electricity, heat or cooling you buy.'],
					[
						'Scope 3',
						'everything else in the value chain, from suppliers to customers using the product. The standard splits it into 15 categories.'
					],
					['CO₂e', 'other gases converted to the amount of CO₂ that would warm the planet as much.']
				],
				tip: 'Scope 3 is often the largest share, so do not stop after counting your own buildings.',
				skip: 'You cut the emissions that are easy to see and miss the ones that matter most.',
				links: [
					['GHG Protocol Corporate Standard', 'https://ghgprotocol.org/corporate-standard'],
					['GHG Protocol Scope 3 Standard', 'https://ghgprotocol.org/standards/scope-3-standard'],
					[
						'US EPA: Scope 1 and 2 guidance',
						'https://www.epa.gov/climateleadership/scope-1-and-scope-2-inventory-guidance'
					]
				],
				sketch: {
					kind: 'Inventory diagram',
					alt: 'A small firm adds 100 tonnes from scope 1, 200 from scope 2 and 1700 from scope 3, so scope 3 is 85 percent of its 2000 tonne total.',
					h: 220,
					nodes: [
						{
							id: 's1',
							label: 'Scope 1\nvans, boilers',
							x: 80,
							y: 45,
							w: 130,
							h: 62,
							fill: 'pink'
						},
						{
							id: 's2',
							label: 'Scope 2\nbought power',
							x: 240,
							y: 45,
							w: 130,
							h: 62,
							fill: 'yellow'
						},
						{ id: 's3', label: 'Scope 3\nvalue chain', x: 400, y: 45, w: 130, h: 62, fill: 'sky' },
						{ id: 'co', label: 'Your company', x: 240, y: 140, w: 160, h: 50, fill: 'mint' },
						{ id: 'tot', label: 'Total: 0 t', x: 240, y: 196, w: 220, h: 36 }
					],
					edges: [
						{ from: 's1', to: 'co' },
						{ from: 's2', to: 'co' },
						{ from: 's3', to: 'co' },
						{ from: 'co', to: 'tot' }
					],
					steps: [
						{
							say: 'Start with fuel you burn yourself, in vans and gas boilers. That is scope 1: 100 t CO₂e.',
							hide: ['s2', 's3'],
							send: [['s1', 'co']],
							set: { s1: 'Scope 1\n100 t', tot: 'Total: 100 t' }
						},
						{
							say: 'Add the electricity you buy. The power station is elsewhere, but you caused it: 200 t.',
							hide: ['s3'],
							send: [['s2', 'co']],
							set: { s1: 'Scope 1\n100 t', s2: 'Scope 2\n200 t', tot: 'Total: 300 t' }
						},
						{
							say: 'Now the value chain: suppliers making your goods and customers using them. 1700 t.',
							send: [['s3', 'co']],
							set: {
								s1: 'Scope 1\n100 t',
								s2: 'Scope 2\n200 t',
								s3: 'Scope 3\n1700 t',
								tot: 'Total: 2000 t'
							},
							light: ['tot']
						},
						{
							say: 'Scope 3 is 85% of the total. Counting only scopes 1 and 2 would miss most of it.',
							set: {
								s1: 'Scope 1\n100 t',
								s2: 'Scope 2\n200 t',
								s3: 'Scope 3\n1700 t',
								tot: 'Scope 3 = 85%'
							},
							light: ['s3']
						},
						{
							say: 'Each scope has its own lever: electric vans, a clean power contract, and work with suppliers.',
							set: {
								s1: 'Electric\nvans',
								s2: 'Clean power\ncontract',
								s3: 'Work with\nsuppliers',
								tot: 'Total: 2000 t'
							},
							light: ['s1', 's2', 's3']
						}
					]
				}
			},
			{
				id: 'renewable-energy',
				title: 'Renewable energy and the grid',
				summary:
					'Wind and solar make clean, cheap power, but only when the wind blows or the sun shines. A grid that leans on them needs ways to match supply and demand every second of the day.',
				points: [
					[
						'Capacity factor',
						'energy a plant really makes in a year, divided by what it would make running flat out.'
					],
					['Variability', 'output follows the weather, so it can swing within hours.'],
					['Storage', 'batteries and pumped hydro save surplus power for later.'],
					['Flexibility', 'demand response, wider grids and backup plants fill the gaps.']
				],
				tip: 'Compare energy, not power ratings. A 1 MW solar farm makes far less in a year than a 1 MW gas plant run all day.',
				code: `energy = rating × hours × capacity factor
1 MW × 8760 h × 0.25 = 2190 MWh a year`,
				links: [
					[
						'US EIA: Generation, capacity and sales',
						'https://www.eia.gov/energyexplained/electricity/electricity-in-the-us-generation-capacity-and-sales.php'
					],
					[
						'Variable renewable energy (Wikipedia)',
						'https://en.wikipedia.org/wiki/Variable_renewable_energy'
					]
				],
				sketch: {
					kind: 'Supply and demand diagram',
					alt: 'At noon spare solar charges a battery. In the evening the battery and wind supply the homes. A long calm, dark spell still needs backup.',
					h: 200,
					nodes: [
						{ id: 'sun', label: 'Solar', x: 75, y: 45, w: 120, h: 62, fill: 'yellow' },
						{ id: 'wind', label: 'Wind', x: 75, y: 155, w: 120, h: 62, fill: 'sky' },
						{ id: 'grid', label: 'Grid', x: 240, y: 100, w: 110, h: 62 },
						{
							id: 'homes',
							label: 'Homes\nnormal demand',
							x: 400,
							y: 45,
							w: 140,
							h: 62,
							fill: 'pink'
						},
						{ id: 'batt', label: 'Battery\nempty', x: 400, y: 155, w: 140, h: 62, fill: 'mint' }
					],
					edges: [
						{ from: 'sun', to: 'grid' },
						{ from: 'wind', to: 'grid' },
						{ from: 'grid', to: 'homes' },
						{ from: 'grid', to: 'batt' }
					],
					steps: [
						{
							say: 'At noon the sun is strong, and solar alone covers the homes.',
							send: [
								['sun', 'grid'],
								['grid', 'homes']
							],
							light: ['sun']
						},
						{
							say: 'There is more than the homes need, so the surplus charges the battery instead of going to waste.',
							send: [
								['sun', 'grid'],
								['grid', 'batt']
							],
							set: { batt: 'Battery\ncharging' }
						},
						{
							say: 'In the evening the sun sets just as people get home and demand peaks.',
							set: { batt: 'Battery\nfull', homes: 'Homes\npeak demand' },
							down: ['sun']
						},
						{
							say: 'The battery gives back what it stored, and the wind tops up the rest.',
							send: [
								['batt', 'grid'],
								['wind', 'grid'],
								['grid', 'homes']
							],
							set: { batt: 'Battery\nemptying', homes: 'Homes\npeak demand' },
							down: ['sun']
						},
						{
							say: 'A calm, dark week is too long for batteries. Backup plants or links to other regions must cover it.',
							set: { batt: 'Battery\nempty', wind: 'Wind\ncalm' },
							down: ['sun', 'wind'],
							light: ['grid']
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
				links: [
					[
						'NASA Systems Engineering Handbook',
						'https://www.nasa.gov/reference/systems-engineering-handbook/'
					],
					['SEBoK: Systems thinking', 'https://sebokwiki.org/wiki/Systems_Thinking']
				],
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
				links: [['V-model (Wikipedia)', 'https://en.wikipedia.org/wiki/V-model']],
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
				links: [
					['FMEA (Wikipedia)', 'https://en.wikipedia.org/wiki/Failure_mode_and_effects_analysis']
				],
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
			},
			{
				id: 'requirements',
				title: 'Writing good requirements',
				summary:
					'A requirement says what the system must do, in words everyone reads the same way. A good one can be tested, and it links back to the need it came from and forward to the test that checks it.',
				points: [
					['Shall', '"The system shall" marks a binding requirement. "Should" marks a wish.'],
					['Verifiable', 'a test, analysis or inspection must be able to prove it is met.'],
					['Traceable', 'each one links up to a stakeholder need and down to designs and tests.'],
					[
						'One idea each',
						'split requirements joined by "and", so each can pass or fail on its own.'
					]
				],
				tip: 'Replace words like fast, easy and user-friendly with a number and a condition.',
				skip: 'Vague requirements turn into arguments at acceptance, when changes cost the most.',
				code: `Bad:  The pump shall start quickly.
Good: The pump shall reach 90% of rated flow
      within 2 s of the start command, at 5 to 40 °C.`,
				links: [
					[
						'NASA: Technical requirements definition',
						'https://www.nasa.gov/reference/4-2-technical-requirements-definition/'
					],
					[
						'SEBoK: System requirements definition',
						'https://sebokwiki.org/wiki/System_Requirements_Definition'
					]
				],
				sketch: {
					kind: 'Traceability diagram',
					alt: 'A vague requirement cannot be tested. Rewritten with numbers, it gets a clear test and links back to the user need.',
					h: 200,
					nodes: [
						{
							id: 'need',
							label: 'User need:\nwater now',
							x: 70,
							y: 50,
							w: 120,
							h: 62,
							fill: 'pink'
						},
						{ id: 'req', label: 'Requirement', x: 240, y: 50, w: 150, h: 62, fill: 'yellow' },
						{ id: 'test', label: 'Test', x: 405, y: 50, w: 130, h: 62, fill: 'mint' },
						{ id: 'des', label: 'Design', x: 240, y: 155, w: 150, h: 62, fill: 'sky' }
					],
					edges: [
						{ from: 'need', to: 'req' },
						{ from: 'req', to: 'test' },
						{ from: 'req', to: 'des' }
					],
					steps: [
						{
							say: 'A user needs water as soon as they turn the tap on.',
							light: ['need']
						},
						{
							say: 'First draft: the pump shall start quickly. But how quick is quick?',
							send: [['need', 'req']],
							set: { req: 'Pump shall\nstart quickly' },
							light: ['req']
						},
						{
							say: 'Try to write its test, and you cannot. Nobody can say pass or fail.',
							send: [['req', 'test']],
							set: { req: 'Pump shall\nstart quickly', test: 'Test: ???' },
							down: ['test']
						},
						{
							say: 'Rewrite it with numbers: 90% of rated flow within 2 s, at 5 to 40 °C.',
							set: { req: '90% flow\nwithin 2 s', test: 'Test: ???' },
							light: ['req']
						},
						{
							say: 'Now the test writes itself, and the design team knows its target.',
							send: [
								['req', 'test'],
								['req', 'des']
							],
							set: {
								req: '90% flow\nwithin 2 s',
								test: 'Time it from\nstart to 90%',
								des: 'Pump sized\nfor 2 s'
							},
							light: ['test', 'des']
						},
						{
							say: 'If the test ever fails, the links show exactly which user need is at risk.',
							send: [
								['test', 'req'],
								['req', 'need']
							],
							set: {
								req: '90% flow\nwithin 2 s',
								test: 'Test failed',
								des: 'Pump sized\nfor 2 s'
							},
							light: ['need']
						}
					]
				}
			},
			{
				id: 'reliability',
				title: 'Reliability and redundancy',
				summary:
					'Reliability is the chance that a system keeps working for a set time. Parts in a chain multiply their reliabilities, so long chains get weaker. A backup in parallel is the classic fix.',
				points: [
					[
						'MTBF',
						'mean time between failures: the average running time from one failure to the next.'
					],
					['Series', 'every part must work. R = R1 × R2 × …, always lower than the weakest part.'],
					['Parallel', 'only one copy must work, so the system fails only if F1 × F2 happens.'],
					['Common cause', 'one event, such as a power cut, that takes out every copy at once.']
				],
				tip: 'Redundancy only helps if the copies fail independently. Give backups their own power and wiring.',
				code: `series:   0.9 × 0.9 × 0.9  = 0.729
parallel: 1 - 0.1 × 0.1    = 0.99
mixed:    0.99 × 0.9 × 0.9 ≈ 0.80`,
				links: [
					[
						'NIST: Assessing product reliability',
						'https://www.itl.nist.gov/div898/handbook/apr/apr.htm'
					],
					[
						'Reliability block diagram (Wikipedia)',
						'https://en.wikipedia.org/wiki/Reliability_block_diagram'
					]
				],
				sketch: {
					kind: 'Reliability block diagram',
					alt: 'A pump, valve and controller in series, each 90 percent reliable, give 73 percent. A backup pump in parallel raises it to 80 percent.',
					h: 210,
					nodes: [
						{ id: 'pump', label: 'Pump\n0.9', x: 75, y: 55, w: 120, h: 62, fill: 'sky' },
						{ id: 'valve', label: 'Valve\n0.9', x: 240, y: 55, w: 120, h: 62, fill: 'sky' },
						{ id: 'ctl', label: 'Controller\n0.9', x: 405, y: 55, w: 120, h: 62, fill: 'sky' },
						{ id: 'spare', label: 'Backup pump\n0.9', x: 75, y: 160, w: 120, h: 62, fill: 'mint' },
						{ id: 'sys', label: 'System = ?', x: 320, y: 165, w: 220, h: 50, fill: 'yellow' }
					],
					edges: [
						{ from: 'pump', to: 'valve' },
						{ from: 'valve', to: 'ctl' },
						{ from: 'spare', to: 'valve' },
						{ from: 'ctl', to: 'sys' }
					],
					steps: [
						{
							say: 'A cooling loop needs its pump, valve and controller all working. Each has a 90% chance of lasting the year.',
							hide: ['spare'],
							light: ['pump', 'valve', 'ctl']
						},
						{
							say: 'In series, multiply: 0.9 × 0.9 × 0.9 = 0.729. Three good parts make a weaker whole.',
							hide: ['spare'],
							send: [
								['pump', 'valve'],
								['valve', 'ctl'],
								['ctl', 'sys']
							],
							set: { sys: 'System = 0.729' }
						},
						{
							say: 'If the pump fails, the whole loop stops.',
							hide: ['spare'],
							set: { sys: 'System down' },
							down: ['pump']
						},
						{
							say: 'Add a backup pump in parallel. Both must fail to lose pumping: 0.1 × 0.1 = 0.01.',
							send: [['spare', 'valve']],
							set: { sys: 'Pumps = 0.99' },
							light: ['spare', 'pump']
						},
						{
							say: 'The system rises to 0.99 × 0.9 × 0.9, about 0.80.',
							send: [
								['spare', 'valve'],
								['valve', 'ctl'],
								['ctl', 'sys']
							],
							set: { sys: 'System ≈ 0.80' },
							light: ['sys']
						},
						{
							say: 'Now the valve and controller are the weak links. Look there next.',
							set: { sys: 'System ≈ 0.80' },
							light: ['valve', 'ctl']
						}
					]
				}
			}
		]
	}
];
