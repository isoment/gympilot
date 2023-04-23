# fluentd/fluentd.dockerfile

FROM fluent/fluentd:v1.14.0-1.0
USER root

# Pass in the mongo user and password so we can
# set the authentication details in fluent.conf
ENV MONGO_LOG_USER $MONGO_LOG_USER
ENV MONGO_LOG_PASSWORD $MONGO_LOG_PASSWORD

RUN apk add --update --virtual .build-deps \
  sudo build-base ruby-dev \
  && sudo gem install fluent-plugin-mongo fluent-plugin-record-modifier \
  && sudo gem sources --clear-all \
  && apk del .build-deps \
  && rm -rf /var/cache/apk/* \
USER fluent