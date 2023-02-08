export type Query = {
  name?: string
  users?: string
}

export type User = {
  name?: string
  email?: string
  phoneNumber?: string
  address?: string
}

export type Address = {
  street?: string
  city?: string
  zipCode?: string
}
