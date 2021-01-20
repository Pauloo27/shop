package router

import "github.com/gofiber/fiber/v2"

func RouteFor(app *fiber.App) {
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello World")
	})
}
