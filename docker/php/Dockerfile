FROM php:7.1-fpm-alpine

# zsh
RUN apk add zsh

# git
RUN apk add git

# pdo
RUN docker-php-ext-install pdo

# psql
RUN apk add postgresql-dev
RUN docker-php-ext-install pdo_pgsql pdo_mysql

# zip
RUN apk add libzip-dev zip unzip
RUN docker-php-ext-configure zip
RUN docker-php-ext-install zip

# gd
RUN apk add libpng libpng-dev freetype-dev
RUN docker-php-ext-configure gd --with-freetype
RUN docker-php-ext-install gd

# composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"
RUN mv composer.phar /usr/local/bin/composer

WORKDIR /app

#FROM php:8.2-fpm-alpine
#
## Install system dependencies
#RUN apk update && \
#    apk add --no-cache zsh git libpng-dev freetype-dev libjpeg-turbo-dev postgresql-dev libzip-dev zip unzip && \
#    rm -rf /var/cache/apk/*
#
## Install PHP extensions
#RUN docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/
#RUN docker-php-ext-install pdo pdo_pgsql gd zip
#
## Install Composer globally
#RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
#    php composer-setup.php --install-dir=/usr/local/bin --filename=composer && \
#    php -r "unlink('composer-setup.php');"
#
#WORKDIR /app
