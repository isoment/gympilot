interface Logger {
  info(message: string, ...args: unknown[]): void;
  error(message: string, ...args: unknown[]): void;
  debug(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
}

export class LoggerWrapper implements Logger {
  #underlyingLogger: Logger | null = null;

  #getInitializeLogger(): Logger {
    this.configureLogger();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.#underlyingLogger!;
  }

  configureLogger(): void {}

  resetLogger() {
    this.#underlyingLogger = null;
  }

  info(message: string, ...args: unknown[]): void {}

  error(message: string, ...args: unknown[]): void {}

  debug(message: string, ...args: unknown[]): void {}

  warn(message: string, ...args: unknown[]): void {}
}
