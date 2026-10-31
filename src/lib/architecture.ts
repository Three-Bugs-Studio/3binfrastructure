import type { Topic } from './sketch';

export const architecture: Topic[] = [
	{
		id: 'layers',
		title: 'Clients, servers and layers',
		summary:
			'Almost every web app starts the same way: a client asks, a server answers, and the server keeps its facts in a database. Splitting the server into layers keeps each kind of work in one place.',
		points: [
			[
				'Presentation',
				'what people see and touch, such as a web page, a mobile screen or an API response.'
			],
			['Business logic', 'the rules of the product, like who can refund an order and when.'],
			[
				'Data access',
				'the only layer that talks to storage, so the rest of the code never writes SQL.'
			]
		],
		tip: 'Each layer calls only the layer below it. If your UI code knows table names, the layers have leaked.',
		sketch: {
			alt: 'A user talks to the presentation layer, which calls business logic, which calls data access, which reads the database.',
			h: 225,
			nodes: [
				{ id: 'user', label: 'User', x: 45, y: 90, shape: 'person' },
				{ id: 'ui', label: 'Presentation', x: 225, y: 40, w: 170, fill: 'sky' },
				{ id: 'logic', label: 'Business logic', x: 225, y: 112, w: 170, fill: 'yellow' },
				{ id: 'data', label: 'Data access', x: 225, y: 184, w: 170, fill: 'mint' },
				{ id: 'db', label: 'Database', x: 415, y: 184, w: 90, h: 72, shape: 'db' }
			],
			edges: [
				{ from: 'user', to: 'ui' },
				{ from: 'ui', to: 'logic' },
				{ from: 'logic', to: 'data' },
				{ from: 'data', to: 'db' }
			]
		}
	},
	{
		id: 'monolith',
		title: 'Monolith or microservices',
		summary:
			'A monolith ships as one deployable unit. Microservices split a product into small services that deploy on their own and talk over the network. Neither is more grown-up: they put the complexity in different places.',
		points: [
			[
				'Monolith',
				'simple to build, test and deploy, and a call between modules is a plain function call. One bad deploy affects everything.'
			],
			[
				'Modular monolith',
				'one deployable with strict boundaries between modules. A strong default, and the easiest start if you later extract services.'
			],
			[
				'Microservices',
				'teams ship and scale independently. You pay with network failures, harder debugging and data spread across many stores.'
			]
		],
		tip: 'Start with a well-structured monolith. Split out a service when a team or a scaling need demands it, not because it feels modern.',
		sketch: {
			alt: 'On the left, one monolith with one database. On the right, an orders service and a payments service, each with its own database, talking over the network.',
			h: 240,
			nodes: [
				{ id: 'one', label: 'one big app', x: 100, y: 20, shape: 'text' },
				{ id: 'many', label: 'small services', x: 345, y: 20, shape: 'text' },
				{
					id: 'mono',
					label: 'Monolith\nUI + orders\n+ payments',
					x: 100,
					y: 95,
					w: 150,
					h: 90,
					fill: 'sky'
				},
				{ id: 'monodb', label: 'DB', x: 100, y: 200, w: 90, h: 62, shape: 'db' },
				{ id: 'orders', label: 'Orders', x: 285, y: 95, w: 92, fill: 'mint' },
				{ id: 'pay', label: 'Payments', x: 415, y: 95, w: 92, fill: 'pink' },
				{ id: 'ordersdb', label: 'DB', x: 285, y: 200, w: 72, h: 62, shape: 'db' },
				{ id: 'paydb', label: 'DB', x: 415, y: 200, w: 72, h: 62, shape: 'db' }
			],
			edges: [
				{ from: 'mono', to: 'monodb' },
				{ from: 'orders', to: 'ordersdb' },
				{ from: 'pay', to: 'paydb' },
				{ from: 'orders', to: 'pay', dashed: true }
			]
		}
	},
	{
		id: 'scaling',
		title: 'Scaling up and scaling out',
		summary:
			'When traffic grows you can buy a bigger machine (vertical scaling) or add more machines (horizontal scaling). Vertical is quick but has a ceiling. Horizontal goes much further but only works if your app is ready for it.',
		points: [
			[
				'Vertical',
				'no code changes, but there is always a biggest machine, and it is still a single point of failure.'
			],
			['Horizontal', 'add servers behind a load balancer, and survive losing one of them.'],
			[
				'Stateless servers',
				'keep sessions and files in shared storage so that any server can handle any request.'
			]
		],
		tip: 'Scale up first because it is cheap in engineering time, and keep servers stateless so scaling out stays possible.',
		sketch: {
			alt: 'Scaling up turns one small app server into one larger server. Scaling out turns one small app server into three small ones.',
			h: 210,
			nodes: [
				{ id: 'up', label: 'scale up', x: 110, y: 20, shape: 'text' },
				{ id: 'out', label: 'scale out', x: 350, y: 20, shape: 'text' },
				{ id: 'small', label: 'App', x: 40, y: 120, w: 60, h: 44 },
				{ id: 'big', label: 'App\n(bigger)', x: 170, y: 120, w: 120, h: 120, fill: 'yellow' },
				{ id: 'small2', label: 'App', x: 290, y: 120, w: 60, h: 44 },
				{ id: 'a', label: 'App', x: 425, y: 62, w: 80, h: 42, fill: 'mint' },
				{ id: 'b', label: 'App', x: 425, y: 120, w: 80, h: 42, fill: 'mint' },
				{ id: 'c', label: 'App', x: 425, y: 178, w: 80, h: 42, fill: 'mint' }
			],
			edges: [
				{ from: 'small', to: 'big' },
				{ from: 'small2', to: 'a' },
				{ from: 'small2', to: 'b' },
				{ from: 'small2', to: 'c' }
			]
		}
	},
	{
		id: 'load-balancing',
		title: 'Load balancing',
		summary:
			'A load balancer sits in front of your servers and spreads requests across them. It also runs health checks, so traffic stops going to a server that has died.',
		points: [
			['Round robin', 'servers take turns. Simple, and fine when requests cost about the same.'],
			[
				'Least connections',
				'send each request to the least busy server. Better when requests vary in length.'
			],
			[
				'Consistent hashing',
				'the same key keeps landing on the same server, and adding a server moves only a small share of keys.'
			],
			[
				'L4 or L7',
				'L4 balances on IP and port and is very fast. L7 reads the HTTP request, so it can route by path or header.'
			]
		],
		tip: 'The load balancer is now a single point of failure too, so use a managed one or run a redundant pair.',
		sketch: {
			alt: 'A user reaches a load balancer that sends traffic to app servers one and two. App server three fails its health check and gets no traffic.',
			h: 225,
			nodes: [
				{ id: 'user', label: 'User', x: 40, y: 85, shape: 'person' },
				{ id: 'lb', label: 'Load\nbalancer', x: 195, y: 112, w: 104, h: 64, fill: 'yellow' },
				{ id: 'a', label: 'App 1', x: 395, y: 40, w: 120, h: 48, fill: 'mint' },
				{ id: 'b', label: 'App 2', x: 395, y: 112, w: 120, h: 48, fill: 'mint' },
				{ id: 'c', label: 'App 3 (down)', x: 395, y: 184, w: 120, h: 48, fill: 'pink' }
			],
			edges: [
				{ from: 'user', to: 'lb' },
				{ from: 'lb', to: 'a' },
				{ from: 'lb', to: 'b' },
				{ from: 'lb', to: 'c', dashed: true, plain: true }
			]
		}
	},
	{
		id: 'caching',
		title: 'Caching',
		summary:
			'A cache keeps a copy of an expensive result somewhere faster. Done well, it cuts latency and takes load off your database. Done badly, it serves stale data with great confidence.',
		points: [
			['Where it lives', "the browser, a CDN, the app's own memory, or a shared store like Redis."],
			[
				'Cache-aside',
				'the app checks the cache, reads the database on a miss, then stores the result. The most common pattern.'
			],
			[
				'Write-through',
				'writes go to the cache and the database together. Reads stay fresh, writes get slower.'
			],
			[
				'Eviction',
				'LRU drops the least recently used entry when the cache is full. A TTL expires entries after a set time.'
			]
		],
		tip: 'Invalidation is the hard part. Give every entry a TTL, even when you also delete it on write.',
		sketch: {
			alt: 'Cache-aside: the app checks the cache first, reads the database on a miss, then saves a copy in the cache.',
			h: 220,
			nodes: [
				{ id: 'app', label: 'App', x: 65, y: 110, w: 96, h: 64, fill: 'sky' },
				{ id: 'cache', label: 'Cache', x: 345, y: 45, w: 120, fill: 'yellow' },
				{ id: 'db', label: 'Database', x: 345, y: 175, w: 110, h: 72, shape: 'db' }
			],
			edges: [
				{ from: 'app', to: 'cache', label: '1. check first' },
				{ from: 'app', to: 'db', label: '2. on a miss' },
				{ from: 'db', to: 'cache', label: '3. save a copy', dashed: true }
			]
		}
	},
	{
		id: 'queues',
		title: 'Queues and events',
		summary:
			'A queue lets one part of a system hand work to another without waiting. The producer drops a message and moves on, and consumers pick it up when ready. A traffic spike becomes a backlog instead of an outage.',
		points: [
			[
				'Work queue',
				'each message goes to one worker. Good for jobs like sending email or resizing images.'
			],
			[
				'Publish/subscribe',
				'each event reaches every subscriber, so "order placed" can inform billing, shipping and analytics.'
			],
			[
				'At-least-once delivery',
				'most brokers may deliver a message twice, so consumers must be idempotent.'
			],
			[
				'Dead-letter queue',
				'messages that keep failing get parked for a human instead of blocking the line.'
			]
		],
		tip: 'Ask whether the user needs the result right now. If not, the work is a candidate for a queue.',
		sketch: {
			alt: 'A producer puts messages on a queue, and two workers take messages from it.',
			h: 200,
			nodes: [
				{ id: 'p', label: 'Producer', x: 60, y: 100, w: 100, fill: 'sky' },
				{ id: 'q', label: 'Queue', x: 240, y: 100, w: 120, fill: 'yellow' },
				{ id: 'a', label: 'Worker 1', x: 415, y: 45, w: 100, fill: 'mint' },
				{ id: 'b', label: 'Worker 2', x: 415, y: 155, w: 100, fill: 'mint' }
			],
			edges: [
				{ from: 'p', to: 'q' },
				{ from: 'q', to: 'a' },
				{ from: 'q', to: 'b' }
			]
		}
	},
	{
		id: 'apis',
		title: 'How services talk',
		summary:
			'Services need a contract. The right protocol depends on who is calling and how chatty the conversation will be.',
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
			]
		}
	},
	{
		id: 'reliability',
		title: 'Designing for failure',
		summary:
			'Disks die, networks drop and deploys go wrong. Reliable systems assume all of this will happen and limit how far the damage spreads.',
		points: [
			['Redundancy', 'run at least two of everything important, ideally in different zones.'],
			[
				'Timeouts',
				'never wait forever. One slow dependency can otherwise tie up every thread you have.'
			],
			[
				'Backoff and jitter',
				'wait longer between retries and randomise the delay, or your retries become their own traffic spike.'
			],
			[
				'Circuit breaker',
				'after repeated failures, stop calling the sick service for a while and fail fast.'
			],
			['Graceful degradation', 'turn off recommendations and keep checkout working.']
		],
		tip: 'Only retry operations that are safe to repeat, or make them safe with an idempotency key.',
		sketch: {
			alt: 'A circuit breaker moves from closed to open after too many failures, from open to half-open after a wait, and from half-open back to closed when a test call passes.',
			h: 230,
			nodes: [
				{ id: 'title', label: 'circuit breaker', x: 240, y: 20, shape: 'text' },
				{
					id: 'closed',
					label: 'Closed\ncalls go through',
					x: 85,
					y: 90,
					w: 140,
					h: 60,
					fill: 'mint'
				},
				{ id: 'open', label: 'Open\nfail fast', x: 395, y: 90, w: 140, h: 60, fill: 'pink' },
				{
					id: 'half',
					label: 'Half-open\none test call',
					x: 240,
					y: 195,
					w: 130,
					h: 60,
					fill: 'yellow'
				}
			],
			edges: [
				{ from: 'closed', to: 'open', label: 'too many failures' },
				{ from: 'open', to: 'half', label: 'after a wait' },
				{ from: 'half', to: 'closed', label: 'test passes' }
			]
		}
	},
	{
		id: 'observability',
		title: 'Observability',
		summary:
			'You cannot fix what you cannot see. Observability means being able to tell what is broken and why, from the outside, using the data your system emits.',
		points: [
			['Logs', 'timestamped records of single events. Structure them so they can be searched.'],
			[
				'Metrics',
				'numbers over time, like request rate, error rate and latency. Cheap to keep and good for alerts.'
			],
			['Traces', 'the path of one request across services, showing where the time went.']
		],
		tip: 'Alert on what users feel, like errors and slow requests, not on every CPU spike.',
		sketch: {
			alt: 'Services emit logs, metrics and traces, which feed dashboards and alerts.',
			h: 200,
			nodes: [
				{ id: 'svc', label: 'Your\nservices', x: 60, y: 100, w: 104, h: 68, fill: 'sky' },
				{ id: 'logs', label: 'Logs', x: 235, y: 40, w: 90, h: 42 },
				{ id: 'metrics', label: 'Metrics', x: 235, y: 100, w: 90, h: 42 },
				{ id: 'traces', label: 'Traces', x: 235, y: 160, w: 90, h: 42 },
				{ id: 'dash', label: 'Dashboards\n+ alerts', x: 410, y: 100, w: 124, h: 68, fill: 'yellow' }
			],
			edges: [
				{ from: 'svc', to: 'logs' },
				{ from: 'svc', to: 'metrics' },
				{ from: 'svc', to: 'traces' },
				{ from: 'logs', to: 'dash' },
				{ from: 'metrics', to: 'dash' },
				{ from: 'traces', to: 'dash' }
			]
		}
	}
];
