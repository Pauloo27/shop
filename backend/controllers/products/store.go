package products

import (
	"github.com/Pauloo27/shop/db"
	"github.com/Pauloo27/shop/models"
	"github.com/Pauloo27/shop/utils"
	"github.com/gofiber/fiber/v2"
)

type StorePayload struct {
	Name  string  `validate:"required,min=3,max=32"`
	Price float32 `validate:"required,min=0"`
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

	product := models.Product{
		Name:   payload.Name,
		Price:  payload.Price,
		Amount: 0,
	}

	err := db.Database.Create(&product).Error
	if err != nil {
		if utils.IsNotUnique(err) {
			return utils.AsError(c, fiber.StatusConflict, "Um produto com esse nome já existe")
		}
		panic(err)
	}

	return utils.AsJSON(c, fiber.StatusCreated, fiber.Map{"id": product.ID})
}
