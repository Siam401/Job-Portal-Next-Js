export type SignUpDTO = {
  "first_name": string,
  "last_name": string,
  "email": string,
  "country_code": string,
  "mobile": string,
  "gender": string,
  "photo": any,
  "resume": any,
  "password": string,
  "confirm_password": string | undefined,
}

export type SignInDTO = {
  "username": string,
  "password": string,
  "remember"?: number | boolean,
}

export type ResetPasswordDTO = {
  "token": string | undefined,
  "password": string,
  "confirm_password": string | undefined,

}