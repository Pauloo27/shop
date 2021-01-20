build:
	go build -v

run: build
	./shop
	
# (build but with a smaller binary)
dist:
	go build -ldflags="-w -s" -gcflags=all=-l -v
