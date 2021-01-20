package utils

import (
	"crypto/sha256"
	"encoding/base64"
	"os"
)

var hash_salt = os.Getenv("SHOP_SALT")

func HashPassword(password string) string {
	password = Fmt(hash_salt, password)

	hasher := sha256.New()
	hasher.Write([]byte(password))

	return base64.URLEncoding.EncodeToString(hasher.Sum(nil))
}
