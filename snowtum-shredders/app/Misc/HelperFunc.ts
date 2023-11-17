interface ThrottledFunction<T extends (...args: any[]) => void> {
  (this: ThisParameterType<T>, ...args: Parameters<T>): void;
}

export function throttle<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ThrottledFunction<T> {
  let lastCallTime = 0;

  return function (this: ThisParameterType<T>) {
    const now = Date.now();

    if (now - lastCallTime >= delay) {
      func.apply(this, arguments as any);
      lastCallTime = now;
    }
  };
}
