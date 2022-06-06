#!/bin/bash

echo "Graceful reload of Prometheus configuration"

curl -X POST http://localhost:9090/-/reload

echo "Reload complete"