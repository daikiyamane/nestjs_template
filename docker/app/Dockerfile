FROM node:18.13.0

WORKDIR /root/app

RUN apt update && \
	apt upgrade -y && \
	apt install -y \
	git \
	build-essential \
	libmariadb-dev \
	default-mysql-client && \
	apt clean
