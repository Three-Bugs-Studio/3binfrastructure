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
		links: [
			['What is DevOps? (Microsoft)', 'https://learn.microsoft.com/en-us/devops/what-is-devops'],
			['What is DevOps? (AWS)', 'https://aws.amazon.com/devops/what-is-devops/']
		],
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
					title: 'Plan the work',
					say: 'An idea becomes a small, clear piece of work.',
					detail:
						'Planning breaks a big idea into slices that can each ship on their own, often as a ticket with clear acceptance criteria. A slice that takes a day or two is easy to review and test, while a month-long chunk hides its problems until the end.',
					send: [['plan', 'code']],
					light: ['code']
				},
				{
					title: 'Merge and build',
					say: 'Code is merged, and a machine builds it.',
					detail:
						"A build server, such as GitHub Actions or Jenkins, fetches the merged commit onto a clean machine and turns it into something runnable, like a container image. Because a machine does it the same way every time, nobody's laptop settings can sneak into the result.",
					send: [['code', 'build']],
					light: ['build']
				},
				{
					title: 'Automated tests',
					say: 'Automated tests give an answer within minutes.',
					detail:
						'Unit tests check small pieces of code in milliseconds, and integration tests check that the pieces work together. If anything fails, the build stops here, so a broken change never travels further round the loop. Keeping this under about ten minutes means people wait for the result.',
					send: [['build', 'test']],
					light: ['test']
				},
				{
					title: 'Release and deploy',
					say: 'The tested build is released and deployed, usually without anyone clicking anything.',
					detail:
						'Release means marking a tested build as ready to go, and deploy means installing it on the servers. A pipeline script does both, so every release follows exactly the same steps. Manual deploys tend to skip a step at the worst moment, often late at night.',
					send: [
						['test', 'rel'],
						['rel', 'dep']
					],
					light: ['dep']
				},
				{
					title: 'Operate and watch',
					say: 'It runs for real users, and the team watches how it behaves.',
					detail:
						'Once live, the team watches error rates, response times and usage on dashboards, with alerts for anything unusual. Because the people who wrote the code also run it, they feel its problems first and have every reason to make it easy to operate.',
					send: [
						['dep', 'run'],
						['run', 'mon']
					],
					light: ['mon']
				},
				{
					title: 'Back to planning',
					say: 'What they learn feeds the next plan. The loop never stops.',
					detail:
						'Monitoring data and user feedback show which features get used and where things break, and that evidence shapes the next slice of work. A team that ships daily goes round this loop hundreds of times a year, so it learns far faster than one that ships twice.',
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
					title: 'Big monthly releases',
					say: 'A team ships big monthly releases. They feel careful, but they are slow and fail often.',
					detail:
						'Bundling a month of work into one release means hundreds of changes go live together. When something breaks, nobody can tell which change caused it, so failures are common and slow to untangle. A finished feature also sits unused for weeks waiting for the next release.',
					light: ['freq', 'fail']
				},
				{
					title: 'Smaller changes',
					say: 'They add automated tests and a pipeline, so changes get smaller.',
					detail:
						'A pipeline removes the manual work that made each release expensive, so shipping daily costs about the same effort as shipping monthly. Lead time, the clock from commit to production, falls from weeks to days because work no longer waits for a release date.',
					set: { freq: 'Deploys\nevery day', lead: 'Lead time\n2 days' },
					light: ['freq', 'lead']
				},
				{
					title: 'Fewer failures',
					say: 'Small changes are easier to check, so fewer of them break.',
					detail:
						'A fifty-line change can be reviewed properly and tested fully, while a five-thousand-line release cannot. The change failure rate is the share of deployments that need a hotfix or rollback, and here it drops from 30% to 8%.',
					set: {
						freq: 'Deploys\nevery day',
						lead: 'Lead time\n2 days',
						fail: 'Failed deploys\n8%'
					},
					light: ['fail']
				},
				{
					title: 'Restore in minutes',
					say: 'When one does break, the cause is obvious and rollback is one click. Faster became safer.',
					detail:
						'Time to restore measures how long users suffer before service is back. With one small change per deploy, the suspect is clear, and redeploying the previous build is a routine pipeline run. This is the key DORA finding: speed and stability improve together.',
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
					title: 'Branch off main',
					say: 'Create a short branch from main for one small change.',
					detail:
						'A branch in Git is just a cheap pointer to a commit, made with a command like git switch -c fix-login. Keeping it to one small change means it can merge within a day, before main moves far ahead and conflicts pile up.',
					send: [['m1', 'b']],
					light: ['b']
				},
				{
					title: 'Open a pull request',
					say: 'Open a pull request. CI starts testing it straight away.',
					detail:
						'The pull request shows the diff to reviewers and starts the CI workflow on every push to the branch. On GitHub, CI usually tests a trial merge of the branch into the latest main, so it checks what main would actually become.',
					send: [['b', 'pr']],
					light: ['pr']
				},
				{
					title: 'Merge blocked',
					say: 'CI finds a failing test, so main stays protected.',
					detail:
						'Branch protection rules make passing checks a requirement, so the merge button stays disabled while any required check is red. The broken change lives only on its branch, and everyone else keeps working from a healthy main.',
					set: { pr: 'Tests failed\nmerge blocked' },
					down: ['pr']
				},
				{
					title: 'Fix and approve',
					say: 'Push a fix. The checks pass and a teammate approves.',
					detail:
						'Each new push to the branch reruns every check from scratch, so the fix is tested too. A reviewer reads the diff, asks questions and approves it. Many teams require at least one approval from someone other than the author.',
					set: { pr: 'CI passed\nApproved' },
					light: ['pr']
				},
				{
					title: 'Merge the same day',
					say: 'It merges into main the same day, before it can drift.',
					detail:
						'Merging quickly keeps the gap between the branch and main small, so conflicts stay tiny. Teams often squash the branch into one commit, giving a clean history where each commit on main is one reviewed change. The branch is then deleted.',
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
					title: 'Push starts a run',
					say: 'A developer pushes a commit, and a clean machine starts up.',
					detail:
						'The push triggers the workflow, and the CI service starts a fresh virtual machine, such as an ubuntu-latest runner on GitHub Actions. It checks out the code and runs npm ci, which installs exactly the versions in the lockfile.',
					hide: ['dev'],
					send: [['push', 'lint']],
					light: ['lint']
				},
				{
					title: 'Quick checks first',
					say: 'Style and lint checks pass in seconds.',
					detail:
						'Linting reads the code without running it, catching mistakes like unused variables or inconsistent formatting. These checks are cheap, so they run first: if one fails, nobody waits minutes for the slower test suite to point out a typo.',
					hide: ['dev'],
					send: [['lint', 'test']],
					light: ['test']
				},
				{
					title: 'A test fails',
					say: 'A test fails. The pipeline stops here, so the bad build goes no further.',
					detail:
						'Each step must exit with code 0 for the job to carry on. A failing test returns a non-zero code, so the runner marks the job red and skips the remaining steps, and no build is made. The commit shows as failed on its pull request.',
					down: ['test'],
					hide: ['dev']
				},
				{
					title: 'Fast feedback',
					say: 'The developer hears about it while the change is still fresh in their mind.',
					detail:
						'CI reports the result on the pull request and usually sends a notification by email or chat. Hearing within ten minutes means the developer still remembers the change, so the fix often takes moments. A failure found a week later can take hours to understand.',
					down: ['test'],
					send: [['test', 'dev']],
					light: ['dev']
				},
				{
					title: 'All checks green',
					say: 'After the fix, everything passes and the build is ready to ship.',
					detail:
						'Once every step passes, the build step produces the output that later stages will deploy. Many pipelines save it as an artifact, a stored copy of the build, so later stages reuse this exact output instead of building it again.',
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
		links: [
			['Continuous Delivery (Fowler)', 'https://martinfowler.com/bliki/ContinuousDelivery.html'],
			['continuousdelivery.com', 'https://continuousdelivery.com/']
		],
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
					title: 'Build once',
					say: 'CI produces one build. This same build moves through every environment.',
					detail:
						'The build gets a fixed version, here v2.4, and is stored unchanged, often as a container image tagged with that version. Rebuilding for each environment could pull in a different dependency or setting, so you would ship something you never tested.',
					light: ['art'],
					hide: ['old']
				},
				{
					title: 'Check in staging',
					say: 'It goes to staging first, and automated checks run against it.',
					detail:
						'Staging is set up to match production as closely as possible: same infrastructure, same kind of config, realistic data. Automated end-to-end tests drive the app the way a user would, catching problems that only show when all the parts run together.',
					send: [['art', 'stg']],
					light: ['stg'],
					hide: ['old']
				},
				{
					title: 'The approval gate',
					say: 'In Continuous Delivery a human approves here. In Continuous Deployment this gate is automatic.',
					detail:
						'In Continuous Delivery the pipeline pauses until someone clicks approve, often a product owner choosing a good moment. In Continuous Deployment, passing tests are the approval. Both need the same strong automated tests to be safe.',
					send: [['stg', 'gate']],
					light: ['gate'],
					hide: ['old']
				},
				{
					title: 'Smoke test in production',
					say: 'It reaches production, and a smoke test runs straight away.',
					detail:
						'A smoke test is a short script that checks the vital paths: the home page loads, users can log in, a payment can start. It takes seconds and runs against the real system, catching problems such as a missing production setting that staging could not reveal.',
					send: [['gate', 'prod']],
					light: ['prod'],
					hide: ['old']
				},
				{
					title: 'Automatic rollback',
					say: 'If the smoke test fails, the pipeline restores the last good version.',
					detail:
						'Because v2.3 is still stored as an artifact, rolling back means redeploying it, not rebuilding anything, so recovery takes minutes. It only stays safe if database changes in v2.4 are backwards compatible with the older code.',
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
					title: 'Write the Dockerfile',
					say: 'The Dockerfile describes exactly how to build your app.',
					detail:
						'Each line is an instruction: FROM picks a base image, COPY adds files, RUN executes a command at build time, and CMD sets what starts when the container runs. Because the recipe lives in Git, anyone can rebuild the same environment and review changes to it.',
					light: ['df'],
					hide: ['a', 'b']
				},
				{
					title: 'Build the image',
					say: 'Building it produces an image: your app plus everything it needs.',
					detail:
						'docker build runs each instruction and saves the result as a read-only layer. Layers are cached, so copying package.json before the rest of the code means dependencies are reinstalled only when they change. That can cut a rebuild from minutes to seconds.',
					send: [['df', 'img']],
					light: ['img'],
					hide: ['a', 'b']
				},
				{
					title: 'Push to a registry',
					say: 'The image is pushed to a registry with a version tag.',
					detail:
						'docker push uploads the layers to a registry such as Docker Hub or Amazon ECR, under a name and tag like shop:v1.2. Layers the registry already holds are skipped. Avoid the latest tag in production, because it can point to a different image tomorrow.',
					send: [['img', 'reg']],
					light: ['reg'],
					hide: ['a', 'b']
				},
				{
					title: 'Pull and run anywhere',
					say: 'Any machine can pull it and run it. Both copies are identical, byte for byte.',
					detail:
						'docker run fetches the image if needed and starts it as an isolated process that shares the host kernel, so it starts in moments. Pulling by digest, a sha256 fingerprint of the image, guarantees both machines get exactly the same bytes. Anything written inside the container is lost when it is removed.',
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
					title: 'Desired state',
					say: 'You declared "I want 3 Pods". The Service shares traffic across them.',
					detail:
						'You write the wish in a Deployment with replicas: 3 and apply it. Pods come and go and their addresses change, so the Service gives them one stable name and address and spreads requests across whichever Pods are behind it.',
					hide: ['d'],
					send: [
						['svc', 'a'],
						['svc', 'b'],
						['svc', 'c']
					]
				},
				{
					title: 'A node fails',
					say: 'Node 1 dies, taking two Pods with it.',
					detail:
						'A node can go down from a hardware fault, a crash or a lost network link. The kubelet, the agent on each node, stops sending heartbeats, and after a short grace period the control plane marks the node NotReady. Its Pods can no longer serve requests.',
					hide: ['d'],
					down: ['a', 'b']
				},
				{
					title: 'Spot the difference',
					say: 'The control plane sees 1 Pod running but 3 wanted.',
					detail:
						'Controllers in the control plane run a loop: compare the desired state with the actual state, then act on any difference. By default, Pods on an unreachable node are evicted after about five minutes, and from then on they no longer count towards the 3.',
					hide: ['d'],
					down: ['a', 'b'],
					light: ['cp']
				},
				{
					title: 'Reschedule the Pods',
					say: 'It starts replacements on the healthy node, without anyone being paged.',
					detail:
						'The ReplicaSet controller creates new Pod objects, and the scheduler picks a node with enough free CPU and memory, here Node 2. The kubelet there pulls the image and starts the containers. This only works if the healthy nodes have spare capacity.',
					down: ['a', 'b'],
					send: [['cp', 'd']],
					light: ['d']
				},
				{
					title: 'Route to ready Pods',
					say: 'The Service only sends traffic to Pods that are ready.',
					detail:
						'Each Pod can declare a readiness probe, such as an HTTP check on /healthz. Until it passes, the Pod is left out of the Service endpoints, so a container that is still starting never gets traffic. A Pod that fails the probe later is taken out too.',
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
			alt: 'Code in Git goes through plan and review, then apply, which creates the real cloud resources. A server deleted by hand causes drift, and the next plan finds it.',
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
					title: 'Edit the code',
					say: 'You change "2 servers" to "4 servers" in code and open a pull request.',
					detail:
						'In Terraform this is often a single number, like count = 4 on the server resource. Making the change in a pull request gives it the same review, history and CI checks as application code, so anyone can see who changed what and when.',
					light: ['code'],
					set: { code: 'Code\n4 servers' }
				},
				{
					title: 'Plan and review',
					say: 'Plan shows exactly what will change: add 2. A teammate reviews it.',
					detail:
						'terraform plan reads the state file, checks the real resources, and lists every create, change or destroy it would make. The reviewer reads that output, not just the code, because a small edit can sometimes replace a resource instead of updating it in place.',
					send: [['code', 'plan']],
					set: { code: 'Code\n4 servers', plan: 'Plan:\nadd 2' },
					light: ['plan']
				},
				{
					title: 'Apply the change',
					say: 'Apply makes it real.',
					detail:
						'terraform apply calls the cloud provider API to create the two new servers, then records them in the state file. Keeping state remotely with locking turned on stops two people applying at the same time and corrupting that record.',
					send: [
						['plan', 'apply'],
						['apply', 'cloud']
					],
					set: { code: 'Code\n4 servers', cloud: 'Cloud\n4 servers' }
				},
				{
					title: 'Manual drift',
					say: 'Someone deletes a server by hand in the console. Reality no longer matches the code.',
					detail:
						'Console changes skip review and leave no record in Git, so the code stops describing reality. Nobody can see who removed the server or why, and the team now runs on less capacity than the code promises.',
					set: { code: 'Code\n4 servers', cloud: 'Cloud\n3 servers' },
					light: ['cloud']
				},
				{
					title: 'Plan finds the drift',
					say: 'The next plan spots the drift and offers to put the server back.',
					detail:
						'Each plan refreshes its view of the real resources and compares them with the code, so the missing server shows up as one to create. One catch: Terraform only tracks resources in its state, so a server made entirely by hand stays invisible until you import it.',
					send: [['code', 'plan']],
					set: { code: 'Code\n4 servers', plan: 'Plan:\nadd 1', cloud: 'Cloud\n3 servers' },
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
		links: [['Dev/prod parity (12-factor)', 'https://12factor.net/dev-prod-parity']],
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
					title: 'Land in Dev',
					say: 'A developer merges a new checkout feature, and it lands in Dev.',
					detail:
						"Merging to main triggers an automatic deploy to Dev, a shared environment where everyone's merged work runs together for the first time. It uses fake seed data, so breaking it costs a little time and nothing else.",
					hide: ['bug'],
					light: ['dev']
				},
				{
					title: 'Try to break it',
					say: 'It moves to Test, where QA and automated suites try to break it.',
					detail:
						'Test runs a stable build long enough for testers to work through it, alongside automated end-to-end and regression suites. Its data is fake but chosen to cover awkward cases, like expired cards, empty baskets and very long names.',
					hide: ['bug'],
					send: [['dev', 'test']],
					light: ['test']
				},
				{
					title: 'Catch the bug early',
					say: 'They find a bug with discount codes. No customer ever saw it.',
					detail:
						'Testers try unusual combinations a developer did not think of, such as two discount codes on one order. The bug is logged in a ticket with the steps to reproduce it, and the build is held back from Staging.',
					send: [['test', 'bug']],
					light: ['bug'],
					down: ['test']
				},
				{
					title: 'Fix it in Dev',
					say: 'It goes back to Dev for a fix, which costs an hour instead of an outage.',
					detail:
						'The developer writes a test that reproduces the bug, fixes the code and merges again, so the pipeline makes a new build. That test stays in the suite, so this bug cannot quietly return later.',
					send: [['bug', 'dev']],
					light: ['dev']
				},
				{
					title: 'Staging sign-off',
					say: 'The fixed version passes Test and reaches Staging for a final sign-off.',
					detail:
						'Staging mirrors production in setup and size, often with masked copies of real data. The product owner checks the feature does what the business asked for, which is user acceptance testing. It is also the last place to rehearse the deploy itself.',
					hide: ['bug'],
					send: [['test', 'stg']],
					light: ['stg']
				},
				{
					title: 'Reach production',
					say: 'Only now does it reach Production and real customers.',
					detail:
						'The exact build that passed every earlier stage is deployed, with only its config changed. Many teams release it to a small share of users first and watch the dashboards, because some problems only appear with real traffic and real data.',
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
		links: [['Deployment pipeline', 'https://martinfowler.com/bliki/DeploymentPipeline.html']],
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
				{
					title: 'Review and CI',
					say: "A pull request passes CI and gets a teammate's approval.",
					detail:
						'Branch protection keeps the merge button locked until the checks pass and a reviewer approves. The reviewer looks for bugs, unclear code and missing tests, which catches problems no automated check would find.',
					light: ['pr']
				},
				{
					title: 'Auto-deploy to Dev',
					say: 'Merging deploys it to Dev straight away, with no manual step.',
					detail:
						'A merge to main triggers the pipeline, which builds the image once, tags it with the commit hash and deploys it to Dev. Tagging with the commit means anyone can trace exactly which code is running in each environment.',
					send: [['pr', 'dev']],
					light: ['dev']
				},
				{
					title: 'QA checks the ticket',
					say: 'QA moves the ticket to Test and checks every acceptance criterion.',
					detail:
						'Acceptance criteria are the conditions written on the ticket, such as a 10% discount code lowering the total by exactly 10%. QA tests each one by hand or with automated suites, and tries edge cases too. If any fail, the ticket goes back to the developer.',
					send: [['dev', 'qa']],
					light: ['qa']
				},
				{
					title: 'Business sign-off',
					say: 'The product owner tries it in Staging and approves it.',
					detail:
						'User acceptance testing checks that the feature solves the real business need, not just that it works. Staging is close to production, so the product owner sees it as customers will. In regulated companies this approval is often recorded for audits.',
					send: [['qa', 'uat']],
					light: ['uat']
				},
				{
					title: 'Promote the same build',
					say: 'That same build goes to Production, with no rebuilding.',
					detail:
						'The pipeline deploys the exact image tag or digest that passed Dev, Test and Staging. Rebuilding could pull in a newer dependency version, so what goes live might differ from what everyone tested.',
					send: [['uat', 'rel']],
					light: ['rel']
				},
				{
					title: 'Watch it live',
					say: 'The team watches errors and latency. The change is not done until it is healthy in Production.',
					detail:
						'For the first hours, the team watches error rate, latency and business numbers like completed orders, often compared with the same time yesterday. If anything drifts the wrong way, they roll back first and investigate after.',
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
		links: [['Config (12-factor)', 'https://12factor.net/config']],
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
					title: 'One image, many configs',
					say: 'SET UP: the same image starts everywhere, and only its config changes.',
					detail:
						'The app reads settings like DATABASE_URL from environment variables when it starts, so nothing environment-specific is baked into the image. This matters because the build that passed Test is then the exact build that runs in Production.',
					send: [
						['img', 'ct'],
						['img', 'cp']
					],
					light: ['img']
				},
				{
					title: 'Isolated databases',
					say: 'SET UP: each environment reaches only its own database.',
					detail:
						'Test config points at the test database and Production config at the production one, each with its own credentials. Ideally they also sit in separate networks or cloud accounts, so a mistake in one environment has no route into the other.',
					send: [
						['ct', 'dt'],
						['cp', 'dp']
					]
				},
				{
					title: 'Copied config',
					say: 'SKIPPED: someone copies a config file, and Test now holds the Production address.',
					detail:
						'Config files often get copied between environments to save time, and one forgotten value comes along. Nothing looks wrong, because the app starts happily with any valid address. Without separate credentials, the only protection left is people being careful.',
					set: { ct: 'Test config\nPROD address!' },
					light: ['ct']
				},
				{
					title: 'Script hits production',
					say: 'SKIPPED: a cleanup script for test data runs against real customers.',
					detail:
						'The script was written to wipe test orders, and it does exactly that, but to real customer records. Getting them back means restoring a backup, which can take hours and lose recent changes. Separate credentials for each environment prevent this.',
					send: [['ct', 'dp']],
					set: { ct: 'Test config\nPROD address!' },
					down: ['dp']
				},
				{
					title: 'Refused by design',
					say: 'SET UP: with separate credentials, that connection is simply refused.',
					detail:
						'The production database only accepts credentials that live in the production secrets manager, and Test never has them. Even with the wrong address the login fails, and network rules can block the connection before it gets that far. Safety comes from the setup, not from memory.',
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
		links: [
			['Evolutionary database design', 'https://martinfowler.com/articles/evodb.html'],
			['Parallel change', 'https://martinfowler.com/bliki/ParallelChange.html']
		],
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
					title: 'Copy prod into Test',
					say: 'SKIPPED: someone copies the production database into Test to reproduce a bug.',
					detail:
						'A bug that only happens with real data tempts people to dump the whole database and restore it into Test. Within an hour, names, emails, addresses and order history sit in a system never meant to hold them. Privacy laws such as GDPR expect that data to be protected wherever it is copied.',
					hide: ['mask', 'leak'],
					send: [['prod', 'test']],
					set: { test: 'Real names' }
				},
				{
					title: 'Weaker protection',
					say: 'SKIPPED: Test has weaker security, and more people can reach it.',
					detail:
						'Test environments usually have more users, shared logins, looser network rules and less monitoring, because they are meant to be safe to break. Data that would be encrypted and audited in production sits there with far fewer guards.',
					hide: ['mask', 'leak'],
					set: { test: 'Real names' },
					light: ['test']
				},
				{
					title: 'Data leaks',
					say: 'SKIPPED: a laptop is lost, and real customer details go with it.',
					detail:
						'Developers often pull Test data onto laptops for debugging, and a laptop can be stolen or a test bucket left public. Because the data is real, the company may have to tell regulators and customers. Under GDPR, a reportable breach must usually be reported within 72 hours.',
					hide: ['mask'],
					send: [['test', 'leak']],
					set: { test: 'Real names' },
					light: ['leak']
				},
				{
					title: 'Mask on the way',
					say: 'SET UP: the copy passes through masking first.',
					detail:
						'Masking is a step in the copy job that rewrites sensitive fields before the data leaves production. It runs automatically on every refresh, so nobody can forget it, and only the masked result is allowed into Test.',
					hide: ['leak'],
					send: [['prod', 'mask']],
					light: ['mask']
				},
				{
					title: 'Fake but realistic',
					say: 'SET UP: names become fake while the shape of the data stays realistic.',
					detail:
						'Masking swaps names, emails and card numbers for fake ones but keeps their formats, lengths and the links between tables. The same customer gets the same fake name everywhere, so joins still work and bugs still reproduce, while real people stay private.',
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
		links: [['Emergency response (SRE book)', 'https://sre.google/sre-book/emergency-response/']],
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
					title: 'Production breaks',
					say: 'Version 2.4 is live, and checkout starts failing.',
					detail:
						'Alerts fire as checkout errors jump after the deploy, and every minute costs orders. The pull to try a quick fix on the server is strongest now, which is exactly when an untested change is most likely to make things worse.',
					down: ['prod'],
					hide: ['hot', 'test']
				},
				{
					title: 'Roll back first',
					say: 'Roll back first. Customers are safe again within minutes.',
					detail:
						'Redeploying v2.3, the last good build, takes the bug out of production before anyone needs to understand it. It works because the old artifact is still stored, and it is only safe if v2.4 made no database changes that v2.3 cannot handle.',
					set: { prod: 'Production\nv2.3' },
					hide: ['hot', 'test'],
					light: ['prod']
				},
				{
					title: 'Hotfix branch',
					say: 'Create a small hotfix branch with only the fix in it.',
					detail:
						'The branch starts from the code that was released, often the v2.4 tag, not from main, which may already hold unfinished work. Keeping it to only the fix makes it quick to review and limits what else could go wrong.',
					set: { prod: 'Production\nv2.3' },
					hide: ['test'],
					light: ['hot']
				},
				{
					title: 'Fast pipeline',
					say: 'It runs through a fast version of the pipeline. Nobody edits the server by hand.',
					detail:
						'A hotfix pipeline still runs the essential tests but may skip slow stages like a full regression suite. Editing files on a server leaves no record, is wiped out by the next deploy, and makes things worse when nobody can say what changed.',
					set: { prod: 'Production\nv2.3' },
					send: [['hot', 'test']],
					light: ['test']
				},
				{
					title: 'Ship the fix',
					say: 'The fix goes live.',
					detail:
						'The fixed build becomes v2.5 and goes out through the normal deploy steps, with a smoke test and the team watching dashboards. Using a new version number rather than reusing v2.4 keeps it clear which code is running.',
					set: { prod: 'Production\nv2.5' },
					send: [['test', 'prod']],
					light: ['prod']
				},
				{
					title: 'Merge back to main',
					say: 'The fix is merged back to main, so the next release does not bring the bug back.',
					detail:
						'The next regular release is built from main, so a fix that lives only on the hotfix branch would be lost and the bug would return. Merging back, ideally with a test for the bug, closes that gap. Some teams fix main first and cherry-pick the fix onto the release instead.',
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
					title: 'Deploy without traffic',
					say: 'All traffic is on version 1. Version 2 is deployed but receives nothing.',
					detail:
						'Version 2 is running and passing its health checks, but the router sends it nothing. Separating deploy from release like this means a broken install never touches a single user.',
					send: [
						['user', 'r'],
						['r', 'v1']
					]
				},
				{
					title: 'Send a canary',
					say: 'Send 5% of users to version 2: the canary.',
					detail:
						'The router, often a load balancer or service mesh, uses weights to send 5 in every 100 requests to version 2. Many setups pin each user to one version with a cookie, so nobody flips between old and new pages mid-visit.',
					set: { r: 'Router\n95 / 5' },
					send: [
						['r', 'v1'],
						['r', 'v2']
					],
					light: ['v2']
				},
				{
					title: 'Raise the share',
					say: 'Errors and latency look healthy, so raise it to 50%.',
					detail:
						'The team, or a tool like Argo Rollouts or Flagger, compares version 2 with version 1 on error rate and latency. Each step usually waits several minutes, so there are enough requests for the numbers to be trusted before moving on.',
					set: { r: 'Router\n50 / 50' },
					send: [
						['r', 'v1'],
						['r', 'v2']
					]
				},
				{
					title: 'Full rollout',
					say: 'Still healthy. Move everyone over.',
					detail:
						'Version 1 is often kept around for a while in case a late problem appears, then removed. Throughout the rollout both versions ran side by side, which is why database changes must work with both old and new code.',
					set: { r: 'Router\n0 / 100' },
					send: [['r', 'v2']],
					light: ['v2']
				},
				{
					title: 'Canary rollback',
					say: 'Had the canary failed, only 5% of users would have noticed, and rollback is one change.',
					detail:
						'Setting the router back to 100/0 takes effect in seconds, because version 1 never stopped running. The damage is limited to a few minutes for a small group, compared with everyone when a release goes out all at once.',
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
					title: 'In sync',
					say: 'Git says 3 copies, the cluster runs 3. Everything matches.',
					detail:
						'The repository holds manifests, files that describe the desired state, such as replicas: 3 in a Deployment. The agent runs inside the cluster and reports Synced when the live objects match the files, so anyone can check what should be running by reading Git.',
					light: ['git', 'k8s']
				},
				{
					title: 'Merge to Git',
					say: 'You merge a change to 5 copies. Nothing pushes it anywhere.',
					detail:
						'Changing the copy count is a normal pull request, with review and history. CI never needs credentials for the cluster, which removes one of the most valuable secrets an attacker could steal from a pipeline.',
					set: { git: 'Git repo\nreplicas: 5' },
					light: ['git']
				},
				{
					title: 'Agent syncs',
					say: 'The agent sees that Git and the cluster differ, and applies the change.',
					detail:
						'Argo CD checks the repository about every three minutes by default, or straight away when a webhook tells it about a push. It marks the app OutOfSync and, with automated sync turned on, applies the new manifests to the cluster.',
					set: { git: 'Git repo\nreplicas: 5', k8s: 'Cluster\nrunning: 5' },
					send: [
						['agent', 'git'],
						['agent', 'k8s']
					]
				},
				{
					title: 'Manual change',
					say: 'Someone edits the cluster by hand and scales it down.',
					detail:
						'Someone runs kubectl scale to cut the copies to 1, perhaps to save money during a quiet hour. The cluster now differs from Git, and nothing in the repository records why or by whom, which is exactly the drift GitOps is meant to catch.',
					set: { git: 'Git repo\nreplicas: 5', k8s: 'Cluster\nrunning: 1' },
					light: ['k8s']
				},
				{
					title: 'Self-healing',
					say: 'The agent notices and puts it back. Git wins.',
					detail:
						'Argo CD sees the live object no longer matches Git and reapplies the manifest, back to 5 copies. This needs self-heal turned on in its sync policy, otherwise it only reports the app as OutOfSync. The lasting way to change the count is a commit.',
					set: { git: 'Git repo\nreplicas: 5', k8s: 'Cluster\nrunning: 5' },
					send: [['agent', 'k8s']],
					light: ['agent']
				}
			]
		}
	},
	{
		id: 'feature-flags',
		title: 'Feature flags',
		summary:
			'A feature flag is an if-statement whose answer comes from configuration instead of code. Deploying code and releasing a feature become two separate decisions, so you can ship it switched off, open it to a few users, and turn it off again in seconds.',
		points: [
			['Release flag', 'hides unfinished work on main. Remove it soon after launch.'],
			['Ops flag', 'a kill switch for a heavy feature during an incident.'],
			['Experiment flag', 'splits users into groups for an A/B test.'],
			['Permission flag', 'opens a feature to beta users or one plan. It can live for years.'],
			['The cost', 'every flag adds a path to test. Old flags are debt.']
		],
		tip: 'When you add a flag, add the ticket that removes it.',
		code: `if (flags.isEnabled('new-checkout', { userId })) {
  return newCheckout(cart);
}
return oldCheckout(cart);`,
		links: [
			['Feature toggles (Fowler)', 'https://martinfowler.com/articles/feature-toggles.html'],
			['OpenFeature', 'https://openfeature.dev/docs/reference/intro']
		],
		sketch: {
			kind: 'Traffic diagram',
			alt: 'Code asks a flag service which checkout to use. The flag opens the new checkout to staff, then 10% of users, is switched off when a bug appears, and is removed after launch.',
			h: 200,
			nodes: [
				{ id: 'user', label: 'Users', x: 30, y: 125, shape: 'person' },
				{ id: 'flag', label: 'Flags\nnew: off', x: 170, y: 36, w: 120, h: 56, fill: 'sky' },
				{ id: 'code', label: 'if flag on?', x: 170, y: 140, w: 120, h: 56, fill: 'yellow' },
				{ id: 'old', label: 'Old checkout', x: 390, y: 60, w: 140, h: 52, fill: 'mint' },
				{ id: 'new', label: 'New checkout', x: 390, y: 150, w: 140, h: 52, fill: 'pink' }
			],
			edges: [
				{ from: 'user', to: 'code' },
				{ from: 'flag', to: 'code', dashed: true },
				{ from: 'code', to: 'old' },
				{ from: 'code', to: 'new' }
			],
			steps: [
				{
					title: 'Ship it switched off',
					say: 'The new checkout is merged and deployed, but its flag is off. Everyone still gets the old one.',
					detail:
						'The code for both checkouts is in production, and each request asks the flag service which one to use. With the flag off, the new path never runs, so unfinished work can sit on main and be deployed safely.',
					send: [
						['user', 'code'],
						['code', 'old']
					],
					light: ['flag']
				},
				{
					title: 'Staff only',
					say: 'Turn it on for staff only. No deploy, just a change in the flag service.',
					detail:
						'A targeting rule tells the flag service to answer yes only for matching users, such as accounts with a company email address. The change takes effect within seconds, because the app checks the flag on each request or receives updates as they happen.',
					set: { flag: 'Flags\nnew: staff' },
					send: [
						['flag', 'code'],
						['code', 'new']
					],
					light: ['new']
				},
				{
					title: 'Gradual rollout',
					say: 'Then 10% of customers. Errors stay low, so keep going.',
					detail:
						'The flag service hashes each user ID into a bucket from 0 to 99, and users in buckets 0 to 9 get the new checkout. Hashing keeps each user in the same group on every visit, so nobody sees the checkout switch back and forth.',
					set: { flag: 'Flags\nnew: 10%' },
					send: [
						['code', 'old'],
						['code', 'new']
					]
				},
				{
					title: 'Kill switch',
					say: 'At 50% a bug shows up. Flip the flag off, and users are back on the old path in seconds.',
					detail:
						'Turning the flag off reaches every server within seconds, with no build, test run or deploy. That is much faster than a rollback, and it leaves every other change in the release live, so the bug can be fixed calmly.',
					set: { flag: 'Flags\nnew: off' },
					send: [['code', 'old']],
					down: ['new']
				},
				{
					title: 'Clean up the flag',
					say: 'After the fix and a full launch, delete the flag and the old code, or they pile up.',
					detail:
						'Every flag doubles the paths through that code, and old flags make it hard to know what actually runs. Once the feature is fully live, a small change removes the flag check and the old checkout, leaving one path to test and maintain.',
					set: { flag: 'Flag\nremoved', code: 'New code only' },
					hide: ['old'],
					send: [['code', 'new']],
					light: ['code']
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
					title: 'Three signals',
					say: 'Everything your services do leaves three kinds of evidence.',
					detail:
						'Each request can write log lines, update counters and timers for metrics, and record spans for a trace. With OpenTelemetry, one set of libraries collects all three and sends them to a collector, which forwards them to whichever tools you use.',
					send: [
						['svc', 'logs'],
						['svc', 'metrics'],
						['svc', 'traces']
					]
				},
				{
					title: 'Metrics raise the alarm',
					say: 'Metrics show the symptom: the error rate jumped, and an alert fires.',
					detail:
						'Metrics are cheap numbers stored over time, like errors per second, so they suit dashboards and alerts. A rule such as error rate above 2% for five minutes fires the alert. Metrics tell you something is wrong, but not which request or why.',
					send: [['metrics', 'dash']],
					light: ['metrics', 'dash']
				},
				{
					title: 'Traces find where',
					say: 'Traces show where: requests are stuck in the payment call.',
					detail:
						'A trace follows one request across services, with a span for each step and how long it took. Here the spans show most of the time spent waiting on the payment provider, which narrows the search to one call out of dozens.',
					send: [['traces', 'dash']],
					light: ['traces']
				},
				{
					title: 'Logs explain why',
					say: 'Logs show why: an expired API key. Metrics say what, traces say where, logs say why.',
					detail:
						'Logs record single events with details, like the reply the payment provider sent back. Structured JSON logs tagged with the same trace ID let you jump from the slow span straight to its log lines, where a 401 Unauthorized error gives the answer.',
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
					title: 'The budget starts full',
					say: 'The month starts with 43 minutes of allowed failure.',
					detail:
						'A 99.9% SLO allows 0.1% of the time to go wrong: 30 days is 43,200 minutes, and 0.1% of that is about 43. While budget remains, the team ships features at its normal pace.',
					send: [['bud', 'ship']],
					light: ['ship']
				},
				{
					title: 'Spend some budget',
					say: 'A bad deploy costs 15 minutes. You are still fine, so keep shipping.',
					detail:
						'Every minute users see errors comes out of the budget, here 15 of the 43. Spending some is expected, because it is the price of moving quickly. The budget turns arguments about risk into a number that product and engineering agreed together.',
					set: { bud: 'Error budget\n28 min left' },
					send: [['bud', 'ship']]
				},
				{
					title: 'Budget spent',
					say: 'An outage costs another 30 minutes, and the budget is gone.',
					detail:
						'Another 30 minutes brings the total to 45, two more than the target allows, so the SLO is missed for this window. Nobody is blamed: the number simply says users have had less reliability than was agreed.',
					set: { bud: 'Error budget\n2 min over' },
					light: ['bud']
				},
				{
					title: 'Pause and fix',
					say: 'Releases pause, and the team works on reliability instead.',
					detail:
						'An error budget policy, agreed in advance, says what happens now: feature releases stop, and only fixes and reliability work ship. Agreeing this before an outage avoids arguing about it during one.',
					set: { bud: 'Error budget\n2 min over' },
					send: [['bud', 'stop']],
					light: ['stop']
				},
				{
					title: 'The budget refills',
					say: 'Next month the budget resets. Users got the reliability they need, and no more than that.',
					detail:
						'With a calendar month, the budget starts again at 43 minutes. Many teams use a rolling 30-day window instead, where old incidents age out day by day. Either way, aiming far above the target would cost speed that users would never notice.',
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
		links: [
			['Managing incidents (SRE book)', 'https://sre.google/sre-book/managing-incidents/'],
			['Postmortem culture (SRE book)', 'https://sre.google/sre-book/postmortem-culture/']
		],
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
				{
					title: 'An alert fires',
					say: '02:14. An alert fires because checkout errors jumped.',
					detail:
						'The alert watches a symptom users feel, the checkout error rate, so it fires before customers start calling. It pages whoever is on call through a tool like PagerDuty, which escalates to the next person if nobody acknowledges it.',
					light: ['det']
				},
				{
					title: 'Triage',
					say: 'The on-call engineer takes the lead and checks what changed: a deploy ten minutes ago.',
					detail:
						'The incident lead coordinates and decides while others investigate, so effort is not wasted twice. The first question is what changed, because most incidents follow a deploy or a config change. A deploy log with timestamps answers it in seconds.',
					send: [['det', 'tri']],
					light: ['tri']
				},
				{
					title: 'Mitigate now',
					say: 'Roll back now. Service recovers while the cause is still unknown, and that is fine.',
					detail:
						'Mitigation means stopping the harm, not understanding it. Rolling back the suspect deploy is quick and usually safe, and the logs and traces are kept so the cause can be found later. Every extra minute spent debugging live is a minute customers suffer.',
					send: [['tri', 'mit']],
					light: ['mit']
				},
				{
					title: 'Blameless review',
					say: 'Next day, a blameless review finds the missing test and adds it.',
					detail:
						'The review writes a timeline and asks how the system let the bug through, not who caused it. People share details honestly when they are not afraid of punishment. Each finding becomes an action item with an owner, like the missing test here.',
					send: [['mit', 'rev']],
					light: ['rev']
				},
				{
					title: 'Close the loop',
					say: 'The fix improves the system, so this failure cannot happen the same way twice.',
					detail:
						'Action items such as new tests, better alerts or safer deploy steps strengthen the whole system, not just one piece of code. Tracking them to completion matters: a review whose actions never ship lets the same incident return.',
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
					title: 'Secret blocked',
					say: 'A developer accidentally commits an API key. The scan blocks it before it spreads.',
					detail:
						'A secret scanner, such as GitHub push protection or a gitleaks pre-commit hook, matches known key patterns before the commit is accepted. Once a key reaches a shared repository it lives in the history and in every clone, so blocking it early is far cheaper.',
					down: ['code'],
					set: { code: 'Commit\nblocked: secret' }
				},
				{
					title: 'Rotate the key',
					say: 'The key is removed and rotated, so the commit moves on.',
					detail:
						'Rotating means creating a new key and disabling the old one at the provider, so any copy that escaped is useless. The new key goes into a secrets manager and the app reads it at run time, so it never needs to be in Git.',
					send: [['code', 'build']],
					light: ['build']
				},
				{
					title: 'Vulnerable dependency',
					say: 'A library has a known vulnerability, so the build fails until it is upgraded.',
					detail:
						'A dependency scanner compares the libraries in the lockfile with public vulnerability databases, where each known flaw has a CVE number. Upgrading to a patched version clears it, and tools like Dependabot can open that pull request for you.',
					set: { build: 'Build\nblocked: CVE' },
					down: ['build']
				},
				{
					title: 'Scan the image',
					say: 'After the upgrade, the finished image is checked as well.',
					detail:
						'The image also holds an operating system layer with its own packages, like openssl, which the code scans never saw. A scanner such as Trivy checks those too, and a small base image means fewer packages that could be vulnerable.',
					send: [['build', 'img']],
					light: ['img']
				},
				{
					title: 'Safe to ship',
					say: 'Only what passes every check reaches production.',
					detail:
						'Each check runs automatically at the stage where a problem is cheapest to fix, so security adds minutes rather than weeks. Least privilege still applies in production: the running service gets only the access it needs, in case something slipped through.',
					send: [['img', 'prod']],
					light: ['prod']
				}
			]
		}
	},
	{
		id: 'slo-alerts',
		title: 'Alerting on SLOs',
		summary:
			'An alert should wake someone only when users are hurt badly enough to matter. Alerting on how fast the error budget is burning does exactly that: a fast burn pages a person, and a slow burn becomes a ticket for working hours.',
		points: [
			[
				'Burn rate',
				'how fast you spend the budget. A rate of 1 spends it exactly by the end of the window.'
			],
			['Fast burn', 'a rate of 14.4 for one hour spends 2% of a 30-day budget. Page now.'],
			['Slow burn', 'a rate of 1 for three days spends 10%. Open a ticket.'],
			[
				'Two windows',
				'each alert checks a long and a short window, so it clears soon after the errors stop.'
			]
		],
		tip: 'If a page needs no action from a human, delete it or turn it into a ticket.',
		table: {
			head: ['Alert', 'Long window', 'Short window', 'Burn rate', 'Budget spent'],
			rows: [
				['Page', '1 hour', '5 minutes', '14.4', '2%'],
				['Page', '6 hours', '30 minutes', '6', '5%'],
				['Ticket', '3 days', '6 hours', '1', '10%']
			]
		},
		links: [
			['Alerting on SLOs (SRE workbook)', 'https://sre.google/workbook/alerting-on-slos/'],
			['Implementing SLOs (SRE workbook)', 'https://sre.google/workbook/implementing-slos/']
		],
		sketch: {
			kind: 'Alerting flow',
			alt: 'With a 99.9% SLO, the error rate sets a burn rate. A fast burn pages the on-call engineer, and a slow burn opens a ticket.',
			h: 200,
			nodes: [
				{ id: 'err', label: 'Error rate\n0.05%', x: 75, y: 100, w: 120, h: 62, fill: 'sky' },
				{ id: 'burn', label: 'Burn rate\n0.5', x: 240, y: 100, w: 120, h: 62, fill: 'yellow' },
				{ id: 'page', label: 'Page on-call', x: 400, y: 45, w: 130, h: 52, fill: 'pink' },
				{ id: 'ticket', label: 'Ticket', x: 400, y: 155, w: 130, h: 52, fill: 'mint' }
			],
			edges: [
				{ from: 'err', to: 'burn' },
				{ from: 'burn', to: 'page', label: 'fast' },
				{ from: 'burn', to: 'ticket', label: 'slow' }
			],
			steps: [
				{
					title: 'Burning at half speed',
					say: 'The SLO is 99.9%, so 0.1% of requests may fail. Today 0.05% fail: the budget burns at half speed.',
					detail:
						'Burn rate is the actual error rate divided by the allowed one: 0.05% divided by 0.1% is 0.5. At that pace only half the budget would be used by the end of the 30 days, so no alert is needed.',
					send: [['err', 'burn']],
					light: ['burn']
				},
				{
					title: 'A fast burn',
					say: 'A bad deploy: 1.5% of requests fail. That burns the budget 15 times faster than allowed.',
					detail:
						'1.5% divided by the allowed 0.1% gives a burn rate of 15. At that speed the whole 30-day budget would be gone in about two days, far too fast to leave until morning.',
					set: { err: 'Error rate\n1.5%', burn: 'Burn rate\n15' },
					send: [['err', 'burn']],
					light: ['err']
				},
				{
					title: 'Page on two windows',
					say: 'It stays high over both the hour and the last five minutes, so on-call is paged.',
					detail:
						'The rule needs a burn rate above 14.4 over the last hour, which means 2% of the budget is gone, and also over the last five minutes. The long window proves the problem is serious, and the short one proves it is still happening.',
					set: { err: 'Error rate\n1.5%', burn: 'Burn rate\n15' },
					send: [['burn', 'page']],
					light: ['page']
				},
				{
					title: 'The alert clears',
					say: 'Rollback. The short window clears within minutes, and the page resolves itself.',
					detail:
						'Once errors stop, the five-minute burn rate drops below the threshold within minutes, even though the hour-long average stays high for a while. Without the short window, the page would keep firing for close to an hour after the fix.',
					down: ['page'],
					light: ['burn']
				},
				{
					title: 'A slow burn',
					say: 'Later a small leak: 0.1% errors, day after day. A burn rate of 1 is too slow to page anyone.',
					detail:
						'A burn rate of 1 spends the budget exactly by the end of the 30 days, so it is a real problem but not an emergency. Paging someone at 3am for it would teach people to ignore pages, which is the bigger risk.',
					set: { err: 'Error rate\n0.1%', burn: 'Burn rate\n1' },
					send: [['err', 'burn']]
				},
				{
					title: 'Open a ticket',
					say: 'After three days it has spent 10% of the budget, so it opens a ticket for working hours.',
					detail:
						'The ticket rule checks a three-day window, backed by a six-hour short window, at a burn rate of 1. That catches leaks too small for a page, and the team can find the cause in working hours, well before the budget runs out.',
					set: { err: 'Error rate\n0.1%', burn: 'Burn rate\n1' },
					send: [['burn', 'ticket']],
					light: ['ticket']
				}
			]
		}
	}
];
