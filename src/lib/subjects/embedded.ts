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
				links: [
					['Blink example', 'https://docs.arduino.cc/built-in-examples/basics/Blink/'],
					['Arduino Uno Rev3', 'https://docs.arduino.cc/hardware/uno-rev3/']
				],
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
							title: 'Set the pin as output',
							say: 'setup() configures pin 13 as an output, once.',
							detail:
								'Pin 13 is really port B, bit 5 of the ATmega328P, and pinMode sets that bit in the DDRB direction register. Until then the pin is an input with almost no drive, so it could not light anything. setup() runs only once because the hidden main() calls it before entering its endless loop.',
							light: ['u'],
							set: { u: 'Arduino\nsetup()' }
						},
						{
							title: 'Drive the pin HIGH',
							say: 'loop() sets the pin HIGH, so 5 V appears on it.',
							detail:
								'digitalWrite sets bit 5 in the PORTB register, and the output stage connects the pin to the 5 V supply. The call takes a few microseconds, because it first looks up which port and bit belong to pin 13. The change on the pin itself is almost instant.',
							send: [['u', 'p']],
							set: { p: 'Pin 13\nHIGH' },
							light: ['p']
						},
						{
							title: 'Current lights the LED',
							say: 'Current flows through the resistor, and the LED lights up.',
							detail:
								"A red LED drops about 2 V, which leaves roughly 3 V across the 220 Ω resistor. By Ohm's law that is about 14 mA, bright enough to see and well under the 40 mA absolute limit of the pin. Without the resistor the current would only be limited by the pin and the LED, and one of them would suffer.",
							send: [
								['p', 'r'],
								['r', 'l']
							],
							set: { p: 'Pin 13\nHIGH', l: 'LED\non!' },
							light: ['l']
						},
						{
							title: 'Wait, then go LOW',
							say: 'After 500 ms the pin goes LOW and the LED turns off.',
							detail:
								'delay(500) just spins, watching the millisecond counter that Timer0 keeps, so nothing else in your sketch runs meanwhile. Then digitalWrite clears the PORTB bit and connects the pin to ground. With 0 V on both sides of the LED, no current flows.',
							send: [['u', 'p']],
							light: ['p']
						},
						{
							title: 'Start the loop again',
							say: 'loop() ends and immediately starts again, forever.',
							detail:
								'The hidden main() calls loop() inside a for loop that never exits, because there is no operating system to return to. One pass is 500 ms on plus 500 ms off, so the LED blinks once per second. A microcontroller simply keeps executing until the power is removed.',
							light: ['u']
						}
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
				links: [
					[
						'analogRead()',
						'https://docs.arduino.cc/language-reference/en/functions/analog-io/analogRead/'
					],
					['Basics of PWM', 'https://docs.arduino.cc/learn/microcontrollers/analog-output/']
				],
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
							title: 'Set the knob halfway',
							say: 'Turn the knob halfway. The voltage on A0 is now 2.5 V.',
							detail:
								'A potentiometer is a voltage divider: its ends go to 5 V and GND, and the middle wiper slides along the track between them. Halfway along, the wiper sits at half the supply, 2.5 V. The total resistance, often 10 kΩ, hardly changes the reading.',
							set: { k: 'Knob\n2.5 V' },
							light: ['k']
						},
						{
							title: 'Convert with the ADC',
							say: 'The ADC turns that into a number: about 511.',
							detail:
								'The ADC tries one bit at a time, comparing the input against a reference until all 10 bits are found. Each step is 5 V / 1023, about 4.9 mV, so 2.5 V lands near 511. One analogRead takes about 100 µs on the Uno.',
							send: [['k', 'a']],
							set: { k: 'Knob\n2.5 V', a: 'ADC\n511' }
						},
						{
							title: 'Scale with map()',
							say: 'map() scales it to the PWM range: about 127.',
							detail:
								'map() works out (511 × 255) / 1023 using whole numbers only, which gives 127. It drops the fraction instead of rounding, so the result can be one lower than you expect. For this exact case, dividing by 4 gives the same answer.',
							send: [['a', 'c']],
							set: { k: 'Knob\n2.5 V', a: 'ADC\n511', c: 'map()\n127' }
						},
						{
							title: 'Fake it with PWM',
							say: 'The pin is on for half of each cycle, so the LED looks half as bright.',
							detail:
								'analogWrite(9, 127) tells Timer1 to keep pin 9 HIGH for 127 out of every 255 counts. The pin switches about 490 times per second, far too fast for your eye to see flicker, so you see the average brightness. The pin is never at 2.5 V; it is always either 5 V or 0 V.',
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
				links: [
					[
						'attachInterrupt()',
						'https://docs.arduino.cc/language-reference/en/functions/external-interrupts/attachInterrupt/'
					],
					['Debounce example', 'https://docs.arduino.cc/built-in-examples/digital/Debounce/']
				],
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
							title: 'A busy main loop',
							say: 'The main loop is busy with a slow job, like updating a display.',
							detail:
								'If loop() checks the button with digitalRead, it only looks once per pass. When the display update takes 50 ms and a quick tap lasts 20 ms, the press can come and go between two checks. Polling is only as quick as the slowest pass through the loop.',
							light: ['l']
						},
						{
							title: 'The interrupt fires',
							say: 'You press the button. The hardware pauses the loop at once.',
							detail:
								'INPUT_PULLUP holds pin 2 at 5 V, and the press pulls it to 0 V, which is the FALLING edge that INT0 watches for. The CPU finishes its current instruction, saves the return address on the stack and jumps to your handler. On a 16 MHz Uno this takes only a few microseconds.',
							send: [['b', 'i']],
							down: ['l'],
							light: ['i']
						},
						{
							title: 'Set a flag and leave',
							say: 'The ISR sets a flag and returns, in a few microseconds.',
							detail:
								'Other interrupts are blocked while an ISR runs, so millis() stops counting and incoming serial bytes can be lost if it takes long. Writing one volatile variable is about as short as it gets. Because a bouncing contact can fire the ISR several times, real code ignores repeats within about 50 ms.',
							send: [['i', 'f']],
							set: { f: 'pressed\ntrue' },
							down: ['l']
						},
						{
							title: 'Resume and handle it',
							say: 'The loop carries on from exactly where it stopped, and later sees the flag.',
							detail:
								'The RETI instruction pops the return address and turns interrupts back on, so the slow job continues mid-step. On its next pass loop() sees pressed is true, clears it and does the real work there. A bool is one byte on this 8-bit chip, so reading it is safe, but a long or int shared with an ISR needs noInterrupts() around the read.',
							send: [['f', 'l']],
							set: { f: 'pressed\ntrue' },
							light: ['l']
						}
					]
				}
			},
			{
				id: 'serial',
				title: 'Serial: talking over UART',
				summary:
					'A UART sends bytes one bit at a time over two wires, TX and RX, with no shared clock. Both ends agree on the speed in advance. On the Uno, Serial uses pins 0 and 1, and a second chip turns that into USB for your computer.',
				points: [
					[
						'Baud rate',
						'bits per second. Both ends must match, or you read garbage. 9600 and 115200 are common.'
					],
					['Frame', 'by default a start bit, 8 data bits and one stop bit, called 8N1.'],
					[
						'Cross the wires',
						'TX of one board goes to RX of the other, and the grounds must be joined.'
					],
					[
						'Pins 0 and 1',
						'they are shared with the USB link, so keep them free while you upload a sketch.'
					]
				],
				tip: 'Serial.println is the cheapest debugger you have. Print the value before you guess at it.',
				code: `void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);                // 8N1 by default
}

void loop() {
  if (Serial.available() > 0) {      // a byte arrived on RX
    char c = Serial.read();
    if (c == '1') digitalWrite(13, HIGH);
    if (c == '0') digitalWrite(13, LOW);
  }
  Serial.println(analogRead(A0));    // goes out on TX
  delay(200);
}`,
				links: [
					[
						'Serial reference',
						'https://docs.arduino.cc/language-reference/en/functions/communication/serial/'
					],
					['UART guide', 'https://docs.arduino.cc/learn/communication/uart/']
				],
				sketch: {
					kind: 'Data flow diagram',
					alt: 'The ATmega328P sends a number out of its TX pin, the USB chip forwards it, and the Serial Monitor on the computer prints it. With the wrong baud rate it prints garbage.',
					h: 185,
					nodes: [
						{ id: 'pc', label: 'Serial\nMonitor', x: 62, y: 55, w: 104, h: 66, fill: 'sky' },
						{
							id: 'usb',
							label: 'USB chip\nATmega16U2',
							x: 205,
							y: 55,
							w: 120,
							h: 66,
							fill: 'yellow'
						},
						{ id: 'mcu', label: 'ATmega328P\nidle', x: 395, y: 55, w: 140, h: 66, fill: 'mint' },
						{ id: 'f', label: 'TX line idle: HIGH', x: 240, y: 150, w: 300, h: 46 }
					],
					edges: [
						{ from: 'mcu', to: 'usb', label: 'TX pin 1' },
						{ from: 'usb', to: 'pc', label: 'USB' }
					],
					steps: [
						{
							title: 'Agree on the speed',
							say: 'Serial.begin(9600) sets the speed. Both ends must use the same baud rate.',
							detail:
								'There is no clock wire, so the receiver times every bit with its own clock and samples near the middle of each one. At 9600 baud a bit lasts about 104 µs. If the two speeds differ by more than a few percent, the samples drift into the wrong bits.',
							set: { mcu: 'ATmega328P\n9600 baud', pc: 'Serial\nMonitor\n9600' },
							light: ['mcu', 'pc']
						},
						{
							title: 'Fill the send buffer',
							say: 'Serial.println(511) hands the characters to the UART.',
							detail:
								"println turns the number into the ASCII characters '5', '1' and '1', then adds a carriage return and a line feed, five bytes in all. They go into a 64-byte transmit buffer, and an interrupt feeds the UART one byte at a time. Your code only waits if that buffer is full.",
							set: { mcu: 'ATmega328P\nsends "511"' },
							light: ['mcu']
						},
						{
							title: 'Frame each byte',
							say: 'Each byte leaves pin 1 as a start bit, 8 data bits and a stop bit.',
							detail:
								'The line rests HIGH, so a LOW start bit tells the receiver a byte is beginning. The 8 data bits follow, least significant first, then a HIGH stop bit. That is 10 bits per byte, so 9600 baud carries about 960 bytes per second.',
							send: [['mcu', 'usb']],
							set: { mcu: 'ATmega328P\nsends "511"', f: 'start | 8 data bits | stop' },
							light: ['f']
						},
						{
							title: 'Forward over USB',
							say: 'The USB chip passes the bytes on, and the Serial Monitor prints 511.',
							detail:
								'The ATmega16U2 runs firmware that makes the board look like a serial port to your computer, such as COM3 on Windows or /dev/ttyACM0 on Linux. It collects the UART bytes and sends them in USB packets. Opening the port also resets the Uno, which is why your sketch restarts when the Monitor opens.',
							send: [['usb', 'pc']],
							set: { pc: 'Serial\nMonitor\n511' },
							light: ['pc']
						},
						{
							title: 'Wrong baud rate',
							say: 'Set the Monitor to 115200 by mistake, and the same bits come out as garbage.',
							detail:
								'At 115200 baud the receiver expects each bit to last 8.7 µs, but the real ones last 104 µs, about 12 times longer. It mistakes one long bit for many short ones and builds the wrong bytes from them. Nothing is broken; set the Monitor speed to match Serial.begin().',
							send: [
								['mcu', 'usb'],
								['usb', 'pc']
							],
							set: { pc: 'Serial\nMonitor\n?x#' },
							down: ['pc']
						}
					]
				}
			},
			{
				id: 'i2c-spi',
				title: 'I2C and SPI buses',
				summary:
					'Sensors, clocks and displays share a bus instead of each taking a pin per value. I2C needs only two wires and picks a device by its address. SPI uses more wires but runs much faster, and picks a device by pulling its chip select pin LOW.',
				points: [
					['I2C on the Uno', 'SDA is A4 and SCL is A5. The Wire library drives them.'],
					['Address', 'each I2C device has a 7-bit address, so many can share the same two wires.'],
					[
						'Pull-ups',
						'I2C devices only pull the lines low, so resistors must pull them high. Many breakout boards include them.'
					],
					[
						'SPI on the Uno',
						'MOSI is pin 11, MISO pin 12 and SCK pin 13, plus one chip select pin per device, often pin 10.'
					],
					['Chip select', 'only the device whose CS pin is LOW listens. The others ignore the bus.']
				],
				tip: 'Run an I2C scanner sketch first. If nothing answers at the address, check the wiring before the code.',
				table: {
					head: ['', 'I2C', 'SPI'],
					rows: [
						['Wires', 'SDA and SCL', 'MOSI, MISO, SCK, and a CS per device'],
						['Picks a device by', '7-bit address', 'chip select pin'],
						['Typical speed', '100 or 400 kHz', 'several MHz'],
						['Uno pins', 'A4, A5', '11, 12, 13, and 10 for CS']
					]
				},
				code: `#include <Wire.h>

void setup() {
  Wire.begin();                   // join the bus as controller
  Wire.beginTransmission(0x68);   // an MPU-6050 motion sensor
  Wire.write(0x6B);               // its power register
  Wire.write(0);                  // 0 = wake up
  Wire.endTransmission();
}

void loop() {}`,
				links: [
					['I2C with the Wire library', 'https://docs.arduino.cc/learn/communication/wire/'],
					['SPI guide', 'https://docs.arduino.cc/learn/communication/spi/']
				],
				sketch: {
					kind: 'Bus diagram',
					alt: 'An Arduino Uno shares one I2C bus with three devices at different addresses. It calls address 0x68 and only that device answers. With SPI, a chip select line picks the device instead.',
					h: 200,
					nodes: [
						{ id: 'uno', label: 'Uno\ncontroller', x: 70, y: 100, w: 110, h: 66, fill: 'sky' },
						{ id: 'bus', label: 'SDA + SCL\nidle', x: 235, y: 100, w: 110, h: 60, fill: 'yellow' },
						{ id: 's1', label: 'Temp\n0x48', x: 400, y: 35, w: 120, h: 52, fill: 'mint' },
						{ id: 's2', label: 'Clock\n0x68', x: 400, y: 100, w: 120, h: 52, fill: 'mint' },
						{ id: 's3', label: 'Display\n0x3C', x: 400, y: 165, w: 120, h: 52, fill: 'mint' }
					],
					edges: [
						{ from: 'uno', to: 'bus', plain: true },
						{ from: 'bus', to: 's1', plain: true },
						{ from: 'bus', to: 's2', plain: true },
						{ from: 'bus', to: 's3', plain: true }
					],
					steps: [
						{
							title: 'One shared bus',
							say: 'Three devices share the same two wires, SDA and SCL.',
							detail:
								'SDA carries the data and SCL carries the clock. Devices can only pull a line LOW, and pull-up resistors, often 4.7 kΩ, bring it back HIGH. So two devices can never fight by driving opposite levels, and any number can share the wires.',
							light: ['bus']
						},
						{
							title: 'Send the address',
							say: 'The Uno starts a message with address 0x68.',
							detail:
								'The Uno signals a START by pulling SDA LOW while SCL is still HIGH. It then clocks out the 7-bit address 0x68 and one more bit saying read or write. At 100 kHz each bit takes 10 µs.',
							send: [['uno', 'bus']],
							set: { bus: 'SDA + SCL\n0x68?' },
							light: ['uno']
						},
						{
							title: 'Only 0x68 answers',
							say: 'Every device hears the address, but only the clock at 0x68 answers.',
							detail:
								'On the ninth clock pulse the matching device holds SDA LOW, which is called an ACK. The others see a different address and stay quiet until the next START. If nobody answers, SDA stays HIGH and Wire.endTransmission() returns 2.',
							send: [['bus', 's2']],
							set: { bus: 'SDA + SCL\n0x68?' },
							light: ['s2'],
							down: ['s1', 's3']
						},
						{
							title: 'Read the reply',
							say: 'The clock sends its data back over the same two wires.',
							detail:
								'For a read the Uno still drives SCL, and the clock chip puts its bits on SDA in time with it. The Uno ACKs each byte except the last, then sends a STOP. Wire.requestFrom(0x68, 7) could read seven registers holding seconds through to the year.',
							send: [
								['s2', 'bus'],
								['bus', 'uno']
							],
							set: { bus: 'SDA + SCL\ndata' },
							light: ['uno']
						},
						{
							title: 'SPI uses chip select',
							say: 'SPI does the same job with a chip select line per device. Pull one LOW, and only that one listens.',
							detail:
								'SPI has separate wires for data out (MOSI) and data in (MISO), so it sends and receives at once, at up to 8 MHz on the Uno. There are no addresses and no ACK, so a missing or miswired device fails silently. The cost is one extra chip select pin for every device.',
							send: [
								['uno', 'bus'],
								['bus', 's3']
							],
							set: {
								bus: 'SPI\nCS 3 LOW',
								s1: 'Temp\nCS HIGH',
								s2: 'Clock\nCS HIGH',
								s3: 'Display\nCS LOW'
							},
							light: ['s3']
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
							title: 'Reset and fetch',
							say: 'Power on. The Cortex-M0 reads its first instructions from flash.',
							detail:
								'After reset the Cortex-M0 reads two words from the vector table at address 0: the starting stack pointer and the address of the reset handler. It loads the stack pointer and jumps to that handler. The chip is held in reset until the supply voltage is stable.',
							light: ['r']
						},
						{
							title: 'Startup code runs',
							say: 'Startup code sets up memory and calls main().',
							detail:
								'The startup file, written in assembly, copies the starting values of global variables from flash into the 16 KB of SRAM. It fills the remaining globals with zero, because C promises that. Only then does it call main().',
							send: [['r', 's']],
							light: ['s']
						},
						{
							title: 'Unlock the registers',
							say: 'Clock registers are protected, so unlock them first.',
							detail:
								'SYS_UnlockReg() writes the magic sequence 0x59, 0x16, 0x88 to a register-protection register. Until that exact sequence arrives, writes to protected clock and reset registers are ignored. A random bad pointer is very unlikely to produce it by chance.',
							send: [['s', 'u']],
							light: ['u']
						},
						{
							title: 'Configure the clocks',
							say: "Pick a clock source, set the speed, and enable each peripheral's clock.",
							detail:
								'A common choice is the 12 MHz external crystal, multiplied by the PLL up to the 50 MHz maximum. Each peripheral clock is off after reset to save power, so CLK_EnableModuleClock sets its enable bit. A peripheral whose bit is still 0 ignores you completely.',
							send: [['u', 'c']],
							light: ['c']
						},
						{
							title: 'Lock them again',
							say: 'Lock again, so stray code cannot change them.',
							detail:
								'SYS_LockReg() writes to the protection register again, which turns protection back on. A stray write from a bug can now no longer change the clock speed or trigger a reset. Keep the unlocked window as short as possible.',
							send: [['c', 'l']],
							light: ['l']
						},
						{
							title: 'Run the application',
							say: 'Now the application runs.',
							detail:
								'main() ends in while (1), because there is no operating system to return to. From here on, everything happens inside that loop or in interrupt handlers. If main() ever returned, the behaviour would depend on the startup code, which is why it never should.',
							send: [['l', 'm']],
							light: ['m']
						}
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
				links: [
					[
						'BSP GPIO sample',
						'https://github.com/OpenNuvoton/NUC100BSP/tree/master/SampleCode/StdDriver/GPIO_OutputInput'
					],
					[
						'Memory-mapped I/O',
						'https://en.wikipedia.org/wiki/Memory-mapped_I/O_and_port-mapped_I/O'
					]
				],
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
						{
							title: 'Make the pin an output',
							say: 'GPIO_SetMode first makes the pin an output.',
							detail:
								'Each pin gets two bits in its port mode register, which choose input, push-pull output, open-drain or quasi-bidirectional. GPIO_SetMode writes 01, output, into the two bits for pin 12 of port C. The other pins in the register keep their modes.',
							light: ['p']
						},
						{
							title: 'Write the register',
							say: 'One line of C writes to a memory address, which is really a hardware register.',
							detail:
								"PC12 is a macro for an address that belongs to just that one pin, so the compiler emits a single store instruction. Writing 0 there clears bit 12 of port C's output and leaves the other 15 pins alone. To the CPU it is an ordinary memory write; the hardware does the rest.",
							send: [['c', 'r']],
							set: { r: 'Data register\nbit 12 = 0' },
							light: ['r']
						},
						{
							title: 'Pin goes to 0 V',
							say: 'The output driver pulls the physical pin down to 0 V.',
							detail:
								'The output stage has a transistor to the supply and one to ground. A 0 in the data bit switches on the one to ground, so the pin is pulled to 0 V. At 50 MHz this happens within a few clock cycles, each only 20 ns.',
							send: [['r', 'p']],
							set: { r: 'Data register\nbit 12 = 0', p: 'Pin PC12\n0 V' }
						},
						{
							title: 'Active-low LED lights',
							say: 'On an active-low LED, current can now flow, and it lights up.',
							detail:
								'On this board the LED runs from 3.3 V through a resistor into the pin, so it lights when the pin is LOW and current flows into the chip. Writing 1 turns it off again. That is why the code comments say "LED on, if active low"; always check the schematic.',
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
				links: [
					[
						'BSP periodic timer sample',
						'https://github.com/OpenNuvoton/NUC100BSP/tree/master/SampleCode/StdDriver/TIMER_PeriodicINT'
					],
					[
						'CMSIS NVIC functions',
						'https://arm-software.github.io/CMSIS_5/Core/html/group__NVIC__gr.html'
					]
				],
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
							title: 'Count in hardware',
							say: 'main() does its work while the timer counts by itself in hardware.',
							detail:
								'TIMER0 is clocked from the 12 MHz crystal and has a prescaler and a 24-bit compare register. TIMER_Open works out values so the target is reached twice a second. The counting uses no CPU time at all.',
							set: { t: 'TIMER0\ncounting' },
							light: ['m']
						},
						{
							title: 'Hit the target',
							say: 'The count reaches the target, and the timer sets its interrupt flag.',
							detail:
								'When the counter equals the compare value, the timer sets its interrupt flag. In periodic mode it restarts from 0 at once, so the next period starts exactly on time. The flag only becomes an interrupt request because TIMER_EnableInt was called.',
							set: { t: 'TIMER0\ntarget hit' },
							send: [['t', 'n']],
							light: ['t']
						},
						{
							title: 'NVIC switches tasks',
							say: 'The NVIC pauses main() and jumps to the handler.',
							detail:
								'The NVIC checks that TMR0 is enabled and outranks whatever is running. The Cortex-M0 then saves eight registers on the stack by itself and fetches TMR0_IRQHandler from the vector table. This takes 16 clock cycles, about 0.3 µs at 50 MHz.',
							send: [['n', 'h']],
							down: ['m'],
							light: ['n']
						},
						{
							title: 'Clear and toggle',
							say: 'The handler clears the flag and toggles the LED.',
							detail:
								'If the flag is not cleared, the request is still there when the handler returns, so it runs again straight away and main() never gets a turn. PC12 ^= 1 flips the LED. At 2 interrupts per second the LED is on for 0.5 s and off for 0.5 s.',
							down: ['m'],
							light: ['h']
						},
						{
							title: 'Return to main()',
							say: 'It returns, and main() carries on as if nothing happened.',
							detail:
								'On return the core recognises a special value in the link register and restores the eight saved registers. main() continues at the next instruction with no idea it was paused. Any variable shared between the handler and main() should be volatile so the compiler reads it fresh.',
							send: [['h', 'm']],
							light: ['m']
						}
					]
				}
			},
			{
				id: 'uart',
				title: 'UART and printf',
				summary:
					'Before you can debug a board, you need to see what it is doing. Route UART0 to a USB-to-serial adapter, and every printf in your code appears in a terminal on your PC. Getting there takes a clock, a pin setting and a baud rate.',
				points: [
					[
						'Multi-function pins',
						'most pins can do several jobs. SYS->GPB_MFP gives PB0 and PB1 to UART0 instead of GPIO.'
					],
					[
						'Clock first',
						'enable the UART0 module clock and pick its source, like any peripheral.'
					],
					['UART_Open', 'sets the baud rate and an 8N1 frame in one call.'],
					['printf', "the BSP's retarget code sends each character to UART0, its debug port."]
				],
				tip: 'Garbage on screen means a baud rate or clock mismatch. Silence usually means the pin function was never set.',
				code: `SYS_UnlockReg();
CLK_EnableModuleClock(UART0_MODULE);
CLK_SetModuleClock(UART0_MODULE, CLK_CLKSEL1_UART_S_HXT, CLK_CLKDIV_UART(1));

// hand PB0 and PB1 to UART0 instead of GPIO
SYS->GPB_MFP &= ~(SYS_GPB_MFP_PB0_Msk | SYS_GPB_MFP_PB1_Msk);
SYS->GPB_MFP |= SYS_GPB_MFP_PB0_UART0_RXD | SYS_GPB_MFP_PB1_UART0_TXD;
SYS_LockReg();

UART_Open(UART0, 115200);
printf("Hello from the NUC140\\n");`,
				links: [
					[
						'BSP UART sample',
						'https://github.com/OpenNuvoton/NUC100BSP/tree/master/SampleCode/StdDriver/UART_TxRx_Function'
					],
					['UART', 'https://en.wikipedia.org/wiki/Universal_asynchronous_receiver-transmitter']
				],
				sketch: {
					kind: 'Data flow diagram',
					alt: 'printf hands characters to UART0, which drives pin PB1, which reaches a terminal on the PC. It only works once the UART has a clock and the pin is switched to its UART function.',
					h: 185,
					nodes: [
						{ id: 'c', label: 'printf()', x: 62, y: 50, w: 104, h: 56, fill: 'sky' },
						{ id: 'u', label: 'UART0\nno clock', x: 200, y: 50, w: 116, h: 66, fill: 'yellow' },
						{ id: 'p', label: 'PB1\nGPIO', x: 340, y: 50, w: 96, h: 66, fill: 'pink' },
						{ id: 'pc', label: 'PC terminal', x: 340, y: 150, w: 150, h: 46, fill: 'mint' }
					],
					edges: [
						{ from: 'c', to: 'u' },
						{ from: 'u', to: 'p' },
						{ from: 'p', to: 'pc' }
					],
					steps: [
						{
							title: 'No clock, no output',
							say: 'You call printf(), but nothing appears. UART0 has no clock yet.',
							detail:
								'After reset every peripheral clock is off, to save power. Without a clock UART0 cannot shift any bits out, so the characters from printf go nowhere. There is no error message either, which makes this easy to miss.',
							send: [['c', 'u']],
							down: ['u']
						},
						{
							title: 'Clock and baud rate',
							say: 'Enable the UART0 clock and open it at 115200 baud.',
							detail:
								'The code feeds UART0 from the 12 MHz crystal, and UART_Open picks a divider for 115200 baud. 12 MHz divided by 104 is about 115,385, only 0.16% off, which a receiver easily tolerates. A UART fed from an inaccurate clock is the usual cause of garbage text.',
							set: { u: 'UART0\n115200' },
							light: ['u']
						},
						{
							title: 'Pin is still GPIO',
							say: 'Still silence. PB1 is working as a plain GPIO pin.',
							detail:
								"After reset PB1 is a plain GPIO pin, so UART0's transmit signal is not connected to anything. The UART thinks it is sending normally and sets no error flag. That is why silence usually points at the pin function, not the code.",
							send: [['u', 'p']],
							set: { u: 'UART0\n115200' },
							down: ['p']
						},
						{
							title: 'Switch the pin function',
							say: 'Set the multi-function register, and PB1 becomes UART0 TXD.',
							detail:
								'The code first clears the PB0 and PB1 fields in SYS->GPB_MFP, then sets them to UART0 RXD and TXD. Clearing first stops leftover bits from selecting some other function. PB0 becomes the receive pin at the same time, so the board can read input too.',
							set: { u: 'UART0\n115200', p: 'PB1\nUART0 TXD' },
							light: ['p']
						},
						{
							title: 'Text reaches the PC',
							say: 'Now each character leaves the pin and shows up on your PC.',
							detail:
								"The BSP retargets printf so each character goes into UART0's transmit FIFO and out on PB1. A USB-to-serial adapter turns the bits into USB for the PC terminal, which must also be set to 115200 8N1. Each character takes about 87 µs on the wire.",
							send: [
								['c', 'u'],
								['u', 'p'],
								['p', 'pc']
							],
							set: { u: 'UART0\n115200', p: 'PB1\nUART0 TXD', pc: 'Hello from\nthe NUC140' },
							light: ['pc']
						}
					]
				}
			},
			{
				id: 'watchdog',
				title: 'The watchdog timer',
				summary:
					'Embedded code can hang, and nobody is there to press reset. A watchdog is a timer that resets the chip unless your code reloads it in time. A healthy loop keeps reloading it, and a stuck one gets restarted.',
				points: [
					[
						'Kick',
						'reloading the counter with WDT_RESET_COUNTER(). The control register is write-protected, so unlock first.'
					],
					[
						'Timeout',
						'set in powers of two of the WDT clock. With the 10 kHz internal clock, 2^14 ticks is about 1.6 s.'
					],
					['Reset or interrupt', 'WDT_Open chooses whether a timeout resets the chip.'],
					[
						'Reset flag',
						'after start-up, WDT_GET_RESET_FLAG() tells you the last reset came from the watchdog.'
					]
				],
				tip: 'Kick only after the whole loop has done its work. Kicking from a timer interrupt keeps a frozen program alive.',
				skip: 'Without a watchdog, one wait for a sensor that never answers freezes the device until someone pulls the plug.',
				code: `SYS_UnlockReg();
CLK_EnableXtalRC(CLK_PWRCON_OSC10K_EN_Msk);          // 10 kHz clock
CLK_WaitClockReady(CLK_CLKSTATUS_OSC10K_STB_Msk);
CLK_EnableModuleClock(WDT_MODULE);
CLK_SetModuleClock(WDT_MODULE, CLK_CLKSEL1_WDT_S_LIRC, 0);
WDT_Open(WDT_TIMEOUT_2POW14, WDT_RESET_DELAY_1026CLK, TRUE, FALSE);
SYS_LockReg();

while (1) {
    do_the_work();
    SYS_UnlockReg();
    WDT_RESET_COUNTER();   // all done: kick it
    SYS_LockReg();
}`,
				links: [
					[
						'BSP watchdog reset sample',
						'https://github.com/OpenNuvoton/NUC100BSP/tree/master/SampleCode/StdDriver/WDT_TimeoutReset'
					],
					['Watchdog timer', 'https://en.wikipedia.org/wiki/Watchdog_timer']
				],
				sketch: {
					kind: 'Failure scenario',
					alt: 'The main loop kicks the watchdog on every pass. When the loop gets stuck waiting for a sensor, the kicks stop, the watchdog runs out and resets the chip.',
					h: 185,
					nodes: [
						{ id: 'loop', label: 'main loop\nworking', x: 75, y: 50, w: 130, h: 66, fill: 'sky' },
						{
							id: 'w',
							label: 'Watchdog\n1.6 s left',
							x: 260,
							y: 50,
							w: 130,
							h: 66,
							fill: 'yellow'
						},
						{ id: 'r', label: 'Reset', x: 420, y: 50, w: 90, h: 66, fill: 'pink' },
						{ id: 's', label: 'Sensor', x: 75, y: 150, w: 110, h: 46, fill: 'mint' }
					],
					edges: [
						{ from: 'loop', to: 'w', label: 'kick' },
						{ from: 'w', to: 'r', dashed: true },
						{ from: 'loop', to: 's' }
					],
					steps: [
						{
							title: 'Counting down',
							say: 'The watchdog counts down from about 1.6 s.',
							detail:
								'The watchdog runs from the 10 kHz internal clock, so 2^14 ticks is 16,384 ticks, about 1.6 s. That clock is not very precise, so leave a wide margin between your slowest loop and the timeout. The watchdog keeps running even when the CPU is stuck.',
							set: { w: 'Watchdog\n0.9 s left' },
							light: ['w']
						},
						{
							title: 'Kick the watchdog',
							say: 'The loop finishes its work and kicks it, so the count starts over.',
							detail:
								'WDT_RESET_COUNTER() sets a bit that restarts the count. That control register is write-protected, so the loop unlocks, kicks and locks again. Kicking only at the end of the loop proves that a whole pass really finished.',
							send: [['loop', 'w']],
							set: { w: 'Watchdog\n1.6 s left' },
							light: ['loop']
						},
						{
							title: 'Stuck on a sensor',
							say: 'Then the loop waits for a sensor that never answers.',
							detail:
								'A typical cause is a while loop waiting for a ready bit or an I2C reply with no timeout. The program never reaches the kick line again. Interrupts may still run, which is why kicking from a timer interrupt would hide the hang.',
							send: [['loop', 's']],
							set: { loop: 'main loop\nstuck', w: 'Watchdog\n1.0 s left' },
							down: ['s']
						},
						{
							title: 'Time runs out',
							say: 'No more kicks arrive, and the count runs out.',
							detail:
								'When the count runs out, the watchdog sets its timeout flag and starts a reset delay, here 1026 watchdog clocks, about 0.1 s. Nothing in the main loop can stop it now. The chip will reset when the delay ends.',
							set: { loop: 'main loop\nstuck', w: 'Watchdog\n0 s left' },
							down: ['loop', 's'],
							light: ['w']
						},
						{
							title: 'Reset and start fresh',
							say: 'The watchdog resets the chip, and the program starts fresh instead of hanging forever.',
							detail:
								'The chip restarts from the reset vector, and the startup code sets everything up again. Check WDT_GET_RESET_FLAG() early in main() to log that the watchdog fired, then clear it. Frequent watchdog resets mean a bug to fix, not a feature.',
							send: [['w', 'r']],
							set: { loop: 'main loop\nrestarted' },
							light: ['r']
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
				links: [['Real-time computing', 'https://en.wikipedia.org/wiki/Real-time_computing']],
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
						{
							title: 'Start the clock',
							say: 'A crash is detected, and the clock starts.',
							detail:
								'An accelerometer senses the sudden stop and raises an event. The deadline is measured from that moment, not from when the task gets to run. Any time spent waiting to be scheduled counts against the 20 ms.',
							light: ['e']
						},
						{
							title: 'Finish in time',
							say: 'The task finishes in 15 ms, before the deadline. Success.',
							detail:
								'The 15 ms covers waiting plus running, which is called the response time. That leaves 5 ms of slack. Finishing at 5 ms would be no better: in real-time work, early is simply on time.',
							send: [
								['e', 't'],
								['t', 'd']
							],
							set: { r: 'Finished at 15 ms: OK' },
							light: ['d']
						},
						{
							title: 'Delayed by another task',
							say: 'Next time another task delays it by 10 ms.',
							detail:
								'The task itself is no slower; it spent 10 ms waiting while something more urgent ran. Response time is the waiting plus the running, so it is now 25 ms. Worst-case analysis must include every task and interrupt that can get in the way.',
							send: [['e', 't']],
							set: { r: 'Finished at 25 ms' },
							light: ['t']
						},
						{
							title: 'Late means wrong',
							say: 'The answer is correct, but it is too late. In a hard real-time system that is a failure.',
							detail:
								'An airbag that fires after the driver has hit the wheel does no good, even though the decision was right. That is why hard real-time systems are judged on WCET and proofs, not average speed. A firm system would simply throw the late result away.',
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
				links: [
					['Rate-monotonic scheduling', 'https://en.wikipedia.org/wiki/Rate-monotonic_scheduling'],
					[
						'What really happened on Mars Pathfinder',
						'https://www.cs.cornell.edu/courses/cs614/1999sp/papers/pathfinder.html'
					]
				],
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
						{
							title: 'Low takes the lock',
							say: 'The Low task takes the lock.',
							detail:
								'A lock, or mutex, protects shared data such as a buffer or a bus, so only one task uses it at a time. Low gets it because nothing more urgent was running. Anyone else who wants it must wait until Low releases it.',
							send: [['l', 'lk']],
							light: ['l']
						},
						{
							title: 'High waits briefly',
							say: 'High needs the lock, so it must wait for Low. A short wait is acceptable.',
							detail:
								'Waiting for Low to finish its short critical section is normal and bounded. If Low holds the lock for at most 1 ms, High waits at most 1 ms. This blocking time is included when you check that High meets its deadline.',
							send: [['h', 'lk']],
							set: { h: 'High\nblocked' },
							light: ['h']
						},
						{
							title: 'Medium preempts Low',
							say: 'Medium wakes up and preempts Low, because it has a higher priority.',
							detail:
								'Medium does not need the lock, so the scheduler looks only at priority, and Medium beats Low. Low is paused while still holding the lock. High is blocked, so the scheduler does not consider it at all.',
							set: { h: 'High\nblocked', m: 'Medium\nrunning', l: 'Low\npaused' },
							light: ['m'],
							down: ['l']
						},
						{
							title: 'Priority inversion',
							say: 'Now High is stuck behind Medium, a task it should beat. That is priority inversion.',
							detail:
								'High now waits for as long as Medium runs, and that has no limit. Several medium tasks make it worse. On Mars Pathfinder in 1997 this kept a high-priority task from running, a watchdog noticed, and the computer kept resetting.',
							set: { h: 'High\nstill blocked', m: 'Medium\nrunning', l: 'Low\npaused' },
							down: ['h', 'l']
						},
						{
							title: 'Priority inheritance',
							say: "Fix: Low inherits High's priority, so Medium cannot preempt it, and the lock is freed quickly.",
							detail:
								"While Low holds a lock that High wants, the system raises Low to High's priority, then drops it back when the lock is released. In POSIX threads you ask for this with PTHREAD_PRIO_INHERIT on the mutex. NASA fixed Pathfinder by turning on this option remotely.",
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
				links: [
					['sched(7) man page', 'https://man7.org/linux/man-pages/man7/sched.7.html'],
					['PREEMPT_RT theory', 'https://docs.kernel.org/core-api/real-time/theory.html']
				],
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
							title: 'Test on a quiet Pi',
							say: 'On a quiet Pi, the 1 ms loop looks perfect. This is misleading.',
							detail:
								'With nothing else running, the CPU is free whenever the loop wakes, so it starts almost on time. Average timing looks perfect, but the worst case has not been tested at all. Real systems run other work, logging and network traffic.',
							hide: ['b'],
							send: [
								['l', 'k'],
								['k', 'o']
							]
						},
						{
							title: 'Background load arrives',
							say: 'A background job starts, and the scheduler shares the CPU fairly.',
							detail:
								'Normal tasks use the SCHED_OTHER policy, which shares CPU time fairly and has no idea your loop has a 1 ms deadline. A compile, a backup or a browser all compete on equal terms. Fair is the opposite of what a control loop needs.',
							send: [['b', 'k']],
							light: ['b']
						},
						{
							title: 'Missed periods',
							say: 'The loop gets delayed by several milliseconds, and the motor stutters.',
							detail:
								"The loop can wait for another task's time slice, for kernel code that cannot be interrupted, or for a page fault to load memory from disk. Each of these can add milliseconds. The motor receives updates late or in bursts, so it jerks or stalls.",
							set: { k: 'Linux\ndelayed!' },
							down: ['o']
						},
						{
							title: 'Real-time settings',
							say: 'Give the loop SCHED_FIFO priority, on a PREEMPT_RT kernel.',
							detail:
								'chrt -f 80 runs the loop under SCHED_FIFO at priority 80, above every normal task. PREEMPT_RT turns most interrupt handlers into threads and lets long kernel sections be interrupted. mlockall keeps the program in RAM so page faults cannot delay it.',
							set: { k: 'Linux\nPREEMPT_RT' },
							light: ['k']
						},
						{
							title: 'Tight timing under load',
							say: 'Now the loop preempts the job, and timing stays tight even under load.',
							detail:
								'The loop now takes the CPU as soon as it wakes, and the worst-case delay becomes small and bounded. Check it with cyclictest under full load, and look at the maximum, not the average. By default Linux keeps 5% of each second for normal tasks, so a runaway real-time loop cannot freeze everything.',
							set: { k: 'Linux\nPREEMPT_RT' },
							send: [
								['l', 'k'],
								['k', 'o']
							],
							light: ['o']
						}
					]
				}
			},
			{
				id: 'pi-gpio',
				title: 'GPIO on the Raspberry Pi',
				summary:
					'The 40-pin header gives a Raspberry Pi the same kind of pins a microcontroller has, but Linux sits in between. You reach them through a kernel driver, usually with a library such as gpiozero, and every pin works at 3.3 V.',
				points: [
					[
						'3.3 V only',
						'the GPIO pins are not 5 V tolerant. A 5 V signal can destroy the chip, so use a level shifter.'
					],
					['Numbering', 'code uses GPIO numbers. GPIO17 sits on physical pin 11, not pin 17.'],
					[
						'Pull-ups',
						'inputs have internal pull-up and pull-down resistors. A gpiozero Button turns the pull-up on by default.'
					],
					[
						'Character device',
						'the kernel exposes each GPIO chip as /dev/gpiochipN, and modern GPIO tools are built on it.'
					],
					[
						'Events, not polling',
						'a callback such as when_pressed runs when the kernel reports an edge, so your loop does not spin.'
					]
				],
				tip: 'Edge events on Linux arrive late by an unpredictable amount. For microsecond timing, give the pin to a microcontroller.',
				code: `from gpiozero import LED, Button
from signal import pause

led = LED(17)                          # GPIO17, physical pin 11
button = Button(27, bounce_time=0.05)  # GPIO27, wire the other side to GND

button.when_pressed = led.on
button.when_released = led.off
pause()                                # wait for events forever`,
				links: [
					[
						'Raspberry Pi GPIO header',
						'https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#gpio'
					],
					['gpiozero recipes', 'https://gpiozero.readthedocs.io/en/stable/recipes.html'],
					['GPIO character device', 'https://docs.kernel.org/userspace-api/gpio/chardev.html']
				],
				sketch: {
					kind: 'Data flow diagram',
					alt: 'A button press on GPIO27 is seen by the Linux kernel, passed to a Python callback, which turns on an LED on GPIO17. Under load, the kernel step can be delayed.',
					h: 190,
					nodes: [
						{ id: 'b', label: 'Button\nGPIO27', x: 62, y: 50, w: 104, h: 66, fill: 'pink' },
						{ id: 'k', label: 'Linux\nkernel', x: 200, y: 50, w: 104, h: 66, fill: 'yellow' },
						{ id: 'py', label: 'Python\nwhen_pressed', x: 360, y: 50, w: 140, h: 66, fill: 'sky' },
						{ id: 'l', label: 'LED GPIO17\noff', x: 360, y: 150, w: 140, h: 56, fill: 'mint' }
					],
					edges: [
						{ from: 'b', to: 'k', label: 'edge' },
						{ from: 'k', to: 'py', label: 'event' },
						{ from: 'py', to: 'l' }
					],
					steps: [
						{
							title: 'Button pulls pin low',
							say: 'Press the button. GPIO27 falls from 3.3 V to 0 V.',
							detail:
								'A gpiozero Button turns on the internal pull-up, which holds GPIO27 at 3.3 V. Pressing the button joins the pin to GND, so it reads 0. The contacts bounce for a few milliseconds, and bounce_time=0.05 ignores extra edges for 50 ms.',
							set: { b: 'Button\n0 V' },
							light: ['b']
						},
						{
							title: 'Kernel sees the edge',
							say: 'The kernel GPIO driver sees the falling edge and queues an event.',
							detail:
								'The GPIO controller raises a hardware interrupt, and the kernel driver records the edge with a timestamp. It queues the event on the GPIO character device, /dev/gpiochipN, that your program opened. No user code has run yet.',
							send: [['b', 'k']],
							set: { b: 'Button\n0 V' },
							light: ['k']
						},
						{
							title: 'Callback runs',
							say: 'gpiozero picks up the event and calls your when_pressed function.',
							detail:
								'gpiozero keeps a background thread waiting for events, and it calls your when_pressed function in that thread. So your function does not run on the main thread, which is just sitting in pause(). Keep callbacks short, because the next event waits until yours returns.',
							send: [['k', 'py']],
							light: ['py']
						},
						{
							title: 'Drive the LED',
							say: 'Your code drives GPIO17 HIGH, and the LED lights.',
							detail:
								'led.on() asks the kernel to set GPIO17 HIGH, and the pin rises to 3.3 V. The LED needs a series resistor to ground, often 330 Ω. The pins can only supply a few milliamps each, so never connect a motor or relay directly.',
							send: [['py', 'l']],
							set: { l: 'LED GPIO17\non' },
							light: ['l']
						},
						{
							title: 'Delays under load',
							say: 'Under heavy load the same path can take far longer. Fine for a doorbell, not for a motor.',
							detail:
								'The path crosses a hardware interrupt, the kernel, the scheduler and the Python interpreter. When the CPU is busy, the Python thread may wait tens of milliseconds for its turn. Nobody notices that at a doorbell, but a motor needs precise timing.',
							send: [['b', 'k']],
							set: { k: 'Linux\nbusy' },
							down: ['k']
						}
					]
				}
			},
			{
				id: 'periodic-tasks',
				title: 'Periodic tasks without drift',
				summary:
					'Most real-time work is a loop that must run at a fixed rate, such as once every millisecond. Sleeping for a fixed time after each run lets small delays add up. Sleeping until an absolute time keeps the loop on schedule.',
				points: [
					[
						'Relative sleep',
						'wait 1 ms after the work. The work time and every late wake-up add to the period, so the loop drifts.'
					],
					[
						'Absolute sleep',
						'clock_nanosleep with TIMER_ABSTIME wakes at a fixed point in time, so errors do not pile up.'
					],
					[
						'CLOCK_MONOTONIC',
						'never jumps when the system time is corrected, unlike CLOCK_REALTIME.'
					],
					[
						'Overrun',
						'if the work takes longer than the period, the next deadline has already passed. Detect it and count it.'
					]
				],
				tip: 'Work out the next wake-up from the previous one, never from the moment you happened to wake.',
				code: `struct timespec next;
clock_gettime(CLOCK_MONOTONIC, &next);

while (1) {
    next.tv_nsec += 1000000;               // + 1 ms
    if (next.tv_nsec >= 1000000000) {
        next.tv_nsec -= 1000000000;
        next.tv_sec++;
    }
    clock_nanosleep(CLOCK_MONOTONIC, TIMER_ABSTIME, &next, NULL);
    control_step();
}`,
				links: [
					['clock_nanosleep(2)', 'https://man7.org/linux/man-pages/man2/clock_nanosleep.2.html']
				],
				sketch: {
					kind: 'Timing diagram',
					alt: 'A loop meant to run every millisecond does 0.3 ms of work. With a relative sleep it slips 0.3 ms every run. With an absolute sleep it wakes at 1, 2 and 3 ms exactly.',
					h: 185,
					nodes: [
						{ id: 'c', label: 'Clock\nt = 0 ms', x: 70, y: 50, w: 120, h: 66, fill: 'yellow' },
						{ id: 'l', label: 'Loop\nsleeping', x: 240, y: 50, w: 120, h: 66, fill: 'sky' },
						{ id: 'w', label: 'Work\n0.3 ms', x: 410, y: 50, w: 110, h: 66, fill: 'mint' },
						{ id: 'r', label: 'Relative sleep', x: 120, y: 150, w: 210, h: 46, fill: 'pink' },
						{ id: 'a', label: 'Absolute sleep', x: 360, y: 150, w: 210, h: 46, fill: 'sky' }
					],
					edges: [
						{ from: 'c', to: 'l', label: 'wake' },
						{ from: 'l', to: 'w' }
					],
					steps: [
						{
							title: 'The target schedule',
							say: 'The loop should run at 1 ms, 2 ms, 3 ms and so on.',
							detail:
								'A 1 ms period means 1000 runs per second, evenly spaced. Control maths such as a PID controller assumes that spacing, so uneven gaps make its results wrong. The goal is to start each run at the planned time.',
							set: { c: 'Clock\nt = 1 ms' },
							light: ['c']
						},
						{
							title: 'Wake and do the work',
							say: 'It wakes on time and does 0.3 ms of work.',
							detail:
								'The work starts at 1 ms and finishes at 1.3 ms, leaving 0.7 ms before the next run. That spare time is the slack. If the work ever took longer than 1 ms, the loop would overrun its next start time.',
							send: [
								['c', 'l'],
								['l', 'w']
							],
							set: { c: 'Clock\nt = 1 ms', l: 'Loop\nrunning' },
							light: ['w']
						},
						{
							title: 'Relative sleep drifts',
							say: 'Relative sleep: wait 1 ms from now, so the next run starts at 2.3 ms.',
							detail:
								'A call like usleep(1000) counts from the moment it is called, so the 0.3 ms of work is added to every period. The loop actually runs every 1.3 ms, about 770 times a second instead of 1000. Each late wake-up adds a little more on top.',
							set: { c: 'Clock\nt = 2.3 ms', r: 'Relative: 2.3 ms' },
							down: ['r']
						},
						{
							title: 'The error piles up',
							say: 'After 100 runs it is 30 ms behind, and still slipping.',
							detail:
								'0.3 ms lost on each of 100 runs adds up to 30 ms. Nothing ever corrects it, so the gap keeps growing for as long as the program runs. Random late wake-ups make it worse and harder to predict.',
							set: { c: 'Clock\nt = 130 ms', r: 'Relative: 30 ms late' },
							down: ['r']
						},
						{
							title: 'Absolute sleep fixes it',
							say: 'Absolute sleep: wake at exactly 2 ms, then 3 ms. The error never adds up.',
							detail:
								'Each target is the previous target plus 1 ms, not now plus 1 ms. clock_nanosleep with TIMER_ABSTIME sleeps until that exact time on CLOCK_MONOTONIC. A late wake-up only delays one run, and if the work overruns, the call returns at once so you can count it.',
							send: [['c', 'l']],
							set: { c: 'Clock\nt = 2 ms', a: 'Absolute: 2, 3, 4 ms' },
							light: ['a']
						}
					]
				}
			}
		]
	}
];
