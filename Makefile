build:
	docker build -t boardsapp:volumes .

run:
	docker run -d -p 4000:4000 -v storage:/app/data --env-file ./.env --rm --name boardsapp boardsapp:volumes

run-dev:
	docker run -d -p 4000:4000 -v "/Users/admin/Documents/rss-node/nodejs2021Q4-service:/app" -v /app/node_modules -v storage:/app/data --env-file ./.env --rm --name boardsapp boardsapp:volumes

stop:
	docker stop boardsapp
up:
	docker-compose up --build