#!/bin/bash
set -e

# Check if SSL certificates exist
if [ ! -f /etc/nginx/ssl/fullchain.pem ] || [ ! -f /etc/nginx/ssl/privkey.pem ]; then
    echo "SSL certificates not found, creating self-signed certificates..."
    
    # Create self-signed certificates for development
    mkdir -p /etc/nginx/ssl
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout /etc/nginx/ssl/privkey.pem \
        -out /etc/nginx/ssl/fullchain.pem \
        -subj "/C=US/ST=State/L=City/O=Organization/CN=chat.example.com"
    
    echo "Self-signed certificates created."
fi

# Set up cron job for certificate renewal
if [ ! -f /etc/cron.d/certbot-renew ]; then
    echo "Setting up certbot renewal cron job..."
    echo "0 3 * * * root certbot renew --quiet --deploy-hook 'nginx -s reload'" > /etc/cron.d/certbot-renew
    chmod 0644 /etc/cron.d/certbot-renew
    crontab /etc/cron.d/certbot-renew
fi

# Start crond in background
echo "Starting cron daemon..."
crond -b

# Execute CMD
echo "Starting Nginx..."
exec "$@"