package main

import (
	"fmt"
	"os"

	"github.com/Pauloo27/shop/utils"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Cannot load .env file. Create one based on .env-example?")
		panic(err)
	}

	port := os.Getenv("SHOP_BACKEND_PORT")

	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello Fiber")
	})

	app.Listen(utils.Fmt(":%s", port))
}
