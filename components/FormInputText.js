// @flow
import { useFormContext } from 'react-hook-form';
import { Box, TextField } from '@material-ui/core';
import get from 'lodash.get';

type FormInputTextProps = {
  name: string,
  label: string,
};

export function FormInputText({ name, label }: FormInputTextProps) {
  const {
    register,
    formState: { isSubmitting, errors },
  } = useFormContext();

  const error = get(errors, name);

  return (
    <TextField
      {...register(name)}
      variant="filled"
      label={label}
      error={!!error}
      helperText={error ? error.message : null}
      disabled={isSubmitting}
      fullWidth
      inputProps={{
        'data-testid': name,
      }}
      FormHelperTextProps={{
        'data-testid': `${name}-error`,
      }}
    />
  );
}
