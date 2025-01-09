export interface RefreshSessionUseCase {
  refreshSession(): void;
}

export const RefreshSessionUseCaseSymbol = Symbol('RefreshSessionUseCase');
