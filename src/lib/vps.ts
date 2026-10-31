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
					say: 'You pay, and within a minute you get an empty server with a public IP.',
					light: ['a']
				},
				{
					say: 'First the security work: patch it, lock the login, close the ports.',
					send: [
						['a', 'b'],
						['b', 'c'],
						['c', 'd']
					],
					light: ['b', 'c', 'd']
				},
				{
					say: 'Only then does your app go on, followed by a domain and HTTPS.',
					send: [
						['d', 'e'],
						['e', 'f']
					],
					light: ['e', 'f']
				},
				{
					say: 'Backups and monitoring are what save you on your worst day.',
					send: [
						['f', 'g'],
						['g', 'h']
					],
					light: ['g', 'h']
				},
				{
					say: 'Now it is really live. Each step below shows what happens if you skip it.',
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
					say: 'You connect for the first time. The server works, so it feels finished.',
					send: [['you', 'vps']],
					hide: ['fix'],
					light: ['vps']
				},
				{
					say: 'SKIPPED: bots find your new IP and try a known bug in an old package.',
					send: [['bot', 'vps']],
					hide: ['fix'],
					light: ['bot']
				},
				{
					say: 'SKIPPED: it works. They are in, and your server now mines crypto or sends spam.',
					hide: ['fix'],
					down: ['vps'],
					set: { vps: 'HACKED' }
				},
				{
					say: 'SET UP: apt upgrade installs the fixes before anything else goes on the server.',
					send: [['fix', 'vps']],
					set: { vps: 'New VPS\npatched' },
					light: ['fix']
				},
				{
					say: 'SET UP: the same attack now fails, and automatic updates keep it that way.',
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
					say: 'SKIPPED: root can log in with a password, and bots try thousands of them.',
					send: [['bot', 'door']],
					light: ['door']
				},
				{
					say: 'SKIPPED: one guess works. Root can read, change or delete everything.',
					send: [
						['bot', 'door'],
						['door', 'vps']
					],
					down: ['vps'],
					set: { vps: 'HACKED' }
				},
				{
					say: 'SET UP: root login is off, and you work as a normal user.',
					set: { door: 'SSH login\nno root' },
					light: ['door']
				},
				{
					say: 'SET UP: passwords are off too. Your private key opens the door.',
					send: [
						['you', 'door'],
						['door', 'vps']
					],
					set: { door: 'SSH login\nkeys only' }
				},
				{
					say: 'SET UP: bots have nothing to guess, so every attempt is refused.',
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
					say: 'SKIPPED: with no firewall, every listening port faces the internet.',
					hide: ['fw'],
					light: ['app', 'db']
				},
				{
					say: 'SKIPPED: scanners find your database and start attacking it directly.',
					hide: ['fw'],
					send: [
						['bot', 'db'],
						['bot', 'app']
					],
					light: ['db']
				},
				{
					say: 'SET UP: UFW now stands in front. Everything is denied unless you allow it.',
					light: ['fw']
				},
				{
					say: 'SET UP: web traffic and SSH pass through as planned.',
					send: [
						['fw', 'web'],
						['fw', 'ssh']
					],
					light: ['web', 'ssh']
				},
				{
					say: 'SET UP: probes for anything else stop at the wall.',
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
					say: 'SKIPPED: the attacker keeps trying, and nothing ever stops them.',
					send: [
						['bot', 'ssh'],
						['ssh', 'log']
					],
					hide: ['f2b', 'ban'],
					set: { log: 'auth.log\n50,000 failures' },
					light: ['log']
				},
				{
					say: 'SET UP: Fail2ban reads every failure in the log.',
					send: [
						['bot', 'ssh'],
						['log', 'f2b']
					],
					hide: ['ban'],
					set: { log: 'auth.log\n5 failures' },
					light: ['f2b']
				},
				{
					say: 'SET UP: too many failures, so it adds a ban to the firewall.',
					send: [['f2b', 'ban']],
					set: { log: 'auth.log\n5 failures' },
					light: ['ban']
				},
				{
					say: 'SET UP: that address is now blocked before it reaches SSH.',
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
					say: 'SKIPPED: a visitor types example.com, and DNS has no answer.',
					send: [['user', 'dns']],
					down: ['dns']
				},
				{
					say: 'SKIPPED: the browser says "site can\'t be reached". You are live, but nobody can find you.',
					down: ['dns', 'user']
				},
				{
					say: 'SET UP: you add an A record at your registrar.',
					set: { dns: 'DNS\nA 203.0.113.10' },
					light: ['dns']
				},
				{
					say: 'SET UP: DNS answers with the IP address.',
					send: [['user', 'dns']],
					set: { dns: 'DNS\nA 203.0.113.10' }
				},
				{
					say: 'SET UP: the browser connects to your server by name.',
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
					say: 'SKIPPED: you start the app by hand in SSH. The site works, for now.',
					hide: ['sd'],
					send: [
						['ssh', 'app'],
						['user', 'app']
					]
				},
				{
					say: 'SKIPPED: you close your laptop. The session ends and the app ends with it.',
					hide: ['sd'],
					down: ['ssh', 'app']
				},
				{
					say: 'SKIPPED: visitors see an error, and nobody tells you.',
					hide: ['sd'],
					down: ['ssh', 'app'],
					send: [['user', 'app']]
				},
				{
					say: 'SET UP: systemd starts the app, and your SSH session no longer matters.',
					hide: ['ssh'],
					send: [['sd', 'app']],
					light: ['sd']
				},
				{
					say: 'SET UP: the app crashes at 3am. systemd restarts it in seconds.',
					hide: ['ssh'],
					down: ['app'],
					set: { app: 'Crashed!' }
				},
				{
					say: 'SET UP: running again, and it also survives a full server reboot.',
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
					say: 'SKIPPED: the app faces the internet by itself, as example.com:3000.',
					hide: ['ngx', 'b'],
					send: [['user', 'a']],
					light: ['a']
				},
				{
					say: 'SKIPPED: there is no room for a second site, and no good place for HTTPS.',
					hide: ['ngx', 'b'],
					light: ['a'],
					down: ['user']
				},
				{
					say: 'SET UP: Nginx takes the public ports. The app moves to a private one.',
					send: [['user', 'ngx']],
					hide: ['b'],
					light: ['ngx']
				},
				{
					say: 'SET UP: Nginx passes each request to the app and returns the answer.',
					send: [['ngx', 'a']],
					hide: ['b']
				},
				{
					say: 'SET UP: a second site on the same server gets routed by its domain name.',
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
					say: 'SKIPPED: the site runs on plain HTTP, and the browser warns "Not secure".',
					hide: ['le'],
					light: ['user']
				},
				{
					say: 'SKIPPED: you log in, and the password crosses the network as readable text.',
					hide: ['le'],
					send: [
						['user', 'vps'],
						['user', 'wifi']
					]
				},
				{
					say: 'SKIPPED: anyone on the same network can read it.',
					hide: ['le'],
					light: ['wifi'],
					set: { wifi: 'password:\nhunter2' }
				},
				{
					say: 'SET UP: Certbot proves you own the domain and gets a free certificate.',
					send: [['le', 'vps']],
					light: ['le']
				},
				{
					say: 'SET UP: now everything is encrypted, and the browser shows a padlock.',
					send: [['user', 'vps']],
					set: { user: 'Browser\nSecure' }
				},
				{
					say: 'SET UP: the Wi-Fi snooper sees only scrambled data.',
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
					say: 'SKIPPED: the database port was published to the internet to make testing easier.',
					light: ['db']
				},
				{
					say: 'SKIPPED: a scanner finds it and tries weak passwords.',
					send: [['bot', 'db']],
					light: ['bot']
				},
				{
					say: 'SKIPPED: your data is copied and deleted, and a ransom note is left in its place.',
					down: ['db'],
					set: { db: 'PAY US\nBITCOIN' }
				},
				{
					say: 'SET UP: the database now listens on localhost only.',
					set: { db: 'Database\nlocalhost' },
					light: ['db']
				},
				{
					say: 'SET UP: your app is on the same machine, so it connects as normal.',
					send: [['app', 'db']],
					set: { db: 'Database\nlocalhost' }
				},
				{
					say: 'SET UP: from the internet, the port does not exist.',
					send: [['bot', 'vps']],
					set: { db: 'Database\nlocalhost' },
					down: ['bot']
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
					say: 'A normal day. Memory is 60% used and everyone is happy.',
					hide: ['swap'],
					send: [['user', 'ram']]
				},
				{
					say: 'SKIPPED: a traffic spike pushes memory to 100%.',
					hide: ['swap'],
					send: [['user', 'ram']],
					set: { ram: 'RAM 1 GB\n100% used' },
					light: ['ram']
				},
				{
					say: 'SKIPPED: the OOM killer picks the biggest process, and your database dies.',
					hide: ['swap'],
					set: { ram: 'RAM 1 GB\nOOM!' },
					down: ['db']
				},
				{
					say: 'SET UP: with swap, the overflow moves to disk. It is slower, but nothing dies.',
					send: [['ram', 'swap']],
					set: { ram: 'RAM 1 GB\n100% used' },
					light: ['swap']
				},
				{
					say: 'SET UP: the spike passes, and memory recovers without an outage.',
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
					say: 'SKIPPED: all your data sits on one disk, and everything seems fine.',
					hide: ['off', 'new'],
					light: ['vps']
				},
				{
					say: 'SKIPPED: the disk fails, or someone runs the wrong command.',
					hide: ['off', 'new'],
					down: ['vps']
				},
				{
					say: 'SKIPPED: years of customer data are gone for good. There is no undo.',
					hide: ['off', 'new'],
					down: ['vps'],
					set: { vps: 'NOTHING\nLEFT' }
				},
				{
					say: 'SET UP: every night, a job copies the data to another company.',
					send: [['vps', 'off']],
					hide: ['new'],
					light: ['off']
				},
				{ say: 'SET UP: the same disaster strikes.', down: ['vps'], hide: ['new'] },
				{
					say: "SET UP: you restore last night's backup onto a new server. You lose hours, not the company.",
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
					say: 'SKIPPED: logs grow every day, and nobody is looking.',
					hide: ['mon'],
					send: [['app', 'disk']],
					set: { disk: 'Disk\n85% full' }
				},
				{
					say: 'SKIPPED: the disk reaches 100%, and the database cannot write.',
					hide: ['mon'],
					send: [['app', 'disk']],
					set: { disk: 'Disk\n100% full' },
					down: ['db']
				},
				{
					say: 'SKIPPED: you learn about it when a customer complains, days later.',
					hide: ['mon'],
					set: { disk: 'Disk\n100% full' },
					down: ['db'],
					light: ['you']
				},
				{
					say: 'SET UP: an outside monitor checks the server all the time.',
					send: [['mon', 'disk']],
					set: { disk: 'Disk\n80% full' },
					light: ['mon']
				},
				{
					say: 'SET UP: at 80% your phone buzzes, while everything still works.',
					send: [['mon', 'you']],
					set: { disk: 'Disk\n80% full' },
					light: ['you']
				},
				{
					say: 'SET UP: log rotation is added, and the problem is gone before users ever noticed.',
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
					say: 'SKIPPED: you copy files to the server by hand, from memory.',
					hide: ['git', 'ci'],
					send: [['hand', 'vps']],
					light: ['hand']
				},
				{
					say: 'SKIPPED: you forget one step, and the site breaks in production.',
					hide: ['git', 'ci'],
					down: ['vps'],
					set: { vps: 'Site\nbroken' }
				},
				{
					say: 'SET UP: merging starts the pipeline, and nothing is done by hand.',
					hide: ['hand'],
					send: [['git', 'ci']],
					light: ['ci']
				},
				{
					say: 'SET UP: a failing test stops the release, long before the server is touched.',
					hide: ['hand'],
					down: ['ci'],
					set: { ci: 'Tests\nfailed' }
				},
				{
					say: 'SET UP: when tests pass, the server pulls the new version and restarts.',
					hide: ['hand'],
					send: [['ci', 'vps']],
					set: { vps: 'VPS\nv2' }
				},
				{
					say: 'SET UP: a health check confirms it. If it fails, you go back to v1 with one command.',
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
					say: 'Start here: one VPS holds the app and the database. Cheap and simple.',
					hide: ['lb', 'b', 'db'],
					set: { a: 'App + DB' },
					light: ['a']
				},
				{
					say: 'It gets busy, so choose a bigger plan. Usually just a reboot away.',
					hide: ['lb', 'b', 'db'],
					set: { a: 'Bigger VPS' },
					light: ['a']
				},
				{
					say: 'Move the database out, so the app and data can grow separately.',
					hide: ['lb', 'b'],
					send: [['a', 'db']],
					light: ['db']
				},
				{
					say: 'Add a second app server behind a load balancer.',
					send: [
						['lb', 'a'],
						['lb', 'b']
					],
					light: ['lb', 'b']
				},
				{
					say: 'Now one server can die and the site stays up.',
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
