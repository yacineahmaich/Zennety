FROM richarvey/nginx-php-fpm:3.1.6

COPY . .

# Image config
ENV SKIP_COMPOSER 1
ENV WEBROOT /var/www/html/public
ENV PHP_ERRORS_STDERR 1
ENV RUN_SCRIPTS 1
ENV REAL_IP_HEADER 1
ENV PHP_MEM_LIMIT=256

# Allow composer to run as root
ENV COMPOSER_ALLOW_SUPERUSER 1

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
 && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

RUN echo 'max_execution_time = 300' > /usr/local/etc/php/conf.d/custom-timeouts.ini \
 && echo 'max_input_time = 300' >> /usr/local/etc/php/conf.d/custom-timeouts.ini

CMD ["/start.sh"]