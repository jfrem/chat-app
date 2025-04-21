#!/bin/bash

echo "===================================================="
echo "Iniciando la instalación de tu backend para ChatApp"
echo "===================================================="

echo "Levantando los contenedores Docker..."
docker-compose up -d

echo "Esperando a que los servicios estén disponibles..."
sleep 10

echo "Instalando Laravel en el contenedor backend..."
docker-compose exec backend bash -c "cd /var/www/html && composer create-project laravel/laravel laravel"

echo "Configurando Laravel..."
docker-compose exec backend bash -c "cd /var/www/html/laravel && composer require laravel/ui pusher/pusher-php-server predis/predis"
docker-compose exec backend bash -c "cd /var/www/html/laravel && php artisan ui vue --auth"
docker-compose exec backend bash -c "cd /var/www/html/laravel && php artisan key:generate"

echo "Estableciendo permisos adecuados..."
docker-compose exec backend bash -c "chown -R www-data:www-data /var/www/html/laravel/storage /var/www/html/laravel/bootstrap/cache"
docker-compose exec backend bash -c "chmod -R 775 /var/www/html/laravel/storage /var/www/html/laravel/bootstrap/cache"

echo "Ejecutando migraciones de la base de datos..."
docker-compose exec backend bash -c "cd /var/www/html/laravel && php artisan migrate --seed"

echo "Reiniciando los servicios..."
docker-compose restart backend

echo "===================================================="
echo "¡Instalación completada!"
echo "Tu backend para ChatApp está disponible en: http://localhost:9000"
echo "===================================================="

echo "Verificando el estado de los servicios:"
docker-compose ps