export function getGreeting(name: string): string {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return `Good morning, ${name} ☀️`;
  } else if (hour >= 12 && hour < 18) {
    return `Good afternoon, ${name} 🌤️`;
  } else {
    return `Good evening, ${name} 🌙`;
  }
}
