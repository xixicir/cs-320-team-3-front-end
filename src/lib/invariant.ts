export default function invariant(condition: any, message: string): asserts condition {
  if (!condition) {
    if (message === undefined) {
      message = "Invariant failed";
    }
    throw new Error(message);
  }
}
