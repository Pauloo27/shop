package products

import (
	"strconv"

	"github.com/Pauloo27/shop/db"
	"github.com/Pauloo27/shop/models"
	"github.com/Pauloo27/shop/utils"
	"github.com/gofiber/fiber/v2"
)

const PAGE_SIZE = 10

func Index(c *fiber.Ctx) error {
	page, err := strconv.Atoi(c.Query("page", "1"))
	if err != nil {
		return utils.AsError(c, fiber.StatusBadRequest, "Página inválida")
	}

	var products []models.Product
	err = db.Database.Where("id > ?", PAGE_SIZE*(page-1)).Limit(PAGE_SIZE).Find(&products).Error
	if err != nil {
		panic(err)
	}

	return c.JSON(products)
}
