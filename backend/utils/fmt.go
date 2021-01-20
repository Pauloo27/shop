package utils

import "fmt"

// wrapper for fmt.Sprintf() with a short name
func Fmt(f string, v ...interface{}) string {
	return fmt.Sprintf(f, v...)
}
