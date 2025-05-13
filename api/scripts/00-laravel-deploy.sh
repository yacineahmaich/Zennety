#!/usr/bin/env bash
echo "Running composer"
composer global require hirak/prestissimo
composer install --no-dev --working-dir=/var/www/html

# Give permissions to storage and cache
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Create SQLite file if it doesn't exist
if [ ! -f /data/database.sqlite ]; then
    touch /data/database.sqlite
    chmod 666 /data/database.sqlite
fi

echo "linking storage..."
php artisan storage:link

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Running migrations..."
php artisan migrate

echo "seed database..."
php artisan db:seed