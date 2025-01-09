export interface RemoveSessionUseCase {
  removeSession(): void;
}

export const RemoveSessionUseCaseSymbol = Symbol('RemoveSessionUseCase');
