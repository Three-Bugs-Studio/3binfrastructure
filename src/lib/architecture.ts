import type { Topic } from './sketch';

const FOUNDATIONS = 'The foundations';
const STYLES = 'Architecture styles';
const DESIGN = 'Designing a system';
const EVOLVE = 'From layers to microservices';
const C4 = 'Drawing it: the C4 model';

export const architecture: Topic[] = [
	{
		id: 'what-is',
		part: FOUNDATIONS,
		title: 'What system architecture is',
		summary:
			'System architecture is the overall shape of a system: its parts, how they connect, and the rules for how it may change. It gives a team one shared picture, so decisions stop depending on who remembers what.',
		points: [
			['Software architecture', 'the inside of one application: its modules, layers and APIs.'],
			[
				'System architecture',
				'the wider view, adding hardware, networks, storage, outside systems and people.'
			],
			[
				'System design',
				'one level down. Architecture names the parts, design explains how each part works.'
			],
			[
				'The standard',
				'ISO/IEC/IEEE 42010 treats an architecture and the documents describing it as two separate things.'
			]
		],
		tip: 'If three people would draw your system three different ways, the architecture has already drifted.',
		sketch: {
			kind: 'Zoom levels',
			alt: 'System architecture contains servers, outside systems and software. Software architecture contains the layers. System design covers how one part works inside.',
			h: 225,
			nodes: [
				{
					id: 'sys',
					label: 'System architecture',
					x: 240,
					y: 112,
					w: 460,
					h: 210,
					shape: 'boundary'
				},
				{ id: 'infra', label: 'Servers +\nnetwork', x: 75, y: 85, w: 100, h: 58 },
				{ id: 'ext', label: 'Outside\nsystems', x: 75, y: 170, w: 100, h: 58 },
				{
					id: 'sw',
					label: 'Software architecture',
					x: 305,
					y: 122,
					w: 300,
					h: 170,
					shape: 'boundary'
				},
				{ id: 'ui', label: 'UI layer', x: 235, y: 85, w: 110, h: 44, fill: 'sky' },
				{ id: 'api', label: 'API layer', x: 385, y: 85, w: 110, h: 44, fill: 'sky' },
				{
					id: 'fn',
					label: 'How checkout\nworks inside',
					x: 305,
					y: 172,
					w: 170,
					h: 58,
					fill: 'pink'
				}
			],
			edges: [
				{ from: 'infra', to: 'ui' },
				{ from: 'ui', to: 'api' },
				{ from: 'api', to: 'fn' },
				{ from: 'ext', to: 'fn' }
			],
			steps: [
				{
					say: 'System architecture is the widest view: servers, networks, outside systems and the software, all together.',
					light: ['infra', 'ext']
				},
				{
					say: 'Zoom in. Software architecture looks at one application and how its parts are organised.',
					hide: ['infra', 'ext'],
					light: ['ui', 'api'],
					send: [['ui', 'api']]
				},
				{
					say: 'Zoom in again. System design explains how one part really works.',
					hide: ['infra', 'ext', 'ui'],
					light: ['fn'],
					send: [['api', 'fn']]
				},
				{
					say: 'Same system, three levels of detail. Pick the level that fits the question you are answering.',
					send: [
						['infra', 'ui'],
						['ext', 'fn']
					]
				}
			]
		}
	},
	{
		id: 'building-blocks',
		title: 'The four building blocks',
		summary:
			'Every real system is made of the same four things. What changes from one system to the next is how you combine them.',
		points: [
			[
				'Hardware and infrastructure',
				'servers, storage and networks, usually rented as cloud services and defined as code.'
			],
			[
				'Software',
				'the code that does the business work, usually split into presentation, logic and data layers.'
			],
			[
				'Interfaces',
				'the contracts between parts. A clean one lets you swap a payment service in a sprint, not a quarter.'
			],
			[
				'Data',
				'where information lives and how it moves: API calls, event streams or scheduled batch jobs.'
			]
		],
		tip: 'Integration bugs gather at the seams, so spend your design time on the contracts between parts.',
		sketch: {
			kind: 'Block diagram',
			alt: 'A request enters through interfaces, runs in software, reads data, and all of it runs on hardware and infrastructure.',
			h: 215,
			nodes: [
				{ id: 'iface', label: 'Interfaces (APIs)', x: 240, y: 30, w: 400, h: 44, fill: 'pink' },
				{ id: 'sw', label: 'Software', x: 125, y: 110, w: 170, h: 54, fill: 'yellow' },
				{ id: 'data', label: 'Data', x: 355, y: 110, w: 170, h: 54, fill: 'mint' },
				{
					id: 'hw',
					label: 'Hardware and infrastructure',
					x: 240,
					y: 188,
					w: 400,
					h: 44,
					fill: 'sky'
				}
			],
			edges: [
				{ from: 'iface', to: 'sw' },
				{ from: 'sw', to: 'data' },
				{ from: 'sw', to: 'hw', plain: true },
				{ from: 'data', to: 'hw', plain: true }
			],
			steps: [
				{
					say: 'A request arrives at an interface: the contract that says what callers may ask for.',
					light: ['iface']
				},
				{
					say: 'The software does the work and applies the business rules.',
					light: ['sw'],
					send: [['iface', 'sw']]
				},
				{
					say: 'It reads and writes data, the part of the system that must outlive everything else.',
					light: ['data'],
					send: [['sw', 'data']]
				},
				{
					say: 'All of it runs on infrastructure, so its limits become your limits.',
					light: ['hw'],
					send: [
						['sw', 'hw'],
						['data', 'hw']
					]
				}
			]
		}
	},
	{
		id: 'apis',
		title: 'Interfaces and APIs',
		summary:
			'Services need a contract. The right protocol depends on who is calling and how chatty the conversation will be, and a gateway keeps the outside world away from your internals.',
		points: [
			[
				'REST',
				'resources over HTTP. Easy to cache and debug, and the usual choice for public APIs.'
			],
			[
				'GraphQL',
				'clients ask for exactly the fields they need. Great for varied front ends, harder to cache.'
			],
			['gRPC', 'compact binary calls with generated clients. Great between internal services.'],
			['WebSockets', 'a long-lived, two-way connection for chat, live dashboards and games.'],
			[
				'API gateway',
				'one front door that handles auth, rate limits and routing to the services behind it.'
			]
		],
		tip: 'Use REST unless you can name the problem it does not solve for you.',
		sketch: {
			kind: 'C4 Container diagram',
			alt: 'Web and mobile clients call an API gateway over REST. The gateway calls the users and orders services over gRPC.',
			h: 220,
			nodes: [
				{ id: 'web', label: 'Web', x: 50, y: 50, w: 84, fill: 'sky' },
				{ id: 'mobile', label: 'Mobile', x: 50, y: 170, w: 84, fill: 'sky' },
				{ id: 'gw', label: 'API\ngateway', x: 225, y: 110, w: 104, h: 64, fill: 'yellow' },
				{ id: 'users', label: 'Users', x: 415, y: 50, w: 100, fill: 'mint' },
				{ id: 'orders', label: 'Orders', x: 415, y: 170, w: 100, fill: 'mint' }
			],
			edges: [
				{ from: 'web', to: 'gw', label: 'REST' },
				{ from: 'mobile', to: 'gw', label: 'REST' },
				{ from: 'gw', to: 'users', label: 'gRPC' },
				{ from: 'gw', to: 'orders', label: 'gRPC' }
			],
			steps: [
				{
					say: 'The web and mobile apps both call one front door instead of knowing every service.',
					send: [
						['web', 'gw'],
						['mobile', 'gw']
					],
					light: ['gw']
				},
				{
					say: 'The gateway checks the login and the rate limit before anything else runs.',
					set: { gw: 'Auth OK\nLimit OK' },
					light: ['gw']
				},
				{
					say: 'It routes the call to the right service over fast internal gRPC.',
					send: [['gw', 'orders']],
					light: ['orders']
				},
				{
					say: 'A caller over its rate limit gets turned away here, so the services behind never feel it.',
					send: [['web', 'gw']],
					set: { gw: '429\nToo many' },
					down: ['web']
				}
			]
		}
	},
	{
		id: 'monolith',
		part: STYLES,
		title: 'Monolithic',
		summary:
			'One codebase, built, deployed and scaled as one unit. It is quick to build, which is why most successful products began this way. The trouble starts when it outgrows what the team can hold in their heads.',
		points: [
			['Best for', 'small teams, early products and one well-understood domain.'],
			['Scales', 'mostly upwards, by moving to a bigger machine.'],
			[
				'Modular monolith',
				'still one deployable, but with strict boundaries between modules. Often the right answer for far longer than people expect.'
			],
			['The cost', 'one bad deploy or crash takes everything down together.']
		],
		tip: 'Ask what gets you through the next 12 months without a rewrite, not what you would need at 100 times today.',
		sketch: {
			kind: 'C4 Container diagram',
			alt: 'A user reaches one deployable application containing UI, orders and payments, backed by one database.',
			h: 230,
			nodes: [
				{ id: 'app', label: 'One deployable', x: 262, y: 72, w: 400, h: 125, shape: 'boundary' },
				{ id: 'user', label: 'User', x: 20, y: 72, shape: 'person' },
				{ id: 'ui', label: 'UI', x: 125, y: 84, w: 100, h: 54, fill: 'sky' },
				{ id: 'orders', label: 'Orders', x: 262, y: 84, w: 100, h: 54, fill: 'mint' },
				{ id: 'pay', label: 'Payments', x: 399, y: 84, w: 100, h: 54, fill: 'pink' },
				{ id: 'db', label: 'Database', x: 262, y: 192, w: 120, h: 66, shape: 'db' }
			],
			edges: [
				{ from: 'user', to: 'ui' },
				{ from: 'ui', to: 'orders' },
				{ from: 'orders', to: 'pay' },
				{ from: 'orders', to: 'db' }
			],
			steps: [
				{
					say: 'A request passes through the modules as plain function calls, which is fast and simple.',
					send: [
						['user', 'ui'],
						['ui', 'orders']
					]
				},
				{
					say: 'Everything shares one database, so a transaction across modules is easy.',
					send: [['orders', 'db']],
					light: ['db']
				},
				{
					say: 'Now a bug appears in Payments, and the process crashes.',
					light: ['pay'],
					send: [['orders', 'pay']]
				},
				{
					say: 'Because it is one unit, the whole app goes down with it.',
					down: ['ui', 'orders', 'pay']
				}
			]
		}
	},
	{
		id: 'client-server',
		title: 'Client-server',
		summary:
			'Two roles: a server owns the resources and a client asks for them. The web runs on this, and so do most mobile apps. It is the default mental model for software because it is simple.',
		points: [
			['Best for', 'web apps, business software and mobile backends.'],
			['Scales', 'well at first, by adding servers behind a load balancer.'],
			['The cost', 'the central server can become the bottleneck.']
		],
		tip: 'Keep the server stateless and it becomes easy to run more than one of them.',
		sketch: {
			kind: 'Sequence diagram',
			alt: 'A browser sends a request to the server, the server queries the database, rows come back, and the server responds to the browser.',
			h: 225,
			nodes: [
				{ id: 'c', label: 'Browser', x: 90, y: 24, shape: 'lifeline', fill: 'sky' },
				{ id: 's', label: 'Server', x: 250, y: 24, shape: 'lifeline', fill: 'yellow' },
				{ id: 'd', label: 'Database', x: 400, y: 24, shape: 'lifeline', fill: 'mint' },
				{ id: 'c1', label: '', x: 90, y: 75, shape: 'dot' },
				{ id: 's1', label: '', x: 250, y: 75, shape: 'dot' },
				{ id: 's2', label: '', x: 250, y: 115, shape: 'dot' },
				{ id: 'd2', label: '', x: 400, y: 115, shape: 'dot' },
				{ id: 'd3', label: '', x: 400, y: 155, shape: 'dot' },
				{ id: 's3', label: '', x: 250, y: 155, shape: 'dot' },
				{ id: 's4', label: '', x: 250, y: 195, shape: 'dot' },
				{ id: 'c4', label: '', x: 90, y: 195, shape: 'dot' }
			],
			edges: [
				{ from: 'c1', to: 's1', label: 'GET /orders' },
				{ from: 's2', to: 'd2', label: 'SELECT' },
				{ from: 'd3', to: 's3', label: 'rows' },
				{ from: 's4', to: 'c4', label: '200 OK' }
			],
			steps: [
				{
					say: 'The browser asks the server for a list of orders.',
					send: [['c1', 's1']],
					light: ['c']
				},
				{
					say: 'The server does not hold the data itself, so it queries the database.',
					send: [['s2', 'd2']],
					light: ['s']
				},
				{ say: 'The rows come back.', send: [['d3', 's3']], light: ['d'] },
				{
					say: 'The server turns them into a response. Time flows down the page in this kind of diagram.',
					send: [['s4', 'c4']],
					light: ['c']
				}
			]
		}
	},
	{
		id: 'microservices',
		title: 'Microservices',
		summary:
			'The product is split into small services that run on their own, own their own data and talk over the network. You get independent deploys and scaling, and in exchange you inherit all the problems of distributed systems.',
		points: [
			['Best for', 'large engineering organisations with domains that can evolve separately.'],
			['Scales', 'one service at a time.'],
			['The cost', 'network failures, eventual consistency and much harder debugging.'],
			[
				'Common trap',
				'copying this style because a big company uses it, long before you have their problems.'
			]
		],
		tip: 'Split out a service when a team or a scaling need demands it, not because it feels modern.',
		sketch: {
			kind: 'C4 Container diagram',
			alt: 'An API gateway calls an orders service and a payments service. Each has its own database, and orders calls payments over the network.',
			h: 250,
			nodes: [
				{ id: 'gw', label: 'API gateway', x: 240, y: 28, w: 140, h: 44, fill: 'yellow' },
				{ id: 'orders', label: 'Orders', x: 110, y: 112, w: 110, fill: 'mint' },
				{ id: 'pay', label: 'Payments', x: 370, y: 112, w: 110, fill: 'pink' },
				{ id: 'odb', label: 'Orders DB', x: 110, y: 212, w: 100, h: 62, shape: 'db' },
				{ id: 'pdb', label: 'Pay DB', x: 370, y: 212, w: 100, h: 62, shape: 'db' }
			],
			edges: [
				{ from: 'gw', to: 'orders' },
				{ from: 'gw', to: 'pay' },
				{ from: 'orders', to: 'pay', label: 'network', dashed: true },
				{ from: 'orders', to: 'odb' },
				{ from: 'pay', to: 'pdb' }
			],
			steps: [
				{
					say: 'The gateway routes each request to the service that owns it.',
					send: [['gw', 'orders']]
				},
				{
					say: 'Orders needs a payment, so it makes a call across the network.',
					send: [['orders', 'pay']],
					light: ['pay']
				},
				{
					say: 'Each service owns its own data. Nobody else reaches into its database.',
					send: [
						['orders', 'odb'],
						['pay', 'pdb']
					]
				},
				{
					say: 'Payments fails. Orders still works, as long as it handles the failed call.',
					down: ['pay', 'pdb'],
					send: [['gw', 'orders']]
				},
				{
					say: 'Black Friday hits Orders, so you scale just that service.',
					set: { orders: 'Orders x 3' },
					light: ['orders']
				}
			]
		}
	},
	{
		id: 'event-driven',
		title: 'Event-driven',
		summary:
			'Instead of one service calling another, a service announces that something happened and whoever cares reacts. Producers and consumers no longer need to know each other, which scales well but makes cause and effect harder to follow.',
		points: [
			['Best for', 'real-time pipelines, integrations and asynchronous workflows.'],
			['Scales', 'very well, because consumers work at their own pace.'],
			['The cost', 'tracing why something happened takes real tooling.']
		],
		tip: 'Name events as past-tense facts, like OrderPlaced, so they stay true whoever listens.',
		sketch: {
			kind: 'Data flow diagram',
			alt: 'Checkout publishes an order placed event to an event bus. Billing, shipping and analytics each receive it.',
			h: 205,
			nodes: [
				{ id: 'co', label: 'Checkout', x: 62, y: 102, w: 100, fill: 'sky' },
				{ id: 'bus', label: 'Event bus', x: 230, y: 102, w: 110, h: 60, fill: 'yellow' },
				{ id: 'a', label: 'Billing', x: 410, y: 38, w: 110, fill: 'mint' },
				{ id: 'b', label: 'Shipping', x: 410, y: 102, w: 110, fill: 'mint' },
				{ id: 'c', label: 'Analytics', x: 410, y: 166, w: 110, fill: 'pink' }
			],
			edges: [
				{ from: 'co', to: 'bus', label: 'event' },
				{ from: 'bus', to: 'a' },
				{ from: 'bus', to: 'b' },
				{ from: 'bus', to: 'c' }
			],
			steps: [
				{
					say: 'Checkout publishes a fact: OrderPlaced. It does not know or care who is listening.',
					hide: ['c'],
					send: [['co', 'bus']]
				},
				{
					say: 'Every subscriber gets its own copy and reacts in its own time.',
					hide: ['c'],
					send: [
						['bus', 'a'],
						['bus', 'b']
					]
				},
				{ say: 'Later you add Analytics. Checkout does not change at all.', light: ['c'] },
				{
					say: 'The next event reaches all three.',
					send: [
						['bus', 'a'],
						['bus', 'b'],
						['bus', 'c']
					]
				}
			]
		}
	},
	{
		id: 'serverless',
		title: 'Serverless',
		summary:
			'You upload short-lived functions and the cloud provider runs them. There are still servers, but they are no longer your job. You pay per run, and scaling happens without you.',
		points: [
			['Best for', 'spiky workloads, glue code and event processing.'],
			['Scales', 'automatically, from zero upwards.'],
			['The cost', 'cold starts, tighter ties to one vendor, and a poor fit for long-running work.']
		],
		tip: 'Serverless shines when traffic is uneven. For steady, heavy load, a plain server is often cheaper.',
		sketch: {
			kind: 'Data flow diagram',
			alt: 'Events trigger a function that writes to storage. The number of running copies goes from zero to many and back to zero.',
			h: 170,
			nodes: [
				{ id: 'ev', label: 'Events', x: 65, y: 85, w: 100, h: 56, fill: 'sky' },
				{ id: 'fn', label: 'Function\n0 running', x: 240, y: 85, w: 130, h: 72, fill: 'yellow' },
				{ id: 'db', label: 'Storage', x: 410, y: 85, w: 100, h: 76, shape: 'db', fill: 'mint' }
			],
			edges: [
				{ from: 'ev', to: 'fn' },
				{ from: 'fn', to: 'db' }
			],
			steps: [
				{ say: 'No traffic means nothing is running, and you pay nothing.', light: ['fn'] },
				{
					say: 'An event arrives. The platform starts a copy, which is the slight delay called a cold start.',
					send: [['ev', 'fn']],
					set: { fn: 'Function\n1 running' }
				},
				{
					say: 'A spike hits and the platform runs hundreds of copies at once.',
					send: [['ev', 'fn']],
					set: { fn: 'Function\n500 running' },
					light: ['fn']
				},
				{
					say: 'They all finish their work and write the results.',
					send: [['fn', 'db']],
					set: { fn: 'Function\n500 running' }
				},
				{ say: 'Traffic stops, the copies disappear, and the bill stops too.' }
			]
		}
	},
	{
		id: 'layered',
		title: 'Layered',
		summary:
			'The application is split into horizontal layers with one job each. It is the pattern sitting inside most monoliths and many microservices.',
		points: [
			['Presentation', 'what people see and touch.'],
			['Business logic', 'the rules of the product, like who can refund an order and when.'],
			['Data access', 'the only layer that talks to storage.'],
			['The cost', 'a change that crosses layers, like a new field, ripples through all of them.']
		],
		tip: 'Each layer calls only the layer below it. If your UI code knows table names, the layers have leaked.',
		sketch: {
			kind: 'Layer diagram',
			alt: 'A user talks to the presentation layer, which calls business logic, which calls data access, which reads the database.',
			h: 225,
			nodes: [
				{ id: 'user', label: 'User', x: 45, y: 90, shape: 'person' },
				{ id: 'ui', label: 'Presentation', x: 225, y: 30, w: 170, fill: 'sky', h: 40 },
				{ id: 'logic', label: 'Business logic', x: 225, y: 112, w: 170, fill: 'yellow', h: 40 },
				{ id: 'data', label: 'Data access', x: 225, y: 194, w: 170, fill: 'mint', h: 40 },
				{ id: 'db', label: 'Database', x: 415, y: 185, w: 90, h: 72, shape: 'db' }
			],
			edges: [
				{ from: 'user', to: 'ui' },
				{ from: 'ui', to: 'logic' },
				{ from: 'logic', to: 'data' },
				{ from: 'data', to: 'db' }
			],
			steps: [
				{ say: 'The request enters at the top layer.', send: [['user', 'ui']], light: ['ui'] },
				{
					say: 'Each layer does its one job, then hands over to the layer below.',
					send: [['ui', 'logic']],
					light: ['logic']
				},
				{
					say: 'Only the bottom layer knows how the data is stored.',
					send: [
						['logic', 'data'],
						['data', 'db']
					],
					light: ['data']
				},
				{
					say: 'The weakness: adding one new field means touching every layer.',
					light: ['ui', 'logic', 'data']
				}
			]
		}
	},
	{
		id: 'hexagonal',
		title: 'Hexagonal (ports and adapters)',
		summary:
			'Business logic sits in the middle and knows nothing about the outside. It exposes ports, and adapters plug the outside world into those ports. Replacing a database means replacing one adapter, not rewriting the core.',
		points: [
			['Best for', 'long-lived business logic that needs thorough testing.'],
			['Port', 'an interface the core defines, such as "save an order".'],
			['Adapter', 'one real implementation of a port, such as a Postgres repository.'],
			['The cost', 'more upfront structure than a simple app needs.']
		],
		tip: 'If your core imports a database library, it is not really the core.',
		sketch: {
			kind: 'Ports and adapters diagram',
			alt: 'Business logic sits in the centre. Web and test adapters drive it from the left, and database and email adapters plug in on the right.',
			h: 205,
			nodes: [
				{ id: 'core', label: 'Business\nlogic', x: 240, y: 102, w: 130, h: 88, fill: 'yellow' },
				{ id: 'web', label: 'Web UI\nadapter', x: 62, y: 50, w: 104, h: 58, fill: 'sky' },
				{ id: 'test', label: 'Test\nadapter', x: 62, y: 155, w: 104, h: 58, fill: 'sky' },
				{ id: 'db', label: 'Postgres\nadapter', x: 418, y: 50, w: 104, h: 58, fill: 'mint' },
				{ id: 'mail', label: 'Email\nadapter', x: 418, y: 155, w: 104, h: 58, fill: 'mint' }
			],
			edges: [
				{ from: 'web', to: 'core' },
				{ from: 'test', to: 'core' },
				{ from: 'core', to: 'db' },
				{ from: 'core', to: 'mail' }
			],
			steps: [
				{
					say: 'The web adapter translates an HTTP request into a call on the core.',
					send: [['web', 'core']],
					light: ['core']
				},
				{
					say: 'The core asks for "save this order" through a port. It has no idea what stores it.',
					send: [['core', 'db']]
				},
				{
					say: 'You move to MySQL by swapping one adapter. The core does not change.',
					set: { db: 'MySQL\nadapter' },
					light: ['db'],
					send: [['core', 'db']]
				},
				{
					say: 'Tests drive the same core with no web server or database at all.',
					send: [['test', 'core']],
					light: ['test']
				}
			]
		}
	},
	{
		id: 'compare',
		title: 'Choosing a style',
		summary:
			'No style is best in general. The right one depends on your team size, your workload and how much operational work you can carry. Real systems usually mix several.',
		points: [
			[
				'Constraints first',
				'team size, budget, compliance and existing systems narrow the choice before any preference does.'
			],
			[
				'Mixing is normal',
				'an online shop might use microservices, events and serverless together behind one gateway.'
			],
			['Choose boring', 'pick the simpler option when it is good enough.']
		],
		tip: 'A team of 8 and a team of 400 need different answers to the same question.',
		table: {
			head: ['Style', 'Best for', 'Main cost'],
			rows: [
				['Monolithic', 'Small teams, early products', 'Hard to evolve once large'],
				['Client-server', 'Web and mobile backends', 'Central server bottleneck'],
				['Microservices', 'Large organisations', 'Distributed complexity'],
				['Event-driven', 'Pipelines, integrations', 'Harder to trace'],
				['Serverless', 'Spiky workloads', 'Cold starts, lock-in'],
				['Layered', 'Inside almost anything', 'Changes ripple'],
				['Hexagonal', 'Long-lived logic', 'Upfront effort']
			]
		},
		sketch: {
			kind: 'Decision flowchart',
			alt: 'If you are a small team with one domain, use a modular monolith. Otherwise, if the work is spiky or event based, use serverless or events. Otherwise use microservices.',
			h: 265,
			nodes: [
				{ id: 'q1', label: 'Small team,\none domain?', x: 105, y: 50, w: 150, h: 66, fill: 'sky' },
				{ id: 'a1', label: 'Modular\nmonolith', x: 370, y: 50, w: 140, h: 62, fill: 'mint' },
				{ id: 'q2', label: 'Spiky or\nevent-based?', x: 105, y: 175, w: 150, h: 66, fill: 'sky' },
				{ id: 'a2', label: 'Serverless\nor events', x: 370, y: 140, w: 140, h: 62, fill: 'yellow' },
				{ id: 'a3', label: 'Microservices', x: 370, y: 228, w: 140, h: 50, fill: 'pink' }
			],
			edges: [
				{ from: 'q1', to: 'a1', label: 'yes' },
				{ from: 'q1', to: 'q2', label: 'no' },
				{ from: 'q2', to: 'a2', label: 'yes' },
				{ from: 'q2', to: 'a3', label: 'no' }
			],
			steps: [
				{ say: 'Start with your team, not the technology.', light: ['q1'] },
				{
					say: 'A small team with one domain should stop here. A modular monolith is plenty.',
					send: [['q1', 'a1']],
					light: ['a1']
				},
				{
					say: 'Otherwise, ask what your workload looks like.',
					send: [['q1', 'q2']],
					light: ['q2']
				},
				{
					say: 'Bursts of work or streams of events point to serverless or event-driven designs.',
					send: [['q2', 'a2']],
					light: ['a2']
				},
				{
					say: 'Many teams and steady, separate domains are where microservices earn their cost.',
					send: [['q2', 'a3']],
					light: ['a3']
				}
			]
		}
	},
	{
		id: 'design-steps',
		part: DESIGN,
		title: 'How to design a system',
		summary:
			'Good architecture comes from honest constraints, not from getting everything right on day one. These four steps repeat for as long as the system lives.',
		points: [
			[
				'Requirements',
				'write down what it must do, plus its limits on speed, uptime, security and cost.'
			],
			[
				'Pattern',
				'choose a style that fits those constraints. The AWS Well-Architected Framework is a useful checklist.'
			],
			[
				'Dependencies',
				'map every service, database and data flow so hidden coupling shows up early.'
			],
			['Failure', 'plan for it with circuit breakers, retries, spare capacity and good monitoring.']
		],
		tip: 'Write the constraints down before anyone draws a box.',
		sketch: {
			kind: 'Process diagram',
			alt: 'A loop of four steps: requirements, pattern, dependencies, resilience, then back to requirements.',
			h: 195,
			nodes: [
				{ id: 'req', label: '1. Requirements', x: 115, y: 45, w: 170, h: 54, fill: 'sky' },
				{ id: 'pat', label: '2. Pattern', x: 365, y: 45, w: 170, h: 54, fill: 'yellow' },
				{ id: 'dep', label: '3. Dependencies', x: 365, y: 150, w: 170, h: 54, fill: 'mint' },
				{ id: 'res', label: '4. Resilience', x: 115, y: 150, w: 170, h: 54, fill: 'pink' }
			],
			edges: [
				{ from: 'req', to: 'pat' },
				{ from: 'pat', to: 'dep' },
				{ from: 'dep', to: 'res' },
				{ from: 'res', to: 'req', label: 'repeat', dashed: true }
			],
			steps: [
				{ say: 'Write down what the system must do and what limits it.', light: ['req'] },
				{
					say: 'Let those constraints choose the pattern, not your preferences.',
					send: [['req', 'pat']],
					light: ['pat']
				},
				{
					say: 'Map what talks to what, so a small change does not turn into a surprise project.',
					send: [['pat', 'dep']],
					light: ['dep']
				},
				{
					say: 'Decide what happens when each part fails.',
					send: [['dep', 'res']],
					light: ['res']
				},
				{
					say: 'Then the business changes, and you go round again. Architecture is never finished.',
					send: [['res', 'req']]
				}
			]
		}
	},
	{
		id: 'legacy',
		title: 'Working with legacy systems',
		summary:
			'Most architecture work is not a blank page. Usually a new front end must keep talking to old systems that still own important rules, and the job is managing the border between them.',
		points: [
			['Integration layer', 'a gateway and event bus that translate between new and old.'],
			['Move in slices', 'replace one capability at a time while the old system keeps running.'],
			[
				'Measure debt first',
				'modernisation goes better when you size the problem before choosing the new runtime.'
			]
		],
		tip: 'Avoid the big rewrite. Replace one slice, prove it, then take the next.',
		sketch: {
			kind: 'C4 Container diagram',
			alt: 'A new front end calls an integration layer, which routes to the legacy billing system, and later to a new service that replaces it.',
			h: 200,
			nodes: [
				{ id: 'ui', label: 'New\nfront end', x: 62, y: 100, w: 104, h: 62, fill: 'sky' },
				{ id: 'gw', label: 'Integration\nlayer', x: 235, y: 100, w: 116, h: 68, fill: 'yellow' },
				{ id: 'old', label: 'Legacy\nbilling', x: 415, y: 45, w: 110, h: 62, fill: 'pink' },
				{ id: 'new', label: 'New billing\nservice', x: 415, y: 155, w: 110, h: 62, fill: 'mint' }
			],
			edges: [
				{ from: 'ui', to: 'gw' },
				{ from: 'gw', to: 'old' },
				{ from: 'gw', to: 'new' }
			],
			steps: [
				{
					say: 'The new front end talks only to the integration layer, never to the old system directly.',
					hide: ['new'],
					send: [['ui', 'gw']]
				},
				{
					say: 'The layer translates the call into whatever the legacy system understands.',
					hide: ['new'],
					send: [['gw', 'old']],
					light: ['old']
				},
				{ say: 'You build a replacement for one capability and run it alongside.', light: ['new'] },
				{
					say: 'Traffic moves over. The front end never noticed.',
					send: [['gw', 'new']],
					light: ['new']
				},
				{
					say: 'When nothing uses the old part, you switch it off.',
					down: ['old'],
					send: [['gw', 'new']]
				}
			]
		}
	},
	{
		id: 'challenges',
		title: 'Common challenges',
		summary:
			'The same problems appear in almost every system that grows past its first design. They feed each other, which is why they tend to arrive together.',
		points: [
			[
				'Technical debt',
				'hardcoded settings and tight coupling buy speed now and charge interest later.'
			],
			[
				'Overengineering',
				'building for scale you do not have. It is one of the most common mistakes of all.'
			],
			['Lost visibility', 'diagrams go stale within weeks, and soon nobody knows the whole system.']
		],
		tip: 'Keep diagrams next to the code, in version control, so they change with it.',
		sketch: {
			kind: 'Cycle diagram',
			alt: 'A shortcut creates hidden coupling, which makes changes slow, which leaves the diagrams stale, which leads to more shortcuts.',
			h: 195,
			nodes: [
				{ id: 'cut', label: 'Quick shortcut', x: 115, y: 45, w: 170, h: 54, fill: 'yellow' },
				{ id: 'tie', label: 'Hidden coupling', x: 365, y: 45, w: 170, h: 54, fill: 'pink' },
				{ id: 'slow', label: 'Slow changes', x: 365, y: 150, w: 170, h: 54, fill: 'pink' },
				{ id: 'old', label: 'Stale diagrams', x: 115, y: 150, w: 170, h: 54, fill: 'sky' }
			],
			edges: [
				{ from: 'cut', to: 'tie' },
				{ from: 'tie', to: 'slow' },
				{ from: 'slow', to: 'old' },
				{ from: 'old', to: 'cut' }
			],
			steps: [
				{ say: 'A deadline is close, so someone takes a shortcut.', light: ['cut'] },
				{
					say: 'Two parts now secretly depend on each other.',
					send: [['cut', 'tie']],
					light: ['tie']
				},
				{
					say: 'A small refactor turns into a quarter-long project.',
					send: [['tie', 'slow']],
					light: ['slow']
				},
				{
					say: 'Nobody has time to update the diagrams, so they stop matching reality.',
					send: [['slow', 'old']],
					light: ['old']
				},
				{
					say: 'With no clear picture, the next shortcut looks harmless. Break the loop by keeping the map current.',
					send: [['old', 'cut']]
				}
			]
		}
	},
	{
		id: 'modular-monolith',
		part: EVOLVE,
		title: 'Layers to modular monolith',
		summary:
			'Plain layers group code by technical job, so every controller sits with every other controller and any class can reach any other. As the system grows, nothing stops one feature from reaching into another. A modular monolith regroups the code by business capability, and each module keeps its own layers.',
		points: [
			[
				'The problem with layers',
				'public classes everywhere make code hard to reuse, and easy to misuse.'
			],
			['Module', 'one business capability with its own Controller, Service, Repository and Model.'],
			['Interface', 'the only door between modules. Everything else stays private.'],
			[
				'Internal and external',
				'external services are for other modules, internal ones only for the module itself.'
			],
			[
				'Why it pays off',
				'still one deployment, but each module could later become its own service.'
			]
		],
		tip: 'Controllers should call services, never repositories. Otherwise the layers exist in name only.',
		sketch: {
			kind: 'Component diagram',
			alt: 'The Order module calls the Product module through its external interface. A direct call to the Product repository is blocked.',
			h: 240,
			nodes: [
				{ id: 'om', label: 'Order module', x: 110, y: 120, w: 200, h: 228, shape: 'boundary' },
				{ id: 'pm', label: 'Product module', x: 365, y: 120, w: 210, h: 228, shape: 'boundary' },
				{ id: 'oc', label: 'Controller', x: 110, y: 62, w: 130, h: 36, fill: 'sky' },
				{ id: 'os', label: 'Order service', x: 110, y: 130, w: 150, h: 36, fill: 'yellow' },
				{ id: 'or', label: 'Repository', x: 110, y: 198, w: 130, h: 36, fill: 'mint' },
				{ id: 'pi', label: 'Interface', x: 365, y: 62, w: 130, h: 36, fill: 'pink' },
				{ id: 'ps', label: 'Product service', x: 365, y: 130, w: 150, h: 36, fill: 'yellow' },
				{ id: 'pr', label: 'Repository', x: 365, y: 198, w: 130, h: 36, fill: 'mint' }
			],
			edges: [
				{ from: 'oc', to: 'os' },
				{ from: 'os', to: 'or' },
				{ from: 'pi', to: 'ps' },
				{ from: 'ps', to: 'pr' }
			],
			steps: [
				{
					say: 'A request reaches the Order module and passes down its own layers.',
					send: [['oc', 'os']],
					light: ['os']
				},
				{
					say: 'Order needs a product price, and reaches straight for the Product repository.',
					send: [['os', 'pr']],
					light: ['pr']
				},
				{ say: 'That is blocked. The repository is private to the Product module.', down: ['pr'] },
				{
					say: 'Order goes through the Product interface instead.',
					send: [['os', 'pi']],
					light: ['pi']
				},
				{
					say: 'The Product module decides how to answer, so its insides can change freely.',
					send: [
						['pi', 'ps'],
						['ps', 'pr']
					],
					light: ['ps']
				}
			]
		}
	},
	{
		id: 'dto',
		title: 'DTOs: share only what is needed',
		summary:
			'A Model usually holds everything about a record, including things a caller should never see. Returning it directly is a common way data leaks. A Data Transfer Object carries only the fields one request needs.',
		points: [
			[
				'Excessive data exposure',
				'sending a whole object when the client asked for a small part of it.'
			],
			['External DTO', 'what other modules and clients may see.'],
			['Internal DTO', 'richer data used only inside a module.'],
			['Different views', 'a dropdown and a profile page can use different DTOs from one Model.']
		],
		tip: 'Never return a Model from a Controller. Decide field by field what leaves the module.',
		sketch: {
			kind: 'Data flow diagram',
			alt: 'A user model holds name, avatar, email and card number. The DTO passes on only the name and avatar, so the client never sees the rest.',
			h: 190,
			nodes: [
				{
					id: 'm',
					label: 'User Model\nname, avatar\nemail, card no.',
					x: 80,
					y: 95,
					w: 148,
					h: 92,
					fill: 'pink'
				},
				{
					id: 'd',
					label: 'Friend DTO\nname, avatar',
					x: 250,
					y: 95,
					w: 112,
					h: 72,
					fill: 'yellow'
				},
				{ id: 'c', label: 'Friend list\nscreen', x: 415, y: 95, w: 110, h: 72, fill: 'sky' }
			],
			edges: [
				{ from: 'm', to: 'd' },
				{ from: 'd', to: 'c' }
			],
			steps: [
				{ say: 'The screen only needs to show a list of friends.', light: ['c'] },
				{
					say: 'Without a DTO, the whole Model is sent, card number included.',
					hide: ['d'],
					send: [['m', 'c']],
					down: ['m']
				},
				{
					say: 'The browser never used that field, but anyone can read it in the network tab.',
					hide: ['d'],
					light: ['c'],
					set: { c: 'Card no.\nexposed!' }
				},
				{
					say: 'With a DTO, the service copies just the two fields the screen needs.',
					send: [['m', 'd']],
					light: ['d']
				},
				{
					say: 'Only those fields leave the system. Sensitive data has no way out.',
					send: [['d', 'c']],
					light: ['c']
				}
			]
		}
	},
	{
		id: 'service-discovery',
		title: 'API Gateway and Service Discovery',
		summary:
			'Run each module as its own application and you have microservices, along with new problems. Clients would need to know every address, and in the cloud those addresses change on every restart. A gateway gives clients one address, and a registry keeps track of where each service is.',
		points: [
			['API Gateway', 'one front door for routing, filters and rate limits.'],
			['Service Discovery', 'each service registers its name and address when it starts.'],
			['Call by name', 'clients ask for order-service, not for an IP address.'],
			[
				'Spring example',
				'Eureka is the registry, and a gateway route such as lb://order-service looks it up.'
			]
		],
		tip: 'If a service URL contains an IP address or localhost, discovery is not really being used.',
		sketch: {
			kind: 'C4 Container diagram',
			alt: 'A gateway asks Service Discovery where the order service is. After a restart the service registers a new address and traffic keeps flowing.',
			h: 200,
			nodes: [
				{ id: 'fe', label: 'Frontend', x: 62, y: 100, w: 104, h: 56, fill: 'sky' },
				{ id: 'gw', label: 'API\nGateway', x: 215, y: 100, w: 104, h: 66, fill: 'yellow' },
				{ id: 'sd', label: 'Service\nDiscovery', x: 215, y: 32, w: 104, h: 56, fill: 'pink' },
				{ id: 'os', label: 'Order service\n10.0.0.7', x: 400, y: 100, w: 140, h: 66, fill: 'mint' }
			],
			edges: [
				{ from: 'fe', to: 'gw', label: 'one URL' },
				{ from: 'gw', to: 'os' },
				{ from: 'os', to: 'sd', label: 'registers', dashed: true }
			],
			steps: [
				{
					say: 'When it starts, the service tells the registry its name and address.',
					send: [['os', 'sd']],
					light: ['sd']
				},
				{
					say: 'The frontend knows only one address: the gateway.',
					send: [['fe', 'gw']],
					light: ['gw']
				},
				{
					say: 'The gateway asks the registry where order-service is, then forwards the request.',
					send: [
						['gw', 'sd'],
						['gw', 'os']
					],
					light: ['os']
				},
				{
					say: 'The service restarts and gets a new address, so old hard-coded URLs would now fail.',
					set: { os: 'Order service\n10.0.0.92' },
					light: ['os'],
					send: [['os', 'sd']]
				},
				{
					say: 'The registry already has the new address, so the frontend never notices.',
					set: { os: 'Order service\n10.0.0.92' },
					send: [
						['fe', 'gw'],
						['gw', 'os']
					]
				}
			]
		}
	},
	{
		id: 'database-per-service',
		title: 'One database per service',
		summary:
			'Sharing a single database across microservices creates a bottleneck, and quietly couples them back together. Giving each service its own database means each one can scale and fail on its own.',
		points: [
			['Scale by need', 'grow the orders database for a sale without touching anything else.'],
			['Stronger security', 'a compromised service can reach only its own data.'],
			['Clear ownership', 'other services must ask through an API or an event.'],
			['The cost', 'no joins across services, and keeping data consistent gets harder.']
		],
		tip: 'If two services read the same table, they are one service wearing two names.',
		sketch: {
			kind: 'C4 Container diagram',
			alt: 'The order and product services each have their own database. During a sale, only the order database is scaled.',
			h: 200,
			nodes: [
				{ id: 'o', label: 'Order service', x: 100, y: 45, w: 150, h: 52, fill: 'yellow' },
				{ id: 'p', label: 'Product service', x: 360, y: 45, w: 150, h: 52, fill: 'sky' },
				{ id: 'od', label: 'Orders DB', x: 100, y: 150, w: 130, h: 76, shape: 'db', fill: 'mint' },
				{ id: 'pd', label: 'Products DB', x: 360, y: 150, w: 130, h: 76, shape: 'db', fill: 'mint' }
			],
			edges: [
				{ from: 'o', to: 'od' },
				{ from: 'p', to: 'pd' },
				{ from: 'o', to: 'p', label: 'API', dashed: true }
			],
			steps: [
				{
					say: 'Each service owns its own data.',
					send: [
						['o', 'od'],
						['p', 'pd']
					]
				},
				{ say: 'A big sale floods the order service.', light: ['o'], send: [['o', 'od']] },
				{
					say: 'You scale just the orders database, and products are left alone.',
					set: { od: 'Orders DB\nx 5' },
					light: ['od']
				},
				{
					say: 'Orders needs a product name, so it asks the Product service, not its database.',
					set: { od: 'Orders DB\nx 5' },
					send: [
						['o', 'p'],
						['p', 'pd']
					]
				}
			]
		}
	},
	{
		id: 'kafka',
		title: 'REST or Kafka between services',
		summary:
			'With REST, the caller waits for each service in turn, so a slow service slows the whole chain. With Kafka, a service writes an event to a durable log and moves on. Other services read it when they are ready.',
		points: [
			['Topic', 'a named stream of events, stored on disk.'],
			['Partition', 'a topic is split so many consumers can share the work.'],
			[
				'Consumer group',
				'consumers in a group divide the partitions, so each event is handled once per group.'
			],
			[
				'Replica',
				'copies of each partition on other brokers. If one broker dies, a copy takes over.'
			],
			['When to use which', 'REST when the caller needs an answer now, events when it does not.']
		],
		tip: 'Events can arrive twice, so make consumers safe to run again with the same event.',
		sketch: {
			kind: 'Data flow diagram',
			alt: 'The order service writes an event to a Kafka topic. Billing and email consumers read it. A broker failure is covered by a replica.',
			h: 205,
			nodes: [
				{ id: 'o', label: 'Order service', x: 75, y: 100, w: 130, h: 58, fill: 'sky' },
				{
					id: 'k',
					label: 'Kafka topic\norder-placed',
					x: 250,
					y: 60,
					w: 130,
					h: 66,
					fill: 'yellow'
				},
				{ id: 'r', label: 'Replica', x: 250, y: 165, w: 130, h: 44, fill: 'pink' },
				{ id: 'b', label: 'Billing', x: 415, y: 45, w: 110, h: 50, fill: 'mint' },
				{ id: 'e', label: 'Email', x: 415, y: 150, w: 110, h: 50, fill: 'mint' }
			],
			edges: [
				{ from: 'o', to: 'k' },
				{ from: 'k', to: 'b' },
				{ from: 'k', to: 'e' },
				{ from: 'k', to: 'r', dashed: true }
			],
			steps: [
				{
					say: 'The order service writes one event, and replies to the user straight away.',
					send: [['o', 'k']],
					light: ['k']
				},
				{
					say: 'Kafka copies the event to a replica on another broker.',
					send: [['k', 'r']],
					light: ['r']
				},
				{
					say: 'Each consumer group reads the event at its own speed.',
					send: [
						['k', 'b'],
						['k', 'e']
					]
				},
				{
					say: 'The Email service goes down. Orders keep working, and events wait in the log.',
					down: ['e'],
					send: [['o', 'k']]
				},
				{
					say: 'When it returns, Email carries on from where it stopped. Nothing is lost.',
					send: [['k', 'e']],
					light: ['e']
				}
			]
		}
	},
	{
		id: 'frontend-styles',
		title: 'Frontend architecture styles',
		summary:
			'Frontends need structure as much as backends do. The usual path runs from technical layers, to components grouped by business domain, to headless components where behaviour is completely separate from appearance.',
		points: [
			[
				'Layer-based',
				'separate folders for UI, handlers, API calls and state. Simple, but one feature ends up spread across all of them.'
			],
			[
				'Modularized component',
				'each domain, such as Cart, holds its own UI, Hook, API calls and state.'
			],
			['Headless component', 'a reusable piece with behaviour and no styling of its own.'],
			['Shared parts', 'keep one config for backend URLs, and one helper for all requests.']
		],
		tip: 'A headless component should know nothing about your business. If it mentions a product, it is not headless.',
		sketch: {
			kind: 'Component diagram',
			alt: 'One headless data list provides paging and state. A product table and a tour card grid both use it with different styling.',
			h: 200,
			nodes: [
				{
					id: 'h',
					label: 'useDataList\npaging + state',
					x: 240,
					y: 45,
					w: 170,
					h: 68,
					fill: 'yellow'
				},
				{
					id: 'a',
					label: 'Product table\nits own style',
					x: 105,
					y: 155,
					w: 170,
					h: 66,
					fill: 'sky'
				},
				{ id: 'b', label: 'Tour cards\nits own style', x: 375, y: 155, w: 170, h: 66, fill: 'mint' }
			],
			edges: [
				{ from: 'a', to: 'h' },
				{ from: 'b', to: 'h' }
			],
			steps: [
				{ say: 'A headless hook handles paging and state, and draws nothing.', light: ['h'] },
				{
					say: 'The product table uses it and decides how rows should look.',
					send: [['a', 'h']],
					light: ['a']
				},
				{
					say: 'The tour cards reuse the same logic with a completely different look.',
					send: [['b', 'h']],
					light: ['b']
				},
				{
					say: 'Fix a paging bug once, and both screens get the fix.',
					set: { h: 'useDataList\nbug fixed' },
					send: [
						['h', 'a'],
						['h', 'b']
					],
					light: ['h']
				}
			]
		}
	},
	{
		id: 'four-plus-one',
		title: 'The 4+1 view model',
		summary:
			"One diagram cannot satisfy everyone, because a developer, a tester and an operations engineer ask different questions. Philippe Kruchten's 4+1 model describes one system from four views, then ties them together with scenarios.",
		points: [
			['Logical view', 'what the system does, for end users. Class diagrams fit here.'],
			['Process view', 'what runs at the same time, for performance and scaling.'],
			['Development view', 'how the code is organised, for programmers.'],
			['Physical view', 'what runs on which machine, for system engineers.'],
			[
				'Scenarios',
				'the +1. Key use cases that walk through the other four views and check they agree.'
			]
		],
		tip: 'Pick the views your audience needs. A small system can often merge a few of them.',
		links: [['4+1 view model', 'https://en.wikipedia.org/wiki/4%2B1_architectural_view_model']],
		sketch: {
			kind: '4+1 view model',
			alt: 'Scenarios sit at the centre of four views: logical, development, process and physical.',
			h: 205,
			nodes: [
				{ id: 's', label: 'Scenarios', x: 240, y: 102, w: 120, h: 60, fill: 'yellow' },
				{ id: 'l', label: 'Logical\nfunctionality', x: 80, y: 42, w: 140, h: 62, fill: 'sky' },
				{
					id: 'd',
					label: 'Development\ncode structure',
					x: 400,
					y: 42,
					w: 140,
					h: 62,
					fill: 'mint'
				},
				{ id: 'p', label: 'Process\nconcurrency', x: 80, y: 162, w: 140, h: 62, fill: 'mint' },
				{ id: 'f', label: 'Physical\nmachines', x: 400, y: 162, w: 140, h: 62, fill: 'sky' }
			],
			edges: [
				{ from: 's', to: 'l', plain: true },
				{ from: 's', to: 'd', plain: true },
				{ from: 's', to: 'p', plain: true },
				{ from: 's', to: 'f', plain: true }
			],
			steps: [
				{ say: 'Take one scenario: a customer places an order.', light: ['s'] },
				{
					say: 'Logical: which objects are involved? Order, Customer and Product.',
					send: [['s', 'l']],
					light: ['l']
				},
				{
					say: 'Process: what runs in parallel? Payment and stock checks at the same time.',
					send: [['s', 'p']],
					light: ['p']
				},
				{
					say: 'Development: which package holds this code, and which team owns it?',
					send: [['s', 'd']],
					light: ['d']
				},
				{
					say: 'Physical: which servers does the request actually touch?',
					send: [['s', 'f']],
					light: ['f']
				}
			]
		}
	},
	{
		id: 'diagram-choice',
		part: C4,
		title: 'Which diagram should you draw?',
		summary:
			'A good diagram answers one question at one level of detail. The C4 model is the most widely used standard because it makes you choose your zoom level: Context, Container, Component, Code. The next four notes draw the same online shop at each level.',
		points: [
			[
				'Always include',
				'the parts that matter, arrows with direction and protocol, outside systems, and a clear title.'
			],
			['Worth adding', 'notes on how each part fails or scales, and why it was chosen.'],
			[
				'Keep it in code',
				'tools like Structurizr and Mermaid let you version diagrams alongside the code.'
			]
		],
		tip: 'One diagram, one question. If it needs a long explanation, split it into two.',
		table: {
			head: ['Question', 'Diagram'],
			rows: [
				['Who uses it? What does it talk to?', 'C4 Context'],
				['What runs, and on what technology?', 'C4 Container'],
				['What is inside one container?', 'C4 Component'],
				['How is one part coded?', 'C4 Code (UML class)'],
				['What happens over time?', 'Sequence diagram'],
				['Where does it all run?', 'Deployment diagram'],
				['How is data related?', 'Entity relationship diagram'],
				['What states can it be in?', 'State diagram']
			]
		},
		links: [['The C4 model', 'https://c4model.com/']],
		sketch: {
			kind: 'C4 zoom levels',
			alt: 'The four C4 levels in order: Context, Container, Component and Code. Each one zooms further in.',
			h: 195,
			nodes: [
				{ id: 'l1', label: 'Level 1\nContext', x: 115, y: 48, w: 170, h: 66, fill: 'sky' },
				{ id: 'l2', label: 'Level 2\nContainer', x: 365, y: 48, w: 170, h: 66, fill: 'yellow' },
				{ id: 'l3', label: 'Level 3\nComponent', x: 365, y: 150, w: 170, h: 66, fill: 'mint' },
				{ id: 'l4', label: 'Level 4\nCode', x: 115, y: 150, w: 170, h: 66, fill: 'pink' }
			],
			edges: [
				{ from: 'l1', to: 'l2', label: 'zoom in' },
				{ from: 'l2', to: 'l3', label: 'zoom in' },
				{ from: 'l3', to: 'l4', label: 'zoom in' }
			],
			steps: [
				{
					say: 'Context is the view for everyone, including people who do not write code.',
					light: ['l1']
				},
				{
					say: 'Container zooms into the system to show what runs: apps, APIs and databases.',
					send: [['l1', 'l2']],
					light: ['l2']
				},
				{
					say: 'Component zooms into one container to show its main parts.',
					send: [['l2', 'l3']],
					light: ['l3']
				},
				{
					say: 'Code zooms into one component. It is rarely worth drawing by hand.',
					send: [['l3', 'l4']],
					light: ['l4']
				}
			]
		}
	},
	{
		id: 'c4-context',
		title: 'C4 level 1: System Context',
		summary:
			'The big picture. Your whole system is one box, surrounded by the people who use it and the outside systems it depends on. Anyone in the company should be able to read this one.',
		points: [
			['Shows', 'people, your system, and external systems.'],
			['Hides', 'all technology. No databases, no frameworks.'],
			['Audience', 'everyone, including managers and customers.']
		],
		tip: 'If you only ever draw one diagram, make it this one.',
		sketch: {
			kind: 'C4 Context diagram',
			alt: 'A shopper uses the online shop. The shop takes card payments through a payment provider and sends receipts through an email service.',
			h: 205,
			nodes: [
				{ id: 'user', label: 'Shopper\n[person]', x: 40, y: 75, shape: 'person' },
				{
					id: 'shop',
					label: 'Online Shop\n[software system]',
					x: 230,
					y: 100,
					w: 150,
					h: 84,
					fill: 'sky'
				},
				{ id: 'pay', label: 'Payment\nprovider', x: 415, y: 45, w: 116, h: 64, fill: 'pink' },
				{ id: 'mail', label: 'Email\nservice', x: 415, y: 155, w: 116, h: 64, fill: 'pink' }
			],
			edges: [
				{ from: 'user', to: 'shop', label: 'buys' },
				{ from: 'shop', to: 'pay', label: 'charges' },
				{ from: 'shop', to: 'mail', label: 'emails' }
			],
			steps: [
				{
					say: 'The whole system is one box. What is inside does not matter at this level.',
					light: ['shop']
				},
				{ say: 'A shopper places an order.', send: [['user', 'shop']], light: ['user'] },
				{
					say: 'The shop relies on an outside provider to take the money.',
					send: [['shop', 'pay']],
					light: ['pay']
				},
				{
					say: 'It relies on another to send the receipt. These dependencies are the point of this diagram.',
					send: [['shop', 'mail']],
					light: ['mail']
				}
			]
		}
	},
	{
		id: 'c4-container',
		title: 'C4 level 2: Container',
		summary:
			'Zoom into the shop. A container is anything that runs or stores data on its own: a web app, an API, a database, a queue. It has nothing to do with Docker specifically. This is where technology choices appear.',
		points: [
			['Shows', 'each app and data store, its technology, and how they talk.'],
			['Example styles', 'this shop mixes microservices, events and a serverless function.'],
			['Audience', 'developers, and operations and support staff.']
		],
		tip: 'Label every arrow with what it carries and how, like "JSON over HTTPS".',
		sketch: {
			kind: 'C4 Container diagram',
			alt: 'Inside the online shop, a web app calls the orders API and catalog search. The orders API writes to a database and publishes to an event bus, which triggers a receipts function.',
			h: 238,
			nodes: [
				{ id: 'shop', label: 'Online Shop', x: 268, y: 120, w: 410, h: 226, shape: 'boundary' },
				{ id: 'user', label: 'Shopper', x: 20, y: 72, shape: 'person' },
				{ id: 'web', label: 'Web app\n[SvelteKit]', x: 128, y: 72, w: 100, h: 58, fill: 'sky' },
				{ id: 'api', label: 'Orders API\n[Node]', x: 268, y: 72, w: 100, h: 58, fill: 'yellow' },
				{ id: 'bus', label: 'Event bus\n[Kafka]', x: 408, y: 72, w: 100, h: 58, fill: 'mint' },
				{ id: 'cat', label: 'Catalog\n[Search]', x: 128, y: 180, w: 100, h: 58, fill: 'sky' },
				{
					id: 'db',
					label: 'Orders DB\n[Postgres]',
					x: 268,
					y: 180,
					w: 104,
					h: 72,
					shape: 'db',
					fill: 'yellow'
				},
				{ id: 'fn', label: 'Receipts\n[Function]', x: 408, y: 180, w: 100, h: 58, fill: 'pink' }
			],
			edges: [
				{ from: 'user', to: 'web' },
				{ from: 'web', to: 'cat' },
				{ from: 'web', to: 'api' },
				{ from: 'api', to: 'db' },
				{ from: 'api', to: 'bus' },
				{ from: 'bus', to: 'fn' }
			],
			steps: [
				{
					say: 'The shopper searches for a product, and the web app asks the search engine.',
					send: [
						['user', 'web'],
						['web', 'cat']
					],
					light: ['cat']
				},
				{
					say: 'At checkout, the web app calls the Orders API.',
					send: [['web', 'api']],
					light: ['api']
				},
				{
					say: 'The order is saved first, because that must never be lost.',
					send: [['api', 'db']],
					light: ['db']
				},
				{
					say: 'The API publishes an OrderPlaced event and returns straight away.',
					send: [['api', 'bus']],
					light: ['bus']
				},
				{
					say: 'A small function reacts to the event and sends the receipt.',
					send: [['bus', 'fn']],
					light: ['fn']
				}
			]
		}
	},
	{
		id: 'c4-component',
		title: 'C4 level 3: Component',
		summary:
			'Zoom into one container, here the Orders API. A component is a group of related code behind a clear interface. Draw this only for containers that are complex enough to need it.',
		points: [
			['Shows', 'the main parts of one container and what each is responsible for.'],
			['Audience', 'the developers working on that container.'],
			['When to skip', 'small containers, where the code is already easy to follow.']
		],
		tip: 'Keep this level up to date by generating it, or do not keep it at all.',
		sketch: {
			kind: 'C4 Component diagram',
			alt: 'Inside the Orders API, the order controller calls the checkout service, which uses a payment client and an order repository. Those reach the payment provider and the orders database.',
			h: 305,
			nodes: [
				{ id: 'api', label: 'Orders API', x: 275, y: 100, w: 340, h: 192, shape: 'boundary' },
				{ id: 'web', label: 'Web\napp', x: 40, y: 72, w: 72, h: 58, fill: 'sky' },
				{ id: 'ctl', label: 'Order\ncontroller', x: 180, y: 72, w: 110, h: 58, fill: 'yellow' },
				{ id: 'svc', label: 'Checkout\nservice', x: 370, y: 72, w: 110, h: 58, fill: 'yellow' },
				{ id: 'repo', label: 'Order\nrepository', x: 180, y: 165, w: 110, h: 58, fill: 'mint' },
				{ id: 'cli', label: 'Payment\nclient', x: 370, y: 165, w: 110, h: 58, fill: 'mint' },
				{ id: 'db', label: 'Orders DB', x: 180, y: 268, w: 110, h: 66, shape: 'db' },
				{ id: 'pay', label: 'Payment\nprovider', x: 370, y: 268, w: 110, h: 60, fill: 'pink' }
			],
			edges: [
				{ from: 'web', to: 'ctl' },
				{ from: 'ctl', to: 'svc' },
				{ from: 'svc', to: 'repo' },
				{ from: 'svc', to: 'cli' },
				{ from: 'repo', to: 'db' },
				{ from: 'cli', to: 'pay' }
			],
			steps: [
				{
					say: 'The controller receives the HTTP request and checks it is well formed.',
					send: [['web', 'ctl']],
					light: ['ctl']
				},
				{
					say: 'The checkout service holds the actual business rules.',
					send: [['ctl', 'svc']],
					light: ['svc']
				},
				{
					say: 'It charges the card through the payment client.',
					send: [
						['svc', 'cli'],
						['cli', 'pay']
					],
					light: ['cli']
				},
				{
					say: 'The repository saves the order. It is the only component that knows SQL.',
					send: [
						['svc', 'repo'],
						['repo', 'db']
					],
					light: ['repo']
				}
			]
		}
	},
	{
		id: 'c4-code',
		title: 'C4 level 4: Code',
		summary:
			'Zoom into one component to see classes and interfaces. Most teams skip this level, because good tools can generate it and the code itself says the same thing.',
		points: [
			['Shows', 'classes, interfaces and how they relate.'],
			['Audience', 'the developers changing that exact code.'],
			['When to use it', 'for the tricky corner of a system, not everywhere.']
		],
		tip: 'Draw this level only for code that keeps confusing people.',
		sketch: {
			kind: 'C4 Code diagram (UML class)',
			alt: 'CheckoutService creates an Order and calls the PaymentClient interface. CardPayments implements that interface.',
			h: 225,
			nodes: [
				{
					id: 'svc',
					label: 'CheckoutService\n+ placeOrder()',
					x: 118,
					y: 50,
					w: 190,
					h: 70,
					fill: 'yellow'
				},
				{
					id: 'port',
					label: '«interface»\nPaymentClient\n+ charge()',
					x: 362,
					y: 50,
					w: 180,
					h: 84,
					fill: 'sky'
				},
				{ id: 'order', label: 'Order\n+ total()', x: 118, y: 180, w: 190, h: 70, fill: 'mint' },
				{
					id: 'card',
					label: 'CardPayments\n+ charge()',
					x: 362,
					y: 180,
					w: 180,
					h: 70,
					fill: 'mint'
				}
			],
			edges: [
				{ from: 'svc', to: 'port', label: 'calls' },
				{ from: 'svc', to: 'order', label: 'creates' },
				{ from: 'card', to: 'port', label: 'implements', dashed: true }
			],
			steps: [
				{
					say: 'placeOrder() starts by creating an Order.',
					send: [['svc', 'order']],
					light: ['order']
				},
				{
					say: 'It charges through an interface, so it never depends on one payment company.',
					send: [['svc', 'port']],
					light: ['port']
				},
				{
					say: 'CardPayments is the real implementation behind that interface.',
					send: [['card', 'port']],
					light: ['card']
				},
				{
					say: 'Swap it for a fake in tests, and CheckoutService does not change.',
					set: { card: 'FakePayments\n+ charge()' },
					light: ['card']
				}
			]
		}
	}
];
