package utils

import "github.com/go-playground/validator"

type ValidationError struct {
	Field, Error string
}

func Validate(a interface{}) *[]*ValidationError {
	var errs []*ValidationError

	validate := validator.New()
	rawErrs := validate.Struct(a)

	if rawErrs == nil {
		return nil
	}

	for _, err := range rawErrs.(validator.ValidationErrors) {
		errs = append(errs, &ValidationError{
			Field: err.StructField(), Error: Fmt("%s: %s", err.Tag(), err.Param()),
		})
	}

	return &errs
}
