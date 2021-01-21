package router

import (
	"github.com/Pauloo27/shop/controllers/auth"
	"github.com/Pauloo27/shop/controllers/products"
	"github.com/Pauloo27/shop/controllers/sales"
	"github.com/Pauloo27/shop/controllers/users"
	"github.com/gofiber/fiber/v2"
)

func RouteFor(app *fiber.App) {
	// Auth
	app.Post("/v1/login", requireGuest, auth.Login)
	app.Post("/v1/register", requireAuth, requireAdmin, auth.Register)

	// User
	app.Put("/v1/users/", requireAuth, users.Update)
	app.Put("/v1/users/:id", requireAuth, requireAdmin, users.UpdateOther)

	// Product
	app.Post("/v1/products/", requireAuth, requireAdmin, products.Store)
	app.Delete("/v1/products/:id", requireAuth, requireAdmin, products.Delete)
	app.Get("/v1/products/", requireAuth, products.Index)
	app.Put("/v1/products/:id", requireAuth, requireAdmin, products.Update)

	// Sale
	app.Post("/v1/sales/", requireAuth, sales.Store)
	//app.Get("/v1/sales/", requireAuth, requireAdmin, sales.Index)
}
