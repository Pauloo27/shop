package users

import (
	"github.com/Pauloo27/shop/db"
	"github.com/Pauloo27/shop/models"
	"github.com/Pauloo27/shop/utils"
	"github.com/gofiber/fiber/v2"
)

type UpdatePayload struct {
	CurrentPassword         string `validate:"required,min=5,max=32"`
	NewPassword             string `validate:"required,min=5,max=32"`
	NewPasswordConfirmation string `validate:"required,min=5,max=32"`
}

func Update(c *fiber.Ctx) error {
	payload := new(UpdatePayload)

	if err := c.BodyParser(payload); err != nil {
		return c.SendStatus(fiber.ErrBadRequest.Code)
	}

	errs := utils.Validate(payload)
	if errs != nil {
		return c.JSON(errs)
	}

	var user models.User
	err := db.Database.First(&user, c.Locals("user_id").(int)).Error
	if err != nil {
		panic(err)
	}

	if user.Password != utils.HashPassword(payload.CurrentPassword) {
		return utils.AsError(c, fiber.StatusForbidden, "Senha incorreta")
	}

	if payload.NewPassword != payload.NewPasswordConfirmation {
		return utils.AsError(c, fiber.StatusForbidden, "Confirmação de senha inválida")
	}

	err = db.Database.Model(&user).Update("Password",
		utils.HashPassword(payload.NewPassword),
	).Error

	if err != nil {
		panic(err)
	}
	return utils.AsMsg(c, fiber.StatusOK, "Senha alterada")
}
