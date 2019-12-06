.PHONY: $(MAKECMDGOALS)

# `make setup` will be used after cloning or downloading to fulfill
# dependencies, and setup the the project in an initial state.
# This is where you might download rubygems, node_modules, packages,
# compile code, build container images, initialize a database,
# anything else that needs to happen before your server is started
# for the first time
setup: install local-ddb


# `make test` will be used after `make setup` in order to run
# your test suite.
test: clean start-node local-ddb run-test clean

# `make server` will be used after `make setup` in order to start
# an http server process that listens on any unreserved port
#	of your choice (e.g. 8080). 
server: ;@echo "Starting Server..."; \
	npm run build; \
	node src/server &

local-ddb: ;@echo "Starting database"; \
	npm run localdb:start; \
	node config/create-local-table; \

start-node: ;node src/server &

install: ;@echo "Installing packages"; \
	npm install;

clean: stop-local-db stop-server

stop-local-db: ;@echo "Stopping local dynamo..."; \
	DYNAMO_PID=`ps -ax | grep ./DynamoDBLocal.jar | grep -v grep | awk '{print $$1}'`; \
	[[ ! -z $$DYNAMO_PID ]] && kill -9 $$DYNAMO_PID; \
	rm -rf lib/dynamodb_local_latest/shared-local-instance.db; \

stop-server: ;@echo "Stopping server..."; \
	SERVER_PID=`ps -ax | grep src/server | grep -v grep | awk '{print $$1}'`; \
	[[ ! -z $$SERVER_PID ]] && kill -9 $$SERVER_PID || echo "SERVER IS NOT RUNNING"; \

run-test: ; export CI=true; npm test