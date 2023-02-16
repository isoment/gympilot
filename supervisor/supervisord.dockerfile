ARG PHP_VERSION
FROM php:$PHP_VERSION-cli

ENV APP_ROOT $APP_ROOT
ENV QUEUE_DRIVER $QUEUE_DRIVER
ENV NUM_PROCS $NUM_PROCS
ENV OPTIONS $OPTIONS

ADD conf/supervisord.conf /etc

RUN docker-php-ext-install pdo_mysql \
    && docker-php-ext-install bcmath \
    && apt-get update \ 
    && apt-get install -y --no-install-recommends procps supervisor

CMD ["supervisord", "-c", "/etc/supervisord.conf"]