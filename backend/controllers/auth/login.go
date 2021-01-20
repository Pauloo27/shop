package auth

import (
	"github.com/Pauloo27/shop/utils"
	"github.com/gofiber/fiber/v2"
)

type LoginPayload struct {
	Username string `validate:"required,min=3,max=32"`
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

	return c.SendString("ok")
}
