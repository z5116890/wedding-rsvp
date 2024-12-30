build beef image
1. docker build -t z5116890/wedding-rsvp-beef:latest ./ (must be in location of beef)
4. docker push z5116890/wedding-rsvp-beef:latest

using docker swarm (for secrets). Assuming secrets are already created

1. docker swarm init
2. docker stack deploy -c docker-compose.yaml wedding (deploy)
3. docker stack rm wedding (stop)

1. cd playpen 
2. docker-compose up -d | docker stack deploy -c docker-compose.yaml wedding (using secrets)
3. docker-compose down (without resetting volume) | docker stack rm wedding
 - docker-compose down -v (resets volume -> re-create db)