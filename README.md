# OpenLibrum

OpenLibrum is your free and open source library software. It supports all the features needed for library management
including media checkout and tracking, creating collections, scanning and generating barcodes and much more all with
a simple modern UI. It comes with a docker container setup for easy development and deployment. The backend API uses
Laravel and the frontent is built with Vue 3 and Typescript. There is an extensive automated test suite as well.

## Development

Before bringing up the containers create the necessary environment files in the project root and the vue and laravel directories. There are example files included. Then to bring the containers up for development run...

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
