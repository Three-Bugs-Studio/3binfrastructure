export type Course = { name: string; by: string; url: string; about: string; cost: string };

export type Step = { title: string; why: string; courses: Course[] };

const FREE = 'Free materials';
const COURSERA = 'Coursera, pricing varies';

// Ordered as a learning path: each step leans on the ones before it.
export const courses: Step[] = [
	{
		title: 'Learn to program',
		why: 'Everything else builds on being able to break a problem down and write code that solves it.',
		courses: [
			{
				name: 'CS50x',
				by: 'Harvard',
				url: 'https://cs50.harvard.edu/x/',
				about: 'A famous first course: C, Python, SQL and the web, with hard problem sets.',
				cost: FREE
			},
			{
				name: 'CS 61A: Structure and Interpretation of Computer Programs',
				by: 'UC Berkeley',
				url: 'https://cs61a.org/',
				about: 'Thinking about abstraction and how programs are built.',
				cost: FREE
			},
			{
				name: 'The Missing Semester',
				by: 'MIT',
				url: 'https://missing.csail.mit.edu/',
				about: 'The shell, Git, editors and the other daily tools courses tend to skip.',
				cost: FREE
			}
		]
	},
	{
		title: 'Algorithms and data structures',
		why: 'Knowing how long your code takes, and which structure fits, is what separates working code from code that scales.',
		courses: [
			{
				name: 'Algorithms, Part I',
				by: 'Princeton',
				url: 'https://www.coursera.org/learn/algorithms-part1',
				about: 'Sorting, searching and core data structures, taught through Java.',
				cost: COURSERA
			},
			{
				name: '6.006: Introduction to Algorithms',
				by: 'MIT OpenCourseWare',
				url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/',
				about: 'Recorded lectures and problem sets with more mathematical depth.',
				cost: FREE
			}
		]
	},
	{
		title: 'Build real software',
		why: 'Writing code that other people can read, test and change is the actual job.',
		courses: [
			{
				name: 'Full Stack Open',
				by: 'University of Helsinki',
				url: 'https://fullstackopen.com/en/',
				about: 'A modern web app end to end: React, Node, APIs, testing and CI.',
				cost: FREE
			},
			{
				name: '6.102: Software Construction',
				by: 'MIT',
				url: 'https://web.mit.edu/6.102/www/',
				about: 'Writing code that is safe from bugs, easy to understand and ready for change.',
				cost: FREE
			},
			{
				name: 'Software Design and Architecture',
				by: 'University of Alberta',
				url: 'https://www.coursera.org/specializations/software-design-architecture',
				about: 'Design patterns, architecture styles and how to evaluate a design.',
				cost: COURSERA
			},
			{
				name: 'Technical Writing',
				by: 'Google',
				url: 'https://developers.google.com/tech-writing',
				about: 'Short courses on writing clear docs, because design decisions live in writing.',
				cost: FREE
			}
		]
	},
	{
		title: 'How computers really work',
		why: 'Most production mysteries live below your code, in the operating system or the network.',
		courses: [
			{
				name: 'Nand2Tetris',
				by: 'Nisan and Schocken',
				url: 'https://www.nand2tetris.org/',
				about: 'Build a computer from logic gates up to a working game.',
				cost: FREE
			},
			{
				name: '6.1810: Operating System Engineering',
				by: 'MIT',
				url: 'https://pdos.csail.mit.edu/6.1810/',
				about: 'Learn how an OS works by hacking on a small teaching kernel.',
				cost: FREE
			},
			{
				name: 'CS 144: Introduction to Computer Networking',
				by: 'Stanford',
				url: 'https://cs144.github.io/',
				about: 'How the internet works, including building parts of TCP yourself.',
				cost: FREE
			}
		]
	},
	{
		title: 'Databases',
		why: 'Pairs well with the Database Concepts notes on this site, and shows what happens underneath them.',
		courses: [
			{
				name: '15-445/645: Intro to Database Systems',
				by: 'Carnegie Mellon',
				url: 'https://15445.courses.cs.cmu.edu/',
				about: 'How a database is built: storage, indexes, query execution and transactions.',
				cost: FREE
			},
			{
				name: 'CS 186: Introduction to Database Systems',
				by: 'UC Berkeley',
				url: 'https://cs186berkeley.net/',
				about: 'SQL, query optimisation and database internals, with hands-on projects.',
				cost: FREE
			}
		]
	},
	{
		title: 'Distributed systems and architecture',
		why: 'Once you can build one service well, this is how to make many of them work together.',
		courses: [
			{
				name: '6.5840: Distributed Systems',
				by: 'MIT',
				url: 'https://pdos.csail.mit.edu/6.824/',
				about: 'Consensus, replication and fault tolerance, with labs in Go.',
				cost: FREE
			},
			{
				name: 'The System Design Primer',
				by: 'Donne Martin',
				url: 'https://github.com/donnemartin/system-design-primer',
				about: 'Not a course, but a well-known guide to designing large systems.',
				cost: FREE
			},
			{
				name: 'Site Reliability Engineering',
				by: 'Google',
				url: 'https://sre.google/sre-book/table-of-contents/',
				about: 'A book on how large systems are kept running, free to read online.',
				cost: FREE
			}
		]
	}
];
