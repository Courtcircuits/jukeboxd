package music

import "github.com/gofiber/fiber/v2"

type MusicController interface {
	Search() fiber.Handler
}

type MusicControllerV1 struct {
}

func (m *MusicControllerV1) Search() fiber.Handler {
	return func(c *fiber.Ctx) error {
		name := c.Query("name")
		artist := c.Query("artist")
		result := SearchMusic(name, artist)
		return c.JSON(result)
	}
}
