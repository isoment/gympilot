# OpenLibrum

OpenLibrum is your free and open source library software. It supports all the features needed for library management
including media checkout and tracking, creating collections, scanning and generating barcodes and much more all with
a simple modern UI. It comes with a docker container setup for easy development and deployment. The backend is built
in PHP with Laravel and the frontent is built with Vue 3 and Typescript.

## Development

For development run...

```
docker-compose up -d --build
```

## Logging

The logs from all of the service containers are collected by fluentd and saved in a mongodb
database. By default they are saved in the "admin" database in the "logs" collection. You can
use a GUI client or get to a mongosh as follows...

```
# Log into mongo as root user
docker exec -it mongodb mongosh -u root

# Switch to the admin database
use admin

# List the log entries
db.logs.find()
```

You can use mongodb queries to further filter down the logs. For instance we can filter by container name...

```
db.logs.find({"container_name: "/laravel"})
```
