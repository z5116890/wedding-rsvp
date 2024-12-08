#!/usr/bin/env bash

#set -x

mysql -h 127.0.0.1 -P 3306 -u root -p wedding

mysql -h"$MYSQL_HOST" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD"

for i in {30..0}; do
			if echo 'SELECT 1' | mysql -h"$MYSQL_HOST" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" &> /dev/null; then
				break
			fi
			echo 'MySQL init process in progressfefeef...'
			sleep 1
		done

mysql -h 127.0.0.1 -P 3306 -u root -p wedding

for f in /docker-entrypoint-migrations.d/migration*; do
			case "$f" in
				*.sql)    echo "$0: running $f"; mysql -h"$MYSQL_HOST" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE" < "$f"; echo ;;
				*.sql.gz) echo "$0: running $f"; gunzip -c "$f" | mysql -h"$MYSQL_HOST" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE"; echo ;;
				*)        echo "$0: ignoring $f" ;;
			esac
		echo
done
