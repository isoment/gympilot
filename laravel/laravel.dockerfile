FROM php:8.1-fpm

# Copy composer.lock and composer.json into the working directory
COPY composer.lock composer.json /var/www/html/

# Set working directory
WORKDIR /var/www/html/

# Install required software
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    zip \
    vim \
    git \
    curl

# Install phpredis using pecl
RUN pecl install redis

# Install extensions for php
RUN docker-php-ext-install pdo pdo_mysql gd
# Enable redis
RUN docker-php-ext-enable redis.so

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy existing application directory contents to the working directory
COPY . /var/www/html

# Expose port 9000 and start php-fpm server (for FastCGI Process Manager)
EXPOSE 9000
CMD ["php-fpm"]
