# BBS System for My Home

[https://bbs.buntin.xyz](https://bbs.buntin.xyz)

## How to use

1. Clone the repo

2. create a db directory

```bash
mkdir db
```

3. create a systemd service file

```toml
[Unit]
Description=bbs-daemon for buntin-bbs service(https://bbs.buntin.xyz)
After=syslog.target network.target

[Service]
Type=simple
Restart=always
KillMode=process
WorkingDirectory=/home/buntin/bbs-daemon
ExecStart=(nodeの絶対パス) (/home/buntin/bbs-daemon/build/index.js)
User=buntin
Group=buntin
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=bbs

[Install]
WantedBy=multi-user.target
```

4. create a nginx config file

```nginx
server {
    listen 80;
    server_name bbs.buntin.xyz;
    location / {
        proxy_pass http://localhost:3001;
    }
}
```

5. start the service

```bash
systemctl status bbs
systemctl daemon-reload
systemctl start bbs
```
