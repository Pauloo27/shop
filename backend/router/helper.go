package router

import (
	"github.com/Pauloo27/shop/utils"
	"github.com/gofiber/fiber/v2"
)

func isAuthed(c *fiber.Ctx) bool {
	return c.Locals("user") != nil
}

func requireAuth(c *fiber.Ctx) error {
	if isAuthed(c) {
		return c.Next()
	}
	return utils.AsError(c, fiber.StatusForbidden, "Não autenticado")
}

func requireGuest(c *fiber.Ctx) error {
	if !isAuthed(c) {
		return c.Next()
	}
	return utils.AsError(c, fiber.StatusForbidden, "Já autenticado")
}
