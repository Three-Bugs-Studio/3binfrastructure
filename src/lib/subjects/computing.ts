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
							say: 'Read 1101 from the left. The 8s bit is on.',
							set: { b3: '8s\n1', sum: 'Total = 8' },
							send: [['b3', 'sum']],
							light: ['b3']
						},
						{
							say: 'The 4s bit is on as well: 8 + 4 = 12.',
							set: { b3: '8s\n1', b2: '4s\n1', sum: 'Total = 12' },
							send: [['b2', 'sum']],
							light: ['b2']
						},
						{
							say: 'The 2s bit is off, so it adds nothing.',
							set: { b3: '8s\n1', b2: '4s\n1', b1: '2s\n0', sum: 'Total = 12' },
							down: ['b1']
						},
						{
							say: 'The 1s bit is on: 12 + 1 = 13. So 1101 in binary is 13.',
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
							say: '0 + 0: nothing is on, so both outputs stay 0.',
							send: [
								['a', 'x'],
								['b', 'n']
							]
						},
						{
							say: '1 + 0: the inputs differ, so XOR gives Sum = 1. AND stays 0.',
							set: { a: 'A = 1', s: 'Sum = 1' },
							send: [
								['a', 'x'],
								['x', 's']
							],
							light: ['s']
						},
						{
							say: '0 + 1: the same result, because the circuit does not care about order.',
							set: { b: 'B = 1', s: 'Sum = 1' },
							send: [
								['b', 'x'],
								['x', 's']
							],
							light: ['s']
						},
						{
							say: '1 + 1: the inputs match, so Sum = 0, and AND gives Carry = 1. That is 10 in binary, which is 2.',
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
							say: 'D changes to 1, but the clock is low, so Q ignores it.',
							set: { d: 'D = 1' },
							send: [['d', 'ff']],
							light: ['d']
						},
						{
							say: 'The clock rises. This edge is the moment the flip-flop acts.',
							set: { d: 'D = 1', clk: 'Clock rises' },
							send: [['clk', 'ff']],
							light: ['clk']
						},
						{
							say: 'Q copies D, so the circuit has stored a 1.',
							set: { d: 'D = 1', clk: 'Clock rises', q: 'Q = 1' },
							send: [['ff', 'q']],
							light: ['q']
						},
						{
							say: 'D falls back to 0, but Q keeps its 1 until the next rising edge. That is memory.',
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
							say: 'F is 1 only in the two rows where A = 1. Those 1s go on the map.',
							light: ['c10', 'c11']
						},
						{
							say: 'Written row by row, F = A·¬B + A·B. That is two ANDs and an OR.',
							set: { f: 'F = A·¬B + A·B' },
							send: [
								['c10', 'f'],
								['c11', 'f']
							]
						},
						{
							say: 'The two 1s are neighbours, so circle them as one group of 2.',
							set: { f: 'F = A·¬B + A·B' },
							send: [['c10', 'c11']],
							light: ['c10', 'c11']
						},
						{
							say: 'Inside the group B is 0 once and 1 once, so B does not matter.',
							set: { f: 'F = A·(¬B + B)', c10: 'A=1 B=?\n1', c11: 'A=1 B=?\n1' },
							light: ['c10', 'c11']
						},
						{
							say: 'Only A is left: F = A. The gates are gone, and one wire does the job.',
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
							say: 'Store -6.25 as a 32-bit float. It is negative, so the sign bit is 1.',
							set: { sign: 'Sign\n1' },
							send: [['num', 'sign']],
							light: ['sign']
						},
						{
							say: 'In binary 6.25 is 110.01. Slide the point to get 1.1001 × 2².',
							set: { sign: 'Sign\n1', num: '-1.1001₂ × 2²' },
							light: ['num']
						},
						{
							say: 'Add the bias of 127 to the power: 2 + 127 = 129, which is 10000001.',
							set: { sign: 'Sign\n1', num: '-1.1001₂ × 2²', exp: 'Exponent\n10000001' },
							send: [['num', 'exp']],
							light: ['exp']
						},
						{
							say: 'Every normal number starts with 1, so that 1 is not stored. The fraction keeps 1001, then zeros.',
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
							say: 'Together the bits read 0xC0C80000. -6.25 fits exactly, but 0.1 never can.',
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
							say: 'The preprocessor pastes stdio.h into your file.',
							send: [['src', 'pre']],
							light: ['pre']
						},
						{
							say: 'The compiler checks the code and writes assembly. A syntax error stops it here.',
							send: [['pre', 'cc']],
							light: ['cc']
						},
						{
							say: 'The assembler turns that into machine code.',
							send: [['cc', 'as']],
							light: ['as']
						},
						{
							say: 'The linker finds printf in the C library and joins everything together.',
							send: [['as', 'ld']],
							light: ['ld']
						},
						{
							say: 'You now have a program the processor can run directly.',
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
						{ say: 'int a = 5 puts the value 5 at some address, say 0x100.', light: ['a'] },
						{
							say: 'int *p = &a stores that address in p. Now p points at a.',
							set: { p: 'p\n0x100' },
							send: [['p', 'a']],
							light: ['p']
						},
						{
							say: '*p = 9 follows the arrow and writes through it.',
							set: { p: 'p\n0x100', a: 'a at 0x100\nvalue 9' },
							send: [['p', 'a']],
							light: ['a']
						},
						{
							say: 'The variable a changed without its name appearing on that line. That is the power, and the danger.',
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
							say: 'Two variables sit side by side in memory. The array has room for 4 bytes.',
							light: ['a', 'b']
						},
						{
							say: 'strcpy copies "Alexander" with no length check.',
							send: [['in', 'a']],
							set: { a: 'name[4]\nAlex' },
							light: ['in']
						},
						{
							say: 'The extra letters keep going, straight into the next variable.',
							send: [['a', 'b']],
							set: { a: 'name[4]\nAlex', b: 'isAdmin\nander' },
							down: ['b']
						},
						{
							say: 'isAdmin is now non-zero. That is how a buffer overflow turns into a security hole.',
							set: { a: 'name[4]\nAlex', b: 'isAdmin\nTRUE?!' },
							down: ['b']
						},
						{
							say: 'A bounded copy stops at the end of the array, and the neighbour stays safe.',
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
							say: 'port holds 0000 0001. We want bit 3 on, and bit 0 must stay as it is.',
							light: ['port', 'mask']
						},
						{
							say: 'OR with the mask: a bit is 1 if it is 1 in either value.',
							set: { out: 'port | mask\n0000 1001' },
							send: [
								['port', 'out'],
								['mask', 'out']
							],
							light: ['out']
						},
						{
							say: 'Store it back. Bit 3 is on, and bit 0 survived.',
							set: { port: 'port\n0000 1001', out: 'port | mask\n0000 1001' },
							light: ['port']
						},
						{
							say: 'To clear bit 3, AND with the inverted mask, 1111 0111.',
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
							say: 'Store it back. Bit 3 is off again, and every other bit is untouched.',
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
							say: 'id is a char, so it takes byte 0.',
							hide: ['pad', 'value', 'ok', 'pad2'],
							light: ['id']
						},
						{
							say: 'value is an int and must start at a multiple of 4, so bytes 1 to 3 are left empty.',
							set: { size: 'sizeof = 8 so far' },
							hide: ['ok', 'pad2'],
							send: [['id', 'value']],
							light: ['pad']
						},
						{
							say: 'ok is a char, so it fits in byte 8.',
							set: { size: 'sizeof = 9 so far' },
							hide: ['pad2'],
							send: [['value', 'ok']],
							light: ['ok']
						},
						{
							say: 'The end is padded to a multiple of 4 too, so every item in an array stays aligned.',
							set: { size: 'sizeof = 12' },
							light: ['pad2', 'size']
						},
						{
							say: 'Put value first and the two chars after it: 4 + 1 + 1 = 6, padded to 8.',
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
							say: 'The calling code only knows it has a Shape.',
							send: [['call', 'base']],
							light: ['base']
						},
						{
							say: 'At runtime the object is really a Circle, so Circle::area runs.',
							send: [['base', 'c']],
							light: ['c']
						},
						{
							say: 'The same line of code with a Square runs Square::area.',
							send: [['base', 's']],
							light: ['s']
						},
						{
							say: 'Add a Triangle later, and the calling code does not change at all.',
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
							say: 'A raw pointer: new Sensor runs on the way in.',
							send: [['in', 'mem']],
							light: ['mem']
						},
						{
							say: 'read() throws an exception, which jumps past the delete line.',
							send: [['use', 'out']],
							set: { mem: 'Sensor leaked' },
							down: ['mem']
						},
						{
							say: 'Now use a unique_ptr. It owns the memory.',
							send: [['in', 'mem']],
							set: { mem: 'Owned by\nunique_ptr' },
							light: ['mem']
						},
						{
							say: 'The same exception unwinds the function, and the destructor still runs.',
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
							say: 'The display and the logger subscribe to the sensor.',
							hide: ['c'],
							light: ['a', 'b']
						},
						{
							say: 'The value changes, so the sensor notifies every subscriber.',
							hide: ['c'],
							send: [
								['sub', 'a'],
								['sub', 'b']
							],
							set: { sub: 'Sensor\n31 °C' }
						},
						{
							say: "A new Alarm class subscribes. The sensor's code does not change.",
							light: ['c'],
							set: { sub: 'Sensor\n31 °C' }
						},
						{
							say: 'The next change reaches all three. That is low coupling.',
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
							say: 'You write biggest once, with T as a blank for the type.',
							hide: ['i', 'd', 'p'],
							light: ['tpl']
						},
						{
							say: 'biggest(3, 7) makes the compiler stamp out a version for int.',
							hide: ['d', 'p'],
							send: [['tpl', 'i']],
							light: ['i']
						},
						{
							say: 'biggest(2.5, 1.0) stamps out a second copy for double. Each copy is as fast as hand-written code.',
							hide: ['p'],
							send: [['tpl', 'd']],
							light: ['d']
						},
						{
							say: 'A Point type with no < operator is refused when you build, not when you run.',
							send: [['tpl', 'p']],
							down: ['p']
						},
						{
							say: 'Give Point an operator<, and the same template works for it too.',
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
							say: 'a owns a buffer of a million ints on the heap.',
							hide: ['b', 'buf2', 'c'],
							send: [['a', 'buf']],
							light: ['a', 'buf']
						},
						{
							say: 'Copy: b = a. b gets a brand new buffer, and every int is copied across.',
							hide: ['c'],
							send: [['buf', 'buf2']],
							light: ['buf2']
						},
						{
							say: 'That is a million writes and twice the memory. Fine if you need two copies, wasteful if you do not.',
							hide: ['c'],
							down: ['buf2']
						},
						{
							say: 'Move: c = std::move(a). c simply takes the pointer to Buffer 1. No ints are copied.',
							set: { a: 'a\n(empty)', c: 'c\n→ Buffer 1' },
							send: [['c', 'buf']],
							light: ['c']
						},
						{
							say: 'a is left empty but valid. Give it a new value or let it go out of scope.',
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
						{ say: 'Find one name in a million sorted names.', light: ['list'] },
						{
							say: 'After 10 checks, linear search is still near the start.',
							send: [['list', 'lin']],
							set: { lin: 'Linear search\n10 checks' }
						},
						{
							say: 'After 10 checks, binary search has cut the list down to about 1,000 names.',
							send: [['list', 'bin']],
							set: { lin: 'Linear search\n10 checks', bin: 'Binary search\n10 checks' },
							light: ['bin']
						},
						{
							say: 'Binary search finishes in about 20 checks.',
							set: { lin: 'Linear search\n20 checks', bin: 'Found in\n20 checks' },
							light: ['bin']
						},
						{
							say: 'Linear search might need a million. Same data, 50,000 times more work.',
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
							say: 'Start with an unsorted list and split it in half.',
							send: [
								['all', 'l'],
								['all', 'r']
							]
						},
						{
							say: 'Sort each half. These are small enough to be simple.',
							set: { l: '2   5', r: '1   8' },
							light: ['l', 'r']
						},
						{
							say: 'Merge: compare the front items, 2 and 1. Take 1.',
							set: { l: '2   5', r: '8', out: '1' },
							send: [['r', 'out']]
						},
						{
							say: 'Compare 2 and 8. Take 2, then 5.',
							set: { l: '', r: '8', out: '1   2   5' },
							send: [['l', 'out']]
						},
						{
							say: 'Only 8 is left, so add it. The list is sorted.',
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
							say: 'From A, the neighbours cost B = 4 and C = 1.',
							send: [
								['a', 'b'],
								['a', 'c']
							],
							set: { b: 'B\n4', c: 'C\n1' },
							light: ['a']
						},
						{
							say: 'C is closest, so visit it. Going through C reaches B for 1 + 2 = 3, which beats 4.',
							send: [['c', 'b']],
							set: { b: 'B\n3', c: 'C\n1' },
							light: ['c']
						},
						{
							say: 'Through C, D would cost 1 + 5 = 6. Note it for now.',
							send: [['c', 'd']],
							set: { b: 'B\n3', c: 'C\n1', d: 'D\n6' },
							light: ['c']
						},
						{
							say: 'B is closest next. Going through B reaches D for 3 + 1 = 4, which beats 6.',
							send: [['b', 'd']],
							set: { b: 'B\n3', c: 'C\n1', d: 'D\n4' },
							light: ['b']
						},
						{
							say: 'The shortest path is A, C, B, D, at a total cost of 4.',
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
							say: 'Insert "cat". The toy hash adds letter positions: 3 + 1 + 20 = 24, and 24 mod 8 = 0.',
							set: { hash: '24 mod 8\n= 0' },
							send: [['key', 'hash']],
							light: ['hash']
						},
						{
							say: '"cat" goes straight into bucket 0. No searching.',
							set: { hash: '24 mod 8\n= 0', b0: 'bucket 0\ncat' },
							send: [['hash', 'b0']],
							light: ['b0']
						},
						{
							say: '"dog" hashes to 26 mod 8 = 2, so it goes into bucket 2.',
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
							say: '"act" has the same letters as "cat", so it also lands in bucket 0. That is a collision, and the bucket keeps a short list.',
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
							say: 'Finding "dog" means one hash and one bucket. The rest of the table is never touched.',
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
							say: 'fib(4) needs fib(3) and fib(2).',
							hide: ['f2b', 'f1'],
							send: [
								['f4', 'f3'],
								['f4', 'f2a']
							],
							light: ['f4']
						},
						{
							say: 'fib(3) needs fib(2) and fib(1). So fib(2) gets worked out down here first.',
							send: [
								['f3', 'f2b'],
								['f3', 'f1']
							],
							light: ['f2b']
						},
						{
							say: 'Save the answer, fib(2) = 1. That is memoisation.',
							set: { memo: 'memo:\nfib(2) = 1' },
							send: [['f2b', 'memo']],
							light: ['memo']
						},
						{
							say: 'When fib(4) needs fib(2) again, it reads the memo instead of recomputing it.',
							set: { memo: 'memo:\nfib(2) = 1', f2a: 'fib(2)\nfrom memo' },
							send: [['memo', 'f2a']],
							light: ['f2a']
						},
						{
							say: 'fib(4) = 3. Each value is now worked out once, so the work grows in step with n, not exponentially.',
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
							say: 'This machine accepts binary strings with an even number of 1s. It starts in Even.',
							light: ['e']
						},
						{
							say: 'Read 1: move to Odd.',
							set: { in: 'Input: [1] 0 1' },
							send: [['e', 'o']],
							light: ['o']
						},
						{
							say: 'Read 0: a 0 changes nothing, so stay in Odd.',
							set: { in: 'Input: 1 [0] 1' },
							light: ['o']
						},
						{
							say: 'Read 1: move back to Even.',
							set: { in: 'Input: 1 0 [1]' },
							send: [['o', 'e']],
							light: ['e']
						},
						{
							say: 'The input ends in an accepting state, so 101 is accepted. It does have two 1s.',
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
							say: 'The head starts on the first cell. Its rule: flip the bit, then move right.',
							light: ['a', 'h']
						},
						{
							say: 'Read 1, write 0, move right.',
							set: { a: '0' },
							send: [['a', 'b']],
							light: ['b']
						},
						{
							say: 'Read 0, write 1, move right.',
							set: { a: '0', b: '1' },
							send: [['b', 'c']],
							light: ['c']
						},
						{
							say: 'Read 1, write 0, move right.',
							set: { a: '0', b: '1', c: '0' },
							send: [['c', 'd']],
							light: ['d']
						},
						{
							say: 'The head reads a blank, so the rule says halt. 101 has become 010.',
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
							say: 'Suppose someone writes H, a perfect program that predicts whether any program halts.',
							light: ['h']
						},
						{
							say: 'We write D. It asks H about a program, then does the opposite of the prediction.',
							send: [['d', 'h']],
							light: ['d']
						},
						{ say: 'Now give D to itself.', send: [['x', 'd']], light: ['x'] },
						{
							say: 'If H says "D halts", then D loops forever. So H was wrong.',
							set: { x: 'H says halts: D loops' },
							send: [['d', 'h']],
							down: ['h']
						},
						{
							say: 'If H says "D loops", then D halts at once. Wrong again. So H cannot exist.',
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
							say: 'This NFA accepts strings that end in 01. q0 loops on every symbol. It starts in the set {q0}.',
							light: ['q0']
						},
						{
							say: 'Read 1: q0 just loops. The set is still {q0}.',
							set: { in: 'Input: [1] 0 0 1' },
							light: ['q0']
						},
						{
							say: 'Read 0: q0 has two choices, so it takes both. It loops, and it also moves to q1. Set {q0, q1}.',
							set: { in: 'Input: 1 [0] 0 1' },
							send: [['q0', 'q1']],
							light: ['q0', 'q1']
						},
						{
							say: 'Read 0 again: q1 has no move on 0, so that path dies. q0 splits again. Set {q0, q1}.',
							set: { in: 'Input: 1 0 [0] 1' },
							send: [['q0', 'q1']],
							light: ['q0', 'q1']
						},
						{
							say: 'Read 1: the path in q1 moves to q2. The input ends with q2 in the set, so 1001 is accepted.',
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
							say: 'Check aabb with a stack. Each a pushes a marker.',
							set: { in: 'Input: [a] a b b', stack: 'Stack\nX' },
							send: [['ctrl', 'stack']],
							light: ['stack']
						},
						{
							say: 'The second a pushes another marker.',
							set: { in: 'Input: a [a] b b', stack: 'Stack\nX X' },
							send: [['ctrl', 'stack']],
							light: ['stack']
						},
						{
							say: 'Each b pops one marker, pairing it with an a.',
							set: { in: 'Input: a a [b] b', stack: 'Stack\nX', ctrl: 'Control\nreading b' },
							send: [['stack', 'ctrl']],
							light: ['ctrl']
						},
						{
							say: 'The last b pops the last marker.',
							set: { in: 'Input: a a b [b]', stack: 'Stack\n(empty)', ctrl: 'Control\nreading b' },
							send: [['stack', 'ctrl']],
							light: ['ctrl']
						},
						{
							say: 'The input is used up and the stack is empty, so aabb is accepted. A finite automaton cannot count like this.',
							set: { in: 'Accepted', ctrl: 'Control\nreading b' },
							light: ['in', 'stack']
						}
					]
				}
			}
		]
	}
];
