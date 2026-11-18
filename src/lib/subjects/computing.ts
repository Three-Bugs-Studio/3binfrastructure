import type { Subject } from '../sketch';

const GROUP = 'Computing and programming';

export const computing: Subject[] = [
	{
		slug: 'digital-fundamentals',
		title: 'Digital Fundamentals',
		group: GROUP,
		blurb:
			'How computers work at the lowest level: binary numbers, logic gates, and circuits that remember.',
		topics: [
			{
				id: 'binary',
				title: 'Binary and number systems',
				summary:
					'Computers store everything as bits, because a circuit can reliably be on or off. Each binary digit is worth double the one to its right, just as each decimal digit is worth ten times.',
				points: [
					['Bit and byte', 'a bit is 0 or 1, and a byte is 8 bits.'],
					['Hexadecimal', 'one hex digit stands for 4 bits, so 1101 is D.'],
					[
						"Two's complement",
						'the standard way to store negative numbers: flip the bits, then add 1.'
					],
					['Overflow', 'an 8-bit unsigned value holds 0 to 255. 255 + 1 wraps round to 0.']
				],
				tip: 'Learn the powers of two up to 1024 by heart. They appear everywhere in computing.',
				code: `1101₂ = 8 + 4 + 0 + 1 = 13
13    = 0x0D

 5 = 0000 0101
-5 = 1111 1011   flip, then add 1`,
				links: [
					[
						"Two's complement notes (Cornell)",
						'https://www.cs.cornell.edu/~tomf/notes/cps104/twoscomp.html'
					]
				],
				sketch: {
					kind: 'Worked example',
					alt: 'The binary number 1101 has bits worth 8, 4, 2 and 1. Adding the bits that are on gives 13.',
					h: 170,
					nodes: [
						{ id: 'b3', label: '8s\n?', x: 70, y: 50, w: 76, h: 66, fill: 'sky' },
						{ id: 'b2', label: '4s\n?', x: 180, y: 50, w: 76, h: 66, fill: 'sky' },
						{ id: 'b1', label: '2s\n?', x: 290, y: 50, w: 76, h: 66, fill: 'sky' },
						{ id: 'b0', label: '1s\n?', x: 400, y: 50, w: 76, h: 66, fill: 'sky' },
						{ id: 'sum', label: 'Total = 0', x: 240, y: 135, w: 200, h: 46, fill: 'yellow' }
					],
					edges: [
						{ from: 'b3', to: 'sum', plain: true },
						{ from: 'b2', to: 'sum', plain: true },
						{ from: 'b1', to: 'sum', plain: true },
						{ from: 'b0', to: 'sum', plain: true }
					],
					steps: [
						{
							title: 'Read the top bit',
							say: 'Read 1101 from the left. The 8s bit is on.',
							detail:
								'Each place in a binary number is worth twice the one to its right, so in a 4-bit number the leftmost place is worth 2³ = 8. A 1 adds its place value to the total and a 0 adds nothing. This leftmost bit is called the most significant bit, because it carries the most weight.',
							set: { b3: '8s\n1', sum: 'Total = 8' },
							send: [['b3', 'sum']],
							light: ['b3']
						},
						{
							title: 'Add the 4s place',
							say: 'The 4s bit is on as well: 8 + 4 = 12.',
							detail:
								'The running total grows by the value of each place that holds a 1. It is the same as reading 4,213 in decimal as 4 thousands, 2 hundreds, 1 ten and 3 ones, only with powers of two instead of powers of ten.',
							set: { b3: '8s\n1', b2: '4s\n1', sum: 'Total = 12' },
							send: [['b2', 'sum']],
							light: ['b2']
						},
						{
							title: 'Skip the zero bit',
							say: 'The 2s bit is off, so it adds nothing.',
							detail:
								'A 0 still matters, even though it adds nothing. It holds the place so the bits to its right keep their values. Drop it and you would read 111, which is 7, not 13.',
							set: { b3: '8s\n1', b2: '4s\n1', b1: '2s\n0', sum: 'Total = 12' },
							down: ['b1']
						},
						{
							title: 'Total it up',
							say: 'The 1s bit is on: 12 + 1 = 13. So 1101 in binary is 13.',
							detail:
								'A quick check is hexadecimal: each group of 4 bits is one hex digit, so 1101 is D, which is 13. With 4 bits you can count from 0 up to 15, which is 2⁴ - 1. Add a fifth bit and the range doubles to 0 to 31.',
							set: { b3: '8s\n1', b2: '4s\n1', b1: '2s\n0', b0: '1s\n1', sum: 'Total = 13' },
							send: [['b0', 'sum']],
							light: ['sum']
						}
					]
				}
			},
			{
				id: 'gates',
				title: 'Logic gates and adders',
				summary:
					'Gates are tiny circuits that make decisions from bits. Combine a few and you can add numbers, which is the first step towards a full processor.',
				points: [
					['AND', 'output is 1 only if both inputs are 1.'],
					['OR', 'output is 1 if any input is 1.'],
					['XOR', 'output is 1 if the inputs differ.'],
					['NOT', 'flips the input.'],
					['Half adder', 'XOR gives the sum bit, and AND gives the carry.']
				],
				tip: 'Truth tables never lie. When a circuit confuses you, write one out.',
				table: {
					head: ['A', 'B', 'Sum', 'Carry'],
					rows: [
						['0', '0', '0', '0'],
						['0', '1', '1', '0'],
						['1', '0', '1', '0'],
						['1', '1', '0', '1']
					]
				},
				links: [
					['Adder circuits (Wikipedia)', 'https://en.wikipedia.org/wiki/Adder_(electronics)'],
					[
						'MIT 6.004 Computation Structures',
						'https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/'
					]
				],
				sketch: {
					kind: 'Logic diagram',
					alt: 'A half adder: inputs A and B feed an XOR gate for the sum and an AND gate for the carry.',
					h: 200,
					nodes: [
						{ id: 'a', label: 'A = 0', x: 60, y: 50, w: 92, h: 50, fill: 'sky' },
						{ id: 'b', label: 'B = 0', x: 60, y: 150, w: 92, h: 50, fill: 'sky' },
						{ id: 'x', label: 'XOR', x: 240, y: 50, w: 92, h: 56, fill: 'yellow' },
						{ id: 'n', label: 'AND', x: 240, y: 150, w: 92, h: 56, fill: 'yellow' },
						{ id: 's', label: 'Sum = 0', x: 410, y: 50, w: 110, h: 50, fill: 'mint' },
						{ id: 'c', label: 'Carry = 0', x: 410, y: 150, w: 110, h: 50, fill: 'pink' }
					],
					edges: [
						{ from: 'a', to: 'x' },
						{ from: 'a', to: 'n' },
						{ from: 'b', to: 'x' },
						{ from: 'b', to: 'n' },
						{ from: 'x', to: 's' },
						{ from: 'n', to: 'c' }
					],
					steps: [
						{
							title: 'Both inputs off',
							say: '0 + 0: nothing is on, so both outputs stay 0.',
							detail:
								'A gate is a few transistors that switch an output on or off depending on its inputs. XOR outputs 1 only when its inputs differ, and AND only when both are 1. With both inputs at 0 neither condition holds, so Sum and Carry are both 0.',
							send: [
								['a', 'x'],
								['b', 'n']
							]
						},
						{
							title: 'One input on',
							say: '1 + 0: the inputs differ, so XOR gives Sum = 1. AND stays 0.',
							detail:
								'A is 1 and B is 0, so the inputs differ and XOR switches on. AND needs both inputs on, so the carry stays 0. Read as Carry then Sum, the outputs are 01 in binary, which is 1.',
							set: { a: 'A = 1', s: 'Sum = 1' },
							send: [
								['a', 'x'],
								['x', 's']
							],
							light: ['s']
						},
						{
							title: 'Swap the inputs',
							say: '0 + 1: the same result, because the circuit does not care about order.',
							detail:
								'Addition gives the same answer in either order, and so do these gates. XOR only asks whether the inputs differ and AND only asks whether both are on, never which wire carries which value. So the outputs are again Sum 1, Carry 0.',
							set: { b: 'B = 1', s: 'Sum = 1' },
							send: [
								['b', 'x'],
								['x', 's']
							],
							light: ['s']
						},
						{
							title: 'Carry the one',
							say: '1 + 1: the inputs match, so Sum = 0, and AND gives Carry = 1. That is 10 in binary, which is 2.',
							detail:
								'With both inputs on, XOR sees no difference and outputs 0, while AND fires. The carry is the 2s digit, just like carrying a ten in decimal. A full adder adds a third input for the carry coming in, and a chain of 32 full adders adds two 32-bit numbers.',
							set: { a: 'A = 1', b: 'B = 1', c: 'Carry = 1' },
							send: [
								['a', 'n'],
								['b', 'n'],
								['n', 'c']
							],
							light: ['c']
						}
					]
				}
			},
			{
				id: 'sequential',
				title: 'Flip-flops and counters',
				summary:
					'Logic gates alone forget everything. A flip-flop stores one bit, and it updates only on a clock edge. Group them and you get registers, counters and memory.',
				points: [
					['Clock', 'a steady signal that tells the whole circuit when to change.'],
					['D flip-flop', 'copies D to Q on the rising clock edge, then holds it.'],
					['Register', 'a group of flip-flops that stores a number.'],
					['Counter', 'a register that adds one on each clock tick.']
				],
				tip: 'Combinational logic works out the next value. Flip-flops decide when it takes effect.',
				links: [
					['Flip-flops (Wikipedia)', 'https://en.wikipedia.org/wiki/Flip-flop_(electronics)'],
					[
						'MIT 6.004 Computation Structures',
						'https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/'
					]
				],
				sketch: {
					kind: 'Timing diagram',
					alt: 'A D flip-flop ignores changes on D until the clock rises, then copies D to the output Q and holds it.',
					h: 185,
					nodes: [
						{ id: 'd', label: 'D = 0', x: 70, y: 50, w: 104, h: 54, fill: 'sky' },
						{ id: 'clk', label: 'Clock low', x: 70, y: 145, w: 104, h: 54, fill: 'yellow' },
						{ id: 'ff', label: 'D flip-flop', x: 250, y: 95, w: 130, h: 80, fill: 'pink' },
						{ id: 'q', label: 'Q = 0', x: 415, y: 95, w: 100, h: 60, fill: 'mint' }
					],
					edges: [
						{ from: 'd', to: 'ff' },
						{ from: 'clk', to: 'ff' },
						{ from: 'ff', to: 'q' }
					],
					steps: [
						{
							title: 'Input changes',
							say: 'D changes to 1, but the clock is low, so Q ignores it.',
							detail:
								'A D flip-flop only looks at its D input at one instant: the rising edge of the clock. Between edges D can change as often as it likes and Q keeps its old value. This gives the logic in front of it time to settle before the result is captured.',
							set: { d: 'D = 1' },
							send: [['d', 'ff']],
							light: ['d']
						},
						{
							title: 'Clock edge',
							say: 'The clock rises. This edge is the moment the flip-flop acts.',
							detail:
								'The clock is a square wave that ticks millions or billions of times a second. The flip-flop samples D at the moment the clock goes from low to high. D must be steady for a short setup time just before the edge, or the stored value can come out wrong.',
							set: { d: 'D = 1', clk: 'Clock rises' },
							send: [['clk', 'ff']],
							light: ['clk']
						},
						{
							title: 'Q takes the value',
							say: 'Q copies D, so the circuit has stored a 1.',
							detail:
								'Shortly after the edge, the output Q changes to match what D was at that instant. Every flip-flop in a chip usually shares the same clock, so they all update together. That keeps a whole processor moving in step, one tick at a time.',
							set: { d: 'D = 1', clk: 'Clock rises', q: 'Q = 1' },
							send: [['ff', 'q']],
							light: ['q']
						},
						{
							title: 'Hold the bit',
							say: 'D falls back to 0, but Q keeps its 1 until the next rising edge. That is memory.',
							detail:
								'Between rising edges Q holds its value, whatever D does. That is one bit of storage. Eight flip-flops on one clock make a register that holds a byte, and feeding back its value plus one turns it into a counter.',
							set: { clk: 'Clock low', q: 'Q = 1' },
							light: ['q']
						}
					]
				}
			},
			{
				id: 'boolean-algebra',
				title: 'Boolean algebra and simplification',
				summary:
					"Boolean algebra lets you rewrite a logic expression into a smaller one that does the same job. Fewer gates means a cheaper and faster circuit. De Morgan's laws and Karnaugh maps are the everyday tools.",
				points: [
					['Identities', 'A + 0 = A, A · 1 = A, A + A = A, and A · NOT A = 0.'],
					["De Morgan's laws", 'NOT(A · B) = NOT A + NOT B, and NOT(A + B) = NOT A · NOT B.'],
					[
						'Sum of products',
						'write one AND term for each row where the output is 1, then OR them.'
					],
					[
						'Karnaugh map',
						'a grid in Gray code order. Circle neighbouring 1s in groups of 1, 2, 4 or 8.'
					],
					['Universal gates', 'NAND alone can build any circuit. So can NOR.']
				],
				tip: 'Check the simplified expression against the original truth table before you build it.',
				code: `F = A·B + A·¬B
  = A·(B + ¬B)    take out A
  = A·1           B + ¬B is always 1
  = A`,
				links: [
					['Karnaugh maps (Wikipedia)', 'https://en.wikipedia.org/wiki/Karnaugh_map'],
					["De Morgan's laws (Wikipedia)", 'https://en.wikipedia.org/wiki/De_Morgan%27s_laws']
				],
				sketch: {
					kind: 'Karnaugh map',
					alt: 'A two-variable Karnaugh map with 1s in both cells where A is 1. Circling the pair shows that B does not matter, so F = A.',
					h: 260,
					nodes: [
						{ id: 'c00', label: 'A=0 B=0\n0', x: 150, y: 60, w: 120, h: 64, fill: 'sky' },
						{ id: 'c01', label: 'A=0 B=1\n0', x: 290, y: 60, w: 120, h: 64, fill: 'sky' },
						{ id: 'c10', label: 'A=1 B=0\n1', x: 150, y: 140, w: 120, h: 64, fill: 'mint' },
						{ id: 'c11', label: 'A=1 B=1\n1', x: 290, y: 140, w: 120, h: 64, fill: 'mint' },
						{ id: 'f', label: 'F = ?', x: 220, y: 225, w: 300, h: 46, fill: 'yellow' }
					],
					edges: [
						{ from: 'c10', to: 'c11', plain: true },
						{ from: 'c10', to: 'f' },
						{ from: 'c11', to: 'f' }
					],
					steps: [
						{
							title: 'Fill the map',
							say: 'F is 1 only in the two rows where A = 1. Those 1s go on the map.',
							detail:
								'A Karnaugh map is a truth table laid out as a grid. Each cell is one combination of inputs, and you write the output for that combination inside it. Here the two cells where A is 1 hold a 1, and the two where A is 0 hold a 0.',
							light: ['c10', 'c11']
						},
						{
							title: 'Write sum of products',
							say: 'Written row by row, F = A·¬B + A·B. That is two ANDs and an OR.',
							detail:
								'Sum of products takes each row whose output is 1, writes it as an AND term, then ORs the terms together. It always gives a correct expression, but rarely the smallest one. Built as written, this one also needs a NOT gate to make ¬B.',
							set: { f: 'F = A·¬B + A·B' },
							send: [
								['c10', 'f'],
								['c11', 'f']
							]
						},
						{
							title: 'Group the neighbours',
							say: 'The two 1s are neighbours, so circle them as one group of 2.',
							detail:
								'On a Karnaugh map, neighbouring cells differ in exactly one input. That is why rows and columns go in Gray code order, not counting order. Groups must hold 1, 2, 4 or 8 cells, and the bigger the group, the simpler the term it gives.',
							set: { f: 'F = A·¬B + A·B' },
							send: [['c10', 'c11']],
							light: ['c10', 'c11']
						},
						{
							title: 'Drop the variable',
							say: 'Inside the group B is 0 once and 1 once, so B does not matter.',
							detail:
								'An input that changes inside a group cannot affect the output there. In algebra, B + ¬B is always 1, so A·(B + ¬B) collapses to A·1. Each doubling of a group removes one more variable from its term.',
							set: { f: 'F = A·(¬B + B)', c10: 'A=1 B=?\n1', c11: 'A=1 B=?\n1' },
							light: ['c10', 'c11']
						},
						{
							title: 'Simplest form',
							say: 'Only A is left: F = A. The gates are gone, and one wire does the job.',
							detail:
								'F = A needs no gates at all, just a wire from input A to the output. Fewer gates mean less chip area, less power and a shorter delay. Before building, check the result against the original truth table: all four rows still match.',
							set: { f: 'F = A', c10: 'A=1 B=?\n1', c11: 'A=1 B=?\n1' },
							light: ['f']
						}
					]
				}
			},
			{
				id: 'floating-point',
				title: 'Floating point numbers',
				summary:
					'Real numbers are stored like scientific notation in binary: a sign, an exponent and a fraction. This covers a huge range, but most decimals, such as 0.1, have no exact binary form, so small rounding errors creep in.',
				points: [
					['IEEE 754', 'the standard format that nearly every processor uses.'],
					['float', '32 bits: 1 sign bit, 8 exponent bits and 23 fraction bits. About 7 digits.'],
					[
						'double',
						'64 bits: 1 sign bit, 11 exponent bits and 52 fraction bits. About 15 digits.'
					],
					['Bias', 'a float stores the exponent plus 127, so 2² is stored as 129.'],
					['Rounding', 'in doubles, 0.1 + 0.2 gives 0.30000000000000004, not 0.3.']
				],
				tip: 'Never compare floats with ==. Check that the difference is below a small tolerance.',
				code: `-6.25 = -110.01₂ = -1.1001₂ × 2²

sign      1          negative
exponent  10000001   2 + 127 = 129
fraction  1001000…   the leading 1 is not stored

1 10000001 10010000000000000000000 = 0xC0C80000`,
				links: [
					['The Floating-Point Guide', 'https://floating-point-gui.de/'],
					[
						'Goldberg: what every computer scientist should know',
						'https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html'
					],
					[
						'Single-precision format (Wikipedia)',
						'https://en.wikipedia.org/wiki/Single-precision_floating-point_format'
					]
				],
				sketch: {
					kind: 'Worked example',
					alt: 'The number -6.25 is split into a sign bit, an 8-bit biased exponent and a 23-bit fraction, giving the float 0xC0C80000.',
					h: 245,
					nodes: [
						{ id: 'num', label: '-6.25', x: 240, y: 30, w: 220, h: 44, fill: 'yellow' },
						{ id: 'sign', label: 'Sign\n?', x: 60, y: 125, w: 90, h: 70, fill: 'sky' },
						{ id: 'exp', label: 'Exponent\n?', x: 200, y: 125, w: 150, h: 70, fill: 'sky' },
						{ id: 'frac', label: 'Fraction\n?', x: 380, y: 125, w: 180, h: 70, fill: 'sky' },
						{ id: 'res', label: 'Bits = ?', x: 240, y: 215, w: 240, h: 44, fill: 'mint' }
					],
					edges: [
						{ from: 'num', to: 'sign' },
						{ from: 'num', to: 'exp' },
						{ from: 'num', to: 'frac' },
						{ from: 'sign', to: 'res' },
						{ from: 'exp', to: 'res' },
						{ from: 'frac', to: 'res' }
					],
					steps: [
						{
							title: 'Set the sign',
							say: 'Store -6.25 as a 32-bit float. It is negative, so the sign bit is 1.',
							detail:
								'IEEE 754 stores the sign apart from the size of the number, in the very first bit. 0 means positive and 1 means negative. Because of this, floats have both +0 and -0, which compare as equal.',
							set: { sign: 'Sign\n1' },
							send: [['num', 'sign']],
							light: ['sign']
						},
						{
							title: 'Normalise',
							say: 'In binary 6.25 is 110.01. Slide the point to get 1.1001 × 2².',
							detail:
								'6 is 110 in binary and .25 is .01, because the places after the point are worth ½, ¼ and so on. Moving the point two places left means multiplying by 2² to keep the same value. Every normal float is written this way, with a single 1 before the point.',
							set: { sign: 'Sign\n1', num: '-1.1001₂ × 2²' },
							light: ['num']
						},
						{
							title: 'Bias the exponent',
							say: 'Add the bias of 127 to the power: 2 + 127 = 129, which is 10000001.',
							detail:
								'Adding 127 means the 8 bits hold 0 to 255 with no sign of their own, so positive floats sort just like plain integers. Stored values 1 to 254 cover powers from -126 to 127. The values 0 and 255 are kept for zero, very tiny numbers, infinity and NaN (not a number).',
							set: { sign: 'Sign\n1', num: '-1.1001₂ × 2²', exp: 'Exponent\n10000001' },
							send: [['num', 'exp']],
							light: ['exp']
						},
						{
							title: 'Hidden leading bit',
							say: 'Every normal number starts with 1, so that 1 is not stored. The fraction keeps 1001, then zeros.',
							detail:
								'Since a normal number always has a 1 before the point, storing it would waste a bit. Leaving it out gives 24 bits of precision from 23 stored ones. The fraction fills from the left, so 1001 sits at the top of the 23 bits, followed by 19 zeros.',
							set: {
								sign: 'Sign\n1',
								num: '-1.1001₂ × 2²',
								exp: 'Exponent\n10000001',
								frac: 'Fraction\n1001000…'
							},
							send: [['num', 'frac']],
							light: ['frac']
						},
						{
							title: 'Pack the bits',
							say: 'Together the bits read 0xC0C80000. -6.25 fits exactly, but 0.1 never can.',
							detail:
								'Grouped in fours, the 32 bits are 1100 0000 1100 1000 and then zeros, which is C0C80000 in hex. 6.25 is a sum of powers of two, so it is stored exactly. In binary 0.1 is 0.000110011... repeating forever, so it is rounded to the nearest float.',
							set: {
								sign: 'Sign\n1',
								num: '-1.1001₂ × 2²',
								exp: 'Exponent\n10000001',
								frac: 'Fraction\n1001000…',
								res: 'Bits = 0xC0C80000'
							},
							send: [
								['sign', 'res'],
								['exp', 'res'],
								['frac', 'res']
							],
							light: ['res']
						}
					]
				}
			}
		]
	},
	{
		slug: 'engineering-computing',
		title: 'Engineering Computing (C)',
		group: GROUP,
		blurb:
			'Programming close to the machine with C: how code becomes a program, how memory really works, and why pointers matter.',
		topics: [
			{
				id: 'compile',
				title: 'From source code to a program',
				summary:
					'C is compiled. A set of tools turns your text file into machine code the processor can run directly, which is why C is fast and why it dominates embedded work.',
				points: [
					['Preprocessor', 'pastes in #include files and expands #define macros.'],
					['Compiler', 'checks your code and translates it to assembly.'],
					['Assembler', 'turns assembly into an object file of machine code.'],
					['Linker', 'joins your object files and libraries into one executable.']
				],
				tip: 'Always compile with -Wall -Wextra. Warnings are bugs that the compiler caught for free.',
				code: `#include <stdio.h>

int main(void) {
    printf("Hello, engineer!\\n");
    return 0;
}

gcc -Wall -Wextra hello.c -o hello
./hello`,
				links: [
					[
						'GCC: stages and output options',
						'https://gcc.gnu.org/onlinedocs/gcc/Overall-Options.html'
					],
					['GCC: warning options', 'https://gcc.gnu.org/onlinedocs/gcc/Warning-Options.html']
				],
				sketch: {
					kind: 'Pipeline diagram',
					alt: 'A C source file passes through the preprocessor, compiler, assembler and linker to become an executable.',
					h: 190,
					nodes: [
						{ id: 'src', label: 'hello.c', x: 75, y: 48, w: 118, h: 54, fill: 'sky' },
						{ id: 'pre', label: 'Preprocessor', x: 240, y: 48, w: 124, h: 54, fill: 'yellow' },
						{ id: 'cc', label: 'Compiler', x: 405, y: 48, w: 118, h: 54, fill: 'yellow' },
						{ id: 'as', label: 'Assembler', x: 405, y: 150, w: 118, h: 54, fill: 'yellow' },
						{ id: 'ld', label: 'Linker', x: 240, y: 150, w: 124, h: 54, fill: 'yellow' },
						{ id: 'exe', label: 'hello', x: 75, y: 150, w: 118, h: 54, fill: 'mint' }
					],
					edges: [
						{ from: 'src', to: 'pre' },
						{ from: 'pre', to: 'cc' },
						{ from: 'cc', to: 'as' },
						{ from: 'as', to: 'ld' },
						{ from: 'ld', to: 'exe' }
					],
					steps: [
						{
							title: 'Preprocess',
							say: 'The preprocessor pastes stdio.h into your file.',
							detail:
								'Lines starting with # are handled before real compiling begins. #include copies a whole header file in, and #define swaps a name for text. Running gcc -E hello.c shows the result, often hundreds of lines from that one include.',
							send: [['src', 'pre']],
							light: ['pre']
						},
						{
							title: 'Compile to assembly',
							say: 'The compiler checks the code and writes assembly. A syntax error stops it here.',
							detail:
								'The compiler parses the code, checks the types and turns it into assembly for one processor family, such as x86-64 or ARM. Optimisation also happens here, with flags such as -O2. gcc -S hello.c stops at this point and leaves the assembly in hello.s.',
							send: [['pre', 'cc']],
							light: ['cc']
						},
						{
							title: 'Assemble',
							say: 'The assembler turns that into machine code.',
							detail:
								'Each assembly instruction becomes a few bytes of machine code. The result is an object file, hello.o, which cannot run yet because calls to outside functions such as printf are left as blanks to fill in. gcc -c hello.c stops at this stage.',
							send: [['cc', 'as']],
							light: ['as']
						},
						{
							title: 'Link',
							say: 'The linker finds printf in the C library and joins everything together.',
							detail:
								'The linker matches each blank call to a real function and fixes up the addresses. printf lives in the C standard library, which is usually linked dynamically, so its code is loaded when the program starts. A function it cannot find shows up as an "undefined reference" error.',
							send: [['as', 'ld']],
							light: ['ld']
						},
						{
							title: 'Run the program',
							say: 'You now have a program the processor can run directly.',
							detail:
								'The executable holds machine code plus headers that tell the operating system how to load it: ELF format on Linux, PE on Windows. It only runs on the kind of processor and system it was built for. Typing ./hello loads it into memory, and a small start-up routine calls main.',
							send: [['ld', 'exe']],
							light: ['exe']
						}
					]
				}
			},
			{
				id: 'pointers',
				title: 'Memory and pointers',
				summary:
					"Every variable lives at an address in memory. A pointer is a variable that stores one of those addresses. This lets a function change a caller's data, and it lets C talk directly to hardware.",
				points: [
					['&', 'the address of a variable.'],
					['*', 'follow a pointer to the value it points at.'],
					['Pass by pointer', 'C copies arguments, so pass an address to change the original.'],
					[
						'NULL',
						'a pointer to nothing. Following it is undefined behaviour, and usually a crash.'
					]
				],
				tip: 'Draw boxes and arrows on paper. Pointers get far easier once you can see them.',
				code: `int a = 5;
int *p = &a;   // p holds a's address
*p = 9;        // a is now 9

void swap(int *x, int *y) {
    int t = *x;
    *x = *y;
    *y = t;
}`,
				links: [
					['Pointers in C (cppreference)', 'https://en.cppreference.com/w/c/language/pointer']
				],
				sketch: {
					kind: 'Memory diagram',
					alt: 'A pointer p stores the address of a, so writing through p changes a from 5 to 9.',
					h: 165,
					nodes: [
						{ id: 'p', label: 'p\n(empty)', x: 90, y: 80, w: 130, h: 80, fill: 'yellow' },
						{ id: 'a', label: 'a at 0x100\nvalue 5', x: 370, y: 80, w: 150, h: 80, fill: 'sky' }
					],
					edges: [{ from: 'p', to: 'a' }],
					steps: [
						{
							title: 'Store a value',
							say: 'int a = 5 puts the value 5 at some address, say 0x100.',
							detail:
								'Memory is a long row of numbered bytes, and each number is an address. A typical int takes 4 bytes, so a fills bytes 0x100 to 0x103. The name a only exists for you; the compiled code works with the address.',
							light: ['a']
						},
						{
							title: 'Take the address',
							say: 'int *p = &a stores that address in p. Now p points at a.',
							detail:
								'The & operator gives the address of a variable, and the type int * means "address of an int". p is a variable in its own right, with its own address, and on a 64-bit machine it takes 8 bytes. Its value is simply the number 0x100.',
							set: { p: 'p\n0x100' },
							send: [['p', 'a']],
							light: ['p']
						},
						{
							title: 'Write through it',
							say: '*p = 9 follows the arrow and writes through it.',
							detail:
								'The * in front of p means "go to the address stored in p". So *p = 9 writes 9 into the bytes at 0x100, which is exactly where a lives. Because p is an int *, the compiler knows to write 4 bytes there.',
							set: { p: 'p\n0x100', a: 'a at 0x100\nvalue 9' },
							send: [['p', 'a']],
							light: ['a']
						},
						{
							title: 'Change from afar',
							say: 'The variable a changed without its name appearing on that line. That is the power, and the danger.',
							detail:
								"This is how a function like swap changes its caller's variables: C copies the arguments, but a copied address still points at the original. The danger is the same feature. A wrong or stale address quietly writes over memory you never meant to touch, with no error message.",
							set: { p: 'p\n0x100', a: 'a at 0x100\nvalue 9' }
						}
					]
				}
			},
			{
				id: 'memory-bugs',
				title: 'Arrays, the heap and memory bugs',
				summary:
					'C trusts you completely. It does not check array bounds or free memory for you, so a small mistake can corrupt your data silently. Knowing the common bugs is half of writing safe C.',
				points: [
					['Stack', 'automatic local variables, gone when the function returns.'],
					['Heap', 'memory you ask for with malloc and must release with free.'],
					['Buffer overflow', 'writing past the end of an array and corrupting whatever is next.'],
					['Memory leak', 'forgetting to free, so usage grows until the program dies.'],
					['Use after free', 'using memory after you gave it back.']
				],
				tip: 'Run your programs under Valgrind or with -fsanitize=address to catch these bugs while testing.',
				code: `char name[4];
strcpy(name, "Alexander");   // overflow!

snprintf(name, sizeof name, "%s", "Alexander");   // safe: cut to "Ale"`,
				links: [
					['AddressSanitizer (Clang docs)', 'https://clang.llvm.org/docs/AddressSanitizer.html'],
					['Valgrind quick start', 'https://valgrind.org/docs/manual/quick-start.html'],
					['malloc (cppreference)', 'https://en.cppreference.com/w/c/memory/malloc']
				],
				sketch: {
					kind: 'Memory diagram',
					alt: 'Copying a long name into a 4 byte array writes past its end and corrupts the variable stored next to it.',
					h: 165,
					nodes: [
						{ id: 'a', label: 'name[4]\nempty', x: 130, y: 55, w: 200, h: 70, fill: 'sky' },
						{ id: 'b', label: 'isAdmin\n0', x: 370, y: 55, w: 150, h: 70, fill: 'mint' },
						{ id: 'in', label: 'Input: "Alexander"', x: 240, y: 135, w: 230, h: 44, fill: 'yellow' }
					],
					edges: [
						{ from: 'in', to: 'a' },
						{ from: 'a', to: 'b', dashed: true }
					],
					steps: [
						{
							title: 'Neighbours in memory',
							say: 'Two variables sit side by side in memory. The array has room for 4 bytes.',
							detail:
								'Local variables are often placed right next to each other, with no gap. name[4] holds exactly 4 chars, and a C string needs one of them for the closing zero byte, so it fits a 3-letter name at most. Nothing marks where name ends and isAdmin begins.',
							light: ['a', 'b']
						},
						{
							title: 'Copy without limits',
							say: 'strcpy copies "Alexander" with no length check.',
							detail:
								'strcpy keeps copying until it reaches the zero byte at the end of the source, and never asks how big the destination is. "Alexander" is 9 letters plus that zero byte. So 10 bytes are on their way into a 4-byte array.',
							send: [['in', 'a']],
							set: { a: 'name[4]\nAlex' },
							light: ['in']
						},
						{
							title: 'Overflow',
							say: 'The extra letters keep going, straight into the next variable.',
							detail:
								"C does not check array bounds, so the write carries on into whatever bytes come next. Here that is isAdmin, but it could be another variable, a saved pointer or the function's return address. The program usually keeps running with no warning at all.",
							send: [['a', 'b']],
							set: { a: 'name[4]\nAlex', b: 'isAdmin\nander' },
							down: ['b']
						},
						{
							title: 'Corrupted flag',
							say: 'isAdmin is now non-zero. That is how a buffer overflow turns into a security hole.',
							detail:
								'In C any non-zero value counts as true, so the stray letter codes make an admin check pass. Attackers craft input to overwrite exactly the bytes they want, such as a return address. Building with -fsanitize=address reports the bad write the moment it happens during testing.',
							set: { a: 'name[4]\nAlex', b: 'isAdmin\nTRUE?!' },
							down: ['b']
						},
						{
							title: 'Bounded copy',
							say: 'A bounded copy stops at the end of the array, and the neighbour stays safe.',
							detail:
								'snprintf is told the destination size with sizeof name, so it writes at most 3 letters plus the zero byte. The name is cut to "Ale", which is a visible bug but a safe one. Its return value is the length it wanted to write, so you can detect the cut.',
							set: { a: 'name[4]\nAle' },
							send: [['in', 'a']],
							light: ['b']
						}
					]
				}
			},
			{
				id: 'bitwise',
				title: 'Bit manipulation and registers',
				summary:
					"Hardware is controlled by single bits inside registers. C's bitwise operators let you set, clear, flip or test one bit without disturbing its neighbours. This is everyday work in embedded code.",
				points: [
					['Mask', 'a value with 1s only in the bits you care about, such as 1u << 3.'],
					['Set', 'x |= mask switches the masked bits on.'],
					['Clear', 'x &= ~mask switches them off.'],
					['Toggle and test', 'x ^= mask flips them, and (x & mask) != 0 tests them.'],
					[
						'Shift limits',
						'shifting by a negative count, or by the full width of the type or more, is undefined.'
					]
				],
				tip: 'Use unsigned types for bit work. Shifts on signed values have surprising rules.',
				code: `#define LED (1u << 3)    // 0000 1000

uint8_t port = 0x01;     // 0000 0001
port |= LED;             // 0000 1001  set bit 3
port &= ~LED;            // 0000 0001  clear it
port ^= LED;             // 0000 1001  flip it
if (port & LED) { /* bit 3 is on */ }`,
				links: [
					[
						'Bitwise and shift operators (cppreference)',
						'https://en.cppreference.com/w/c/language/operator_arithmetic'
					],
					['Bit masks (Wikipedia)', 'https://en.wikipedia.org/wiki/Mask_(computing)']
				],
				sketch: {
					kind: 'Worked example',
					alt: 'OR with a mask switches bit 3 on, and AND with the inverted mask switches it off, while bit 0 is left alone.',
					h: 210,
					nodes: [
						{ id: 'port', label: 'port\n0000 0001', x: 120, y: 55, w: 200, h: 66, fill: 'sky' },
						{ id: 'mask', label: 'mask\n0000 1000', x: 360, y: 55, w: 200, h: 66, fill: 'yellow' },
						{ id: 'out', label: 'result\n?', x: 240, y: 165, w: 220, h: 66, fill: 'mint' }
					],
					edges: [
						{ from: 'port', to: 'out' },
						{ from: 'mask', to: 'out' }
					],
					steps: [
						{
							title: 'Pick the bit',
							say: 'port holds 0000 0001. We want bit 3 on, and bit 0 must stay as it is.',
							detail:
								'Hardware registers pack many switches into one number, one bit each. Here bit 3 might drive an LED while bit 0 controls something else. The mask 1u << 3 shifts a single 1 three places left, giving 0000 1000, which marks only the bit we want.',
							light: ['port', 'mask']
						},
						{
							title: 'OR the mask in',
							say: 'OR with the mask: a bit is 1 if it is 1 in either value.',
							detail:
								'OR works on each bit position separately. Where the mask has 0, the result copies port, so bit 0 keeps its 1, and where the mask has 1, the result is 1 whatever port had. That is why OR can switch bits on but never off.',
							set: { out: 'port | mask\n0000 1001' },
							send: [
								['port', 'out'],
								['mask', 'out']
							],
							light: ['out']
						},
						{
							title: 'Write it back',
							say: 'Store it back. Bit 3 is on, and bit 0 survived.',
							detail:
								'port |= mask is short for port = port | mask: read, change, then write. On a real device register those are separate steps, so an interrupt in between can lose another update. Embedded code may briefly disable interrupts, or use special set and clear registers, to avoid this.',
							set: { port: 'port\n0000 1001', out: 'port | mask\n0000 1001' },
							light: ['port']
						},
						{
							title: 'AND with the inverse',
							say: 'To clear bit 3, AND with the inverted mask, 1111 0111.',
							detail:
								'The ~ operator flips every bit, so the inverted mask is 0 only at bit 3. AND keeps a bit only where both values have a 1. So bit 3 is forced to 0, and every other bit is copied across unchanged.',
							set: {
								port: 'port\n0000 1001',
								mask: '~mask\n1111 0111',
								out: 'port & ~mask\n0000 0001'
							},
							send: [
								['port', 'out'],
								['mask', 'out']
							],
							light: ['out']
						},
						{
							title: 'Bit cleared',
							say: 'Store it back. Bit 3 is off again, and every other bit is untouched.',
							detail:
								'|= mask and &= ~mask are the standard pair for setting and clearing single bits. Two more complete the set: ^= mask flips a bit, and (port & mask) != 0 tests it. All four touch only the bits in the mask, so other code sharing the register is not disturbed.',
							set: {
								port: 'port\n0000 0001',
								mask: '~mask\n1111 0111',
								out: 'port & ~mask\n0000 0001'
							},
							light: ['port']
						}
					]
				}
			},
			{
				id: 'structs',
				title: 'Structs and memory layout',
				summary:
					'A struct groups related values under one name, like the fields of a sensor reading. The compiler stores the fields in order, but may add padding so each one starts at an address its type likes. So a struct can be bigger than its parts.',
				points: [
					['struct', 'a record type: fields of different types kept together.'],
					['. and ->', 's.x reads a field of a struct, and p->x reads it through a pointer.'],
					['Alignment', 'a 4-byte int usually has to start at an address divisible by 4.'],
					['Padding', 'unused bytes the compiler adds between fields or at the end.'],
					['sizeof', 'always ask the compiler for the size. Never add up the fields by hand.']
				],
				tip: 'Order fields from largest to smallest to waste less space on padding.',
				code: `struct Reading {
    char id;      // offset 0, then 3 bytes padding
    int  value;   // offset 4
    char ok;      // offset 8, then 3 bytes padding
};                // sizeof is usually 12, not 6

void show(const struct Reading *r) {
    printf("%d\\n", r->value);   // same as (*r).value
}`,
				links: [
					['Struct declaration (cppreference)', 'https://en.cppreference.com/w/c/language/struct'],
					[
						'Data structure alignment (Wikipedia)',
						'https://en.wikipedia.org/wiki/Data_structure_alignment'
					]
				],
				sketch: {
					kind: 'Memory diagram',
					alt: 'A struct of a char, an int and a char takes 12 bytes, because padding keeps the int and the whole struct aligned to 4 bytes.',
					h: 195,
					nodes: [
						{ id: 'id', label: 'id\n0', x: 40, y: 60, w: 60, h: 70, fill: 'sky' },
						{ id: 'pad', label: 'pad\n1-3', x: 125, y: 60, w: 80, h: 70 },
						{ id: 'value', label: 'value\n4-7', x: 235, y: 60, w: 110, h: 70, fill: 'sky' },
						{ id: 'ok', label: 'ok\n8', x: 335, y: 60, w: 60, h: 70, fill: 'sky' },
						{ id: 'pad2', label: 'pad\n9-11', x: 420, y: 60, w: 80, h: 70 },
						{ id: 'size', label: 'sizeof = 1', x: 240, y: 155, w: 240, h: 46, fill: 'yellow' }
					],
					edges: [],
					steps: [
						{
							title: 'Place the first field',
							say: 'id is a char, so it takes byte 0.',
							detail:
								'Fields are stored in the order you declare them, and the first one always starts at offset 0. A char is 1 byte and can sit at any address. The offsetof macro from stddef.h tells you where each field really starts.',
							hide: ['pad', 'value', 'ok', 'pad2'],
							light: ['id']
						},
						{
							title: 'Pad for alignment',
							say: 'value is an int and must start at a multiple of 4, so bytes 1 to 3 are left empty.',
							detail:
								'Many processors read a 4-byte int fastest, or only, when its address is a multiple of 4. So the compiler skips ahead to offset 4 and leaves 3 unused padding bytes. Those bytes hold leftover junk, which matters if you ever compare structs with memcmp.',
							set: { size: 'sizeof = 8 so far' },
							hide: ['ok', 'pad2'],
							send: [['id', 'value']],
							light: ['pad']
						},
						{
							title: 'Fit the next char',
							say: 'ok is a char, so it fits in byte 8.',
							detail:
								'value ends at byte 7, so the next free byte is 8. A char has no alignment rule, so it goes there with no padding before it. The running size is now 9 bytes, but the compiler is not finished yet.',
							set: { size: 'sizeof = 9 so far' },
							hide: ['pad2'],
							send: [['value', 'ok']],
							light: ['ok']
						},
						{
							title: 'Pad the end',
							say: 'The end is padded to a multiple of 4 too, so every item in an array stays aligned.',
							detail:
								'In an array the second struct starts straight after the first. If the size were 9, its int would land at offset 13, which is not a multiple of 4. Rounding the size up to 12 keeps the int in every element aligned.',
							set: { size: 'sizeof = 12' },
							light: ['pad2', 'size']
						},
						{
							title: 'Reorder the fields',
							say: 'Put value first and the two chars after it: 4 + 1 + 1 = 6, padded to 8.',
							detail:
								'With value at offset 0 and the two chars at 4 and 5, only 2 bytes of tail padding are needed. Across a million readings that saves 4 MB. Only reorder when nothing depends on the layout, such as a file format or data sent over a network.',
							set: { size: 'Reordered: 8' },
							down: ['pad']
						}
					]
				}
			}
		]
	},
	{
		slug: 'software-engineering-design',
		title: 'Software Engineering Design (C++)',
		group: GROUP,
		blurb:
			'Designing software with C++: objects and polymorphism, safe resource handling, and reusable design patterns.',
		topics: [
			{
				id: 'oop',
				title: 'Classes and polymorphism',
				summary:
					'A class bundles data with the functions that act on it, and hides the details. Polymorphism lets code work with a general type while each object does the right thing for itself.',
				points: [
					['Encapsulation', 'keep data private and expose a small public interface.'],
					['Inheritance', 'a derived class is a more specific version of its base.'],
					['Virtual function', "the object's real type picks which version runs."],
					['Composition', 'often better than inheritance: build from parts.']
				],
				tip: 'Prefer "has a" over "is a". Deep inheritance trees are hard to change.',
				code: `class Shape {
public:
    virtual ~Shape() = default;
    virtual double area() const = 0;
};

class Circle : public Shape {
    double r;
public:
    explicit Circle(double r) : r(r) {}
    double area() const override { return 3.14 * r * r; }
};`,
				links: [
					['Virtual functions (cppreference)', 'https://en.cppreference.com/w/cpp/language/virtual']
				],
				sketch: {
					kind: 'UML class diagram',
					alt: 'Code holding a Shape pointer calls area, and the call runs the Circle or Square version depending on the real object.',
					h: 215,
					nodes: [
						{ id: 'call', label: 'shape->area()', x: 240, y: 30, w: 170, h: 44, fill: 'sky' },
						{ id: 'base', label: 'Shape', x: 240, y: 108, w: 130, h: 40, fill: 'yellow' },
						{ id: 'c', label: 'Circle\narea = πr²', x: 90, y: 178, w: 140, h: 62, fill: 'mint' },
						{ id: 's', label: 'Square\narea = w²', x: 390, y: 178, w: 140, h: 62, fill: 'mint' }
					],
					edges: [
						{ from: 'call', to: 'base' },
						{ from: 'c', to: 'base', label: 'is a' },
						{ from: 's', to: 'base', label: 'is a' }
					],
					steps: [
						{
							title: 'Call through the base',
							say: 'The calling code only knows it has a Shape.',
							detail:
								'The caller holds a Shape pointer and can only use what Shape declares. It cannot tell which derived class it really has. Because area is virtual, the choice of which code runs is put off until the program is running.',
							send: [['call', 'base']],
							light: ['base']
						},
						{
							title: 'Dispatch to Circle',
							say: 'At runtime the object is really a Circle, so Circle::area runs.',
							detail:
								"An object of a class with virtual functions usually carries a hidden pointer to a table of function addresses, called the vtable. A Circle's table points at Circle::area. The call looks up the table and jumps there, which costs one extra memory read.",
							send: [['base', 'c']],
							light: ['c']
						},
						{
							title: 'Same call, Square',
							say: 'The same line of code with a Square runs Square::area.',
							detail:
								"The calling line is identical, but this object's hidden pointer leads to the Square table, so Square::area runs. This only works through a pointer or reference. It is also why Shape needs a virtual destructor, so deleting through a Shape pointer cleans up the whole object.",
							send: [['base', 's']],
							light: ['s']
						},
						{
							title: 'Extend without editing',
							say: 'Add a Triangle later, and the calling code does not change at all.',
							detail:
								'A new Triangle class only has to override area. Code written against Shape keeps working without being changed, and it does not even need recompiling. This is the open/closed principle: open to extension, closed to modification.',
							set: { s: 'Triangle\narea = ½bh' },
							send: [['base', 's']],
							light: ['s']
						}
					]
				}
			},
			{
				id: 'raii',
				title: 'RAII and smart pointers',
				summary:
					"RAII ties a resource to an object's lifetime. The constructor acquires it and the destructor releases it, so cleanup happens automatically, even if an exception is thrown.",
				points: [
					['std::unique_ptr', 'one owner, freed automatically when it goes out of scope.'],
					['std::shared_ptr', 'shared ownership with a reference count.'],
					['Beyond memory', 'files, locks and sockets all follow the same pattern.'],
					['Rule of zero', 'let library types manage resources so you write no destructor at all.']
				],
				tip: 'If you are typing new or delete in modern C++, there is usually a better way.',
				code: `void save() {
    auto sensor = std::make_unique<Sensor>();
    sensor->read();          // may throw
}                            // freed here, always`,
				links: [
					['RAII (cppreference)', 'https://en.cppreference.com/w/cpp/language/raii'],
					['std::unique_ptr (cppreference)', 'https://en.cppreference.com/w/cpp/memory/unique_ptr']
				],
				sketch: {
					kind: 'Lifetime diagram',
					alt: 'With a raw pointer, an exception skips delete and leaks memory. With unique_ptr, the destructor frees it anyway.',
					h: 170,
					nodes: [
						{ id: 'in', label: 'Enter function', x: 78, y: 45, w: 120, h: 50, fill: 'sky' },
						{ id: 'use', label: 'read() throws!', x: 240, y: 45, w: 120, h: 50, fill: 'pink' },
						{ id: 'out', label: 'Leave function', x: 402, y: 45, w: 120, h: 50, fill: 'yellow' },
						{ id: 'mem', label: 'Sensor memory', x: 240, y: 135, w: 170, h: 54, fill: 'mint' }
					],
					edges: [
						{ from: 'in', to: 'use' },
						{ from: 'use', to: 'out' },
						{ from: 'in', to: 'mem', dashed: true }
					],
					steps: [
						{
							title: 'Raw allocation',
							say: 'A raw pointer: new Sensor runs on the way in.',
							detail:
								'new asks the heap for memory and runs the Sensor constructor. With a raw pointer, freeing it is your job: you must call delete on every way out of the function. That means every return, every early exit and every exception.',
							send: [['in', 'mem']],
							light: ['mem']
						},
						{
							title: 'Exception leaks',
							say: 'read() throws an exception, which jumps past the delete line.',
							detail:
								'When read() throws, C++ leaves the function at once and looks for a matching catch further up. Ordinary lines after the throw, including delete, never run. The memory stays allocated with nothing pointing at it, and leaking a file handle or a lock this way can be even worse.',
							send: [['use', 'out']],
							set: { mem: 'Sensor leaked' },
							down: ['mem']
						},
						{
							title: 'Hand over ownership',
							say: 'Now use a unique_ptr. It owns the memory.',
							detail:
								'std::make_unique<Sensor>() creates the object and gives it to a unique_ptr, a small object that lives on the stack. Its destructor calls delete for you. It cannot be copied, only moved, so there is always exactly one owner.',
							send: [['in', 'mem']],
							set: { mem: 'Owned by\nunique_ptr' },
							light: ['mem']
						},
						{
							title: 'Destructor cleans up',
							say: 'The same exception unwinds the function, and the destructor still runs.',
							detail:
								'While an exception unwinds the stack, C++ runs the destructor of every local object in each scope it leaves. So the unique_ptr frees the Sensor on the way out. The same idea closes files with std::fstream and releases locks with std::lock_guard.',
							send: [['use', 'out']],
							set: { mem: 'Freed\nautomatically' },
							light: ['out']
						}
					]
				}
			},
			{
				id: 'patterns',
				title: 'Design principles and patterns',
				summary:
					'Design patterns are named solutions to problems that keep coming up. SOLID principles are guidelines for keeping classes easy to change. Both exist to reduce coupling.',
				points: [
					['Single responsibility', 'a class should have one reason to change.'],
					['Open/closed', 'add behaviour by extending, without editing working code.'],
					['Dependency inversion', 'depend on interfaces, not on concrete classes.'],
					['Observer', 'objects subscribe to be told when something changes.'],
					[
						'Strategy and factory',
						'swap an algorithm at runtime, and hide how objects are created.'
					]
				],
				tip: 'Use a pattern to solve a problem you have, not to show that you know it.',
				links: [
					[
						'Observer pattern (Refactoring.Guru)',
						'https://refactoring.guru/design-patterns/observer'
					],
					['SOLID principles (Wikipedia)', 'https://en.wikipedia.org/wiki/SOLID']
				],
				sketch: {
					kind: 'Sequence of messages',
					alt: 'The Observer pattern: a temperature sensor notifies a display and a logger whenever its value changes.',
					h: 195,
					nodes: [
						{ id: 'sub', label: 'Sensor\n(subject)', x: 90, y: 95, w: 140, h: 72, fill: 'yellow' },
						{ id: 'a', label: 'Display', x: 385, y: 40, w: 130, h: 50, fill: 'mint' },
						{ id: 'b', label: 'Logger', x: 385, y: 100, w: 130, h: 50, fill: 'mint' },
						{ id: 'c', label: 'Alarm', x: 385, y: 160, w: 130, h: 50, fill: 'pink' }
					],
					edges: [
						{ from: 'sub', to: 'a' },
						{ from: 'sub', to: 'b' },
						{ from: 'sub', to: 'c' }
					],
					steps: [
						{
							title: 'Subscribe',
							say: 'The display and the logger subscribe to the sensor.',
							detail:
								'Each observer registers with the subject, which keeps a list of them. The subject only knows them through a small interface, often a single method such as update(value). It has no idea whether it is talking to a display, a logger or anything else.',
							hide: ['c'],
							light: ['a', 'b']
						},
						{
							title: 'Notify all',
							say: 'The value changes, so the sensor notifies every subscriber.',
							detail:
								'When its value changes, the sensor walks its list and calls update on each observer in turn. The sensor decides when to tell them, and each observer decides what to do with the news. A common bug is forgetting to unsubscribe, which leaves dead objects on the list.',
							hide: ['c'],
							send: [
								['sub', 'a'],
								['sub', 'b']
							],
							set: { sub: 'Sensor\n31 °C' }
						},
						{
							title: 'Add a subscriber',
							say: "A new Alarm class subscribes. The sensor's code does not change.",
							detail:
								'The Alarm implements the same observer interface and registers like the others. Nothing in the Sensor class is edited or retested. This is dependency inversion at work: the sensor depends on an interface, not on any concrete class.',
							light: ['c'],
							set: { sub: 'Sensor\n31 °C' }
						},
						{
							title: 'Reach every observer',
							say: 'The next change reaches all three. That is low coupling.',
							detail:
								'One change now reaches three objects, and the sensor still knows nothing about what any of them do. Low coupling means you can add, change or remove one part with little effect on the rest. The trade-off is that the chain of calls is harder to follow when reading the code.',
							send: [
								['sub', 'a'],
								['sub', 'b'],
								['sub', 'c']
							],
							set: { sub: 'Sensor\n32 °C' }
						}
					]
				}
			},
			{
				id: 'templates-stl',
				title: 'Templates and the STL',
				summary:
					'A template is code with the type left blank. The compiler fills in the blank for each type you use, so one function works for ints, doubles and strings at full speed. The standard library is built this way: containers hold data, and algorithms work on them through iterators.',
				points: [
					['Function template', 'template <typename T> writes one function for any type T.'],
					[
						'Instantiation',
						'the compiler generates a separate copy of the code for each type used.'
					],
					['Containers', 'std::vector, std::map and std::unordered_map hold your data.'],
					['Iterators', 'one common way to walk any container, from begin() to end().'],
					['Algorithms', 'std::sort and std::find work on any range, not one container.']
				],
				tip: 'Reach for std::vector first. It is the right container far more often than not.',
				code: `template <typename T>
T biggest(T a, T b) { return a < b ? b : a; }

biggest(3, 7);        // T is int, gives 7
biggest(2.5, 1.0);    // T is double, gives 2.5

std::vector<int> v{5, 2, 8, 1};
std::sort(v.begin(), v.end());   // 1 2 5 8`,
				links: [
					['Templates (cppreference)', 'https://en.cppreference.com/w/cpp/language/templates'],
					['Containers library (cppreference)', 'https://en.cppreference.com/w/cpp/container'],
					['Algorithms library (cppreference)', 'https://en.cppreference.com/w/cpp/algorithm']
				],
				sketch: {
					kind: 'Code generation',
					alt: 'One template is stamped out by the compiler into an int version and a double version. A type without < is rejected at compile time.',
					h: 185,
					nodes: [
						{ id: 'tpl', label: 'biggest<T>', x: 240, y: 35, w: 180, h: 50, fill: 'yellow' },
						{ id: 'i', label: 'biggest\n<int>', x: 85, y: 140, w: 140, h: 60, fill: 'mint' },
						{ id: 'd', label: 'biggest\n<double>', x: 240, y: 140, w: 140, h: 60, fill: 'mint' },
						{ id: 'p', label: 'biggest\n<Point>', x: 395, y: 140, w: 140, h: 60, fill: 'pink' }
					],
					edges: [
						{ from: 'tpl', to: 'i' },
						{ from: 'tpl', to: 'd' },
						{ from: 'tpl', to: 'p' }
					],
					steps: [
						{
							title: 'Write it once',
							say: 'You write biggest once, with T as a blank for the type.',
							detail:
								'template <typename T> tells the compiler that T stands for a type to be filled in later. A template on its own produces no machine code at all. That is why templates usually live in header files: the compiler needs the full text wherever they are used.',
							hide: ['i', 'd', 'p'],
							light: ['tpl']
						},
						{
							title: 'Deduce int',
							say: 'biggest(3, 7) makes the compiler stamp out a version for int.',
							detail:
								'The compiler sees two int arguments, works out that T is int, and generates biggest<int> with int written wherever T was. This is called template argument deduction. Mixing types, as in biggest(3, 7.0), fails because T cannot be both int and double.',
							hide: ['d', 'p'],
							send: [['tpl', 'i']],
							light: ['i']
						},
						{
							title: 'Another instantiation',
							say: 'biggest(2.5, 1.0) stamps out a second copy for double. Each copy is as fast as hand-written code.',
							detail:
								'Each type used gets its own generated function, with no type checks left to do at runtime. The cost moves to build time instead: longer compiles and a larger program, sometimes called code bloat. The STL containers and algorithms work the same way.',
							hide: ['p'],
							send: [['tpl', 'd']],
							light: ['d']
						},
						{
							title: 'Compile-time error',
							say: 'A Point type with no < operator is refused when you build, not when you run.',
							detail:
								'biggest uses a < b, so it only works for types that support <. The check happens when the compiler fills in T, so the mistake is a build error rather than a crash in front of a user. C++20 concepts let you state such requirements up front for clearer error messages.',
							send: [['tpl', 'p']],
							down: ['p']
						},
						{
							title: 'Satisfy the requirement',
							say: 'Give Point an operator<, and the same template works for it too.',
							detail:
								'Once Point defines bool operator<(const Point&) const, the template compiles for Point as well. Nothing inside biggest had to change. std::sort and std::max rely on the same rule, which is why your own types can be sorted once they define <.',
							set: { p: 'Point now\nhas <' },
							send: [['tpl', 'p']],
							light: ['p']
						}
					]
				}
			},
			{
				id: 'move-semantics',
				title: 'Copy and move',
				summary:
					"Copying a big object duplicates all its data, which can be slow. Moving hands the data over instead: the new object takes the old one's pointer, and the old one is left empty. C++ moves from temporaries on its own, and std::move lets you ask for it.",
				points: [
					['Copy constructor', 'makes an independent duplicate. Each object owns its own data.'],
					['Move constructor', 'takes over the data and leaves the source valid but unspecified.'],
					[
						'std::move',
						'only a cast. It marks an object as safe to move from. The move happens elsewhere.'
					],
					[
						'Rule of five',
						'write one of the destructor, copy or move operations, and you probably need all five.'
					],
					[
						'Rule of zero',
						'better still, hold data in std::vector or std::unique_ptr and write none.'
					]
				],
				tip: 'After std::move, treat the old object as empty: give it a new value or let it go.',
				code: `std::vector<int> a(1'000'000, 7);

std::vector<int> b = a;              // copy: a million ints duplicated
std::vector<int> c = std::move(a);   // move: c takes a's buffer
// a is now empty`,
				links: [
					[
						'Move constructors (cppreference)',
						'https://en.cppreference.com/w/cpp/language/move_constructor'
					],
					[
						'Rule of three, five and zero (cppreference)',
						'https://en.cppreference.com/w/cpp/language/rule_of_three'
					],
					['std::move (cppreference)', 'https://en.cppreference.com/w/cpp/utility/move']
				],
				sketch: {
					kind: 'Memory diagram',
					alt: 'Copying a vector duplicates its million-int buffer. Moving it just hands the existing buffer to the new vector and leaves the old one empty.',
					h: 245,
					nodes: [
						{ id: 'a', label: 'a\n→ Buffer 1', x: 80, y: 40, w: 130, h: 56, fill: 'sky' },
						{ id: 'buf', label: 'Buffer 1\n1M ints', x: 400, y: 40, w: 130, h: 56, fill: 'mint' },
						{ id: 'b', label: 'b\n→ Buffer 2', x: 80, y: 125, w: 130, h: 56, fill: 'sky' },
						{ id: 'buf2', label: 'Buffer 2\n1M ints', x: 400, y: 125, w: 130, h: 56, fill: 'pink' },
						{ id: 'c', label: 'c\n(not yet)', x: 80, y: 210, w: 130, h: 56, fill: 'sky' }
					],
					edges: [
						{ from: 'a', to: 'buf' },
						{ from: 'b', to: 'buf2' },
						{ from: 'buf', to: 'buf2', label: 'copy', dashed: true },
						{ from: 'c', to: 'buf' }
					],
					steps: [
						{
							title: 'Own a buffer',
							say: 'a owns a buffer of a million ints on the heap.',
							detail:
								'A std::vector object itself is small, typically three pointers: start of data, end of data and end of capacity. The million ints live in a separate block on the heap, about 4 MB. Copying and moving are really about what happens to that block.',
							hide: ['b', 'buf2', 'c'],
							send: [['a', 'buf']],
							light: ['a', 'buf']
						},
						{
							title: 'Deep copy',
							say: 'Copy: b = a. b gets a brand new buffer, and every int is copied across.',
							detail:
								'The copy constructor allocates a fresh 4 MB block and copies every element across. Afterwards a and b are fully independent, so changing one never affects the other. It is safe, but the cost grows with the size of the data.',
							hide: ['c'],
							send: [['buf', 'buf2']],
							light: ['buf2']
						},
						{
							title: 'Count the cost',
							say: 'That is a million writes and twice the memory. Fine if you need two copies, wasteful if you do not.',
							detail:
								'A copy takes time in proportion to the number of elements and doubles the memory used. It often happens by accident, for example when a vector is passed to a function by value. Pass a const reference when the function only needs to read the data.',
							hide: ['c'],
							down: ['buf2']
						},
						{
							title: 'Steal the pointer',
							say: 'Move: c = std::move(a). c simply takes the pointer to Buffer 1. No ints are copied.',
							detail:
								'std::move is only a cast that marks a as safe to take from. The move constructor then copies three pointers into c and sets the ones in a to null. That is a fixed amount of work, whether the vector holds ten ints or ten million.',
							set: { a: 'a\n(empty)', c: 'c\n→ Buffer 1' },
							send: [['c', 'buf']],
							light: ['c']
						},
						{
							title: 'Moved-from object',
							say: 'a is left empty but valid. Give it a new value or let it go out of scope.',
							detail:
								'After a move the source must still be safe to destroy and to assign to. The vector move constructor leaves it empty, but many types only promise a valid yet unspecified state. Reading from a moved-from object is a common bug, so assign it a new value first.',
							set: { a: 'a\n(empty)', c: 'c\n→ Buffer 1' },
							down: ['a']
						}
					]
				}
			}
		]
	},
	{
		slug: 'algorithms-analysis',
		title: 'Algorithms and Analysis',
		group: GROUP,
		blurb:
			'How to measure whether code will scale, and the classic algorithms for sorting and finding the shortest path.',
		topics: [
			{
				id: 'big-o',
				title: 'Big-O: how code scales',
				summary:
					"Big-O describes how the work grows as the input grows. It ignores small details and shows the shape of the growth, which matters far more than your computer's speed once the data gets big.",
				points: [
					['O(1)', 'the same work whatever the size. A hash table lookup, on average.'],
					['O(log n)', 'halves the problem each step. Binary search.'],
					['O(n)', 'looks at everything once.'],
					['O(n log n)', 'good general-purpose sorting.'],
					['O(n²)', 'a loop inside a loop. Fine for small n, painful for large n.']
				],
				tip: 'A better algorithm beats faster hardware every time, once the data is large enough.',
				table: {
					head: ['Growth', 'n = 1,000', 'n = 1,000,000'],
					rows: [
						['O(log n)', '10', '20'],
						['O(n)', '1,000', '1,000,000'],
						['O(n log n)', '10,000', '20,000,000'],
						['O(n²)', '1,000,000', '1,000,000,000,000']
					]
				},
				links: [
					[
						'MIT 6.006 Lecture 1: Introduction',
						'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/mit6_006s20_lec1/'
					],
					['Big O notation (Wikipedia)', 'https://en.wikipedia.org/wiki/Big_O_notation']
				],
				sketch: {
					kind: 'Comparison',
					alt: 'Searching a million sorted items: linear search may need a million checks, binary search about twenty.',
					h: 170,
					nodes: [
						{
							id: 'list',
							label: '1,000,000 sorted names',
							x: 240,
							y: 28,
							w: 260,
							h: 42,
							fill: 'yellow'
						},
						{
							id: 'lin',
							label: 'Linear search\n0 checks',
							x: 115,
							y: 125,
							w: 190,
							h: 70,
							fill: 'pink'
						},
						{
							id: 'bin',
							label: 'Binary search\n0 checks',
							x: 365,
							y: 125,
							w: 190,
							h: 70,
							fill: 'mint'
						}
					],
					edges: [
						{ from: 'list', to: 'lin' },
						{ from: 'list', to: 'bin' }
					],
					steps: [
						{
							title: 'Set the task',
							say: 'Find one name in a million sorted names.',
							detail:
								'Big-O counts how the number of basic steps grows as the input size n grows. Here n is 1,000,000 and one step is one comparison. Because the names are sorted, we can choose between two very different strategies.',
							light: ['list']
						},
						{
							title: 'Linear search',
							say: 'After 10 checks, linear search is still near the start.',
							detail:
								'Linear search checks names one by one from the start. Each check rules out a single name, so after 10 checks 999,990 are still left. Its cost is O(n): on average it looks at half the list, and at worst all of it.',
							send: [['list', 'lin']],
							set: { lin: 'Linear search\n10 checks' }
						},
						{
							title: 'Binary search',
							say: 'After 10 checks, binary search has cut the list down to about 1,000 names.',
							detail:
								'Binary search checks the middle name and throws away the half that cannot hold the target. Each check halves what is left, so 10 checks shrink a million to 1,000,000 ÷ 2¹⁰, about 977. It only works on sorted data, which is the price of the speed.',
							send: [['list', 'bin']],
							set: { lin: 'Linear search\n10 checks', bin: 'Binary search\n10 checks' },
							light: ['bin']
						},
						{
							title: 'Logarithmic finish',
							say: 'Binary search finishes in about 20 checks.',
							detail:
								'Halving a million names until one is left takes log₂ of 1,000,000 steps, which is just under 20. Doubling the data adds only one more check. A billion names would need about 30.',
							set: { lin: 'Linear search\n20 checks', bin: 'Found in\n20 checks' },
							light: ['bin']
						},
						{
							title: 'Compare the growth',
							say: 'Linear search might need a million. Same data, 50,000 times more work.',
							detail:
								'Linear search needs up to n checks and binary search about log₂ n, so the gap widens as the data grows. At a thousand names the ratio is 1,000 to 10, a factor of 100. Faster hardware cannot close a gap that keeps growing like this.',
							set: { lin: 'Linear search\n1,000,000 checks', bin: 'Found in\n20 checks' },
							light: ['lin']
						}
					]
				}
			},
			{
				id: 'sorting',
				title: 'Sorting with merge sort',
				summary:
					'Merge sort is a classic divide and conquer algorithm. Split the list in half until the pieces are trivially sorted, then merge them back in order. It runs in O(n log n) every time.',
				points: [
					['Divide', 'cut the problem in half.'],
					['Conquer', 'solve each half the same way.'],
					['Combine', 'merge two sorted lists by repeatedly taking the smaller front item.'],
					[
						'Compared with quicksort',
						'quicksort is often faster in practice, but its worst case is O(n²).'
					]
				],
				tip: 'Look for divide and conquer whenever a problem can be split into smaller copies of itself.',
				links: [
					[
						'MIT 6.006 Lecture 3: Sorting',
						'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/mit6_006s20_lec3/'
					],
					['Merge sort (Wikipedia)', 'https://en.wikipedia.org/wiki/Merge_sort']
				],
				sketch: {
					kind: 'Divide and conquer tree',
					alt: 'The list 5 2 8 1 splits into two halves, each half is sorted, and they merge into 1 2 5 8.',
					h: 225,
					nodes: [
						{ id: 'all', label: '5   2   8   1', x: 240, y: 30, w: 200, h: 44, fill: 'yellow' },
						{ id: 'l', label: '5   2', x: 110, y: 112, w: 130, h: 46, fill: 'sky' },
						{ id: 'r', label: '8   1', x: 370, y: 112, w: 130, h: 46, fill: 'sky' },
						{ id: 'out', label: '? ? ? ?', x: 240, y: 195, w: 200, h: 44, fill: 'mint' }
					],
					edges: [
						{ from: 'all', to: 'l' },
						{ from: 'all', to: 'r' },
						{ from: 'l', to: 'out' },
						{ from: 'r', to: 'out' }
					],
					steps: [
						{
							title: 'Divide',
							say: 'Start with an unsorted list and split it in half.',
							detail:
								'Merge sort splits the list at the middle into two halves of nearly equal size. It keeps splitting until every piece holds one item, and a one-item list is already sorted. A list of n items can be halved about log₂ n times, here twice.',
							send: [
								['all', 'l'],
								['all', 'r']
							]
						},
						{
							title: 'Sort the halves',
							say: 'Sort each half. These are small enough to be simple.',
							detail:
								'Each half is sorted by calling merge sort on it, which is the conquer step. In this tiny example each half has two items, so one comparison puts each in order. The same code handles halves of any size, which is what makes it recursive.',
							set: { l: '2   5', r: '1   8' },
							light: ['l', 'r']
						},
						{
							title: 'Merge the fronts',
							say: 'Merge: compare the front items, 2 and 1. Take 1.',
							detail:
								'Both halves are sorted, so the smallest item overall must be at the front of one of them. Merging only ever compares the two front items and moves the smaller one out. Merge sort needs a spare array of n items for this, unlike quicksort, which sorts in place.',
							set: { l: '2   5', r: '8', out: '1' },
							send: [['r', 'out']]
						},
						{
							title: 'Keep merging',
							say: 'Compare 2 and 8. Take 2, then 5.',
							detail:
								'After 1 has gone, the fronts are 2 and 8, so 2 is taken. Then 5 is compared with 8, and 5 is taken. Each comparison moves exactly one item, so merging n items takes at most n - 1 comparisons.',
							set: { l: '', r: '8', out: '1   2   5' },
							send: [['l', 'out']]
						},
						{
							title: 'Finish the merge',
							say: 'Only 8 is left, so add it. The list is sorted.',
							detail:
								'When one half runs out, the rest of the other half is already in order and is copied straight across. Each level of splitting does O(n) merging work, and there are about log₂ n levels, giving O(n log n) for any input. Merge sort is also stable: equal items keep their original order.',
							set: { l: '', r: '', out: '1   2   5   8' },
							send: [['r', 'out']],
							light: ['out']
						}
					]
				}
			},
			{
				id: 'dijkstra',
				title: 'Shortest paths with Dijkstra',
				summary:
					"Dijkstra's algorithm finds the cheapest route through a graph. It always expands the closest unvisited node next, so once a node is settled, its distance is final. Maps and network routing use the same idea.",
				points: [
					['Graph', 'nodes joined by weighted edges.'],
					['Greedy step', 'always visit the closest node you have not finished yet.'],
					['Relaxation', 'if a new route is shorter, update the distance.'],
					['Limit', 'it fails with negative weights. Use Bellman-Ford for those.']
				],
				tip: 'Use a priority queue to pick the next node, which gives O((V + E) log V).',
				links: [
					[
						"MIT 6.006 Lecture 13: Dijkstra's algorithm",
						'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/mit6_006s20_lec13/'
					],
					[
						"Dijkstra's algorithm (Wikipedia)",
						'https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm'
					]
				],
				sketch: {
					kind: 'Graph diagram',
					alt: 'Finding the shortest path from A to D through C and B, for a total cost of 4.',
					h: 205,
					nodes: [
						{ id: 'a', label: 'A\n0', x: 60, y: 100, w: 84, h: 64, fill: 'yellow' },
						{ id: 'b', label: 'B\n∞', x: 240, y: 38, w: 84, h: 62, fill: 'sky' },
						{ id: 'c', label: 'C\n∞', x: 240, y: 165, w: 84, h: 62, fill: 'sky' },
						{ id: 'd', label: 'D\n∞', x: 420, y: 100, w: 84, h: 64, fill: 'mint' }
					],
					edges: [
						{ from: 'a', to: 'b', label: '4', plain: true },
						{ from: 'a', to: 'c', label: '1', plain: true },
						{ from: 'c', to: 'b', label: '2', plain: true },
						{ from: 'b', to: 'd', label: '1', plain: true },
						{ from: 'c', to: 'd', label: '5', plain: true }
					],
					steps: [
						{
							title: 'Start from A',
							say: 'From A, the neighbours cost B = 4 and C = 1.',
							detail:
								'Every node starts at a distance of infinity, meaning no route found yet, except the start, which is 0. Visiting A looks at each edge leaving it and records the cost of reaching each neighbour. These are only first estimates.',
							send: [
								['a', 'b'],
								['a', 'c']
							],
							set: { b: 'B\n4', c: 'C\n1' },
							light: ['a']
						},
						{
							title: 'Relax through C',
							say: 'C is closest, so visit it. Going through C reaches B for 1 + 2 = 3, which beats 4.',
							detail:
								'Dijkstra always visits the unvisited node with the smallest distance, and C at 1 is cheapest. Its distance is now final, because any other route starts at 4 or more and no edge is negative. Lowering B to a cheaper route is called relaxation.',
							send: [['c', 'b']],
							set: { b: 'B\n3', c: 'C\n1' },
							light: ['c']
						},
						{
							title: 'Tentative distance',
							say: 'Through C, D would cost 1 + 5 = 6. Note it for now.',
							detail:
								'Checking the other edge out of C gives D a first estimate of 6. It is only tentative, because D has not been visited yet. A cheaper route may still turn up through a node that has not been expanded.',
							send: [['c', 'd']],
							set: { b: 'B\n3', c: 'C\n1', d: 'D\n6' },
							light: ['c']
						},
						{
							title: 'Relax through B',
							say: 'B is closest next. Going through B reaches D for 3 + 1 = 4, which beats 6.',
							detail:
								'B now has the smallest distance among unvisited nodes, so it is visited and its 3 becomes final. Its edge to D gives 3 + 1 = 4, so the estimate for D drops from 6. A priority queue is the usual way to find the closest unvisited node quickly.',
							send: [['b', 'd']],
							set: { b: 'B\n3', c: 'C\n1', d: 'D\n4' },
							light: ['b']
						},
						{
							title: 'Trace the path',
							say: 'The shortest path is A, C, B, D, at a total cost of 4.',
							detail:
								'D is visited last and its 4 is final. To recover the route, each node remembers which neighbour gave it its best distance, and you follow those links back from D. With negative edge weights this can give wrong answers, so Bellman-Ford is used instead.',
							set: { b: 'B\n3', c: 'C\n1', d: 'D\n4' },
							send: [
								['a', 'c'],
								['c', 'b'],
								['b', 'd']
							],
							light: ['d']
						}
					]
				}
			},
			{
				id: 'hash-tables',
				title: 'Hash tables',
				summary:
					"A hash table finds a value from its key in constant time on average. A hash function turns the key into a bucket number, so you jump straight to the right place instead of searching. Python's dict and C++'s std::unordered_map both work this way.",
				points: [
					[
						'Hash function',
						'turns a key into a number, then takes it modulo the number of buckets.'
					],
					[
						'Collision',
						'two keys land in the same bucket. Chaining keeps a short list in each bucket.'
					],
					[
						'Load factor',
						'items divided by buckets. When it gets too high, the table grows and rehashes.'
					],
					['Cost', 'O(1) on average, but O(n) if every key lands in the same bucket.'],
					['No order', 'keys come out in no useful order. Use a balanced tree for sorted keys.']
				],
				tip: 'A good hash function spreads keys evenly. A bad one turns your table into a slow list.',
				code: `toy hash: add the letter positions, then mod 8

"cat"  3 + 1 + 20 = 24   24 mod 8 = 0
"dog"  4 + 15 + 7 = 26   26 mod 8 = 2
"act"  1 + 3 + 20 = 24   24 mod 8 = 0   collision!`,
				links: [
					[
						'MIT 6.006 Lecture 4: Hashing',
						'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/mit6_006s20_lec4/'
					],
					['Hash table (Wikipedia)', 'https://en.wikipedia.org/wiki/Hash_table']
				],
				sketch: {
					kind: 'Data structure diagram',
					alt: 'Keys pass through a hash function into buckets. cat and act collide in bucket 0, and dog goes to bucket 2, where a lookup finds it in one step.',
					h: 175,
					nodes: [
						{ id: 'key', label: 'key "cat"', x: 70, y: 85, w: 120, h: 50, fill: 'yellow' },
						{ id: 'hash', label: 'hash\nmod 8', x: 240, y: 85, w: 110, h: 60, fill: 'sky' },
						{ id: 'b0', label: 'bucket 0\nempty', x: 400, y: 45, w: 140, h: 56, fill: 'mint' },
						{ id: 'b2', label: 'bucket 2\nempty', x: 400, y: 130, w: 140, h: 56, fill: 'mint' }
					],
					edges: [
						{ from: 'key', to: 'hash' },
						{ from: 'hash', to: 'b0' },
						{ from: 'hash', to: 'b2' }
					],
					steps: [
						{
							title: 'Hash the key',
							say: 'Insert "cat". The toy hash adds letter positions: 3 + 1 + 20 = 24, and 24 mod 8 = 0.',
							detail:
								'A hash function turns any key into a number, and mod 8 maps that number onto one of 8 buckets. The same key must always give the same number. Real hash functions mix the bits far more thoroughly than this toy, so similar keys spread out.',
							set: { hash: '24 mod 8\n= 0' },
							send: [['key', 'hash']],
							light: ['hash']
						},
						{
							title: 'Store directly',
							say: '"cat" goes straight into bucket 0. No searching.',
							detail:
								'The bucket number is an array index, so the computer jumps straight to bucket 0 in one step. That is where O(1) comes from: the cost does not depend on how many items the table holds. The key is stored next to its value so a later lookup can confirm it.',
							set: { hash: '24 mod 8\n= 0', b0: 'bucket 0\ncat' },
							send: [['hash', 'b0']],
							light: ['b0']
						},
						{
							title: 'Another bucket',
							say: '"dog" hashes to 26 mod 8 = 2, so it goes into bucket 2.',
							detail:
								"Different keys usually hash to different buckets, so items spread across the table. The load factor is items divided by buckets, here 2 out of 8. Many tables double in size and rehash every item once it passes a limit, such as 0.75 in Java's HashMap.",
							set: {
								key: 'key "dog"',
								hash: '26 mod 8\n= 2',
								b0: 'bucket 0\ncat',
								b2: 'bucket 2\ndog'
							},
							send: [
								['key', 'hash'],
								['hash', 'b2']
							]
						},
						{
							title: 'Handle a collision',
							say: '"act" has the same letters as "cat", so it also lands in bucket 0. That is a collision, and the bucket keeps a short list.',
							detail:
								'This toy hash only adds letters, so any rearrangement of the same letters collides. With chaining, each bucket holds a short list, and a lookup compares keys along it. If every key collided, lookups would slow to O(n), which is why the quality of the hash function matters.',
							set: {
								key: 'key "act"',
								hash: '24 mod 8\n= 0',
								b0: 'bucket 0\ncat → act',
								b2: 'bucket 2\ndog'
							},
							send: [
								['key', 'hash'],
								['hash', 'b0']
							],
							light: ['b0']
						},
						{
							title: 'Look it up',
							say: 'Finding "dog" means one hash and one bucket. The rest of the table is never touched.',
							detail:
								'A lookup repeats the same hash to find the bucket, then compares the stored key to be sure it really is "dog". Only bucket 2 is examined, however large the table grows. The catch is that buckets have no order, so finding every key in a range needs a sorted structure instead.',
							set: {
								key: 'find "dog"',
								hash: '26 mod 8\n= 2',
								b0: 'bucket 0\ncat → act',
								b2: 'bucket 2\ndog'
							},
							send: [
								['key', 'hash'],
								['hash', 'b2']
							],
							light: ['b2']
						}
					]
				}
			},
			{
				id: 'dynamic-programming',
				title: 'Dynamic programming',
				summary:
					'Some recursive solutions solve the same small problem again and again. Dynamic programming solves each subproblem once, stores the answer, and looks it up next time. This can turn exponential time into polynomial time.',
				points: [
					['Overlapping subproblems', 'the same smaller question comes up many times.'],
					['Optimal substructure', 'the best answer is built from best answers to smaller parts.'],
					['Memoisation', 'top down: recurse as normal, but cache each result.'],
					['Tabulation', 'bottom up: fill a table from the smallest case upwards.'],
					[
						'Classic uses',
						'edit distance, knapsack, longest common subsequence and shortest paths.'
					]
				],
				tip: 'Write the recurrence in words first: which smaller answers build the answer for n?',
				code: `// plain recursion: fib(n-1) + fib(n-2), recomputed again and again
// fib(40) that way makes over 300 million calls

long fib(int n) {             // bottom up: n steps
    long a = 0, b = 1;        // fib(0) and fib(1)
    for (int i = 0; i < n; i++) {
        long next = a + b;
        a = b;
        b = next;
    }
    return a;                 // fib(40) = 102334155
}`,
				links: [
					[
						'MIT 6.006 Lecture 15: Dynamic programming',
						'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/mit6_006s20_lec15/'
					],
					['Dynamic programming (Wikipedia)', 'https://en.wikipedia.org/wiki/Dynamic_programming']
				],
				sketch: {
					kind: 'Recursion tree',
					alt: 'Computing fib(4) needs fib(2) twice. The first answer is saved in a memo, so the second time it is looked up instead of recomputed.',
					h: 225,
					nodes: [
						{ id: 'f4', label: 'fib(4)', x: 240, y: 30, w: 110, h: 46, fill: 'yellow' },
						{ id: 'f3', label: 'fib(3)', x: 130, y: 110, w: 110, h: 46, fill: 'sky' },
						{ id: 'f2a', label: 'fib(2)', x: 350, y: 110, w: 110, h: 46, fill: 'sky' },
						{ id: 'f2b', label: 'fib(2)', x: 70, y: 190, w: 110, h: 46, fill: 'sky' },
						{ id: 'f1', label: 'fib(1)', x: 210, y: 190, w: 110, h: 46, fill: 'sky' },
						{ id: 'memo', label: 'memo:\nempty', x: 400, y: 190, w: 120, h: 46, fill: 'mint' }
					],
					edges: [
						{ from: 'f4', to: 'f3' },
						{ from: 'f4', to: 'f2a' },
						{ from: 'f3', to: 'f2b' },
						{ from: 'f3', to: 'f1' }
					],
					steps: [
						{
							title: 'Split the problem',
							say: 'fib(4) needs fib(3) and fib(2).',
							detail:
								'The Fibonacci rule is fib(n) = fib(n-1) + fib(n-2), with fib(0) = 0 and fib(1) = 1. A direct recursive version calls itself twice at every level. Those two calls share most of their work, and that overlap is what dynamic programming exploits.',
							hide: ['f2b', 'f1'],
							send: [
								['f4', 'f3'],
								['f4', 'f2a']
							],
							light: ['f4']
						},
						{
							title: 'Overlapping calls',
							say: 'fib(3) needs fib(2) and fib(1). So fib(2) gets worked out down here first.',
							detail:
								'fib(2) now appears in two branches of the tree, and plain recursion would work it out twice. For larger n the repeats explode: the number of calls grows about 1.6 times with each step up in n. That is how fib(40) ends up needing over 300 million calls.',
							send: [
								['f3', 'f2b'],
								['f3', 'f1']
							],
							light: ['f2b']
						},
						{
							title: 'Save the answer',
							say: 'Save the answer, fib(2) = 1. That is memoisation.',
							detail:
								'Memoisation keeps a cache, often an array or a hash map indexed by n. Before working out fib(n), the function checks the cache, and afterwards it stores the result there. It trades a little memory for a lot of time.',
							set: { memo: 'memo:\nfib(2) = 1' },
							send: [['f2b', 'memo']],
							light: ['memo']
						},
						{
							title: 'Reuse the answer',
							say: 'When fib(4) needs fib(2) again, it reads the memo instead of recomputing it.',
							detail:
								'The second request for fib(2) costs one lookup instead of a whole subtree of calls. In bigger trees every repeated branch is cut off the same way. This is only safe because fib(2) always has the same answer, wherever it is asked.',
							set: { memo: 'memo:\nfib(2) = 1', f2a: 'fib(2)\nfrom memo' },
							send: [['memo', 'f2a']],
							light: ['f2a']
						},
						{
							title: 'Linear time',
							say: 'fib(4) = 3. Each value is now worked out once, so the work grows in step with n, not exponentially.',
							detail:
								'With the memo there are only n different subproblems and each is solved once, so the time is O(n). The bottom-up version fills values from fib(0) upwards in a loop and keeps just the last two, so it needs only constant memory. fib(40) then takes 40 steps.',
							set: { memo: 'memo:\nfib(2) = 1', f2a: 'fib(2)\nfrom memo', f4: 'fib(4) = 3' },
							light: ['f4']
						}
					]
				}
			}
		]
	},
	{
		slug: 'computing-theory',
		title: 'Computing Theory',
		group: GROUP,
		blurb:
			'What computers can do in principle: simple machines, the Turing machine, and problems no program can ever solve.',
		topics: [
			{
				id: 'automata',
				title: 'Finite automata',
				summary:
					'A finite automaton is the simplest model of a computer. It reads input one symbol at a time and moves between a fixed set of states. Regular expressions and many protocols are built on this idea.',
				points: [
					['State', 'the only memory the machine has.'],
					['Transition', 'a rule: in this state, on this symbol, go there.'],
					['Accepting state', 'if input ends here, the string is accepted.'],
					['Limit', 'it has no counter or stack, so it cannot match balanced brackets.']
				],
				tip: 'If a problem needs unlimited memory of the past, a finite automaton cannot solve it.',
				table: {
					head: ['Machine', 'Memory', 'Recognises'],
					rows: [
						['Finite automaton', 'None beyond state', 'Regular languages'],
						['Pushdown automaton', 'A stack', 'Context-free languages'],
						['Turing machine', 'An unlimited tape', 'Anything computable']
					]
				},
				links: [
					[
						'MIT 18.404 Lecture 1: Finite automata',
						'https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/resources/lecture-1-introduction-finite-automata-regular-expressions/'
					]
				],
				sketch: {
					kind: 'State diagram',
					alt: 'A two-state machine that accepts strings with an even number of ones. Reading 1 swaps states, and reading 0 stays.',
					h: 190,
					nodes: [
						{ id: 'in', label: 'Input: 1 0 1', x: 240, y: 28, w: 220, h: 42, fill: 'yellow' },
						{ id: 'e', label: 'Even\n(accept)', x: 110, y: 130, w: 130, h: 72, fill: 'mint' },
						{ id: 'o', label: 'Odd', x: 370, y: 130, w: 130, h: 72, fill: 'pink' }
					],
					edges: [
						{ from: 'e', to: 'o', label: '1' },
						{ from: 'o', to: 'e', label: '1' }
					],
					steps: [
						{
							title: 'Start state',
							say: 'This machine accepts binary strings with an even number of 1s. It starts in Even.',
							detail:
								'A finite automaton has a fixed set of states, one start state and some accepting states. Here Even is both the start and the only accepting state. The state is the whole of its memory: it only knows whether it has seen an even or odd number of 1s.',
							light: ['e']
						},
						{
							title: 'First transition',
							say: 'Read 1: move to Odd.',
							detail:
								'The rule for Even on reading 1 says go to Odd. The machine reads each symbol exactly once, left to right, and never goes back. So its running time is proportional to the length of the input.',
							set: { in: 'Input: [1] 0 1' },
							send: [['e', 'o']],
							light: ['o']
						},
						{
							title: 'Stay put',
							say: 'Read 0: a 0 changes nothing, so stay in Odd.',
							detail:
								'Every state needs a rule for every symbol. Here reading 0 is a self-loop: the machine stays where it is. The diagram leaves these loops out to keep it tidy, but they are still part of the machine.',
							set: { in: 'Input: 1 [0] 1' },
							light: ['o']
						},
						{
							title: 'Back to Even',
							say: 'Read 1: move back to Even.',
							detail:
								'A second 1 makes the count even again, so the rule for Odd on 1 leads back to Even. Two states are enough because only odd or even matters, not the actual count. Tracking an unlimited count would need unlimited states, which a finite automaton cannot have.',
							set: { in: 'Input: 1 0 [1]' },
							send: [['o', 'e']],
							light: ['e']
						},
						{
							title: 'Accept the input',
							say: 'The input ends in an accepting state, so 101 is accepted. It does have two 1s.',
							detail:
								'Acceptance depends only on the state when the input runs out. Ending in Even means accept, and ending in Odd means reject. Regular expression engines and the lexers inside compilers are built from machines like this one.',
							set: { in: 'Accepted' },
							light: ['e', 'in']
						}
					]
				}
			},
			{
				id: 'turing',
				title: 'The Turing machine',
				summary:
					'A Turing machine is a head reading and writing symbols on an unlimited tape, following a table of rules. It sounds trivial, yet it can compute anything your laptop can, given enough time and tape.',
				points: [
					['Tape', 'unlimited memory divided into cells.'],
					['Head', 'reads a cell, writes a cell, moves left or right.'],
					['Rule table', 'in this state, on this symbol: write, move, change state.'],
					[
						'Church-Turing thesis',
						'anything that can be computed at all can be computed by a Turing machine.'
					]
				],
				tip: 'Turing complete means a language or machine can compute anything a Turing machine can.',
				links: [
					[
						'MIT 18.404 Lecture 6: Church-Turing thesis',
						'https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/resources/mit18_404f20_lec6-1/'
					],
					[
						'Turing machines (Stanford Encyclopedia)',
						'https://plato.stanford.edu/entries/turing-machine/'
					]
				],
				sketch: {
					kind: 'Machine diagram',
					alt: 'A Turing machine head moves along a tape of bits, flipping each one, and halts on a blank cell.',
					h: 170,
					nodes: [
						{ id: 'a', label: '1', x: 75, y: 45, w: 80, h: 62, fill: 'sky' },
						{ id: 'b', label: '0', x: 185, y: 45, w: 80, h: 62, fill: 'sky' },
						{ id: 'c', label: '1', x: 295, y: 45, w: 80, h: 62, fill: 'sky' },
						{ id: 'd', label: 'blank', x: 405, y: 45, w: 80, h: 62 },
						{
							id: 'h',
							label: 'Rule: flip the bit, move right',
							x: 240,
							y: 135,
							w: 300,
							h: 46,
							fill: 'yellow'
						}
					],
					edges: [],
					steps: [
						{
							title: 'Set up the machine',
							say: 'The head starts on the first cell. Its rule: flip the bit, then move right.',
							detail:
								'A Turing machine has a tape of cells, a head that sits over one cell, and a current state. Each rule says: in this state, reading this symbol, write a symbol, move left or right, and pick the next state. This machine has one working state, so its rule table is tiny.',
							light: ['a', 'h']
						},
						{
							title: 'Flip the first bit',
							say: 'Read 1, write 0, move right.',
							detail:
								"In one step the head reads the cell under it, writes the new symbol and moves one cell. The tape is the machine's memory, and unlike a finite automaton it can write to it. Being able to read back what it wrote is what gives it its power.",
							set: { a: '0' },
							send: [['a', 'b']],
							light: ['b']
						},
						{
							title: 'Flip the zero',
							say: 'Read 0, write 1, move right.',
							detail:
								'The same rule fires again, this time turning 0 into 1. The machine never sees the whole tape, only the one cell under the head. Everything it decides comes from its state and that single symbol.',
							set: { a: '0', b: '1' },
							send: [['b', 'c']],
							light: ['c']
						},
						{
							title: 'Flip the last bit',
							say: 'Read 1, write 0, move right.',
							detail:
								'The third cell goes from 1 to 0, and the head moves on to a blank cell. Real programs need many states and long tapes, but every step stays this simple. Any modern computer could be simulated like this, only far more slowly.',
							set: { a: '0', b: '1', c: '0' },
							send: [['c', 'd']],
							light: ['d']
						},
						{
							title: 'Halt',
							say: 'The head reads a blank, so the rule says halt. 101 has become 010.',
							detail:
								'Reaching a halting state ends the run, and whatever is left on the tape is the output. This machine has computed the bitwise NOT of its input. Some machines never reach a halting state, and no general method can tell in advance which ones.',
							set: { a: '0', b: '1', c: '0', h: 'Halt' },
							light: ['h']
						}
					]
				}
			},
			{
				id: 'limits',
				title: 'The limits: P, NP and halting',
				summary:
					'Some problems are easy, some are easy to check but seemingly hard to solve, and some cannot be solved by any program at all. Knowing which kind you face saves you from chasing the impossible.',
				points: [
					['P', 'problems a computer can solve quickly, like sorting.'],
					['NP', 'problems where a proposed answer can be checked quickly, like Sudoku.'],
					['P vs NP', 'nobody has proved whether these two classes are the same.'],
					['NP-complete', 'the hardest problems in NP. Use approximations for these.'],
					[
						'Undecidable',
						'no algorithm can solve these for every input, as with the halting problem.'
					]
				],
				tip: 'If your problem is NP-complete, stop seeking a perfect fast solution and look for a good-enough one.',
				links: [
					[
						'MIT 18.404 Lecture 8: Undecidability',
						'https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/resources/mit18_404f20_lec8-1/'
					],
					[
						'MIT 18.404 Lecture 14: P and NP',
						'https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/resources/mit18_404f20_lec14-1/'
					],
					['P vs NP (Clay Mathematics Institute)', 'https://www.claymath.org/millennium/p-vs-np/']
				],
				sketch: {
					kind: 'Proof by contradiction',
					alt: 'Assume a checker H can predict whether any program halts. A program D does the opposite of what H predicts about D, which is a contradiction.',
					h: 195,
					nodes: [
						{
							id: 'h',
							label: 'H: "will this\nprogram halt?"',
							x: 110,
							y: 50,
							w: 180,
							h: 70,
							fill: 'sky'
						},
						{
							id: 'd',
							label: 'D: do the\nopposite of H',
							x: 370,
							y: 50,
							w: 170,
							h: 70,
							fill: 'pink'
						},
						{ id: 'x', label: 'Run D on itself', x: 240, y: 155, w: 220, h: 54, fill: 'yellow' }
					],
					edges: [
						{ from: 'd', to: 'h', label: 'asks' },
						{ from: 'x', to: 'd' }
					],
					steps: [
						{
							title: 'Assume a perfect H',
							say: 'Suppose someone writes H, a perfect program that predicts whether any program halts.',
							detail:
								'This is a proof by contradiction: assume something exists, then show that leads to nonsense. H would take any program with its input and always answer correctly in finite time. Turing published this argument in 1936.',
							light: ['h']
						},
						{
							title: 'Build D',
							say: 'We write D. It asks H about a program, then does the opposite of the prediction.',
							detail:
								'D is easy to write if H exists: call H, and if it says halt, loop forever, and if it says loop, stop. Programs are just text, so D can pass any program to H, including its own code. Nothing about D is unusual apart from how it uses H.',
							send: [['d', 'h']],
							light: ['d']
						},
						{
							title: 'Self-reference',
							say: 'Now give D to itself.',
							detail:
								'Feeding a program its own code is allowed, because source code is only data. The question for H becomes: does D halt when given D? Whatever H answers, D is built to do the opposite.',
							send: [['x', 'd']],
							light: ['x']
						},
						{
							title: 'First case fails',
							say: 'If H says "D halts", then D loops forever. So H was wrong.',
							detail:
								'D asked H about itself and got the answer "halts". By its own rule it then loops forever, so it never halts. The prediction was wrong, so a perfect H could never give this answer.',
							set: { x: 'H says halts: D loops' },
							send: [['d', 'h']],
							down: ['h']
						},
						{
							title: 'No such program',
							say: 'If H says "D loops", then D halts at once. Wrong again. So H cannot exist.',
							detail:
								'The two possible answers both fail, so H gets D wrong whatever it says. The only way out is that H could never have existed. Many practical questions, such as whether a program ever reaches a given line, are undecidable for the same reason.',
							set: { x: 'H says loops: D halts' },
							send: [['d', 'h']],
							down: ['h']
						}
					]
				}
			},
			{
				id: 'nfa',
				title: 'Nondeterminism and NFAs',
				summary:
					'A nondeterministic finite automaton (NFA) may have several moves for the same symbol, and it accepts if any choice of moves ends in an accepting state. NFAs are often far smaller and easier to design. Yet they recognise exactly the same languages as ordinary DFAs.',
				points: [
					['Choice', 'from one state, a symbol may lead to several states, or to none.'],
					['ε-move', 'a jump to another state without reading any symbol.'],
					['Acceptance', 'the input is accepted if at least one path ends in an accepting state.'],
					['Subset construction', 'turns an NFA into a DFA whose states are sets of NFA states.'],
					['Cost', 'an NFA with n states can need up to 2ⁿ states as a DFA.']
				],
				tip: 'To run an NFA by hand, track the set of states it could be in after each symbol.',
				links: [
					[
						'MIT 18.404 Lecture 2: Nondeterminism',
						'https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/resources/mit18_404f20_lec2-1/'
					],
					['Subset construction (Wikipedia)', 'https://en.wikipedia.org/wiki/Powerset_construction']
				],
				sketch: {
					kind: 'State diagram',
					alt: 'An NFA that accepts strings ending in 01 reads 1001. It tracks every state it could be in, and ends with the accepting state in its set.',
					h: 180,
					nodes: [
						{ id: 'in', label: 'Input: 1 0 0 1', x: 240, y: 28, w: 240, h: 42, fill: 'yellow' },
						{ id: 'q0', label: 'q0\nany symbol', x: 80, y: 130, w: 110, h: 64, fill: 'sky' },
						{ id: 'q1', label: 'q1\nsaw 0', x: 240, y: 130, w: 110, h: 64, fill: 'sky' },
						{ id: 'q2', label: 'q2\nsaw 01\n(accept)', x: 400, y: 130, w: 110, h: 72, fill: 'mint' }
					],
					edges: [
						{ from: 'q0', to: 'q1', label: '0' },
						{ from: 'q1', to: 'q2', label: '1' }
					],
					steps: [
						{
							title: 'Track a set of states',
							say: 'This NFA accepts strings that end in 01. q0 loops on every symbol. It starts in the set {q0}.',
							detail:
								'An NFA can be in several states at once, so we follow the set of every state it could be in. q0 has a self-loop on both 0 and 1, so it can always stay put. Its 0 edge to q1 is a guess that this 0 begins the final 01.',
							light: ['q0']
						},
						{
							title: 'Loop on 1',
							say: 'Read 1: q0 just loops. The set is still {q0}.',
							detail:
								'From q0 the only move on 1 is the self-loop, since the edge to q1 needs a 0. No other state has been reached yet. This set of current states is all a simulator needs to store after each symbol.',
							set: { in: 'Input: [1] 0 0 1' },
							light: ['q0']
						},
						{
							title: 'Branch on 0',
							say: 'Read 0: q0 has two choices, so it takes both. It loops, and it also moves to q1. Set {q0, q1}.',
							detail:
								'On a 0, q0 can either stay or move to q1. An NFA does not pick one. It follows every choice at once, which is like running copies of itself in parallel.',
							set: { in: 'Input: 1 [0] 0 1' },
							send: [['q0', 'q1']],
							light: ['q0', 'q1']
						},
						{
							title: 'Dead path',
							say: 'Read 0 again: q1 has no move on 0, so that path dies. q0 splits again. Set {q0, q1}.',
							detail:
								'q1 only has a move on 1, so the copy in q1 has nowhere to go and is dropped. The copy in q0 splits again into q0 and q1, so the set looks the same as before. A dead path does not cause rejection as long as another path survives.',
							set: { in: 'Input: 1 0 [0] 1' },
							send: [['q0', 'q1']],
							light: ['q0', 'q1']
						},
						{
							title: 'Some path accepts',
							say: 'Read 1: the path in q1 moves to q2. The input ends with q2 in the set, so 1001 is accepted.',
							detail:
								'On 1, q0 loops and q1 moves to q2, so the final set is {q0, q2}. The NFA accepts if any state in that set is accepting. The subset construction turns each reachable set into one DFA state, so this 3-state NFA needs at most 2³ = 8 DFA states.',
							set: { in: 'Accepted' },
							send: [['q1', 'q2']],
							light: ['q2', 'in']
						}
					]
				}
			},
			{
				id: 'grammars',
				title: 'Context-free grammars and stacks',
				summary:
					'A context-free grammar is a set of rewrite rules that generates a language, such as the syntax of a programming language. It can describe nesting, like balanced brackets, which no finite automaton can. The matching machine is a pushdown automaton: a finite automaton with a stack.',
				points: [
					['Variable', 'a placeholder such as S that the rules rewrite.'],
					['Rule', 'S → aSb replaces S with an a, another S and a b.'],
					['Derivation', 'apply rules from the start variable until only real symbols are left.'],
					[
						'Pushdown automaton',
						'a finite automaton plus a stack. It recognises exactly the context-free languages.'
					],
					['Parsers', 'compilers use a grammar to turn source code into a parse tree.']
				],
				tip: 'Nesting calls for a grammar and a stack. Flat patterns only need a regular expression.',
				code: `S → aSb | ε       gives aⁿbⁿ: the empty string, ab, aabb, aaabbb ...

S ⇒ aSb ⇒ aaSbb ⇒ aabb`,
				links: [
					[
						'MIT 18.404 Lecture 4: Pushdown automata',
						'https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/resources/mit18_404f20_lec4-1/'
					],
					['Context-free grammar (Wikipedia)', 'https://en.wikipedia.org/wiki/Context-free_grammar']
				],
				sketch: {
					kind: 'Machine diagram',
					alt: 'A pushdown automaton checks aabb by pushing a marker for each a and popping one for each b. The stack ends empty, so the input is accepted.',
					h: 185,
					nodes: [
						{ id: 'in', label: 'Input: a a b b', x: 240, y: 28, w: 240, h: 42, fill: 'yellow' },
						{ id: 'ctrl', label: 'Control\nreading a', x: 110, y: 125, w: 150, h: 70, fill: 'sky' },
						{ id: 'stack', label: 'Stack\n(empty)', x: 370, y: 125, w: 150, h: 90, fill: 'mint' }
					],
					edges: [{ from: 'ctrl', to: 'stack', label: 'push / pop', plain: true }],
					steps: [
						{
							title: 'Push for each a',
							say: 'Check aabb with a stack. Each a pushes a marker.',
							detail:
								'A pushdown automaton is a finite automaton plus a stack, a pile where you can only add or remove the top item. For every a it reads, it pushes a marker X. The stack is how it remembers how many a symbols it has seen.',
							set: { in: 'Input: [a] a b b', stack: 'Stack\nX' },
							send: [['ctrl', 'stack']],
							light: ['stack']
						},
						{
							title: 'Count with the stack',
							say: 'The second a pushes another marker.',
							detail:
								'The stack now holds two markers, one per a. A finite automaton would need a separate state for every possible count, and it only has a fixed number of states. The stack can grow as tall as the input needs, which removes that limit.',
							set: { in: 'Input: a [a] b b', stack: 'Stack\nX X' },
							send: [['ctrl', 'stack']],
							light: ['stack']
						},
						{
							title: 'Pop for each b',
							say: 'Each b pops one marker, pairing it with an a.',
							detail:
								'Reading a b switches the control into its b phase and pops one X, pairing it with an earlier a. From now on another a would be rejected, because every a must come before every b. The grammar rule S → aSb builds the same pairing from the outside in.',
							set: { in: 'Input: a a [b] b', stack: 'Stack\nX', ctrl: 'Control\nreading b' },
							send: [['stack', 'ctrl']],
							light: ['ctrl']
						},
						{
							title: 'Pop the last marker',
							say: 'The last b pops the last marker.',
							detail:
								'The second b removes the second X, leaving the stack empty. If there were more b symbols than a symbols, a b would arrive with nothing to pop, and the machine would reject. Matched brackets in code are checked the same way, with ( pushing and ) popping.',
							set: { in: 'Input: a a b [b]', stack: 'Stack\n(empty)', ctrl: 'Control\nreading b' },
							send: [['stack', 'ctrl']],
							light: ['ctrl']
						},
						{
							title: 'Accept on empty stack',
							say: 'The input is used up and the stack is empty, so aabb is accepted. A finite automaton cannot count like this.',
							detail:
								'The input is accepted only when it is fully read and the stack is empty, so every a was matched by exactly one b. Inputs like aab or abab fail: one leaves a marker behind and the other finds an a after a b. Compiler parsers use a grammar and a stack the same way to build a parse tree.',
							set: { in: 'Accepted', ctrl: 'Control\nreading b' },
							light: ['in', 'stack']
						}
					]
				}
			}
		]
	}
];
