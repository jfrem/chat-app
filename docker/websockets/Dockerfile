FROM php:8.2-cli-alpine

WORKDIR /app

# Install dependencies
RUN apk add --no-cache \
    libzip-dev \
    zip \
    unzip \
    supervisor

# Install PHP extensions
RUN docker-php-ext-install \
    pdo_mysql \
    zip

# Get Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Create directory structure
RUN mkdir -p /app

# Copy application files
COPY . /app

# Expose the Reverb port
EXPOSE 6001

# Start Reverb server
CMD ["php", "artisan", "reverb:start"]