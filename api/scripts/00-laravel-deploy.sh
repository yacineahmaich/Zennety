#!/usr/bin/env bash
set -euo pipefail

cd /var/www/html

# richarvey/nginx-php-fpm often runs php-fpm as nginx; Debian images use www-data.
if id nginx &>/dev/null; then
  WEB_USER=nginx
else
  WEB_USER=www-data
fi

echo "Preparing storage and SQLite (required before composer: package:discover boots Laravel)..."
mkdir -p storage/logs \
  storage/framework/cache/data \
  storage/framework/sessions \
  storage/framework/views \
  bootstrap/cache \
  database
touch database/database.sqlite
chown -R "${WEB_USER}:${WEB_USER}" storage bootstrap/cache database
chmod -R ug+rwx storage bootstrap/cache database

echo "Running composer install..."
composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

echo "linking storage..."
php artisan storage:link

echo "Clearing Laravel caches (config, routes, views, application cache)..."
php artisan optimize:clear

echo "Running migrations..."
php artisan migrate --force

echo "seed database..."
php artisan db:seed --force

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache
