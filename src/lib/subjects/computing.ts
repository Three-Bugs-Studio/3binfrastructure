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
					['NULL', 'a pointer to nothing. Following it crashes the program.']
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
			}
		]
	}
];
