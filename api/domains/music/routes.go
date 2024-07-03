package music

import "github.com/gofiber/fiber/v2"

func SubscribeRoutes(app *fiber.Router, controller MusicController) {
	(*app).Get("/search", controller.Search())
}
