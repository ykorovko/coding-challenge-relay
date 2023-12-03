// @flow
import { FocusEvent, useCallback } from 'react';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';
import { NumericFormat, OnValueChange } from 'react-number-format';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  TextField,
} from '@material-ui/core';
import get from 'lodash.get';

export type FormInputNumberProps = {
  name: string,
  label: string,
};

const MAX_LIMIT = 99_999.99;

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={inputRef}
      allowNegative={false}
      decimalScale={2}
      prefix="$"
      thousandSeparator
      allowLeadingZeros
      isAllowed={({ formattedValue, floatValue, value }) => {
        if (typeof floatValue === 'undefined' || typeof value === 'undefined')
          return true;

        // Allow only one leading zero
        if (value.charAt(0) === '0') {
          if (value.charAt(1) && value.charAt(1) != '.') {
            return false;
          }
        }

        return (
          formattedValue === '' ||
          (floatValue <= Number(MAX_LIMIT) && floatValue >= 0)
        );
      }}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.floatValue,
          },
        });
      }}
      onBlur={() => null}
    />
  );
}

export function FormInputNumber({ name, label }: FormInputNumberProps) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleChange: OnValueChange = useCallback(
    (values) => {
      setValue(name, values.floatValue, { shouldValidate: true });
    },
    [name, setValue],
  );

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement, Element>) => {
      const value = parseFloat(e.target.value.replaceAll(',', ''));

      setValue(name, value, { shouldValidate: true });
    },
    [name, setValue],
  );

  const error = get(errors, name);

  return (
    <TextField
      {...register(name)}
      variant="filled"
      label={label}
      error={!!error}
      helperText={error ? error.message : null}
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
      inputProps={{
        'data-testid': name,
      }}
      FormHelperTextProps={{
        'data-testid': `${name}-error`,
      }}
    />
  );
}
