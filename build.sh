#!/bin/bash

# docker buildx create --use --name dockerbuilder --driver docker-container
# docker buildx inspect dockerbuilder --bootstrap

docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t fredlackey/flowroute-proxy:latest -t fredlackey/flowroute-proxy:1.0.4 --push -f ./Dockerfile .
