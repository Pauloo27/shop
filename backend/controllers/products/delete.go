package products

import (
	"strconv"

	"github.com/Pauloo27/shop/db"
	"github.com/Pauloo27/shop/models"
	"github.com/Pauloo27/shop/utils"
	"github.com/gofiber/fiber/v2"
)

func Delete(c *fiber.Ctx) error {
	rawID := c.Params("id", "0")

	parsedID, err := strconv.Atoi(rawID)
	if err != nil || parsedID == 0 {
		return utils.AsError(c, fiber.StatusBadRequest, "ID inválido")
	}

	res := db.Database.Unscoped().Delete(&models.Product{}, 1)
	if res.Error != nil {
		panic(err)
	}
	if res.RowsAffected == 0 {
		return utils.AsError(c, fiber.StatusNotFound, "Produto não encontrado")
	}
	return utils.AsMsg(c, fiber.StatusOK, "Produto apagado")
}
