FROM php:8.2-fpm

# Instalar dependencias y extensiones PHP en un solo RUN (mejora el caching de capas)
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip supervisor nginx libzip-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd sockets zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Configuración PHP (development + ajustes)
RUN mv "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini" && \
    { \
        echo 'upload_max_filesize = 50M'; \
        echo 'post_max_size = 50M'; \
        echo 'memory_limit = 256M'; \
    } >> "$PHP_INI_DIR/php.ini"

# Configuración PHP-FPM (socket Unix)
RUN { \
        echo 'listen = /run/php/php-fpm.sock'; \
        echo 'listen.owner = www-data'; \
        echo 'listen.group = www-data'; \
        echo 'listen.mode = 0666'; \
    } > /usr/local/etc/php-fpm.d/zz-docker.conf

# Directorios y permisos esenciales
RUN mkdir -p /run/php /var/log/supervisor /var/lib/php/sessions && \
    chown -R www-data:www-data /run/php /var/lib/php/sessions && \
    chmod 777 /var/lib/php/sessions

# Composer y workspace
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
WORKDIR /var/www/html

# Configuraciones externas (sin cambios)
COPY nginx.conf /etc/nginx/sites-available/default
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Permisos para Laravel (opcional, solo si usas Laravel)
RUN mkdir -p storage/framework/{sessions,views,cache} bootstrap/cache && \
    chown -R www-data:www-data storage bootstrap/cache && \
    chmod -R 775 storage bootstrap/cache

EXPOSE 80
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
