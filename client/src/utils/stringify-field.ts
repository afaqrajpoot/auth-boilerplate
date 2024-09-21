// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isStringified(value: any): value is string {
  return (
    typeof value === "string" &&
    (/^{.*}$/.test(value.trim()) || value === "null")
  );
}
