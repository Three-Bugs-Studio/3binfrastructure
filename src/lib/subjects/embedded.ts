import type { Subject } from '../sketch';

const GROUP = 'Embedded systems';

export const embedded: Subject[] = [
	{
		slug: 'embedded-systems-arduino',
		title: 'Embedded System 1 (Arduino)',
		group: GROUP,
		blurb:
			'First steps with hardware on an Arduino Uno: blinking an LED, reading sensors, dimming with PWM, and reacting with interrupts.',
		topics: [
			{
				id: 'blink',
				title: 'Digital output: setup and loop',
				summary:
					'An Arduino Uno is a small board built around the ATmega328P microcontroller, running at 16 MHz and 5 V. There is no operating system. Your setup() runs once, then loop() runs forever.',
				points: [
					['setup()', 'runs once at power-up. Configure your pins here.'],
					['loop()', 'runs repeatedly until the power goes off.'],
					['digitalWrite', 'sets a pin to 5 V (HIGH) or 0 V (LOW).'],
					[
						'Resistor',
						'always put one in series with an LED, or you can damage both the LED and the pin.'
					]
				],
				tip: 'delay() stops everything else. Use millis() once your program does more than one job.',
				code: `const int LED = 13;

void setup() {
  pinMode(LED, OUTPUT);
}

void loop() {
  digitalWrite(LED, HIGH);
  delay(500);
  digitalWrite(LED, LOW);
  delay(500);
}`,
				sketch: {
					kind: 'Circuit and code',
					alt: 'Pin 13 drives a resistor and an LED to ground. The loop turns the pin on, waits, turns it off, and waits again.',
					h: 160,
					nodes: [
						{ id: 'u', label: 'Arduino\nloop()', x: 62, y: 80, w: 104, h: 80, fill: 'sky' },
						{ id: 'p', label: 'Pin 13\nLOW', x: 188, y: 80, w: 84, h: 66, fill: 'yellow' },
						{ id: 'r', label: '220 Ω', x: 310, y: 80, w: 76, h: 44, fill: 'mint' },
						{ id: 'l', label: 'LED\noff', x: 430, y: 80, w: 76, h: 66 }
					],
					edges: [
						{ from: 'u', to: 'p' },
						{ from: 'p', to: 'r' },
						{ from: 'r', to: 'l' }
					],
					steps: [
						{
							say: 'setup() configures pin 13 as an output, once.',
							light: ['u'],
							set: { u: 'Arduino\nsetup()' }
						},
						{
							say: 'loop() sets the pin HIGH, so 5 V appears on it.',
							send: [['u', 'p']],
							set: { p: 'Pin 13\nHIGH' },
							light: ['p']
						},
						{
							say: 'Current flows through the resistor, and the LED lights up.',
							send: [
								['p', 'r'],
								['r', 'l']
							],
							set: { p: 'Pin 13\nHIGH', l: 'LED\non!' },
							light: ['l']
						},
						{
							say: 'After 500 ms the pin goes LOW and the LED turns off.',
							send: [['u', 'p']],
							light: ['p']
						},
						{ say: 'loop() ends and immediately starts again, forever.', light: ['u'] }
					]
				}
			},
			{
				id: 'analog',
				title: 'Analog input and PWM',
				summary:
					'The real world is not just on or off. An ADC turns a voltage into a number, and PWM fakes an in-between output by switching a pin on and off very quickly.',
				points: [
					['analogRead', 'the Uno has a 10-bit ADC, so 0 V to 5 V becomes 0 to 1023.'],
					['Voltage', 'V = reading × 5 / 1023.'],
					['analogWrite', 'PWM from 0 to 255 on the pins marked ~.'],
					['Duty cycle', 'the share of time the pin is on. 50% looks half as bright.']
				],
				tip: 'Use map() to convert between ranges, such as 0 to 1023 into 0 to 255.',
				code: `void loop() {
  int raw = analogRead(A0);                 // 0 to 1023
  int brightness = map(raw, 0, 1023, 0, 255);
  analogWrite(9, brightness);               // PWM on pin 9
}`,
				sketch: {
					kind: 'Signal flow diagram',
					alt: 'A knob gives a voltage, the ADC turns it into a number, the code scales it, and PWM sets the LED brightness.',
					h: 175,
					nodes: [
						{ id: 'k', label: 'Knob\n0 V', x: 60, y: 50, w: 80, h: 66, fill: 'sky' },
						{ id: 'a', label: 'ADC\n0', x: 180, y: 50, w: 80, h: 66, fill: 'yellow' },
						{ id: 'c', label: 'map()\n0', x: 300, y: 50, w: 80, h: 66, fill: 'pink' },
						{ id: 'p', label: 'PWM\n0%', x: 420, y: 50, w: 80, h: 66, fill: 'mint' },
						{ id: 'l', label: 'LED is off', x: 240, y: 140, w: 200, h: 46 }
					],
					edges: [
						{ from: 'k', to: 'a' },
						{ from: 'a', to: 'c' },
						{ from: 'c', to: 'p' }
					],
					steps: [
						{
							say: 'Turn the knob halfway. The voltage on A0 is now 2.5 V.',
							set: { k: 'Knob\n2.5 V' },
							light: ['k']
						},
						{
							say: 'The ADC turns that into a number: about 511.',
							send: [['k', 'a']],
							set: { k: 'Knob\n2.5 V', a: 'ADC\n511' }
						},
						{
							say: 'map() scales it to the PWM range: about 127.',
							send: [['a', 'c']],
							set: { k: 'Knob\n2.5 V', a: 'ADC\n511', c: 'map()\n127' }
						},
						{
							say: 'The pin is on for half of each cycle, so the LED looks half as bright.',
							send: [['c', 'p']],
							set: {
								k: 'Knob\n2.5 V',
								a: 'ADC\n511',
								c: 'map()\n127',
								p: 'PWM\n50%',
								l: 'LED at half brightness'
							},
							light: ['l']
						}
					]
				}
			},
			{
				id: 'interrupts',
				title: 'Interrupts and debouncing',
				summary:
					'Polling means checking a button over and over, and a slow loop can miss a quick press. An interrupt makes the hardware stop your code the instant something happens, run a short function, and carry on.',
				points: [
					['attachInterrupt', 'on the Uno, pins 2 and 3 can trigger an interrupt.'],
					['ISR', 'interrupt service routine. Keep it very short, with no delay() or Serial.'],
					[
						'volatile',
						'marks variables shared with an ISR, so the compiler always reads them fresh.'
					],
					[
						'Bouncing',
						'a mechanical button contact chatters for a few milliseconds and looks like many presses.'
					]
				],
				tip: 'In an ISR, set a flag and leave. Do the real work in loop().',
				code: `volatile bool pressed = false;

void onPress() { pressed = true; }

void setup() {
  pinMode(2, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(2), onPress, FALLING);
}

void loop() {
  if (pressed) {
    pressed = false;
    // handle it here
  }
}`,
				sketch: {
					kind: 'Interrupt flow',
					alt: 'While the main loop runs a slow task, a button press triggers an interrupt that sets a flag, then the loop resumes and handles it.',
					h: 180,
					nodes: [
						{ id: 'b', label: 'Button', x: 65, y: 90, w: 104, h: 62, fill: 'pink' },
						{ id: 'i', label: 'ISR', x: 240, y: 40, w: 110, h: 54, fill: 'yellow' },
						{
							id: 'l',
							label: 'loop(): busy\nwith a slow job',
							x: 240,
							y: 140,
							w: 170,
							h: 66,
							fill: 'sky'
						},
						{ id: 'f', label: 'pressed\nfalse', x: 420, y: 90, w: 104, h: 62, fill: 'mint' }
					],
					edges: [
						{ from: 'b', to: 'i' },
						{ from: 'i', to: 'f' },
						{ from: 'f', to: 'l' }
					],
					steps: [
						{
							say: 'The main loop is busy with a slow job, like updating a display.',
							light: ['l']
						},
						{
							say: 'You press the button. The hardware pauses the loop at once.',
							send: [['b', 'i']],
							down: ['l'],
							light: ['i']
						},
						{
							say: 'The ISR sets a flag and returns, in a few microseconds.',
							send: [['i', 'f']],
							set: { f: 'pressed\ntrue' },
							down: ['l']
						},
						{
							say: 'The loop carries on from exactly where it stopped, and later sees the flag.',
							send: [['f', 'l']],
							set: { f: 'pressed\ntrue' },
							light: ['l']
						}
					]
				}
			}
		]
	},
	{
		slug: 'embedded-system-design-nuvoton',
		title: 'Embedded System Design and Implement (Nuvoton 140)',
		group: GROUP,
		blurb:
			'Professional embedded C on the Nuvoton NUC140, a 32-bit Arm Cortex-M0: clocks, registers, GPIO, timers and interrupts.',
		topics: [
			{
				id: 'nuc140',
				title: 'Meet the NUC140',
				summary:
					'The NUC140 is a 32-bit Arm Cortex-M0 microcontroller, running at up to 50 MHz with 128 KB of flash and 16 KB of SRAM, and with USB and CAN built in. Unlike Arduino, nothing is hidden: you set up the clocks and peripherals yourself.',
				points: [
					['Tools', 'commonly Keil MDK to compile, and a Nu-Link adapter to flash and debug.'],
					['Board support package', "Nuvoton's BSP gives you startup code and drivers."],
					[
						'Clock tree',
						'choose a clock source, then enable the clock of each peripheral you use.'
					],
					['Protected registers', 'key system registers must be unlocked before writing them.']
				],
				tip: 'If a peripheral seems dead, check its clock first. A peripheral with no clock does nothing at all.',
				code: `int main(void) {
    SYS_UnlockReg();
    // set up clocks and pins here
    SYS_LockReg();

    while (1) {
        // your application
    }
}`,
				links: [
					[
						'NUC140 product family',
						'https://www.nuvoton.com/products/microcontrollers/arm-cortex-m0-mcus/nuc140-240-connectivity-series/nuc140lc1cn/'
					],
					['NUC100 series BSP', 'https://github.com/OpenNuvoton/NUC100BSP']
				],
				sketch: {
					kind: 'Boot sequence',
					alt: 'At reset, the startup code runs, the clocks are unlocked and configured, peripherals get enabled, and main loops forever.',
					h: 190,
					nodes: [
						{ id: 'r', label: 'Reset', x: 75, y: 48, w: 118, h: 56, fill: 'pink' },
						{ id: 's', label: 'Startup\ncode', x: 240, y: 48, w: 118, h: 56, fill: 'sky' },
						{ id: 'u', label: 'Unlock\nregisters', x: 405, y: 48, w: 118, h: 56, fill: 'yellow' },
						{ id: 'c', label: 'Set up\nclocks', x: 405, y: 150, w: 118, h: 56, fill: 'yellow' },
						{ id: 'l', label: 'Lock\nregisters', x: 240, y: 150, w: 118, h: 56, fill: 'yellow' },
						{ id: 'm', label: 'main loop', x: 75, y: 150, w: 118, h: 56, fill: 'mint' }
					],
					edges: [
						{ from: 'r', to: 's' },
						{ from: 's', to: 'u' },
						{ from: 'u', to: 'c' },
						{ from: 'c', to: 'l' },
						{ from: 'l', to: 'm' }
					],
					steps: [
						{
							say: 'Power on. The Cortex-M0 reads its first instructions from flash.',
							light: ['r']
						},
						{
							say: 'Startup code sets up memory and calls main().',
							send: [['r', 's']],
							light: ['s']
						},
						{
							say: 'Clock registers are protected, so unlock them first.',
							send: [['s', 'u']],
							light: ['u']
						},
						{
							say: "Pick a clock source, set the speed, and enable each peripheral's clock.",
							send: [['u', 'c']],
							light: ['c']
						},
						{
							say: 'Lock again, so stray code cannot change them.',
							send: [['c', 'l']],
							light: ['l']
						},
						{ say: 'Now the application runs.', send: [['l', 'm']], light: ['m'] }
					]
				}
			},
			{
				id: 'gpio',
				title: 'Registers and GPIO',
				summary:
					'Hardware is controlled through registers: special addresses where writing a bit changes something physical. A driver call such as GPIO_SetMode sets those bits for you, and PC12 is a macro that reads or writes one pin.',
				points: [
					['Memory-mapped I/O', 'peripherals appear as addresses, so C pointers can reach them.'],
					['Mode', 'each pin must be set as input, output and so on before use.'],
					['Bit masks', 'BIT12 selects one bit, so the other pins stay untouched.'],
					['Active low', 'on many boards an LED lights when the pin is 0, so check your schematic.']
				],
				tip: 'Keep the reference manual open. Every register bit is explained there.',
				code: `#include "NUC100Series.h"

int main(void) {
    GPIO_SetMode(PC, BIT12, GPIO_PMD_OUTPUT);

    while (1) {
        PC12 = 0;                 // LED on, if active low
        CLK_SysTickDelay(200000); // 200 ms
        PC12 = 1;
        CLK_SysTickDelay(200000);
    }
}`,
				sketch: {
					kind: 'Register diagram',
					alt: 'A line of C code writes a bit into a GPIO data register, which changes the voltage on pin PC12 and lights an LED.',
					h: 165,
					nodes: [
						{ id: 'c', label: 'PC12 = 0;', x: 72, y: 60, w: 124, h: 66, fill: 'sky' },
						{
							id: 'r',
							label: 'Data register\nbit 12 = 1',
							x: 245,
							y: 60,
							w: 134,
							h: 66,
							fill: 'yellow'
						},
						{ id: 'p', label: 'Pin PC12\n3.3 V', x: 415, y: 60, w: 110, h: 66, fill: 'pink' },
						{ id: 'l', label: 'LED off', x: 300, y: 140, w: 170, h: 40 }
					],
					edges: [
						{ from: 'c', to: 'r' },
						{ from: 'r', to: 'p' }
					],
					steps: [
						{ say: 'GPIO_SetMode first makes the pin an output.', light: ['p'] },
						{
							say: 'One line of C writes to a memory address, which is really a hardware register.',
							send: [['c', 'r']],
							set: { r: 'Data register\nbit 12 = 0' },
							light: ['r']
						},
						{
							say: 'The output driver pulls the physical pin down to 0 V.',
							send: [['r', 'p']],
							set: { r: 'Data register\nbit 12 = 0', p: 'Pin PC12\n0 V' }
						},
						{
							say: 'On an active-low LED, current can now flow, and it lights up.',
							send: [['p', 'l']],
							set: { r: 'Data register\nbit 12 = 0', p: 'Pin PC12\n0 V', l: 'LED on' },
							light: ['l']
						}
					]
				}
			},
			{
				id: 'timers',
				title: 'Timers and interrupts',
				summary:
					'Delay loops waste the processor. A hardware timer counts on its own and raises an interrupt when it reaches its target, so timing stays exact while the main loop does other work. The NVIC decides which interrupts run.',
				points: [
					['Timer clock', 'give the timer a clock source and enable it first.'],
					['Periodic mode', 'the timer fires again and again at a set rate.'],
					[
						'NVIC',
						'the Cortex-M interrupt controller, which enables interrupts and sets priorities.'
					],
					['Clear the flag', 'if you do not, the interrupt will fire again as soon as you return.']
				],
				tip: 'Every interrupt needs three things: the peripheral enabled, the NVIC enabled, and the flag cleared.',
				code: `void TMR0_IRQHandler(void) {
    TIMER_ClearIntFlag(TIMER0);
    PC12 ^= 1;                 // toggle the LED
}

// after setting up clocks
CLK_EnableModuleClock(TMR0_MODULE);
CLK_SetModuleClock(TMR0_MODULE, CLK_CLKSEL1_TMR0_S_HXT, 0);

TIMER_Open(TIMER0, TIMER_PERIODIC_MODE, 2);   // 2 Hz
TIMER_EnableInt(TIMER0);
NVIC_EnableIRQ(TMR0_IRQn);
TIMER_Start(TIMER0);`,
				sketch: {
					kind: 'Interrupt flow',
					alt: 'A timer counts up to its target and raises an interrupt. The NVIC stops the main code, the handler toggles an LED and clears the flag, and main resumes.',
					h: 190,
					nodes: [
						{ id: 't', label: 'TIMER0\ncount 0', x: 75, y: 50, w: 124, h: 66, fill: 'yellow' },
						{ id: 'n', label: 'NVIC', x: 240, y: 50, w: 104, h: 66, fill: 'sky' },
						{ id: 'h', label: 'TMR0_\nIRQHandler', x: 405, y: 50, w: 124, h: 66, fill: 'pink' },
						{ id: 'm', label: 'main() keeps working', x: 240, y: 150, w: 240, h: 54, fill: 'mint' }
					],
					edges: [
						{ from: 't', to: 'n' },
						{ from: 'n', to: 'h' },
						{ from: 'h', to: 'm', dashed: true }
					],
					steps: [
						{
							say: 'main() does its work while the timer counts by itself in hardware.',
							set: { t: 'TIMER0\ncounting' },
							light: ['m']
						},
						{
							say: 'The count reaches the target, and the timer sets its interrupt flag.',
							set: { t: 'TIMER0\ntarget hit' },
							send: [['t', 'n']],
							light: ['t']
						},
						{
							say: 'The NVIC pauses main() and jumps to the handler.',
							send: [['n', 'h']],
							down: ['m'],
							light: ['n']
						},
						{ say: 'The handler clears the flag and toggles the LED.', down: ['m'], light: ['h'] },
						{
							say: 'It returns, and main() carries on as if nothing happened.',
							send: [['h', 'm']],
							light: ['m']
						}
					]
				}
			}
		]
	},
	{
		slug: 'real-time-systems-raspberry-pi',
		title: 'Real-time Systems Engineering (Raspberry Pi)',
		group: GROUP,
		blurb:
			'Building systems where being late counts as being wrong: deadlines, scheduling, priority inversion, and real-time Linux on a Raspberry Pi.',
		topics: [
			{
				id: 'deadlines',
				title: 'Real-time means deadlines',
				summary:
					'Real-time does not mean fast. It means predictable: a result must arrive by its deadline, every time. A correct answer delivered too late can be a failure.',
				points: [
					[
						'Hard real-time',
						'a missed deadline is a system failure, as in airbags and flight control.'
					],
					['Firm real-time', 'a late result is worthless, but the system survives.'],
					['Soft real-time', 'lateness reduces quality, as in video calls.'],
					['Jitter', 'variation in timing. Often this matters more than the average speed.'],
					['WCET', 'worst-case execution time, the number that really counts.']
				],
				tip: 'Design for the worst case, not the average one.',
				table: {
					head: ['Type', 'Example', 'A missed deadline means'],
					rows: [
						['Hard', 'Airbag', 'Possible injury'],
						['Firm', 'Factory camera check', 'That reading is lost'],
						['Soft', 'Video call', 'A brief glitch']
					]
				},
				sketch: {
					kind: 'Timing diagram',
					alt: 'A crash is sensed and the airbag must fire within 20 milliseconds. A task finishing at 15 milliseconds succeeds, and one finishing at 25 fails.',
					h: 175,
					nodes: [
						{ id: 'e', label: 'Crash\ndetected', x: 70, y: 60, w: 112, h: 66, fill: 'pink' },
						{ id: 't', label: 'Task\nruns', x: 240, y: 60, w: 104, h: 66, fill: 'yellow' },
						{ id: 'd', label: 'Deadline\n20 ms', x: 410, y: 60, w: 112, h: 66, fill: 'mint' },
						{ id: 'r', label: 'Finished: ?', x: 240, y: 140, w: 220, h: 44 }
					],
					edges: [
						{ from: 'e', to: 't' },
						{ from: 't', to: 'd' }
					],
					steps: [
						{ say: 'A crash is detected, and the clock starts.', light: ['e'] },
						{
							say: 'The task finishes in 15 ms, before the deadline. Success.',
							send: [
								['e', 't'],
								['t', 'd']
							],
							set: { r: 'Finished at 15 ms: OK' },
							light: ['d']
						},
						{
							say: 'Next time another task delays it by 10 ms.',
							send: [['e', 't']],
							set: { r: 'Finished at 25 ms' },
							light: ['t']
						},
						{
							say: 'The answer is correct, but it is too late. In a hard real-time system that is a failure.',
							set: { r: 'Deadline missed: FAILED' },
							down: ['d']
						}
					]
				}
			},
			{
				id: 'scheduling',
				title: 'Scheduling and priority inversion',
				summary:
					'When several tasks share a processor, the scheduler picks who runs. With rate monotonic scheduling, the most frequent task gets the highest priority. Done carefully, you can prove that all deadlines will be met.',
				points: [
					['Preemption', 'a high-priority task can interrupt a lower one.'],
					['Rate monotonic', 'a shorter period gets a higher priority.'],
					[
						'Utilisation',
						'U is the sum of C/T for each task. For two tasks, RM guarantees success up to about 83%.'
					],
					[
						'Priority inversion',
						'a low task holding a lock blocks a high task, while a medium task runs.'
					],
					['Priority inheritance', 'the lock holder briefly borrows the high priority.']
				],
				tip: 'Keep locks short. A famous priority inversion reset the Mars Pathfinder lander in 1997.',
				code: `Task A: C = 3 ms, T = 10 ms
Task B: C = 6 ms, T = 20 ms

U = 3/10 + 6/20 = 0.6
0.6 ≤ 0.83, so all deadlines are met`,
				sketch: {
					kind: 'Scheduling diagram',
					alt: 'Priority inversion: a low-priority task holds a lock needed by a high-priority task, a medium task delays it, and priority inheritance fixes it.',
					h: 190,
					nodes: [
						{ id: 'h', label: 'High\nready', x: 75, y: 40, w: 118, h: 58, fill: 'pink' },
						{ id: 'm', label: 'Medium\nidle', x: 75, y: 140, w: 118, h: 58, fill: 'yellow' },
						{ id: 'lk', label: 'Lock', x: 245, y: 90, w: 96, h: 60, fill: 'sky' },
						{ id: 'l', label: 'Low\nholds lock', x: 410, y: 90, w: 118, h: 66, fill: 'mint' }
					],
					edges: [
						{ from: 'l', to: 'lk' },
						{ from: 'h', to: 'lk', dashed: true }
					],
					steps: [
						{ say: 'The Low task takes the lock.', send: [['l', 'lk']], light: ['l'] },
						{
							say: 'High needs the lock, so it must wait for Low. A short wait is acceptable.',
							send: [['h', 'lk']],
							set: { h: 'High\nblocked' },
							light: ['h']
						},
						{
							say: 'Medium wakes up and preempts Low, because it has a higher priority.',
							set: { h: 'High\nblocked', m: 'Medium\nrunning', l: 'Low\npaused' },
							light: ['m'],
							down: ['l']
						},
						{
							say: 'Now High is stuck behind Medium, a task it should beat. That is priority inversion.',
							set: { h: 'High\nstill blocked', m: 'Medium\nrunning', l: 'Low\npaused' },
							down: ['h', 'l']
						},
						{
							say: "Fix: Low inherits High's priority, so Medium cannot preempt it, and the lock is freed quickly.",
							set: { h: 'High\ngets the lock', l: 'Low\nboosted' },
							send: [['lk', 'h']],
							light: ['l']
						}
					]
				}
			},
			{
				id: 'raspberry-pi',
				title: 'Real-time on a Raspberry Pi',
				summary:
					'A Raspberry Pi runs Linux, which is built for fairness and throughput, not deadlines. Normal Linux can delay a task unpredictably. You can improve this a lot, but for hard deadlines a microcontroller is still the safer choice.',
				points: [
					[
						'SCHED_FIFO',
						'a real-time policy. Your task runs until it blocks or something of higher priority needs the CPU.'
					],
					[
						'PREEMPT_RT',
						'makes the kernel far more preemptible. It became part of mainline Linux in version 6.12.'
					],
					['Measure it', 'cyclictest measures your real worst-case delay.'],
					['Lock memory', 'mlockall stops page faults causing surprise delays.'],
					[
						'Hybrid',
						'let a Pi Pico or Arduino handle the strict timing, and the Pi do the heavy thinking.'
					]
				],
				tip: 'Never trust a real-time claim until you have measured it under full load.',
				code: `# run with a real-time priority
sudo chrt -f 80 ./control_loop

# measure worst-case latency
sudo cyclictest --mlockall --priority=90 --interval=1000`,
				sketch: {
					kind: 'Timing diagram',
					alt: 'A 1 millisecond control loop on a Raspberry Pi: under normal scheduling, background load adds large delays. With real-time settings, the delay stays small.',
					h: 190,
					nodes: [
						{
							id: 'l',
							label: 'Control loop\nevery 1 ms',
							x: 90,
							y: 50,
							w: 150,
							h: 66,
							fill: 'sky'
						},
						{ id: 'k', label: 'Linux\nnormal', x: 280, y: 50, w: 110, h: 66, fill: 'yellow' },
						{ id: 'o', label: 'Motor', x: 420, y: 50, w: 92, h: 66, fill: 'mint' },
						{ id: 'b', label: 'Background job', x: 280, y: 150, w: 170, h: 46, fill: 'pink' }
					],
					edges: [
						{ from: 'l', to: 'k' },
						{ from: 'k', to: 'o' },
						{ from: 'b', to: 'k' }
					],
					steps: [
						{
							say: 'On a quiet Pi, the 1 ms loop looks perfect. This is misleading.',
							hide: ['b'],
							send: [
								['l', 'k'],
								['k', 'o']
							]
						},
						{
							say: 'A background job starts, and the scheduler shares the CPU fairly.',
							send: [['b', 'k']],
							light: ['b']
						},
						{
							say: 'The loop gets delayed by several milliseconds, and the motor stutters.',
							set: { k: 'Linux\ndelayed!' },
							down: ['o']
						},
						{
							say: 'Give the loop SCHED_FIFO priority, on a PREEMPT_RT kernel.',
							set: { k: 'Linux\nPREEMPT_RT' },
							light: ['k']
						},
						{
							say: 'Now the loop preempts the job, and timing stays tight even under load.',
							set: { k: 'Linux\nPREEMPT_RT' },
							send: [
								['l', 'k'],
								['k', 'o']
							],
							light: ['o']
						}
					]
				}
			}
		]
	}
];
