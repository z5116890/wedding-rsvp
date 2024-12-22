build beef image
1. docker-compose build (must be in location of docker-compose.yaml + make sure docker-compose.yaml has build section)
2. docker login
3. docker tag wedding-rsvp-wedding-rsvp-beef:latest z5116890/wedding-rsvp-wedding-rsvp-beef:latest
4. docker push z5116890/wedding-rsvp-wedding-rsvp-beef:latest

using docker swarm (for secrets). Assuming secrets are already created

1. docker swarm init
2. docker stack deploy -c docker-compose.yaml wedding (deploy)
3. docker stack rm wedding (stop)

1. cd playpen 
2. docker-compose up -d | docker stack deploy -c docker-compose.yaml wedding (using secrets)
3. docker-compose down (without resetting volume) | docker stack rm wedding
 - docker-compose down -v (resets volume -> re-create db)