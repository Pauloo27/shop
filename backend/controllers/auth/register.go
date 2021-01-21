package auth

import (
	"github.com/Pauloo27/shop/db"
	"github.com/Pauloo27/shop/models"
	"github.com/Pauloo27/shop/utils"
	"github.com/gofiber/fiber/v2"
)

func Register(c *fiber.Ctx) error {
	payload := new(AuthPayload)

	if err := c.BodyParser(payload); err != nil {
		return c.SendStatus(fiber.ErrBadRequest.Code)
	}

	errs := utils.Validate(payload)
	if errs != nil {
		c.Response().SetStatusCode(fiber.StatusBadRequest)
		return c.JSON(errs)
	}

	newUser := models.User{
		Name:        payload.Name,
		Password:    utils.HashPassword(payload.Password),
		CreatedByID: c.Locals("user_id").(int),
	}

	err := db.Database.Create(&newUser).Error
	if err != nil {
		if utils.IsNotUnique(err) {
			return utils.AsError(c, fiber.StatusConflict, "Nome já em uso")
		}
		panic(err)
	}

	return utils.AsJSON(c, fiber.StatusCreated, fiber.Map{"id": newUser.ID})
}
