import type { Topic } from './sketch';

export const databases: Topic[] = [
	{
		id: 'relational',
		part: 'Modelling data',
		title: 'Tables, keys and relationships',
		summary:
			'A relational database stores data in tables of rows and columns. Keys connect the tables, so each fact lives in one place and queries join them back together.',
		points: [
			['Primary key', 'a column that uniquely identifies each row.'],
			[
				'Foreign key',
				'a column that points at a row in another table. The database can reject values with no match.'
			],
			['One-to-many', 'one customer has many orders, so orders hold the customer id.'],
			['Many-to-many', 'students and courses, which need a join table in the middle.']
		],
		tip: 'Let the database enforce the rules. Constraints catch the bugs your application code will miss.',
		code: `SELECT c.name, COUNT(o.id) AS orders
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
GROUP BY c.id, c.name;`,
		links: [
			['PostgreSQL: constraints', 'https://www.postgresql.org/docs/current/ddl-constraints.html'],
			[
				'PostgreSQL: joins between tables',
				'https://www.postgresql.org/docs/current/tutorial-join.html'
			]
		],
		sketch: {
			kind: 'Entity relationship diagram',
			steps: [
				{ say: 'Each customer lives in one row, in one table.', light: ['cust'] },
				{
					say: 'Every order stores the id of its customer in customer_id.',
					send: [['ord', 'cust']],
					light: ['ord']
				},
				{
					say: 'A JOIN follows that key and brings both tables back together.',
					send: [['cust', 'ord']],
					light: ['cust', 'ord']
				},
				{
					say: 'Try to save an order for customer 99, who does not exist. The foreign key rejects it.',
					set: { ord: 'orders\ncustomer_id = 99\nrejected' },
					down: ['ord'],
					send: [['ord', 'cust']]
				}
			],
			alt: 'The orders table has a customer_id foreign key pointing at the customers table. One customer has many orders.',
			h: 170,
			nodes: [
				{
					id: 'cust',
					label: 'customers\nid (PK)\nname\nemail',
					x: 100,
					y: 85,
					w: 150,
					h: 112,
					fill: 'sky'
				},
				{
					id: 'ord',
					label: 'orders\nid (PK)\ncustomer_id (FK)\ntotal',
					x: 375,
					y: 85,
					w: 170,
					h: 112,
					fill: 'mint'
				}
			],
			edges: [{ from: 'ord', to: 'cust', label: 'many to one' }]
		}
	},
	{
		id: 'normalization',
		title: 'Normalization',
		summary:
			"Normalization organises tables so each fact is stored once. That prevents anomalies like changing a customer's email in one row and missing the other twenty.",
		points: [
			['1NF', 'each cell holds one value, with no lists or repeating groups.'],
			[
				'2NF',
				'every non-key column depends on the whole primary key, not part of a composite key.'
			],
			['3NF', 'non-key columns depend only on the key, not on each other.'],
			[
				'Denormalization',
				'copying data on purpose to speed up reads. Fair enough once you have measured a need and accept keeping the copies in sync.'
			]
		],
		tip: 'Every column should depend on the key, the whole key, and nothing but the key.',
		links: [['Database normalization', 'https://en.wikipedia.org/wiki/Database_normalization']],
		sketch: {
			kind: 'Schema diagram',
			steps: [
				{
					say: 'One table repeats the customer on every single order.',
					hide: ['cust', 'ord'],
					light: ['before']
				},
				{
					say: 'Changing one email means updating many rows. Miss one, and the data disagrees with itself.',
					hide: ['cust', 'ord'],
					set: { before: 'orders\nann@old.com, ann@new.com, ann@old.com' },
					down: ['before']
				},
				{
					say: 'Split the customer details into their own table.',
					hide: ['ord'],
					send: [['before', 'cust']],
					light: ['cust']
				},
				{ say: 'Orders keep only a customer_id.', send: [['before', 'ord']], light: ['ord'] },
				{
					say: 'Each fact now lives in one row, so one update fixes it everywhere.',
					hide: ['before'],
					light: ['cust']
				}
			],
			alt: 'A single orders table that repeats customer details gets split into a customers table and an orders table that references it.',
			h: 215,
			nodes: [
				{
					id: 'before',
					label: 'orders\nid, item, customer_name, customer_email',
					x: 240,
					y: 38,
					w: 390,
					h: 64,
					fill: 'pink'
				},
				{
					id: 'cust',
					label: 'customers\nid, name, email',
					x: 115,
					y: 170,
					w: 190,
					h: 68,
					fill: 'mint'
				},
				{
					id: 'ord',
					label: 'orders\nid, item, customer_id',
					x: 365,
					y: 170,
					w: 200,
					h: 68,
					fill: 'mint'
				}
			],
			edges: [
				{ from: 'before', to: 'cust', label: 'split' },
				{ from: 'before', to: 'ord', label: 'split' }
			]
		}
	},
	{
		id: 'transactions',
		part: 'Keeping data correct',
		title: 'Transactions and ACID',
		summary:
			'A transaction groups several steps into one unit that either fully happens or never happened. Moving money is the classic example: the debit and the credit must succeed together.',
		points: [
			['Atomicity', 'all the steps commit, or all of them roll back.'],
			['Consistency', 'constraints that held before the transaction still hold after it.'],
			[
				'Isolation',
				'concurrent transactions do not trip over each other, to the degree the isolation level promises.'
			],
			[
				'Durability',
				'once committed, the data survives a crash, usually thanks to a write-ahead log.'
			]
		],
		tip: 'Keep transactions short. A long one holds locks or old row versions, and everyone else waits or pays for it.',
		code: `BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;`,
		links: [
			[
				'PostgreSQL: transactions',
				'https://www.postgresql.org/docs/current/tutorial-transactions.html'
			],
			['PostgreSQL: write-ahead logging', 'https://www.postgresql.org/docs/current/wal-intro.html']
		],
		sketch: {
			kind: 'Flowchart',
			steps: [
				{
					say: 'BEGIN opens the transaction. Nothing is final yet.',
					hide: ['roll'],
					light: ['begin']
				},
				{
					say: 'Take 100 from account 1.',
					hide: ['roll'],
					send: [['begin', 'debit']],
					light: ['debit']
				},
				{
					say: 'Add 100 to account 2.',
					hide: ['roll'],
					send: [['debit', 'credit']],
					light: ['credit']
				},
				{
					say: 'Both steps worked, so COMMIT makes them permanent together.',
					hide: ['roll'],
					send: [['credit', 'commit']],
					light: ['commit']
				},
				{
					say: 'Now replay it, but the credit fails halfway through.',
					send: [['debit', 'credit']],
					down: ['credit', 'commit']
				},
				{
					say: 'ROLLBACK undoes the debit, as if nothing had happened. No money vanishes.',
					send: [['credit', 'roll']],
					down: ['credit', 'commit'],
					light: ['roll']
				}
			],
			alt: 'A transaction runs begin, debit account one, credit account two, commit. An error in either step leads to rollback.',
			h: 175,
			nodes: [
				{ id: 'begin', label: 'BEGIN', x: 42, y: 45, w: 72, h: 46, fill: 'sky' },
				{ id: 'debit', label: 'Debit\naccount 1', x: 170, y: 45, w: 96, h: 60 },
				{ id: 'credit', label: 'Credit\naccount 2', x: 305, y: 45, w: 96, h: 60 },
				{ id: 'commit', label: 'COMMIT', x: 430, y: 45, w: 80, h: 46, fill: 'mint' },
				{ id: 'roll', label: 'ROLLBACK', x: 238, y: 145, w: 120, h: 46, fill: 'pink' }
			],
			edges: [
				{ from: 'begin', to: 'debit' },
				{ from: 'debit', to: 'credit' },
				{ from: 'credit', to: 'commit' },
				{ from: 'debit', to: 'roll', dashed: true },
				{ from: 'credit', to: 'roll', dashed: true }
			]
		}
	},
	{
		id: 'isolation',
		title: 'Isolation levels',
		summary:
			'Stronger isolation gives you fewer surprises but allows less concurrency. The SQL standard defines each level by the anomalies it rules out.',
		points: [
			['Dirty read', "you see another transaction's uncommitted change."],
			['Non-repeatable read', 'reading the same row twice gives different values.'],
			['Phantom read', 'running the same query twice returns new rows.'],
			[
				'Real engines differ',
				'PostgreSQL defaults to read committed and MySQL InnoDB to repeatable read, and each can be stricter than the standard requires.'
			]
		],
		tip: "Check your database's default level and what it actually guarantees. Do not assume the textbook table.",
		links: [
			[
				'PostgreSQL: transaction isolation',
				'https://www.postgresql.org/docs/current/transaction-iso.html'
			],
			[
				'MySQL: InnoDB isolation levels',
				'https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html'
			]
		],
		sketch: {
			kind: 'Sequence diagram',
			alt: 'Transaction 1 reads a row as 100. Transaction 2 changes it to 200 and commits. Transaction 1 reads again and sees 200.',
			h: 215,
			nodes: [
				{ id: 't1', label: 'Transaction 1', x: 85, y: 24, w: 130, shape: 'lifeline', fill: 'sky' },
				{ id: 'row', label: 'Row', x: 245, y: 24, w: 100, shape: 'lifeline', fill: 'yellow' },
				{
					id: 't2',
					label: 'Transaction 2',
					x: 395,
					y: 24,
					w: 130,
					shape: 'lifeline',
					fill: 'mint'
				},
				{ id: 'a1', label: '', x: 85, y: 80, shape: 'dot' },
				{ id: 'b1', label: '', x: 245, y: 80, shape: 'dot' },
				{ id: 'c2', label: '', x: 395, y: 125, shape: 'dot' },
				{ id: 'b2', label: '', x: 245, y: 125, shape: 'dot' },
				{ id: 'a3', label: '', x: 85, y: 175, shape: 'dot' },
				{ id: 'b3', label: '', x: 245, y: 175, shape: 'dot' }
			],
			edges: [
				{ from: 'a1', to: 'b1', label: 'read: 100' },
				{ from: 'c2', to: 'b2', label: 'write: 200' },
				{ from: 'a3', to: 'b3', label: 'read: 200' }
			],
			steps: [
				{
					say: 'Transaction 1 reads the row and sees 100.',
					hide: ['c2', 'b2', 'a3', 'b3'],
					send: [['a1', 'b1']],
					light: ['t1']
				},
				{
					say: 'Transaction 2 changes it to 200 and commits.',
					hide: ['a3', 'b3'],
					send: [['c2', 'b2']],
					light: ['t2']
				},
				{
					say: 'Transaction 1 reads the same row again and gets 200. That is a non-repeatable read.',
					send: [['a3', 'b3']],
					light: ['t1']
				},
				{
					say: 'At repeatable read, Transaction 1 would keep seeing 100 until it finishes.',
					set: { t1: 'still sees 100' },
					light: ['t1']
				}
			]
		},
		table: {
			head: ['Level', 'Dirty', 'Non-repeatable', 'Phantom'],
			rows: [
				['Read uncommitted', 'possible', 'possible', 'possible'],
				['Read committed', 'no', 'possible', 'possible'],
				['Repeatable read', 'no', 'no', 'possible'],
				['Serializable', 'no', 'no', 'no']
			]
		}
	},
	{
		id: 'mvcc',
		title: 'Locks and MVCC',
		summary:
			'Two transactions touching the same data must not corrupt it. Locks make one wait for the other. MVCC, multi-version concurrency control, keeps old versions of each row, so readers see a stable snapshot and never wait for writers.',
		points: [
			[
				'Row versions',
				'an UPDATE writes a new version of the row. The old one stays until no transaction can still see it.'
			],
			[
				'Snapshot',
				'a query reads only the row versions that were committed when its snapshot was taken.'
			],
			[
				'Writers still lock',
				'two updates to the same row queue up. SELECT ... FOR UPDATE takes that row lock early.'
			],
			[
				'Deadlock',
				'two transactions each wait for the other. PostgreSQL detects it and aborts one, so be ready to retry.'
			],
			[
				'VACUUM',
				'removes old row versions that nobody can see any more. Autovacuum does it in the background.'
			]
		],
		tip: 'Lock rows in the same order everywhere, and most deadlocks never happen.',
		code: `BEGIN;
SELECT balance FROM accounts WHERE id = 1 FOR UPDATE;  -- lock the row
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
COMMIT;                                                -- lock released`,
		links: [
			['PostgreSQL: MVCC introduction', 'https://www.postgresql.org/docs/current/mvcc-intro.html'],
			[
				'PostgreSQL: explicit locking',
				'https://www.postgresql.org/docs/current/explicit-locking.html'
			],
			[
				'PostgreSQL: routine vacuuming',
				'https://www.postgresql.org/docs/current/routine-vacuuming.html'
			]
		],
		sketch: {
			kind: 'Concurrency diagram',
			alt: 'A writer creates a new version of a row while a reader keeps reading the old version from its snapshot. A second writer waits for the row lock, and VACUUM later removes the old version.',
			h: 190,
			nodes: [
				{ id: 'r', label: 'Reader\nsnapshot', x: 70, y: 45, w: 120, h: 60, fill: 'sky' },
				{ id: 'w', label: 'Writer 1', x: 70, y: 150, w: 120, h: 60, fill: 'mint' },
				{ id: 'v1', label: 'Row v1\nbalance 100', x: 270, y: 45, w: 130, h: 60, fill: 'yellow' },
				{ id: 'v2', label: 'Row v2\nbalance 50', x: 270, y: 150, w: 130, h: 60, fill: 'pink' },
				{ id: 'w2', label: 'Writer 2', x: 425, y: 150, w: 100, h: 60, fill: 'mint' }
			],
			edges: [
				{ from: 'r', to: 'v1', label: 'reads' },
				{ from: 'w', to: 'v2', label: 'writes' },
				{ from: 'w2', to: 'v2', dashed: true }
			],
			steps: [
				{
					say: 'Version 1 of the row says the balance is 100.',
					hide: ['v2', 'w2'],
					light: ['v1']
				},
				{
					say: 'Writer 1 updates it to 50. That creates version 2, not yet committed.',
					hide: ['w2'],
					send: [['w', 'v2']],
					light: ['v2']
				},
				{
					say: 'A reader at the same moment is not blocked. Its snapshot still shows version 1.',
					hide: ['w2'],
					send: [['r', 'v1']],
					light: ['r']
				},
				{
					say: 'Writer 2 wants the same row. Writers do lock, so it waits for Writer 1 to commit.',
					send: [['w2', 'v2']],
					set: { w2: 'Writer 2\nwaiting' },
					light: ['w2']
				},
				{
					say: 'Writer 1 commits and Writer 2 goes ahead. Once no snapshot needs version 1, VACUUM removes it.',
					set: { w2: 'Writer 2\nruns' },
					down: ['v1']
				}
			]
		}
	},
	{
		id: 'backups',
		title: 'Backups and point-in-time recovery',
		summary:
			'Replication copies a mistake as fast as it copies good data. A backup lets you go back. With a base backup plus an archive of the write-ahead log, PostgreSQL can replay history up to any moment you choose.',
		points: [
			[
				'Logical dump',
				'pg_dump writes out one database as SQL or an archive. Simple and portable, but it restores only to the moment it ran.'
			],
			['Base backup', 'pg_basebackup copies the whole cluster while it keeps running.'],
			[
				'WAL archive',
				'with archive_mode on, archive_command copies every finished WAL file somewhere safe.'
			],
			[
				'Point in time',
				'restore the base backup, then replay WAL up to recovery_target_time, just before the mistake.'
			],
			['Test restores', 'a backup you have never restored is only a hope.']
		],
		tip: 'Time a full restore. That number, not the backup schedule, decides how long you are down.',
		skip: 'With only a nightly dump, a bad DELETE in the afternoon costs you every change since the night before.',
		code: `# postgresql.conf
archive_mode = on
archive_command = 'test ! -f /backup/wal/%f && cp %p /backup/wal/%f'

# to recover: restore the base backup, then set
restore_command = 'cp /backup/wal/%f %p'
recovery_target_time = '2026-11-15 14:59:00'
# create an empty recovery.signal file and start the server`,
		links: [
			[
				'PostgreSQL: continuous archiving and PITR',
				'https://www.postgresql.org/docs/current/continuous-archiving.html'
			],
			['PostgreSQL: backup and restore', 'https://www.postgresql.org/docs/current/backup.html']
		],
		sketch: {
			kind: 'Timeline',
			alt: 'A base backup at 02:00 and an archive of every WAL file let a new server be restored and replayed up to 14:59, one minute before a bad DELETE at 15:00.',
			h: 205,
			nodes: [
				{ id: 'bb', label: 'Base backup\n02:00', x: 70, y: 50, w: 120, h: 60, fill: 'sky' },
				{
					id: 'wal',
					label: 'WAL archive\n02:00 to now',
					x: 240,
					y: 50,
					w: 140,
					h: 60,
					fill: 'yellow'
				},
				{ id: 'bad', label: 'DELETE oops\n15:00', x: 405, y: 50, w: 130, h: 60, fill: 'pink' },
				{
					id: 'db',
					label: 'Restored\ndatabase',
					x: 240,
					y: 160,
					w: 120,
					h: 70,
					shape: 'db',
					fill: 'mint'
				}
			],
			edges: [
				{ from: 'bb', to: 'wal', plain: true },
				{ from: 'wal', to: 'bad', plain: true },
				{ from: 'bb', to: 'db', label: 'restore' },
				{ from: 'wal', to: 'db', label: 'replay' }
			],
			steps: [
				{
					say: 'At 02:00 a base backup copies the whole database.',
					hide: ['db'],
					light: ['bb']
				},
				{
					say: 'All day long, every finished WAL file is copied to the archive.',
					hide: ['db'],
					send: [['bb', 'wal']],
					light: ['wal']
				},
				{
					say: 'At 15:00 someone runs DELETE without a WHERE. The replicas copy it at once.',
					hide: ['db'],
					send: [['wal', 'bad']],
					light: ['bad']
				},
				{
					say: 'Restore the base backup onto a fresh server.',
					send: [['bb', 'db']],
					set: { db: 'Restored\n02:00' },
					light: ['db']
				},
				{
					say: 'Replay the WAL up to 14:59, one minute before the mistake, and stop there.',
					send: [['wal', 'db']],
					set: { db: 'Restored\n14:59' },
					down: ['bad'],
					light: ['db']
				}
			]
		}
	},
	{
		id: 'indexes',
		part: 'Speed and scale',
		title: 'Indexes',
		summary:
			'An index is a sorted lookup structure, like the index at the back of a book. Without one the database scans every row. With one it jumps to the right place.',
		points: [
			['B-tree', 'the usual default. Handles equality, ranges and sorting.'],
			['Hash', 'very fast for equality, no help with ranges.'],
			[
				'Composite',
				'an index on (country, city) helps filters on country or on both, but usually not on city alone.'
			],
			['The cost', 'every index uses disk space and slows down writes.']
		],
		tip: 'Run EXPLAIN on a slow query before adding an index, and again afterwards to prove it gets used.',
		code: `CREATE INDEX idx_orders_customer ON orders (customer_id);`,
		links: [
			['Use The Index, Luke: anatomy of an index', 'https://use-the-index-luke.com/sql/anatomy'],
			['PostgreSQL: index types', 'https://www.postgresql.org/docs/current/indexes-types.html']
		],
		sketch: {
			kind: 'Tree diagram',
			steps: [
				{
					say: 'Find 40. With no index, the database would have to read every row.',
					light: ['root']
				},
				{
					say: 'The root says 40 sits between 30 and 60, so skip everything else.',
					send: [['root', 'b']],
					light: ['b']
				},
				{
					say: 'Found in two hops. A real tree finds one row in millions in just a few.',
					light: ['b'],
					set: { b: '[40]  |  50' }
				},
				{
					say: 'The catch: inserting 45 means this tree must be updated too, which slows down writes.',
					set: { b: '40 | 45 | 50' },
					light: ['b']
				}
			],
			alt: 'A B-tree: the root holds 30 and 60, with child nodes for values below 30, between 30 and 60, and above 60.',
			h: 175,
			nodes: [
				{ id: 'root', label: '30  |  60', x: 240, y: 35, w: 120, h: 46, fill: 'yellow' },
				{ id: 'a', label: '10  |  20', x: 75, y: 140, w: 110, h: 46, fill: 'mint' },
				{ id: 'b', label: '40  |  50', x: 240, y: 140, w: 110, h: 46, fill: 'mint' },
				{ id: 'c', label: '70  |  80', x: 405, y: 140, w: 110, h: 46, fill: 'mint' }
			],
			edges: [
				{ from: 'root', to: 'a', label: 'under 30' },
				{ from: 'root', to: 'b', label: '30 to 60' },
				{ from: 'root', to: 'c', label: 'over 60' }
			]
		}
	},
	{
		id: 'explain',
		title: 'Query plans and EXPLAIN',
		summary:
			'SQL says what you want, not how to get it. The planner chooses how, such as reading the whole table or jumping through an index, using statistics about your data. EXPLAIN shows you the plan it picked.',
		points: [
			['EXPLAIN', 'shows the chosen plan with estimated costs and row counts, without running it.'],
			[
				'EXPLAIN ANALYZE',
				'really runs the query and adds the actual times and rows. Careful with UPDATE and DELETE.'
			],
			[
				'Seq Scan or Index Scan',
				'read every row, or follow an index. When most rows match, the full scan can be cheaper.'
			],
			[
				'Statistics',
				'ANALYZE samples each table. Stale numbers lead to bad plans, so watch for big gaps between estimated and actual rows.'
			]
		],
		tip: 'Wrap EXPLAIN ANALYZE of a write in BEGIN and ROLLBACK, so the test changes nothing.',
		code: `EXPLAIN ANALYZE
SELECT * FROM orders WHERE customer_id = 42;

-- no index:   Seq Scan on orders
-- with index: Index Scan using idx_orders_customer on orders`,
		links: [
			['PostgreSQL: using EXPLAIN', 'https://www.postgresql.org/docs/current/using-explain.html'],
			['Use The Index, Luke: execution plans', 'https://use-the-index-luke.com/sql/explain-plan']
		],
		sketch: {
			kind: 'Query plan',
			alt: 'The planner reads table statistics and compares two plans for a query: a sequential scan with a high estimated cost, and an index scan with a low one. It picks the index scan.',
			h: 200,
			nodes: [
				{ id: 'q', label: 'Query\ncustomer 42', x: 75, y: 50, w: 130, h: 66, fill: 'sky' },
				{ id: 'p', label: 'Planner', x: 240, y: 50, w: 110, h: 66, fill: 'yellow' },
				{ id: 'st', label: 'Statistics', x: 240, y: 150, w: 110, h: 50, fill: 'mint' },
				{ id: 'seq', label: 'Seq Scan\ncost 18000', x: 405, y: 50, w: 130, h: 60, fill: 'pink' },
				{ id: 'idx', label: 'Index Scan\ncost 8', x: 405, y: 150, w: 130, h: 60, fill: 'mint' }
			],
			edges: [
				{ from: 'q', to: 'p' },
				{ from: 'st', to: 'p' },
				{ from: 'p', to: 'seq', dashed: true },
				{ from: 'p', to: 'idx', dashed: true }
			],
			steps: [
				{
					say: 'A query arrives. It says which rows it wants, not how to find them.',
					send: [['q', 'p']],
					light: ['p']
				},
				{
					say: 'The planner checks the statistics: about 12 of a million rows match.',
					send: [['st', 'p']],
					light: ['st']
				},
				{
					say: 'Plan A reads every row in the table. Its estimated cost is high.',
					send: [['p', 'seq']],
					light: ['seq']
				},
				{
					say: 'Plan B follows the index on customer_id. Its estimated cost is tiny.',
					send: [['p', 'idx']],
					light: ['idx'],
					down: ['seq']
				},
				{
					say: 'EXPLAIN shows the winner. EXPLAIN ANALYZE also runs it and reports the real time.',
					set: { idx: 'Index Scan\n0.09 ms' },
					light: ['idx'],
					down: ['seq']
				}
			]
		}
	},
	{
		id: 'pooling',
		title: 'Connection pooling',
		summary:
			'Opening a database connection is slow, and in PostgreSQL each one is a whole server process with its own memory. A pool keeps a few connections open and lends them out, so thousands of requests share a few dozen connections.',
		points: [
			[
				'Cost per connection',
				'PostgreSQL starts a backend process for each one. max_connections is 100 by default.'
			],
			['App-side pool', 'most drivers and frameworks keep a pool inside each app process.'],
			['PgBouncer', 'a separate pooler that many app servers can share.'],
			[
				'Transaction pooling',
				'a connection is lent for one transaction only. Very efficient, but session features such as SET and LISTEN break.'
			],
			[
				'Pool size',
				'more is not faster. Past a point, extra connections only fight over CPU and locks.'
			]
		],
		tip: 'Add up connections across every app instance. Ten servers with a pool of 20 each is already 200.',
		links: [
			['PgBouncer features', 'https://www.pgbouncer.org/features.html'],
			[
				'PostgreSQL: connection settings',
				'https://www.postgresql.org/docs/current/runtime-config-connection.html'
			]
		],
		sketch: {
			kind: 'Deployment diagram',
			alt: 'Three requests share a pool of two open connections to PostgreSQL. The third request waits briefly, then reuses a connection the first one returned.',
			h: 200,
			nodes: [
				{ id: 'a1', label: 'Request 1', x: 60, y: 35, w: 96, h: 46, fill: 'sky' },
				{ id: 'a2', label: 'Request 2', x: 60, y: 100, w: 96, h: 46, fill: 'sky' },
				{ id: 'a3', label: 'Request 3', x: 60, y: 165, w: 96, h: 46, fill: 'sky' },
				{ id: 'pool', label: 'Pool\n2 free', x: 240, y: 100, w: 120, h: 66, fill: 'yellow' },
				{
					id: 'db',
					label: 'PostgreSQL',
					x: 410,
					y: 100,
					w: 110,
					h: 80,
					shape: 'db',
					fill: 'mint'
				}
			],
			edges: [
				{ from: 'a1', to: 'pool' },
				{ from: 'a2', to: 'pool' },
				{ from: 'a3', to: 'pool' },
				{ from: 'pool', to: 'db', label: '2 connections' }
			],
			steps: [
				{
					say: 'The pool holds two open connections to PostgreSQL, ready to lend.',
					light: ['pool']
				},
				{
					say: 'Request 1 borrows one and runs its transaction.',
					send: [
						['a1', 'pool'],
						['pool', 'db']
					],
					set: { pool: 'Pool\n1 free' }
				},
				{
					say: 'Request 2 borrows the other at the same time.',
					send: [
						['a2', 'pool'],
						['pool', 'db']
					],
					set: { pool: 'Pool\n0 free' }
				},
				{
					say: 'Request 3 waits a moment in the queue instead of opening a new connection.',
					send: [['a3', 'pool']],
					set: { pool: 'Pool\n0 free', a3: 'Request 3\nqueued' },
					light: ['a3']
				},
				{
					say: 'Request 1 finishes, and its connection goes straight to request 3. The database still sees only two.',
					send: [['pool', 'db']],
					set: { pool: 'Pool\n0 free', a1: 'Request 1\ndone', a3: 'Request 3\nserved' },
					light: ['db']
				}
			]
		}
	},
	{
		id: 'replication',
		title: 'Replication',
		summary:
			'Replication keeps copies of your data on several servers. You gain availability and read capacity, at the cost of copies that can lag behind.',
		points: [
			['Primary and replicas', 'one node takes writes, the others follow it and serve reads.'],
			['Synchronous', 'the primary waits for a replica to confirm. Safer, slower.'],
			[
				'Asynchronous',
				'the primary confirms straight away. Faster, but a crash can lose the latest writes.'
			],
			[
				'Replication lag',
				'a user may not see their own change on a replica, so read from the primary when it matters.'
			]
		],
		tip: 'Replication protects you from a dead server, not from a bad DELETE. You still need backups.',
		links: [
			[
				'PostgreSQL: standby servers and replication',
				'https://www.postgresql.org/docs/current/warm-standby.html'
			]
		],
		sketch: {
			kind: 'Deployment diagram',
			steps: [
				{ say: 'The app sends every write to the primary.', send: [['app', 'p']], light: ['p'] },
				{
					say: 'The primary copies the change to each replica.',
					send: [
						['p', 'r1'],
						['p', 'r2']
					]
				},
				{
					say: 'Reads go to a replica, which takes load off the primary.',
					send: [['app', 'r2']],
					light: ['r2']
				},
				{ say: 'The primary dies.', down: ['p'] },
				{
					say: 'Replica 1 is promoted and starts taking writes, so the system keeps working.',
					down: ['p'],
					set: { r1: 'New\nprimary' },
					send: [['app', 'r1']],
					light: ['r1']
				}
			],
			alt: 'The app writes to the primary database. The primary copies changes to two replicas, and the app reads from a replica.',
			h: 225,
			nodes: [
				{ id: 'app', label: 'App', x: 50, y: 130, w: 80, h: 56, fill: 'sky' },
				{ id: 'p', label: 'Primary', x: 225, y: 50, w: 100, h: 76, shape: 'db', fill: 'yellow' },
				{ id: 'r1', label: 'Replica 1', x: 415, y: 50, w: 100, h: 76, shape: 'db', fill: 'mint' },
				{ id: 'r2', label: 'Replica 2', x: 415, y: 175, w: 100, h: 76, shape: 'db', fill: 'mint' }
			],
			edges: [
				{ from: 'app', to: 'p', label: 'writes' },
				{ from: 'p', to: 'r1', label: 'copy' },
				{ from: 'p', to: 'r2', label: 'copy' },
				{ from: 'app', to: 'r2', label: 'reads', dashed: true }
			]
		}
	},
	{
		id: 'sharding',
		title: 'Partitioning and sharding',
		summary:
			'When one server cannot hold the data or keep up with the writes, you split the data. Partitioning divides a table into pieces, and sharding puts those pieces on different servers.',
		points: [
			['Range', 'A to H here, I to P there. Great for range queries, but risks hot spots.'],
			[
				'Hash',
				'hash the key to choose a shard. Spreads data evenly, but a range query touches every shard.'
			],
			['Shard key', 'the most important choice, and painful to change later.'],
			['The cost', 'joins and transactions across shards become slow or hard.']
		],
		tip: 'Sharding is a last resort. Try indexes, caching, read replicas and a bigger machine first.',
		links: [
			[
				'PostgreSQL: table partitioning',
				'https://www.postgresql.org/docs/current/ddl-partitioning.html'
			]
		],
		sketch: {
			kind: 'Data flow diagram',
			steps: [
				{
					say: 'Alice starts with A, so the router sends her row to shard 1.',
					set: { r: 'Router\n"Alice"' },
					send: [['r', 'a']],
					light: ['a']
				},
				{
					say: 'Maya goes to shard 2.',
					set: { r: 'Router\n"Maya"' },
					send: [['r', 'b']],
					light: ['b']
				},
				{
					say: 'Zoe goes to shard 3.',
					set: { r: 'Router\n"Zoe"' },
					send: [['r', 'c']],
					light: ['c']
				},
				{
					say: 'Each server now holds a third of the data and a third of the load.',
					send: [
						['r', 'a'],
						['r', 'b'],
						['r', 'c']
					]
				}
			],
			alt: 'A router sends each query to one of three shards: names A to H, I to P, or Q to Z.',
			h: 225,
			nodes: [
				{ id: 'r', label: 'Router', x: 70, y: 112, w: 110, h: 60, fill: 'yellow' },
				{
					id: 'a',
					label: 'Shard 1: A to H',
					x: 345,
					y: 38,
					w: 190,
					h: 62,
					shape: 'db',
					fill: 'mint'
				},
				{
					id: 'b',
					label: 'Shard 2: I to P',
					x: 345,
					y: 112,
					w: 190,
					h: 62,
					shape: 'db',
					fill: 'sky'
				},
				{
					id: 'c',
					label: 'Shard 3: Q to Z',
					x: 345,
					y: 186,
					w: 190,
					h: 62,
					shape: 'db',
					fill: 'pink'
				}
			],
			edges: [
				{ from: 'r', to: 'a' },
				{ from: 'r', to: 'b' },
				{ from: 'r', to: 'c' }
			]
		}
	},
	{
		id: 'cap',
		title: 'CAP and consistency',
		summary:
			'In a distributed database, a network partition will happen sooner or later. CAP says that during one you must choose: refuse some requests to stay consistent, or answer them and risk stale data.',
		points: [
			['Consistency', 'every read sees the latest write.'],
			['Availability', 'every request to a working node gets a response.'],
			['Partition tolerance', 'the system keeps running when nodes cannot reach each other.'],
			[
				'Eventual consistency',
				'replicas converge once writes stop. Fine for like counts, not for bank balances.'
			],
			['PACELC', 'even with no partition, you still trade latency against consistency.']
		],
		tip: 'You do not really pick two of three. Partitions are not optional, so the choice is C or A when one happens.',
		links: [
			['CAP theorem', 'https://en.wikipedia.org/wiki/CAP_theorem'],
			['PACELC', 'https://en.wikipedia.org/wiki/PACELC_design_principle']
		],
		sketch: {
			kind: 'Failure scenario',
			alt: 'Two database nodes replicate to each other. When the network between them breaks, node B must either refuse a read or return old data.',
			h: 215,
			nodes: [
				{ id: 'n1', label: 'Node A\nx = 1', x: 110, y: 50, w: 130, h: 66, fill: 'sky' },
				{ id: 'n2', label: 'Node B\nx = 1', x: 370, y: 50, w: 130, h: 66, fill: 'mint' },
				{ id: 'c1', label: 'Writer', x: 110, y: 170, w: 110, h: 50, fill: 'yellow' },
				{ id: 'c2', label: 'Reader', x: 370, y: 170, w: 110, h: 50, fill: 'yellow' }
			],
			edges: [
				{ from: 'n1', to: 'n2', label: 'replication', dashed: true },
				{ from: 'c1', to: 'n1' },
				{ from: 'c2', to: 'n2' }
			],
			steps: [
				{ say: 'A write reaches node A.', send: [['c1', 'n1']], set: { n1: 'Node A\nx = 2' } },
				{
					say: 'Normally it is copied across, so both nodes agree.',
					send: [['n1', 'n2']],
					set: { n1: 'Node A\nx = 2', n2: 'Node B\nx = 2' }
				},
				{
					say: 'The network between them breaks, and another write lands on A only.',
					send: [['c1', 'n1']],
					set: { n1: 'Node A\nx = 3', n2: 'Node B\nx = 2\ncut off' }
				},
				{
					say: 'CP choice: B refuses to answer rather than risk being wrong.',
					send: [['c2', 'n2']],
					set: { n1: 'Node A\nx = 3', n2: 'Node B\nrefused' },
					down: ['n2']
				},
				{
					say: 'AP choice: B answers with old data, and catches up after the network heals.',
					send: [['c2', 'n2']],
					set: { n1: 'Node A\nx = 3', n2: 'Node B\nx = 2 (old)' },
					light: ['n2']
				}
			]
		}
	},
	{
		id: 'nosql',
		title: 'NoSQL families',
		summary:
			'NoSQL is not one thing. Each family gives up some relational features to be very good at one shape of data.',
		points: [
			['Key-value', 'Redis, DynamoDB. Fast lookups by key for caches and sessions.'],
			['Document', 'MongoDB. JSON-like records for data that varies in shape.'],
			['Wide-column', 'Cassandra. Huge write volumes, read by a known partition key.'],
			['Graph', 'Neo4j. Relationships come first, for networks and recommendations.']
		],
		tip: 'Default to a relational database such as PostgreSQL. Reach for NoSQL when you can name the limit you are hitting.',
		links: [
			['Redis data types', 'https://redis.io/docs/latest/develop/data-types/'],
			['MongoDB introduction', 'https://www.mongodb.com/docs/manual/introduction/']
		],
		sketch: {
			kind: 'Comparison',
			alt: 'An app chooses between four NoSQL families: key-value, document, wide-column and graph.',
			h: 200,
			nodes: [
				{ id: 'app', label: 'Your app', x: 240, y: 30, w: 130, h: 46, fill: 'sky' },
				{ id: 'kv', label: 'Key-value\nsession:42', x: 60, y: 150, w: 108, h: 76, fill: 'yellow' },
				{ id: 'doc', label: 'Document\n{ json }', x: 180, y: 150, w: 108, h: 76, fill: 'sky' },
				{ id: 'wide', label: 'Wide-\ncolumn', x: 300, y: 150, w: 108, h: 76, fill: 'mint' },
				{ id: 'graph', label: 'Graph\na -> b', x: 420, y: 150, w: 108, h: 76, fill: 'pink' }
			],
			edges: [
				{ from: 'app', to: 'kv', plain: true },
				{ from: 'app', to: 'doc', plain: true },
				{ from: 'app', to: 'wide', plain: true },
				{ from: 'app', to: 'graph', plain: true }
			],
			steps: [
				{
					say: 'Need one thing by key, very fast? Use key-value, such as a login session in Redis.',
					send: [['app', 'kv']],
					light: ['kv']
				},
				{
					say: 'Records of varying shape? Use a document store, such as product pages in MongoDB.',
					send: [['app', 'doc']],
					light: ['doc']
				},
				{
					say: 'Enormous write volumes? Use wide-column, such as sensor data in Cassandra.',
					send: [['app', 'wide']],
					light: ['wide']
				},
				{
					say: 'Is the data all about connections? Use a graph, such as friends of friends in Neo4j.',
					send: [['app', 'graph']],
					light: ['graph']
				}
			]
		}
	}
];
