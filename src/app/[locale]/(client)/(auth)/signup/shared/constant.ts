import { SignUpDTO } from "@/client/(auth)/auth";

export const defaultSignUpInput: SignUpDTO = {
  "first_name": '',
  "last_name": '',
  "email": '',
  "country_code": '880',
  "mobile": '',
  "gender": '',
  "photo": undefined,
  "resume": undefined,
  "password": '',
  "confirm_password": '',
}