package products

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

	var lastProduct models.Product
	err = db.Database.Last(&lastProduct).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return utils.AsError(c, fiber.StatusNotFound, "Nenhum produto cadastrado")
		}
		panic(err)
	}

	var products []models.Product
	err = db.Database.Where("id > ?", PAGE_SIZE*(page-1)).Limit(PAGE_SIZE).Find(&products).Error
	if err != nil {
		panic(err)
	}

	lastPage := int(math.Ceil(float64(lastProduct.ID) / float64(PAGE_SIZE)))
	return c.JSON(fiber.Map{"products": products, "last_page": lastPage})
}
