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
				links: [
					[
						'SWEBOK Guide',
						'https://www.computer.org/education/bodies-of-knowledge/software-engineering'
					],
					[
						'Software development process',
						'https://en.wikipedia.org/wiki/Software_development_process'
					]
				],
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
				links: [
					[
						'Pro Git: recording changes',
						'https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository'
					],
					[
						'Pro Git: branches',
						'https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell'
					]
				],
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
				links: [
					[
						'The practical test pyramid',
						'https://martinfowler.com/articles/practical-test-pyramid.html'
					],
					['Test-driven development', 'https://martinfowler.com/bliki/TestDrivenDevelopment.html']
				],
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
			},
			{
				id: 'modularity',
				title: 'Modules, coupling and cohesion',
				summary:
					'Large programs are split into modules, so each part can be understood, changed and tested on its own. A good module hides its details behind a small interface that others use.',
				points: [
					['Cohesion', 'how closely the code inside one module belongs together. Aim high.'],
					['Coupling', 'how much modules depend on each other. Aim low.'],
					[
						'Information hiding',
						'keep the details private, so they can change without breaking callers.'
					],
					['Interface', 'the small public part that other modules are allowed to use.']
				],
				tip: 'If one small change forces edits in five files, the modules are too tightly coupled.',
				skip: 'Every change ripples through the whole program, and soon nobody dares to touch it.',
				links: [
					['Coupling', 'https://en.wikipedia.org/wiki/Coupling_(computer_programming)'],
					['Cohesion', 'https://en.wikipedia.org/wiki/Cohesion_(computer_science)']
				],
				sketch: {
					kind: 'Dependency diagram',
					alt: 'Orders calls Payments only through its pay interface, so Payments can change inside. Reports reads the payment internals directly and breaks.',
					h: 200,
					nodes: [
						{ id: 'o', label: 'Orders', x: 75, y: 60, w: 120, h: 62, fill: 'sky' },
						{ id: 'i', label: 'pay()\ninterface', x: 240, y: 60, w: 120, h: 62, fill: 'yellow' },
						{ id: 'p', label: 'Payments\ninternals', x: 405, y: 60, w: 120, h: 62, fill: 'mint' },
						{ id: 'r', label: 'Reports', x: 240, y: 160, w: 120, h: 62, fill: 'pink' }
					],
					edges: [
						{ from: 'o', to: 'i' },
						{ from: 'i', to: 'p' },
						{ from: 'r', to: 'p', label: 'reads tables', dashed: true }
					],
					steps: [
						{
							say: 'Orders only calls pay(). It knows nothing about how paying works inside.',
							send: [['o', 'i']],
							light: ['o']
						},
						{
							say: 'The interface hands the call to the payment code behind it.',
							send: [['i', 'p']],
							light: ['i']
						},
						{
							say: 'The team switches card provider. Only the inside of Payments changes.',
							set: { p: 'Payments\nnew provider' },
							light: ['p']
						},
						{
							say: 'Orders still works, because the interface stayed the same.',
							send: [['o', 'i']],
							set: { p: 'Payments\nnew provider' },
							light: ['o']
						},
						{
							say: 'Reports read the old payment tables directly. That tight coupling breaks.',
							send: [['r', 'p']],
							set: { p: 'Payments\nnew provider' },
							down: ['r']
						}
					]
				}
			},
			{
				id: 'refactoring',
				title: 'Refactoring and technical debt',
				summary:
					'Refactoring improves the structure of code without changing what it does. Done in small steps with the tests running, it pays down technical debt: the extra cost that rushed shortcuts add to every later change.',
				points: [
					[
						'Refactoring',
						'a small change that keeps behaviour the same, such as a rename or an extracted function.'
					],
					['Code smell', 'a hint of a deeper problem: long functions, copied code, unclear names.'],
					[
						'Technical debt',
						'shortcuts that make each later change slower, like interest on a loan.'
					],
					['Safety net', 'run the tests after every step, so you know nothing broke.']
				],
				tip: 'Leave code a little cleaner than you found it. Small, steady clean-ups beat a big rewrite.',
				skip: 'Debt piles up until every new feature takes weeks instead of days.',
				code: `// before: one 80-line function
function checkout(cart) { /* ... */ }

// after: same behaviour, clear steps
function checkout(cart) {
  const total = priceItems(cart);
  chargeCard(cart.user, total);
  sendReceipt(cart.user, total);
}`,
				links: [
					['Refactoring', 'https://refactoring.com/'],
					['Code smell', 'https://martinfowler.com/bliki/CodeSmell.html'],
					['Technical debt', 'https://martinfowler.com/bliki/TechnicalDebt.html']
				],
				sketch: {
					kind: 'Cycle diagram',
					alt: 'A loop: spot a code smell, make one small change, run the tests, and commit. Each turn of the loop lowers the debt.',
					h: 195,
					nodes: [
						{ id: 's', label: 'Code smell', x: 80, y: 48, w: 126, h: 54, fill: 'pink' },
						{ id: 'c', label: 'Small\nchange', x: 240, y: 48, w: 126, h: 54, fill: 'yellow' },
						{ id: 't', label: 'Run tests', x: 400, y: 48, w: 126, h: 54, fill: 'sky' },
						{ id: 'k', label: 'Commit', x: 400, y: 150, w: 126, h: 54, fill: 'mint' },
						{ id: 'd', label: 'Debt: high', x: 160, y: 150, w: 220, h: 44 }
					],
					edges: [
						{ from: 's', to: 'c' },
						{ from: 'c', to: 't' },
						{ from: 't', to: 'k' },
						{ from: 'k', to: 's', dashed: true }
					],
					steps: [
						{
							say: 'An 80-line checkout function is hard to read. That is a code smell.',
							light: ['s']
						},
						{
							say: 'Pull one piece out into its own function. What it does stays the same.',
							send: [['s', 'c']],
							light: ['c']
						},
						{
							say: 'Run the tests. Green means nothing broke.',
							send: [['c', 't']],
							light: ['t']
						},
						{
							say: 'Commit, then go round again with the next small step.',
							send: [
								['t', 'k'],
								['k', 's']
							],
							set: { d: 'Debt: a bit lower' },
							light: ['k']
						},
						{
							say: 'If a test goes red, undo the last small step. That is easier than debugging a big one.',
							set: { t: 'Tests: red', d: 'Debt: a bit lower' },
							down: ['t']
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
				links: [
					['Requirements elicitation', 'https://en.wikipedia.org/wiki/Requirements_elicitation'],
					[
						'SWEBOK Guide',
						'https://www.computer.org/education/bodies-of-knowledge/software-engineering'
					]
				],
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
				links: [
					['User stories', 'https://www.mountaingoatsoftware.com/agile/user-stories'],
					['Given When Then', 'https://martinfowler.com/bliki/GivenWhenThen.html'],
					['MoSCoW method', 'https://en.wikipedia.org/wiki/MoSCoW_method']
				],
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
				links: [
					['Traceability matrix', 'https://en.wikipedia.org/wiki/Traceability_matrix'],
					['Change control', 'https://en.wikipedia.org/wiki/Change_control']
				],
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
			},
			{
				id: 'use-cases',
				title: 'Use cases and scenarios',
				summary:
					'A use case describes, step by step, how an actor uses the system to reach one goal. It covers the normal path and what happens when things go wrong, which is where most missing requirements hide.',
				points: [
					[
						'Actor',
						'a person or outside system that interacts with yours, such as a customer or a bank.'
					],
					['Main success scenario', 'the numbered steps when everything goes right.'],
					[
						'Extensions',
						'branches for errors and choices, numbered from the step they leave, such as 2a.'
					],
					['Use case diagram', 'a UML overview: stick-figure actors linked to ovals, one per goal.']
				],
				tip: 'At every step, ask "what could go wrong here?" Each answer is an extension.',
				code: `Use case: Withdraw cash     Actor: Customer
1. Customer inserts a card and types the PIN.
2. System checks the PIN with the bank.
3. Customer chooses an amount.
4. System gives the cash and returns the card.

2a. PIN is wrong: ask again, at most 3 tries.
3a. Not enough money: offer a lower amount.`,
				links: [
					['Use case', 'https://en.wikipedia.org/wiki/Use_case'],
					['Use case diagram', 'https://en.wikipedia.org/wiki/Use_case_diagram']
				],
				sketch: {
					kind: 'Use case diagram',
					alt: 'A customer uses an ATM to withdraw cash, which includes checking the PIN, with a branch for a wrong PIN. Checking the balance is a separate use case.',
					h: 210,
					nodes: [
						{ id: 'sys', label: 'ATM system', x: 290, y: 105, w: 340, h: 190, shape: 'boundary' },
						{ id: 'c', label: 'Customer', x: 55, y: 80, shape: 'person' },
						{ id: 'w', label: 'Withdraw\ncash', x: 220, y: 75, w: 120, h: 56, fill: 'sky' },
						{ id: 'p', label: 'Check\nPIN', x: 385, y: 75, w: 110, h: 56, fill: 'yellow' },
						{
							id: 'x',
							label: 'Wrong PIN:\ntry again',
							x: 385,
							y: 160,
							w: 110,
							h: 56,
							fill: 'pink'
						},
						{ id: 'b', label: 'Check\nbalance', x: 220, y: 160, w: 120, h: 56, fill: 'sky' }
					],
					edges: [
						{ from: 'c', to: 'w' },
						{ from: 'c', to: 'b' },
						{ from: 'w', to: 'p', label: 'includes', dashed: true },
						{ from: 'p', to: 'x', label: 'if wrong', dashed: true }
					],
					steps: [
						{
							say: 'The customer is an actor. Each box inside the system names one goal.',
							light: ['c']
						},
						{
							say: 'Main path: the customer wants to withdraw cash.',
							send: [['c', 'w']],
							light: ['w']
						},
						{
							say: 'Every withdrawal includes checking the PIN.',
							send: [['w', 'p']],
							light: ['p']
						},
						{
							say: 'Extension 2a: the PIN is wrong. The use case says exactly what happens next.',
							send: [['p', 'x']],
							light: ['x']
						},
						{
							say: 'Checking the balance is a different goal, so it is its own use case.',
							send: [['c', 'b']],
							light: ['b']
						}
					]
				}
			},
			{
				id: 'validation',
				title: 'Validating requirements',
				summary:
					'Validation checks that the written requirements match what people really need, before anyone builds them. Verification asks "are we building it right?" Validation asks "are we building the right thing?"',
				points: [
					[
						'Review',
						'users, developers and testers read the requirements together, hunting for gaps and conflicts.'
					],
					[
						'Inspection',
						'a formal review with set roles, such as a moderator who leads and a reader who walks through each item.'
					],
					['Prototype', 'a clickable mock-up lets users react before any real code exists.'],
					[
						'Acceptance test',
						'written from a requirement now, and run against the finished system later.'
					]
				],
				tip: 'Ask a tester to read each requirement early. If they cannot say how to test it, rewrite it.',
				skip: 'A wrong requirement is found after release, when fixing it costs many times more.',
				links: [
					[
						'Verification and validation',
						'https://en.wikipedia.org/wiki/Verification_and_validation'
					],
					['Software inspection', 'https://en.wikipedia.org/wiki/Software_inspection'],
					['Acceptance testing', 'https://en.wikipedia.org/wiki/Acceptance_testing']
				],
				sketch: {
					kind: 'Process diagram',
					alt: 'A draft spec goes through a review and a prototype shown to users, which find conflicts and a missing need, and comes out as a signed-off spec.',
					h: 195,
					nodes: [
						{ id: 's', label: 'Spec v1', x: 75, y: 50, w: 120, h: 62, fill: 'sky' },
						{ id: 'r', label: 'Review\nmeeting', x: 240, y: 50, w: 120, h: 62, fill: 'yellow' },
						{ id: 'p', label: 'Prototype', x: 405, y: 50, w: 120, h: 62, fill: 'yellow' },
						{ id: 'u', label: 'Users', x: 405, y: 128, shape: 'person' },
						{ id: 'a', label: 'Spec v2', x: 240, y: 150, w: 120, h: 62, fill: 'mint' }
					],
					edges: [
						{ from: 's', to: 'r' },
						{ from: 'r', to: 'p' },
						{ from: 'p', to: 'u' },
						{ from: 'u', to: 'a' }
					],
					steps: [
						{ say: 'The first draft of the requirements is ready.', light: ['s'] },
						{
							say: 'A review finds two requirements that contradict each other.',
							send: [['s', 'r']],
							set: { r: 'Review:\n2 conflicts' },
							light: ['r']
						},
						{
							say: 'Users click through a prototype of the checkout.',
							send: [
								['r', 'p'],
								['p', 'u']
							],
							set: { r: 'Review:\n2 conflicts' },
							light: ['u']
						},
						{
							say: 'They expected to pay as a guest. Nobody had written that down.',
							set: { r: 'Review:\n2 conflicts', p: 'Missing:\nguest pay' },
							light: ['p']
						},
						{
							say: 'The fixed spec is signed off, with an acceptance test for each requirement.',
							send: [['u', 'a']],
							set: { a: 'Spec v2\nsigned off' },
							light: ['a']
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
				links: [
					[
						'MDN: How the web works',
						'https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works'
					],
					[
						'MDN: Using the Fetch API',
						'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch'
					]
				],
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
					[
						'Hashing',
						'use Argon2id, or bcrypt on older systems. Both are built to be slow to attack.'
					],
					['Session cookie', 'the server remembers you, and the browser holds an ID.'],
					['JWT', "a signed token that carries the user's details. Hard to revoke early."],
					['Cookie flags', 'HttpOnly, Secure and SameSite block common attacks.']
				],
				tip: 'Use a well-tested auth library. Writing your own is one of the riskiest things you can do.',
				links: [
					[
						'OWASP: password storage',
						'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html'
					],
					[
						'OWASP: session management',
						'https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html'
					],
					['MDN: HTTP cookies', 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies']
				],
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
				links: [
					['Rendering on the web', 'https://web.dev/articles/rendering-on-the-web'],
					['SvelteKit page options', 'https://svelte.dev/docs/kit/page-options']
				],
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
			},
			{
				id: 'rest-api',
				title: 'HTTP APIs and REST',
				summary:
					'The front end and the back end talk over HTTP. A REST-style API gives each resource its own URL and uses the standard HTTP methods to act on it, so any client already knows how to use it.',
				points: [
					['Resource', 'a thing with its own URL, such as /orders/42.'],
					['Methods', 'GET reads, POST creates, PUT replaces, PATCH edits, DELETE removes.'],
					['Status codes', '2xx it worked, 4xx the client made a mistake, 5xx the server failed.'],
					['Stateless', 'each request carries all it needs, so any server can answer it.'],
					[
						'Idempotent',
						'sending it twice has the same effect as once. GET, PUT and DELETE are; POST is not.'
					]
				],
				tip: 'Return the right status code. A 200 with an error message inside fools every client that trusts the code.',
				table: {
					head: ['Request', 'Does', 'Success reply'],
					rows: [
						['GET /orders', 'List orders', '200 OK'],
						['POST /orders', 'Create one', '201 Created'],
						['PATCH /orders/42', 'Change one', '200 OK'],
						['DELETE /orders/42', 'Remove one', '204 No Content']
					]
				},
				links: [
					[
						'MDN: HTTP request methods',
						'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods'
					],
					[
						'MDN: HTTP status codes',
						'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status'
					],
					['MDN: REST', 'https://developer.mozilla.org/en-US/docs/Glossary/REST']
				],
				sketch: {
					kind: 'Sequence diagram',
					alt: 'The browser creates an order with POST and gets 201 Created, then asks for a missing order and gets 404 Not Found.',
					h: 215,
					nodes: [
						{ id: 'b', label: 'Browser', x: 110, y: 24, shape: 'lifeline', fill: 'sky' },
						{ id: 'a', label: 'API', x: 370, y: 24, shape: 'lifeline', fill: 'yellow' },
						{ id: 'b1', label: '', x: 110, y: 70, shape: 'dot' },
						{ id: 'a1', label: '', x: 370, y: 70, shape: 'dot' },
						{ id: 'a2', label: '', x: 370, y: 110, shape: 'dot' },
						{ id: 'b2', label: '', x: 110, y: 110, shape: 'dot' },
						{ id: 'b3', label: '', x: 110, y: 150, shape: 'dot' },
						{ id: 'a3', label: '', x: 370, y: 150, shape: 'dot' },
						{ id: 'a4', label: '', x: 370, y: 190, shape: 'dot' },
						{ id: 'b4', label: '', x: 110, y: 190, shape: 'dot' }
					],
					edges: [
						{ from: 'b1', to: 'a1', label: 'POST /orders' },
						{ from: 'a2', to: 'b2', label: '201 Created' },
						{ from: 'b3', to: 'a3', label: 'GET /orders/99' },
						{ from: 'a4', to: 'b4', label: '404 Not Found' }
					],
					steps: [
						{
							say: 'The browser asks the API to create an order.',
							send: [['b1', 'a1']],
							light: ['b']
						},
						{
							say: "The API saves it and replies 201 Created, with the new order's URL.",
							send: [['a2', 'b2']],
							light: ['a']
						},
						{
							say: 'Later, it asks for order 99, which does not exist.',
							send: [['b3', 'a3']],
							light: ['b']
						},
						{
							say: 'The API replies 404. The code alone tells the client what went wrong.',
							send: [['a4', 'b4']],
							light: ['a']
						}
					]
				}
			},
			{
				id: 'web-security',
				title: 'Common web attacks',
				summary:
					'Many web attacks trick an app into treating user input as code. Injection, cross-site scripting and cross-site request forgery are old and well understood, yet still common. The fixes are standard, and good frameworks build them in.',
				points: [
					[
						'SQL injection',
						'input is pasted into a query and changes its meaning. Fix: parameterised queries.'
					],
					[
						'Cross-site scripting (XSS)',
						"input is shown as HTML and runs as script in other users' browsers. Fix: escape output."
					],
					[
						'CSRF',
						'another site makes your browser send a request with your cookie. Fix: CSRF tokens and SameSite cookies.'
					],
					[
						'Least privilege',
						"give the app's database account only the rights it needs, to limit the damage."
					]
				],
				tip: 'Never build SQL or HTML by gluing strings to user input. Let the library do it.',
				code: `// unsafe: the input becomes part of the SQL
db.query("SELECT * FROM users WHERE name = '" + name + "'");

// safe: the input is sent separately, as data
db.query('SELECT * FROM users WHERE name = $1', [name]);`,
				links: [
					[
						'OWASP: SQL injection prevention',
						'https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html'
					],
					[
						'MDN: Cross-site scripting',
						'https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS'
					],
					['MDN: CSRF', 'https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/CSRF']
				],
				sketch: {
					kind: 'Attack diagram',
					alt: 'An attacker types SQL into a login form. The API glues it into a query and the database leaks every user. With a parameterised query, the same input matches nothing.',
					h: 190,
					nodes: [
						{ id: 'atk', label: 'Attacker', x: 45, y: 62, shape: 'person' },
						{ id: 'f', label: 'Login\nform', x: 165, y: 62, w: 110, h: 60, fill: 'sky' },
						{ id: 'api', label: 'API', x: 295, y: 62, w: 90, h: 60, fill: 'yellow' },
						{
							id: 'db',
							label: 'Users\ntable',
							x: 420,
							y: 62,
							w: 90,
							h: 76,
							shape: 'db',
							fill: 'mint'
						},
						{ id: 'msg', label: 'A normal login form', x: 240, y: 160, w: 440, h: 40 }
					],
					edges: [
						{ from: 'atk', to: 'f' },
						{ from: 'f', to: 'api' },
						{ from: 'api', to: 'db' }
					],
					steps: [
						{
							say: 'An attacker types a name with a quote in it, followed by some SQL.',
							send: [['atk', 'f']],
							set: { msg: "name: ' OR '1'='1" },
							light: ['f']
						},
						{
							say: 'The API glues the input straight into its query string.',
							send: [['f', 'api']],
							set: { msg: "WHERE name = '' OR '1'='1'" },
							light: ['api']
						},
						{
							say: 'The condition is now always true, so the database returns every user.',
							send: [['api', 'db']],
							set: { msg: "WHERE name = '' OR '1'='1'", db: 'All users\nleaked' },
							down: ['db']
						},
						{
							say: 'The fix: send the input as a parameter. The database treats it as plain data.',
							send: [['api', 'db']],
							set: { msg: 'WHERE name = $1' },
							light: ['api']
						},
						{
							say: 'No user has that odd name, so nothing comes back.',
							set: { msg: 'WHERE name = $1', db: 'No match' },
							light: ['db']
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
				links: [['The Scrum Guide', 'https://scrumguides.org/scrum-guide.html']],
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
				links: [['The Kanban Guide', 'https://kanbanguides.org/english/']],
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
				links: [
					[
						'GitHub: about pull requests',
						'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests'
					],
					[
						'GitHub: linking a PR to an issue',
						'https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue'
					]
				],
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
			},
			{
				id: 'estimation',
				title: 'Estimating work',
				summary:
					'Teams estimate to plan, not to make promises. Many agile teams size items against each other in story points, then use their past pace, called velocity, to see how much fits in a sprint.',
				points: [
					[
						'Story points',
						'a relative size that blends effort, complexity and risk. An 8 is about four times a 2.'
					],
					[
						'Planning poker',
						'everyone picks a card in secret, then all show at once, so nobody sways the others.'
					],
					[
						'Velocity',
						'the points a team finishes per sprint, averaged over the last few sprints.'
					],
					[
						'Cone of uncertainty',
						'early estimates can be wrong by several times. They narrow as the team learns.'
					]
				],
				tip: 'When estimates differ widely, talk before you average. The gap usually hides a missed detail.',
				skip: 'The team commits to more than it can finish, and every sprint ends late.',
				links: [
					['Planning poker', 'https://www.mountaingoatsoftware.com/agile/planning-poker'],
					['Planning poker (Wikipedia)', 'https://en.wikipedia.org/wiki/Planning_poker'],
					['Velocity', 'https://en.wikipedia.org/wiki/Velocity_(software_development)']
				],
				sketch: {
					kind: 'Planning poker',
					alt: 'Three developers vote 3, 3 and 13 on a story. The outlier explains a hidden detail, they agree on 8, and it fits within the team velocity.',
					h: 215,
					nodes: [
						{ id: 's', label: 'Story:\nexport CSV', x: 240, y: 38, w: 170, h: 56, fill: 'yellow' },
						{ id: 'a', label: 'Ana: ?', x: 100, y: 120, w: 100, h: 52, fill: 'sky' },
						{ id: 'b', label: 'Ben: ?', x: 240, y: 120, w: 100, h: 52, fill: 'sky' },
						{ id: 'c', label: 'Cam: ?', x: 380, y: 120, w: 100, h: 52, fill: 'sky' },
						{ id: 'v', label: 'Velocity: about 20', x: 240, y: 186, w: 300, h: 40, fill: 'mint' }
					],
					edges: [
						{ from: 's', to: 'a' },
						{ from: 's', to: 'b' },
						{ from: 's', to: 'c' }
					],
					steps: [
						{
							say: 'The team sizes one story. Each person picks a card in secret.',
							light: ['s']
						},
						{
							say: 'All cards are shown at once: 3, 3 and 13.',
							set: { a: 'Ana: 3', b: 'Ben: 3', c: 'Cam: 13' },
							light: ['c']
						},
						{
							say: 'Cam explains: the export must handle a million rows. Nobody else had thought of that.',
							send: [['c', 's']],
							set: { a: 'Ana: 3', b: 'Ben: 3', c: 'Cam: 13', s: 'Story:\n1M rows!' },
							light: ['s']
						},
						{
							say: 'They vote again and agree on 8.',
							send: [
								['s', 'a'],
								['s', 'b'],
								['s', 'c']
							],
							set: { a: 'Ana: 8', b: 'Ben: 8', c: 'Cam: 8', s: 'Story:\n8 points' }
						},
						{
							say: 'The team usually finishes about 20 points a sprint, so this story fits.',
							set: {
								a: 'Ana: 8',
								b: 'Ben: 8',
								c: 'Cam: 8',
								s: 'Story:\n8 points',
								v: '8 of 20 points used'
							},
							light: ['v']
						}
					]
				}
			},
			{
				id: 'risk',
				title: 'Managing risk',
				summary:
					'A risk is something that has not gone wrong yet but might. Teams list risks early, rate each one by how likely it is and how much it would hurt, and deal with the biggest first.',
				points: [
					['Risk register', 'a list of risks, each with a score, an owner and a plan.'],
					['Exposure', 'likelihood times impact. It ranks which risks deserve attention.'],
					['Responses', 'avoid it, reduce it, transfer it to someone else, or accept it.'],
					['Contingency', 'a ready plan B for the day a risk actually happens.']
				],
				tip: 'Tackle the riskiest, least understood part first, while there is still time to change course.',
				skip: 'Risks nobody listed turn into surprises, and they arrive when there is no time or money left.',
				table: {
					head: ['Risk', 'Likely', 'Impact', 'Response'],
					rows: [
						['Key developer leaves', 'Low', 'High', 'Pair up, share knowledge'],
						['Payment API is late', 'Medium', 'High', 'Test against a fake'],
						['New framework too slow', 'Medium', 'Medium', 'Prototype it in week 1']
					]
				},
				links: [
					['Risk register', 'https://en.wikipedia.org/wiki/Risk_register'],
					['Risk matrix', 'https://en.wikipedia.org/wiki/Risk_matrix'],
					['Risk management', 'https://en.wikipedia.org/wiki/Risk_management']
				],
				sketch: {
					kind: 'Process diagram',
					alt: 'A risk is identified, scored, given a plan and an owner who watches it weekly, until it is closed.',
					h: 195,
					nodes: [
						{
							id: 'i',
							label: 'Payment API\nmay be late',
							x: 80,
							y: 48,
							w: 126,
							h: 62,
							fill: 'pink'
						},
						{ id: 's', label: 'Score:\n?', x: 240, y: 48, w: 126, h: 62, fill: 'yellow' },
						{ id: 'p', label: 'Plan:\n?', x: 400, y: 48, w: 126, h: 62, fill: 'sky' },
						{ id: 'w', label: 'Owner checks\nweekly', x: 400, y: 150, w: 126, h: 62, fill: 'mint' }
					],
					edges: [
						{ from: 'i', to: 's' },
						{ from: 's', to: 'p' },
						{ from: 'p', to: 'w' },
						{ from: 'w', to: 's', dashed: true }
					],
					steps: [
						{
							say: 'At the start, the team lists what could go wrong. One item: the payment API may arrive late.',
							light: ['i']
						},
						{
							say: 'Rate it: quite likely, and it would block checkout. High exposure, so it goes to the top.',
							send: [['i', 's']],
							set: { s: 'Score:\nhigh' },
							light: ['s']
						},
						{
							say: 'Plan to reduce it: build a fake payment API and test against that.',
							send: [['s', 'p']],
							set: { s: 'Score:\nhigh', p: 'Plan:\nbuild a fake' },
							light: ['p']
						},
						{
							say: 'One person owns the risk and checks on it every week.',
							send: [['p', 'w']],
							set: { s: 'Score:\nhigh', p: 'Plan:\nbuild a fake' },
							light: ['w']
						},
						{
							say: 'The real API arrives on time. The risk is closed, and attention moves to the next one.',
							send: [['w', 's']],
							set: { s: 'Score:\nclosed', p: 'Plan:\nbuild a fake' },
							down: ['i']
						}
					]
				}
			}
		]
	}
];
