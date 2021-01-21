package products

import (
	"github.com/Pauloo27/shop/db"
	"github.com/Pauloo27/shop/models"
	"github.com/Pauloo27/shop/utils"
	"github.com/gofiber/fiber/v2"
)

type UpdatePayload struct {
	Price  float32 `validate:"required,min=0"`
	Amount int     `validate:"min=0"`
}

func Update(c *fiber.Ctx) error {
	id := c.Params("id", "0")
	payload := new(UpdatePayload)

	if err := c.BodyParser(payload); err != nil {
		return c.SendStatus(fiber.ErrBadRequest.Code)
	}

	errs := utils.Validate(payload)
	if errs != nil {
		return c.JSON(errs)
	}

	res := db.Database.Model(&models.Product{}).Where("id = ?", id).
		Updates(map[string]interface{}{"price": payload.Price, "amount": payload.Amount})
	if res.Error != nil {
		panic(res.Error)
	}

	if res.RowsAffected == 0 {
		return utils.AsError(c, fiber.StatusNotFound, "Produto não encontrado")
	}

	return utils.AsMsg(c, fiber.StatusOK, "Produto atualizado")
}
