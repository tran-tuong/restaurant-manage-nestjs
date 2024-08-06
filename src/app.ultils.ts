import { HttpStatus, ValidationPipe } from '@nestjs/common';

const PASSWORD_RULE = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

const PASSWORD_RULE_MESSAGE =
  'Password must have Uppercase, lowercase, number, and special character';

const VALIDATION_PIPE = new ValidationPipe({
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
});

export const REGEX = {
  PASSWORD_RULE,
};

export const MESSAGES = {
  PASSWORD_RULE_MESSAGE,
};

export const SETTINGS = {
  VALIDATION_PIPE,
};
