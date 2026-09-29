// Builds the "return to" URL a form's hidden "_return_to" field carries, so
// a server-action redirect after save/delete lands back on the same
// filtered/searched list view instead of resetting to the bare list URL.
// searchParams is whatever a Next.js page received (values may be strings
// or, for a repeated key, arrays -- only the first value is used here since
// none of the admin filters are multi-select).
export function buildReturnTo(basePath, searchParams) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams || {})) {
    if (value === undefined || value === null || value === '') continue;
    params.set(key, Array.isArray(value) ? value[0] : value);
  }
  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}
