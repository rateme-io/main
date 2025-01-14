export class UserNotFound extends Error {
  constructor() {
    super('TokenAuthService: User not found');
  }
}

export class UserDoesntHavePassword extends Error {
  constructor() {
    super('TokenAuthService: User does not have password');
  }
}

export class InvalidPassword extends Error {
  constructor() {
    super('TokenAuthService: Invalid password');
  }
}

export class FailedToCreateSession extends Error {
  constructor() {
    super('TokenAuthService: Failed to create session');
  }
}

export class UserAlreadyExists extends Error {
  constructor() {
    super('TokenAuthService: User already exists');
  }
}
