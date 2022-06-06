#!/bin/sh
cd /opt
wget https://github.com/prometheus/node_exporter/releases/download/v0.18.1/node_exporter-0.18.1.linux-amd64.tar.gz
tar -xf node_exporter-0.18.1.linux-amd64.tar.gz
mv node_exporter-0.18.1.linux-amd64 node_exporter
rm -rf node_exporter-0.18.1.linux-amd64.tar.gz
cat << 'EOF' > /etc/systemd/system/node_exporter.service
[Unit]
Description=Node Exporter
Wants=network-online.target
After=network-online.target

[Service]
ExecStart=/opt/node_exporter/node_exporter

[Install]
WantedBy=default.target
EOF
sudo systemctl start node_exporter
sudo systemctl status node_exporter
sudo systemctl enable node_exporter