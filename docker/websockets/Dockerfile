FROM php:8.2-cli-alpine

WORKDIR /var/www/html

# Install dependencies
RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    libzip-dev \
    zip \
    unzip \
    supervisor

# Install PHP extensions
RUN docker-php-ext-install \
    pdo_mysql \
    pcntl \
    bcmath \
    zip

# Install Redis extension
RUN pecl install redis && docker-php-ext-enable redis

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Expose the Reverb port
EXPOSE 6001

# Iniciar el servidor Reverb
CMD ["php", "artisan", "reverb:start", "--host=0.0.0.0"]