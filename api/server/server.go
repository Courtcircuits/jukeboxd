package server

import (
	"log"

	"github.com/Courtcircuits/jukeboxd/domains/music"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type Server struct {
	listenAddr string
	app        *fiber.App
}

func NewServer() *Server {
	return &Server{
		listenAddr: ":8080",
		app:        fiber.New(),
	}
}

func (s *Server) Start() {
	s.app.Get("/", func(c *fiber.Ctx) error {

		return c.SendString("Hello, World! Don't fool me twice!")
	})

	s.app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
	}))

	protected := s.app.Group("/api", AuthMiddleware)

	music.SubscribeRoutes(&protected, &music.MusicControllerV1{})

	log.Fatal(s.app.Listen(s.listenAddr))
}
