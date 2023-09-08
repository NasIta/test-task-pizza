#!/bin/bash

#
#   LAUNCH ONLY IN RUNNING CONTAINER!!!
#

echo -e "\x1b[32mCreating user '${DB_USERNAME}'...\x1b[0m"

OUTPUT=$(mariadb -u root -p"${DB_PASSWORD}" -e "CREATE DATABASE IF NOT EXISTS ${DB_DATABASE}'; \
    CREATE USER IF NOT EXISTS '${DB_USERNAME}'@'%' IDENTIFIED BY '${DB_PASSWORD}'; \
    GRANT ALL PRIVILEGES ON * . * TO '${DB_USERNAME}'@'%' WITH GRANT OPTION; \
    FLUSH PRIVILEGES;")

if [ $OUTPUT == ""]; then
    echo -e '\x1b[32mDone!\x1b[0m'
else
    echo $OUTPUT
fi
