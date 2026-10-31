import type { Topic } from './sketch';

export const databases: Topic[] = [
	{
		id: 'relational',
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
		sketch: {
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
		sketch: {
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
		sketch: {
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
		id: 'indexes',
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
		sketch: {
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
		sketch: {
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
		sketch: {
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
		sketch: {
			alt: 'A triangle with consistency, availability and partition tolerance at its corners. CP and AP are the two real choices.',
			h: 215,
			nodes: [
				{ id: 'c', label: 'Consistency', x: 240, y: 32, w: 130, h: 46, fill: 'sky' },
				{ id: 'a', label: 'Availability', x: 85, y: 180, w: 130, h: 46, fill: 'mint' },
				{ id: 'p', label: 'Partition\ntolerance', x: 395, y: 180, w: 130, h: 58, fill: 'yellow' }
			],
			edges: [
				{ from: 'c', to: 'p', label: 'CP', plain: true },
				{ from: 'p', to: 'a', label: 'AP', plain: true },
				{ from: 'a', to: 'c', dashed: true, plain: true }
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
		sketch: {
			alt: 'Four NoSQL families: key-value, document, wide-column and graph.',
			h: 200,
			nodes: [
				{ id: 'kv', label: 'Key-value\nkey: value', x: 125, y: 50, w: 200, h: 76, fill: 'yellow' },
				{
					id: 'doc',
					label: 'Document\n{ "nested": "json" }',
					x: 355,
					y: 50,
					w: 200,
					h: 76,
					fill: 'sky'
				},
				{
					id: 'wide',
					label: 'Wide-column\nrow key, many columns',
					x: 125,
					y: 150,
					w: 200,
					h: 76,
					fill: 'mint'
				},
				{
					id: 'graph',
					label: 'Graph\nnodes and edges',
					x: 355,
					y: 150,
					w: 200,
					h: 76,
					fill: 'pink'
				}
			],
			edges: []
		}
	}
];
