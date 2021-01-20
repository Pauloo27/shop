package router

import (
	"github.com/Pauloo27/shop/controllers/auth"
	"github.com/gofiber/fiber/v2"
)

func RouteFor(app *fiber.App) {
	// Auth
	app.Post("/v1/login", auth.Login)
}
