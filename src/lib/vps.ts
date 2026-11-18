import type { Topic } from './sketch';

const START = 'First hour: lock the door';
const ONLINE = 'Put your app online';
const ALIVE = 'Keep it alive';

export const vps: Topic[] = [
	{
		id: 'journey',
		part: 'The whole journey',
		title: 'From purchase to live site',
		summary:
			'A VPS from DigitalOcean, Hetzner, Vultr, Linode or similar is an empty Linux computer on the public internet. The company gives you an IP address and a login, and everything after that is your job. Commands on this page assume Ubuntu, and the order matters.',
		points: [
			['What you get', 'an IP address, a root login, and a bare operating system.'],
			[
				'What you do not get',
				'security, backups, HTTPS, monitoring or a way to deploy. Those are all yours.'
			],
			[
				'Choosing a plan',
				'an Ubuntu LTS image, a location near your users, and at least 1 GB of RAM for a small app.'
			],
			['Use an SSH key at purchase', 'most providers let you add one when creating the server.']
		],
		tip: 'Do the security steps before you deploy anything. Bots do not wait for you to finish.',
		links: [
			[
				'Initial server setup (DigitalOcean)',
				'https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu'
			],
			['Ubuntu Server docs', 'https://ubuntu.com/server/docs']
		],
		sketch: {
			kind: 'Process diagram',
			alt: 'The steps in order: buy the VPS, update it, set up SSH keys, add a firewall, deploy the app, add a domain with HTTPS, add backups, add monitoring, then go live.',
			h: 262,
			nodes: [
				{ id: 'a', label: '1. Buy VPS', x: 80, y: 40, w: 122, h: 52, fill: 'sky' },
				{ id: 'b', label: '2. Update', x: 240, y: 40, w: 122, h: 52, fill: 'pink' },
				{ id: 'c', label: '3. SSH keys', x: 400, y: 40, w: 122, h: 52, fill: 'pink' },
				{ id: 'd', label: '4. Firewall', x: 400, y: 130, w: 122, h: 52, fill: 'pink' },
				{ id: 'e', label: '5. Deploy app', x: 240, y: 130, w: 122, h: 52, fill: 'yellow' },
				{ id: 'f', label: '6. HTTPS', x: 80, y: 130, w: 122, h: 52, fill: 'yellow' },
				{ id: 'g', label: '7. Backups', x: 80, y: 222, w: 122, h: 52, fill: 'mint' },
				{ id: 'h', label: '8. Monitor', x: 240, y: 222, w: 122, h: 52, fill: 'mint' },
				{ id: 'i', label: 'Live!', x: 400, y: 222, w: 122, h: 52, fill: 'yellow' }
			],
			edges: [
				{ from: 'a', to: 'b' },
				{ from: 'b', to: 'c' },
				{ from: 'c', to: 'd' },
				{ from: 'd', to: 'e' },
				{ from: 'e', to: 'f' },
				{ from: 'f', to: 'g' },
				{ from: 'g', to: 'h' },
				{ from: 'h', to: 'i' }
			],
			steps: [
				{
					title: 'Buy the server',
					say: 'You pay, and within a minute you get an empty server with a public IP.',
					detail:
						'The provider carves a virtual machine out of a larger physical host and boots a fresh image, usually Ubuntu LTS. You get a root login and an IPv4 address. Bots that sweep whole IPv4 ranges can find that address within minutes, long before you have changed anything.',
					light: ['a']
				},
				{
					title: 'Lock it down first',
					say: 'First the security work: patch it, lock the login, close the ports.',
					detail:
						'These three steps shrink what an attacker can reach. Updates fix known bugs, SSH keys remove password guessing, and a firewall closes every port you did not mean to open. Together they take about fifteen minutes on a fresh Ubuntu server.',
					send: [
						['a', 'b'],
						['b', 'c'],
						['c', 'd']
					],
					light: ['b', 'c', 'd']
				},
				{
					title: 'Deploy and add HTTPS',
					say: 'Only then does your app go on, followed by a domain and HTTPS.',
					detail:
						"Your app runs behind a reverse proxy such as Nginx, and an A record points your domain at the server's IP. HTTPS comes last because Let's Encrypt checks that you control the domain by connecting to it on port 80, so DNS and the web server must already work.",
					send: [
						['d', 'e'],
						['e', 'f']
					],
					light: ['e', 'f']
				},
				{
					title: 'Plan for bad days',
					say: 'Backups and monitoring are what save you on your worst day.',
					detail:
						'Backups let you rebuild after a failed disk or a bad command, but only if they live off the server. Monitoring tells you about trouble before your users do: an outside uptime check every minute catches a dead site, and a disk alert at 80% catches the slow problems.',
					send: [
						['f', 'g'],
						['g', 'h']
					],
					light: ['g', 'h']
				},
				{
					title: 'Go live',
					say: 'Now it is really live. Each step below shows what happens if you skip it.',
					detail:
						'At this point the server patches itself, refuses password logins, exposes only ports 22, 80 and 443, serves HTTPS and copies its data elsewhere each night. The topics below take each step in turn and show what goes wrong when it is missing.',
					send: [['h', 'i']],
					light: ['i']
				}
			]
		}
	},
	{
		id: 'first-login',
		part: START,
		title: 'Log in and update everything',
		summary:
			'Your first job is to connect over SSH and install every security update. The image your provider used may be weeks old, and its known bugs are public.',
		points: [
			['Connect', 'use the IP address and login from your provider.'],
			['Update', 'apt pulls down the latest fixes. Reboot if the kernel changed.'],
			['Automatic updates', 'unattended-upgrades keeps installing security fixes after today.']
		],
		tip: 'Take a provider snapshot once the setup is done, so you can rebuild in minutes.',
		skip: 'bots scan the whole internet and try known bugs against old software. An unpatched server can be taken over without anyone guessing a password.',
		code: `ssh root@203.0.113.10

apt update && apt upgrade -y
apt install -y unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades
reboot`,
		links: [
			[
				'Automatic updates (Ubuntu)',
				'https://ubuntu.com/server/docs/how-to/software/automatic-updates/'
			]
		],
		sketch: {
			kind: 'Skip vs set up',
			alt: 'You connect to a new VPS. Without updates, scanner bots break in. With updates installed, their attacks fail.',
			h: 205,
			nodes: [
				{ id: 'you', label: 'You', x: 36, y: 72, shape: 'person' },
				{ id: 'vps', label: 'New VPS\nold packages', x: 235, y: 102, w: 140, h: 80, fill: 'sky' },
				{ id: 'bot', label: 'Scanner\nbots', x: 415, y: 45, w: 110, h: 62, fill: 'pink' },
				{ id: 'fix', label: 'Ubuntu\nupdates', x: 415, y: 160, w: 110, h: 62, fill: 'mint' }
			],
			edges: [
				{ from: 'you', to: 'vps', label: 'SSH' },
				{ from: 'bot', to: 'vps', dashed: true },
				{ from: 'fix', to: 'vps' }
			],
			steps: [
				{
					title: 'First SSH login',
					say: 'You connect for the first time. The server works, so it feels finished.',
					detail:
						'ssh root@ followed by the IP opens an encrypted shell on the server. The image your provider used may be weeks or months old, so packages like OpenSSH, OpenSSL and the kernel can carry bugs that are already public. A working server is not the same as a safe one.',
					send: [['you', 'vps']],
					hide: ['fix'],
					light: ['vps']
				},
				{
					title: 'Bots find the IP',
					say: 'SKIPPED: bots find your new IP and try a known bug in an old package.',
					detail:
						'Scanners sweep the whole IPv4 address space all the time, so a new address is usually probed within minutes. They compare software versions with public CVE lists (catalogues of known security bugs) and fire ready-made exploits. If the bug lets them run code, no password is needed.',
					send: [['bot', 'vps']],
					hide: ['fix'],
					light: ['bot']
				},
				{
					title: 'Server taken over',
					say: 'SKIPPED: it works. They are in, and your server now mines crypto or sends spam.',
					detail:
						'Once an exploit runs, attackers usually install a crypto miner or spam sender and add their own SSH key so they can come back. Cleaning up is unreliable, because you cannot be sure what else they changed. The safe fix is to rebuild the server from scratch.',
					hide: ['fix'],
					down: ['vps'],
					set: { vps: 'HACKED' }
				},
				{
					title: 'Install the fixes',
					say: 'SET UP: apt upgrade installs the fixes before anything else goes on the server.',
					detail:
						'apt update downloads the latest package lists, and apt upgrade installs the newer versions with their security fixes. A new kernel only takes effect after a reboot. If the file /var/run/reboot-required exists, a reboot is needed.',
					send: [['fix', 'vps']],
					set: { vps: 'New VPS\npatched' },
					light: ['fix']
				},
				{
					title: 'Stay patched',
					say: 'SET UP: the same attack now fails, and automatic updates keep it that way.',
					detail:
						'The exploit targets a bug that no longer exists, so it fails. unattended-upgrades runs every day from a systemd timer and installs security updates on its own. By default it does not reboot, so set Automatic-Reboot in its config or reboot yourself after kernel updates.',
					send: [['bot', 'vps']],
					set: { vps: 'New VPS\npatched' },
					down: ['bot']
				}
			]
		}
	},
	{
		id: 'ssh-keys',
		title: 'SSH keys, no root, no passwords',
		summary:
			'Password login on port 22 is the first thing bots attack. Replace it with SSH keys, which cannot realistically be guessed, and work as a normal user who uses sudo.',
		points: [
			['Create a user', 'day-to-day work should not happen as root.'],
			['Use keys', 'your laptop holds a private key, and the server holds the public half.'],
			['Disable root and passwords', 'only after you have tested the new login.']
		],
		tip: 'Keep your current SSH session open and test the new login in a second window. Otherwise one typo can lock you out.',
		skip: 'bots try common passwords against root around the clock. One good guess gives them total control of the server.',
		code: `adduser deploy
usermod -aG sudo deploy

# from your laptop
ssh-copy-id deploy@203.0.113.10

# in /etc/ssh/sshd_config
PermitRootLogin no
PasswordAuthentication no

sudo systemctl restart ssh`,
		links: [
			['OpenSSH server (Ubuntu)', 'https://ubuntu.com/server/docs/how-to/security/openssh-server/'],
			[
				'Set up SSH keys (DigitalOcean)',
				'https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-on-ubuntu-22-04'
			]
		],
		sketch: {
			kind: 'Skip vs set up',
			alt: 'Bots guess passwords at the SSH login. Without keys they get in. With keys only, they are rejected and you get in with your private key.',
			h: 205,
			nodes: [
				{ id: 'bot', label: 'Bots\nguessing', x: 60, y: 42, w: 100, h: 62, fill: 'pink' },
				{ id: 'you', label: 'You', x: 60, y: 118, shape: 'person' },
				{
					id: 'door',
					label: 'SSH login\nroot + password',
					x: 245,
					y: 95,
					w: 150,
					h: 72,
					fill: 'yellow'
				},
				{ id: 'vps', label: 'Your\nserver', x: 420, y: 95, w: 100, h: 72, fill: 'sky' }
			],
			edges: [
				{ from: 'bot', to: 'door' },
				{ from: 'you', to: 'door' },
				{ from: 'door', to: 'vps' }
			],
			steps: [
				{
					title: 'Root with a password',
					say: 'SKIPPED: root can log in with a password, and bots try thousands of them.',
					detail:
						'Every Linux server has a root account, so bots already know half the login. They only need the password, and they try lists of common and leaked ones from thousands of addresses. A busy server can log tens of thousands of failed attempts a day in /var/log/auth.log.',
					send: [['bot', 'door']],
					light: ['door']
				},
				{
					title: 'One guess is enough',
					say: 'SKIPPED: one guess works. Root can read, change or delete everything.',
					detail:
						'Root has no limits: it can read every file, install software, add users and wipe disks. Attackers usually add their own key to authorized_keys, so they keep access even after you change the password. A weak password turns a guessing game into total control.',
					send: [
						['bot', 'door'],
						['door', 'vps']
					],
					down: ['vps'],
					set: { vps: 'HACKED' }
				},
				{
					title: 'Turn off root login',
					say: 'SET UP: root login is off, and you work as a normal user.',
					detail:
						"You create a normal user such as deploy and add it to the sudo group, so admin commands need sudo and that user's password. PermitRootLogin no in sshd_config means bots must now guess a username as well. Admin actions are also logged under a real name.",
					set: { door: 'SSH login\nno root' },
					light: ['door']
				},
				{
					title: 'Keys instead of passwords',
					say: 'SET UP: passwords are off too. Your private key opens the door.',
					detail:
						'ssh-copy-id puts your public key in ~/.ssh/authorized_keys on the server. At login your laptop signs a challenge with the private key, and the server checks the signature with the public key, so the private key never leaves your laptop. With PasswordAuthentication no, nothing else is accepted.',
					send: [
						['you', 'door'],
						['door', 'vps']
					],
					set: { door: 'SSH login\nkeys only' }
				},
				{
					title: 'Every guess refused',
					say: 'SET UP: bots have nothing to guess, so every attempt is refused.',
					detail:
						"An Ed25519 key is far beyond the reach of any guessing. Bots still knock, but sshd answers every attempt with Permission denied (publickey). Keep a second copy of your key, or add another admin's key, so losing a laptop does not lock you out.",
					send: [['bot', 'door']],
					set: { door: 'SSH login\nkeys only' },
					down: ['bot']
				}
			]
		}
	},
	{
		id: 'firewall',
		title: 'Firewall: close every port you do not need',
		summary:
			'Any program listening on a public port can be reached by the whole world. A firewall blocks everything by default, and you open only what you mean to.',
		points: [
			['Open', 'SSH, plus 80 and 443 for the web. Usually nothing else.'],
			['Keep private', "databases, admin panels, and your app's own port."],
			[
				'Docker warning',
				'ports published with Docker can bypass UFW rules. Bind them to 127.0.0.1 instead.'
			],
			['Provider firewall', 'many companies offer one too, and using both is fine.']
		],
		tip: 'Run ufw allow OpenSSH before ufw enable, or you will lock yourself out.',
		skip: 'your database and admin ports sit open to the internet, and scanners find them within hours.',
		code: `sudo ufw allow OpenSSH
sudo ufw allow 80,443/tcp
sudo ufw enable
sudo ufw status`,
		links: [
			['Firewall (Ubuntu)', 'https://ubuntu.com/server/docs/how-to/security/firewalls/'],
			[
				'UFW guide (DigitalOcean)',
				'https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-ubuntu'
			]
		],
		sketch: {
			kind: 'Skip vs set up',
			alt: 'Without a firewall, attackers reach the database port directly. With a firewall, only SSH and web ports are open and everything else is blocked.',
			h: 228,
			nodes: [
				{ id: 'bot', label: 'Internet\nscanners', x: 56, y: 112, w: 96, h: 66, fill: 'pink' },
				{ id: 'fw', label: 'UFW', x: 195, y: 112, w: 66, h: 210, fill: 'yellow' },
				{ id: 'ssh', label: 'SSH: 22', x: 375, y: 30, w: 170, h: 40, fill: 'mint' },
				{ id: 'web', label: 'Web: 80, 443', x: 375, y: 84, w: 170, h: 40, fill: 'mint' },
				{ id: 'app', label: 'App: 3000', x: 375, y: 140, w: 170, h: 40, fill: 'pink' },
				{ id: 'db', label: 'Database: 5432', x: 375, y: 196, w: 170, h: 40, fill: 'pink' }
			],
			edges: [],
			steps: [
				{
					title: 'Every port is exposed',
					say: 'SKIPPED: with no firewall, every listening port faces the internet.',
					detail:
						'A program that listens on 0.0.0.0 accepts connections on every network interface, including the public one. Development servers and databases often do this by default or after a quick config change. sudo ss -tlnp lists what is listening and on which address.',
					hide: ['fw'],
					light: ['app', 'db']
				},
				{
					title: 'Scanners find the database',
					say: 'SKIPPED: scanners find your database and start attacking it directly.',
					detail:
						'Tools like masscan can check one port across the whole internet in minutes, and services like Shodan publish what they find. Port 5432 answering means attackers can try passwords or known PostgreSQL bugs directly. Your app port is exposed too, with no proxy in front.',
					hide: ['fw'],
					send: [
						['bot', 'db'],
						['bot', 'app']
					],
					light: ['db']
				},
				{
					title: 'Deny by default',
					say: 'SET UP: UFW now stands in front. Everything is denied unless you allow it.',
					detail:
						"UFW (Uncomplicated Firewall) is a friendly front end to the kernel's packet filter. Once enabled, its default policy drops all incoming connections and allows outgoing ones. Allow OpenSSH before running ufw enable, or your next login will be blocked too.",
					light: ['fw']
				},
				{
					title: 'Open only what you need',
					say: 'SET UP: web traffic and SSH pass through as planned.',
					detail:
						'Rules like ufw allow 80,443/tcp and ufw allow OpenSSH let those connections through. Nginx on 80 and 443 handles web traffic, and SSH on 22 is how you manage the server. sudo ufw status lists every rule, so you can check that nothing extra is open.',
					send: [
						['fw', 'web'],
						['fw', 'ssh']
					],
					light: ['web', 'ssh']
				},
				{
					title: 'Probes are dropped',
					say: 'SET UP: probes for anything else stop at the wall.',
					detail:
						'Packets for 3000, 5432 or any other port are silently dropped, so to a scanner there is nothing there. The app and database still talk over localhost, which UFW leaves alone. Watch out for Docker: ports it publishes skip UFW rules unless bound to 127.0.0.1.',
					send: [['bot', 'fw']],
					down: ['bot'],
					set: { fw: 'UFW\nDENY' }
				}
			]
		}
	},
	{
		id: 'fail2ban',
		title: 'Fail2ban: ban repeat offenders',
		summary:
			'Fail2ban watches your logs and blocks addresses that keep failing to log in. With SSH keys in place it is an extra layer, and it keeps your logs far quieter.',
		points: [
			['How it works', 'it reads login failures, then adds a temporary firewall ban.'],
			['Default on Ubuntu', 'installing it turns on protection for SSH.'],
			['Other services', 'jails can also protect Nginx and other logins.']
		],
		tip: 'Add your own IP to ignoreip if it is fixed, so a few typos cannot ban you.',
		skip: 'attackers can hammer your login forever, filling your logs and burning CPU.',
		code: `sudo apt install -y fail2ban
sudo systemctl enable --now fail2ban
sudo fail2ban-client status sshd`,
		links: [
			['Fail2ban', 'https://github.com/fail2ban/fail2ban'],
			[
				'Protect SSH with Fail2ban',
				'https://www.digitalocean.com/community/tutorials/how-to-protect-ssh-with-fail2ban-on-ubuntu-22-04'
			]
		],
		sketch: {
			kind: 'Skip vs set up',
			alt: 'An attacker fails to log in repeatedly. Fail2ban reads the log and adds a firewall ban.',
			h: 200,
			nodes: [
				{ id: 'bot', label: 'Attacker', x: 60, y: 100, w: 100, h: 56, fill: 'pink' },
				{ id: 'ssh', label: 'SSH\nlogin', x: 225, y: 45, w: 100, h: 62, fill: 'yellow' },
				{ id: 'log', label: 'auth.log\n0 failures', x: 405, y: 45, w: 120, h: 62, fill: 'sky' },
				{ id: 'f2b', label: 'Fail2ban', x: 405, y: 155, w: 120, h: 52, fill: 'mint' },
				{ id: 'ban', label: 'Firewall ban', x: 225, y: 155, w: 120, h: 52 }
			],
			edges: [
				{ from: 'bot', to: 'ssh' },
				{ from: 'ssh', to: 'log' },
				{ from: 'log', to: 'f2b' },
				{ from: 'f2b', to: 'ban' }
			],
			steps: [
				{
					title: 'Endless login attempts',
					say: 'SKIPPED: the attacker keeps trying, and nothing ever stops them.',
					detail:
						'Without anything watching, one address can try thousands of logins a day. Each attempt costs some CPU for the SSH handshake and adds a line to /var/log/auth.log. With keys only they will not get in, but the noise hides the log lines that actually matter.',
					send: [
						['bot', 'ssh'],
						['ssh', 'log']
					],
					hide: ['f2b', 'ban'],
					set: { log: 'auth.log\n50,000 failures' },
					light: ['log']
				},
				{
					title: 'Watch the log',
					say: 'SET UP: Fail2ban reads every failure in the log.',
					detail:
						'Fail2ban follows the SSH log, or the systemd journal, and matches failed logins with regular expressions called filters. It counts failures for each IP address within a time window. On Ubuntu the sshd jail is on by default, with a limit of 5 failures in 10 minutes.',
					send: [
						['bot', 'ssh'],
						['log', 'f2b']
					],
					hide: ['ban'],
					set: { log: 'auth.log\n5 failures' },
					light: ['f2b']
				},
				{
					title: 'Add a firewall ban',
					say: 'SET UP: too many failures, so it adds a ban to the firewall.',
					detail:
						'When an address passes the limit, Fail2ban adds a firewall rule, through iptables or nftables, that drops its packets. The default ban lasts 10 minutes, which already makes slow guessing pointless. You can raise bantime, or turn on longer bans for repeat offenders.',
					send: [['f2b', 'ban']],
					set: { log: 'auth.log\n5 failures' },
					light: ['ban']
				},
				{
					title: 'Blocked at the door',
					say: 'SET UP: that address is now blocked before it reaches SSH.',
					detail:
						'The banned address now gets no reply at all, so SSH spends no work on it and the log stays quiet. When the ban expires, Fail2ban removes the rule by itself. sudo fail2ban-client status sshd shows how many addresses are banned right now.',
					send: [['bot', 'ban']],
					set: { log: 'auth.log\n5 failures' },
					down: ['bot']
				}
			]
		}
	},
	{
		id: 'dns',
		part: ONLINE,
		title: 'Point your domain at the server',
		summary:
			'Domain names are bought separately, from a registrar. You add an A record that points your domain at your VPS IP, and browsers can then find you by name.',
		points: [
			['A record', 'links a name such as example.com to an IPv4 address.'],
			['www', 'add a second record for www, or redirect it.'],
			['TTL', 'how long others may cache the answer. Changes can take minutes to hours to spread.']
		],
		tip: "Add DNS before HTTPS, because Let's Encrypt needs the domain to reach your server.",
		skip: 'visitors must type a raw IP address, you cannot get a normal HTTPS certificate, and changing servers breaks every link.',
		code: `Type   Name   Value            TTL
A      @      203.0.113.10     300
A      www    203.0.113.10     300

# check it from your laptop
dig +short example.com`,
		links: [
			[
				'What is a domain name? (MDN)',
				'https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_domain_name'
			],
			[
				'DNS terminology (DigitalOcean)',
				'https://www.digitalocean.com/community/tutorials/an-introduction-to-dns-terminology-components-and-concepts'
			]
		],
		sketch: {
			kind: 'Skip vs set up',
			alt: 'A visitor asks DNS for example.com and gets the server IP, then connects to the VPS.',
			h: 190,
			nodes: [
				{ id: 'user', label: 'Visitor', x: 40, y: 72, shape: 'person' },
				{ id: 'dns', label: 'DNS\nno record', x: 240, y: 42, w: 150, h: 62, fill: 'yellow' },
				{ id: 'vps', label: 'VPS\n203.0.113.10', x: 400, y: 145, w: 130, h: 66, fill: 'sky' }
			],
			edges: [
				{ from: 'user', to: 'dns', label: '1. where?' },
				{ from: 'user', to: 'vps', label: '2. connect' }
			],
			steps: [
				{
					title: 'Nothing to look up',
					say: 'SKIPPED: a visitor types example.com, and DNS has no answer.',
					detail:
						"The browser asks a DNS resolver, usually run by the internet provider or a service like 1.1.1.1, to turn the name into an IP address. The resolver asks your domain's name servers, which have no A record to give. With an empty answer, the browser has nowhere to connect.",
					send: [['user', 'dns']],
					down: ['dns']
				},
				{
					title: 'Site cannot be reached',
					say: 'SKIPPED: the browser says "site can\'t be reached". You are live, but nobody can find you.',
					detail:
						"Your server is running, but only people who type 203.0.113.10 can reach it. Without a name you also cannot get a normal Let's Encrypt certificate, because those are issued for domain names. Moving to a new server would change the address and break every link you shared.",
					down: ['dns', 'user']
				},
				{
					title: 'Add an A record',
					say: 'SET UP: you add an A record at your registrar.',
					detail:
						"In your registrar's or DNS provider's dashboard, an A record maps a name to an IPv4 address. The name @ means the bare domain, and a second record covers www. An AAAA record does the same job for IPv6 if your server has an IPv6 address.",
					set: { dns: 'DNS\nA 203.0.113.10' },
					light: ['dns']
				},
				{
					title: 'DNS answers',
					say: 'SET UP: DNS answers with the IP address.',
					detail:
						'The resolver gets 203.0.113.10 from your name servers and caches it for the TTL, here 300 seconds. That is why changes take time to show up everywhere: old answers live on until they expire. dig +short example.com shows the answer your resolver currently gives.',
					send: [['user', 'dns']],
					set: { dns: 'DNS\nA 203.0.113.10' }
				},
				{
					title: 'Connect by name',
					say: 'SET UP: the browser connects to your server by name.',
					detail:
						'With the IP in hand, the browser opens a TCP connection to port 80 or 443. It still sends the name, in the Host header and, for HTTPS, in the TLS handshake (SNI). That is how Nginx can tell which site was asked for, even when many share one IP.',
					send: [['user', 'vps']],
					set: { dns: 'DNS\nA 203.0.113.10' },
					light: ['vps']
				}
			]
		}
	},
	{
		id: 'keep-running',
		title: 'Keep the app running',
		summary:
			'Running your app in an SSH session ties its life to that session. A process manager like systemd, or Docker with a restart policy, starts it at boot and restarts it after a crash.',
		points: [
			['systemd', 'built into Ubuntu, and all you need for one app.'],
			['Docker Compose', 'good when you have several containers. Use restart: unless-stopped.'],
			['Environment files', 'keep secrets in a file only that user can read, never in Git.'],
			['Run as a normal user', 'a bug in your app should not hand out root.']
		],
		tip: 'Reboot the server once on purpose. If the site does not come back alone, it is not set up yet.',
		skip: 'your site dies the moment you close your laptop, and stays down after every crash or reboot until you notice.',
		code: `# /etc/systemd/system/app.service
[Unit]
Description=My app
After=network.target

[Service]
User=deploy
WorkingDirectory=/home/deploy/app
EnvironmentFile=/home/deploy/app/.env
ExecStart=/usr/bin/node server.js
Restart=always

[Install]
WantedBy=multi-user.target

# then
sudo systemctl enable --now app`,
		links: [
			[
				'systemd.service',
				'https://www.freedesktop.org/software/systemd/man/latest/systemd.service.html'
			],
			[
				'Docker restart policies',
				'https://docs.docker.com/engine/containers/start-containers-automatically/'
			]
		],
		sketch: {
			kind: 'Skip vs set up',
			alt: 'Started from an SSH session, the app stops when the session ends. Started by systemd, it restarts after crashes and reboots.',
			h: 200,
			nodes: [
				{ id: 'ssh', label: 'Your SSH\nsession', x: 65, y: 48, w: 110, h: 62, fill: 'sky' },
				{ id: 'sd', label: 'systemd', x: 65, y: 155, w: 110, h: 52, fill: 'mint' },
				{ id: 'app', label: 'Your app', x: 250, y: 100, w: 120, h: 66, fill: 'yellow' },
				{ id: 'user', label: 'Visitors', x: 425, y: 80, shape: 'person' }
			],
			edges: [
				{ from: 'ssh', to: 'app' },
				{ from: 'sd', to: 'app' },
				{ from: 'user', to: 'app' }
			],
			steps: [
				{
					title: 'Started by hand',
					say: 'SKIPPED: you start the app by hand in SSH. The site works, for now.',
					detail:
						'Running node server.js in an SSH shell makes the app a child of that shell. It works while the session stays open, so it feels done. Nothing will restart it after a crash or a reboot, and its output only goes to your terminal.',
					hide: ['sd'],
					send: [
						['ssh', 'app'],
						['user', 'app']
					]
				},
				{
					title: 'Session ends, app ends',
					say: 'SKIPPED: you close your laptop. The session ends and the app ends with it.',
					detail:
						'When the SSH connection drops, the shell receives SIGHUP, the hang-up signal, and passes it on to the programs it started, which usually exit. Tricks like nohup or screen keep the app alive past logout, but still nothing restarts it after a crash or a reboot.',
					hide: ['sd'],
					down: ['ssh', 'app']
				},
				{
					title: 'Silent downtime',
					say: 'SKIPPED: visitors see an error, and nobody tells you.',
					detail:
						'With the app gone, the browser cannot connect at all, or gets 502 Bad Gateway if Nginx sits in front. Nothing on the server is watching, so no alert goes out. The site stays down until someone happens to check.',
					hide: ['sd'],
					down: ['ssh', 'app'],
					send: [['user', 'app']]
				},
				{
					title: 'Hand it to systemd',
					say: 'SET UP: systemd starts the app, and your SSH session no longer matters.',
					detail:
						'systemd is the first process Ubuntu starts, and it supervises every service. A unit file says which user runs the app, where its environment file is and what command to run. sudo systemctl enable --now app starts it now and at every boot, separate from any login.',
					hide: ['ssh'],
					send: [['sd', 'app']],
					light: ['sd']
				},
				{
					title: 'Restart after a crash',
					say: 'SET UP: the app crashes at 3am. systemd restarts it in seconds.',
					detail:
						'Restart=always tells systemd to start the app again whenever it exits, whatever the reason, after a short pause of 100 milliseconds by default. If it fails more than 5 times in 10 seconds, systemd gives up, so check journalctl -u app for the cause.',
					hide: ['ssh'],
					down: ['app'],
					set: { app: 'Crashed!' }
				},
				{
					title: 'Survive a reboot',
					say: 'SET UP: running again, and it also survives a full server reboot.',
					detail:
						'WantedBy=multi-user.target hooks the service into normal boot, so the app starts without anyone logging in. Its output goes to the journal, which journalctl -u app -f follows live. Reboot once on purpose to prove the whole chain works.',
					hide: ['ssh'],
					send: [
						['sd', 'app'],
						['user', 'app']
					],
					set: { app: 'Restarted' },
					light: ['app']
				}
			]
		}
	},
	{
		id: 'reverse-proxy',
		title: 'Reverse proxy with Nginx',
		summary:
			'Your app listens on a private port such as 3000. Nginx, or Caddy, faces the internet on ports 80 and 443 and passes requests to it. One server can then host many sites.',
		points: [
			['Clean URLs', 'visitors use example.com, with no port number.'],
			['One front door', 'HTTPS, compression and rate limits all live in one place.'],
			['Static files', 'Nginx serves them directly, so your app does not have to.'],
			['Many sites', 'route by domain name to different apps on the same VPS.']
		],
		tip: 'Make the app listen on 127.0.0.1, so only Nginx can reach it.',
		skip: 'visitors see example.com:3000, there is nowhere sensible to add HTTPS, and your app takes every request from the internet directly.',
		code: `# /etc/nginx/sites-available/app
server {
    listen 80;
    server_name example.com www.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

sudo ln -s /etc/nginx/sites-available/app /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx`,
		links: [
			['NGINX reverse proxy', 'https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/'],
			['proxy_pass reference', 'https://nginx.org/en/docs/http/ngx_http_proxy_module.html']
		],
		sketch: {
			kind: 'Skip vs set up',
			alt: 'Without a proxy, visitors hit the app on port 3000 directly. With Nginx in front, it routes each domain to the right app on a private port.',
			h: 205,
			nodes: [
				{ id: 'vps', label: 'Your VPS', x: 300, y: 102, w: 345, h: 196, shape: 'boundary' },
				{ id: 'user', label: 'Visitors', x: 40, y: 72, shape: 'person' },
				{ id: 'ngx', label: 'Nginx\n80, 443', x: 200, y: 112, w: 104, h: 72, fill: 'yellow' },
				{ id: 'a', label: 'Shop\n:3000', x: 400, y: 60, w: 110, h: 62, fill: 'mint' },
				{ id: 'b', label: 'Blog\n:3001', x: 400, y: 152, w: 110, h: 62, fill: 'sky' }
			],
			edges: [
				{ from: 'user', to: 'ngx' },
				{ from: 'ngx', to: 'a' },
				{ from: 'ngx', to: 'b' }
			],
			steps: [
				{
					title: 'App alone on the internet',
					say: 'SKIPPED: the app faces the internet by itself, as example.com:3000.',
					detail:
						"Visitors must type :3000, because browsers only assume port 80 for http and 443 for https. The app's own HTTP server now faces slow clients, odd requests and attacks directly, a job it was not built for. Ports below 1024 also need root to bind, which an app should never have.",
					hide: ['ngx', 'b'],
					send: [['user', 'a']],
					light: ['a']
				},
				{
					title: 'No room to grow',
					say: 'SKIPPED: there is no room for a second site, and no good place for HTTPS.',
					detail:
						'Only one program can listen on a port, so a second app would need yet another port number in its URL. HTTPS would have to be built into each app, each with its own certificate handling. Static files, compression and rate limits would all end up in app code too.',
					hide: ['ngx', 'b'],
					light: ['a'],
					down: ['user']
				},
				{
					title: 'Nginx at the front',
					say: 'SET UP: Nginx takes the public ports. The app moves to a private one.',
					detail:
						'Nginx listens on 80 and 443, and the app listens on 127.0.0.1:3000, which only the server itself can reach. Nginx is built to hold thousands of connections cheaply, including slow ones. Run sudo nginx -t before each reload to catch config mistakes.',
					send: [['user', 'ngx']],
					hide: ['b'],
					light: ['ngx']
				},
				{
					title: 'Pass the request on',
					say: 'SET UP: Nginx passes each request to the app and returns the answer.',
					detail:
						"proxy_pass sends each request to 127.0.0.1:3000 over a local connection. The app now sees Nginx as the client, so headers like X-Real-IP and X-Forwarded-Proto carry the visitor's real address and whether they used HTTPS. Nginx then sends the app's answer back to the browser.",
					send: [['ngx', 'a']],
					hide: ['b']
				},
				{
					title: 'Route by domain name',
					say: 'SET UP: a second site on the same server gets routed by its domain name.',
					detail:
						'Each server block has a server_name, and Nginx compares it with the Host header of every request. The blog goes to port 3001 and the shop to 3000, on one IP and one pair of public ports. Adding a site is a new config file and a reload, with no downtime.',
					send: [
						['user', 'ngx'],
						['ngx', 'b']
					],
					light: ['b']
				}
			]
		}
	},
	{
		id: 'https',
		title: "HTTPS with Let's Encrypt",
		summary:
			"HTTPS encrypts everything between the browser and your server. Certificates from Let's Encrypt are free, and Certbot can install and renew them for you.",
		points: [
			['Certificate', 'proves that you control the domain.'],
			['Certbot', 'requests a certificate and edits your Nginx config.'],
			['Renewal', 'certificates are short-lived, so Certbot sets up automatic renewal.'],
			['Caddy', 'an alternative web server that handles HTTPS with almost no setup.']
		],
		tip: 'Run the renewal dry run once, so a silent failure cannot take your site down in three months.',
		skip: 'browsers label your site "Not secure", logins and cookies travel as readable text, and anyone on the same Wi-Fi can read or change them.',
		code: `sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d example.com -d www.example.com

# prove that renewal works
sudo certbot renew --dry-run`,
		links: [
			["Let's Encrypt: getting started", 'https://letsencrypt.org/getting-started/'],
			['Certbot instructions', 'https://certbot.eff.org/instructions']
		],
		sketch: {
			kind: 'Skip vs set up',
			alt: "Over plain HTTP, someone on the same network can read a password. With a certificate from Let's Encrypt, the traffic is encrypted.",
			h: 215,
			nodes: [
				{ id: 'user', label: 'Browser\nNot secure', x: 62, y: 100, w: 112, h: 66, fill: 'pink' },
				{ id: 'wifi', label: 'Someone on\nthe Wi-Fi', x: 240, y: 40, w: 130, h: 62, fill: 'pink' },
				{ id: 'vps', label: 'Your\nserver', x: 415, y: 100, w: 110, h: 66, fill: 'sky' },
				{ id: 'le', label: "Let's Encrypt", x: 415, y: 190, w: 120, h: 44, fill: 'mint' }
			],
			edges: [
				{ from: 'user', to: 'vps', label: 'login' },
				{ from: 'le', to: 'vps' }
			],
			steps: [
				{
					title: 'Plain HTTP',
					say: 'SKIPPED: the site runs on plain HTTP, and the browser warns "Not secure".',
					detail:
						'With plain HTTP, every request and response travels as readable text, and nothing proves the page really came from your server. Browsers mark such pages Not secure, and features like service workers and geolocation only work over HTTPS.',
					hide: ['le'],
					light: ['user']
				},
				{
					title: 'Password in the clear',
					say: 'SKIPPED: you log in, and the password crosses the network as readable text.',
					detail:
						'The login form sends the password in the body of an HTTP POST request, unencrypted. It passes the Wi-Fi access point, the internet provider and every router on the way, and any of them can read or change it. Session cookies travel the same way, so a stolen cookie works like a stolen login.',
					hide: ['le'],
					send: [
						['user', 'vps'],
						['user', 'wifi']
					]
				},
				{
					title: 'Snooped on the Wi-Fi',
					say: 'SKIPPED: anyone on the same network can read it.',
					detail:
						"On shared Wi-Fi, a tool like Wireshark can capture other people's traffic, and on an open network it is not even encrypted over the air. A fake hotspot with a familiar name makes it easier still. The attacker never needs access to your server.",
					hide: ['le'],
					light: ['wifi'],
					set: { wifi: 'password:\nhunter2' }
				},
				{
					title: 'Get a certificate',
					say: 'SET UP: Certbot proves you own the domain and gets a free certificate.',
					detail:
						"Certbot asks Let's Encrypt for a certificate, and Let's Encrypt checks that you control the domain by fetching a token from a path under /.well-known/acme-challenge/ on your site. This is the ACME HTTP-01 challenge, so port 80 must be open. Certbot then adds the certificate to your Nginx config.",
					send: [['le', 'vps']],
					light: ['le']
				},
				{
					title: 'Encrypted with TLS',
					say: 'SET UP: now everything is encrypted, and the browser shows a padlock.',
					detail:
						'The browser and Nginx run a TLS handshake: the server shows its certificate, the browser checks that a trusted authority signed it for this domain, and both agree on fresh session keys. From then on every byte is encrypted and protected against tampering. Certbot can also redirect plain HTTP to HTTPS.',
					send: [['user', 'vps']],
					set: { user: 'Browser\nSecure' }
				},
				{
					title: 'Snooper sees nothing',
					say: 'SET UP: the Wi-Fi snooper sees only scrambled data.',
					detail:
						'The snooper can still see which server and domain you connect to and roughly how much data moves, but not the pages, passwords or cookies. Certificates last only a few months, so Certbot installs a timer that renews them well before they expire. certbot renew --dry-run proves renewal works.',
					send: [['user', 'wifi']],
					set: { user: 'Browser\nSecure', wifi: 'x7#qP!z@' },
					down: ['wifi']
				}
			]
		}
	},
	{
		id: 'database',
		title: 'Keep the database private',
		summary:
			'A database should talk only to your app, never to the internet. Bind it to localhost, give it a strong password, and connect through an SSH tunnel when you need to look inside.',
		points: [
			['Bind to localhost', 'PostgreSQL does this by default. Do not change it to all addresses.'],
			['Docker', 'publish with 127.0.0.1:5432:5432, or do not publish at all.'],
			['Separate user', 'give the app its own login with only the rights it needs.'],
			['Remote access', 'use an SSH tunnel instead of opening the port.']
		],
		tip: 'Scan your own server from outside with nmap, and confirm that only the ports you meant are open.',
		skip: 'attackers scan for open databases, then copy or wipe the data and leave a ransom note. Many exposed databases are hit this way.',
		code: `# docker-compose.yml: reachable from this machine only
ports:
  - "127.0.0.1:5432:5432"

# look inside from your laptop, through SSH
ssh -L 5432:127.0.0.1:5432 deploy@203.0.113.10`,
		links: [
			[
				'PostgreSQL listen_addresses',
				'https://www.postgresql.org/docs/current/runtime-config-connection.html'
			],
			['PostgreSQL over an SSH tunnel', 'https://www.postgresql.org/docs/current/ssh-tunnels.html']
		],
		sketch: {
			kind: 'Skip vs set up',
			alt: 'An exposed database gets wiped by attackers. Bound to localhost, only the app on the same server can reach it.',
			h: 205,
			nodes: [
				{ id: 'vps', label: 'Your VPS', x: 320, y: 102, w: 305, h: 196, shape: 'boundary' },
				{ id: 'bot', label: 'Attacker', x: 62, y: 102, w: 104, h: 62, fill: 'pink' },
				{ id: 'app', label: 'App', x: 240, y: 102, w: 100, h: 62, fill: 'sky' },
				{
					id: 'db',
					label: 'Database\nopen to all',
					x: 400,
					y: 102,
					w: 112,
					h: 88,
					shape: 'db',
					fill: 'yellow'
				}
			],
			edges: [{ from: 'app', to: 'db' }],
			steps: [
				{
					title: 'Database port published',
					say: 'SKIPPED: the database port was published to the internet to make testing easier.',
					detail:
						"A line like 5432:5432 under ports in Docker, or listen_addresses = '*' in PostgreSQL, makes the database accept connections from any address. It is handy for pointing a desktop tool at it during development. It also means anyone on the internet can try to log in.",
					light: ['db']
				},
				{
					title: 'Scanner tries passwords',
					say: 'SKIPPED: a scanner finds it and tries weak passwords.',
					detail:
						'Bots look for open 5432 (PostgreSQL), 3306 (MySQL) and 27017 (MongoDB) ports around the clock. They try default logins, such as postgres with the password postgres, then lists of common passwords. A quick test setup often has exactly that kind of password.',
					send: [['bot', 'db']],
					light: ['bot']
				},
				{
					title: 'Data held to ransom',
					say: 'SKIPPED: your data is copied and deleted, and a ransom note is left in its place.',
					detail:
						"Automated scripts dump the tables, drop them and leave a single table with a note asking for bitcoin. Paying rarely brings anything back, because many of these scripts never kept a copy. Your users' data may also be leaked, which can bring a legal duty to report it.",
					down: ['db'],
					set: { db: 'PAY US\nBITCOIN' }
				},
				{
					title: 'Listen on localhost',
					say: 'SET UP: the database now listens on localhost only.',
					detail:
						"Binding to 127.0.0.1 means the database only accepts connections that start on the same machine. PostgreSQL does this by default with listen_addresses = 'localhost'. In Docker, write 127.0.0.1:5432:5432, or publish nothing if only other containers need it.",
					set: { db: 'Database\nlocalhost' },
					light: ['db']
				},
				{
					title: 'App connects locally',
					say: 'SET UP: your app is on the same machine, so it connects as normal.',
					detail:
						'The app connects to 127.0.0.1:5432, or to db:5432 inside a Compose network, so its code does not change. Give it its own database user with only the rights it needs, not the postgres superuser. A bug in the app then cannot drop other databases.',
					send: [['app', 'db']],
					set: { db: 'Database\nlocalhost' }
				},
				{
					title: 'Invisible from outside',
					say: 'SET UP: from the internet, the port does not exist.',
					detail:
						'A scanner trying port 5432 on the public IP gets no answer, because nothing listens there. When you need to look inside, ssh -L 5432:127.0.0.1:5432 forwards a port on your laptop through the encrypted SSH connection. Your tool then connects to localhost on the laptop as if the database were local.',
					send: [['bot', 'vps']],
					set: { db: 'Database\nlocalhost' },
					down: ['bot']
				}
			]
		}
	},
	{
		id: 'compose',
		title: 'Docker Compose on one server',
		summary:
			'Compose describes your whole stack in one file: the app, the database and how they connect. One command starts it, and the same command updates it. Two details decide whether it is safe: where the data lives, and which ports you publish.',
		points: [
			[
				'Named volume',
				"data that must survive goes in a volume. A container's own files are thrown away when it is replaced."
			],
			['restart', 'unless-stopped brings containers back after a crash or a reboot.'],
			[
				'Service names',
				'containers reach each other by name, such as db:5432, with no published port.'
			],
			['Docker and ufw', 'published ports skip ufw rules, so bind them to 127.0.0.1.'],
			['Updates', 'pull, then up -d. Only containers whose image or config changed are replaced.']
		],
		tip: 'Publish only the port Nginx needs, and only on 127.0.0.1.',
		skip: 'uploads saved inside a container vanish on the next deploy, and a published database port is open to the internet even while ufw says it is closed.',
		code: `# compose.yaml
services:
  app:
    image: ghcr.io/me/shop:1.4
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:3000"
    volumes:
      - uploads:/app/uploads
  db:
    image: postgres:17
    restart: unless-stopped
    env_file: .env
    volumes:
      - dbdata:/var/lib/postgresql/data
volumes:
  uploads:
  dbdata:

# start, or update to a new image
docker compose pull && docker compose up -d`,
		links: [
			['Docker Compose', 'https://docs.docker.com/compose/'],
			['Volumes', 'https://docs.docker.com/engine/storage/volumes/'],
			['Docker and firewalls', 'https://docs.docker.com/engine/network/packet-filtering-firewalls/']
		],
		sketch: {
			kind: 'Skip vs set up',
			alt: 'Photos saved inside the app container are lost when a deploy replaces it. Saved in a named volume, they survive every deploy.',
			h: 205,
			nodes: [
				{ id: 'vps', label: 'Your VPS', x: 300, y: 102, w: 345, h: 196, shape: 'boundary' },
				{ id: 'you', label: 'You', x: 40, y: 72, shape: 'person' },
				{ id: 'app', label: 'App v1', x: 230, y: 55, w: 130, h: 56, fill: 'sky' },
				{
					id: 'layer',
					label: 'Photos inside\ncontainer',
					x: 230,
					y: 150,
					w: 130,
					h: 62,
					fill: 'pink'
				},
				{
					id: 'vol',
					label: 'Named\nvolume',
					x: 400,
					y: 140,
					w: 110,
					h: 80,
					shape: 'db',
					fill: 'mint'
				}
			],
			edges: [
				{ from: 'you', to: 'app', label: 'deploy' },
				{ from: 'app', to: 'layer' },
				{ from: 'app', to: 'vol' }
			],
			steps: [
				{
					title: 'Saved inside the container',
					say: 'SKIPPED: users upload photos, and the app saves them inside its own container.',
					detail:
						'Each container gets a thin writable layer on top of its image, and files the app writes land there by default. It looks like a normal folder and even survives a restart of the same container. It does not survive the container being removed and created again.',
					hide: ['vol'],
					send: [['app', 'layer']],
					light: ['layer']
				},
				{
					title: 'Container replaced',
					say: 'SKIPPED: you deploy v2. Compose replaces the old container with a fresh one.',
					detail:
						'docker compose up -d compares each running service with its config and image. When the image changes, for example from shop:1.4 to shop:1.5, Compose stops and removes the old container and creates a fresh one. The fresh one starts with only what is in the image.',
					hide: ['vol'],
					send: [['you', 'app']],
					set: { app: 'App v2' },
					light: ['app']
				},
				{
					title: 'Uploads lost',
					say: 'SKIPPED: the old container is gone, and every photo went with it.',
					detail:
						'The writable layer was deleted along with the old container, and there is no recycle bin. docker compose down does the same thing. Database files are at risk in exactly the same way if they do not live on a volume.',
					hide: ['vol'],
					set: { app: 'App v2', layer: 'Photos\ngone' },
					down: ['layer']
				},
				{
					title: 'Use a named volume',
					say: 'SET UP: the uploads folder is a named volume, which lives outside any container.',
					detail:
						'A named volume is storage that Docker manages on its own, under /var/lib/docker/volumes. The line uploads:/app/uploads mounts it into the container, so the app writes to the same path as before. The volume is only removed if you delete it on purpose, for example with docker compose down -v.',
					hide: ['layer'],
					send: [['app', 'vol']],
					light: ['vol']
				},
				{
					title: 'Reattach on deploy',
					say: 'SET UP: deploy v2. The container is replaced, and the same volume is attached to the new one.',
					detail:
						"Compose creates the new container from the new image, then mounts the same volume at the same path. The old container's writable layer is still thrown away, but nothing important lived there any more. The PostgreSQL data in dbdata is protected in the same way.",
					hide: ['layer'],
					send: [
						['you', 'app'],
						['app', 'vol']
					],
					set: { app: 'App v2' }
				},
				{
					title: 'Data outlives deploys',
					say: 'SET UP: every photo is still there, deploy after deploy.',
					detail:
						'Because the data lives outside any container, you can upgrade, roll back or rebuild containers freely. A volume still sits on the same disk as the server, though, so it is not a backup. Copy its contents off the server as well, as the backups topic shows.',
					hide: ['layer'],
					set: { app: 'App v2', vol: 'Photos\nsafe' },
					light: ['vol']
				}
			]
		}
	},
	{
		id: 'user-services',
		title: 'Services without sudo: systemd --user',
		summary:
			'The deploy user has to restart the app on every release. Giving it sudo means a stolen deploy key is a stolen server. A systemd user service lets that user manage its own app and nothing else, and lingering keeps it running from boot with nobody logged in.',
		points: [
			['User unit', 'a service file in ~/.config/systemd/user/, managed with systemctl --user.'],
			[
				'Linger',
				"loginctl enable-linger starts the user's services at boot and keeps them after logout."
			],
			['No sudo', 'the deploy user can restart its own app, and that is all.'],
			['Log in directly', 'SSH in as that user. systemctl --user often fails after su or sudo -u.'],
			['Ports', 'a normal user cannot bind ports below 1024, so keep Nginx in front.']
		],
		tip: 'Run one Linux user per app, so a bug in one app cannot read the files of another.',
		skip: 'CI logs in with a key that has full sudo. If that key leaks, the attacker owns the whole server, not just one app.',
		code: `# as an admin, once
sudo loginctl enable-linger deploy

# as deploy: ~/.config/systemd/user/app.service
[Unit]
Description=My app

[Service]
WorkingDirectory=%h/app
EnvironmentFile=%h/app/.env
ExecStart=/usr/bin/node server.js
Restart=always

[Install]
WantedBy=default.target

# still as deploy
systemctl --user daemon-reload
systemctl --user enable --now app
systemctl --user restart app   # on each deploy`,
		links: [
			[
				'loginctl enable-linger',
				'https://www.freedesktop.org/software/systemd/man/latest/loginctl.html'
			],
			[
				'User unit paths (systemd.unit)',
				'https://www.freedesktop.org/software/systemd/man/latest/systemd.unit.html'
			]
		],
		sketch: {
			kind: 'Skip vs set up',
			alt: 'A deploy key with sudo leaks and the whole server is taken. With a systemd user service, the same key can only restart one app.',
			h: 205,
			nodes: [
				{ id: 'vps', label: 'Your VPS', x: 310, y: 102, w: 330, h: 196, shape: 'boundary' },
				{ id: 'ci', label: 'CI deploy\nkey', x: 70, y: 55, w: 120, h: 62, fill: 'sky' },
				{ id: 'atk', label: 'Leaked key', x: 70, y: 155, w: 120, h: 52, fill: 'pink' },
				{ id: 'app', label: 'App\n(deploy user)', x: 245, y: 60, w: 130, h: 62, fill: 'yellow' },
				{ id: 'sys', label: 'systemd\n--user', x: 400, y: 60, w: 110, h: 62, fill: 'mint' },
				{
					id: 'root',
					label: 'Other apps\n+ root',
					x: 320,
					y: 155,
					w: 150,
					h: 62,
					fill: 'sky'
				}
			],
			edges: [
				{ from: 'ci', to: 'app', label: 'restart' },
				{ from: 'sys', to: 'app' },
				{ from: 'atk', to: 'root', dashed: true }
			],
			steps: [
				{
					title: 'CI gets full sudo',
					say: 'SKIPPED: CI deploys as a user with full sudo, just so it can restart the app.',
					detail:
						'The deploy job needs to restart the app, and sudo systemctl restart app is the quick answer. To let the script run unattended, sudo is often set up with no password (NOPASSWD). That turns the CI key into a key for the whole server.',
					hide: ['sys', 'atk'],
					send: [['ci', 'app']],
					set: { ci: 'CI key\nwith sudo' },
					light: ['app']
				},
				{
					title: 'The key leaks',
					say: 'SKIPPED: the deploy key leaks from an old laptop.',
					detail:
						'Deploy keys get copied into CI settings, laptops, backups and old scripts, and every copy is a chance to leak. Keys used by CI usually have no passphrase, so whoever holds the file can log in. You may not notice for weeks.',
					hide: ['sys'],
					set: { ci: 'CI key\nwith sudo' },
					light: ['atk']
				},
				{
					title: 'Whole server taken',
					say: 'SKIPPED: with sudo, the attacker reads every file and takes over every app on the box.',
					detail:
						"sudo runs any command as root, so the attacker can read every app's .env file, database passwords and TLS keys. They can add users, install backdoors and edit logs to hide. A key that only needed restart rights now costs every app on the box.",
					hide: ['sys'],
					send: [['atk', 'root']],
					set: { ci: 'CI key\nwith sudo', root: 'Whole server\ntaken' },
					down: ['root']
				},
				{
					title: 'Run as a user service',
					say: 'SET UP: the app is a user service. Lingering starts it at boot, with nobody logged in.',
					detail:
						"The unit file lives in ~/.config/systemd/user/, and the user's own systemd instance runs it with that user's rights. Normally that instance only runs while the user is logged in. loginctl enable-linger deploy starts it at boot and keeps it after logout.",
					hide: ['atk'],
					send: [['sys', 'app']],
					light: ['sys']
				},
				{
					title: 'Restart without sudo',
					say: 'SET UP: CI restarts it with systemctl --user. No sudo needed.',
					detail:
						"systemctl --user talks to the deploy user's own systemd, which can only manage that user's services. CI logs in as deploy and runs systemctl --user restart app, with no sudo rule at all. Log in as deploy directly, because after su or sudo -u the session settings it needs are often missing.",
					hide: ['atk'],
					send: [['ci', 'app']],
					light: ['app']
				},
				{
					title: 'Damage stays small',
					say: 'SET UP: if the key leaks now, it reaches this one app and stops there.',
					detail:
						"A leaked key now gives only the deploy user's rights: its own files and its own app. Without another bug, the attacker cannot become root, change system config or read other users' private files. With one Linux user per app, a leak costs one app instead of the server.",
					send: [['atk', 'app']],
					set: { root: 'Other apps\nuntouched' },
					light: ['root']
				}
			]
		}
	},
	{
		id: 'memory',
		part: ALIVE,
		title: 'Memory and swap',
		summary:
			'Small servers run out of memory quickly. When that happens, Linux kills a process to save itself, and the victim is often your database. Swap gives you breathing room by using disk as slow overflow.',
		points: [
			['OOM killer', 'the part of Linux that picks a process to kill when memory runs out.'],
			['Swap', 'overflow space on disk. Slow, but much better than a crash.'],
			['Limits', 'cap memory for each container, so one app cannot starve the others.'],
			['Check', 'free -h shows memory, and dmesg shows whether the OOM killer has struck.']
		],
		tip: 'If the server uses swap all the time, upgrade the plan. Swap handles spikes, not steady shortage.',
		skip: 'a traffic spike fills the memory, Linux kills your database, and the site goes down with nothing obvious in your app logs.',
		code: `sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab`,
		links: [
			[
				'Add swap on Ubuntu (DigitalOcean)',
				'https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-22-04'
			]
		],
		sketch: {
			kind: 'Skip vs set up',
			alt: 'Memory fills during a spike. Without swap, Linux kills the database. With swap, the overflow goes to disk and everything keeps running.',
			h: 185,
			nodes: [
				{ id: 'user', label: 'Traffic', x: 62, y: 45, w: 100, h: 52, fill: 'pink' },
				{ id: 'ram', label: 'RAM 1 GB\n60% used', x: 240, y: 45, w: 150, h: 62, fill: 'yellow' },
				{ id: 'swap', label: 'Swap\non disk', x: 415, y: 45, w: 110, h: 62, fill: 'mint' },
				{ id: 'app', label: 'App', x: 165, y: 145, w: 110, h: 50, fill: 'sky' },
				{ id: 'db', label: 'Database', x: 325, y: 145, w: 110, h: 50, fill: 'sky' }
			],
			edges: [
				{ from: 'user', to: 'ram' },
				{ from: 'ram', to: 'swap' },
				{ from: 'ram', to: 'app', plain: true },
				{ from: 'ram', to: 'db', plain: true }
			],
			steps: [
				{
					title: 'A normal day',
					say: 'A normal day. Memory is 60% used and everyone is happy.',
					detail:
						'Linux uses spare RAM to cache files, so free -h often shows little free memory but plenty available. The available column is the one that matters. Here the app, the database and the system share 1 GB with room to spare.',
					hide: ['swap'],
					send: [['user', 'ram']]
				},
				{
					title: 'Memory runs out',
					say: 'SKIPPED: a traffic spike pushes memory to 100%.',
					detail:
						'Every request needs some memory, and a spike means many at once. App workers grow, and each new PostgreSQL connection is its own process with its own memory. Linux drops its file cache first, and once that is gone there is nothing left to give.',
					hide: ['swap'],
					send: [['user', 'ram']],
					set: { ram: 'RAM 1 GB\n100% used' },
					light: ['ram']
				},
				{
					title: 'The OOM killer strikes',
					say: 'SKIPPED: the OOM killer picks the biggest process, and your database dies.',
					detail:
						'The out-of-memory killer scores each process mostly by how much memory it uses and kills the top one with SIGKILL, which cannot be caught or delayed. The database is often the largest process, so it is often the victim. sudo dmesg | grep -i oom shows when this happened.',
					hide: ['swap'],
					set: { ram: 'RAM 1 GB\nOOM!' },
					down: ['db']
				},
				{
					title: 'Overflow to swap',
					say: 'SET UP: with swap, the overflow moves to disk. It is slower, but nothing dies.',
					detail:
						'Swap is a file or partition where the kernel parks memory pages that have not been used recently. That frees RAM for active work. Disk is much slower than RAM, so parked pages are slow to bring back, but slow beats a dead database.',
					send: [['ram', 'swap']],
					set: { ram: 'RAM 1 GB\n100% used' },
					light: ['swap']
				},
				{
					title: 'Back to normal',
					say: 'SET UP: the spike passes, and memory recovers without an outage.',
					detail:
						"As the load drops, memory is freed, and pages in swap are read back when they are next needed. A little swap that stays in use is harmless. If swap is busy every day, the server is too small: upgrade the plan or cap each container's memory.",
					send: [['swap', 'ram']],
					set: { ram: 'RAM 1 GB\n65% used' }
				}
			]
		}
	},
	{
		id: 'backups',
		title: 'Backups, somewhere else',
		summary:
			"A VPS is one disk in someone else's building. Backups must live outside that server, ideally with another company, and they only count once you have restored from them.",
		points: [
			['Automate', 'a scheduled job, because manual backups stop happening.'],
			['Off-site', 'send copies to object storage, such as S3 or Backblaze B2.'],
			['Snapshots', 'provider snapshots are handy, but they share your account and your provider.'],
			['Test restores', 'practise on a spare server. An untested backup is only a hope.'],
			['Encrypt', 'a backup holds all your data, so protect it like the database.']
		],
		tip: 'Follow 3-2-1: three copies, on two kinds of storage, with one off-site.',
		skip: 'a failed disk, a bad command or a hacker can erase everything, permanently. Most providers do not keep backups unless you pay for them.',
		code: `#!/bin/sh
# /usr/local/bin/backup.sh
pg_dump -U app shop | gzip > /tmp/shop.sql.gz
rclone copy /tmp/shop.sql.gz b2:my-backups/
rm /tmp/shop.sql.gz

# crontab -e: every night at 02:30
30 2 * * * /usr/local/bin/backup.sh`,
		links: [
			['The 3-2-1 backup rule', 'https://www.backblaze.com/blog/the-3-2-1-backup-strategy/'],
			['pg_dump (PostgreSQL)', 'https://www.postgresql.org/docs/current/backup-dump.html'],
			['rclone', 'https://rclone.org/docs/']
		],
		sketch: {
			kind: 'Skip vs set up',
			alt: 'Without backups, a disk failure destroys all the data. With nightly off-site backups, a new server can be restored.',
			h: 200,
			nodes: [
				{ id: 'vps', label: 'Your VPS\nall your data', x: 95, y: 60, w: 150, h: 76, fill: 'sky' },
				{
					id: 'off',
					label: 'Off-site\nbackups',
					x: 390,
					y: 60,
					w: 130,
					h: 90,
					shape: 'db',
					fill: 'mint'
				},
				{ id: 'new', label: 'New VPS\nrestored', x: 240, y: 158, w: 150, h: 66, fill: 'yellow' }
			],
			edges: [
				{ from: 'vps', to: 'off', label: 'nightly' },
				{ from: 'off', to: 'new', label: 'restore', dashed: true }
			],
			steps: [
				{
					title: 'One copy only',
					say: 'SKIPPED: all your data sits on one disk, and everything seems fine.',
					detail:
						"The VPS disk is a virtual disk on the provider's storage. It may be copied inside their building, but that only guards against a broken drive. A deleted table, a ransomware attack or a closed account wipes every copy at once.",
					hide: ['off', 'new'],
					light: ['vps']
				},
				{
					title: 'Disaster strikes',
					say: 'SKIPPED: the disk fails, or someone runs the wrong command.',
					detail:
						'Hardware does fail, but so do people and software: a DROP TABLE on the wrong database, an rm -rf with a typo, a bad migration or an attacker. All of these act in seconds. A snapshot taken last month only helps a little.',
					hide: ['off', 'new'],
					down: ['vps']
				},
				{
					title: 'No way back',
					say: 'SKIPPED: years of customer data are gone for good. There is no undo.',
					detail:
						'With no copy anywhere else, there is nothing to restore from. Most providers do not back up your server unless you pay for it, and recovering data from a deleted virtual disk is rarely possible. Losing customer records can also bring legal trouble.',
					hide: ['off', 'new'],
					down: ['vps'],
					set: { vps: 'NOTHING\nLEFT' }
				},
				{
					title: 'Nightly off-site copy',
					say: 'SET UP: every night, a job copies the data to another company.',
					detail:
						'A cron entry runs the backup script at 02:30. pg_dump writes a consistent copy of the database even while it is in use, gzip shrinks it, and rclone uploads it to object storage like Backblaze B2. Keep several nights of copies, so a problem found late still has a clean backup.',
					send: [['vps', 'off']],
					hide: ['new'],
					light: ['off']
				},
				{
					title: 'Disaster again',
					say: 'SET UP: the same disaster strikes.',
					detail:
						"The disk fails or the data is deleted, exactly as before. This time last night's backup lives with another company, out of reach of whatever hit the server. Give the server storage keys that can add backups but not delete them, so a hacker cannot wipe the old ones.",
					down: ['vps'],
					hide: ['new']
				},
				{
					title: 'Restore to a new server',
					say: "SET UP: you restore last night's backup onto a new server. You lose hours, not the company.",
					detail:
						'You create a new VPS, repeat the setup steps, download the latest dump and load it with gunzip and psql. You lose only the changes since the last backup, so a nightly job means at most a day of data. Practise this once and time it, before you need it.',
					down: ['vps'],
					send: [['off', 'new']],
					light: ['new']
				}
			]
		}
	},
	{
		id: 'monitoring',
		title: 'Monitoring, logs and disk space',
		summary:
			'Nobody is watching your server unless you arrange it. You need something outside the server to check that it is up, and alerts for the slow problems, like a disk filling with logs.',
		points: [
			['Uptime check', 'an outside service that requests your site every minute and alerts you.'],
			['Resource alerts', 'warn at about 80% disk and memory, while there is still time to act.'],
			['Log rotation', 'logrotate and Docker log limits stop logs growing forever.'],
			[
				'Self-hosted',
				'tools like Uptime Kuma are good, but should not run on the server they watch.'
			]
		],
		tip: 'A monitor on the same server dies along with the server. Keep your uptime check elsewhere.',
		skip: 'you find out the site is down from an angry customer. A full disk can silently stop your database from writing.',
		code: `# how full is the disk?
df -h

# what is using it?
sudo du -h /var --max-depth=2 | sort -h | tail

# cap Docker logs in /etc/docker/daemon.json
{ "log-opts": { "max-size": "10m", "max-file": "3" } }`,
		links: [
			['Docker log limits', 'https://docs.docker.com/engine/logging/drivers/json-file/'],
			['Uptime Kuma', 'https://github.com/louislam/uptime-kuma']
		],
		sketch: {
			kind: 'Skip vs set up',
			alt: 'Logs slowly fill the disk until the database stops. With an outside monitor, you get an alert at 80 percent and fix it before anything breaks.',
			h: 195,
			nodes: [
				{ id: 'app', label: 'App logs', x: 65, y: 50, w: 110, h: 52, fill: 'sky' },
				{ id: 'disk', label: 'Disk\n40% full', x: 245, y: 50, w: 124, h: 68, fill: 'yellow' },
				{ id: 'db', label: 'Database', x: 415, y: 50, w: 104, h: 76, shape: 'db' },
				{ id: 'mon', label: 'Outside\nmonitor', x: 245, y: 150, w: 124, h: 62, fill: 'mint' },
				{ id: 'you', label: 'You', x: 425, y: 130, shape: 'person' }
			],
			edges: [
				{ from: 'app', to: 'disk' },
				{ from: 'disk', to: 'db', plain: true },
				{ from: 'mon', to: 'disk', dashed: true },
				{ from: 'mon', to: 'you', label: 'alert' }
			],
			steps: [
				{
					title: 'Logs pile up',
					say: 'SKIPPED: logs grow every day, and nobody is looking.',
					detail:
						"Every request, error and debug line is written to disk. Docker's default json-file log driver keeps container logs with no size limit, and a chatty app can write gigabytes a week. Nothing complains until the disk is nearly full.",
					hide: ['mon'],
					send: [['app', 'disk']],
					set: { disk: 'Disk\n85% full' }
				},
				{
					title: 'Disk full',
					say: 'SKIPPED: the disk reaches 100%, and the database cannot write.',
					detail:
						'With no free space, PostgreSQL cannot write its write-ahead log, the file where it records changes before applying them, so it stops and may shut down. Uploads fail, and some apps crash on start. df -h would have shown the problem days earlier.',
					hide: ['mon'],
					send: [['app', 'disk']],
					set: { disk: 'Disk\n100% full' },
					down: ['db']
				},
				{
					title: 'Found out too late',
					say: 'SKIPPED: you learn about it when a customer complains, days later.',
					detail:
						'Nothing on a fresh server sends alerts, and a monitor running on the same server would be stuck too. The outage lasts as long as it takes a person to notice, often hours or days. Lost trust is harder to get back than disk space.',
					hide: ['mon'],
					set: { disk: 'Disk\n100% full' },
					down: ['db'],
					light: ['you']
				},
				{
					title: 'Watch from outside',
					say: 'SET UP: an outside monitor checks the server all the time.',
					detail:
						'An uptime service, such as Uptime Kuma on another machine or a hosted checker, requests your site every minute over the internet. A small agent or script on the server reports disk and memory use. Because the checker lives elsewhere, it still works when your server does not.',
					send: [['mon', 'disk']],
					set: { disk: 'Disk\n80% full' },
					light: ['mon']
				},
				{
					title: 'Alert at 80%',
					say: 'SET UP: at 80% your phone buzzes, while everything still works.',
					detail:
						'A threshold around 80% leaves time to act while everything still works. Alerts should go somewhere you actually read, such as email, a chat app or a phone push. sudo du -h /var --max-depth=2 | sort -h | tail then shows what is using the space.',
					send: [['mon', 'you']],
					set: { disk: 'Disk\n80% full' },
					light: ['you']
				},
				{
					title: 'Rotate the logs',
					say: 'SET UP: log rotation is added, and the problem is gone before users ever noticed.',
					detail:
						"logrotate compresses old log files and deletes the oldest on a schedule, and Docker's max-size and max-file options cap each container at three files of 10 MB. The Docker limits only apply to containers created after the change, so recreate them once.",
					set: { disk: 'Disk\n40% full' },
					light: ['disk']
				}
			]
		}
	},
	{
		id: 'auto-deploy',
		title: 'Automatic deploys',
		summary:
			'Copying files by hand works once and fails later. A pipeline makes every deploy the same: test, build, send to the server, restart, check it is healthy.',
		points: [
			['GitHub Actions', 'runs on merge, using an SSH key stored as a secret.'],
			['A limited key', 'give CI its own deploy user, not your personal key.'],
			['Versioned images', 'tag each release so going back is one command.'],
			['Health check', 'after deploying, confirm the site answers before calling it done.']
		],
		tip: 'If only one person knows how to deploy, you do not have a deploy process yet.',
		skip: 'every release relies on memory. One forgotten step takes the site down, and there is no quick way back.',
		code: `# .github/workflows/deploy.yml (the last job)
- name: Deploy
  run: |
    ssh deploy@203.0.113.10 '
      cd app &&
      docker compose pull &&
      docker compose up -d &&
      curl -f http://127.0.0.1:3000/health
    '`,
		links: [
			['GitHub Actions', 'https://docs.github.com/en/actions'],
			['docker compose up', 'https://docs.docker.com/reference/cli/docker/compose/up/']
		],
		sketch: {
			kind: 'Skip vs set up',
			alt: 'Manual deploys are risky. An automated pipeline tests, builds and deploys to the VPS, then checks health and rolls back on failure.',
			h: 195,
			nodes: [
				{ id: 'git', label: 'Merge\nto main', x: 62, y: 50, w: 104, h: 62, fill: 'sky' },
				{ id: 'ci', label: 'Tests\n+ build', x: 240, y: 50, w: 110, h: 62, fill: 'yellow' },
				{ id: 'vps', label: 'VPS\nv1', x: 415, y: 50, w: 110, h: 62, fill: 'mint' },
				{ id: 'hand', label: 'You, by hand\nover SSH', x: 240, y: 150, w: 140, h: 62, fill: 'pink' }
			],
			edges: [
				{ from: 'git', to: 'ci' },
				{ from: 'ci', to: 'vps' },
				{ from: 'hand', to: 'vps', dashed: true }
			],
			steps: [
				{
					title: 'Deploy by hand',
					say: 'SKIPPED: you copy files to the server by hand, from memory.',
					detail:
						'You SSH in, copy or pull the code, install packages, run migrations and restart, in whatever order you remember. Each step is easy, but nothing records what was done. When one is skipped, nobody can tell which.',
					hide: ['git', 'ci'],
					send: [['hand', 'vps']],
					light: ['hand']
				},
				{
					title: 'A step is forgotten',
					say: 'SKIPPED: you forget one step, and the site breaks in production.',
					detail:
						'A missed migration, a forgotten environment variable or an old dependency can break production at once. There is no record of the last working version, so going back means guessing which files to restore. The fix happens under pressure, while the site is down.',
					hide: ['git', 'ci'],
					down: ['vps'],
					set: { vps: 'Site\nbroken' }
				},
				{
					title: 'Merge starts the pipeline',
					say: 'SET UP: merging starts the pipeline, and nothing is done by hand.',
					detail:
						'A workflow file in .github/workflows tells GitHub Actions to run on every push to main. It checks out the code on a fresh machine, so the build never depends on what happens to be on your laptop. The deploy SSH key is stored as an encrypted repository secret, not in the code.',
					hide: ['hand'],
					send: [['git', 'ci']],
					light: ['ci']
				},
				{
					title: 'Tests guard the release',
					say: 'SET UP: a failing test stops the release, long before the server is touched.',
					detail:
						'Each step in a job must exit with code 0 for the next one to run. A failing test exits with an error, so the workflow stops and GitHub notifies whoever triggered it. The server keeps running the old version, untouched.',
					hide: ['hand'],
					down: ['ci'],
					set: { ci: 'Tests\nfailed' }
				},
				{
					title: 'Pull and restart',
					say: 'SET UP: when tests pass, the server pulls the new version and restarts.',
					detail:
						'The pipeline builds an image tagged with the version, pushes it to a registry such as ghcr.io, then connects over SSH as the deploy user. docker compose pull fetches the new image, and up -d replaces only the containers that changed. The app is usually down for a few seconds while it starts.',
					hide: ['hand'],
					send: [['ci', 'vps']],
					set: { vps: 'VPS\nv2' }
				},
				{
					title: 'Check health, roll back',
					say: 'SET UP: a health check confirms it. If it fails, you go back to v1 with one command.',
					detail:
						'curl -f exits with an error if /health does not answer or returns an error status, which marks the deploy as failed. Because each release is a tagged image, going back means setting the tag to the previous version and running docker compose up -d again.',
					hide: ['hand'],
					set: { vps: 'VPS\nv2 healthy' },
					light: ['vps']
				}
			]
		}
	},
	{
		id: 'limits',
		title: 'When one VPS is not enough',
		summary:
			'One well-set-up VPS can carry a surprising amount of traffic, and it is cheap and simple. It is still a single machine, though, so plan what happens when it fails or fills up.',
		points: [
			['Single point of failure', 'if the host dies, so does everything on it.'],
			['First upgrade', 'a bigger plan is the quickest step.'],
			['Split the database', 'move it to its own server or a managed service.'],
			['Then scale out', 'add a second app server behind a load balancer.']
		],
		tip: 'Stay on one VPS until numbers say otherwise. The AWS page shows the next steps.',
		links: [
			[
				'Common server setups (DigitalOcean)',
				'https://www.digitalocean.com/community/tutorials/5-common-server-setups-for-your-web-application'
			]
		],
		sketch: {
			kind: 'Deployment diagram',
			alt: 'One VPS grows: first a bigger plan, then a separate database, then two app servers behind a load balancer.',
			h: 205,
			nodes: [
				{ id: 'lb', label: 'Load\nbalancer', x: 62, y: 100, w: 104, h: 62, fill: 'yellow' },
				{ id: 'a', label: 'VPS 1', x: 235, y: 50, w: 110, h: 56, fill: 'sky' },
				{ id: 'b', label: 'VPS 2', x: 235, y: 155, w: 110, h: 56, fill: 'sky' },
				{
					id: 'db',
					label: 'Managed\ndatabase',
					x: 410,
					y: 100,
					w: 120,
					h: 96,
					shape: 'db',
					fill: 'mint'
				}
			],
			edges: [
				{ from: 'lb', to: 'a' },
				{ from: 'lb', to: 'b' },
				{ from: 'a', to: 'db' },
				{ from: 'b', to: 'db' }
			],
			steps: [
				{
					title: 'One server for everything',
					say: 'Start here: one VPS holds the app and the database. Cheap and simple.',
					detail:
						'A single VPS with a few GB of RAM can often serve thousands of visitors a day for a typical web app. The app and database talk over localhost, so there is no network delay between them. There is only one machine to patch, back up and watch.',
					hide: ['lb', 'b', 'db'],
					set: { a: 'App + DB' },
					light: ['a']
				},
				{
					title: 'Scale up',
					say: 'It gets busy, so choose a bigger plan. Usually just a reboot away.',
					detail:
						'Moving to a plan with more CPU and RAM is called vertical scaling. The provider resizes the virtual machine, which needs a reboot and a few minutes of downtime. Some providers let a disk grow but never shrink, so a bigger disk can stop you moving back down.',
					hide: ['lb', 'b', 'db'],
					set: { a: 'Bigger VPS' },
					light: ['a']
				},
				{
					title: 'Separate the database',
					say: 'Move the database out, so the app and data can grow separately.',
					detail:
						'The database moves to its own server or to a managed service, which usually handles backups, updates and failover for you. The app now connects over a private network, which adds a little delay to every query. Each side can then be sized for its own load.',
					hide: ['lb', 'b'],
					send: [['a', 'db']],
					light: ['db']
				},
				{
					title: 'Add a load balancer',
					say: 'Add a second app server behind a load balancer.',
					detail:
						'The load balancer becomes the public address and spreads requests across both servers, often taking turns (round robin). The app must not keep sessions or uploads on its own disk, because the next request may land on the other server. Keep them in the database or object storage instead.',
					send: [
						['lb', 'a'],
						['lb', 'b']
					],
					light: ['lb', 'b']
				},
				{
					title: 'Survive a failure',
					say: 'Now one server can die and the site stays up.',
					detail:
						'The load balancer runs a health check against each server every few seconds. When VPS 1 stops answering, it is taken out of rotation and all traffic goes to VPS 2 until it recovers. The database is still a single point of failure unless the managed service keeps a standby copy.',
					down: ['a'],
					send: [
						['lb', 'b'],
						['b', 'db']
					]
				}
			]
		}
	}
];
