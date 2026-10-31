import type { Subject } from '../sketch';

const GROUP = 'Software engineering';

export const software: Subject[] = [
	{
		slug: 'software-engineering-fundamentals',
		title: 'Software Engineering Fundamentals for IT',
		group: GROUP,
		blurb:
			'The basics of building software professionally: the development life cycle, version control, and testing.',
		topics: [
			{
				id: 'sdlc',
				title: 'The software development life cycle',
				summary:
					'Software engineering is more than coding. Every project moves through the same activities, whether a team does them once in a long sequence or many times in short cycles.',
				points: [
					[
						'Waterfall',
						'each stage finishes before the next starts. Suits fixed, well-known requirements.'
					],
					['Iterative', 'build a small slice, learn, repeat. Suits changing requirements.'],
					['Maintenance', "most of a system's life and cost comes after its first release."],
					['Cost of change', 'a mistake found late costs far more than one found early.']
				],
				tip: 'Code is read far more often than it is written. Write it for the next person.',
				sketch: {
					kind: 'Cycle diagram',
					alt: 'A cycle of requirements, design, build, test, deploy and maintain, which returns to requirements.',
					h: 195,
					nodes: [
						{ id: 'a', label: 'Requirements', x: 80, y: 48, w: 126, h: 54, fill: 'sky' },
						{ id: 'b', label: 'Design', x: 240, y: 48, w: 126, h: 54, fill: 'sky' },
						{ id: 'c', label: 'Build', x: 400, y: 48, w: 126, h: 54, fill: 'yellow' },
						{ id: 'd', label: 'Test', x: 400, y: 150, w: 126, h: 54, fill: 'yellow' },
						{ id: 'e', label: 'Deploy', x: 240, y: 150, w: 126, h: 54, fill: 'mint' },
						{ id: 'f', label: 'Maintain', x: 80, y: 150, w: 126, h: 54, fill: 'mint' }
					],
					edges: [
						{ from: 'a', to: 'b' },
						{ from: 'b', to: 'c' },
						{ from: 'c', to: 'd' },
						{ from: 'd', to: 'e' },
						{ from: 'e', to: 'f' },
						{ from: 'f', to: 'a' }
					],
					steps: [
						{ say: 'Find out what is really needed.', light: ['a'] },
						{
							say: 'Plan how the system will work before writing it.',
							send: [['a', 'b']],
							light: ['b']
						},
						{ say: 'Write the code.', send: [['b', 'c']], light: ['c'] },
						{ say: 'Prove that it works.', send: [['c', 'd']], light: ['d'] },
						{ say: 'Get it to real users.', send: [['d', 'e']], light: ['e'] },
						{
							say: 'Fix and improve it. Feedback starts the next cycle.',
							send: [
								['e', 'f'],
								['f', 'a']
							],
							light: ['f']
						}
					]
				}
			},
			{
				id: 'git',
				title: 'Version control with Git',
				summary:
					'Git records every change to your project, so you can go back, work in parallel and see who changed what. Every engineer uses it, every day.',
				points: [
					['Working directory', 'the files you are editing now.'],
					['Staging area', 'the changes picked for your next commit.'],
					['Commit', 'a saved snapshot with a message.'],
					['Remote', 'a shared copy, usually on GitHub.'],
					['Branch', 'a separate line of work that can merge back.']
				],
				tip: 'Commit small and often, and write messages that explain why.',
				code: `git switch -c fix-login
git add login.c
git commit -m "fix: reject empty passwords"
git push -u origin fix-login`,
				sketch: {
					kind: 'Data flow diagram',
					alt: 'A change moves from the working directory to the staging area with git add, to the local repository with git commit, and to GitHub with git push.',
					h: 175,
					nodes: [
						{ id: 'w', label: 'Working\nfiles', x: 52, y: 60, w: 84, h: 66, fill: 'sky' },
						{ id: 's', label: 'Staging\narea', x: 172, y: 60, w: 84, h: 66, fill: 'yellow' },
						{
							id: 'r',
							label: 'Local\nrepo',
							x: 295,
							y: 60,
							w: 84,
							h: 76,
							shape: 'db',
							fill: 'mint'
						},
						{ id: 'g', label: 'GitHub', x: 425, y: 60, w: 84, h: 76, shape: 'db', fill: 'pink' },
						{ id: 'cmd', label: 'You edit a file', x: 240, y: 145, w: 240, h: 40 }
					],
					edges: [
						{ from: 'w', to: 's' },
						{ from: 's', to: 'r' },
						{ from: 'r', to: 'g' }
					],
					steps: [
						{ say: 'You fix a bug. Only your working files change.', light: ['w'] },
						{
							say: 'git add picks exactly what goes in the next commit.',
							set: { cmd: 'git add login.c' },
							send: [['w', 's']],
							light: ['s']
						},
						{
							say: 'git commit saves a snapshot on your machine.',
							set: { cmd: 'git commit' },
							send: [['s', 'r']],
							light: ['r']
						},
						{
							say: 'git push shares it, and your teammates can now see it.',
							set: { cmd: 'git push' },
							send: [['r', 'g']],
							light: ['g']
						}
					]
				}
			},
			{
				id: 'testing',
				title: 'Testing basics',
				summary:
					'Tests are code that checks your code. A good test suite lets you change things with confidence. Most tests should be small and fast, with a few big ones on top.',
				points: [
					['Unit test', 'one function, on its own. Runs in milliseconds.'],
					['Integration test', 'several parts working together, such as code and a database.'],
					['End-to-end test', 'the whole system, as a user would use it. Slow but realistic.'],
					['Test-driven development', 'write a failing test first, make it pass, then tidy up.']
				],
				tip: 'When you fix a bug, first write a test that catches it. That bug can never return unnoticed.',
				sketch: {
					kind: 'Test pyramid',
					alt: 'Many fast unit tests at the base, fewer integration tests above, and a few slow end-to-end tests at the top.',
					h: 195,
					nodes: [
						{ id: 'e', label: 'End-to-end: few, slow', x: 240, y: 32, w: 220, h: 44, fill: 'pink' },
						{ id: 'i', label: 'Integration: some', x: 240, y: 100, w: 300, h: 44, fill: 'yellow' },
						{ id: 'u', label: 'Unit: many, fast', x: 240, y: 168, w: 420, h: 44, fill: 'mint' }
					],
					edges: [],
					steps: [
						{
							say: 'A change arrives with a bug in it. Unit tests run first, and take only seconds.',
							light: ['u']
						},
						{
							say: 'A unit test catches the logic error right away, and points at the exact function.',
							down: ['u'],
							set: { u: 'Unit test failed: discount()' }
						},
						{
							say: 'A bug between two parts passes unit tests. Integration tests catch those.',
							light: ['i'],
							send: [['u', 'i']]
						},
						{
							say: 'A few end-to-end tests confirm that the main journeys still work for a real user.',
							light: ['e'],
							send: [['i', 'e']]
						}
					]
				}
			}
		]
	},
	{
		slug: 'software-requirements-engineering',
		title: 'Software Requirements Engineering',
		group: GROUP,
		blurb:
			'Working out what to build before you build it: finding needs, writing clear requirements, and managing change.',
		topics: [
			{
				id: 'elicitation',
				title: 'Finding out what people need',
				summary:
					'Elicitation is the work of discovering requirements. Users rarely know exactly what they want, and different groups want different things, so you gather from several sources and resolve the conflicts.',
				points: [
					['Stakeholders', 'anyone affected: users, managers, support staff, regulators.'],
					['Interviews and workshops', 'ask about their work and pain, not about features.'],
					['Observation', 'watch people work, because they often describe it inaccurately.'],
					['Prototypes', 'a rough sketch draws out better feedback than a document does.']
				],
				tip: 'Ask "why?" until you reach the real need. Requests are often solutions in disguise.',
				sketch: {
					kind: 'Process diagram',
					alt: 'Users and managers give conflicting requests to an analyst, who negotiates one agreed requirement.',
					h: 195,
					nodes: [
						{ id: 'u', label: 'Users:\nfewer clicks', x: 80, y: 45, w: 136, h: 62, fill: 'sky' },
						{
							id: 'm',
							label: 'Managers:\nmore approvals',
							x: 80,
							y: 150,
							w: 136,
							h: 62,
							fill: 'pink'
						},
						{ id: 'a', label: 'Analyst', x: 260, y: 98, w: 104, h: 62, fill: 'yellow' },
						{ id: 'r', label: 'Agreed\nrequirement', x: 410, y: 98, w: 124, h: 66, fill: 'mint' }
					],
					edges: [
						{ from: 'u', to: 'a' },
						{ from: 'm', to: 'a' },
						{ from: 'a', to: 'r' }
					],
					steps: [
						{
							say: 'Users ask for fewer steps when placing an order.',
							send: [['u', 'a']],
							light: ['u']
						},
						{
							say: 'Managers want a new approval step. The two requests conflict.',
							send: [['m', 'a']],
							light: ['m']
						},
						{
							say: 'The analyst asks why: managers only worry about orders over $1,000.',
							light: ['a']
						},
						{
							say: 'Agreed: approval is only needed for large orders. Both needs are met.',
							send: [['a', 'r']],
							set: { r: 'Approve if\nover $1,000' },
							light: ['r']
						}
					]
				}
			},
			{
				id: 'writing',
				title: 'Writing good requirements',
				summary:
					'A requirement should be clear enough to test. Functional requirements say what the system does, and non-functional requirements say how well it must do it. "Fast" means nothing until it has a number.',
				points: [
					['Functional', 'behaviour: the system shall email a receipt.'],
					['Non-functional', 'qualities: speed, security, uptime, usability.'],
					['User story', 'As a [role], I want [goal], so that [reason].'],
					['Acceptance criteria', 'the conditions that prove a story is done.'],
					['MoSCoW', "sort into Must, Should, Could and Won't have."]
				],
				tip: 'If you cannot write a test for it, it is not yet a requirement.',
				code: `As a shopper, I want to reset my password,
so that I can get back into my account.

Given I requested a reset link
When I open it within 30 minutes
Then I can choose a new password`,
				sketch: {
					kind: 'Before and after',
					alt: 'A vague requirement that the system should be fast is rewritten as a measurable, testable requirement.',
					h: 195,
					nodes: [
						{
							id: 'bad',
							label: '"Search should be fast"',
							x: 240,
							y: 35,
							w: 300,
							h: 50,
							fill: 'pink'
						},
						{
							id: 'q',
							label: 'How fast? For whom? When?',
							x: 240,
							y: 115,
							w: 300,
							h: 44,
							fill: 'yellow'
						},
						{ id: 'good', label: 'Waiting to be rewritten', x: 240, y: 170, w: 420, h: 38 }
					],
					edges: [{ from: 'bad', to: 'q' }],
					steps: [
						{ say: 'This sounds fine, but nobody can test it. Fast to whom?', light: ['bad'] },
						{
							say: 'Ask for a measure, a load and a condition.',
							send: [['bad', 'q']],
							light: ['q']
						},
						{
							say: 'Rewrite: now a tester can pass or fail it.',
							send: [['q', 'good']],
							set: { good: '95% of searches finish within 2 s at 500 users' },
							light: ['good']
						}
					]
				}
			},
			{
				id: 'traceability',
				title: 'Traceability and change',
				summary:
					'Requirements will change. Traceability links each requirement to its design, code and tests, so you can see what a change touches and prove that everything needed got built and tested.',
				points: [
					['Traceability matrix', 'a table mapping requirements to the work that meets them.'],
					['Impact analysis', 'work out what a change affects before agreeing to it.'],
					['Change control', 'an agreed way to request, assess and approve changes.'],
					['Scope creep', 'small unplanned additions that quietly sink a schedule.']
				],
				tip: 'Say "yes, and here is what it costs", not simply yes. Every change has a price.',
				sketch: {
					kind: 'Traceability diagram',
					alt: 'Requirement R7 links to a design, a code module and a test. A change request traces through each link to show its impact.',
					h: 175,
					nodes: [
						{
							id: 'r',
							label: 'R7: receipts\nby email',
							x: 68,
							y: 50,
							w: 116,
							h: 66,
							fill: 'yellow'
						},
						{ id: 'd', label: 'Design', x: 200, y: 50, w: 76, h: 66, fill: 'sky' },
						{ id: 'c', label: 'Code', x: 312, y: 50, w: 72, h: 66, fill: 'sky' },
						{ id: 't', label: 'Test', x: 428, y: 50, w: 72, h: 66, fill: 'mint' },
						{
							id: 'cr',
							label: 'Change: also send by SMS',
							x: 240,
							y: 140,
							w: 280,
							h: 46,
							fill: 'pink'
						}
					],
					edges: [
						{ from: 'r', to: 'd' },
						{ from: 'd', to: 'c' },
						{ from: 'c', to: 't' },
						{ from: 'cr', to: 'r' }
					],
					steps: [
						{
							say: 'Each requirement is linked to the design, code and test that deliver it.',
							send: [
								['r', 'd'],
								['d', 'c'],
								['c', 't']
							]
						},
						{
							say: 'A change request arrives: also send receipts by SMS.',
							send: [['cr', 'r']],
							light: ['cr']
						},
						{
							say: 'Follow the links to find everything that must change.',
							send: [
								['r', 'd'],
								['d', 'c'],
								['c', 't']
							],
							light: ['d', 'c', 't']
						},
						{
							say: 'Now you can estimate the real cost and make an informed decision.',
							set: { cr: 'Impact: 3 items, about 2 days' },
							light: ['cr']
						}
					]
				}
			}
		]
	},
	{
		slug: 'full-stack-development',
		title: 'Full-stack Development',
		group: GROUP,
		blurb:
			'Building complete web applications: how a request travels through the stack, how login works, and how pages get rendered.',
		topics: [
			{
				id: 'stack',
				title: 'Front end, back end, database',
				summary:
					'A full-stack developer works on every layer of a web app. The front end runs in the browser, the back end holds the rules and secrets, and the database keeps the data.',
				points: [
					[
						'Front end',
						'HTML for structure, CSS for style, JavaScript for behaviour. Frameworks include React and Svelte.'
					],
					['Back end', 'an API built with Node, Python, Java or similar.'],
					['Database', 'stores data permanently, for example PostgreSQL.'],
					['Validate on the server', 'browser checks help users, but anyone can bypass them.']
				],
				tip: 'Never trust the browser. Treat everything it sends as untrusted input.',
				code: `// front end
const res = await fetch('/api/orders');
const orders = await res.json();

// back end
app.get('/api/orders', async (req, res) => {
  const rows = await db.query('SELECT * FROM orders WHERE user_id = $1', [req.user.id]);
  res.json(rows);
});`,
				sketch: {
					kind: 'Sequence diagram',
					alt: 'The browser calls the API, the API queries the database, and rows return as JSON, which the browser turns into a page.',
					h: 225,
					nodes: [
						{ id: 'b', label: 'Browser', x: 90, y: 24, shape: 'lifeline', fill: 'sky' },
						{ id: 'a', label: 'API', x: 250, y: 24, shape: 'lifeline', fill: 'yellow' },
						{ id: 'd', label: 'Database', x: 400, y: 24, shape: 'lifeline', fill: 'mint' },
						{ id: 'b1', label: '', x: 90, y: 75, shape: 'dot' },
						{ id: 'a1', label: '', x: 250, y: 75, shape: 'dot' },
						{ id: 'a2', label: '', x: 250, y: 115, shape: 'dot' },
						{ id: 'd2', label: '', x: 400, y: 115, shape: 'dot' },
						{ id: 'd3', label: '', x: 400, y: 155, shape: 'dot' },
						{ id: 'a3', label: '', x: 250, y: 155, shape: 'dot' },
						{ id: 'a4', label: '', x: 250, y: 195, shape: 'dot' },
						{ id: 'b4', label: '', x: 90, y: 195, shape: 'dot' }
					],
					edges: [
						{ from: 'b1', to: 'a1', label: 'GET /api/orders' },
						{ from: 'a2', to: 'd2', label: 'SQL' },
						{ from: 'd3', to: 'a3', label: 'rows' },
						{ from: 'a4', to: 'b4', label: 'JSON' }
					],
					steps: [
						{
							say: 'JavaScript in the browser asks the API for orders.',
							send: [['b1', 'a1']],
							light: ['b']
						},
						{
							say: 'The API checks who is asking, then runs a query.',
							send: [['a2', 'd2']],
							light: ['a']
						},
						{
							say: "The database returns only that user's rows.",
							send: [['d3', 'a3']],
							light: ['d']
						},
						{
							say: 'The API sends JSON, and the browser draws it on the page.',
							send: [['a4', 'b4']],
							light: ['b']
						}
					]
				}
			},
			{
				id: 'auth',
				title: 'Login and sessions',
				summary:
					'Authentication proves who you are, and authorisation decides what you may do. Passwords are never stored directly: you store a slow hash, then compare hashes when someone logs in.',
				points: [
					['Hashing', 'use bcrypt or Argon2, which are built to be slow to attack.'],
					['Session cookie', 'the server remembers you, and the browser holds an ID.'],
					['JWT', "a signed token that carries the user's details. Hard to revoke early."],
					['Cookie flags', 'HttpOnly, Secure and SameSite block common attacks.']
				],
				tip: 'Use a well-tested auth library. Writing your own is one of the riskiest things you can do.',
				sketch: {
					kind: 'Data flow diagram',
					alt: 'The browser sends a password, the server compares its hash with the stored hash, and returns a session cookie used on later requests.',
					h: 195,
					nodes: [
						{ id: 'b', label: 'Browser', x: 65, y: 95, w: 110, h: 66, fill: 'sky' },
						{ id: 's', label: 'Server', x: 240, y: 95, w: 110, h: 66, fill: 'yellow' },
						{
							id: 'd',
							label: 'Stored\nhash',
							x: 410,
							y: 95,
							w: 110,
							h: 84,
							shape: 'db',
							fill: 'mint'
						}
					],
					edges: [
						{ from: 'b', to: 's', label: 'HTTPS' },
						{ from: 's', to: 'd', label: 'compare' }
					],
					steps: [
						{
							say: 'You send your email and password, always over HTTPS.',
							send: [['b', 's']],
							light: ['b']
						},
						{
							say: 'The server hashes what you typed and compares it with the stored hash.',
							send: [['s', 'd']],
							light: ['d']
						},
						{
							say: 'They match, so the server creates a session and sends back a cookie.',
							send: [['s', 'b']],
							set: { b: 'Browser\n+ cookie' }
						},
						{
							say: 'Each later request carries the cookie, so you stay logged in.',
							send: [['b', 's']],
							set: { b: 'Browser\n+ cookie' }
						},
						{
							say: 'If the database leaks, attackers get hashes, not passwords.',
							set: { d: 'Hashes\nonly' },
							light: ['d']
						}
					]
				}
			},
			{
				id: 'rendering',
				title: 'Rendering: where HTML is made',
				summary:
					'A page can be built in the browser, on the server for each request, or ahead of time. The choice affects speed, search ranking and cost. This site is built ahead of time.',
				points: [
					['CSR', 'client-side rendering. The browser gets JavaScript and builds the page itself.'],
					['SSR', 'server-side rendering. The server builds fresh HTML for each request.'],
					['SSG', 'static generation. HTML is built once, at deploy time.'],
					['Hydration', 'JavaScript wakes up server-made HTML to make it interactive.']
				],
				tip: 'Use static pages if the content is the same for everyone. They are the fastest and the cheapest.',
				table: {
					head: ['Method', 'Best for', 'Main cost'],
					rows: [
						['CSR', 'Apps behind a login', 'Slow first load'],
						['SSR', 'Personal, changing pages', 'Server work per request'],
						['SSG', 'Docs, blogs, this site', 'Rebuild to change content']
					]
				},
				sketch: {
					kind: 'Comparison',
					alt: 'Static generation builds HTML once at deploy time, then a CDN serves it to every visitor without doing more work.',
					h: 180,
					nodes: [
						{ id: 'b', label: 'Build step', x: 75, y: 85, w: 120, h: 62, fill: 'yellow' },
						{ id: 'c', label: 'CDN with\nHTML files', x: 245, y: 85, w: 124, h: 66, fill: 'mint' },
						{ id: 'u', label: 'Visitors', x: 425, y: 65, shape: 'person' }
					],
					edges: [
						{ from: 'b', to: 'c' },
						{ from: 'c', to: 'u' }
					],
					steps: [
						{
							say: 'At deploy time, the build runs every page once and saves plain HTML.',
							send: [['b', 'c']],
							light: ['b']
						},
						{
							say: 'A visitor gets a finished page from the nearest CDN location.',
							send: [['c', 'u']],
							light: ['c']
						},
						{
							say: 'A million visitors get the same file, and no server does any extra work.',
							send: [['c', 'u']],
							light: ['u']
						},
						{
							say: 'To change the content, you run the build again.',
							send: [['b', 'c']],
							light: ['b']
						}
					]
				}
			}
		]
	},
	{
		slug: 'software-engineering-process-tools',
		title: 'Software Engineering: Process and Tools',
		group: GROUP,
		blurb:
			'How professional teams organise their work: Scrum, Kanban boards, and the toolchain from ticket to merged code.',
		topics: [
			{
				id: 'scrum',
				title: 'Scrum',
				summary:
					'Scrum organises work into short fixed cycles called sprints, usually two weeks. Each sprint delivers something usable, so the team gets real feedback often.',
				points: [
					['Product Owner', 'decides what matters most.'],
					['Scrum Master', 'helps the team and removes blockers.'],
					['Developers', 'decide how to do the work, and do it.'],
					['Events', 'sprint planning, daily scrum, sprint review, and retrospective.']
				],
				tip: 'The retrospective is the most valuable meeting. It is how a team gets better.',
				sketch: {
					kind: 'Cycle diagram',
					alt: 'A sprint: the backlog feeds sprint planning, two weeks of work with a daily scrum, a review, and a retrospective.',
					h: 195,
					nodes: [
						{ id: 'b', label: 'Product\nbacklog', x: 80, y: 48, w: 126, h: 62, fill: 'sky' },
						{ id: 'p', label: 'Sprint\nplanning', x: 240, y: 48, w: 126, h: 62, fill: 'yellow' },
						{ id: 's', label: 'Two-week\nsprint', x: 400, y: 48, w: 126, h: 62, fill: 'mint' },
						{ id: 'r', label: 'Review\nwith users', x: 400, y: 150, w: 126, h: 62, fill: 'pink' },
						{ id: 'q', label: 'Retro', x: 240, y: 150, w: 126, h: 62, fill: 'pink' }
					],
					edges: [
						{ from: 'b', to: 'p' },
						{ from: 'p', to: 's' },
						{ from: 's', to: 'r' },
						{ from: 'r', to: 'q' },
						{ from: 'q', to: 'b', dashed: true }
					],
					steps: [
						{ say: 'The Product Owner keeps the backlog in priority order.', light: ['b'] },
						{
							say: 'The team picks what it can finish this sprint.',
							send: [['b', 'p']],
							light: ['p']
						},
						{
							say: 'They build it, with a 15 minute daily scrum to stay in step.',
							send: [['p', 's']],
							light: ['s']
						},
						{
							say: 'The review shows working software to the people who asked for it.',
							send: [['s', 'r']],
							light: ['r']
						},
						{
							say: 'The retro asks how the team worked, and the next sprint begins.',
							send: [
								['r', 'q'],
								['q', 'b']
							],
							light: ['q']
						}
					]
				}
			},
			{
				id: 'kanban',
				title: 'Kanban and tracking work',
				summary:
					'Kanban makes work visible on a board and limits how much is in progress at once. Finishing things beats starting things. Tools such as Jira, Trello and GitHub Projects all work this way.',
				points: [
					['Board', 'a column for each stage of the work.'],
					['WIP limit', 'a cap on items in a column, which exposes bottlenecks.'],
					['Pull, not push', 'take new work only when there is room.'],
					['Cycle time', 'how long an item takes from start to done.']
				],
				tip: 'Stop starting and start finishing. Ten half-done items deliver nothing.',
				sketch: {
					kind: 'Kanban board',
					alt: 'A card moves from To do through Doing and Review to Done. A work-in-progress limit stops a new card starting until there is room.',
					h: 165,
					nodes: [
						{ id: 't', label: 'To do\n3 cards', x: 50, y: 80, w: 80, h: 90, fill: 'sky' },
						{ id: 'd', label: 'Doing\n1 card', x: 175, y: 80, w: 80, h: 90, fill: 'yellow' },
						{ id: 'r', label: 'Review\n0 cards', x: 300, y: 80, w: 80, h: 90, fill: 'pink' },
						{ id: 'f', label: 'Done\n0 cards', x: 425, y: 80, w: 80, h: 90, fill: 'mint' }
					],
					edges: [
						{ from: 't', to: 'd' },
						{ from: 'd', to: 'r' },
						{ from: 'r', to: 'f' }
					],
					steps: [
						{
							say: 'You pull a card into Doing. The limit here is 2.',
							send: [['t', 'd']],
							set: { t: 'To do\n2 cards', d: 'Doing\n2 cards' },
							light: ['d']
						},
						{
							say: 'A third card tries to start, but the column is full.',
							set: { t: 'To do\n2 cards', d: 'Doing\nlimit: 2' },
							down: ['t']
						},
						{
							say: 'So you finish first. A card moves on to Review.',
							send: [['d', 'r']],
							set: { t: 'To do\n2 cards', d: 'Doing\n1 card', r: 'Review\n1 card' }
						},
						{
							say: 'It passes review and reaches Done.',
							send: [['r', 'f']],
							set: { t: 'To do\n2 cards', d: 'Doing\n1 card', f: 'Done\n1 card' },
							light: ['f']
						},
						{
							say: 'Now there is room, so the next card can start.',
							send: [['t', 'd']],
							set: { t: 'To do\n1 card', d: 'Doing\n2 cards', f: 'Done\n1 card' }
						}
					]
				}
			},
			{
				id: 'toolchain',
				title: 'The team toolchain',
				summary:
					'Modern teams connect their tools so that work flows from a ticket to merged code with little manual effort, and every change can be traced back to why it was made.',
				points: [
					['Issue tracker', 'each piece of work has a ticket with a clear goal.'],
					['Branch and pull request', 'link code to its ticket and review it.'],
					['Code review', 'catches bugs and spreads knowledge across the team.'],
					['Definition of done', 'an agreed list, such as tested, reviewed and documented.']
				],
				tip: 'Review small pull requests. Nobody reviews 2,000 lines carefully.',
				sketch: {
					kind: 'Process diagram',
					alt: 'A ticket leads to a branch and a pull request, which goes through CI and review, and is merged, which closes the ticket.',
					h: 190,
					nodes: [
						{ id: 't', label: 'Ticket\nSHOP-42', x: 80, y: 48, w: 126, h: 62, fill: 'sky' },
						{ id: 'b', label: 'Branch', x: 240, y: 48, w: 126, h: 62, fill: 'sky' },
						{ id: 'p', label: 'Pull\nrequest', x: 400, y: 48, w: 126, h: 62, fill: 'yellow' },
						{ id: 'c', label: 'CI + code\nreview', x: 400, y: 150, w: 126, h: 62, fill: 'pink' },
						{ id: 'm', label: 'Merged', x: 240, y: 150, w: 126, h: 62, fill: 'mint' }
					],
					edges: [
						{ from: 't', to: 'b' },
						{ from: 'b', to: 'p' },
						{ from: 'p', to: 'c' },
						{ from: 'c', to: 'm' },
						{ from: 'm', to: 't', dashed: true }
					],
					steps: [
						{
							say: 'Everything starts from a ticket that explains why the work matters.',
							light: ['t']
						},
						{
							say: 'The branch name includes the ticket number.',
							send: [['t', 'b']],
							light: ['b']
						},
						{
							say: 'A pull request shows the change to the team.',
							send: [['b', 'p']],
							light: ['p']
						},
						{ say: 'CI tests it, and a teammate reviews it.', send: [['p', 'c']], light: ['c'] },
						{
							say: 'Merging closes the ticket automatically, so the board stays up to date.',
							send: [
								['c', 'm'],
								['m', 't']
							],
							set: { t: 'Ticket\nDone' },
							light: ['m']
						}
					]
				}
			}
		]
	}
];
