import type { Topic } from './sketch';

const START = 'Start with the foundations';
const TRAFFIC = 'Handling more traffic';
const COMPUTE = 'Running your code';
const DATA = 'Scaling the data layer';
const FAILURE = 'Surviving failure';

export const aws: Topic[] = [
	{
		id: 'well-architected',
		part: START,
		title: 'The Well-Architected Framework',
		summary:
			'AWS sums up how to build good cloud systems in six pillars. Treat them as a review checklist: go through each one and ask how your workload measures up. Scaling mostly lives under Performance Efficiency and Reliability, but it affects all six.',
		points: [
			[
				'Operational excellence',
				'run and improve the system, with automation in place of manual steps.'
			],
			['Security', 'protect data and access, in every layer.'],
			['Reliability', 'recover from failure and keep working as demand changes.'],
			['Performance efficiency', 'use resources well as your needs grow.'],
			['Cost optimization', 'avoid paying for what you do not use.'],
			['Sustainability', 'reduce the energy and hardware your workload needs.']
		],
		tip: 'Every pillar trades against another. Adding redundancy raises reliability and raises the bill.',
		links: [
			[
				'AWS Well-Architected',
				'https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html'
			]
		],
		sketch: {
			kind: 'Concept map',
			alt: 'A workload in the middle, reviewed against the six pillars of the AWS Well-Architected Framework.',
			h: 215,
			nodes: [
				{ id: 'w', label: 'Your\nworkload', x: 240, y: 107, w: 104, h: 68, fill: 'yellow' },
				{ id: 'ops', label: 'Operational\nexcellence', x: 72, y: 36, w: 132, h: 58, fill: 'sky' },
				{ id: 'sec', label: 'Security', x: 72, y: 107, w: 132, h: 48, fill: 'pink' },
				{ id: 'rel', label: 'Reliability', x: 72, y: 178, w: 132, h: 48, fill: 'mint' },
				{ id: 'perf', label: 'Performance\nefficiency', x: 408, y: 36, w: 132, h: 58, fill: 'sky' },
				{ id: 'cost', label: 'Cost\noptimization', x: 408, y: 107, w: 132, h: 58, fill: 'pink' },
				{ id: 'eco', label: 'Sustainability', x: 408, y: 178, w: 132, h: 48, fill: 'mint' }
			],
			edges: [
				{ from: 'w', to: 'ops', plain: true },
				{ from: 'w', to: 'sec', plain: true },
				{ from: 'w', to: 'rel', plain: true },
				{ from: 'w', to: 'perf', plain: true },
				{ from: 'w', to: 'cost', plain: true },
				{ from: 'w', to: 'eco', plain: true }
			],
			steps: [
				{
					say: 'Operational excellence: can you deploy and fix things without manual heroics?',
					send: [['w', 'ops']],
					light: ['ops']
				},
				{
					say: 'Security: who can reach what, and is the data protected?',
					send: [['w', 'sec']],
					light: ['sec']
				},
				{
					say: 'Reliability: what happens when a server or a whole data centre fails?',
					send: [['w', 'rel']],
					light: ['rel']
				},
				{
					say: 'Performance efficiency: does it stay fast as usage grows?',
					send: [['w', 'perf']],
					light: ['perf']
				},
				{
					say: 'Cost optimization: are you paying for capacity that sits idle?',
					send: [['w', 'cost']],
					light: ['cost']
				},
				{
					say: 'Sustainability: could the same work use less?',
					send: [['w', 'eco']],
					light: ['eco']
				}
			]
		}
	},
	{
		id: 'regions',
		title: 'Regions and Availability Zones',
		summary:
			'AWS is divided into Regions around the world, and each Region contains several Availability Zones: separate groups of data centres with their own power and networking. Spreading a system across zones is the cheapest big reliability win on AWS.',
		points: [
			[
				'Region',
				'a geographic area, such as Singapore or Ireland. Choose one close to your users.'
			],
			[
				'Availability Zone',
				'an isolated location inside a Region, close enough for very fast connections.'
			],
			['Multi-AZ', 'run in at least two zones so one failure does not take you offline.'],
			['Multi-Region', 'much harder and more expensive. Keep it for strict uptime or legal needs.']
		],
		tip: 'Run everything important in at least two Availability Zones from the start.',
		links: [
			['AWS global infrastructure', 'https://aws.amazon.com/about-aws/global-infrastructure/']
		],
		sketch: {
			kind: 'Deployment diagram',
			alt: 'Inside one Region, a load balancer sends traffic to app servers in two Availability Zones, each with a database. When one zone fails, the other takes over.',
			h: 245,
			nodes: [
				{ id: 'region', label: 'Region', x: 240, y: 122, w: 464, h: 236, shape: 'boundary' },
				{ id: 'azA', label: 'Zone A', x: 122, y: 150, w: 210, h: 164, shape: 'boundary' },
				{ id: 'azB', label: 'Zone B', x: 358, y: 150, w: 210, h: 164, shape: 'boundary' },
				{ id: 'lb', label: 'Load balancer', x: 240, y: 42, w: 140, h: 38, fill: 'yellow' },
				{ id: 'a', label: 'App', x: 122, y: 110, w: 100, h: 38, fill: 'sky' },
				{ id: 'b', label: 'App', x: 358, y: 110, w: 100, h: 38, fill: 'sky' },
				{ id: 'da', label: 'Primary', x: 122, y: 190, w: 110, h: 58, shape: 'db', fill: 'mint' },
				{ id: 'db', label: 'Standby', x: 358, y: 190, w: 110, h: 58, shape: 'db', fill: 'mint' }
			],
			edges: [
				{ from: 'lb', to: 'a' },
				{ from: 'lb', to: 'b' },
				{ from: 'a', to: 'da' },
				{ from: 'b', to: 'da', dashed: true },
				{ from: 'da', to: 'db', label: 'sync' }
			],
			steps: [
				{
					say: 'The load balancer spreads traffic across app servers in two separate zones.',
					send: [
						['lb', 'a'],
						['lb', 'b']
					]
				},
				{
					say: 'Every write goes to the primary database and is copied to a standby in the other zone.',
					send: [
						['a', 'da'],
						['da', 'db']
					],
					light: ['db']
				},
				{ say: 'A power failure takes out all of Zone A.', down: ['a', 'da'], light: ['azA'] },
				{
					say: 'Health checks notice, and traffic now goes only to Zone B.',
					down: ['a', 'da'],
					send: [['lb', 'b']]
				},
				{
					say: 'The standby becomes the new primary. Users barely notice.',
					down: ['a', 'da'],
					set: { db: 'Primary' },
					light: ['db'],
					send: [['b', 'db']]
				}
			]
		}
	},
	{
		id: 'edge',
		part: TRAFFIC,
		title: 'Route 53, CloudFront and S3',
		summary:
			'The cheapest request is the one that never reaches your servers. Route 53 answers DNS, CloudFront caches content at edge locations near users, and S3 stores your files.',
		points: [
			['Amazon Route 53', 'DNS that can route by health, latency or weight.'],
			['Amazon CloudFront', 'a CDN that serves cached content from locations close to each user.'],
			[
				'Amazon S3',
				'object storage for images, downloads and whole static sites, with no servers to run.'
			],
			[
				'Offloading',
				'moving images and files out of your app lets it scale far further for the same cost.'
			]
		],
		tip: 'Serve every static file through CloudFront before you think about adding servers.',
		links: [
			['Route 53', 'https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html'],
			[
				'CloudFront',
				'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html'
			]
		],
		sketch: {
			kind: 'Data flow diagram',
			alt: 'A user looks up the site in Route 53, then requests it from CloudFront. CloudFront fetches files from S3 once and caches them, and passes dynamic requests to a load balancer.',
			h: 205,
			nodes: [
				{ id: 'user', label: 'User', x: 32, y: 90, shape: 'person' },
				{ id: 'dns', label: 'Route 53', x: 190, y: 30, w: 120, h: 42, fill: 'sky' },
				{ id: 'cf', label: 'CloudFront\nedge', x: 190, y: 130, w: 120, h: 66, fill: 'yellow' },
				{ id: 's3', label: 'S3 files', x: 410, y: 62, w: 110, h: 74, shape: 'db', fill: 'mint' },
				{ id: 'alb', label: 'Load\nbalancer', x: 410, y: 165, w: 110, h: 62, fill: 'pink' }
			],
			edges: [
				{ from: 'user', to: 'dns' },
				{ from: 'user', to: 'cf' },
				{ from: 'cf', to: 's3' },
				{ from: 'cf', to: 'alb' }
			],
			steps: [
				{
					say: 'The browser asks Route 53 where the site lives.',
					send: [['user', 'dns']],
					light: ['dns']
				},
				{
					say: 'The answer points to the nearest CloudFront edge location.',
					send: [['user', 'cf']],
					set: { cf: 'CloudFront\ncache empty' }
				},
				{
					say: 'First visitor: the edge fetches the image from S3 and keeps a copy.',
					send: [['cf', 's3']],
					set: { cf: 'CloudFront\ncache empty' },
					light: ['s3']
				},
				{
					say: 'Every visitor after that is served from the edge, and S3 is not touched.',
					send: [['user', 'cf']],
					set: { cf: 'CloudFront\ncached!' },
					light: ['cf']
				},
				{
					say: 'Only dynamic requests, like placing an order, travel on to your servers.',
					send: [['cf', 'alb']],
					light: ['alb']
				}
			]
		}
	},
	{
		id: 'load-balancing',
		title: 'Elastic Load Balancing',
		summary:
			'A load balancer sits in front of your servers and spreads requests across them. It also runs health checks, so traffic stops going to a server that has died. AWS runs it for you, across zones.',
		points: [
			['Application Load Balancer', 'works at layer 7, reads HTTP, and routes by path or host.'],
			['Network Load Balancer', 'works at layer 4 for very high throughput and low latency.'],
			['Target group', 'the set of servers or containers that receive the traffic.'],
			[
				'Health checks',
				'regular requests to each target. Failing targets are taken out of rotation.'
			]
		],
		tip: 'Make the health check a real endpoint that proves your app can do its job.',
		links: [
			[
				'Elastic Load Balancing',
				'https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html'
			]
		],
		sketch: {
			kind: 'Deployment diagram',
			alt: 'A user reaches a load balancer that sends traffic to three app servers. One fails its health check and stops receiving traffic.',
			h: 225,
			nodes: [
				{ id: 'user', label: 'Users', x: 40, y: 85, shape: 'person' },
				{ id: 'lb', label: 'Load\nbalancer', x: 195, y: 112, w: 104, h: 64, fill: 'yellow' },
				{ id: 'a', label: 'App 1', x: 395, y: 40, w: 120, h: 48, fill: 'mint' },
				{ id: 'b', label: 'App 2', x: 395, y: 112, w: 120, h: 48, fill: 'mint' },
				{ id: 'c', label: 'App 3', x: 395, y: 184, w: 120, h: 48, fill: 'mint' }
			],
			edges: [
				{ from: 'user', to: 'lb' },
				{ from: 'lb', to: 'a' },
				{ from: 'lb', to: 'b' },
				{ from: 'lb', to: 'c' }
			],
			steps: [
				{
					say: 'Requests arrive and get shared across all three servers.',
					send: [
						['user', 'lb'],
						['lb', 'a'],
						['lb', 'b'],
						['lb', 'c']
					]
				},
				{ say: 'App 3 crashes.', down: ['c'], send: [['lb', 'c']] },
				{
					say: 'After a few failed health checks, the balancer stops sending it traffic.',
					down: ['c'],
					set: { c: 'App 3 unhealthy' },
					light: ['lb']
				},
				{
					say: 'Users keep working on the two healthy servers.',
					hide: ['c'],
					send: [
						['lb', 'a'],
						['lb', 'b']
					]
				},
				{
					say: 'A replacement passes its health check and joins in.',
					set: { c: 'New App 3' },
					light: ['c'],
					send: [['lb', 'c']]
				}
			]
		}
	},
	{
		id: 'auto-scaling',
		title: 'EC2 Auto Scaling',
		summary:
			'Auto Scaling adds servers when demand rises and removes them when it falls, so you pay for what you use and survive traffic spikes. It needs your app to be stateless, so that any server can handle any request.',
		points: [
			[
				'Auto Scaling group',
				'a fleet of EC2 instances with a minimum, a maximum and a desired size.'
			],
			[
				'Target tracking',
				'you pick a target, such as 50% average CPU, and AWS adds or removes instances to hold it.'
			],
			['Launch template', 'the recipe each new instance is built from.'],
			[
				'Stateless servers',
				'keep sessions in ElastiCache or DynamoDB and files in S3, because any instance can disappear.'
			],
			[
				'Scaling up first',
				'a larger instance needs no code change, but every instance size has a limit.'
			]
		],
		tip: 'Set a sensible maximum so a bug or an attack cannot scale your bill without limit.',
		links: [
			[
				'Target tracking scaling',
				'https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-target-tracking.html'
			]
		],
		sketch: {
			kind: 'Deployment diagram',
			alt: 'CloudWatch watches the CPU of an Auto Scaling group behind a load balancer. High CPU adds instances, and low CPU removes them.',
			h: 225,
			nodes: [
				{
					id: 'asg',
					label: 'Auto Scaling group',
					x: 345,
					y: 112,
					w: 250,
					h: 214,
					shape: 'boundary'
				},
				{ id: 'lb', label: 'Load\nbalancer', x: 65, y: 150, w: 104, h: 62, fill: 'yellow' },
				{ id: 'cw', label: 'CloudWatch\nCPU 45%', x: 65, y: 42, w: 112, h: 62, fill: 'sky' },
				{ id: 'a', label: 'EC2', x: 345, y: 55, w: 150, h: 38, fill: 'mint' },
				{ id: 'b', label: 'EC2', x: 345, y: 100, w: 150, h: 38, fill: 'mint' },
				{ id: 'c', label: 'EC2', x: 345, y: 145, w: 150, h: 38, fill: 'pink' },
				{ id: 'd', label: 'EC2', x: 345, y: 190, w: 150, h: 38, fill: 'pink' }
			],
			edges: [
				{ from: 'lb', to: 'a' },
				{ from: 'lb', to: 'b' },
				{ from: 'lb', to: 'c' },
				{ from: 'lb', to: 'd' }
			],
			steps: [
				{
					say: 'A quiet morning: two instances, CPU at a comfortable 45%.',
					hide: ['c', 'd'],
					send: [
						['lb', 'a'],
						['lb', 'b']
					]
				},
				{
					say: 'A sale starts, and traffic triples. CPU climbs past the 50% target.',
					hide: ['c', 'd'],
					set: { cw: 'CloudWatch\nCPU 88%' },
					send: [
						['lb', 'a'],
						['lb', 'b']
					],
					light: ['cw']
				},
				{
					say: 'Auto Scaling launches new instances from the launch template.',
					set: { cw: 'CloudWatch\nCPU 88%' },
					light: ['c', 'd']
				},
				{
					say: 'Once healthy they take traffic, and CPU falls back towards the target.',
					set: { cw: 'CloudWatch\nCPU 48%' },
					send: [
						['lb', 'a'],
						['lb', 'b'],
						['lb', 'c'],
						['lb', 'd']
					]
				},
				{
					say: 'At night CPU drops, so instances are removed and you stop paying for them.',
					hide: ['c', 'd'],
					set: { cw: 'CloudWatch\nCPU 20%' },
					send: [['lb', 'a']]
				}
			]
		}
	},
	{
		id: 'containers',
		part: COMPUTE,
		title: 'Containers: ECS, EKS and Fargate',
		summary:
			'Containers package your app with everything it needs, so it runs the same everywhere. AWS has two main ways to run them, plus an option that removes the servers from view.',
		points: [
			['Amazon ECR', 'a private registry where your container images are stored.'],
			['Amazon ECS', 'the AWS container orchestrator. Simpler, and a good default on AWS.'],
			['Amazon EKS', 'managed Kubernetes. Pick this when you need Kubernetes or already know it.'],
			['AWS Fargate', 'runs containers for ECS or EKS with no EC2 instances to manage.']
		],
		tip: 'Choose ECS with Fargate unless you have a clear reason to need Kubernetes.',
		links: [
			['Amazon ECS', 'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html'],
			['Amazon EKS', 'https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html']
		],
		sketch: {
			kind: 'Deployment diagram',
			alt: 'An image is pushed to ECR. An ECS service pulls it and runs tasks on Fargate, and replaces a task when it stops.',
			h: 205,
			nodes: [
				{
					id: 'ecr',
					label: 'ECR\nimage v2',
					x: 62,
					y: 102,
					w: 104,
					h: 76,
					shape: 'db',
					fill: 'sky'
				},
				{ id: 'ecs', label: 'ECS\nservice', x: 225, y: 102, w: 104, h: 66, fill: 'yellow' },
				{ id: 'a', label: 'Task 1', x: 410, y: 38, w: 110, h: 46, fill: 'mint' },
				{ id: 'b', label: 'Task 2', x: 410, y: 102, w: 110, h: 46, fill: 'mint' },
				{ id: 'c', label: 'Task 3', x: 410, y: 166, w: 110, h: 46, fill: 'mint' }
			],
			edges: [
				{ from: 'ecr', to: 'ecs', label: 'pull' },
				{ from: 'ecs', to: 'a' },
				{ from: 'ecs', to: 'b' },
				{ from: 'ecs', to: 'c' }
			],
			steps: [
				{
					say: 'You push a new image to ECR and ask for three running copies.',
					light: ['ecr'],
					hide: ['a', 'b', 'c']
				},
				{ say: 'ECS pulls the image.', send: [['ecr', 'ecs']], hide: ['a', 'b', 'c'] },
				{
					say: 'Fargate finds the capacity and starts three tasks. You never see a server.',
					send: [
						['ecs', 'a'],
						['ecs', 'b'],
						['ecs', 'c']
					]
				},
				{
					say: 'Task 2 crashes, so the running count no longer matches what you asked for.',
					down: ['b']
				},
				{
					say: 'ECS notices the gap and starts a replacement.',
					set: { b: 'New task' },
					send: [['ecs', 'b']],
					light: ['b']
				}
			]
		}
	},
	{
		id: 'lambda',
		title: 'Serverless: Lambda and DynamoDB',
		summary:
			'Lambda runs your code in response to events, with nothing to provision. Pair it with API Gateway and DynamoDB, and you get a whole backend that scales up on its own and costs almost nothing when idle.',
		points: [
			['AWS Lambda', 'runs a function per request or event. Each run can last up to 15 minutes.'],
			['Amazon API Gateway', 'gives your functions an HTTP front door.'],
			[
				'Concurrency',
				'each request gets its own environment, so extra load means extra copies. Account limits still apply.'
			],
			['Cold start', 'the extra delay when a new environment has to start.']
		],
		tip: 'Watch how many database connections your functions open. A relational database cannot take thousands at once.',
		links: [['AWS Lambda', 'https://docs.aws.amazon.com/lambda/latest/dg/welcome.html']],
		sketch: {
			kind: 'Data flow diagram',
			alt: 'Users call API Gateway, which invokes Lambda functions, which read and write DynamoDB.',
			h: 175,
			nodes: [
				{ id: 'user', label: 'Users', x: 26, y: 70, shape: 'person' },
				{ id: 'api', label: 'API\nGateway', x: 130, y: 88, w: 96, h: 66, fill: 'sky' },
				{ id: 'fn', label: 'Lambda\n0 running', x: 280, y: 88, w: 112, h: 72, fill: 'yellow' },
				{ id: 'db', label: 'DynamoDB', x: 425, y: 88, w: 96, h: 76, shape: 'db', fill: 'mint' }
			],
			edges: [
				{ from: 'user', to: 'api' },
				{ from: 'api', to: 'fn' },
				{ from: 'fn', to: 'db' }
			],
			steps: [
				{ say: 'Nobody is using the app, so nothing is running.', light: ['fn'] },
				{
					say: 'A request arrives and API Gateway invokes a function.',
					send: [
						['user', 'api'],
						['api', 'fn']
					],
					set: { fn: 'Lambda\n1 running' }
				},
				{
					say: 'It reads and writes DynamoDB, and the response goes back.',
					send: [['fn', 'db']],
					set: { fn: 'Lambda\n1 running' }
				},
				{
					say: 'A post goes viral. Each extra request gets its own copy.',
					send: [
						['user', 'api'],
						['api', 'fn']
					],
					set: { fn: 'Lambda\n800 running' },
					light: ['fn']
				},
				{
					say: 'Traffic fades, and you were only billed for the work actually done.',
					light: ['fn']
				}
			]
		}
	},
	{
		id: 'decoupling',
		title: 'Decoupling: SQS, SNS and EventBridge',
		summary:
			'If one part of a system must wait for another, a slowdown spreads. Queues and topics put a buffer in the middle, so a traffic spike becomes a backlog instead of an outage.',
		points: [
			[
				'Amazon SQS',
				'a queue. Each message is handled by one consumer. Standard queues deliver at least once, so consumers must be safe to run twice.'
			],
			['Amazon SNS', 'publish/subscribe. One message fans out to every subscriber.'],
			['Amazon EventBridge', 'an event bus that routes events by rules.'],
			[
				'Dead-letter queue',
				'messages that keep failing are parked for inspection instead of blocking the rest.'
			]
		],
		tip: 'Ask whether the user needs the result right now. If not, put it on a queue.',
		links: [
			[
				'Amazon SQS',
				'https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html'
			],
			['Amazon SNS', 'https://docs.aws.amazon.com/sns/latest/dg/welcome.html']
		],
		sketch: {
			kind: 'Data flow diagram',
			alt: 'An app publishes to an SNS topic, which fans out to two SQS queues, each read by workers. Failed messages go to a dead-letter queue.',
			h: 225,
			nodes: [
				{ id: 'app', label: 'App', x: 48, y: 70, w: 80, h: 54, fill: 'sky' },
				{ id: 'sns', label: 'SNS\ntopic', x: 170, y: 70, w: 84, h: 62, fill: 'yellow' },
				{ id: 'q1', label: 'SQS\nemail', x: 305, y: 40, w: 84, h: 56, fill: 'pink' },
				{ id: 'q2', label: 'SQS\nstock', x: 305, y: 118, w: 84, h: 56, fill: 'pink' },
				{ id: 'w1', label: 'Worker', x: 430, y: 40, w: 84, h: 46, fill: 'mint' },
				{ id: 'w2', label: 'Worker', x: 430, y: 118, w: 84, h: 46, fill: 'mint' },
				{ id: 'dlq', label: 'Dead-letter queue', x: 345, y: 198, w: 170, h: 40 }
			],
			edges: [
				{ from: 'app', to: 'sns' },
				{ from: 'sns', to: 'q1' },
				{ from: 'sns', to: 'q2' },
				{ from: 'q1', to: 'w1' },
				{ from: 'q2', to: 'w2' },
				{ from: 'q2', to: 'dlq', dashed: true }
			],
			steps: [
				{ say: 'The app publishes one message and gets on with its work.', send: [['app', 'sns']] },
				{
					say: 'SNS copies it into every subscribed queue.',
					send: [
						['sns', 'q1'],
						['sns', 'q2']
					],
					light: ['q1', 'q2']
				},
				{
					say: 'Workers pull messages at their own speed.',
					send: [
						['q1', 'w1'],
						['q2', 'w2']
					]
				},
				{
					say: 'A spike hits. The queue grows, but nothing falls over.',
					set: { q1: 'SQS: 9,000\nwaiting' },
					down: ['w2'],
					send: [['sns', 'q1']],
					light: ['q1']
				},
				{
					say: 'A message that keeps failing moves to the dead-letter queue, so the rest keep flowing.',
					send: [['q2', 'dlq']],
					light: ['dlq']
				}
			]
		}
	},
	{
		id: 'caching',
		part: DATA,
		title: 'Caching with ElastiCache',
		summary:
			'A cache keeps a copy of expensive results in memory. Done well, it cuts latency and takes load off your database. Done badly, it serves stale data with great confidence.',
		points: [
			[
				'Amazon ElastiCache',
				'managed in-memory caching with engines such as Valkey and Redis OSS.'
			],
			['DynamoDB Accelerator', 'DAX is an in-memory cache built specifically for DynamoDB.'],
			['Cache-aside', 'check the cache, read the database on a miss, then store the result.'],
			[
				'Eviction',
				'LRU drops the least recently used entry when full. A TTL expires entries after a set time.'
			]
		],
		tip: 'Invalidation is the hard part. Give every entry a TTL, even when you also delete it on write.',
		links: [
			['Amazon ElastiCache', 'https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/WhatIs.html']
		],
		sketch: {
			kind: 'Data flow diagram',
			alt: 'Cache-aside: the app checks ElastiCache first, reads RDS on a miss, then saves a copy in the cache.',
			h: 220,
			nodes: [
				{ id: 'app', label: 'App', x: 65, y: 110, w: 96, h: 64, fill: 'sky' },
				{ id: 'cache', label: 'ElastiCache\nempty', x: 345, y: 45, w: 130, h: 62, fill: 'yellow' },
				{ id: 'db', label: 'RDS', x: 345, y: 175, w: 110, h: 72, shape: 'db' }
			],
			edges: [
				{ from: 'app', to: 'cache', label: '1. check' },
				{ from: 'app', to: 'db', label: '2. on a miss' },
				{ from: 'db', to: 'cache', label: '3. save', dashed: true }
			],
			steps: [
				{
					say: 'The app wants a product page, so it checks the cache first.',
					send: [['app', 'cache']],
					light: ['cache']
				},
				{
					say: 'It is a miss. The app falls back to the database, which is slower.',
					send: [['app', 'db']],
					light: ['db']
				},
				{
					say: 'The result is saved in the cache for next time.',
					send: [['db', 'cache']],
					set: { cache: 'ElastiCache\nproduct:42' }
				},
				{
					say: 'The next thousand requests are hits. The database is left alone.',
					send: [['app', 'cache']],
					set: { cache: 'ElastiCache\nproduct:42' },
					light: ['cache']
				},
				{
					say: 'When the price changes, the entry is deleted or expires, so the next read is fresh.',
					set: { cache: 'ElastiCache\nexpired' },
					light: ['cache']
				}
			]
		}
	},
	{
		id: 'rds',
		title: 'Relational scaling: RDS and Aurora',
		summary:
			'Amazon RDS runs relational databases for you. Two separate features are often confused: Multi-AZ is for surviving failure, and read replicas are for handling more reads.',
		points: [
			[
				'Multi-AZ',
				'keeps a synchronous standby in another zone and fails over automatically. It is for availability.'
			],
			[
				'Read replicas',
				'asynchronous copies that take read traffic. They are for scale, and they can lag.'
			],
			[
				'Amazon Aurora',
				'a MySQL and PostgreSQL compatible database with shared storage across zones and up to 15 read replicas.'
			],
			[
				'Connection pooling',
				'RDS Proxy shares connections, which helps when Lambda or many instances connect at once.'
			]
		],
		tip: 'Multi-AZ protects you. Read replicas speed you up. Most production systems need the first before the second.',
		links: [
			[
				'RDS Multi-AZ',
				'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html'
			]
		],
		sketch: {
			kind: 'Deployment diagram',
			alt: 'The app writes to the primary database, which copies to a standby synchronously and to a read replica asynchronously. The app reads from the replica.',
			h: 225,
			nodes: [
				{ id: 'app', label: 'App', x: 50, y: 112, w: 80, h: 58, fill: 'sky' },
				{ id: 'p', label: 'Primary', x: 235, y: 112, w: 110, h: 76, shape: 'db', fill: 'yellow' },
				{ id: 's', label: 'Standby', x: 415, y: 48, w: 110, h: 76, shape: 'db', fill: 'mint' },
				{
					id: 'r',
					label: 'Read\nreplica',
					x: 415,
					y: 176,
					w: 110,
					h: 76,
					shape: 'db',
					fill: 'pink'
				}
			],
			edges: [
				{ from: 'app', to: 'p', label: 'writes' },
				{ from: 'p', to: 's', label: 'sync' },
				{ from: 'p', to: 'r', label: 'async' }
			],
			steps: [
				{ say: 'All writes go to the primary.', send: [['app', 'p']], light: ['p'] },
				{
					say: 'The standby confirms each write, so it is always up to date. It serves no traffic.',
					send: [['p', 's']],
					light: ['s']
				},
				{
					say: 'The replica catches up a moment later, and takes the read traffic.',
					send: [
						['p', 'r'],
						['app', 'r']
					],
					light: ['r']
				},
				{ say: 'The primary fails.', down: ['p'] },
				{
					say: 'RDS promotes the standby automatically, with no data lost.',
					hide: ['p'],
					set: { s: 'New\nprimary' },
					send: [['app', 's']],
					light: ['s']
				}
			]
		}
	},
	{
		id: 'dynamodb',
		title: 'Massive scale: DynamoDB',
		summary:
			'DynamoDB is a key-value and document database built to stay fast at any size. It spreads data across partitions by hashing your partition key, so the design of that key decides how well it scales.',
		points: [
			[
				'Partition key',
				'decides which partition holds an item. Choose one with many distinct values.'
			],
			['Hot partition', 'one popular key can overload its partition however large the table is.'],
			['On-demand mode', 'pay per request and let the table absorb traffic changes.'],
			[
				'Access patterns',
				'design tables around your queries up front, because joins do not exist here.'
			]
		],
		tip: 'Write down your queries before you design the table. With DynamoDB, the order is reversed.',
		links: [
			[
				'Amazon DynamoDB',
				'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html'
			]
		],
		sketch: {
			kind: 'Data flow diagram',
			alt: 'An app sends items to DynamoDB, where a hash of the partition key decides which of three partitions stores each one.',
			h: 225,
			nodes: [
				{ id: 'app', label: 'App', x: 50, y: 112, w: 80, h: 58, fill: 'sky' },
				{
					id: 'h',
					label: 'Hash the\npartition key',
					x: 195,
					y: 112,
					w: 128,
					h: 66,
					fill: 'yellow'
				},
				{ id: 'a', label: 'Partition 1', x: 395, y: 38, w: 130, h: 62, shape: 'db', fill: 'mint' },
				{ id: 'b', label: 'Partition 2', x: 395, y: 112, w: 130, h: 62, shape: 'db', fill: 'mint' },
				{ id: 'c', label: 'Partition 3', x: 395, y: 186, w: 130, h: 62, shape: 'db', fill: 'mint' }
			],
			edges: [
				{ from: 'app', to: 'h' },
				{ from: 'h', to: 'a' },
				{ from: 'h', to: 'b' },
				{ from: 'h', to: 'c' }
			],
			steps: [
				{
					say: 'Saving user-17: the key is hashed, and the hash picks partition 2.',
					send: [
						['app', 'h'],
						['h', 'b']
					],
					set: { h: 'hash(user-17)' },
					light: ['b']
				},
				{
					say: 'Saving user-92 lands on partition 3. Many different keys spread the load.',
					send: [
						['app', 'h'],
						['h', 'c']
					],
					set: { h: 'hash(user-92)' },
					light: ['c']
				},
				{
					say: 'Reading by key goes straight to one partition, so it stays fast at any size.',
					send: [['h', 'a']],
					set: { h: 'hash(user-03)' }
				},
				{
					say: "A bad key, like today's date, sends every write to one hot partition.",
					send: [['h', 'a']],
					set: { h: 'hash(today)' },
					light: ['a']
				}
			]
		}
	},
	{
		id: 'reliability',
		part: FAILURE,
		title: 'Designing for failure',
		summary:
			'Disks die, networks drop and deploys go wrong. Reliable systems expect all of this and limit how far the damage spreads.',
		points: [
			['Redundancy', 'run at least two of everything important, ideally in different zones.'],
			[
				'Timeouts',
				'never wait forever. One slow dependency can otherwise tie up every thread you have.'
			],
			[
				'Backoff and jitter',
				'wait longer between retries and randomise the delay, or retries become their own traffic spike.'
			],
			[
				'Circuit breaker',
				'after repeated failures, stop calling the sick service for a while and fail fast.'
			],
			['Graceful degradation', 'turn off recommendations and keep checkout working.']
		],
		tip: 'Only retry operations that are safe to repeat, or make them safe with an idempotency key.',
		links: [
			[
				'Reliability pillar',
				'https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html'
			]
		],
		sketch: {
			kind: 'State diagram',
			alt: 'A circuit breaker moves from closed to open after too many failures, from open to half-open after a wait, and from half-open back to closed when a test call passes.',
			h: 205,
			nodes: [
				{
					id: 'closed',
					label: 'Closed\ncalls go through',
					x: 85,
					y: 55,
					w: 145,
					h: 62,
					fill: 'mint'
				},
				{ id: 'open', label: 'Open\nfail fast', x: 395, y: 55, w: 140, h: 62, fill: 'pink' },
				{
					id: 'half',
					label: 'Half-open\none test call',
					x: 240,
					y: 168,
					w: 130,
					h: 62,
					fill: 'yellow'
				}
			],
			edges: [
				{ from: 'closed', to: 'open', label: 'too many failures' },
				{ from: 'open', to: 'half', label: 'after a wait' },
				{ from: 'half', to: 'closed', label: 'test passes' }
			],
			steps: [
				{
					say: 'All is well. The breaker is closed, so calls go straight through.',
					light: ['closed']
				},
				{
					say: 'The downstream service starts failing, and failures add up. The breaker trips open.',
					send: [['closed', 'open']],
					light: ['open']
				},
				{
					say: 'While open, calls fail at once. The sick service gets room to recover.',
					light: ['open']
				},
				{
					say: 'After a wait, one test call is let through.',
					send: [['open', 'half']],
					light: ['half']
				},
				{
					say: 'It works, so the breaker closes and traffic returns to normal.',
					send: [['half', 'closed']],
					light: ['closed']
				}
			]
		}
	},
	{
		id: 'reference',
		title: 'Putting it together',
		summary:
			'You do not build all of this on day one. A scalable AWS system usually grows in stages, each one fixing the bottleneck you actually have. Watch one app grow from a single server.',
		points: [
			['Stage 1', 'one EC2 instance and a managed database. Fine for your first users.'],
			['Stage 2', 'a load balancer and an Auto Scaling group across two zones.'],
			['Stage 3', 'CloudFront and S3 for files, ElastiCache for repeated reads.'],
			['Stage 4', 'read replicas for the database and SQS for slow background work.']
		],
		tip: 'Measure first, then fix the one bottleneck you can prove. The rest can wait.',
		sketch: {
			kind: 'Deployment diagram',
			alt: 'Users reach CloudFront, then a load balancer, then an Auto Scaling group, which uses ElastiCache, RDS with a read replica, and an SQS queue with workers.',
			h: 258,
			nodes: [
				{ id: 'user', label: 'Users', x: 22, y: 88, shape: 'person' },
				{ id: 'cf', label: 'CloudFront', x: 138, y: 40, w: 104, h: 44, fill: 'yellow' },
				{ id: 'lb', label: 'Load\nbalancer', x: 138, y: 140, w: 104, h: 58, fill: 'yellow' },
				{ id: 'app', label: 'Auto\nScaling', x: 275, y: 140, w: 92, h: 66, fill: 'sky' },
				{ id: 'cache', label: 'Cache', x: 275, y: 40, w: 92, h: 44, fill: 'mint' },
				{ id: 'db', label: 'RDS', x: 420, y: 132, w: 92, h: 70, shape: 'db', fill: 'mint' },
				{ id: 'rep', label: 'Replica', x: 420, y: 33, w: 92, h: 54, shape: 'db', fill: 'pink' },
				{ id: 'q', label: 'SQS + workers', x: 345, y: 232, w: 150, h: 42, fill: 'pink' }
			],
			edges: [
				{ from: 'user', to: 'cf' },
				{ from: 'user', to: 'lb' },
				{ from: 'lb', to: 'app' },
				{ from: 'app', to: 'cache' },
				{ from: 'app', to: 'db' },
				{ from: 'db', to: 'rep' },
				{ from: 'app', to: 'q' }
			],
			steps: [
				{
					say: 'Stage 1: one server and a database. Simple, cheap and enough for now.',
					hide: ['cf', 'lb', 'cache', 'rep', 'q'],
					set: { app: 'One\nEC2' },
					send: [
						['user', 'app'],
						['app', 'db']
					]
				},
				{
					say: 'Stage 2: that server is the limit, so add a load balancer and more instances.',
					hide: ['cf', 'cache', 'rep', 'q'],
					send: [
						['user', 'lb'],
						['lb', 'app']
					],
					light: ['lb', 'app']
				},
				{
					say: 'Stage 3: pages feel slow, so serve files from the edge and cache repeated reads.',
					hide: ['rep', 'q'],
					send: [
						['user', 'cf'],
						['app', 'cache']
					],
					light: ['cf', 'cache']
				},
				{
					say: 'Stage 4: the database is busy, so add a replica and move slow work to a queue.',
					send: [
						['db', 'rep'],
						['app', 'q']
					],
					light: ['rep', 'q']
				}
			]
		}
	}
];
