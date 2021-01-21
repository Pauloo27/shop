package sales

import (
	"errors"
	"math"
	"strconv"

	"github.com/Pauloo27/shop/db"
	"github.com/Pauloo27/shop/models"
	"github.com/Pauloo27/shop/utils"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

const PAGE_SIZE = 10

func Index(c *fiber.Ctx) error {
	page, err := strconv.Atoi(c.Query("page", "1"))
	if err != nil {
		return utils.AsError(c, fiber.StatusBadRequest, "Página inválida")
	}

	var lastSale models.Sale
	err = db.Database.Last(&lastSale).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return utils.AsError(c, fiber.StatusNotFound, "Nenhuma venda cadastrada")
		}
		panic(err)
	}

	var sales []models.Sale
	err = db.Database.Preload("Product").Where("id > ?", PAGE_SIZE*(page-1)).
		Limit(PAGE_SIZE).Find(&sales).Error
	if err != nil {
		panic(err)
	}

	lastPage := int(math.Ceil(float64(lastSale.ID) / float64(PAGE_SIZE)))
	return c.JSON(fiber.Map{"sales": sales, "last_page": lastPage})
}
