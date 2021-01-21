package router

import (
	"github.com/Pauloo27/shop/utils"
	jwt "github.com/form3tech-oss/jwt-go"
	"github.com/gofiber/fiber/v2"
)

func isAuthed(c *fiber.Ctx) bool {
	return c.Locals("user") != nil
}

func requireAuth(c *fiber.Ctx) error {
	if isAuthed(c) {
		user := c.Locals("user").(*jwt.Token)
		claims := user.Claims.(jwt.MapClaims)
		c.Locals("user_name", claims["name"].(string))
		c.Locals("user_admin", claims["admin"].(bool))
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

func requireAdmin(c *fiber.Ctx) error {
	if c.Locals("user_admin").(bool) {
		return c.Next()
	}
	return utils.AsError(c, fiber.StatusForbidden, "Permissão insuficiente")
}
