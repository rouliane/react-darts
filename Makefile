WEB_PORT=80

export WEB_PORT
export COMPOSE_PROJECT_NAME=darts

up:
	docker-compose -f docker/docker-compose.yml up -d

down:
	docker-compose -f docker/docker-compose.yml down --volumes

connect:
	docker exec --tty -i darts-frontend /bin/bash
