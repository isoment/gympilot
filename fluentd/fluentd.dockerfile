# fluentd/fluentd.dockerfile

FROM fluent/fluentd:v1.14.0-debian-1.0
USER root
RUN ["gem", "install", "fluent-plugin-elasticsearch", "--no-document"]
USER fluent