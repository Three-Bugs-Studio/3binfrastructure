import type { Topic } from './sketch';

const START = 'Start with the foundations';
const TRAFFIC = 'Handling more traffic';
const COMPUTE = 'Running your code';
const DATA = 'Scaling the data layer';
const SECURE = 'Locking it down';
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
					title: 'Operational excellence',
					say: 'Operational excellence: can you deploy and fix things without manual heroics?',
					detail:
						'This pillar is about how the system is run day to day. Infrastructure as code, small frequent deploys and automatic rollbacks mean a fix does not depend on one person remembering the steps. Runbooks and blameless reviews after each incident turn outages into lessons.',
					send: [['w', 'ops']],
					light: ['ops']
				},
				{
					title: 'Security',
					say: 'Security: who can reach what, and is the data protected?',
					detail:
						'Security reviews who and what can reach each resource, and how data is protected when stored and when moving. On AWS that means least-privilege IAM policies, private networks and encryption with keys held in KMS. AWS secures the physical cloud, but the settings inside your account are your job.',
					send: [['w', 'sec']],
					light: ['sec']
				},
				{
					title: 'Reliability',
					say: 'Reliability: what happens when a server or a whole data centre fails?',
					detail:
						'Reliability asks whether the workload keeps serving when parts fail or demand shifts. The usual answers are at least two Availability Zones, automatic health checks and tested backups. Two targets make it concrete: how long you may be down (RTO) and how much recent data you may lose (RPO).',
					send: [['w', 'rel']],
					light: ['rel']
				},
				{
					title: 'Performance efficiency',
					say: 'Performance efficiency: does it stay fast as usage grows?',
					detail:
						'This pillar checks that you chose the right kind of resource and that it can grow. A cache, a CDN or the right database often matters more than a bigger server. Measure latency at the 99th percentile, not just the average, because the slowest 1% of requests is where users feel the pain.',
					send: [['w', 'perf']],
					light: ['perf']
				},
				{
					title: 'Cost optimization',
					say: 'Cost optimization: are you paying for capacity that sits idle?',
					detail:
						'Cost reviews look for capacity you pay for but rarely use, such as servers sized for a peak that comes once a year. Auto Scaling, right-sizing and switching off test environments at night are the quick wins. For steady load, Savings Plans can cut compute prices sharply in return for a one or three year commitment.',
					send: [['w', 'cost']],
					light: ['cost']
				},
				{
					title: 'Sustainability',
					say: 'Sustainability: could the same work use less?',
					detail:
						'Sustainability, the newest pillar, asks you to cut the energy and hardware behind each unit of work. Keeping machines busy instead of idle, choosing efficient chips such as Graviton and deleting data nobody reads all help. It usually lines up with cost, because idle servers waste both money and power.',
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
					title: 'Spread across zones',
					say: 'The load balancer spreads traffic across app servers in two separate zones.',
					detail:
						'The load balancer runs in every zone you enable and can send each request to a healthy server in either one. The zones have separate power, cooling and networking, so a fault in one rarely touches the other. They are linked by fast private fibre, usually with single-digit millisecond latency between them.',
					send: [
						['lb', 'a'],
						['lb', 'b']
					]
				},
				{
					title: 'Copy to the standby',
					say: 'Every write goes to the primary database and is copied to a standby in the other zone.',
					detail:
						'This is RDS Multi-AZ. A write only counts as done once the standby in the other zone has stored it too. That synchronous copy adds a little time to each write, but the standby never falls behind. It serves no traffic of its own and exists only to take over.',
					send: [
						['a', 'da'],
						['da', 'db']
					],
					light: ['db']
				},
				{
					title: 'Zone A goes dark',
					say: 'A power failure takes out all of Zone A.',
					detail:
						'Losing a whole zone is rare, but power, cooling and network faults have caused it. Everything in Zone A stops at once, both the app server and the primary database. A system built in a single zone would now be fully offline until AWS fixed the fault.',
					down: ['a', 'da'],
					light: ['azA']
				},
				{
					title: 'Health checks reroute',
					say: 'Health checks notice, and traffic now goes only to Zone B.',
					detail:
						'The load balancer sends a small request to each server on a regular schedule. After a set number of failures in a row it marks that server unhealthy and routes around it. The Application Load Balancer defaults are a 30 second interval and 2 failures, so about a minute, and both can be tuned lower.',
					down: ['a', 'da'],
					send: [['lb', 'b']]
				},
				{
					title: 'Standby takes over',
					say: 'The standby becomes the new primary. Users barely notice.',
					detail:
						'RDS spots the failed primary, promotes the standby and points the database DNS name at it. Apps that reconnect using that name reach the new primary with no config change. A Multi-AZ failover usually takes one to two minutes, so apps should retry dropped connections.',
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
					title: 'Look up the name',
					say: 'The browser asks Route 53 where the site lives.',
					detail:
						'Before anything loads, the browser needs an IP address for the domain name. Route 53 is the authoritative DNS server for your domain, so its answer is the final word. Each answer carries a TTL (time to live) that says how many seconds resolvers may reuse it before asking again.',
					send: [['user', 'dns']],
					light: ['dns']
				},
				{
					title: 'Go to the nearest edge',
					say: 'The answer points to the nearest CloudFront edge location.',
					detail:
						'Route 53 returns an alias record for your CloudFront distribution, and CloudFront then hands back addresses for an edge location close to the user. AWS runs hundreds of these edge locations around the world. This edge has nothing cached for your site yet.',
					send: [['user', 'cf']],
					set: { cf: 'CloudFront\ncache empty' }
				},
				{
					title: 'Fetch from S3 once',
					say: 'First visitor: the edge fetches the image from S3 and keeps a copy.',
					detail:
						'On a cache miss the edge requests the file from the origin, here an S3 bucket, and stores the response. How long it keeps the copy depends on the Cache-Control header or the cache policy, often a day or more for images. Origin Access Control lets the bucket stay private so only CloudFront can read it.',
					send: [['cf', 's3']],
					set: { cf: 'CloudFront\ncache empty' },
					light: ['s3']
				},
				{
					title: 'Served from the cache',
					say: 'Every visitor after that is served from the edge, and S3 is not touched.',
					detail:
						'Later requests for the same URL are answered straight from the edge, often in a few milliseconds. S3 sees no traffic, and you pay less for data leaving the bucket. CloudFront adds an X-Cache response header reading Hit from cloudfront, a quick way to check the cache is working.',
					send: [['user', 'cf']],
					set: { cf: 'CloudFront\ncached!' },
					light: ['cf']
				},
				{
					title: 'Dynamic requests pass on',
					say: 'Only dynamic requests, like placing an order, travel on to your servers.',
					detail:
						'Requests that change data or depend on who the user is cannot be cached, so CloudFront forwards them to the load balancer. You set this with cache behaviours by path, for example /api/* with caching turned off. They still gain a little, because the trip from the edge runs over the AWS network.',
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
					title: 'Share the requests',
					say: 'Requests arrive and get shared across all three servers.',
					detail:
						'An Application Load Balancer reads each HTTP request and passes it to one target in the target group. By default it takes the servers in turn (round robin), and it can pick the one with the fewest open requests instead. Users only ever see the load balancer address, never the servers behind it.',
					send: [
						['user', 'lb'],
						['lb', 'a'],
						['lb', 'b'],
						['lb', 'c']
					]
				},
				{
					title: 'A server crashes',
					say: 'App 3 crashes.',
					detail:
						'The app process on App 3 has died, but the load balancer does not know yet. Requests sent there in the meantime fail, and users may see a 502 Bad Gateway error. This short gap is why health checks run often and why clients should retry safe requests.',
					down: ['c'],
					send: [['lb', 'c']]
				},
				{
					title: 'Taken out of rotation',
					say: 'After a few failed health checks, the balancer stops sending it traffic.',
					detail:
						'The balancer has been calling a health path such as /health on every target. Once App 3 fails enough checks in a row (two by default), it is marked unhealthy and skipped. The balancer keeps checking it, so it can return if it recovers.',
					down: ['c'],
					set: { c: 'App 3 unhealthy' },
					light: ['lb']
				},
				{
					title: 'Healthy servers carry on',
					say: 'Users keep working on the two healthy servers.',
					detail:
						'The two remaining servers now share all the traffic, so each one is busier. This is why you keep spare room: if every server normally runs near full, losing one overloads the rest. A common rule is to size the fleet so it copes with one server, or a whole zone, missing.',
					hide: ['c'],
					send: [
						['lb', 'a'],
						['lb', 'b']
					]
				},
				{
					title: 'A replacement joins',
					say: 'A replacement passes its health check and joins in.',
					detail:
						'An Auto Scaling group or ECS service usually launches the replacement for you. The balancer only sends it traffic after it passes enough health checks, so a server that is still starting never gets requests. Slow start mode can then raise its share gradually instead of all at once.',
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
					title: 'A quiet morning',
					say: 'A quiet morning: two instances, CPU at a comfortable 45%.',
					detail:
						'The group sits at its minimum size of two instances, ideally one in each zone. CloudWatch collects the average CPU across the group every minute. At 45%, the target tracking policy aiming for 50% has nothing to do.',
					hide: ['c', 'd'],
					send: [
						['lb', 'a'],
						['lb', 'b']
					]
				},
				{
					title: 'Traffic spikes',
					say: 'A sale starts, and traffic triples. CPU climbs past the 50% target.',
					detail:
						'Three times the requests means each instance does roughly three times the work, so average CPU jumps well above target. Target tracking creates CloudWatch alarms for you, and the scale-out alarm fires once CPU stays high for about three minutes. That short wait stops one brief blip from adding servers.',
					hide: ['c', 'd'],
					set: { cw: 'CloudWatch\nCPU 88%' },
					send: [
						['lb', 'a'],
						['lb', 'b']
					],
					light: ['cw']
				},
				{
					title: 'Launch new instances',
					say: 'Auto Scaling launches new instances from the launch template.',
					detail:
						'Auto Scaling raises the desired count and starts EC2 instances from the launch template, which names the machine image, instance type and startup script. They are not ready yet, because booting and starting the app can take a few minutes. Baking the app into the image, or keeping a warm pool of pre-started instances, shortens that wait.',
					set: { cw: 'CloudWatch\nCPU 88%' },
					light: ['c', 'd']
				},
				{
					title: 'Back towards target',
					say: 'Once healthy they take traffic, and CPU falls back towards the target.',
					detail:
						'Each new instance registers with the load balancer and receives traffic once its health checks pass. With four instances sharing the work, average CPU settles near 50%. The target leaves spare room on purpose, so the next jump does not overload the fleet before more instances arrive.',
					set: { cw: 'CloudWatch\nCPU 48%' },
					send: [
						['lb', 'a'],
						['lb', 'b'],
						['lb', 'c'],
						['lb', 'd']
					]
				},
				{
					title: 'Scale in at night',
					say: 'At night CPU drops, so instances are removed and you stop paying for them.',
					detail:
						'When CPU stays well below target, Auto Scaling terminates instances, but never below the minimum size. It scales in more cautiously than it scales out, waiting for about 15 minutes of low readings by default. A deregistration delay, 300 seconds by default, lets requests already in progress finish first.',
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
					title: 'Push the image',
					say: 'You push a new image to ECR and ask for three running copies.',
					detail:
						'You build the image with docker build, tag it with a version and run docker push to send it to an ECR repository. You then update the ECS service with a task definition that names this image, sets CPU and memory, and asks for a desired count of 3. Nothing is running yet.',
					light: ['ecr'],
					hide: ['a', 'b', 'c']
				},
				{
					title: 'Pull from ECR',
					say: 'ECS pulls the image.',
					detail:
						'ECS asks ECR for the image using the task execution role, an IAM role that allows the pull. Each new task downloads the image layers when it starts, so smaller images start faster. Tag every build with a unique version rather than reusing latest, so you always know what is running.',
					send: [['ecr', 'ecs']],
					hide: ['a', 'b', 'c']
				},
				{
					title: 'Start three tasks',
					say: 'Fargate finds the capacity and starts three tasks. You never see a server.',
					detail:
						'Fargate gives each task its own isolated slice of compute with exactly the CPU and memory you asked for. AWS patches and sizes the hosts underneath. Each task also gets its own network interface and private IP in your VPC, which is how a load balancer reaches it.',
					send: [
						['ecs', 'a'],
						['ecs', 'b'],
						['ecs', 'c']
					]
				},
				{
					title: 'A task stops',
					say: 'Task 2 crashes, so the running count no longer matches what you asked for.',
					detail:
						'The ECS service scheduler keeps comparing the running count with the desired count. When a container exits or fails its health check, the task stops and the count drops from 3 to 2. The stopped task keeps its stop reason and exit code for a while, the first place to look when debugging.',
					down: ['b']
				},
				{
					title: 'Replace the task',
					say: 'ECS notices the gap and starts a replacement.',
					detail:
						'ECS launches a new task from the same task definition to bring the count back to 3. If tasks keep crashing straight after starting, ECS waits longer between attempts instead of looping at full speed. The deployment circuit breaker can also roll back a new version that never becomes healthy.',
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
				{
					title: 'Nothing running',
					say: 'Nobody is using the app, so nothing is running.',
					detail:
						'With no requests there are no execution environments, and Lambda charges nothing for compute. You pay per request and per millisecond of run time, scaled by the memory you give the function. DynamoDB in on-demand mode bills the same way, so an idle app costs close to zero.',
					light: ['fn']
				},
				{
					title: 'Invoke a function',
					say: 'A request arrives and API Gateway invokes a function.',
					detail:
						'API Gateway turns the HTTP request into an event and calls your function with it. If no warm environment exists, Lambda first creates one and runs your setup code, which is the cold start. A cold start often adds a few hundred milliseconds, more for large packages or heavy runtimes.',
					send: [
						['user', 'api'],
						['api', 'fn']
					],
					set: { fn: 'Lambda\n1 running' }
				},
				{
					title: 'Read and write data',
					say: 'It reads and writes DynamoDB, and the response goes back.',
					detail:
						'The function calls DynamoDB over HTTPS through the AWS SDK, so there is no pool of database connections to run out of. Its execution role must allow the exact actions, such as dynamodb:GetItem on that table. Afterwards the environment stays warm for a while and can serve the next request without a cold start.',
					send: [['fn', 'db']],
					set: { fn: 'Lambda\n1 running' }
				},
				{
					title: 'Scale out by copies',
					say: 'A post goes viral. Each extra request gets its own copy.',
					detail:
						'Each environment handles one request at a time, so 800 requests in flight need 800 environments. The default limit is 1,000 concurrent executions per Region, shared by every function in the account, and you can ask AWS to raise it. Past the limit, extra requests are throttled and callers get an error.',
					send: [
						['user', 'api'],
						['api', 'fn']
					],
					set: { fn: 'Lambda\n800 running' },
					light: ['fn']
				},
				{
					title: 'Pay for work done',
					say: 'Traffic fades, and you were only billed for the work actually done.',
					detail:
						'Lambda bills each run by its duration, rounded up to the nearest millisecond, plus a small fee per request. As traffic drops, idle environments are shut down and the count falls back to zero. The free tier covers one million requests a month, so small apps often pay nothing for compute.',
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
				{
					title: 'Publish and move on',
					say: 'The app publishes one message and gets on with its work.',
					detail:
						'The app sends one message, such as order placed, to the SNS topic and replies to the user straight away. It does not know or care which services will act on it. Publishing takes milliseconds, while doing the email and stock work inline would make the user wait for both.',
					send: [['app', 'sns']]
				},
				{
					title: 'Fan out to queues',
					say: 'SNS copies it into every subscribed queue.',
					detail:
						'Each queue is subscribed to the topic, so SNS delivers a separate copy to each one. Adding a new consumer means adding a queue and a subscription, with no change to the app. A subscription filter policy lets a queue receive only the messages it cares about.',
					send: [
						['sns', 'q1'],
						['sns', 'q2']
					],
					light: ['q1', 'q2']
				},
				{
					title: 'Workers pull messages',
					say: 'Workers pull messages at their own speed.',
					detail:
						'Workers poll their queue, ideally with long polling of up to 20 seconds so they do not make empty requests. A received message is hidden from other workers for the visibility timeout while it is processed. The worker deletes it when done, and if the worker crashes first, the message reappears for another try.',
					send: [
						['q1', 'w1'],
						['q2', 'w2']
					]
				},
				{
					title: 'Absorb the spike',
					say: 'A spike hits. The queue grows, but nothing falls over.',
					detail:
						'Messages arrive faster than the workers can handle them, and one worker is down. The queue simply holds the backlog, for 4 days by default and up to 14. Watching the age of the oldest message tells you when to add more workers.',
					set: { q1: 'SQS: 9,000\nwaiting' },
					down: ['w2'],
					send: [['sns', 'q1']],
					light: ['q1']
				},
				{
					title: 'Park the poison message',
					say: 'A message that keeps failing moves to the dead-letter queue, so the rest keep flowing.',
					detail:
						'Every time a message is received, its receive count goes up. Once the count passes the maxReceiveCount in the redrive policy, SQS moves the message to the dead-letter queue. You can inspect it there, fix the bug and redrive it back to the main queue.',
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
					title: 'Check the cache first',
					say: 'The app wants a product page, so it checks the cache first.',
					detail:
						'The app builds a key such as product:42 and asks ElastiCache for it with a GET. An in-memory lookup inside the same Region usually answers in well under a millisecond. Right now the cache is empty, as it is after every restart.',
					send: [['app', 'cache']],
					light: ['cache']
				},
				{
					title: 'Cache miss',
					say: 'It is a miss. The app falls back to the database, which is slower.',
					detail:
						'The cache returns nothing, so the app runs its normal query against RDS. That can take tens of milliseconds and uses database CPU and connections. This first slow read is the price of cache-aside, because the cache only fills as data is asked for.',
					send: [['app', 'db']],
					light: ['db']
				},
				{
					title: 'Save for next time',
					say: 'The result is saved in the cache for next time.',
					detail:
						'The app writes the result into the cache with a TTL, for example SET product:42 with EX 300 for five minutes. In cache-aside the app does this itself, and the database knows nothing about the cache. Storing a ready-made result saves both the query and the work of building it.',
					send: [['db', 'cache']],
					set: { cache: 'ElastiCache\nproduct:42' }
				},
				{
					title: 'Hits spare the database',
					say: 'The next thousand requests are hits. The database is left alone.',
					detail:
						'Every request for the same key now comes from memory, so the database does no work for them. A hit rate above 90% is common for popular data, which lets a small database serve a large site. Watch for a stampede: when a hot key expires, many requests can miss at once and all hit the database.',
					send: [['app', 'cache']],
					set: { cache: 'ElastiCache\nproduct:42' },
					light: ['cache']
				},
				{
					title: 'Expire stale entries',
					say: 'When the price changes, the entry is deleted or expires, so the next read is fresh.',
					detail:
						'When the price is updated, the app deletes product:42 so the next read misses and loads the new value. The TTL is a safety net for a delete that never happens, so stale data lives at most a few minutes. Deleting instead of overwriting avoids races where two writers leave the older value behind.',
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
				{
					title: 'Writes go to the primary',
					say: 'All writes go to the primary.',
					detail:
						'An RDS database has a single writer, so every INSERT, UPDATE and DELETE goes there. The app connects through an endpoint, which is a DNS name rather than a fixed IP address. That matters later, because the name can be moved to another server during a failover.',
					send: [['app', 'p']],
					light: ['p']
				},
				{
					title: 'Synchronous standby',
					say: 'The standby confirms each write, so it is always up to date. It serves no traffic.',
					detail:
						'With Multi-AZ, the primary waits for the standby to store each write before telling the app it succeeded. That adds a little write latency but means the two copies never differ. Because the standby takes no reads, it adds safety, not capacity.',
					send: [['p', 's']],
					light: ['s']
				},
				{
					title: 'Replica serves reads',
					say: 'The replica catches up a moment later, and takes the read traffic.',
					detail:
						'A read replica receives changes asynchronously, so it can lag, usually by under a second but by much more under heavy load. The app sends reads to the replica endpoint, leaving the primary free for writes. A user who just saved something may not see it there yet, so those reads should go to the primary.',
					send: [
						['p', 'r'],
						['app', 'r']
					],
					light: ['r']
				},
				{
					title: 'The primary fails',
					say: 'The primary fails.',
					detail:
						'The primary might lose its disk, its host or its whole zone. Writes stop, and the replica stops receiving changes. Without Multi-AZ, recovery would mean restoring a backup or promoting the replica by hand, losing anything it had not copied yet.',
					down: ['p']
				},
				{
					title: 'Promote the standby',
					say: 'RDS promotes the standby automatically, with no data lost.',
					detail:
						'RDS moves the endpoint DNS name to the standby, which becomes the new primary, usually within one to two minutes. Every committed write was already on the standby, so nothing is lost. RDS then builds a fresh standby in another zone so you are protected again.',
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
					title: 'Hash picks a partition',
					say: 'Saving user-17: the key is hashed, and the hash picks partition 2.',
					detail:
						'DynamoDB runs the partition key through a hash function, which turns it into a number spread evenly across a range. Each partition owns one slice of that range, so the hash decides where user-17 lives. You never choose partitions yourself, and DynamoDB splits them as the table grows.',
					send: [
						['app', 'h'],
						['h', 'b']
					],
					set: { h: 'hash(user-17)' },
					light: ['b']
				},
				{
					title: 'Spread across partitions',
					say: 'Saving user-92 lands on partition 3. Many different keys spread the load.',
					detail:
						'Similar-looking keys such as user-17 and user-92 produce unrelated hashes, so they land on different partitions. Each partition handles up to 3,000 read units and 1,000 write units per second. An even spread across many partitions is what lets the whole table keep growing.',
					send: [
						['app', 'h'],
						['h', 'c']
					],
					set: { h: 'hash(user-92)' },
					light: ['c']
				},
				{
					title: 'Read by key',
					say: 'Reading by key goes straight to one partition, so it stays fast at any size.',
					detail:
						'A GetItem with the full key hashes it again and goes straight to the one partition that holds it. The work does not depend on table size, so a lookup stays in single-digit milliseconds even with billions of items. A Scan, by contrast, reads every partition and gets slower and dearer as the table grows.',
					send: [['h', 'a']],
					set: { h: 'hash(user-03)' }
				},
				{
					title: 'One hot partition',
					say: "A bad key, like today's date, sends every write to one hot partition.",
					detail:
						'If every write uses the same key, the hash is always the same, so one partition takes all the traffic while the others sit idle. Once it passes its per-partition limit, requests are throttled however much capacity the table has. Common fixes are a key with more distinct values, or adding a suffix such as 2024-05-01#7 and reading all suffixes back.',
					send: [['h', 'a']],
					set: { h: 'hash(today)' },
					light: ['a']
				}
			]
		}
	},
	{
		id: 'iam',
		part: SECURE,
		title: 'IAM and least privilege',
		summary:
			'IAM decides who may do what to which AWS resource. Everything is denied until a policy allows it, so the job is to allow as little as you can. Apps should get short-lived credentials from a role, never long-lived keys.',
		points: [
			[
				'Policy',
				'a JSON document listing allowed actions on specific resources, with optional conditions.'
			],
			['Role', 'an identity that a person or a service takes on to get temporary credentials.'],
			[
				'Least privilege',
				'grant only the actions and resources a task needs, then trim further as you learn.'
			],
			['Explicit deny', 'a deny in any policy beats every allow.'],
			['Root user', 'keep it for the few tasks that need it, and protect it with MFA.']
		],
		tip: 'Give EC2 instances and Lambda functions a role. Access keys in code end up in Git sooner or later.',
		code: `{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:GetObject", "s3:PutObject"],
    "Resource": "arn:aws:s3:::shop-uploads/*"
  }]
}`,
		links: [
			[
				'IAM best practices',
				'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html'
			],
			['IAM roles', 'https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html'],
			[
				'Policies and permissions',
				'https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html'
			]
		],
		sketch: {
			kind: 'Access diagram',
			alt: 'An app with a role may write to one S3 bucket. IAM denies everything else, so stolen credentials reach only that bucket and soon expire.',
			h: 205,
			nodes: [
				{ id: 'app', label: 'App on EC2\nwith a role', x: 80, y: 55, w: 140, h: 62, fill: 'sky' },
				{ id: 'atk', label: 'Stolen\ncredentials', x: 80, y: 155, w: 140, h: 62, fill: 'pink' },
				{ id: 'iam', label: 'IAM\npolicy check', x: 240, y: 105, w: 120, h: 66, fill: 'yellow' },
				{ id: 's3', label: 'S3 bucket\nshop-uploads', x: 400, y: 55, w: 140, h: 62, fill: 'mint' },
				{ id: 'db', label: 'DynamoDB\nusers table', x: 400, y: 155, w: 140, h: 62, fill: 'mint' }
			],
			edges: [
				{ from: 'app', to: 'iam' },
				{ from: 'atk', to: 'iam', dashed: true },
				{ from: 'iam', to: 's3' },
				{ from: 'iam', to: 'db' }
			],
			steps: [
				{
					title: 'Run with a role',
					say: 'The app runs with a role. AWS hands it short-lived credentials, so no keys sit in the code.',
					detail:
						'An instance profile attaches the role to the EC2 instance, and the AWS SDK fetches temporary credentials from the instance metadata service. They include an access key, a secret and a session token, and the SDK refreshes them before they expire. No secret is ever written into code or config files.',
					hide: ['atk'],
					light: ['app']
				},
				{
					title: 'Allowed by policy',
					say: 'It saves an upload. IAM checks the policy: PutObject on this one bucket is allowed.',
					detail:
						'IAM evaluates every API call against the policies attached to the role. Here a statement allows s3:PutObject on arn:aws:s3:::shop-uploads/*, and the request matches both the action and the resource. Anything outside that exact pair is not covered.',
					hide: ['atk'],
					send: [
						['app', 'iam'],
						['iam', 's3']
					],
					set: { iam: 'IAM\nallowed' },
					light: ['s3']
				},
				{
					title: 'Default deny',
					say: 'A bug tries to delete the users table. No policy allows it, so the default deny wins.',
					detail:
						'IAM starts from deny: a call succeeds only if some policy allows it and none explicitly denies it. No statement mentions dynamodb:DeleteTable, so the call fails with an AccessDenied error. The bug is stopped before it can do any damage.',
					hide: ['atk'],
					send: [['app', 'iam']],
					set: { iam: 'IAM\ndenied' },
					light: ['iam']
				},
				{
					title: 'Credentials stolen',
					say: 'An attacker steals the credentials through a flaw in the app.',
					detail:
						'A flaw such as server-side request forgery can trick the app into reading the metadata service and leaking its credentials. IMDSv2, which needs a session token fetched with a PUT request, blocks most of these attacks. Even so, plan as if a leak can still happen.',
					send: [['atk', 'iam']],
					light: ['atk']
				},
				{
					title: 'Blast radius stays small',
					say: 'They get only what the role allows: one bucket. The rest of the account is out of reach.',
					detail:
						'The attacker now acts as the role, so IAM applies exactly the same policy to them. They can touch shop-uploads, but every other bucket, table and service is denied. How far damage can spread is called the blast radius, and least privilege keeps it small.',
					send: [
						['atk', 'iam'],
						['iam', 's3']
					],
					set: { db: 'DynamoDB\nout of reach' },
					light: ['s3']
				},
				{
					title: 'Stolen keys expire',
					say: 'Role credentials expire within hours, so the stolen copy soon stops working.',
					detail:
						'Temporary credentials stop working once they expire, a few hours at most for an EC2 role. Long-lived access keys, by contrast, work until someone notices and deletes them, which can take months. CloudTrail logs every API call, so you can see what the stolen credentials did while they worked.',
					set: { atk: 'Stolen\nexpired' },
					down: ['atk']
				}
			]
		}
	},
	{
		id: 'vpc',
		title: 'VPC: subnets and security groups',
		summary:
			'A VPC is your own private network inside AWS. You split it into subnets, each in one Availability Zone, and security groups act as a firewall around every resource. The usual shape keeps only the load balancer public and everything else private.',
		points: [
			['Public subnet', 'its route table points at an internet gateway. Load balancers go here.'],
			['Private subnet', 'no direct route from the internet. App servers and databases live here.'],
			['NAT gateway', 'lets private servers reach out for updates, while nothing can reach in.'],
			[
				'Security group',
				'allow-only rules on each resource. They are stateful, so replies get back in by themselves.'
			],
			[
				'Group references',
				'allow the database port from the app security group, not from a range of IPs.'
			]
		],
		tip: 'Never open SSH or a database port to 0.0.0.0/0. Reach servers through Session Manager instead.',
		links: [
			[
				'How Amazon VPC works',
				'https://docs.aws.amazon.com/vpc/latest/userguide/how-it-works.html'
			],
			['Subnets', 'https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html'],
			[
				'Security groups',
				'https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html'
			]
		],
		sketch: {
			kind: 'Network diagram',
			alt: 'Users reach a load balancer in a public subnet. The app and database sit in a private subnet, and security groups let each layer talk only to the next.',
			h: 245,
			nodes: [
				{ id: 'vpc', label: 'VPC', x: 270, y: 122, w: 410, h: 236, shape: 'boundary' },
				{ id: 'pub', label: 'Public subnet', x: 270, y: 50, w: 390, h: 76, shape: 'boundary' },
				{ id: 'priv', label: 'Private subnet', x: 270, y: 170, w: 390, h: 128, shape: 'boundary' },
				{ id: 'user', label: 'Users', x: 25, y: 60, shape: 'person' },
				{ id: 'atk', label: 'Attacker', x: 25, y: 196, shape: 'person' },
				{ id: 'lb', label: 'Load\nbalancer', x: 270, y: 56, w: 110, h: 50, fill: 'yellow' },
				{ id: 'app', label: 'App\nsg-app', x: 170, y: 178, w: 110, h: 58, fill: 'sky' },
				{
					id: 'db',
					label: 'Database\nsg-db',
					x: 370,
					y: 178,
					w: 120,
					h: 70,
					shape: 'db',
					fill: 'mint'
				}
			],
			edges: [
				{ from: 'user', to: 'lb' },
				{ from: 'lb', to: 'app' },
				{ from: 'app', to: 'db', label: '5432' },
				{ from: 'atk', to: 'db', dashed: true }
			],
			steps: [
				{
					title: 'Public entry point',
					say: 'Only the load balancer sits in a public subnet, with a route to the internet.',
					detail:
						'A subnet is public when its route table sends 0.0.0.0/0 to an internet gateway. The load balancer has a public address there, and it is the only thing users can reach. In practice you use a public subnet in each of two zones, so the load balancer itself survives a zone failure.',
					send: [['user', 'lb']],
					light: ['lb']
				},
				{
					title: 'Layered security groups',
					say: 'Its security group allows HTTPS from anyone. The app group allows traffic only from the load balancer.',
					detail:
						'The load balancer group allows port 443 from 0.0.0.0/0. The app group allows the app port only from the load balancer security group, named by its ID instead of by IP addresses. When the load balancer gains new IPs as it scales, the rule still matches.',
					send: [['lb', 'app']],
					light: ['app']
				},
				{
					title: 'Database trusts sg-app',
					say: 'The database group allows port 5432 only from sg-app, so the app connects as normal.',
					detail:
						'The database security group has one inbound rule: TCP port 5432, the PostgreSQL port, with sg-app as the source. Any instance in that group can connect, including new ones Auto Scaling launches, and nothing else can. Because the rule names a group rather than addresses, it never goes stale.',
					send: [['app', 'db']],
					light: ['db']
				},
				{
					title: 'No route in',
					say: 'An attacker tries the database directly. It is in a private subnet, with no route in.',
					detail:
						'The database has only a private IP address, and nothing on the internet can route packets to it. Even with the right password the attacker cannot reach the port. Its security group would also drop the traffic, so two separate layers must fail before it is exposed.',
					send: [['atk', 'db']],
					down: ['atk']
				},
				{
					title: 'Replies flow back',
					say: 'Security groups are stateful, so the answers flow back out without any extra rules.',
					detail:
						'A security group remembers each connection it let in, so the reply packets are allowed back out automatically. You only write rules for who may start a connection. Network ACLs, the other VPC firewall, are stateless, so with those you must allow the return ports as well.',
					send: [
						['db', 'app'],
						['app', 'lb'],
						['lb', 'user']
					],
					light: ['user']
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
					title: 'Breaker closed',
					say: 'All is well. The breaker is closed, so calls go straight through.',
					detail:
						'A circuit breaker is a small wrapper around calls to another service. While closed, it passes every call through and counts how many fail or time out. Each call still needs its own timeout, or a hung service would never count as a failure.',
					light: ['closed']
				},
				{
					title: 'Trip to open',
					say: 'The downstream service starts failing, and failures add up. The breaker trips open.',
					detail:
						'Once failures cross a threshold, for example half of the calls in the last 10 seconds, the breaker switches to open. Counting a rate over a window rather than single errors stops one blip from tripping it. Libraries such as Resilience4j for Java and Polly for .NET provide this ready made.',
					send: [['closed', 'open']],
					light: ['open']
				},
				{
					title: 'Fail fast',
					say: 'While open, calls fail at once. The sick service gets room to recover.',
					detail:
						'In the open state the breaker rejects calls instantly without contacting the service. Your app can show a fallback, such as cached data or a friendly message, instead of waiting on a timeout. Threads and connections stay free, so the failure does not spread to the callers.',
					light: ['open']
				},
				{
					title: 'Half-open test',
					say: 'After a wait, one test call is let through.',
					detail:
						'After a cool-down period, often 30 to 60 seconds, the breaker lets a single trial call through. Only one call is risked, so a still-sick service is not flooded with traffic. If that call fails, the breaker goes straight back to open and waits again.',
					send: [['open', 'half']],
					light: ['half']
				},
				{
					title: 'Close and recover',
					say: 'It works, so the breaker closes and traffic returns to normal.',
					detail:
						'A successful trial shows the service is healthy again, so the breaker resets its failure count and closes. Some breakers wait for several successful trial calls before closing. That avoids flapping between open and closed on one lucky success.',
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
		links: [['AWS Architecture Center', 'https://aws.amazon.com/architecture/']],
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
					title: 'Start with one server',
					say: 'Stage 1: one server and a database. Simple, cheap and enough for now.',
					detail:
						'A single EC2 instance with a managed RDS database can serve a surprising number of users if the code is sensible. Using a managed database from day one means backups and patching are handled for you. Basic CloudWatch alarms at this stage show which part runs out first.',
					hide: ['cf', 'lb', 'cache', 'rep', 'q'],
					set: { app: 'One\nEC2' },
					send: [
						['user', 'app'],
						['app', 'db']
					]
				},
				{
					title: 'Add more instances',
					say: 'Stage 2: that server is the limit, so add a load balancer and more instances.',
					detail:
						'One server is both a single point of failure and a hard ceiling. A load balancer in front of an Auto Scaling group across two zones fixes both at once. Move sessions and uploaded files off the instance first, because every instance must be interchangeable.',
					hide: ['cf', 'cache', 'rep', 'q'],
					send: [
						['user', 'lb'],
						['lb', 'app']
					],
					light: ['lb', 'app']
				},
				{
					title: 'Edge and cache',
					say: 'Stage 3: pages feel slow, so serve files from the edge and cache repeated reads.',
					detail:
						'Most traffic is repeated reads of the same pages and files. CloudFront serves static files from the edge and ElastiCache keeps hot query results in memory, so the app and the database both do less work. These are often the cheapest big wins in the whole design.',
					hide: ['rep', 'q'],
					send: [
						['user', 'cf'],
						['app', 'cache']
					],
					light: ['cf', 'cache']
				},
				{
					title: 'Replica and queue',
					say: 'Stage 4: the database is busy, so add a replica and move slow work to a queue.',
					detail:
						'When the database is still the bottleneck, a read replica takes read-only queries off the primary. Slow jobs such as sending email or resizing images move to SQS, so web requests return quickly while workers catch up. Each stage was added only after measurements showed the need.',
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
