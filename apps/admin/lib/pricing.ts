/// Single source of truth for tier pricing — was previously duplicated as a
/// hardcoded `12.99` literal in both the dashboard and Sales page.
export function priceForTier(tier: string): number {
  if (tier === 'pro' || tier === 'lifetime') return 12.99
  return 0
}
