package products

import (
	"github.com/Pauloo27/shop/db"
	"github.com/Pauloo27/shop/models"
	"github.com/Pauloo27/shop/utils"
	"github.com/gofiber/fiber/v2"
)

func Delete(c *fiber.Ctx) error {
	rawID := c.Params("id", "0")

	res := db.Database.Unscoped().Delete(&models.Product{}, rawID)
	if res.Error != nil {
		panic(res.Error)
	}

	if res.RowsAffected == 0 {
		return utils.AsError(c, fiber.StatusNotFound, "Produto não encontrado")
	}

	return utils.AsMsg(c, fiber.StatusOK, "Produto apagado")
}
