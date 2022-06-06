# Horus Eye Monitor

Welcome to the Horus Eye Monitor project! This is a one-stop solution to your cloud monitoring needs.
Horus Eye helps you set up Prometheus to pull metrics and visualize them using Grafana


## Overview
![Architecture Diagram](https://user-images.githubusercontent.com/77042177/160987877-927939de-6704-49f3-a6ef-010ed0613356.png)
## Getting Started

To configure the Horus Eye monitor project

Pre-requisites
- Docker Engine (version >=20.10.13)
- Docker Compose (version >=2.3.3)

Note : To install the latest version of docker-compose use the following steps
```bash
sudo curl -L https://github.com/docker/compose/releases/download/v2.5.1/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

```

## Quick start

1. Install [docker-compose](https://docs.docker.com/compose/install/) on the docker host.
2. Clone this repo on the docker host
3. Run the following command from the root of the cloned repo:


```bash
docker-compose --env-file ./config/.env.dev up -d
```

### Containers
| Service | Endpoint |
| - | - |
| [Prometheus](https://prometheus.io/docs/introduction/overview/) | `http://<host-ip>:9090` | 
| [Grafana](https://grafana.com/docs/grafana/latest/) | `http://<host-ip>:3000` |
| [Pushgateway](https://prometheus.io/docs/practices/pushing/) | `http://<host-ip>:9091` |
| [Alert Manager](https://prometheus.io/docs/alerting/latest/alertmanager/) | `http://<host-ip>:9093` |
| [Node Exporter](https://prometheus.io/docs/guides/node-exporter/) | `http://<host-ip>:9100` |
| [Blackbox Exporter](https://github.com/prometheus/blackbox_exporter) | `http://<host-ip>:9115` |
| [cAdvisor](https://github.com/google/cadvisor) | `http://<host-ip>:8080` |

### Volumes

The app creates the following named volumes (one for each service) so data is not lost when the app is stopped:

* grafana-storage
* alertmanager-storage
* prometheus-storage

## Grafana

### Accessing Grafana

The Grafana console is available at `<host-ip>`:3000

To login use the default credentials :-
```
username : admin
password : admin
```

After this, you can set your new password.

### Data sources

Navigate to Configuration > Data Sources

The Prometheus container registered at `<host-ip>`:9090 will be added as a data source.

To add additional datasources refer the official documentation :

https://grafana.com/docs/grafana/latest/datasources/


### Dashboards

You can create a dashboard in Grafana by manually configuring the dashboards while logged into the console. Grafana saves the json configuration of the dashboard to this disk. 

Using this project the configuration of dashboards can be stored in the repository and Grafana will use the static configuration files to display the dashboards.
To add new dashboards, add the json configuration of the dashboard to /grafana/dashboard/`<folder>`

Additionally, Grafana has a wide marketplace of dashboards which can be directly imported using the dashboard ID.

https://grafana.com/grafana/dashboards/


## Prometheus

### Accessing Prometheus

The Prometheus console is available at `<host-ip>`:9090

The scraper configuration is part of the project placed at /prometheus/config/prometheus/prometheus.dev.yml

Refer to the documentation to setup your Prometheus server

https://prometheus.io/docs/prometheus/latest/configuration/configuration/

### Visualizing metrics from Prometheus 

Grafana supports dashboards with Prometheus as the datasource. You can add one or more Prometheus servers as a datasource

Refer documentation :
https://grafana.com/docs/grafana/latest/datasources/prometheus/

The Grafana marketplace has multiple dashboards based on the data pushed to Prometheus

Refer documentation :
https://grafana.com/grafana/dashboards/?dataSource=prometheus

### Push Gateway

The Push Gateway enables applications to "push" data to Prometheus as compared to its default pull-based scraping mechanism. The Push Gateway exists as a intermediate cache, to which applications can push the data. The Prometheus will then scrape the metrics from the Push Gateway.

The Push Gateway endpoint is available at `<host-ip>`:9091

Refer documentation :
https://prometheus.io/docs/practices/pushing/

### Alert Manager

The Alert Manager application handles alerts sent by the Prometheus server. Combining the metrics ingested by the Prometheus server along with rules, you can raise alerts and route them to integrations like Email, SMS or PagerDuty.

The configuration for the alert manager is part of the project placed at /alertmanager/config/config.dev.yml

Refer documentation :
https://prometheus.io/docs/alerting/latest/alertmanager/

## Exporters

There are a number of libraries and servers which help in exporting existing metrics from third-party systems as Prometheus metrics. Some of these exporters are maintained as part of the official Prometheus GitHub organization, those are marked as official, others are externally contributed and maintained.

Extensive list of exporters :

https://prometheus.io/docs/instrumenting/exporters/

### Node Exporter

The node exporter is used to expose hardware and OS metrics exposed by *NIX Kernels. This can be deployed across your fleet of servers and used to collect useful system metrics.

https://github.com/prometheus/node_exporter

If you have installed the node exporter on your servers, you can configure it to be scraped using the configuration file /prometheus/config/node-exporter-targets/node-exporter-targets.dev.yml

### Blackbox Exporter

The blackbox exporter allows blackbox probing of endpoints over HTTP, HTTPS, DNS, TCP, ICMP and gRPC.

To monitor a list of endpoints add them to the configuration file /prometheus/config/blackbox-targets/blackbox-targets.dev.yml

https://github.com/prometheus/blackbox_exporter


## cAdvisor

cAdvisor (Container Advisor) provides container users an understanding of the resource usage and performance characteristics of their running containers. It is a running daemon that collects, aggregates, processes, and exports information about running containers

https://github.com/google/cadvisor