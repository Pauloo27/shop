package auth

import "os"

type AuthPayload struct {
	Name     string `validate:"required,min=3,max=32"`
	Password string `validate:"required,min=5,max=32"`
}

var secret string

func getSecret() string {
	if secret == "" {
		secret = os.Getenv("SHOP_JWT_SECRET")
	}
	return secret
}
