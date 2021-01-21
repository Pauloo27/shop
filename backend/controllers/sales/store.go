package sales

import (
	"github.com/Pauloo27/shop/db"
	"github.com/Pauloo27/shop/models"
	"github.com/Pauloo27/shop/utils"
	"github.com/gofiber/fiber/v2"
)

type StorePayload struct {
	ProductID int `validate:"required"`
}

func Store(c *fiber.Ctx) error {
	payload := new(StorePayload)

	if err := c.BodyParser(payload); err != nil {
		return c.SendStatus(fiber.ErrBadRequest.Code)
	}

	errs := utils.Validate(payload)
	if errs != nil {
		c.Response().SetStatusCode(fiber.StatusBadRequest)
		return c.JSON(errs)
	}

	var product models.Product
	err := db.Database.Find(&product, payload.ProductID).Error
	if err != nil {
		panic(err)
	}

	if product.Amount <= 0 {
		return utils.AsError(c, fiber.StatusNotFound, "Não disponível em estoque")
	}

	err = db.Database.Model(&product).Update("Amount", product.Amount-1).Error
	if err != nil {
		panic(err)
	}

	sale := models.Sale{UserID: c.Locals("user_id").(int), ProductID: payload.ProductID}
	err = db.Database.Create(&sale).Error
	if err != nil {
		panic(err)
	}

	return utils.AsJSON(c, fiber.StatusCreated, fiber.Map{"ID": sale.ID})
}
