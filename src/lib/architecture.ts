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
		links: [['Software architecture guide', 'https://martinfowler.com/architecture/']],
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
					title: 'The widest view',
					say: 'System architecture is the widest view: servers, networks, outside systems and the software, all together.',
					detail:
						'At this level you draw everything the product depends on, not just code: machines, networks, third-party services and the links between them. It is the picture an operations team or an auditor needs, because outages often start outside the code, for example when a DNS or payment provider goes down.',
					light: ['infra', 'ext']
				},
				{
					title: 'Zoom into the software',
					say: 'Zoom in. Software architecture looks at one application and how its parts are organised.',
					detail:
						'The servers and outside systems drop away and you look at how one application is split up, such as a UI layer that calls an API layer. The questions change too: which part owns which job, and which calls are allowed. A rule like "the UI never talks to the database" lives at this level.',
					hide: ['infra', 'ext'],
					light: ['ui', 'api'],
					send: [['ui', 'api']]
				},
				{
					title: 'Zoom into one part',
					say: 'Zoom in again. System design explains how one part really works.',
					detail:
						'System design picks one piece, like checkout, and explains its inner workings: the data it keeps, the steps it runs and how it handles errors. This is where you decide details such as retrying a failed payment call or holding stock while an order completes.',
					hide: ['infra', 'ext', 'ui'],
					light: ['fn'],
					send: [['api', 'fn']]
				},
				{
					title: 'Pick your level',
					say: 'Same system, three levels of detail. Pick the level that fits the question you are answering.',
					detail:
						'None of the three views is right on its own. A question about an outage usually needs the widest view, while a bug in checkout needs the closest one. Mixing levels in one drawing is the usual reason a diagram turns into an unreadable wall of boxes.',
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
		links: [
			[
				'Azure architecture fundamentals',
				'https://learn.microsoft.com/en-us/azure/architecture/guide/'
			]
		],
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
					title: 'Arrive at an interface',
					say: 'A request arrives at an interface: the contract that says what callers may ask for.',
					detail:
						'An interface is an agreement: which operations exist, what data they take and what they return, such as POST /orders with a JSON body. Callers depend only on this contract, so the code behind it can be rewritten as long as the contract still holds.',
					light: ['iface']
				},
				{
					title: 'Run the business rules',
					say: 'The software does the work and applies the business rules.',
					detail:
						'The software decides what the request means, for example whether this customer may order and what it should cost. It usually keeps no state between requests, so the same code can run on one machine or twenty and behave the same way.',
					light: ['sw'],
					send: [['iface', 'sw']]
				},
				{
					title: 'Read and write data',
					say: 'It reads and writes data, the part of the system that must outlive everything else.',
					detail:
						'Code is redeployed many times a week, but an order placed today must still be correct in ten years. That is why data needs backups, migrations and clear ownership. A bad deploy can be rolled back in minutes, while corrupted data can take days to repair.',
					light: ['data'],
					send: [['sw', 'data']]
				},
				{
					title: 'Run on infrastructure',
					say: 'All of it runs on infrastructure, so its limits become your limits.',
					detail:
						'Every request uses CPU, memory, disk and network on some machine, even in the cloud. If a cloud disk is rated at 3,000 operations per second, no clever code makes it do 30,000. Knowing those ceilings early stops you designing for a speed the hardware cannot give.',
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
		links: [
			[
				'Web API design',
				'https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design'
			],
			['Introduction to gRPC', 'https://grpc.io/docs/what-is-grpc/introduction/'],
			['Learn GraphQL', 'https://graphql.org/learn/']
		],
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
					title: 'One front door',
					say: 'The web and mobile apps both call one front door instead of knowing every service.',
					detail:
						'Without a gateway, every client would need the address and API style of every service, and moving a service would break apps already installed on phones. Here both clients send plain REST over HTTPS to one host name, such as api.example.com, and the gateway hides what sits behind it.',
					send: [
						['web', 'gw'],
						['mobile', 'gw']
					],
					light: ['gw']
				},
				{
					title: 'Check login and limits',
					say: 'The gateway checks the login and the rate limit before anything else runs.',
					detail:
						'The gateway validates the token on each request, often a signed JWT, so the services do not each repeat that work. It also counts requests per client, for example 100 a minute, usually in a shared store like Redis so every gateway copy sees the same total.',
					set: { gw: 'Auth OK\nLimit OK' },
					light: ['gw']
				},
				{
					title: 'Route over gRPC',
					say: 'It routes the call to the right service over fast internal gRPC.',
					detail:
						'Inside the network the gateway switches to gRPC, which sends compact binary Protocol Buffers over HTTP/2 instead of JSON text. Both sides share a .proto file that describes every call, so client code is generated rather than written by hand.',
					send: [['gw', 'orders']],
					light: ['orders']
				},
				{
					title: 'Turn away extra calls',
					say: 'A caller over its rate limit gets turned away here, so the services behind never feel it.',
					detail:
						'Once a client passes its limit, the gateway answers with HTTP 429 Too Many Requests, often with a Retry-After header saying when to try again. The request never reaches Users or Orders, so one runaway script cannot use up capacity meant for everyone else.',
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
		links: [
			['Monolithic architecture', 'https://microservices.io/patterns/monolithic.html'],
			['Monolith first', 'https://martinfowler.com/bliki/MonolithFirst.html']
		],
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
					title: 'Plain function calls',
					say: 'A request passes through the modules as plain function calls, which is fast and simple.',
					detail:
						'Inside one process, moving from the UI module to Orders is an ordinary function call that takes nanoseconds and cannot get lost on a network. There is no converting to JSON, no timeouts and no retries to write, which is a big part of why monoliths are quick to build.',
					send: [
						['user', 'ui'],
						['ui', 'orders']
					]
				},
				{
					title: 'One shared database',
					say: 'Everything shares one database, so a transaction across modules is easy.',
					detail:
						'Because orders and payments live in the same database, one transaction can write both and then either commit both or roll both back. The database gives you that guarantee for free, where microservices would need a saga to get something close.',
					send: [['orders', 'db']],
					light: ['db']
				},
				{
					title: 'A bug in Payments',
					say: 'Now a bug appears in Payments, and the process crashes.',
					detail:
						'All modules share one process, one block of memory and one pool of threads. An unhandled error, a memory leak or an endless loop in Payments therefore hits the same runtime that serves the UI and Orders, with no wall between them.',
					light: ['pay'],
					send: [['orders', 'pay']]
				},
				{
					title: 'Everything goes down',
					say: 'Because it is one unit, the whole app goes down with it.',
					detail:
						'Users who only wanted to browse now get errors too, because the browsing code was in the crashed process. Running several copies behind a load balancer helps with random crashes, but a bug that crashes one copy will usually crash them all.',
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
		links: [
			[
				'Client-server overview (MDN)',
				'https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview'
			]
		],
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
					title: 'The browser asks',
					say: 'The browser asks the server for a list of orders.',
					detail:
						'The browser sends an HTTP request made of a method, a path and some headers, here GET /orders. GET means "read only", so it should not change anything on the server and is safe to repeat if the network drops.',
					send: [['c1', 's1']],
					light: ['c']
				},
				{
					title: 'The server queries',
					say: 'The server does not hold the data itself, so it queries the database.',
					detail:
						'Keeping data in a database rather than in the server process means any copy of the server can answer any request. The server builds a SQL query, ideally with parameters rather than pasted-in text, which is what protects it from SQL injection.',
					send: [['s2', 'd2']],
					light: ['s']
				},
				{
					title: 'Rows come back',
					say: 'The rows come back.',
					detail:
						'The database returns a result set, a table of rows that match the query. The server should ask only for what it needs, for example with LIMIT 50, because pulling a whole table across the network is a common cause of slow pages.',
					send: [['d3', 's3']],
					light: ['d']
				},
				{
					title: 'Send the response',
					say: 'The server turns them into a response. Time flows down the page in this kind of diagram.',
					detail:
						'The server converts the rows into JSON or HTML and replies with a status code, here 200 OK for success. Each vertical line is one participant, and reading top to bottom shows the browser waiting for the whole round trip before it can draw anything.',
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
		links: [
			['Microservices (Fowler and Lewis)', 'https://martinfowler.com/articles/microservices.html'],
			['Microservice architecture', 'https://microservices.io/patterns/microservices.html']
		],
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
					title: 'Route to the owner',
					say: 'The gateway routes each request to the service that owns it.',
					detail:
						'The gateway matches the request path, such as /orders/42, to the service responsible for orders. Each service owns one clear area of the business, so its team can change and deploy it without asking the others.',
					send: [['gw', 'orders']]
				},
				{
					title: 'Call across the network',
					say: 'Orders needs a payment, so it makes a call across the network.',
					detail:
						'What was a function call in a monolith is now an HTTP or gRPC request that can be slow, time out or fail halfway. Orders must set a timeout, often a second or two, and decide what to do when no answer comes back.',
					send: [['orders', 'pay']],
					light: ['pay']
				},
				{
					title: 'Own your data',
					say: 'Each service owns its own data. Nobody else reaches into its database.',
					detail:
						'Payments keeps its data in Pay DB and no other service has the credentials. If Orders needs payment details, it asks the Payments API. That keeps the table layout private, so Payments can change its schema without breaking another team.',
					send: [
						['orders', 'odb'],
						['pay', 'pdb']
					]
				},
				{
					title: 'Survive a failure',
					say: 'Payments fails. Orders still works, as long as it handles the failed call.',
					detail:
						'Because the services run as separate processes, a crash in Payments does not kill Orders. Orders still has to cope, for example by marking the order as awaiting payment and retrying later, and a circuit breaker stops it waiting on a service that is clearly down.',
					down: ['pay', 'pdb'],
					send: [['gw', 'orders']]
				},
				{
					title: 'Scale one service',
					say: 'Black Friday hits Orders, so you scale just that service.',
					detail:
						'You run three copies of Orders behind a load balancer and leave Payments at one. That only works if Orders keeps no session state in memory, so any copy can serve any request. In Kubernetes it is a change to one replica count.',
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
		links: [
			[
				'What do you mean by event-driven?',
				'https://martinfowler.com/articles/201701-event-driven.html'
			],
			[
				'Event-driven style',
				'https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/event-driven'
			]
		],
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
					title: 'Publish a fact',
					say: 'Checkout publishes a fact: OrderPlaced. It does not know or care who is listening.',
					detail:
						'Checkout writes a small message, such as OrderPlaced with an order id, to the event bus and carries on. It keeps no list of receivers, so it never waits on them and never breaks when one of them is slow or offline.',
					hide: ['c'],
					send: [['co', 'bus']]
				},
				{
					title: 'Each subscriber reacts',
					say: 'Every subscriber gets its own copy and reacts in its own time.',
					detail:
						'Billing and Shipping each subscribe and receive their own copy. A slow shipping service just falls behind for a while instead of blocking billing. Most buses deliver at least once, so a consumer must cope with seeing the same event twice.',
					hide: ['c'],
					send: [
						['bus', 'a'],
						['bus', 'b']
					]
				},
				{
					title: 'Add a new listener',
					say: 'Later you add Analytics. Checkout does not change at all.',
					detail:
						'Analytics subscribes to the same OrderPlaced events with no code change and no deploy in Checkout. With a log-based bus like Kafka, a new subscriber can even start from older events still kept in the log and catch up on history.',
					light: ['c']
				},
				{
					title: 'Reach every subscriber',
					say: 'The next event reaches all three.',
					detail:
						'Now each OrderPlaced event fans out to three consumers. The cost shows when something goes wrong: to find out why a refund happened you need an id passed along in every event, because no single call stack shows the whole story.',
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
		links: [
			['Serverless architectures', 'https://martinfowler.com/articles/serverless.html'],
			['AWS Lambda', 'https://docs.aws.amazon.com/lambda/latest/dg/welcome.html']
		],
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
				{
					title: 'Scale to zero',
					say: 'No traffic means nothing is running, and you pay nothing.',
					detail:
						'With no events, the platform keeps no copies of your function running. You are billed per request and per slice of run time, per millisecond on AWS Lambda, so quiet hours cost almost nothing.',
					light: ['fn']
				},
				{
					title: 'Cold start',
					say: 'An event arrives. The platform starts a copy, which is the slight delay called a cold start.',
					detail:
						'For the first event, the platform has to find a machine, load your code and start the language runtime before your handler runs. That can add from about a hundred milliseconds to a few seconds, depending on the language and package size. Later events reuse the warm copy.',
					send: [['ev', 'fn']],
					set: { fn: 'Function\n1 running' }
				},
				{
					title: 'Scale out fast',
					say: 'A spike hits and the platform runs hundreds of copies at once.',
					detail:
						'Each copy usually handles one event at a time, so the platform starts more copies as events pile up. There are account limits, such as a default of 1,000 concurrent Lambda copies per region, and whatever sits behind them must cope with the same burst.',
					send: [['ev', 'fn']],
					set: { fn: 'Function\n500 running' },
					light: ['fn']
				},
				{
					title: 'Write the results',
					say: 'They all finish their work and write the results.',
					detail:
						'Functions keep nothing between runs, so anything that matters must go to outside storage. Five hundred copies writing at once can swamp a traditional database with connections, which is why teams often put a queue in between or use storage that scales the same way.',
					send: [['fn', 'db']],
					set: { fn: 'Function\n500 running' }
				},
				{
					title: 'Back to zero',
					say: 'Traffic stops, the copies disappear, and the bill stops too.',
					detail:
						'After a quiet period the platform shuts idle copies down, and you stop paying for them. The trade-off is that the next event pays the cold start again, which is why steady, heavy traffic is often cheaper on an always-on server.'
				}
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
		links: [
			[
				'Presentation, domain, data',
				'https://martinfowler.com/bliki/PresentationDomainDataLayering.html'
			],
			[
				'N-tier style',
				'https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/n-tier'
			]
		],
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
				{
					title: 'Enter at the top',
					say: 'The request enters at the top layer.',
					detail:
						'The presentation layer receives the click or HTTP request and turns it into a clean call, such as cancelOrder(42). It handles screen concerns like form error messages, but makes no decision about whether a cancellation is allowed.',
					send: [['user', 'ui']],
					light: ['ui']
				},
				{
					title: 'Hand down one layer',
					say: 'Each layer does its one job, then hands over to the layer below.',
					detail:
						'Business logic applies the rules, for example that orders can be cancelled until they ship. It calls only the layer directly below, so each layer depends on one neighbour, which keeps the code easier to follow and to test.',
					send: [['ui', 'logic']],
					light: ['logic']
				},
				{
					title: 'Hide the storage',
					say: 'Only the bottom layer knows how the data is stored.',
					detail:
						'The data access layer turns a request like "load order 42" into SQL and hands back plain objects. Since only this layer knows table names, you can add an index or rewrite a query without touching the rules or the screens.',
					send: [
						['logic', 'data'],
						['data', 'db']
					],
					light: ['data']
				},
				{
					title: 'Changes ripple',
					say: 'The weakness: adding one new field means touching every layer.',
					detail:
						'A new field such as a delivery note needs a database column, a change in data access, a rule in the logic and a box on the screen. That is four places, often owned by different people, which is why many teams group code by feature on top of the layers.',
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
		links: [
			['Hexagonal architecture (Cockburn)', 'https://alistair.cockburn.us/hexagonal-architecture']
		],
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
					title: 'Drive through an adapter',
					say: 'The web adapter translates an HTTP request into a call on the core.',
					detail:
						'The web adapter reads the URL, headers and JSON body, then calls a plain method on the core, like placeOrder(customerId, items). All the HTTP detail stops at the adapter, so the core never sees a request object or a status code.',
					send: [['web', 'core']],
					light: ['core']
				},
				{
					title: 'Call through a port',
					say: 'The core asks for "save this order" through a port. It has no idea what stores it.',
					detail:
						'A port is an interface the core owns, such as OrderRepository with a save method, and the Postgres adapter implements it. The dependency points inward: the adapter imports the core, never the other way round, which is the whole trick of the pattern.',
					send: [['core', 'db']]
				},
				{
					title: 'Swap the adapter',
					say: 'You move to MySQL by swapping one adapter. The core does not change.',
					detail:
						'You write a MySQL adapter for the same port and change which one is wired in at start-up. The business rules and their tests stay untouched. Moving the data itself is still real work, but the core is no longer in the way.',
					set: { db: 'MySQL\nadapter' },
					light: ['db'],
					send: [['core', 'db']]
				},
				{
					title: 'Test without infrastructure',
					say: 'Tests drive the same core with no web server or database at all.',
					detail:
						'A test adapter calls the core directly, and an in-memory fake stands in for the database port. These tests run in milliseconds with nothing to start up, so you can afford to check every business rule thoroughly.',
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
		links: [
			[
				'Architecture styles',
				'https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/'
			],
			['Monolith first', 'https://martinfowler.com/bliki/MonolithFirst.html']
		],
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
				{
					title: 'Start with the team',
					say: 'Start with your team, not the technology.',
					detail:
						"Team size and how the work is split decide more than any technology. Conway's law says a system tends to copy the communication structure of the organisation that builds it, so a style that fights your team shape will cost you every day.",
					light: ['q1']
				},
				{
					title: 'Stop at a monolith',
					say: 'A small team with one domain should stop here. A modular monolith is plenty.',
					detail:
						'With a few developers and one business area, a modular monolith gives clear boundaries without the network calls, pipelines and monitoring that many services need. If one module later has to stand alone, its boundary already exists.',
					send: [['q1', 'a1']],
					light: ['a1']
				},
				{
					title: 'Look at the workload',
					say: 'Otherwise, ask what your workload looks like.',
					detail:
						'The next question is how work arrives. Steady traffic from people clicking through pages suits long-running services, while sudden bursts or work set off by outside events suit a different shape.',
					send: [['q1', 'q2']],
					light: ['q2']
				},
				{
					title: 'Bursts and events',
					say: 'Bursts of work or streams of events point to serverless or event-driven designs.',
					detail:
						'Serverless functions cost nothing when idle and scale out on demand, which suits traffic that jumps from zero to thousands of requests. Event-driven designs suit flows where one thing happening, like a file upload, should start several separate jobs.',
					send: [['q2', 'a2']],
					light: ['a2']
				},
				{
					title: 'When services pay off',
					say: 'Many teams and steady, separate domains are where microservices earn their cost.',
					detail:
						'Microservices make sense when several teams need to deploy on their own schedule and the business areas really are separate. The price is tracing across services, versioned APIs and on-call duty for each one, so they pay off with dozens of engineers, not three.',
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
		links: [
			['Architecture decision records', 'https://adr.github.io/'],
			[
				'AWS Well-Architected',
				'https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html'
			]
		],
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
				{
					title: 'Write the requirements',
					say: 'Write down what the system must do and what limits it.',
					detail:
						'Requirements come in two kinds: what the system does, like taking payments, and the limits it works within, like answering in under 200 ms or staying up 99.9% of the time. That second kind, called non-functional requirements, is what shapes the architecture.',
					light: ['req']
				},
				{
					title: 'Choose the pattern',
					say: 'Let those constraints choose the pattern, not your preferences.',
					detail:
						'Each constraint rules options in or out. A rule that EU data stays in the EU limits where you can host, and a team of four rules out running twenty services. Writing the choice down in a short architecture decision record keeps the reasoning for later readers.',
					send: [['req', 'pat']],
					light: ['pat']
				},
				{
					title: 'Map the dependencies',
					say: 'Map what talks to what, so a small change does not turn into a surprise project.',
					detail:
						'List every service, database, queue and outside API, and draw which calls which. Hidden coupling, such as two services reading the same table, shows up on the map long before it shows up as an outage or a blocked release.',
					send: [['pat', 'dep']],
					light: ['dep']
				},
				{
					title: 'Plan for failure',
					say: 'Decide what happens when each part fails.',
					detail:
						'For each dependency, decide what happens when it is slow or down: a timeout, a retry with backoff, a fallback or a clear error. A circuit breaker stops calls to a failing service for a while, so one slow part does not tie up every caller.',
					send: [['dep', 'res']],
					light: ['res']
				},
				{
					title: 'Go round again',
					say: 'Then the business changes, and you go round again. Architecture is never finished.',
					detail:
						'New markets, more users or new laws change the constraints, so earlier choices need another look. Treat the architecture as a living document that is reviewed whenever a constraint moves, not a diagram signed off once and forgotten.',
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
		links: [
			['Strangler fig', 'https://martinfowler.com/bliki/StranglerFigApplication.html'],
			[
				'Strangler fig pattern',
				'https://learn.microsoft.com/en-us/azure/architecture/patterns/strangler-fig'
			]
		],
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
					title: 'Talk to one layer',
					say: 'The new front end talks only to the integration layer, never to the old system directly.',
					detail:
						'The new front end calls stable, modern endpoints on the integration layer and has no idea which system answers. That single point of contact is what later lets you move work from old to new without touching the front end at all.',
					hide: ['new'],
					send: [['ui', 'gw']]
				},
				{
					title: 'Translate the call',
					say: 'The layer translates the call into whatever the legacy system understands.',
					detail:
						'Legacy systems often speak SOAP, fixed-width files or stored procedures. The integration layer turns a modern JSON request into that format and maps the reply back, keeping the old quirks out of the new code. This piece is often called an anti-corruption layer.',
					hide: ['new'],
					send: [['gw', 'old']],
					light: ['old']
				},
				{
					title: 'Build one replacement',
					say: 'You build a replacement for one capability and run it alongside.',
					detail:
						'You pick a single capability, here billing, and rebuild it as a new service while the old one keeps running. Running both side by side lets you compare their results on real data before you trust the new one.',
					light: ['new']
				},
				{
					title: 'Shift the traffic',
					say: 'Traffic moves over. The front end never noticed.',
					detail:
						'The integration layer now routes billing calls to the new service, often a small share first, like 5%, then more as confidence grows. If something goes wrong, sending traffic back to the old system is a configuration change, not a code rollback.',
					send: [['gw', 'new']],
					light: ['new']
				},
				{
					title: 'Switch off the old part',
					say: 'When nothing uses the old part, you switch it off.',
					detail:
						'Once the logs show no calls reaching legacy billing, it can be retired along with its servers and licences. This slice-by-slice approach is the strangler fig pattern, named after a plant that slowly grows around a tree until it replaces it.',
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
		links: [
			['Technical debt', 'https://martinfowler.com/bliki/TechnicalDebt.html'],
			['Yagni', 'https://martinfowler.com/bliki/Yagni.html']
		],
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
				{
					title: 'Take a shortcut',
					say: 'A deadline is close, so someone takes a shortcut.',
					detail:
						"Under deadline pressure someone hardcodes a value or reads another module's table directly, because it works today. One shortcut is cheap. The cost is the interest: every later change has to work around it.",
					light: ['cut']
				},
				{
					title: 'Hidden coupling',
					say: 'Two parts now secretly depend on each other.',
					detail:
						'Changing one part now silently changes the other, but nothing in the code structure or the diagrams says so. These links are usually found only when something breaks, often in production, and often by someone who was not there when the shortcut was taken.',
					send: [['cut', 'tie']],
					light: ['tie']
				},
				{
					title: 'Changes slow down',
					say: 'A small refactor turns into a quarter-long project.',
					detail:
						'Each change now needs extra checks, meetings between teams and careful testing of parts that should be unrelated. Estimates grow, and under that pressure the quickest-looking fix is often another shortcut.',
					send: [['tie', 'slow']],
					light: ['slow']
				},
				{
					title: 'Diagrams go stale',
					say: 'Nobody has time to update the diagrams, so they stop matching reality.',
					detail:
						'Drawings kept in a slide deck are rarely updated after a busy release. Within weeks they describe a system that no longer exists, so newcomers learn the wrong picture and everyone else stops trusting diagrams at all.',
					send: [['slow', 'old']],
					light: ['old']
				},
				{
					title: 'Break the loop',
					say: 'With no clear picture, the next shortcut looks harmless. Break the loop by keeping the map current.',
					detail:
						'Diagrams written as code, in Mermaid or Structurizr for example, live in the same repository and get reviewed in the same pull request as the change. Some teams add architecture tests that fail the build when a forbidden dependency appears, which catches the next shortcut early.',
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
		links: [
			[
				'Deconstructing the monolith (Shopify)',
				'https://shopify.engineering/deconstructing-monolith-designing-software-maximizes-developer-productivity'
			]
		],
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
					title: 'Down its own layers',
					say: 'A request reaches the Order module and passes down its own layers.',
					detail:
						'Inside the Order module, the controller calls the order service, which uses the order repository. All three are private to Order, so the module behaves like a small application of its own inside the larger one.',
					send: [['oc', 'os']],
					light: ['os']
				},
				{
					title: 'Reach for the repository',
					say: 'Order needs a product price, and reaches straight for the Product repository.',
					detail:
						'Reading Product data straight from its repository is quick to write and works on day one. But it ties Order to how Product stores its data, so any change to that table or query now risks breaking orders too.',
					send: [['os', 'pr']],
					light: ['pr']
				},
				{
					title: 'Blocked at the boundary',
					say: 'That is blocked. The repository is private to the Product module.',
					detail:
						'The Product repository is not visible outside its module, so the call fails to compile or fails a boundary check in the build. In Java this can be package-private classes, or a tool such as ArchUnit or Spring Modulith that verifies module rules in a test.',
					down: ['pr']
				},
				{
					title: 'Use the interface',
					say: 'Order goes through the Product interface instead.',
					detail:
						'The Product interface offers a small, deliberate set of calls, such as getPrice(productId). It returns only what other modules need, usually as a DTO rather than the internal model, so the contract stays small and stable.',
					send: [['os', 'pi']],
					light: ['pi']
				},
				{
					title: 'Free to change inside',
					say: 'The Product module decides how to answer, so its insides can change freely.',
					detail:
						'Behind the interface, the Product team can add a cache, split a table or rewrite the service without telling anyone. If Product later becomes its own microservice, the interface becomes its API and callers barely change.',
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
		links: [
			['Data Transfer Object', 'https://martinfowler.com/eaaCatalog/dataTransferObject.html'],
			['Local DTO', 'https://martinfowler.com/bliki/LocalDTO.html']
		],
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
				{
					title: 'What the screen needs',
					say: 'The screen only needs to show a list of friends.',
					detail:
						'A friend list shows a name and a picture for each person, nothing more. Starting from what the consumer actually displays is the simplest way to decide which fields belong in a response.',
					light: ['c']
				},
				{
					title: 'Send the whole model',
					say: 'Without a DTO, the whole Model is sent, card number included.',
					detail:
						'Returning the model is tempting because most frameworks turn any object into JSON in one line. Every field comes along, including email and card number, and any field added to the model later will leak automatically too.',
					hide: ['d'],
					send: [['m', 'c']],
					down: ['m']
				},
				{
					title: 'Exposed in the browser',
					say: 'The browser never used that field, but anyone can read it in the network tab.',
					detail:
						'Not showing a field on screen does not protect it. Anyone can open the developer tools, look at the response in the Network tab and read every field. The OWASP API Security Top 10 has listed this as a major risk, first under the name excessive data exposure.',
					hide: ['d'],
					light: ['c'],
					set: { c: 'Card no.\nexposed!' }
				},
				{
					title: 'Copy only needed fields',
					say: 'With a DTO, the service copies just the two fields the screen needs.',
					detail:
						'The service builds a Friend DTO by copying just the name and avatar from the model. Because fields are added on purpose, a new sensitive column on the model stays private unless someone deliberately adds it to the DTO.',
					send: [['m', 'd']],
					light: ['d']
				},
				{
					title: 'Only safe data leaves',
					say: 'Only those fields leave the system. Sensitive data has no way out.',
					detail:
						"The response now holds exactly two fields per friend, which also makes it smaller and faster to send. A different screen, like the user's own profile page, can use a different DTO built from the same model.",
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
		links: [
			['API gateway pattern', 'https://microservices.io/patterns/apigateway.html'],
			['Server-side discovery', 'https://microservices.io/patterns/server-side-discovery.html']
		],
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
					title: 'Register at start-up',
					say: 'When it starts, the service tells the registry its name and address.',
					detail:
						'On boot the service sends its name, order-service, with its IP address and port to the registry. It then renews that entry with a heartbeat, every 30 seconds by default in Eureka, and an instance that stops renewing is dropped from the list.',
					send: [['os', 'sd']],
					light: ['sd']
				},
				{
					title: 'One known address',
					say: 'The frontend knows only one address: the gateway.',
					detail:
						"The frontend is configured with the gateway URL only. Services behind it can move, multiply or be split up without any change to the frontend build or to the apps already on users' phones.",
					send: [['fe', 'gw']],
					light: ['gw']
				},
				{
					title: 'Look up and forward',
					say: 'The gateway asks the registry where order-service is, then forwards the request.',
					detail:
						'The gateway sees a route like lb://order-service, asks the registry for live instances and picks one, spreading the load when there are several. It usually caches that list for a short time instead of asking the registry on every request.',
					send: [
						['gw', 'sd'],
						['gw', 'os']
					],
					light: ['os']
				},
				{
					title: 'New address after restart',
					say: 'The service restarts and gets a new address, so old hard-coded URLs would now fail.',
					detail:
						'In the cloud, a restarted container usually gets a fresh IP address from the network. Any config that pinned 10.0.0.7 would now send requests to nothing, and those calls would fail with connection errors or time out.',
					set: { os: 'Order service\n10.0.0.92' },
					light: ['os'],
					send: [['os', 'sd']]
				},
				{
					title: 'Traffic keeps flowing',
					say: 'The registry already has the new address, so the frontend never notices.',
					detail:
						'The new instance registered itself on start-up, so the next lookup returns 10.0.0.92. For a few seconds a cached list may still hold the old address, so gateways are usually set to retry another instance when a call fails to connect.',
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
		links: [
			['Database per service', 'https://microservices.io/patterns/data/database-per-service.html']
		],
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
					title: 'Separate databases',
					say: 'Each service owns its own data.',
					detail:
						'Only the order service has credentials for Orders DB, and only the product service for Products DB. Each team can also pick the database that fits, for example Postgres for orders and a search engine for product lookups.',
					send: [
						['o', 'od'],
						['p', 'pd']
					]
				},
				{
					title: 'Orders under load',
					say: 'A big sale floods the order service.',
					detail:
						'During a sale, order writes may jump tenfold while product data barely changes. With one shared database, that write load would slow product pages too, because both would compete for the same CPU, disk and connections.',
					light: ['o'],
					send: [['o', 'od']]
				},
				{
					title: 'Scale one database',
					say: 'You scale just the orders database, and products are left alone.',
					detail:
						'You give only Orders DB more capacity, for example a bigger machine or extra read replicas, shown here as x 5. Products DB keeps its normal size and cost, and the people browsing products never feel the sale.',
					set: { od: 'Orders DB\nx 5' },
					light: ['od']
				},
				{
					title: 'Ask, do not reach in',
					say: 'Orders needs a product name, so it asks the Product service, not its database.',
					detail:
						'Orders calls the Product API, which reads Products DB and returns the name. That adds a network call, so services often keep their own copy of data they need a lot, such as the product name at the moment the order was placed.',
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
		links: [['Apache Kafka introduction', 'https://kafka.apache.org/intro']],
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
					title: 'Write and reply',
					say: 'The order service writes one event, and replies to the user straight away.',
					detail:
						'The order service appends one message to the order-placed topic and answers the user without waiting for billing or email. With REST calls in a chain, the user would wait for every downstream service, one after another.',
					send: [['o', 'k']],
					light: ['k']
				},
				{
					title: 'Replicate the event',
					say: 'Kafka copies the event to a replica on another broker.',
					detail:
						'Each partition has a leader broker and follower copies on other brokers, often three copies in all. With the producer setting acks=all, a write is confirmed only once the in-sync copies have it, so losing one broker does not lose the event.',
					send: [['k', 'r']],
					light: ['r']
				},
				{
					title: 'Read at their own pace',
					say: 'Each consumer group reads the event at its own speed.',
					detail:
						'Billing and Email are separate consumer groups, so each receives every event. Each group stores its own offset, a bookmark saying how far it has read, so a fast group and a slow group never hold each other up.',
					send: [
						['k', 'b'],
						['k', 'e']
					]
				},
				{
					title: 'A consumer goes down',
					say: 'The Email service goes down. Orders keep working, and events wait in the log.',
					detail:
						'The order service does not notice that Email is down, because it only talks to Kafka. New events keep collecting in the topic, which keeps them for a set retention period, seven days by default.',
					down: ['e'],
					send: [['o', 'k']]
				},
				{
					title: 'Resume from the offset',
					say: 'When it returns, Email carries on from where it stopped. Nothing is lost.',
					detail:
						'On restart, Email reads its last committed offset and processes everything after it. If it crashed after sending an email but before committing, that event is read again, which is why consumers must be safe to run twice.',
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
		links: [
			['Headless component', 'https://martinfowler.com/articles/headless-component.html'],
			['Modularizing React apps', 'https://martinfowler.com/articles/modularizing-react-apps.html']
		],
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
				{
					title: 'A headless hook',
					say: 'A headless hook handles paging and state, and draws nothing.',
					detail:
						'A hook like useDataList holds the current page, page size, loading state and the fetched items, and offers functions such as nextPage(). It returns data and functions only, no HTML or CSS, so it has no opinion about how anything looks.',
					light: ['h']
				},
				{
					title: 'Style the product table',
					say: 'The product table uses it and decides how rows should look.',
					detail:
						'The product table calls the hook and draws its items as table rows with its own columns and styling. All the paging logic comes from the hook, so the table component is mostly markup.',
					send: [['a', 'h']],
					light: ['a']
				},
				{
					title: 'Reuse for tour cards',
					say: 'The tour cards reuse the same logic with a completely different look.',
					detail:
						'The tour card grid calls the same hook and draws each item as a card with a photo. Behaviour such as loading the next page stays identical, even though the two screens look nothing alike.',
					send: [['b', 'h']],
					light: ['b']
				},
				{
					title: 'Fix once, fix everywhere',
					say: 'Fix a paging bug once, and both screens get the fix.',
					detail:
						'Because paging lives in one place, a bug like skipping the last item on a page is fixed once and every screen using the hook gets the fix. Without the hook, each screen would carry its own copy of the logic, and its own copy of the bug.',
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
				{
					title: 'Pick a scenario',
					say: 'Take one scenario: a customer places an order.',
					detail:
						'A scenario is a concrete use case written as a short sequence of steps. Walking one scenario through each of the four views checks that they describe the same system, and shows up gaps, such as a step no view explains.',
					light: ['s']
				},
				{
					title: 'Logical view',
					say: 'Logical: which objects are involved? Order, Customer and Product.',
					detail:
						'The logical view shows the main concepts and how they relate: a Customer places an Order containing Products. It is what end users and analysts care about, and it is usually drawn as class or domain diagrams.',
					send: [['s', 'l']],
					light: ['l']
				},
				{
					title: 'Process view',
					say: 'Process: what runs in parallel? Payment and stock checks at the same time.',
					detail:
						'The process view shows what runs at the same time and how those parts talk. Checking payment and stock in parallel cuts waiting time, but raises new questions, such as what happens when one check passes and the other fails.',
					send: [['s', 'p']],
					light: ['p']
				},
				{
					title: 'Development view',
					say: 'Development: which package holds this code, and which team owns it?',
					detail:
						'The development view maps the design onto code: modules, packages, libraries and the teams that own them. It answers practical questions such as where a change should go and which builds it will trigger.',
					send: [['s', 'd']],
					light: ['d']
				},
				{
					title: 'Physical view',
					say: 'Physical: which servers does the request actually touch?',
					detail:
						'The physical view shows machines, containers and networks, such as a load balancer, two app servers and a database in another data centre. Operations engineers use it to plan capacity, failover and security boundaries.',
					send: [['s', 'f']],
					light: ['f']
				}
			]
		}
	},
	{
		id: 'saga',
		title: 'Sagas: transactions across services',
		summary:
			'With one database per service, a single transaction can no longer cover the order, the payment and the stock. A saga splits the work into local steps, one per service. If a later step fails, the earlier ones are undone by compensating actions that you write yourself.',
		points: [
			['Local transaction', 'each step commits in its own service, then the next step starts.'],
			[
				'Compensation',
				'a hand-written undo, like refunding a payment. It is a new action, not a rollback.'
			],
			[
				'Choreography',
				'each service reacts to the events of the others. No central brain, but the flow is hard to follow.'
			],
			[
				'Orchestration',
				'one coordinator tells each service what to do next and remembers how far the saga got.'
			],
			['No isolation', 'other requests can see half-finished work, so design for it.']
		],
		tip: 'Make every step and every compensation safe to run twice, because messages get retried.',
		links: [
			['Saga pattern', 'https://microservices.io/patterns/data/saga.html'],
			['Saga design pattern', 'https://learn.microsoft.com/en-us/azure/architecture/patterns/saga']
		],
		sketch: {
			kind: 'Orchestration diagram',
			alt: 'An orchestrator asks Orders, Payments and Stock to act in turn. Stock fails, so it refunds the payment and cancels the order.',
			h: 210,
			nodes: [
				{
					id: 'orch',
					label: 'Order saga\norchestrator',
					x: 240,
					y: 45,
					w: 160,
					h: 62,
					fill: 'yellow'
				},
				{ id: 'ord', label: 'Orders', x: 80, y: 160, w: 110, h: 56, fill: 'sky' },
				{ id: 'pay', label: 'Payments', x: 240, y: 160, w: 110, h: 56, fill: 'mint' },
				{ id: 'stock', label: 'Stock', x: 400, y: 160, w: 110, h: 56, fill: 'pink' }
			],
			edges: [
				{ from: 'orch', to: 'ord', label: '1' },
				{ from: 'orch', to: 'pay', label: '2' },
				{ from: 'orch', to: 'stock', label: '3' }
			],
			steps: [
				{
					title: 'Create a pending order',
					say: 'A customer orders. The orchestrator asks Orders to create the order as pending.',
					detail:
						'Orders commits a local transaction that saves the order with the status pending. It is not confirmed yet, and because sagas give no isolation, other requests can already see this half-finished order, so screens should show it as pending.',
					send: [['orch', 'ord']],
					set: { ord: 'Orders\npending' },
					light: ['ord']
				},
				{
					title: 'Charge and commit',
					say: 'Next, Payments charges the card and commits in its own database.',
					detail:
						'Payments charges the card and commits in its own database straight away. No lock is held across services, which keeps each step fast, but it means the charge is real even though the saga as a whole may still fail.',
					send: [['orch', 'pay']],
					set: { ord: 'Orders\npending', pay: 'Payments\ncharged' },
					light: ['pay']
				},
				{
					title: 'A step fails',
					say: 'Stock is asked to reserve the item, but it has just sold out. This step fails.',
					detail:
						'Stock finds nothing left and returns a failure. The orchestrator saves the saga state, including how far it got, in its own database, so it still knows what to undo even if it crashes and restarts in the middle.',
					send: [['orch', 'stock']],
					set: { ord: 'Orders\npending', pay: 'Payments\ncharged', stock: 'Stock\nsold out' },
					down: ['stock']
				},
				{
					title: 'Refund the card',
					say: 'There is no shared rollback, so the orchestrator runs a compensation: refund the card.',
					detail:
						'A committed charge cannot be un-committed, so the orchestrator asks Payments for a new action that reverses its effect: a refund. Compensations run in reverse order and must be safe to repeat, because the refund request may time out and be sent twice.',
					send: [['orch', 'pay']],
					set: { ord: 'Orders\npending', pay: 'Payments\nrefunded', stock: 'Stock\nsold out' },
					down: ['stock'],
					light: ['pay']
				},
				{
					title: 'Cancel the order',
					say: 'Then it cancels the order. Every service agrees again, just a moment later than one database would.',
					detail:
						'Orders moves the order from pending to cancelled, and all three services agree again. This is eventual consistency: for a short time the data disagreed, and the customer may even have seen the charge before the refund appeared.',
					send: [['orch', 'ord']],
					set: { ord: 'Orders\ncancelled', pay: 'Payments\nrefunded', stock: 'Stock\nsold out' },
					light: ['ord']
				}
			]
		}
	},
	{
		id: 'cqrs',
		title: 'CQRS and event sourcing',
		summary:
			'CQRS splits a service in two: one model handles commands that change data, and another answers queries. Event sourcing goes further and stores every change as an event, so the current state is rebuilt by replaying them. Both pay off in the right corner of a system and cost a lot everywhere else.',
		points: [
			['Command side', 'checks the rules and applies a change, such as PlaceOrder.'],
			['Query side', 'read models shaped for each screen, so reads need no joins.'],
			['Event store', 'an append-only history of what happened. Nothing is updated in place.'],
			['Projection', 'code that reads new events and keeps a read model up to date.'],
			['The cost', 'read models lag slightly behind, and there is much more code to own.']
		],
		tip: 'Use CQRS for one busy or complicated part of the system, never as the default for every service.',
		links: [
			['CQRS (Fowler)', 'https://martinfowler.com/bliki/CQRS.html'],
			['Event sourcing (Fowler)', 'https://martinfowler.com/eaaDev/EventSourcing.html'],
			['CQRS pattern', 'https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs']
		],
		sketch: {
			kind: 'Data flow diagram',
			alt: 'Commands append events to an event store. A projection turns the events into a read model, and queries read from that model.',
			h: 205,
			nodes: [
				{ id: 'user', label: 'User', x: 30, y: 105, shape: 'person' },
				{ id: 'cmd', label: 'Command\nside', x: 150, y: 45, w: 110, h: 56, fill: 'sky' },
				{ id: 'qry', label: 'Query\nside', x: 150, y: 165, w: 110, h: 56, fill: 'sky' },
				{
					id: 'store',
					label: 'Event store',
					x: 320,
					y: 45,
					w: 120,
					h: 66,
					shape: 'db',
					fill: 'yellow'
				},
				{
					id: 'read',
					label: 'Read model',
					x: 320,
					y: 165,
					w: 120,
					h: 66,
					shape: 'db',
					fill: 'mint'
				},
				{ id: 'proj', label: 'Projection', x: 432, y: 105, w: 92, h: 46, fill: 'pink' }
			],
			edges: [
				{ from: 'user', to: 'cmd' },
				{ from: 'cmd', to: 'store', label: 'append' },
				{ from: 'store', to: 'proj' },
				{ from: 'proj', to: 'read' },
				{ from: 'user', to: 'qry' },
				{ from: 'qry', to: 'read' }
			],
			steps: [
				{
					title: 'Append an event',
					say: 'A customer places an order. The command side checks the rules and appends an event.',
					detail:
						"The command side loads the order's past events, checks the rules, then appends a new event. If two commands for the same order arrive together, a version check on the append rejects the second one, so the history can never split in two.",
					send: [
						['user', 'cmd'],
						['cmd', 'store']
					],
					set: { store: 'OrderPlaced' },
					light: ['store']
				},
				{
					title: 'Nothing is overwritten',
					say: 'Nothing is overwritten. Each change becomes one more line in the history.',
					detail:
						'Instead of updating an order row, the store keeps adding events such as ItemAdded. You get a full audit trail for free, and can answer questions later that nobody thought to ask, like how often items are removed before checkout.',
					send: [['cmd', 'store']],
					set: { store: 'OrderPlaced\nItemAdded' },
					light: ['store']
				},
				{
					title: 'Project a read model',
					say: 'A projection reads the new events and updates a read model built for the orders screen.',
					detail:
						'The projection subscribes to new events and updates a table shaped exactly like the orders screen, with totals already worked out. It runs a moment behind the writes, so a user may briefly not see their own latest change.',
					send: [
						['store', 'proj'],
						['proj', 'read']
					],
					set: { store: 'OrderPlaced\nItemAdded' },
					light: ['read']
				},
				{
					title: 'Query the ready row',
					say: 'The screen asks the query side, which reads one ready-made row. No joins, and no load on the write side.',
					detail:
						'Reads hit a table with no joins and no business rules, so they are fast and can be scaled on their own, with read replicas or a cache. Heavy reporting traffic never slows down the command side that takes orders.',
					send: [
						['user', 'qry'],
						['qry', 'read']
					],
					set: { store: 'OrderPlaced\nItemAdded' },
					light: ['qry']
				},
				{
					title: 'Read model breaks',
					say: 'A bug corrupts the read model. Nothing is lost, because the events are the truth.',
					detail:
						'A bug in the projection writes wrong totals into the read model. The read model is only a copy worked out from the events, so the damage stays in that copy, and the event store, the real record, is untouched.',
					set: { store: 'OrderPlaced\nItemAdded' },
					down: ['read']
				},
				{
					title: 'Replay to rebuild',
					say: 'Throw the read model away and replay every event to build it again.',
					detail:
						'You fix the projection code, empty the read model and feed it every event from the start. With millions of events this can take hours, so teams often build the new copy beside the old one and switch over once it has caught up.',
					send: [
						['store', 'proj'],
						['proj', 'read']
					],
					set: { store: 'OrderPlaced\nItemAdded', read: 'Rebuilt' },
					light: ['read']
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
					title: 'Context for everyone',
					say: 'Context is the view for everyone, including people who do not write code.',
					detail:
						'Level 1 shows the system as a single box with its users and the outside systems it relies on. It contains no technology words, so managers, sales staff and new joiners can read it in a minute.',
					light: ['l1']
				},
				{
					title: 'Containers that run',
					say: 'Container zooms into the system to show what runs: apps, APIs and databases.',
					detail:
						'Level 2 opens the box and shows each thing that runs or stores data on its own, like a web app, an API, a database or a queue, along with its technology. Arrows say how they talk, for example JSON over HTTPS.',
					send: [['l1', 'l2']],
					light: ['l2']
				},
				{
					title: 'Components inside',
					say: 'Component zooms into one container to show its main parts.',
					detail:
						'Level 3 opens one container and shows its main building blocks, such as controllers, services and repositories, and what each is responsible for. It is meant for the developers who work on that container.',
					send: [['l2', 'l3']],
					light: ['l3']
				},
				{
					title: 'Code, rarely drawn',
					say: 'Code zooms into one component. It is rarely worth drawing by hand.',
					detail:
						'Level 4 shows classes and interfaces, much like a UML class diagram. Code changes daily, so a hand-drawn version goes out of date fast, and most IDEs can generate one on the rare occasions you need it.',
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
		links: [['System context diagram', 'https://c4model.com/diagrams/system-context']],
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
					title: 'The system as one box',
					say: 'The whole system is one box. What is inside does not matter at this level.',
					detail:
						'At this level the shop is a black box. Hiding its insides keeps the diagram stable for years, since it only changes when the users or outside dependencies change, not when someone swaps a framework.',
					light: ['shop']
				},
				{
					title: 'A shopper buys',
					say: 'A shopper places an order.',
					detail:
						'People are drawn as person shapes and labelled with their role, here Shopper, rather than a real name. Each arrow gets a short verb, like buys, so the diagram reads almost like a sentence.',
					send: [['user', 'shop']],
					light: ['user']
				},
				{
					title: 'Pay through a provider',
					say: 'The shop relies on an outside provider to take the money.',
					detail:
						'The payment provider is an external system: you use it but do not run it. Showing it reminds everyone that if the provider is down, nobody can pay, however healthy your own code is.',
					send: [['shop', 'pay']],
					light: ['pay']
				},
				{
					title: 'Email through a service',
					say: 'It relies on another to send the receipt. These dependencies are the point of this diagram.',
					detail:
						'The email service is another outside dependency, with its own sending limits and outages. Listing these makes contracts, data protection reviews and outage planning much easier, which is why this diagram is worth keeping current.',
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
		links: [['Container diagram', 'https://c4model.com/diagrams/container']],
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
					title: 'Search for a product',
					say: 'The shopper searches for a product, and the web app asks the search engine.',
					detail:
						'The SvelteKit web app sends the search to Catalog, a separate search engine built for fast text queries. Keeping search away from the orders database means a burst of browsing never slows down checkout.',
					send: [
						['user', 'web'],
						['web', 'cat']
					],
					light: ['cat']
				},
				{
					title: 'Call the Orders API',
					say: 'At checkout, the web app calls the Orders API.',
					detail:
						'When the shopper pays, the web app sends the order to the Orders API, usually as JSON over HTTPS. Arrows on a container diagram should carry that kind of label, so readers know both what flows and how it travels.',
					send: [['web', 'api']],
					light: ['api']
				},
				{
					title: 'Save the order first',
					say: 'The order is saved first, because that must never be lost.',
					detail:
						'The API writes the order to Postgres and waits for the commit before doing anything else. If the server crashed a second later, the order would still be safe on disk, and every step after this one can be retried.',
					send: [['api', 'db']],
					light: ['db']
				},
				{
					title: 'Publish and return',
					say: 'The API publishes an OrderPlaced event and returns straight away.',
					detail:
						'With the order saved, the API puts an OrderPlaced event on Kafka and replies without waiting for the receipt. Saving and publishing are two separate writes, so teams often use an outbox table to make sure no event is lost between them.',
					send: [['api', 'bus']],
					light: ['bus']
				},
				{
					title: 'Send the receipt',
					say: 'A small function reacts to the event and sends the receipt.',
					detail:
						'The receipts function runs only when an event arrives, builds the email and hands it to an email service. If it fails, the event is still on the bus and can be retried without the shopper ever noticing.',
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
		links: [['Component diagram', 'https://c4model.com/diagrams/component']],
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
					title: 'Check the request',
					say: 'The controller receives the HTTP request and checks it is well formed.',
					detail:
						'The order controller parses the HTTP request, checks required fields and types, and rejects bad input with 400 Bad Request. It holds no business rules, so it stays thin and easy to replace.',
					send: [['web', 'ctl']],
					light: ['ctl']
				},
				{
					title: 'Apply business rules',
					say: 'The checkout service holds the actual business rules.',
					detail:
						'The checkout service decides whether the order is valid: stock, prices, discounts and limits. Keeping those rules in one component means the same logic applies whether the call came from the web, a mobile app or a test.',
					send: [['ctl', 'svc']],
					light: ['svc']
				},
				{
					title: 'Charge through a client',
					say: 'It charges the card through the payment client.',
					detail:
						"The payment client wraps the provider's API, handling authentication, timeouts and error codes, so changing provider means changing only this component. It should also send an idempotency key, so a retried charge is not taken twice.",
					send: [
						['svc', 'cli'],
						['cli', 'pay']
					],
					light: ['cli']
				},
				{
					title: 'Save with the repository',
					say: 'The repository saves the order. It is the only component that knows SQL.',
					detail:
						'The order repository turns an order into SQL inserts and back again. Since nothing else touches the database, a schema change means editing one component, and tests can swap the repository for an in-memory version.',
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
		links: [['Code diagram', 'https://c4model.com/diagrams/code']],
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
					title: 'Create an Order',
					say: 'placeOrder() starts by creating an Order.',
					detail:
						'placeOrder() builds an Order object from the cart, and the Order works out its own total() from its lines. Putting that sum on Order keeps the rule in one place instead of copying it into every caller.',
					send: [['svc', 'order']],
					light: ['order']
				},
				{
					title: 'Depend on an interface',
					say: 'It charges through an interface, so it never depends on one payment company.',
					detail:
						'CheckoutService holds a reference typed as PaymentClient, an interface with a single charge() method. It knows nothing about cards, banks or HTTP, only that something can take a payment.',
					send: [['svc', 'port']],
					light: ['port']
				},
				{
					title: 'The real implementation',
					say: 'CardPayments is the real implementation behind that interface.',
					detail:
						'CardPayments implements PaymentClient and talks to the real payment provider. In UML the dashed arrow means "implements". The app picks which implementation to use at start-up, often through dependency injection.',
					send: [['card', 'port']],
					light: ['card']
				},
				{
					title: 'Swap in a fake',
					say: 'Swap it for a fake in tests, and CheckoutService does not change.',
					detail:
						'In tests, FakePayments implements the same interface and simply records what it was asked to charge. Tests then run with no network and no real card, and can make charge() fail on purpose to check the error handling.',
					set: { card: 'FakePayments\n+ charge()' },
					light: ['card']
				}
			]
		}
	}
];
