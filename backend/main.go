package main

import (
	"fmt"
	"os"

	"github.com/Pauloo27/shop/db"
	"github.com/Pauloo27/shop/router"
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
	db.Connect()

	app := fiber.New()

	router.RouteFor(app)

	app.Listen(utils.Fmt(":%s", port))
}
