FROM php:8.2-apache

# Install ekstensi PDO dan PDO MySQL
RUN docker-php-ext-install pdo pdo_mysql

# (opsional) set working dir
WORKDIR /var/www/html

# Copy source code ke dalam image agar file PHP/HTML tersedia di server
COPY . /var/www/html
