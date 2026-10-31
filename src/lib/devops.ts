import type { Topic } from './sketch';

const BASICS = 'The DevOps way of working';
const PIPELINE = 'Building the pipeline';
const RUN = 'Packaging and running';
const ENVIRONMENTS = 'Real environments: Dev, Test, Production';
const RELEASE = 'Releasing safely';
const OPERATE = 'Operating in production';

export const devops: Topic[] = [
	{
		id: 'loop',
		part: BASICS,
		title: 'What DevOps is',
		summary:
			'DevOps is a way of working where the people who build software also take responsibility for running it. The aim is small, frequent, safe changes, supported by automation and quick feedback. It is a culture first and a set of tools second.',
		points: [
			['Shared ownership', 'no wall between "dev wrote it" and "ops must run it".'],
			['Automation', 'anything repeated, like tests and deploys, is done by machines.'],
			['Small batches', 'small changes are easier to review, test and roll back.'],
			['Feedback', 'production data flows back and shapes what gets built next.']
		],
		tip: 'If a release feels scary, release more often and make each one smaller.',
		sketch: {
			kind: 'Cycle diagram',
			alt: 'A loop of plan, code, build, test, release, deploy, operate and monitor, then back to plan.',
			h: 200,
			nodes: [
				{ id: 'plan', label: 'Plan', x: 60, y: 45, w: 82, h: 48, fill: 'sky' },
				{ id: 'code', label: 'Code', x: 180, y: 45, w: 82, h: 48, fill: 'sky' },
				{ id: 'build', label: 'Build', x: 300, y: 45, w: 82, h: 48, fill: 'sky' },
				{ id: 'test', label: 'Test', x: 420, y: 45, w: 82, h: 48, fill: 'sky' },
				{ id: 'rel', label: 'Release', x: 420, y: 155, w: 82, h: 48, fill: 'mint' },
				{ id: 'dep', label: 'Deploy', x: 300, y: 155, w: 82, h: 48, fill: 'mint' },
				{ id: 'run', label: 'Operate', x: 180, y: 155, w: 82, h: 48, fill: 'mint' },
				{ id: 'mon', label: 'Monitor', x: 60, y: 155, w: 82, h: 48, fill: 'yellow' }
			],
			edges: [
				{ from: 'plan', to: 'code' },
				{ from: 'code', to: 'build' },
				{ from: 'build', to: 'test' },
				{ from: 'test', to: 'rel' },
				{ from: 'rel', to: 'dep' },
				{ from: 'dep', to: 'run' },
				{ from: 'run', to: 'mon' },
				{ from: 'mon', to: 'plan' }
			],
			steps: [
				{
					say: 'An idea becomes a small, clear piece of work.',
					send: [['plan', 'code']],
					light: ['code']
				},
				{
					say: 'Code is merged, and a machine builds it.',
					send: [['code', 'build']],
					light: ['build']
				},
				{
					say: 'Automated tests give an answer within minutes.',
					send: [['build', 'test']],
					light: ['test']
				},
				{
					say: 'The tested build is released and deployed, usually without anyone clicking anything.',
					send: [
						['test', 'rel'],
						['rel', 'dep']
					],
					light: ['dep']
				},
				{
					say: 'It runs for real users, and the team watches how it behaves.',
					send: [
						['dep', 'run'],
						['run', 'mon']
					],
					light: ['mon']
				},
				{
					say: 'What they learn feeds the next plan. The loop never stops.',
					send: [['mon', 'plan']],
					light: ['plan']
				}
			]
		}
	},
	{
		id: 'dora',
		title: 'Measuring it: DORA metrics',
		summary:
			'Years of research from the DORA team show that software delivery can be measured, and that speed and stability go together. High performers are both faster and safer. Four metrics are the classic starting point.',
		points: [
			['Deployment frequency', 'how often you ship to production.'],
			['Lead time for changes', 'how long a commit takes to reach production.'],
			['Change failure rate', 'how many deployments cause a problem.'],
			['Time to restore', 'how quickly you recover from a failure.']
		],
		tip: 'Use these to improve the system, never to rank individual people.',
		links: [['DORA metrics', 'https://dora.dev/guides/dora-metrics/']],
		sketch: {
			kind: 'Metrics map',
			alt: 'Two delivery speed metrics, deployment frequency and lead time, sit beside two stability metrics, change failure rate and time to restore.',
			h: 200,
			nodes: [
				{ id: 'speed', label: 'Speed', x: 120, y: 18, shape: 'text' },
				{ id: 'safe', label: 'Stability', x: 360, y: 18, shape: 'text' },
				{ id: 'freq', label: 'Deploys\nonce a month', x: 120, y: 75, w: 180, h: 64, fill: 'sky' },
				{ id: 'lead', label: 'Lead time\n3 weeks', x: 120, y: 162, w: 180, h: 64, fill: 'sky' },
				{ id: 'fail', label: 'Failed deploys\n30%', x: 360, y: 75, w: 180, h: 64, fill: 'pink' },
				{ id: 'mttr', label: 'Time to restore\n1 day', x: 360, y: 162, w: 180, h: 64, fill: 'pink' }
			],
			edges: [],
			steps: [
				{
					say: 'A team ships big monthly releases. They feel careful, but they are slow and fail often.',
					light: ['freq', 'fail']
				},
				{
					say: 'They add automated tests and a pipeline, so changes get smaller.',
					set: { freq: 'Deploys\nevery day', lead: 'Lead time\n2 days' },
					light: ['freq', 'lead']
				},
				{
					say: 'Small changes are easier to check, so fewer of them break.',
					set: {
						freq: 'Deploys\nevery day',
						lead: 'Lead time\n2 days',
						fail: 'Failed deploys\n8%'
					},
					light: ['fail']
				},
				{
					say: 'When one does break, the cause is obvious and rollback is one click. Faster became safer.',
					set: {
						freq: 'Deploys\nevery day',
						lead: 'Lead time\n2 days',
						fail: 'Failed deploys\n8%',
						mttr: 'Time to restore\n20 minutes'
					},
					light: ['mttr']
				}
			]
		}
	},
	{
		id: 'git-flow',
		part: PIPELINE,
		title: 'Branches and pull requests',
		summary:
			'Every change starts in version control. Long-lived branches drift apart and create painful merges, so most high-performing teams keep branches short and merge into the main line often.',
		points: [
			['Trunk-based development', 'small branches that merge into main within a day or so.'],
			['Pull request', 'a place to review a change, with CI results attached.'],
			['Feature flags', 'merge unfinished work switched off, so main is always releasable.'],
			['Branch protection', 'require a review and passing checks before anything reaches main.']
		],
		tip: 'If a branch lives for more than a few days, split the work.',
		links: [['Trunk-based development', 'https://trunkbaseddevelopment.com/']],
		sketch: {
			kind: 'Git flow diagram',
			alt: 'A short-lived branch leaves main, gets reviewed in a pull request with CI checks, and merges back into main.',
			h: 185,
			nodes: [
				{ id: 'm1', label: 'main', x: 62, y: 45, w: 92, h: 46, fill: 'sky' },
				{ id: 'm2', label: 'main', x: 410, y: 45, w: 104, h: 46, fill: 'sky' },
				{ id: 'b', label: 'Short\nbranch', x: 95, y: 145, w: 104, h: 62, fill: 'yellow' },
				{
					id: 'pr',
					label: 'Pull request\n+ CI + review',
					x: 300,
					y: 145,
					w: 150,
					h: 62,
					fill: 'mint'
				}
			],
			edges: [
				{ from: 'm1', to: 'b' },
				{ from: 'b', to: 'pr' },
				{ from: 'pr', to: 'm2', label: 'merge' },
				{ from: 'm1', to: 'm2', dashed: true, plain: true }
			],
			steps: [
				{
					say: 'Create a short branch from main for one small change.',
					send: [['m1', 'b']],
					light: ['b']
				},
				{
					say: 'Open a pull request. CI starts testing it straight away.',
					send: [['b', 'pr']],
					light: ['pr']
				},
				{
					say: 'CI finds a failing test, so main stays protected.',
					set: { pr: 'Tests failed\nmerge blocked' },
					down: ['pr']
				},
				{
					say: 'Push a fix. The checks pass and a teammate approves.',
					set: { pr: 'CI passed\nApproved' },
					light: ['pr']
				},
				{
					say: 'It merges into main the same day, before it can drift.',
					send: [['pr', 'm2']],
					set: { pr: 'CI passed\nApproved' },
					light: ['m2']
				}
			]
		}
	},
	{
		id: 'ci',
		title: 'Continuous Integration',
		summary:
			'Every push is automatically built and tested, so problems surface within minutes while the change is still fresh. This site does exactly that with GitHub Actions.',
		points: [
			['Trigger', 'every push and pull request starts a run.'],
			['Fail fast', 'run the quick checks first, like linting and unit tests.'],
			['Same every time', 'a clean machine each run, so "works on my laptop" stops mattering.'],
			['Fix it first', "a broken main branch is the team's top priority."]
		],
		tip: 'Keep CI under ten minutes. Past that, people stop waiting for it.',
		code: `on: [push, pull_request]
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build`,
		links: [['GitHub Actions', 'https://docs.github.com/en/actions']],
		sketch: {
			kind: 'Pipeline diagram',
			alt: 'A push starts a pipeline of lint, test and build. A failure stops the pipeline and tells the developer.',
			h: 175,
			nodes: [
				{ id: 'push', label: 'Push', x: 45, y: 50, w: 76, h: 48, fill: 'sky' },
				{ id: 'lint', label: 'Lint', x: 170, y: 50, w: 84, h: 48 },
				{ id: 'test', label: 'Test', x: 295, y: 50, w: 84, h: 48 },
				{ id: 'build', label: 'Build', x: 425, y: 50, w: 84, h: 48 },
				{
					id: 'dev',
					label: 'Developer gets told in minutes',
					x: 240,
					y: 140,
					w: 270,
					h: 46,
					fill: 'pink'
				}
			],
			edges: [
				{ from: 'push', to: 'lint' },
				{ from: 'lint', to: 'test' },
				{ from: 'test', to: 'build' }
			],
			steps: [
				{
					say: 'A developer pushes a commit, and a clean machine starts up.',
					hide: ['dev'],
					send: [['push', 'lint']],
					light: ['lint']
				},
				{
					say: 'Style and lint checks pass in seconds.',
					hide: ['dev'],
					send: [['lint', 'test']],
					light: ['test']
				},
				{
					say: 'A test fails. The pipeline stops here, so the bad build goes no further.',
					down: ['test'],
					hide: ['dev']
				},
				{
					say: 'The developer hears about it while the change is still fresh in their mind.',
					down: ['test'],
					send: [['test', 'dev']],
					light: ['dev']
				},
				{
					say: 'After the fix, everything passes and the build is ready to ship.',
					hide: ['dev'],
					send: [['test', 'build']],
					light: ['build']
				}
			]
		}
	},
	{
		id: 'cd',
		title: 'Continuous Delivery and Deployment',
		summary:
			'The two terms sound alike but differ by one human click. In Continuous Delivery, every passing build is ready to release and a person decides when. In Continuous Deployment, every passing build goes live on its own.',
		points: [
			['Artifact', 'build once, then promote that exact build through each environment.'],
			['Staging', 'a copy of production for a last check.'],
			['Smoke test', 'a quick check after deploying that the key paths still work.'],
			['Rollback', 'the old version must be one command away.']
		],
		tip: 'Never rebuild between environments, or you are not testing what you ship.',
		sketch: {
			kind: 'Pipeline diagram',
			alt: 'A build artifact goes to staging, then through an approval gate, then to production. If a smoke test fails, it rolls back.',
			h: 190,
			nodes: [
				{ id: 'art', label: 'Build\nv2.4', x: 55, y: 60, w: 92, h: 60, fill: 'sky' },
				{ id: 'stg', label: 'Staging', x: 190, y: 60, w: 96, h: 60, fill: 'yellow' },
				{ id: 'gate', label: 'Approve?', x: 318, y: 60, w: 92, h: 60, fill: 'pink' },
				{ id: 'prod', label: 'Production', x: 428, y: 150, w: 92, h: 60, fill: 'mint' },
				{ id: 'old', label: 'Roll back to v2.3', x: 200, y: 155, w: 170, h: 46 }
			],
			edges: [
				{ from: 'art', to: 'stg' },
				{ from: 'stg', to: 'gate' },
				{ from: 'gate', to: 'prod' },
				{ from: 'prod', to: 'old', dashed: true }
			],
			steps: [
				{
					say: 'CI produces one build. This same build moves through every environment.',
					light: ['art'],
					hide: ['old']
				},
				{
					say: 'It goes to staging first, and automated checks run against it.',
					send: [['art', 'stg']],
					light: ['stg'],
					hide: ['old']
				},
				{
					say: 'In Continuous Delivery a human approves here. In Continuous Deployment this gate is automatic.',
					send: [['stg', 'gate']],
					light: ['gate'],
					hide: ['old']
				},
				{
					say: 'It reaches production, and a smoke test runs straight away.',
					send: [['gate', 'prod']],
					light: ['prod'],
					hide: ['old']
				},
				{
					say: 'If the smoke test fails, the pipeline restores the last good version.',
					down: ['prod'],
					send: [['prod', 'old']],
					light: ['old']
				}
			]
		}
	},
	{
		id: 'containers',
		part: RUN,
		title: 'Containers and Docker',
		summary:
			'A container packages your app with everything it needs, so it runs the same on a laptop, in CI and in production. It shares the host kernel, so it starts in moments and is far lighter than a virtual machine.',
		points: [
			['Dockerfile', 'the recipe for building an image.'],
			['Image', 'a read-only package of your app. Tag each one with a version.'],
			['Registry', 'where images are stored and shared, like Docker Hub or Amazon ECR.'],
			['Container', 'a running instance of an image. Treat it as disposable.']
		],
		tip: 'Keep data outside the container, in a volume or a database. Containers come and go.',
		code: `FROM node:24-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
USER node
CMD ["node", "server.js"]`,
		links: [['Docker overview', 'https://docs.docker.com/get-started/docker-overview/']],
		sketch: {
			kind: 'Pipeline diagram',
			alt: 'A Dockerfile is built into an image, pushed to a registry, then pulled and run as identical containers on any machine.',
			h: 200,
			nodes: [
				{ id: 'df', label: 'Dockerfile', x: 62, y: 50, w: 104, h: 48, fill: 'sky' },
				{ id: 'img', label: 'Image\nv1.2', x: 62, y: 150, w: 104, h: 60, fill: 'yellow' },
				{ id: 'reg', label: 'Registry', x: 235, y: 100, w: 104, h: 74, shape: 'db', fill: 'mint' },
				{ id: 'a', label: 'Laptop\ncontainer', x: 410, y: 45, w: 116, h: 60, fill: 'pink' },
				{ id: 'b', label: 'Server\ncontainer', x: 410, y: 150, w: 116, h: 60, fill: 'pink' }
			],
			edges: [
				{ from: 'df', to: 'img', label: 'build' },
				{ from: 'img', to: 'reg', label: 'push' },
				{ from: 'reg', to: 'a', label: 'pull' },
				{ from: 'reg', to: 'b', label: 'pull' }
			],
			steps: [
				{
					say: 'The Dockerfile describes exactly how to build your app.',
					light: ['df'],
					hide: ['a', 'b']
				},
				{
					say: 'Building it produces an image: your app plus everything it needs.',
					send: [['df', 'img']],
					light: ['img'],
					hide: ['a', 'b']
				},
				{
					say: 'The image is pushed to a registry with a version tag.',
					send: [['img', 'reg']],
					light: ['reg'],
					hide: ['a', 'b']
				},
				{
					say: 'Any machine can pull it and run it. Both copies are identical, byte for byte.',
					send: [
						['reg', 'a'],
						['reg', 'b']
					]
				}
			]
		}
	},
	{
		id: 'kubernetes',
		title: 'Kubernetes',
		summary:
			'Kubernetes runs containers across a group of machines. You declare what you want, such as three copies of an app, and it keeps working to make reality match. It is powerful, and it is also a lot to operate.',
		points: [
			['Pod', 'the smallest unit, usually one container.'],
			['Deployment', 'declares how many Pods you want and handles rolling updates.'],
			['Service', 'a stable address that shares traffic across changing Pods.'],
			['Node', 'a machine that runs Pods.'],
			['Control plane', 'the brain that watches the desired state and fixes differences.']
		],
		tip: 'Most small teams do not need Kubernetes. Reach for it when you outgrow simpler platforms.',
		links: [['Kubernetes overview', 'https://kubernetes.io/docs/concepts/overview/']],
		sketch: {
			kind: 'Deployment diagram',
			alt: 'A Service sends traffic to three Pods on two nodes. When one node dies, the control plane starts a replacement Pod on the healthy node.',
			h: 230,
			nodes: [
				{ id: 'n1', label: 'Node 1', x: 270, y: 118, w: 130, h: 210, shape: 'boundary' },
				{ id: 'n2', label: 'Node 2', x: 405, y: 118, w: 130, h: 210, shape: 'boundary' },
				{ id: 'cp', label: 'Control\nplane', x: 65, y: 45, w: 110, h: 60, fill: 'yellow' },
				{ id: 'svc', label: 'Service', x: 65, y: 160, w: 110, h: 54, fill: 'sky' },
				{ id: 'a', label: 'Pod', x: 270, y: 75, w: 88, h: 44, fill: 'mint' },
				{ id: 'b', label: 'Pod', x: 270, y: 150, w: 88, h: 44, fill: 'mint' },
				{ id: 'c', label: 'Pod', x: 405, y: 75, w: 88, h: 44, fill: 'mint' },
				{ id: 'd', label: 'New Pod', x: 405, y: 150, w: 88, h: 44, fill: 'pink' }
			],
			edges: [
				{ from: 'svc', to: 'a' },
				{ from: 'svc', to: 'b' },
				{ from: 'svc', to: 'c' }
			],
			steps: [
				{
					say: 'You declared "I want 3 Pods". The Service shares traffic across them.',
					hide: ['d'],
					send: [
						['svc', 'a'],
						['svc', 'b'],
						['svc', 'c']
					]
				},
				{ say: 'Node 1 dies, taking two Pods with it.', hide: ['d'], down: ['a', 'b'] },
				{
					say: 'The control plane sees 1 Pod running but 3 wanted.',
					hide: ['d'],
					down: ['a', 'b'],
					light: ['cp']
				},
				{
					say: 'It starts replacements on the healthy node, without anyone being paged.',
					down: ['a', 'b'],
					send: [['cp', 'd']],
					light: ['d']
				},
				{
					say: 'The Service only sends traffic to Pods that are ready.',
					hide: ['a', 'b'],
					send: [
						['svc', 'c'],
						['svc', 'd']
					]
				}
			]
		}
	},
	{
		id: 'iac',
		title: 'Infrastructure as Code',
		summary:
			'Servers, networks and databases are described in text files and created by a tool, not clicked together in a console. Your infrastructure becomes reviewable, repeatable and recoverable.',
		points: [
			['Terraform', 'declarative and works across many clouds.'],
			['AWS CloudFormation', 'the AWS native option.'],
			['Plan', 'preview exactly what will change before anything happens.'],
			['State', "the tool's record of what exists. Store it remotely and lock it."],
			['Drift', 'when someone changes things by hand, reality no longer matches the code.']
		],
		tip: 'Treat a manual console change as a bug, and put it back into code.',
		code: `resource "aws_instance" "web" {
  ami           = "ami-0123456789abcdef0"
  instance_type = "t3.small"
}`,
		links: [['Terraform', 'https://developer.hashicorp.com/terraform/intro']],
		sketch: {
			kind: 'Process diagram',
			alt: 'Code in Git goes through plan and review, then apply, which creates the real cloud resources. A manual change causes drift, and the next plan finds it.',
			h: 175,
			nodes: [
				{ id: 'code', label: 'Code\nin Git', x: 50, y: 95, w: 84, h: 66, fill: 'sky' },
				{ id: 'plan', label: 'Plan +\nreview', x: 172, y: 95, w: 84, h: 66, fill: 'yellow' },
				{ id: 'apply', label: 'Apply', x: 290, y: 95, w: 72, h: 66, fill: 'mint' },
				{ id: 'cloud', label: 'Cloud\n2 servers', x: 420, y: 95, w: 100, h: 66, fill: 'pink' }
			],
			edges: [
				{ from: 'code', to: 'plan' },
				{ from: 'plan', to: 'apply' },
				{ from: 'apply', to: 'cloud' }
			],
			steps: [
				{
					say: 'You change "2 servers" to "4 servers" in code and open a pull request.',
					light: ['code'],
					set: { code: 'Code\n4 servers' }
				},
				{
					say: 'Plan shows exactly what will change: add 2. A teammate reviews it.',
					send: [['code', 'plan']],
					set: { code: 'Code\n4 servers', plan: 'Plan:\nadd 2' },
					light: ['plan']
				},
				{
					say: 'Apply makes it real.',
					send: [
						['plan', 'apply'],
						['apply', 'cloud']
					],
					set: { code: 'Code\n4 servers', cloud: 'Cloud\n4 servers' }
				},
				{
					say: 'Someone adds a server by hand in the console. Reality no longer matches the code.',
					set: { code: 'Code\n4 servers', cloud: 'Cloud\n5 servers' },
					light: ['cloud']
				},
				{
					say: 'The next plan spots the drift and offers to remove it.',
					send: [['code', 'plan']],
					set: { code: 'Code\n4 servers', plan: 'Plan:\nremove 1', cloud: 'Cloud\n5 servers' },
					light: ['plan']
				}
			]
		}
	},
	{
		id: 'environments',
		part: ENVIRONMENTS,
		title: 'Dev, Test, Staging, Production',
		summary:
			'Real companies never build on the live system. They keep several separate copies of it, called environments, and a change has to prove itself in each one before customers see it. The further along it gets, the more real the environment is and the more a mistake costs.',
		points: [
			['Local', 'your own laptop. Break anything you like.'],
			['Dev', "a shared environment where the team's merged work first runs together."],
			['Test or QA', 'where testers and automated suites try to break the feature.'],
			[
				'Staging or UAT',
				'a close copy of production, where the business signs off. UAT means user acceptance testing.'
			],
			['Production', 'the real system, with real customers and real money.'],
			['Parity', 'keep them as alike as you can, or passing in Test proves little.']
		],
		tip: 'A bug costs minutes in Dev, hours in Test, and customers in Production. Catch it as early as you can.',
		table: {
			head: ['Environment', 'Used by', 'Data', 'If it breaks'],
			rows: [
				['Dev', 'Developers', 'Fake seed data', 'Annoying'],
				['Test', 'QA, automated tests', 'Fake test data', 'Delays testing'],
				['Staging', 'QA, business owners', 'Masked or realistic', 'Delays the release'],
				['Production', 'Real customers', 'Real data', 'Costs money and trust']
			]
		},
		sketch: {
			kind: 'Environment pipeline',
			alt: 'A change moves from Dev to Test to Staging to Production. A bug is caught in Test and sent back to Dev.',
			h: 185,
			nodes: [
				{ id: 'dev', label: 'Dev', x: 55, y: 50, w: 86, h: 56, fill: 'sky' },
				{ id: 'test', label: 'Test', x: 175, y: 50, w: 86, h: 56, fill: 'yellow' },
				{ id: 'stg', label: 'Staging', x: 298, y: 50, w: 86, h: 56, fill: 'mint' },
				{ id: 'prod', label: 'Production', x: 422, y: 50, w: 92, h: 56, fill: 'pink' },
				{ id: 'bug', label: 'Bug found: back to Dev', x: 150, y: 145, w: 220, h: 44 }
			],
			edges: [
				{ from: 'dev', to: 'test' },
				{ from: 'test', to: 'stg' },
				{ from: 'stg', to: 'prod' },
				{ from: 'test', to: 'bug', dashed: true },
				{ from: 'bug', to: 'dev', dashed: true }
			],
			steps: [
				{
					say: 'A developer merges a new checkout feature, and it lands in Dev.',
					hide: ['bug'],
					light: ['dev']
				},
				{
					say: 'It moves to Test, where QA and automated suites try to break it.',
					hide: ['bug'],
					send: [['dev', 'test']],
					light: ['test']
				},
				{
					say: 'They find a bug with discount codes. No customer ever saw it.',
					send: [['test', 'bug']],
					light: ['bug'],
					down: ['test']
				},
				{
					say: 'It goes back to Dev for a fix, which costs an hour instead of an outage.',
					send: [['bug', 'dev']],
					light: ['dev']
				},
				{
					say: 'The fixed version passes Test and reaches Staging for a final sign-off.',
					hide: ['bug'],
					send: [['test', 'stg']],
					light: ['stg']
				},
				{
					say: 'Only now does it reach Production and real customers.',
					hide: ['bug'],
					send: [['stg', 'prod']],
					light: ['prod']
				}
			]
		}
	},
	{
		id: 'release-day',
		title: 'A change, from ticket to live',
		summary:
			'Here is the path a real feature takes in a company. Each stage has a person or a check that can stop it. Teams with good automation can run this whole path in under an hour.',
		points: [
			['Pull request', 'a teammate reviews it and CI tests it.'],
			['Dev deploy', 'merging deploys to Dev automatically.'],
			['QA sign-off', 'testers check the ticket against its acceptance criteria.'],
			['UAT sign-off', 'the product owner confirms it does what the business asked for.'],
			['Release', 'the same tested build goes to Production, usually gradually.'],
			['Watching', 'someone stays on hand and checks dashboards after the release.']
		],
		tip: 'Avoid releasing late on a Friday. Release when the people who can fix it are awake and around.',
		sketch: {
			kind: 'Process diagram',
			alt: 'A pull request deploys to Dev, then QA tests it, the business signs off, it is released to Production, and the team watches the dashboards.',
			h: 205,
			nodes: [
				{ id: 'pr', label: 'Pull\nrequest', x: 80, y: 50, w: 124, h: 66, fill: 'sky' },
				{ id: 'dev', label: 'Deployed\nto Dev', x: 240, y: 50, w: 124, h: 66, fill: 'sky' },
				{ id: 'qa', label: 'QA in\nTest', x: 400, y: 50, w: 124, h: 66, fill: 'yellow' },
				{ id: 'uat', label: 'Sign-off in\nStaging', x: 400, y: 155, w: 124, h: 66, fill: 'yellow' },
				{ id: 'rel', label: 'Release to\nProduction', x: 240, y: 155, w: 124, h: 66, fill: 'pink' },
				{ id: 'obs', label: 'Watch\ndashboards', x: 80, y: 155, w: 124, h: 66, fill: 'mint' }
			],
			edges: [
				{ from: 'pr', to: 'dev' },
				{ from: 'dev', to: 'qa' },
				{ from: 'qa', to: 'uat' },
				{ from: 'uat', to: 'rel' },
				{ from: 'rel', to: 'obs' }
			],
			steps: [
				{ say: "A pull request passes CI and gets a teammate's approval.", light: ['pr'] },
				{
					say: 'Merging deploys it to Dev straight away, with no manual step.',
					send: [['pr', 'dev']],
					light: ['dev']
				},
				{
					say: 'QA moves the ticket to Test and checks every acceptance criterion.',
					send: [['dev', 'qa']],
					light: ['qa']
				},
				{
					say: 'The product owner tries it in Staging and approves it.',
					send: [['qa', 'uat']],
					light: ['uat']
				},
				{
					say: 'That same build goes to Production, with no rebuilding.',
					send: [['uat', 'rel']],
					light: ['rel']
				},
				{
					say: 'The team watches errors and latency. The change is not done until it is healthy in Production.',
					send: [['rel', 'obs']],
					light: ['obs']
				}
			]
		}
	},
	{
		id: 'env-config',
		title: 'Same code, different config',
		summary:
			'Each environment runs the same build. What differs is configuration: database addresses, API keys, feature flags. Keeping config outside the code is what makes this possible.',
		points: [
			[
				'Environment variables',
				'the app reads its settings when it starts, so one image fits everywhere.'
			],
			['Secrets', 'keep passwords in a secrets manager or the deploy platform, never in Git.'],
			['Separate accounts', 'give Production its own cloud account and credentials.'],
			['Different keys', 'payment providers offer test keys, so Test never charges real cards.']
		],
		tip: 'Make it impossible to reach Production from Dev. Different accounts and credentials beat being careful.',
		skip: 'one wrong address in a test config can send fake orders to real customers or delete production data.',
		code: `# Test
DATABASE_URL=postgres://test-db.internal/shop
PAYMENT_KEY=sk_test_xxx
LOG_LEVEL=debug

# Production: values come from the secrets manager
DATABASE_URL=postgres://prod-db.internal/shop
PAYMENT_KEY=(injected at deploy time)
LOG_LEVEL=info`,
		sketch: {
			kind: 'Skip vs set up',
			alt: 'One image runs with Test config against the test database and with Production config against the production database. A wrong address sends Test traffic to the production database.',
			h: 205,
			nodes: [
				{ id: 'img', label: 'One image\nv2.4', x: 62, y: 102, w: 108, h: 70, fill: 'yellow' },
				{ id: 'ct', label: 'Test config', x: 235, y: 45, w: 130, h: 58, fill: 'sky' },
				{ id: 'cp', label: 'Prod config', x: 235, y: 160, w: 130, h: 58, fill: 'pink' },
				{ id: 'dt', label: 'Test DB', x: 415, y: 45, w: 104, h: 76, shape: 'db', fill: 'sky' },
				{ id: 'dp', label: 'Prod DB', x: 415, y: 160, w: 104, h: 76, shape: 'db', fill: 'pink' }
			],
			edges: [
				{ from: 'img', to: 'ct' },
				{ from: 'img', to: 'cp' },
				{ from: 'ct', to: 'dt' },
				{ from: 'cp', to: 'dp' }
			],
			steps: [
				{
					say: 'SET UP: the same image starts everywhere, and only its config changes.',
					send: [
						['img', 'ct'],
						['img', 'cp']
					],
					light: ['img']
				},
				{
					say: 'SET UP: each environment reaches only its own database.',
					send: [
						['ct', 'dt'],
						['cp', 'dp']
					]
				},
				{
					say: 'SKIPPED: someone copies a config file, and Test now holds the Production address.',
					set: { ct: 'Test config\nPROD address!' },
					light: ['ct']
				},
				{
					say: 'SKIPPED: a cleanup script for test data runs against real customers.',
					send: [['ct', 'dp']],
					set: { ct: 'Test config\nPROD address!' },
					down: ['dp']
				},
				{
					say: 'SET UP: with separate credentials, that connection is simply refused.',
					send: [['ct', 'dp']],
					set: { ct: 'Test config\nrefused' },
					light: ['dp']
				}
			]
		}
	},
	{
		id: 'env-data',
		title: 'Test data and database changes',
		summary:
			'Test environments need realistic data, but copying real customer data into them is a privacy risk, and often a legal one. Database changes also need care, because you cannot roll data back the way you roll back code.',
		points: [
			['Seed data', 'scripts that create fake but believable records.'],
			[
				'Masking',
				'if you need production-like data, scramble names, emails and card details first.'
			],
			['Migrations', 'versioned scripts that run through every environment in the same order.'],
			[
				'Expand, then contract',
				'add the new column first, move the code over, and remove the old column later.'
			]
		],
		tip: 'Run every migration against a production-sized copy in Staging. A change that takes a second on test data can lock a real table for an hour.',
		skip: 'real customer data ends up on laptops and in less protected systems, where a leak is far more likely.',
		sketch: {
			kind: 'Skip vs set up',
			alt: 'Copying production data straight into Test can leak it. Passing it through a masking step first gives realistic data that is safe.',
			h: 200,
			nodes: [
				{ id: 'prod', label: 'Prod data', x: 62, y: 80, w: 108, h: 80, shape: 'db', fill: 'pink' },
				{ id: 'mask', label: 'Masking', x: 235, y: 80, w: 120, h: 58, fill: 'yellow' },
				{ id: 'test', label: 'Test data', x: 410, y: 80, w: 110, h: 80, shape: 'db', fill: 'sky' },
				{ id: 'leak', label: 'Leaked!', x: 410, y: 170, w: 110, h: 44, fill: 'pink' }
			],
			edges: [
				{ from: 'prod', to: 'mask' },
				{ from: 'mask', to: 'test' }
			],
			steps: [
				{
					say: 'SKIPPED: someone copies the production database into Test to reproduce a bug.',
					hide: ['mask', 'leak'],
					send: [['prod', 'test']],
					set: { test: 'Real names' }
				},
				{
					say: 'SKIPPED: Test has weaker security, and more people can reach it.',
					hide: ['mask', 'leak'],
					set: { test: 'Real names' },
					light: ['test']
				},
				{
					say: 'SKIPPED: a laptop is lost, and real customer details go with it.',
					hide: ['mask'],
					send: [['test', 'leak']],
					set: { test: 'Real names' },
					light: ['leak']
				},
				{
					say: 'SET UP: the copy passes through masking first.',
					hide: ['leak'],
					send: [['prod', 'mask']],
					light: ['mask']
				},
				{
					say: 'SET UP: names become fake while the shape of the data stays realistic.',
					hide: ['leak'],
					send: [['mask', 'test']],
					set: { test: 'Fake names' }
				}
			]
		}
	},
	{
		id: 'prod-safety',
		title: 'Fixing Production in a hurry',
		summary:
			'When Production breaks you do not repeat the whole path, but you do not skip the checks either. Roll back first, then send a small hotfix through a fast version of the same pipeline.',
		points: [
			['Roll back first', 'put the last good version back while you investigate.'],
			['Hotfix', 'a small branch from the released version, containing only the fix.'],
			[
				'Same pipeline',
				'tests still run. Editing files directly on a server is how outages get worse.'
			],
			['Merge back', 'the fix must return to main, or the next release brings the bug back.'],
			[
				'Least access',
				'few people should be able to touch Production, and every action should be logged.'
			]
		],
		tip: 'Plan your rollback before you release, because you will not think clearly at 2am.',
		sketch: {
			kind: 'Git flow diagram',
			alt: 'Production breaks and is rolled back. A hotfix branch goes through fast tests to Production, then merges back to main.',
			h: 200,
			nodes: [
				{ id: 'prod', label: 'Production\nv2.4', x: 400, y: 50, w: 130, h: 66, fill: 'pink' },
				{ id: 'main', label: 'main', x: 70, y: 50, w: 104, h: 56, fill: 'sky' },
				{ id: 'hot', label: 'Hotfix\nbranch', x: 70, y: 155, w: 104, h: 62, fill: 'yellow' },
				{ id: 'test', label: 'Fast tests', x: 240, y: 155, w: 120, h: 62, fill: 'mint' }
			],
			edges: [
				{ from: 'hot', to: 'test' },
				{ from: 'test', to: 'prod' },
				{ from: 'hot', to: 'main', label: 'merge back', dashed: true }
			],
			steps: [
				{
					say: 'Version 2.4 is live, and checkout starts failing.',
					down: ['prod'],
					hide: ['hot', 'test']
				},
				{
					say: 'Roll back first. Customers are safe again within minutes.',
					set: { prod: 'Production\nv2.3' },
					hide: ['hot', 'test'],
					light: ['prod']
				},
				{
					say: 'Create a small hotfix branch with only the fix in it.',
					set: { prod: 'Production\nv2.3' },
					hide: ['test'],
					light: ['hot']
				},
				{
					say: 'It runs through a fast version of the pipeline. Nobody edits the server by hand.',
					set: { prod: 'Production\nv2.3' },
					send: [['hot', 'test']],
					light: ['test']
				},
				{
					say: 'The fix goes live.',
					set: { prod: 'Production\nv2.5' },
					send: [['test', 'prod']],
					light: ['prod']
				},
				{
					say: 'The fix is merged back to main, so the next release does not bring the bug back.',
					set: { prod: 'Production\nv2.5' },
					send: [['hot', 'main']],
					light: ['main']
				}
			]
		}
	},
	{
		id: 'strategies',
		part: RELEASE,
		title: 'Deployment strategies',
		summary:
			'How you switch from the old version to the new one decides how risky a release is. The goal is to limit how many users see a bad version, and to be able to go back quickly.',
		points: [
			['Recreate', 'stop the old, start the new. Simple, but causes downtime.'],
			['Rolling', 'replace servers a few at a time. No downtime, and two versions run together.'],
			[
				'Blue/green',
				'run a full new copy, then switch all traffic at once. Rollback is instant, but it costs double while it runs.'
			],
			['Canary', 'send a small share of traffic to the new version, watch it, then increase.']
		],
		tip: 'Make database changes backwards compatible, because old and new code run side by side during a deploy.',
		links: [
			['Blue/green', 'https://martinfowler.com/bliki/BlueGreenDeployment.html'],
			['Canary', 'https://martinfowler.com/bliki/CanaryRelease.html']
		],
		sketch: {
			kind: 'Traffic diagram',
			alt: 'A canary release: a router sends most traffic to version 1 and a small share to version 2, then shifts more as metrics stay healthy.',
			h: 200,
			nodes: [
				{ id: 'user', label: 'Users', x: 36, y: 72, shape: 'person' },
				{ id: 'r', label: 'Router\n100 / 0', x: 195, y: 100, w: 104, h: 66, fill: 'yellow' },
				{ id: 'v1', label: 'Version 1', x: 400, y: 45, w: 130, h: 56, fill: 'sky' },
				{ id: 'v2', label: 'Version 2', x: 400, y: 155, w: 130, h: 56, fill: 'mint' }
			],
			edges: [
				{ from: 'user', to: 'r' },
				{ from: 'r', to: 'v1' },
				{ from: 'r', to: 'v2' }
			],
			steps: [
				{
					say: 'All traffic is on version 1. Version 2 is deployed but receives nothing.',
					send: [
						['user', 'r'],
						['r', 'v1']
					]
				},
				{
					say: 'Send 5% of users to version 2: the canary.',
					set: { r: 'Router\n95 / 5' },
					send: [
						['r', 'v1'],
						['r', 'v2']
					],
					light: ['v2']
				},
				{
					say: 'Errors and latency look healthy, so raise it to 50%.',
					set: { r: 'Router\n50 / 50' },
					send: [
						['r', 'v1'],
						['r', 'v2']
					]
				},
				{
					say: 'Still healthy. Move everyone over.',
					set: { r: 'Router\n0 / 100' },
					send: [['r', 'v2']],
					light: ['v2']
				},
				{
					say: 'Had the canary failed, only 5% of users would have noticed, and rollback is one change.',
					set: { r: 'Router\n100 / 0' },
					down: ['v2'],
					send: [['r', 'v1']]
				}
			]
		}
	},
	{
		id: 'gitops',
		title: 'GitOps',
		summary:
			'Git becomes the single source of truth for what should run. Instead of a pipeline pushing changes into a cluster, an agent inside the cluster keeps pulling from Git and corrects any difference it finds.',
		points: [
			['Declarative', 'the desired state is written down in a repository.'],
			['Pull based', 'the cluster fetches changes, so CI needs no production credentials.'],
			['Self-healing', 'manual changes get reverted to what Git says.'],
			['Rollback', 'revert the commit, and the system follows.']
		],
		tip: 'If it is not in Git, it should not be running.',
		links: [['Argo CD', 'https://argo-cd.readthedocs.io/en/stable/']],
		sketch: {
			kind: 'Control loop diagram',
			alt: 'An agent such as Argo CD compares Git with the running cluster and syncs any difference. A manual change is detected and undone.',
			h: 175,
			nodes: [
				{ id: 'git', label: 'Git repo\nreplicas: 3', x: 75, y: 88, w: 125, h: 72, fill: 'sky' },
				{ id: 'agent', label: 'Agent\n(Argo CD)', x: 240, y: 88, w: 110, h: 72, fill: 'yellow' },
				{ id: 'k8s', label: 'Cluster\nrunning: 3', x: 408, y: 88, w: 125, h: 72, fill: 'mint' }
			],
			edges: [
				{ from: 'agent', to: 'git', label: 'watches' },
				{ from: 'agent', to: 'k8s', label: 'syncs' }
			],
			steps: [
				{
					say: 'Git says 3 copies, the cluster runs 3. Everything matches.',
					light: ['git', 'k8s']
				},
				{
					say: 'You merge a change to 5 copies. Nothing pushes it anywhere.',
					set: { git: 'Git repo\nreplicas: 5' },
					light: ['git']
				},
				{
					say: 'The agent sees that Git and the cluster differ, and applies the change.',
					set: { git: 'Git repo\nreplicas: 5', k8s: 'Cluster\nrunning: 5' },
					send: [
						['agent', 'git'],
						['agent', 'k8s']
					]
				},
				{
					say: 'Someone edits the cluster by hand and scales it down.',
					set: { git: 'Git repo\nreplicas: 5', k8s: 'Cluster\nrunning: 1' },
					light: ['k8s']
				},
				{
					say: 'The agent notices and puts it back. Git wins.',
					set: { git: 'Git repo\nreplicas: 5', k8s: 'Cluster\nrunning: 5' },
					send: [['agent', 'k8s']],
					light: ['agent']
				}
			]
		}
	},
	{
		id: 'observability',
		part: OPERATE,
		title: 'Observability',
		summary:
			'You cannot fix what you cannot see. Observability means being able to tell what is broken and why, from the outside, using the data your system emits.',
		points: [
			['Logs', 'timestamped records of single events. Structure them so they can be searched.'],
			[
				'Metrics',
				'numbers over time, like request rate, error rate and latency. Cheap to keep and good for alerts.'
			],
			['Traces', 'the path of one request across services, showing where the time went.'],
			[
				'OpenTelemetry',
				'an open standard for collecting all three, so you are not tied to one vendor.'
			]
		],
		tip: 'Alert on what users feel, like errors and slow requests, not on every CPU spike.',
		links: [['OpenTelemetry', 'https://opentelemetry.io/docs/what-is-opentelemetry/']],
		sketch: {
			kind: 'Data flow diagram',
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
			],
			steps: [
				{
					say: 'Everything your services do leaves three kinds of evidence.',
					send: [
						['svc', 'logs'],
						['svc', 'metrics'],
						['svc', 'traces']
					]
				},
				{
					say: 'Metrics show the symptom: the error rate jumped, and an alert fires.',
					send: [['metrics', 'dash']],
					light: ['metrics', 'dash']
				},
				{
					say: 'Traces show where: requests are stuck in the payment call.',
					send: [['traces', 'dash']],
					light: ['traces']
				},
				{
					say: 'Logs show why: an expired API key. Metrics say what, traces say where, logs say why.',
					send: [['logs', 'dash']],
					light: ['logs']
				}
			]
		}
	},
	{
		id: 'sre',
		title: 'SLOs and error budgets',
		summary:
			'Site Reliability Engineering, from Google, treats reliability as an engineering problem with numbers. Instead of chasing 100% uptime, you agree how reliable a service must be, and use what is left over to ship faster.',
		points: [
			['SLI', 'a measurement, like the share of requests that succeed.'],
			['SLO', 'the target for that measurement, like 99.9% over 30 days.'],
			['SLA', 'a promise to customers, usually with money attached.'],
			[
				'Error budget',
				'what the target allows you to fail. 99.9% over 30 days is about 43 minutes.'
			]
		],
		tip: 'When the budget is healthy, ship. When it is spent, stop features and fix reliability.',
		links: [['Google SRE book', 'https://sre.google/sre-book/table-of-contents/']],
		sketch: {
			kind: 'State diagram',
			alt: 'An error budget of 43 minutes shrinks with each incident. When it runs out, releases stop until reliability improves.',
			h: 185,
			nodes: [
				{
					id: 'bud',
					label: 'Error budget\n43 min left',
					x: 120,
					y: 92,
					w: 170,
					h: 84,
					fill: 'mint'
				},
				{ id: 'ship', label: 'Ship features', x: 365, y: 45, w: 170, h: 52, fill: 'sky' },
				{ id: 'stop', label: 'Pause releases', x: 365, y: 140, w: 170, h: 52, fill: 'pink' }
			],
			edges: [
				{ from: 'bud', to: 'ship', label: 'budget left' },
				{ from: 'bud', to: 'stop', label: 'budget gone' }
			],
			steps: [
				{
					say: 'The month starts with 43 minutes of allowed failure.',
					send: [['bud', 'ship']],
					light: ['ship']
				},
				{
					say: 'A bad deploy costs 15 minutes. You are still fine, so keep shipping.',
					set: { bud: 'Error budget\n28 min left' },
					send: [['bud', 'ship']]
				},
				{
					say: 'An outage costs another 30 minutes, and the budget is gone.',
					set: { bud: 'Error budget\n2 min over' },
					light: ['bud']
				},
				{
					say: 'Releases pause, and the team works on reliability instead.',
					set: { bud: 'Error budget\n2 min over' },
					send: [['bud', 'stop']],
					light: ['stop']
				},
				{
					say: 'Next month the budget resets. Users got the reliability they need, and no more than that.',
					light: ['bud']
				}
			]
		}
	},
	{
		id: 'incidents',
		title: 'Incident response',
		summary:
			'Things will break. What separates strong teams is how calmly they respond, and whether they learn from it afterwards.',
		points: [
			['Detect', 'alerts should find the problem before customers do.'],
			['Roles', 'one incident lead makes decisions while others investigate.'],
			['Mitigate first', 'stop the damage, usually by rolling back. Find the root cause later.'],
			['Blameless review', 'ask how the system allowed it, not who did it.']
		],
		tip: 'Roll back first and investigate after. Users do not care why it is broken.',
		sketch: {
			kind: 'Process diagram',
			alt: 'An incident moves through detect, triage, mitigate and review, and the lessons feed back into the system.',
			h: 195,
			nodes: [
				{ id: 'det', label: '1. Detect', x: 115, y: 45, w: 170, h: 54, fill: 'pink' },
				{ id: 'tri', label: '2. Triage', x: 365, y: 45, w: 170, h: 54, fill: 'yellow' },
				{ id: 'mit', label: '3. Mitigate', x: 365, y: 150, w: 170, h: 54, fill: 'sky' },
				{ id: 'rev', label: '4. Review', x: 115, y: 150, w: 170, h: 54, fill: 'mint' }
			],
			edges: [
				{ from: 'det', to: 'tri' },
				{ from: 'tri', to: 'mit' },
				{ from: 'mit', to: 'rev' },
				{ from: 'rev', to: 'det', label: 'better alerts', dashed: true }
			],
			steps: [
				{ say: '02:14. An alert fires because checkout errors jumped.', light: ['det'] },
				{
					say: 'The on-call engineer takes the lead and checks what changed: a deploy ten minutes ago.',
					send: [['det', 'tri']],
					light: ['tri']
				},
				{
					say: 'Roll back now. Service recovers while the cause is still unknown, and that is fine.',
					send: [['tri', 'mit']],
					light: ['mit']
				},
				{
					say: 'Next day, a blameless review finds the missing test and adds it.',
					send: [['mit', 'rev']],
					light: ['rev']
				},
				{
					say: 'The fix improves the system, so this failure cannot happen the same way twice.',
					send: [['rev', 'det']]
				}
			]
		}
	},
	{
		id: 'devsecops',
		title: 'DevSecOps',
		summary:
			'Security stops being a final gate and becomes part of every step. Finding a problem in a pull request costs far less than finding it in production.',
		points: [
			['Secret scanning', 'block passwords and keys from ever entering Git.'],
			['Dependency scanning', 'alert on libraries with known vulnerabilities.'],
			['Code scanning', 'static analysis that catches risky patterns.'],
			['Image scanning', 'check containers before they ship.'],
			['Least privilege', 'give every service and person only the access they need.']
		],
		tip: 'Treat a leaked secret as burned. Removing it from Git is not enough, so rotate it.',
		links: [['OWASP DevSecOps guideline', 'https://owasp.org/www-project-devsecops-guideline/']],
		sketch: {
			kind: 'Pipeline diagram',
			alt: 'A pipeline with security checks at each stage: secret scan on commit, dependency scan on build, and image scan before deploy.',
			h: 190,
			nodes: [
				{ id: 'code', label: 'Commit\n+ secret scan', x: 95, y: 50, w: 150, h: 64, fill: 'sky' },
				{
					id: 'build',
					label: 'Build\n+ dependency scan',
					x: 345,
					y: 50,
					w: 170,
					h: 64,
					fill: 'yellow'
				},
				{ id: 'img', label: 'Image\nscan', x: 345, y: 150, w: 130, h: 64, fill: 'pink' },
				{ id: 'prod', label: 'Production', x: 110, y: 150, w: 130, h: 64, fill: 'mint' }
			],
			edges: [
				{ from: 'code', to: 'build' },
				{ from: 'build', to: 'img' },
				{ from: 'img', to: 'prod' }
			],
			steps: [
				{
					say: 'A developer accidentally commits an API key. The scan blocks it before it spreads.',
					down: ['code'],
					set: { code: 'Commit\nblocked: secret' }
				},
				{
					say: 'The key is removed and rotated, so the commit moves on.',
					send: [['code', 'build']],
					light: ['build']
				},
				{
					say: 'A library has a known vulnerability, so the build fails until it is upgraded.',
					set: { build: 'Build\nblocked: CVE' },
					down: ['build']
				},
				{
					say: 'After the upgrade, the finished image is checked as well.',
					send: [['build', 'img']],
					light: ['img']
				},
				{
					say: 'Only what passes every check reaches production.',
					send: [['img', 'prod']],
					light: ['prod']
				}
			]
		}
	}
];
