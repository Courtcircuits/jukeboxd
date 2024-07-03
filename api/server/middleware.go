package server

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/Courtcircuits/jukeboxd/utils"
	"github.com/gofiber/fiber/v2"
)

func AuthMiddleware(c *fiber.Ctx) error {
	pocketbase := utils.Get("POCKETBASE")
	bearer := c.Request().Header.Peek("Authorization")
	if len(bearer) == 0 {
		return c.Status(400).SendString("Missing Authorization header")
	}
	id := strings.Split(string(bearer), " ")[1]
	filter := fmt.Sprintf("(id=%q)", &id)
	resp, err := http.Get(pocketbase + "/collections/user/records?filter=" + filter)
	if err != nil {
		return c.Status(401).SendString("Not authenticated")
	}
	fmt.Printf("Auth middleware : %q \n", resp)
	return c.Next()
}
