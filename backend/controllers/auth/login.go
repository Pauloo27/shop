package auth

import (
	"errors"

	"github.com/Pauloo27/shop/db"
	"github.com/Pauloo27/shop/models"
	"github.com/Pauloo27/shop/utils"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type LoginPayload struct {
	Name     string `validate:"required,min=3,max=32"`
	Password string `validate:"required,min=5,max=32"`
}

func Login(c *fiber.Ctx) error {
	payload := new(LoginPayload)

	if err := c.BodyParser(payload); err != nil {
		return c.SendStatus(fiber.ErrBadRequest.Code)
	}

	errs := utils.Validate(payload)
	if errs != nil {
		return c.JSON(errs)
	}

	var user models.User
	err := db.Database.First(&user,
		"name = ? AND password = ?", payload.Name, utils.HashPassword(payload.Password),
	).Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return utils.AsError(c, fiber.StatusNotFound, "User not found")
		}
		panic(err)
	}

	return c.SendString("ok")
}
