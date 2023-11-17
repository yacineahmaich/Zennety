export function extractFirstErrMsg(obj?: Record<string, string[]>) {
  if (!obj) return;

  return Object.entries(obj)
    .flatMap(([_, value]) => value)
    .at(0);
}
