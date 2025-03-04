export function getAvatarFallback(
  givenName?: string,
  familyName?: string
): string {
  if (!givenName && !familyName) return "";

  const firstInitial = givenName ? givenName[0].toUpperCase() : "";
  const lastInitial = familyName ? familyName[0].toUpperCase() : "";

  return `${firstInitial}${lastInitial}`;
}
