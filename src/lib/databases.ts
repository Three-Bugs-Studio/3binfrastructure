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
				{
					title: 'One row per customer',
					say: 'Each customer lives in one row, in one table.',
					detail:
						'The customers table has an id column marked as the primary key, so no two rows can share a value. Name and email are stored only here, so a change is made once and every order that points at this row sees it straight away.',
					light: ['cust']
				},
				{
					title: 'Point with a foreign key',
					say: 'Every order stores the id of its customer in customer_id.',
					detail:
						'The orders table does not copy the customer name or email. It keeps just the number from customers.id, and many orders can hold the same number. That is a one-to-many relationship, declared in SQL with REFERENCES customers(id).',
					send: [['ord', 'cust']],
					light: ['ord']
				},
				{
					title: 'Join the tables',
					say: 'A JOIN follows that key and brings both tables back together.',
					detail:
						'The database matches each orders.customer_id with the customers.id that has the same value, then glues the two rows into one result row. A LEFT JOIN, as in the example query, also keeps customers with no orders yet, filling the order columns with NULL.',
					send: [['cust', 'ord']],
					light: ['cust', 'ord']
				},
				{
					title: 'Foreign key check',
					say: 'Try to save an order for customer 99, who does not exist. The foreign key rejects it.',
					detail:
						'Before the insert is saved, the database looks for a row in customers with id 99. It finds none, so the statement fails with a foreign key violation and nothing is written. Without the constraint, the order would point at nobody, and an inner join would quietly drop it.',
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
					title: 'Repeat on every order',
					say: 'One table repeats the customer on every single order.',
					detail:
						'Here the customer name and email are typed into every order row, so a customer with twenty orders has twenty copies. The table works, but it wastes space and gives the same fact many chances to go out of date.',
					hide: ['cust', 'ord'],
					light: ['before']
				},
				{
					title: 'The update anomaly',
					say: 'Changing one email means updating many rows. Miss one, and the data disagrees with itself.',
					detail:
						'To change an email, an UPDATE must reach every row for that customer. If one row is missed, two emails now claim to be current and no query can tell which is right. This is called an update anomaly, and normalization exists to prevent it.',
					hide: ['cust', 'ord'],
					set: { before: 'orders\nann@old.com, ann@new.com, ann@old.com' },
					down: ['before']
				},
				{
					title: 'Move customers out',
					say: 'Split the customer details into their own table.',
					detail:
						'Name and email depend on who the customer is, not on the order, so they move to a new customers table with its own id as the primary key. Each customer now appears once. This removes a transitive dependency, which is what third normal form asks for.',
					hide: ['ord'],
					send: [['before', 'cust']],
					light: ['cust']
				},
				{
					title: 'Keep only the key',
					say: 'Orders keep only a customer_id.',
					detail:
						'The new orders table holds id, item and a customer_id that points at the customers table. A foreign key constraint makes sure that id really exists. To show the name next to an order again, a query joins the two tables on customer_id.',
					send: [['before', 'ord']],
					light: ['ord']
				},
				{
					title: 'One fact, one row',
					say: 'Each fact now lives in one row, so one update fixes it everywhere.',
					detail:
						'Changing an email is now a single-row UPDATE on customers, and every order sees the new value through the join. The price is a join on reads, which an index on customer_id keeps cheap. Denormalise only after measuring that the join is too slow.',
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
					title: 'Open the transaction',
					say: 'BEGIN opens the transaction. Nothing is final yet.',
					detail:
						'From BEGIN until COMMIT, every change is tentative. Other sessions do not see it yet, and the database keeps enough information to undo each step. In PostgreSQL, a statement run without BEGIN is wrapped in its own one-statement transaction automatically.',
					hide: ['roll'],
					light: ['begin']
				},
				{
					title: 'Debit account 1',
					say: 'Take 100 from account 1.',
					detail:
						'The UPDATE lowers the balance of account 1, but the change is visible only inside this transaction. The database also locks that row, so another transaction trying to change the same account must wait until this one finishes.',
					hide: ['roll'],
					send: [['begin', 'debit']],
					light: ['debit']
				},
				{
					title: 'Credit account 2',
					say: 'Add 100 to account 2.',
					detail:
						'The second UPDATE raises the balance of account 2, still tentative. Between the two statements the money is briefly in neither account, but no other session can see that halfway state. That is isolation doing its job.',
					hide: ['roll'],
					send: [['debit', 'credit']],
					light: ['credit']
				},
				{
					title: 'Commit both changes',
					say: 'Both steps worked, so COMMIT makes them permanent together.',
					detail:
						'COMMIT writes a commit record to the write-ahead log and flushes it to disk before reporting success. From then on both updates are visible to everyone and survive a crash, because the log is replayed on restart. That is the D in ACID.',
					hide: ['roll'],
					send: [['credit', 'commit']],
					light: ['commit']
				},
				{
					title: 'A failure halfway',
					say: 'Now replay it, but the credit fails halfway through.',
					detail:
						'Perhaps account 2 has been closed, a constraint fails, or the server loses power. The debit has already run, so keeping the work done so far would make 100 disappear. Atomicity is the rule that stops a half-done transaction from ever becoming permanent.',
					send: [['debit', 'credit']],
					down: ['credit', 'commit']
				},
				{
					title: 'Roll back the change',
					say: 'ROLLBACK undoes the debit, as if nothing had happened. No money vanishes.',
					detail:
						'ROLLBACK throws away every change made since BEGIN, so account 1 is back to its old balance. In PostgreSQL, once a statement fails inside a transaction, every later command is refused until you roll back. After a crash, unfinished transactions are discarded the same way.',
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
					title: 'First read',
					say: 'Transaction 1 reads the row and sees 100.',
					detail:
						'Transaction 1 has started and reads the row. Under read committed, the PostgreSQL default, each statement takes a fresh snapshot of committed data at the moment it starts. So this read sees 100, the latest committed value.',
					hide: ['c2', 'b2', 'a3', 'b3'],
					send: [['a1', 'b1']],
					light: ['t1']
				},
				{
					title: 'Another transaction writes',
					say: 'Transaction 2 changes it to 200 and commits.',
					detail:
						'Transaction 2 runs in its own session and updates the same row. Transaction 1 is only reading, so nothing blocks the write. Once Transaction 2 commits, 200 becomes the newest committed value for any snapshot taken after that point.',
					hide: ['a3', 'b3'],
					send: [['c2', 'b2']],
					light: ['t2']
				},
				{
					title: 'Non-repeatable read',
					say: 'Transaction 1 reads the same row again and gets 200. That is a non-repeatable read.',
					detail:
						'Transaction 1 is still open, but its second statement takes a new snapshot that includes the commit. Code that reads a value and then acts on it can go wrong this way, for example approving a payment against a balance that has since changed.',
					send: [['a3', 'b3']],
					light: ['t1']
				},
				{
					title: 'Repeatable read instead',
					say: 'At repeatable read, Transaction 1 would keep seeing 100 until it finishes.',
					detail:
						'At repeatable read, PostgreSQL takes one snapshot at the first statement and keeps it for the whole transaction. If Transaction 1 then tries to update that row, it gets a serialization failure and must retry. Stronger levels trade some retries for fewer surprises.',
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
					title: 'The current version',
					say: 'Version 1 of the row says the balance is 100.',
					detail:
						'In PostgreSQL every row version carries hidden fields saying which transaction created it, called xmin, and which one replaced or deleted it, called xmax. Version 1 was committed earlier, so every new snapshot can see it.',
					hide: ['v2', 'w2'],
					light: ['v1']
				},
				{
					title: 'Write a new version',
					say: 'Writer 1 updates it to 50. That creates version 2, not yet committed.',
					detail:
						'PostgreSQL does not overwrite the old row. It writes a new version with balance 50 and marks version 1 as replaced by Writer 1. Until Writer 1 commits, only Writer 1 itself can see version 2.',
					hide: ['w2'],
					send: [['w', 'v2']],
					light: ['v2']
				},
				{
					title: 'Readers never wait',
					say: 'A reader at the same moment is not blocked. Its snapshot still shows version 1.',
					detail:
						'The reader checks each version against its snapshot. Version 2 belongs to a transaction that has not committed, so it is skipped and version 1 is returned. A plain SELECT takes no row locks, so reads and writes run side by side.',
					hide: ['w2'],
					send: [['r', 'v1']],
					light: ['r']
				},
				{
					title: 'Writers queue up',
					say: 'Writer 2 wants the same row. Writers do lock, so it waits for Writer 1 to commit.',
					detail:
						'Two new versions of one row cannot both win, so Writer 2 waits on the row lock Writer 1 holds until Writer 1 commits or rolls back. If two writers each waited on a row the other held, PostgreSQL would spot the deadlock after about a second and abort one.',
					send: [['w2', 'v2']],
					set: { w2: 'Writer 2\nwaiting' },
					light: ['w2']
				},
				{
					title: 'Commit and clean up',
					say: 'Writer 1 commits and Writer 2 goes ahead. Once no snapshot needs version 1, VACUUM removes it.',
					detail:
						'When Writer 1 commits, Writer 2 wakes up and, at read committed, applies its change on top of version 2. Version 1 becomes a dead row once no open snapshot can see it. VACUUM then frees its space, though one very long transaction can hold that cleanup back.',
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
					title: 'Take a base backup',
					say: 'At 02:00 a base backup copies the whole database.',
					detail:
						'pg_basebackup copies every data file of the running cluster without stopping it. The files keep changing during the copy, so the backup alone is not consistent. The WAL written during the copy must be replayed on restore to make it whole.',
					hide: ['db'],
					light: ['bb']
				},
				{
					title: 'Archive every WAL file',
					say: 'All day long, every finished WAL file is copied to the archive.',
					detail:
						'PostgreSQL records every change in write-ahead log files of 16 MB by default. When a file is full, archive_command copies it to safe storage, ideally on another machine. The base backup plus these files hold the full history since 02:00.',
					hide: ['db'],
					send: [['bb', 'wal']],
					light: ['wal']
				},
				{
					title: 'The bad DELETE',
					say: 'At 15:00 someone runs DELETE without a WHERE. The replicas copy it at once.',
					detail:
						'The DELETE is a valid, committed transaction, so the database has no reason to refuse it. Replication streams it to every replica within moments, and it lands in the WAL archive too. Failing over would not help, because every copy now agrees the rows are gone.',
					hide: ['db'],
					send: [['wal', 'bad']],
					light: ['bad']
				},
				{
					title: 'Restore the base backup',
					say: 'Restore the base backup onto a fresh server.',
					detail:
						'The base backup files are copied into an empty data directory on a new server. Working on a separate machine leaves the damaged primary untouched, so you can still compare against it. At this point the restored data is as it was at 02:00.',
					send: [['bb', 'db']],
					set: { db: 'Restored\n02:00' },
					light: ['db']
				},
				{
					title: 'Replay up to 14:59',
					say: 'Replay the WAL up to 14:59, one minute before the mistake, and stop there.',
					detail:
						'With recovery_target_time set and a recovery.signal file present, PostgreSQL fetches each WAL file through restore_command and replays it. It stops before the first commit after 14:59, so the DELETE never happens. Any other changes made after 14:59 are lost too.',
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
					title: 'Start at the root',
					say: 'Find 40. With no index, the database would have to read every row.',
					detail:
						'Without an index, a search for 40 is a sequential scan: every row is read and checked, so the time grows with the table. With a B-tree, the search starts at the root node and compares 40 with the keys stored there.',
					light: ['root']
				},
				{
					title: 'Pick the right branch',
					say: 'The root says 40 sits between 30 and 60, so skip everything else.',
					detail:
						'Keys in each node are kept sorted, so one comparison tells the database which child to follow. 40 is at least 30 and below 60, so the middle child is the only place it can be. The other branches are never read from disk.',
					send: [['root', 'b']],
					light: ['b']
				},
				{
					title: 'Found in two hops',
					say: 'Found in two hops. A real tree finds one row in millions in just a few.',
					detail:
						'A real index page holds hundreds of keys, so the tree is very wide and shallow. Three or four levels cover millions of rows, which means a few page reads instead of reading the whole table. The leaf entry then points to the row in the table.',
					light: ['b'],
					set: { b: '[40]  |  50' }
				},
				{
					title: 'The write cost',
					say: 'The catch: inserting 45 means this tree must be updated too, which slows down writes.',
					detail:
						'Every INSERT must also place the new key in the right leaf, in sorted order. When a leaf is full it splits in two and its parent gains a key. Each extra index repeats this work on every write, so keep only the indexes your queries use.',
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
					title: 'The query arrives',
					say: 'A query arrives. It says which rows it wants, not how to find them.',
					detail:
						'SQL is declarative, so the query names the rows it wants, here every order for customer 42. The parser checks it and hands it to the planner, which has to choose among several possible ways to fetch those rows.',
					send: [['q', 'p']],
					light: ['p']
				},
				{
					title: 'Read the statistics',
					say: 'The planner checks the statistics: about 12 of a million rows match.',
					detail:
						'ANALYZE, which autovacuum runs in the background, stores a sample of each column such as its most common values and how many distinct values it has. From these the planner estimates how many rows match. If the statistics are stale, the guess can be badly wrong, and so can the plan.',
					send: [['st', 'p']],
					light: ['st']
				},
				{
					title: 'Cost a full scan',
					say: 'Plan A reads every row in the table. Its estimated cost is high.',
					detail:
						'A sequential scan reads every page of the table in order and tests each row. Cost is in arbitrary units based on page reads and CPU work, so 18000 only means something next to other plans. For 12 rows out of a million, nearly all that work is wasted.',
					send: [['p', 'seq']],
					light: ['seq']
				},
				{
					title: 'Cost an index scan',
					say: 'Plan B follows the index on customer_id. Its estimated cost is tiny.',
					detail:
						'The index scan walks the B-tree to the entries for 42, then fetches just those rows from the table. Each fetch can be a random page read, so it is cheap for a few rows but would lose to a full scan if most rows matched. The planner picks the lower estimate.',
					send: [['p', 'idx']],
					light: ['idx'],
					down: ['seq']
				},
				{
					title: 'Measure the real run',
					say: 'EXPLAIN shows the winner. EXPLAIN ANALYZE also runs it and reports the real time.',
					detail:
						'EXPLAIN alone shows estimates without running anything. EXPLAIN ANALYZE executes the query and prints the actual rows and time next to each estimate. A big gap between estimated and actual rows usually means the statistics need refreshing.',
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
					title: 'Keep connections open',
					say: 'The pool holds two open connections to PostgreSQL, ready to lend.',
					detail:
						'Opening a connection means a TCP handshake, often TLS, authentication and, in PostgreSQL, starting a new backend process. That can take several milliseconds or more. The pool pays this cost once at start-up and then reuses the connections.',
					light: ['pool']
				},
				{
					title: 'Borrow a connection',
					say: 'Request 1 borrows one and runs its transaction.',
					detail:
						'Request 1 asks the pool for a connection and gets one that is already logged in. It keeps that connection for the length of its transaction, and the pool marks it as busy. No new process is started on the database server.',
					send: [
						['a1', 'pool'],
						['pool', 'db']
					],
					set: { pool: 'Pool\n1 free' }
				},
				{
					title: 'Both connections busy',
					say: 'Request 2 borrows the other at the same time.',
					detail:
						'Request 2 takes the second connection, so both now run queries on the server at once. The pool has nothing left to lend. This limit is deliberate: it caps how much work reaches the database at the same time.',
					send: [
						['a2', 'pool'],
						['pool', 'db']
					],
					set: { pool: 'Pool\n0 free' }
				},
				{
					title: 'Wait in the queue',
					say: 'Request 3 waits a moment in the queue instead of opening a new connection.',
					detail:
						'When the pool is empty, a new request waits instead of opening a third connection. Most pools give up after a timeout and return an error; HikariCP, for example, waits 30 seconds by default. A short wait is usually faster than overloading the server.',
					send: [['a3', 'pool']],
					set: { pool: 'Pool\n0 free', a3: 'Request 3\nqueued' },
					light: ['a3']
				},
				{
					title: 'Hand it on',
					say: 'Request 1 finishes, and its connection goes straight to request 3. The database still sees only two.',
					detail:
						'When Request 1 commits, its connection goes back to the pool and is handed straight to the next waiting request. PgBouncer in transaction mode uses the same idea to let thousands of clients share a few dozen server connections.',
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
				{
					title: 'Writes go to the primary',
					say: 'The app sends every write to the primary.',
					detail:
						'Only the primary accepts INSERT, UPDATE and DELETE, so one server decides the order of all changes. Each change is first recorded in its write-ahead log. That log is what gets shipped to the replicas.',
					send: [['app', 'p']],
					light: ['p']
				},
				{
					title: 'Stream the changes',
					say: 'The primary copies the change to each replica.',
					detail:
						'In PostgreSQL streaming replication, each replica keeps a connection open, receives WAL records as they are written and replays them. With asynchronous replication the primary does not wait, so a replica can lag by a fraction of a second, or much more under heavy load.',
					send: [
						['p', 'r1'],
						['p', 'r2']
					]
				},
				{
					title: 'Read from a replica',
					say: 'Reads go to a replica, which takes load off the primary.',
					detail:
						'Replicas run as hot standbys, so they answer SELECT queries but reject writes. Spreading reads across them frees the primary for writes. Because of lag, a user who has just saved something may not see it here yet, so send those reads to the primary.',
					send: [['app', 'r2']],
					light: ['r2']
				},
				{
					title: 'The primary goes down',
					say: 'The primary dies.',
					detail:
						'Writes now have nowhere to go, though the replicas can still serve reads. With asynchronous replication, changes the primary had committed but not yet sent are lost. Synchronous replication avoids that loss at the cost of slower commits.',
					down: ['p']
				},
				{
					title: 'Promote a replica',
					say: 'Replica 1 is promoted and starts taking writes, so the system keeps working.',
					detail:
						'Promotion turns a replica into a writable primary, for example with pg_promote() in PostgreSQL. Tools such as Patroni decide when to do it and repoint the app. The old primary must be kept out, or two primaries could accept conflicting writes.',
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
					title: 'Alice to shard 1',
					say: 'Alice starts with A, so the router sends her row to shard 1.',
					detail:
						'The router reads the shard key, here the first letter of the name, and checks which range it falls in. A to H belongs to shard 1, so the write goes only there. The other shards never see this row.',
					set: { r: 'Router\n"Alice"' },
					send: [['r', 'a']],
					light: ['a']
				},
				{
					title: 'Maya to shard 2',
					say: 'Maya goes to shard 2.',
					detail:
						'M sits in the I to P range, so this row lands on shard 2. Range sharding keeps neighbouring keys together, so a query for names from M to N touches one shard. The risk is a hot spot when many keys fall in one range.',
					set: { r: 'Router\n"Maya"' },
					send: [['r', 'b']],
					light: ['b']
				},
				{
					title: 'Zoe to shard 3',
					say: 'Zoe goes to shard 3.',
					detail:
						'Z falls in Q to Z, so shard 3 stores it. Names do not start with each letter equally often, so a plain alphabet split can leave one shard much fuller than the others. Hashing the key spreads rows more evenly but scatters range queries across every shard.',
					set: { r: 'Router\n"Zoe"' },
					send: [['r', 'c']],
					light: ['c']
				},
				{
					title: 'Spread the load',
					say: 'Each server now holds roughly a third of the data and a third of the load.',
					detail:
						'Each shard stores and serves only its own rows, so adding servers adds room for both data and writes. The price shows up in work that spans shards: a join or transaction across two of them needs extra round trips and coordination such as two-phase commit.',
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
				{
					title: 'Write to node A',
					say: 'A write reaches node A.',
					detail:
						'The writer sends x = 2 to node A, which stores it. Node A could confirm straight away, or wait until node B has a copy too. That choice already trades latency against consistency, which is what PACELC describes.',
					send: [['c1', 'n1']],
					set: { n1: 'Node A\nx = 2' }
				},
				{
					title: 'Replicate to node B',
					say: 'Normally it is copied across, so both nodes agree.',
					detail:
						'Node A sends the change over the network to node B, which applies it. After that, a read from either node returns 2. On a healthy network this copying usually takes milliseconds, so the window where they disagree is short.',
					send: [['n1', 'n2']],
					set: { n1: 'Node A\nx = 2', n2: 'Node B\nx = 2' }
				},
				{
					title: 'The network splits',
					say: 'The network between them breaks, and another write lands on A only.',
					detail:
						'A partition means both nodes are running but cannot reach each other, perhaps after a failed switch or a bad firewall rule. Node A accepts x = 3, and node B has no way to learn about it. Neither node can tell whether the other is down or just unreachable.',
					send: [['c1', 'n1']],
					set: { n1: 'Node A\nx = 3', n2: 'Node B\nx = 2\ncut off' }
				},
				{
					title: 'Choose consistency',
					say: 'CP choice: B refuses to answer rather than risk being wrong.',
					detail:
						'Node B knows it may be behind, so it returns an error or times out instead of guessing. Systems built on a majority vote, such as etcd with the Raft protocol, work this way: the side without a majority stops serving. Answers stay correct, but some clients get none.',
					send: [['c2', 'n2']],
					set: { n1: 'Node A\nx = 3', n2: 'Node B\nrefused' },
					down: ['n2']
				},
				{
					title: 'Choose availability',
					say: 'AP choice: B answers with old data, and catches up after the network heals.',
					detail:
						'Node B answers with x = 2, which was correct before the break but is stale now. When the network heals, the nodes swap the writes they missed and converge, using a rule such as last write wins for conflicts. Fine for a like counter, risky for a balance.',
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
					title: 'Key-value lookup',
					say: 'Need one thing by key, very fast? Use key-value, such as a login session in Redis.',
					detail:
						'A key-value store finds data by its exact key, such as session:42, and nothing else. Redis keeps the data in memory, so a lookup usually takes well under a millisecond. Asking for every session from one country is slow unless you maintain your own index.',
					send: [['app', 'kv']],
					light: ['kv']
				},
				{
					title: 'Document store',
					say: 'Records of varying shape? Use a document store, such as product pages in MongoDB.',
					detail:
						'Each document is a JSON-like record, stored by MongoDB as BSON, and two products can have different fields with no schema change. A whole product page comes back in one read, with no joins. The trade-off is that shared data may be copied, and your code must keep the copies in sync.',
					send: [['app', 'doc']],
					light: ['doc']
				},
				{
					title: 'Wide-column writes',
					say: 'Enormous write volumes? Use wide-column, such as sensor data in Cassandra.',
					detail:
						'Cassandra appends each write to a commit log and an in-memory table, later flushed to disk as sorted files, so writes are very cheap. Rows are grouped by a partition key, such as sensor id plus day. Queries must name that key, and filtering on other columns is poorly supported.',
					send: [['app', 'wide']],
					light: ['wide']
				},
				{
					title: 'Graph traversal',
					say: 'Is the data all about connections? Use a graph, such as friends of friends in Neo4j.',
					detail:
						'A graph database stores people as nodes and friendships as edges that point straight at each other. Following an edge is cheap, so friends of friends is a short walk rather than repeated self-joins on a large table. In Neo4j you write it in Cypher, as MATCH (a)-[:FRIEND]->()-[:FRIEND]->(c).',
					send: [['app', 'graph']],
					light: ['graph']
				}
			]
		}
	}
];
