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
							title: 'Secant slope',
							say: 'Take two points on the curve. The gap between them is 1, and the slope is 7.',
							detail:
								'A straight line through two points on a curve is called a secant. Its slope is rise over run: (16 - 9) / (4 - 3) = 7. That is the average rate of change between x = 3 and x = 4, not the rate at x = 3 itself.',
							send: [
								['p', 's'],
								['q', 's']
							],
							light: ['q']
						},
						{
							title: 'Shrink the gap',
							say: 'Move the second point closer: x = 3.1. The slope becomes 6.1.',
							detail:
								'The rise is now 9.61 - 9 = 0.61 over a run of 0.1. The slope fell from 7 to 6.1 because the curve bends, and a shorter piece of it looks more like a straight line.',
							set: { q: 'Moving point\nx = 3.1, y = 9.61', s: 'Slope = 0.61 / 0.1 = 6.1' },
							send: [['q', 's']]
						},
						{
							title: 'Closer still',
							say: 'Closer still: x = 3.01. The slope becomes 6.01.',
							detail:
								'With a gap of 0.01 the error above 6 has shrunk ten times again. For x² the secant slope between 3 and 3 + h is exactly 6 + h, so the extra part always equals the gap.',
							set: { q: 'Moving point\nx = 3.01, y = 9.0601', s: 'Slope = 0.0601 / 0.01 = 6.01' },
							send: [['q', 's']]
						},
						{
							title: 'Take the limit',
							say: 'As the gap shrinks to nothing, the slope settles on exactly 6. That limit is the derivative.',
							detail:
								'You cannot divide by a gap of zero, so instead you ask what value the slope heads towards as the gap gets tiny. The power rule gives 2x for x², and at x = 3 that is 6. It is the slope of the tangent, the line that just touches the curve there.',
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
							title: 'Set up the system',
							say: 'Two equations and two unknowns. Each row is one equation.',
							detail:
								'Each equation is a straight line on a graph, and the answer is where the two lines cross. In matrix form this is Ax = b. The determinant is 1 × 1 - 1 × 2 = -1, which is not zero, so there is exactly one answer.',
							light: ['r1', 'r2']
						},
						{
							title: 'Eliminate x',
							say: 'Subtract 2 × row 1 from row 2 to remove x.',
							detail:
								'Row 1 times 2 is 2x + 2y = 10. Taking that from 2x + y = 8 leaves -y = -2. Subtracting a multiple of one row from another never changes the answer, because you do the same thing to both sides of a true equation.',
							send: [['r1', 'r2']],
							set: { r2: '-y = -2' },
							light: ['r2']
						},
						{
							title: 'Solve for y',
							say: 'Row 2 now has one unknown, so y = 2.',
							detail:
								'A row with a single unknown can be solved straight away: multiply both sides by -1 to get y = 2. In a bigger system, elimination carries on until the last row has one unknown, leaving a staircase shape called upper triangular form.',
							send: [['r2', 'out']],
							set: { r2: '-y = -2', out: 'x = ?\ny = 2' }
						},
						{
							title: 'Back substitution',
							say: 'Put y = 2 back into row 1 and you get x = 3.',
							detail:
								'Now work back up the rows. Row 1 becomes x + 2 = 5, so x = 3. With n unknowns you solve the last row first, then feed each answer into the row above, which is why this is called back substitution.',
							send: [['r1', 'out']],
							set: { r2: '-y = -2', r1: 'x + 2 = 5', out: 'x = 3\ny = 2' },
							light: ['out']
						},
						{
							title: 'Check the answer',
							say: 'Check it: 2(3) + 2 = 8. It works.',
							detail:
								'Putting both values into every original equation catches arithmetic slips. Here 3 + 2 = 5 and 2 × 3 + 2 = 8, so the point (3, 2) lies on both lines. Computers do the same check with the residual, b minus A times x, which should be close to zero.',
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
							title: 'Work out the rate',
							say: 'Start at 90 °C in a 20 °C room. The rate is -0.1 × (90 - 20) = -7.',
							detail:
								"Newton's law of cooling says the rate is proportional to the gap between the coffee and the room. With k = 0.1 per minute and a 70 °C gap, the coffee is losing 7 °C a minute right now. The minus sign means the temperature is falling.",
							send: [['t', 'r']],
							light: ['r']
						},
						{
							title: 'Take a step',
							say: 'Assume that rate holds for 5 minutes, so the coffee drops 35 °C.',
							detail:
								"Euler's method pretends the rate stays fixed for the whole step: change = step × rate = 5 × -7 = -35 °C. In reality the rate falls as the coffee cools, so this overshoots. The exact answer after 5 minutes is about 62.5 °C.",
							send: [['r', 's']],
							light: ['s']
						},
						{
							title: 'Update the state',
							say: 'New temperature: 55 °C.',
							detail:
								"The new state is the old one plus the change: 90 - 35 = 55 °C. That is the whole of Euler's rule, T(next) = T + step × dT/dt. The loop then starts again from this new value.",
							send: [['s', 't']],
							set: { t: 'Coffee\n55 °C' }
						},
						{
							title: 'Recompute the rate',
							say: 'Cooler coffee cools more slowly: the rate is now -3.5.',
							detail:
								'The gap to the room is now 35 °C, so the rate is -0.1 × 35 = -3.5 °C a minute, half what it was. This is feedback inside the equation: the state sets the rate, and the rate changes the state.',
							send: [['t', 'r']],
							set: { t: 'Coffee\n55 °C', r: 'Rate now\n-3.5 °C/min', s: 'Step 5 min\nchange -17.5' }
						},
						{
							title: 'Repeat and settle',
							say: 'New temperature: 37.5 °C. Each step shrinks, so the curve flattens towards 20 °C.',
							detail:
								'Each step removes half of the remaining gap, because step × k = 0.5. The estimate creeps towards 20 °C without crossing it. With steps longer than 10 minutes it would jump past 20 °C, and beyond 20 minutes it would swing further each time.',
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
							title: 'Natural variation',
							say: 'A factory makes 1000 resistors marked 100 Ω. No two are exactly alike.',
							detail:
								'Small differences in material, temperature and machine wear mean every part comes out slightly different. The 100 Ω marking is the nominal value, the target. A tolerance such as ±2% says how far real parts may stray from it.',
							light: ['lot']
						},
						{
							title: 'Take a sample',
							say: 'Testing every one is slow, so measure a sample of 30.',
							detail:
								'Pick parts at random, not just the first 30 off the line, or the sample may miss a drift during the shift. The uncertainty in the estimated mean shrinks with the square root of the sample size, so four times the samples halves it.',
							send: [['lot', 'smp']],
							light: ['smp']
						},
						{
							title: 'Find the mean',
							say: 'Their average is 100.0 Ω. That is the mean.',
							detail:
								'Add the 30 readings and divide by 30. The mean shows where the batch is centred, but nothing about how scattered it is. Two batches can share a mean of 100 Ω while one runs from 99 to 101 Ω and the other from 90 to 110 Ω.',
							send: [['smp', 'mean']],
							set: { mean: 'Mean\n100.0 Ω' }
						},
						{
							title: 'Measure the spread',
							say: 'A typical resistor sits 1 Ω from the mean. That is the standard deviation.',
							detail:
								"Take each reading's distance from the mean, square it, average the squares, then take the square root. For a sample you divide by n - 1, here 29, to make up for using the sample's own mean. Squaring stops values above and below the mean cancelling out.",
							send: [['smp', 'sd']],
							set: { mean: 'Mean\n100.0 Ω', sd: 'Spread\n1 Ω' }
						},
						{
							title: 'Compare with the limits',
							say: 'The limits are 98 to 102 Ω, which is ±2 standard deviations. About 95% pass.',
							detail:
								'For a normal distribution the share within k standard deviations is fixed: 68.3% within 1, 95.4% within 2, 99.7% within 3. So you only need to know how many standard deviations fit between the mean and each limit. Here 2 Ω / 1 Ω = 2.',
							send: [['sd', 'res']],
							set: { mean: 'Mean\n100.0 Ω', sd: 'Spread\n1 Ω', res: 'Inside 98-102 Ω:\nabout 95%' },
							light: ['res']
						},
						{
							title: 'Shrink the spread',
							say: 'So about 46 in 1000 fail. To fix that, shrink the spread, not the average.',
							detail:
								'4.6% of 1000 is 46 parts, half under 98 Ω and half over 102 Ω. Moving the mean cannot help, as it is already centred. Halving the spread to 0.5 Ω puts the limits at 4 standard deviations, and only about 6 parts in 100 000 would fail.',
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
							title: 'The fundamental',
							say: 'Start with one sine wave at the square wave’s own frequency. It is a rough match.',
							detail:
								"The fundamental repeats at the same rate as the square wave. Its peak is 4/π, about 1.27 times the square wave's height, so it overshoots in the middle and falls short near the edges. Even so, it carries about 81% of the signal's power.",
							hide: ['h3', 'h5'],
							send: [['h1', 'sum']],
							set: { sum: 'Sum: a plain\nsine wave' }
						},
						{
							title: 'Add the 3rd harmonic',
							say: 'Add the 3rd harmonic at one third the size. The top starts to flatten.',
							detail:
								'The 3rd harmonic runs three times as fast. Where the fundamental peaks, it is at its lowest, so it pulls the middle down and lifts the shoulders. There are no even harmonics because the top and bottom halves of a square wave are mirror images.',
							hide: ['h5'],
							send: [['h3', 'sum']],
							set: { sum: 'Sum: flatter\ntop' }
						},
						{
							title: 'Add the 5th harmonic',
							say: 'Add the 5th harmonic at one fifth the size. The edges get steeper.',
							detail:
								"Higher harmonics change faster, so they build the sharp rise and fall at each edge. Each is smaller than the last, because its size is 1/n. With just these three terms the sum already carries about 93% of the square wave's power.",
							send: [['h5', 'sum']],
							set: { sum: 'Sum: nearly\nsquare' }
						},
						{
							title: 'Keep adding odd ones',
							say: 'Keep adding odd harmonics, each smaller than the last, and the sum closes in on a square wave.',
							detail:
								'The full recipe is 4/π times the sum of sin(nωt) / n for every odd n. Because the sizes only shrink as 1/n, sharp edges need many terms. That is why a fast digital clock spreads energy far up the radio spectrum and can cause interference.',
							send: [['h5', 'sum']],
							set: { h5: 'Then 7f, 9f…\n1/7, 1/9…', sum: 'Sum: square\nwave' },
							light: ['sum']
						},
						{
							title: 'The Gibbs overshoot',
							say: 'A small overshoot stays at each edge, however many you add. This is the Gibbs effect.',
							detail:
								'Near each jump the sum overshoots by about 9% of the jump size. More terms squeeze the overshoot closer to the edge but never make it shorter. Engineers see it as ringing beside sharp edges, and tapering the high harmonics reduces it.',
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
						{
							title: 'Add series resistance',
							say: 'Total resistance in series is 1 kΩ + 2 kΩ = 3 kΩ.',
							detail:
								'In series the same current must pass through each resistor in turn, so their opposition adds up: 1000 Ω + 2000 Ω = 3000 Ω. The battery sees the pair exactly as if it were one 3 kΩ resistor.',
							light: ['r1', 'r2']
						},
						{
							title: 'Find the current',
							say: "Ohm's law gives the current: 9 V / 3 kΩ = 3 mA, the same everywhere in the loop.",
							detail:
								"Rearranged, Ohm's law gives I = V / R = 9 / 3000 = 0.003 A. There is only one path and charge cannot pile up anywhere, so every point in the loop carries the same 3 mA. This is Kirchhoff's current law at work.",
							send: [
								['b', 'r1'],
								['r1', 'r2'],
								['r2', 'b']
							]
						},
						{
							title: 'Drop across R1',
							say: 'R1 drops 3 mA × 1 kΩ = 3 V.',
							detail:
								'A voltage drop is the energy each coulomb of charge gives up passing through a part. For R1, V = I × R = 0.003 × 1000 = 3 V. R1 also turns P = 3 V × 3 mA = 9 mW into heat.',
							send: [['b', 'r1']],
							set: { r1: 'R1 drops 3 V' },
							light: ['r1']
						},
						{
							title: 'Drop across R2',
							say: 'R2 drops 3 mA × 2 kΩ = 6 V.',
							detail:
								'R2 has twice the resistance and the same current, so it takes twice the voltage. In series, voltage splits in proportion to resistance. A voltage divider uses exactly this to make a smaller voltage from a bigger one.',
							send: [['r1', 'r2']],
							set: { r1: 'R1 drops 3 V', r2: 'R2 drops 6 V' },
							light: ['r2']
						},
						{
							title: 'Check the loop',
							say: 'The drops add up to 9 V, so the voltage law holds.',
							detail:
								"Kirchhoff's voltage law says the drops around any closed loop add up to the sources in it: 3 V + 6 V = 9 V. All the energy the battery gives is used by the resistors. If your total does not match, there is a slip in the working.",
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
						{
							title: 'Isolate the car',
							say: 'Isolate the car and draw every force on it.',
							detail:
								"A free-body diagram shows one object on its own, with an arrow for every force acting on it. Weight and the road's support act too, but they cancel out vertically. So only the horizontal forces matter for speeding up.",
							light: ['car']
						},
						{
							title: 'Driving force',
							say: 'The engine pushes forwards with 3000 N.',
							detail:
								"The engine turns the wheels, and the tyres push backwards on the road. By Newton's third law the road pushes the car forwards with an equal force, here 3000 N. That grip between tyre and road is what actually moves the car.",
							send: [['en', 'car']],
							light: ['en']
						},
						{
							title: 'Resisting force',
							say: 'Drag pushes back with 1000 N.',
							detail:
								'Air resistance and rolling resistance push against the motion. Air drag grows roughly with the square of speed, so doubling the speed gives about four times the drag. At this moment they add up to 1000 N.',
							send: [['dr', 'car']],
							light: ['dr']
						},
						{
							title: 'Find the net force',
							say: 'The net force is 2000 N forwards.',
							detail:
								'Forces in opposite directions subtract: 3000 N - 1000 N = 2000 N forwards. Only the net force changes motion. Using the 3000 N engine force alone would overestimate the acceleration by 50%.',
							send: [
								['en', 'car'],
								['dr', 'car']
							],
							set: { a: 'Net force = 2000 N' },
							light: ['a']
						},
						{
							title: 'Apply F = ma',
							say: 'a = F / m = 2000 / 1000 = 2 m/s².',
							detail:
								"Newton's second law rearranged is a = F / m. An acceleration of 2 m/s² adds 2 m/s of speed every second, so after 5 s the car would be doing 10 m/s, or 36 km/h, if the forces stayed the same.",
							set: { a: 'a = 2 m/s²' },
							light: ['a']
						},
						{
							title: 'Reach top speed',
							say: 'As speed rises, drag grows. When drag reaches 3000 N, the forces balance and speed stays constant.',
							detail:
								"Because drag grows with speed, the net force and the acceleration shrink as the car speeds up. When drag equals the engine force the net force is zero, and by Newton's first law the speed stops changing. That balance point is the top speed.",
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
							title: 'Energy in',
							say: 'A power station starts with 100 units of chemical energy in fuel.',
							detail:
								"Think of the units as percentages of the fuel's chemical energy. The first law says all 100 units must end up somewhere, as useful output or as losses. Following them stage by stage is called an energy balance.",
							light: ['a']
						},
						{
							title: 'Boiler stage',
							say: 'The boiler turns it into steam at 90% efficiency.',
							detail:
								'Burning fuel heats water into high-pressure steam. About 10 units escape, mostly as hot exhaust gas up the chimney. Stage efficiency is useful output over input: 90 / 100 = 90%.',
							send: [['a', 'b']],
							set: { b: 'Boiler\n90', loss: 'Lost as heat: 10' }
						},
						{
							title: 'Turbine stage',
							say: 'The turbine turns heat into rotation. This is the biggest loss, because of the second law.',
							detail:
								'Steam spins the turbine and is then cooled back to water, and that heat is thrown away. The second law caps the share of heat that can become work at 1 - Tcold / Thot in kelvin, about 63% for 550 °C steam and a 30 °C condenser. This turbine gets 40 / 90, about 44%.',
							send: [['b', 'c']],
							set: { b: 'Boiler\n90', c: 'Turbine\n40', loss: 'Lost as heat: 60' },
							light: ['loss']
						},
						{
							title: 'Generator stage',
							say: 'The generator makes electricity at 95% efficiency.',
							detail:
								'A generator turns rotation into electricity with magnets and coils. It has no heat-to-work limit, so it can be very efficient: 38 / 40 = 95%. The small loss comes from resistance in the coils, friction in the bearings and magnetic losses in the iron.',
							send: [['c', 'd']],
							set: {
								b: 'Boiler\n90',
								c: 'Turbine\n40',
								d: 'Generator\n38',
								loss: 'Lost as heat: 62'
							}
						},
						{
							title: 'Overall efficiency',
							say: 'Overall efficiency is 38%, and the other 62 units warm the surroundings.',
							detail:
								'Overall efficiency is the product of the stages: 0.9 × 0.44 × 0.95, about 0.38. The weakest stage dominates, so the turbine side is where gains pay most. Combined cycle plants reuse hot gas turbine exhaust to make steam and reach about 60%.',
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
							title: 'The loaded bar',
							say: 'A 2 m steel bar with a 100 mm² cross-section carries a 10 kN load.',
							detail:
								'Convert units first, because mistakes hide there. 100 mm² is 0.0001 m², and 10 kN is 10 000 N. The load pulls along the bar, so the whole cross-section shares it evenly.',
							send: [['load', 'bar']],
							light: ['bar']
						},
						{
							title: 'Work out stress',
							say: 'Stress is force over area: 10 000 N / 0.0001 m² = 100 MPa.',
							detail:
								'Stress is force per unit area, σ = F / A, in pascals, where 1 Pa is 1 N per m². 100 MPa means every square millimetre carries 100 N. Stress lets you compare thick and thin parts on the same scale.',
							send: [['bar', 'st']],
							set: { st: 'Stress\n100 MPa' }
						},
						{
							title: 'Work out strain',
							say: 'Steel’s modulus is 200 GPa, so the strain is 100 MPa / 200 GPa = 0.0005.',
							detail:
								"In the elastic range, stress is proportional to strain. This is Hooke's law, and the constant is Young's modulus, E. So strain = 100 MPa / 200 000 MPa = 0.0005, or 0.05%. Aluminium, at 70 GPa, would stretch nearly three times as much.",
							send: [['st', 'sn']],
							set: { st: 'Stress\n100 MPa', sn: 'Strain\n0.0005' }
						},
						{
							title: 'Find the stretch',
							say: 'The bar stretches 0.0005 × 2 m = 1 mm. Stiff, but never perfectly rigid.',
							detail:
								'Strain is change in length over original length, so the stretch is ΔL = ε × L = 0.0005 × 2000 mm = 1 mm. Below yield the stretch is elastic, so the bar springs back to its full length when the load comes off.',
							send: [['sn', 'dl']],
							set: { st: 'Stress\n100 MPa', sn: 'Strain\n0.0005', dl: 'Stretch\n1 mm' },
							light: ['dl']
						},
						{
							title: 'Safety factor',
							say: 'Mild steel yields at about 250 MPa, so this bar has a safety factor of 2.5.',
							detail:
								'The safety factor is failure stress over working stress: 250 / 100 = 2.5. The margin covers flaws, wrong load estimates and wear. Loads repeated millions of times can grow fatigue cracks well below yield, so those parts need a bigger margin.',
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
							title: 'Heat source',
							say: 'A chip turns 50 W into heat, and all of it must reach the 25 °C air.',
							detail:
								'In steady state, heat leaves the chip as fast as the 50 W goes in, or its temperature keeps climbing. Heat flow works like current: a temperature difference drives it and thermal resistance opposes it. The 25 °C air is the cold end.',
							light: ['chip']
						},
						{
							title: 'Conduct through paste',
							say: 'Conduction carries it through the thermal paste. Each watt costs 0.5 °C, so 25 °C.',
							detail:
								'Thermal paste fills tiny air gaps between chip and heatsink, because air conducts heat very poorly. The rise is heat flow × thermal resistance: 50 W × 0.5 °C/W = 25 °C. This is the thermal version of V = I × R.',
							send: [['chip', 'paste']],
							set: { paste: 'Paste\n25 °C rise' }
						},
						{
							title: 'Convect into the air',
							say: 'Convection carries it off the fins into the air: another 25 °C.',
							detail:
								'Heat conducts through the metal into the fins, and air moving over them carries it away. Convection rate is h × A × ΔT, where h is how readily the fluid takes heat, so the fins add area. Another 0.5 °C/W means another 25 °C rise.',
							send: [['paste', 'sink']],
							set: { paste: 'Paste\n25 °C rise', sink: 'Heatsink\n25 °C rise' }
						},
						{
							title: 'Add the resistances',
							say: 'The resistances are in series, so the chip sits 50 °C above the air.',
							detail:
								'Thermal resistances in series add like resistors: 0.5 + 0.5 = 1 °C/W, so the rise is 50 W × 1 °C/W = 50 °C. The chip temperature follows the air, so on a 35 °C day it would reach 85 °C.',
							send: [['sink', 'air']],
							set: {
								paste: 'Paste\n25 °C rise',
								sink: 'Heatsink\n25 °C rise',
								temp: 'Chip = 25 + 50 = 75 °C'
							},
							light: ['temp']
						},
						{
							title: 'Add a fan',
							say: 'A fan halves the heatsink’s resistance to 0.25 °C/W. The chip drops to 62.5 °C.',
							detail:
								"Faster air raises the convection coefficient h, which lowers the heatsink's resistance. The total is now 0.5 + 0.25 = 0.75 °C/W, a 37.5 °C rise. The paste is now the largest resistance, so it is the next thing to improve.",
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
							title: 'Raw materials',
							say: 'Metals and minerals are mined, which has its own energy and water cost.',
							detail:
								'Mining, crushing and refining ore uses lots of energy, water and land. Gold, for example, often comes from ore holding only a few grams per tonne of rock. An assessment charges these impacts to the product too.',
							light: ['a']
						},
						{
							title: 'Manufacture',
							say: 'For a smartphone, making it is usually the biggest source of carbon.',
							detail:
								'Making chips and screens needs clean rooms, high-purity chemicals and a lot of electricity. For a typical smartphone, studies put roughly 70 to 80% of its lifetime carbon in production. Keeping a phone a year longer spreads that cost over more use.',
							send: [['a', 'b']],
							light: ['b'],
							set: { b: 'Hot spot\nfor a phone' }
						},
						{
							title: 'Transport',
							say: 'It is shipped around the world.',
							detail:
								'Most goods travel by sea, which emits far less per tonne-kilometre than air freight. For small, high-value electronics, transport is usually a small slice of the total. Flying the product instead can multiply that slice many times.',
							send: [['b', 'c']],
							light: ['c']
						},
						{
							title: 'Use phase',
							say: 'For a data centre server, the hot spot flips to electricity used over its life.',
							detail:
								'A server runs around the clock for years. One drawing 400 W all year uses about 3500 kWh, so electricity, not manufacture, dominates its footprint. A cleaner grid or a more efficient server shrinks this stage.',
							send: [['c', 'd']],
							light: ['d'],
							set: { d: 'Hot spot\nfor a server' }
						},
						{
							title: 'End of life',
							say: 'At the end, it is reused, recycled or dumped. Design decisions made years earlier decide which.',
							detail:
								'Screws instead of glue, standard parts and labelled materials decide whether a product can be taken apart. Glued batteries and mixed plastics make recycling slow and costly, so many devices are shredded or dumped. Worldwide, under a quarter of e-waste is formally recycled.',
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
							title: 'Linear model',
							say: 'Linear: make it, use it, throw it away. Every new unit needs new material.',
							detail:
								'In a linear economy materials flow one way, from mine to landfill. Each new unit means new mining, processing and factory emissions. Electronics in landfill can also leak lead and mercury into soil and water.',
							hide: ['fix', 'rec'],
							send: [
								['make', 'use'],
								['use', 'bin']
							],
							light: ['bin']
						},
						{
							title: 'Repair loop',
							say: 'Circular: when it breaks, repair it so the same product carries on.',
							detail:
								'Repair keeps the most value, because the energy and materials already built into the product are kept. A new battery or screen costs a small share of the impact of a new device. That is why reuse and repair sit above recycling in the waste hierarchy.',
							send: [['use', 'fix']],
							light: ['fix']
						},
						{
							title: 'Recover materials',
							say: 'When it can no longer be repaired, recover the materials.',
							detail:
								'Recycling breaks the product down to raw materials, which throws away the effort of shaping them. Metals such as copper and gold recycle well. Many others are lost because they are used in tiny amounts or mixed into alloys.',
							send: [['fix', 'rec']],
							light: ['rec']
						},
						{
							title: 'Close the loop',
							say: 'Those materials go into the next product, and landfill gets much less.',
							detail:
								'Recycled material replaces newly mined material, so less extraction is needed. Recycled aluminium, for example, takes about 5% of the energy of making it from ore. The loop is never fully closed, so reduce and reuse still come first.',
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
							title: 'Flexible work',
							say: 'A report job can run any time tonight, so it does not need to run right now.',
							detail:
								'Work with a deadline but no fixed start time, such as reports, backups or model training, can be moved. Interactive work, such as loading a web page, cannot wait. Finding which jobs are flexible is the first step to scheduling them well.',
							light: ['job']
						},
						{
							title: 'Check grid carbon',
							say: 'A carbon-aware scheduler checks the grid: it is high carbon at the moment.',
							detail:
								'Carbon intensity is the grams of CO₂ released per kWh of electricity, and it changes hour by hour as the mix of power plants changes. Grid operators and data services publish live figures and forecasts. A coal-heavy hour can be several times dirtier than a windy one.',
							send: [['job', 'grid']],
							light: ['grid']
						},
						{
							title: 'Wait for clean power',
							say: 'The job waits. A few hours later, wind power is high.',
							detail:
								"The scheduler compares the forecast with the job's deadline and picks the cleanest window that still finishes in time. Waiting itself uses no energy. Moving work to a region with a cleaner grid is the same idea, applied to place instead of time.",
							set: { grid: 'Grid now\nlow carbon' },
							light: ['grid']
						},
						{
							title: 'Run on clean power',
							say: 'The job runs on cleaner power: the same work with less carbon.',
							detail:
								"The job uses the same kWh either way, but each kWh now comes with less CO₂. Emissions = energy × carbon intensity, so halving the intensity halves the job's emissions. Making the code more efficient cuts the energy side of that sum.",
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
							title: 'Scope 1: direct',
							say: 'Start with fuel you burn yourself, in vans and gas boilers. That is scope 1: 100 t CO₂e.',
							detail:
								'Scope 1 covers gases released from sources you own or control, such as burning diesel or gas, or refrigerant leaks. Fuel used is multiplied by an emission factor: a litre of diesel gives about 2.7 kg of CO₂. Fuel bills make this the easiest scope to measure.',
							hide: ['s2', 's3'],
							send: [['s1', 'co']],
							set: { s1: 'Scope 1\n100 t', tot: 'Total: 100 t' }
						},
						{
							title: 'Scope 2: bought energy',
							say: 'Add the electricity you buy. The power station is elsewhere, but you caused it: 200 t.',
							detail:
								"Scope 2 is kWh from your bills times an emission factor for the grid. The power station counts the same tonnes as its own scope 1, so keeping them in your scope 2 stops them sitting in two companies' scope 1. You can report a grid average or a figure based on your supplier contract.",
							hide: ['s3'],
							send: [['s2', 'co']],
							set: { s1: 'Scope 1\n100 t', s2: 'Scope 2\n200 t', tot: 'Total: 300 t' }
						},
						{
							title: 'Scope 3: value chain',
							say: 'Now the value chain: suppliers making your goods and customers using them. 1700 t.',
							detail:
								'Scope 3 has 15 categories, upstream and downstream: bought goods, business travel, commuting, use of sold products, disposal and more. Data often comes from suppliers or from spend-based estimates, such as kg of CO₂e per pound spent. It is the hardest scope to measure and the least precise.',
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
							title: 'Find the biggest share',
							say: 'Scope 3 is 85% of the total. Counting only scopes 1 and 2 would miss most of it.',
							detail:
								'1700 / 2000 = 0.85, so 85%. For many firms scope 3 is well over half the total, and for retailers and manufacturers it can top 90%. Leaving it out can make a company look far cleaner than its products really are.',
							set: {
								s1: 'Scope 1\n100 t',
								s2: 'Scope 2\n200 t',
								s3: 'Scope 3\n1700 t',
								tot: 'Scope 3 = 85%'
							},
							light: ['s3']
						},
						{
							title: 'Pick a lever per scope',
							say: 'Each scope has its own lever: electric vans, a clean power contract, and work with suppliers.',
							detail:
								'Scope 1 falls by switching fuels, such as electric vans, and scope 2 by using less power or buying clean power. Scope 3 needs influence rather than control: supplier targets, lower-carbon materials and products that use less energy. Track every cut against a fixed baseline year.',
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
							title: 'Solar at noon',
							say: 'At noon the sun is strong, and solar alone covers the homes.',
							detail:
								"Solar output follows the sun, peaking around midday and falling to zero at night. A panel's rating is its output in full test sunlight of 1000 W per m², which it rarely sees for long. Across a year, UK solar has a capacity factor of only about 10%.",
							send: [
								['sun', 'grid'],
								['grid', 'homes']
							],
							light: ['sun']
						},
						{
							title: 'Store the surplus',
							say: 'There is more than the homes need, so the surplus charges the battery instead of going to waste.',
							detail:
								'Supply and demand must match every second, or the grid frequency drifts from its 50 Hz target. Charging a battery soaks up the extra instead of switching panels off, which is called curtailment. Lithium-ion batteries give back about 85 to 90% of the energy put in.',
							send: [
								['sun', 'grid'],
								['grid', 'batt']
							],
							set: { batt: 'Battery\ncharging' }
						},
						{
							title: 'Evening peak',
							say: 'In the evening the sun sets just as people get home and demand peaks.',
							detail:
								'Demand rises in the early evening as people cook, light their homes and switch things on, just as solar fades. The steep ramp other sources must cover is called the duck curve, after the shape of the graph. Planners must fill it every day.',
							set: { batt: 'Battery\nfull', homes: 'Homes\npeak demand' },
							down: ['sun']
						},
						{
							title: 'Battery and wind',
							say: 'The battery gives back what it stored, and the wind tops up the rest.',
							detail:
								'The battery covers part of the peak, and wind, which often blows at night, adds the rest. A battery has a power rating in MW and an energy size in MWh, so a 100 MW, 400 MWh battery can run flat out for 4 hours. That shifts solar into the evening, but cannot cover days.',
							send: [
								['batt', 'grid'],
								['wind', 'grid'],
								['grid', 'homes']
							],
							set: { batt: 'Battery\nemptying', homes: 'Homes\npeak demand' },
							down: ['sun']
						},
						{
							title: 'Cover long gaps',
							say: 'A calm, dark week is too long for batteries. Backup plants or links to other regions must cover it.',
							detail:
								'Winter spells with little wind or sun can last a week or more. Storing enough for that in batteries would cost far too much, so grids rely on gas or hydro plants, links to other countries and cutting flexible demand. These rare spells set how much backup a grid needs.',
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
							title: 'Sense the room',
							say: 'The target is 22 °C. The sensor reports the room is at 18 °C.',
							detail:
								'The sensor measures the room and sends the reading back to the thermostat, which compares it with the target. Without this feedback the controller would be guessing. It could not react to an open window or a sunny afternoon.',
							send: [
								['room', 'sen'],
								['sen', 'ctl']
							],
							light: ['ctl']
						},
						{
							title: 'Act on the error',
							say: 'The error is 4 °C, so the thermostat switches the heater on.',
							detail:
								'Error = target - measured = 22 - 18 = 4 °C. A simple on-off thermostat only checks whether the error is above or below zero. More advanced controllers, such as PID, respond harder when the error is bigger.',
							send: [['ctl', 'heat']],
							set: { heat: 'Heater\non' }
						},
						{
							title: 'The room responds',
							say: 'The room warms up.',
							detail:
								'The heater adds energy and the room warms slowly, because the walls, furniture and air store heat. This lag means the room keeps warming for a while after the heater turns off. Lags like this are why feedback loops can overshoot.',
							send: [['heat', 'room']],
							set: { heat: 'Heater\non', room: 'Room\n22 °C' }
						},
						{
							title: 'The loop closes',
							say: 'The sensor reports 22 °C, so the heater goes off. No part knows the whole plan, but the loop does the job.',
							detail:
								'With no error left the heater switches off, and the loop waits for the next drop. Real thermostats add a small band, say ±0.5 °C, so the heater does not flick on and off every few seconds. Holding the target is an emergent behaviour of the loop.',
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
						{
							title: 'Define requirements',
							say: 'Go down the left: define what the system must do.',
							detail:
								'Requirements say what the system must do and how well, without saying how. Each one should be measurable, so it can be proved later. The team plans the acceptance tests that will check them at the same time.',
							light: ['req']
						},
						{
							title: 'Break it down',
							say: 'Split it into subsystems, then into detailed parts.',
							detail:
								'System design splits the whole into subsystems and fixes the interfaces between them. Detailed design then specifies each part closely enough to build it. Each level also gets a matching test plan, shown by the dashed lines across the V.',
							send: [
								['req', 'des'],
								['des', 'det']
							],
							light: ['des', 'det']
						},
						{
							title: 'Build at the bottom',
							say: 'Write the code at the bottom of the V.',
							detail:
								'Implementation turns the detailed design into code or hardware. It is the only stage that makes the product itself, while everything above it plans and everything to the right checks. A fault caught here costs far less to fix than one found at acceptance.',
							send: [['det', 'code']],
							light: ['code']
						},
						{
							title: 'Unit testing',
							say: 'Climb the right side: unit tests check the detailed design.',
							detail:
								'Unit tests check each small part on its own against the detailed design, often automatically on every change. When one fails, the fault is in a small piece of code, so it is quick to find. Unit tests alone cannot show that the parts work together.',
							send: [['code', 'unit']],
							light: ['unit', 'det']
						},
						{
							title: 'Integration testing',
							say: 'Integration tests check that the parts work together as designed.',
							detail:
								'Integration tests join parts and check the interfaces between them against the system design. Many faults hide here: mismatched units, timing problems, or two teams reading one interface differently. NASA lost the Mars Climate Orbiter in 1999 to a pound-force versus newton mix-up.',
							send: [['unit', 'int']],
							light: ['int', 'des']
						},
						{
							title: 'Acceptance testing',
							say: 'Acceptance tests check the system against the original requirements.',
							detail:
								'Acceptance tests check the finished system against the requirements, often with the customer watching. This is validation: did we build the right thing? Because the tests were planned at the top left, there is little room to argue about what passing means.',
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
					alt: 'A sensor failure is scored for severity, occurrence and detection, giving a risk number of 252. Adding a self-check lowers it to 36.',
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
						{
							title: 'Choose a failure mode',
							say: 'Pick one way the system could fail.',
							detail:
								'A failure mode is one specific way a part stops doing its job, such as a sensor giving no signal, a stuck reading or a noisy one. Teams list the modes for each part, often by walking through a block diagram. Each mode is scored on its own.',
							light: ['f']
						},
						{
							title: 'Score three factors',
							say: 'Score how bad it is, how likely it is, and how hard it is to detect.',
							detail:
								'Each factor is rated 1 to 10 from a shared table. Severity 9 means a safety risk, occurrence 4 means it happens now and then, and detection 7 means it is hard to catch in time. A high detection score is bad, because the failure goes unnoticed.',
							send: [
								['f', 's'],
								['f', 'o'],
								['f', 'd']
							]
						},
						{
							title: 'Calculate the RPN',
							say: 'Multiply them: 9 × 4 × 7 = 252. That goes to the top of the list.',
							detail:
								'The risk priority number runs from 1 to 1000. Sorting every failure mode by RPN shows where to spend effort first. Many teams also act on any severity of 9 or 10, whatever its RPN.',
							light: ['r']
						},
						{
							title: 'Improve detection',
							say: 'Add a self-check, so a dead sensor is spotted right away. Detection drops to 1.',
							detail:
								'A self-check, such as watching for a signal that stops changing, catches the failure as soon as it happens. The RPN becomes 9 × 4 × 1 = 36. The failure still happens just as often, but now the system can warn the driver or switch to a safe mode.',
							set: { d: 'Detection\n1', r: 'RPN = 36' },
							light: ['d']
						},
						{
							title: 'Severity stays high',
							say: 'Severity is still 9, so keep a backup in the design as well.',
							detail:
								'Detection and occurrence can be designed down, but severity comes from what the failure does, so it rarely changes. A redundant sensor keeps the brakes working when one fails. For cars, the safety standard ISO 26262 sets what a failure this severe demands.',
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
							title: 'Start from a need',
							say: 'A user needs water as soon as they turn the tap on.',
							detail:
								"A stakeholder need is written in the user's own words and says nothing about pumps or flow rates. Requirements turn it into something engineers can build and test. Keeping the need on record lets you check later that it was really met.",
							light: ['need']
						},
						{
							title: 'Spot vague words',
							say: 'First draft: the pump shall start quickly. But how quick is quick?',
							detail:
								'Words like quickly, easy or robust mean different things to different readers. A designer might read quickly as 10 s while the customer expects 1 s. Neither is wrong, which is exactly the problem.',
							send: [['need', 'req']],
							set: { req: 'Pump shall\nstart quickly' },
							light: ['req']
						},
						{
							title: 'Try to test it',
							say: 'Try to write its test, and you cannot. Nobody can say pass or fail.',
							detail:
								'A requirement is verifiable if a test, analysis, inspection or demonstration can prove it is met. Writing the test early is the quickest way to catch a vague one. Left until acceptance, the argument arrives when changes cost the most.',
							send: [['req', 'test']],
							set: { req: 'Pump shall\nstart quickly', test: 'Test: ???' },
							down: ['test']
						},
						{
							title: 'Add numbers',
							say: 'Rewrite it with numbers: 90% of rated flow within 2 s, at 5 to 40 °C.',
							detail:
								'A good requirement gives a measurable quantity, a limit and the conditions it holds under. Here the quantity is flow, the limit is 90% within 2 s, and the conditions are 5 to 40 °C. Each number should come from the need or a calculation, not a guess.',
							set: { req: '90% flow\nwithin 2 s', test: 'Test: ???' },
							light: ['req']
						},
						{
							title: 'Test and design follow',
							say: 'Now the test writes itself, and the design team knows its target.',
							detail:
								'The test is a simple procedure: send the start command, time the flow, and check it reaches 90% within 2 s. Designers can size the pump and motor against a firm target. Each link from need to requirement to test and design is kept in a traceability matrix.',
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
							title: 'Trace back the failure',
							say: 'If the test ever fails, the links show exactly which user need is at risk.',
							detail:
								'Traceability works both ways. Downwards it shows which tests prove each requirement. Upwards, a failed test points straight to the requirement and user need it puts at risk, so you can judge how serious it is and who to tell.',
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
							title: 'Three parts in series',
							say: 'A cooling loop needs its pump, valve and controller all working. Each has a 90% chance of lasting the year.',
							detail:
								'Reliability here is the chance a part lasts a year without failing, so 0.9 means a 10% chance of failure. In a reliability block diagram, parts drawn in a line must all work for the system to work. We assume each part fails independently.',
							hide: ['spare'],
							light: ['pump', 'valve', 'ctl']
						},
						{
							title: 'Multiply in series',
							say: 'In series, multiply: 0.9 × 0.9 × 0.9 = 0.729. Three good parts make a weaker whole.',
							detail:
								'For independent parts in series, R = R1 × R2 × R3. The result is always below the weakest part and falls fast as parts are added: ten parts at 0.9 give only about 0.35. Long chains need very reliable parts.',
							hide: ['spare'],
							send: [
								['pump', 'valve'],
								['valve', 'ctl'],
								['ctl', 'sys']
							],
							set: { sys: 'System = 0.729' }
						},
						{
							title: 'Single point of failure',
							say: 'If the pump fails, the whole loop stops.',
							detail:
								'A part whose failure alone stops the whole system is called a single point of failure. In a series chain, every part is one. With a single pump, one worn bearing or seal ends the cooling.',
							hide: ['spare'],
							set: { sys: 'System down' },
							down: ['pump']
						},
						{
							title: 'Add a backup',
							say: 'Add a backup pump in parallel. Both must fail to lose pumping: 0.1 × 0.1 = 0.01.',
							detail:
								'In parallel, pumping is lost only if both pumps fail, so the pair has a reliability of 1 - 0.01 = 0.99. That sum only holds if the pumps fail independently. A shared power supply or shared pipework would undo much of the gain.',
							send: [['spare', 'valve']],
							set: { sys: 'Pumps = 0.99' },
							light: ['spare', 'pump']
						},
						{
							title: 'New system reliability',
							say: 'The system rises to 0.99 × 0.9 × 0.9, about 0.80.',
							detail:
								'Treat the parallel pair as one block with R = 0.99, then multiply along the chain: 0.99 × 0.81 = 0.802. One backup lifted the system from 73% to 80%. Most of the remaining risk now sits in the other two parts.',
							send: [
								['spare', 'valve'],
								['valve', 'ctl'],
								['ctl', 'sys']
							],
							set: { sys: 'System ≈ 0.80' },
							light: ['sys']
						},
						{
							title: 'Find the next weak link',
							say: 'Now the valve and controller are the weak links. Look there next.',
							detail:
								'The valve and controller are still single points of failure, each with a 10% chance of failing. Even perfect pumps would cap the system at 0.81. Engineers weigh the cost of each upgrade against its gain before adding more backups or better parts.',
							set: { sys: 'System ≈ 0.80' },
							light: ['valve', 'ctl']
						}
					]
				}
			}
		]
	}
];
