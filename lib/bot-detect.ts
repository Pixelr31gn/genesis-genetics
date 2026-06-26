const BOT_UA_PATTERN =
  /bot|spider|crawl|slurp|facebookexternalhit|whatsapp|telegrambot|slackbot|discordbot|preview|pingdom|uptime|headless|curl|wget|python-requests/i;

export function isLikelyBot(userAgent: string | null): boolean {
  if (!userAgent) return true;
  return BOT_UA_PATTERN.test(userAgent);
}
