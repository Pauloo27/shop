package utils

import "github.com/gofiber/fiber/v2"

func AsError(c *fiber.Ctx, status int, msg string) error {
	c.Response().SetStatusCode(status)
	return c.JSON(fiber.Map{"error": msg})
}
