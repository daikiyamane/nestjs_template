FROM node:20.16.0-bullseye-slim

WORKDIR /root/app

RUN apt update && \
    apt upgrade -y && \
    apt install -y \
    git \
    build-essential \
    libmariadb-dev \
    default-mysql-client \
    procps \
    xdg-utils && \
    apt clean

# tbls install
RUN apt install -y curl && \
    curl -L https://git.io/dpkg-i-from-url | \
    bash -s -- https://github.com/k1LoW/tbls/releases/download/v1.68.2/tbls_1.68.2-1_amd64.deb

# task install
RUN sh -c "$(curl --location https://taskfile.dev/install.sh)" -- -d -b /usr/local/bin
