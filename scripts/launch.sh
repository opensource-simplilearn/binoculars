#!/bin/bash

echo "Deploying stack.."

docker-compose --env-file ./config/env.dev up -d