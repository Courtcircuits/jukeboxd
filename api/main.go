package main

import "github.com/Courtcircuits/jukeboxd/server"

func main() {
	// Create a new instance of the server
	s := server.NewServer()
	// Start the server
	s.Start()
}
