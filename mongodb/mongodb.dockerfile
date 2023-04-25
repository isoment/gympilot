FROM mongo:6.0

ENV MONGO_USER=$MONGO_INITDB_ROOT_USERNAME
ENV MONGO_PASSWORD=$MONGO_INITDB_ROOT_PASSWORD
ENV MONGO_LOG_USER=$MONGO_LOG_USER
ENV MONGO_LOG_PASSWORD=$MONGO_LOG_PASSWORD

RUN apt-get update && apt-get install -y netcat

EXPOSE 27017

# Create a database and collection for container logs if they do not exist. Create a loguser
ENTRYPOINT ["sh", "-c", "mongod --bind_ip_all --auth --logpath /var/log/mongodb/mongod.log --logappend && \
    until nc -z localhost 27017; do sleep 1; done && \
    echo \"MongoDB started\" && \
    echo \"Creating container_logs database and logs collection...\" && \
    mongosh -u $MONGO_USER -p $MONGO_PASSWORD --eval \"db = db.getSiblingDB('container_logs'); db.createCollection('logs');\" && \
    echo \"Creating loguser user with readWrite role...\" && \
    mongosh -u $MONGO_USER -p $MONGO_PASSWORD --eval \"db = db.getSiblingDB('container_logs'); db.createUser({ user: '$MONGO_LOG_USER', pwd: '$MONGO_LOG_PASSWORD', roles: [{ role: 'readWrite', db: 'container_logs' }] });\" && \
    echo \"MongoDB setup complete\""]

CMD ["mongod"]