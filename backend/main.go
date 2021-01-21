package main

import (
	"fmt"
	"os"

	"github.com/Pauloo27/shop/db"
	"github.com/Pauloo27/shop/router"
	"github.com/Pauloo27/shop/utils"
	"github.com/gofiber/fiber/v2"
	jwtware "github.com/gofiber/jwt/v2"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Cannot load .env file. Create one based on .env-example?")
		panic(err)
	}

	port := os.Getenv("SHOP_BACKEND_PORT")
	secret := os.Getenv("SHOP_JWT_SECRET")
	db.Connect()

	app := fiber.New()

	app.Use(jwtware.New(jwtware.Config{
		SigningKey: []byte(secret),
		ErrorHandler: func(c *fiber.Ctx, err error) error {
			return c.Next()
		},
	}))

	router.RouteFor(app)

	app.Listen(utils.Fmt(":%s", port))
}
