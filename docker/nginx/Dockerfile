FROM nginx:stable-alpine

# Add Bash for entrypoint script
RUN apk add --no-cache bash

# Set working directory
WORKDIR /var/www/html

# Copy configuration
COPY ./conf.d /etc/nginx/conf.d/

# Create log directories
RUN mkdir -p /var/log/nginx

# Standard HTTP/HTTPS ports exposure
EXPOSE 80
EXPOSE 443

# Use custom CMD with health check
CMD ["nginx", "-g", "daemon off;"]