run:
	go run server.go
 
clean:
	go clean

setup:
	go get
	go generate ./...