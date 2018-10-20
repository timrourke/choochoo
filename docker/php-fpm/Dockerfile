FROM php:7.2.9-fpm-alpine

WORKDIR /var/www/api

RUN echo "PS1='\w\$ '" >> ~/.bashrc

RUN apk update && apk add \
    bash \
    mysql \
    zlib-dev \
	$PHPIZE_DEPS

RUN pecl install xdebug-2.6.0

RUN docker-php-ext-install \
    pdo_mysql \
    zip

RUN docker-php-ext-enable \
    pdo_mysql \
	xdebug

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php -r "if (hash_file('SHA384', 'composer-setup.php') === '93b54496392c062774670ac18b134c3b3a95e5a5e5c8f1a9f115f203b75bf9a129d5daa8ba6a13e2cc8a1da0806388a8') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" && \
    php composer-setup.php && \
    php -r "unlink('composer-setup.php');" && \
    mv composer.phar /usr/local/bin/composer

ADD symfony.ini /usr/local/etc/php/conf.d/symfony.ini
ADD symfony.ini /usr/local/etc/php-fpm.d/symfony.ini
ADD symfony.pool.conf /usr/local/etc/php-fpm.d/symfony.pool.conf
