// Input-size guards for the public license API: values come straight from the
// network, so cap their length before they reach the database or logs.
export function boundedString(value: unknown, max: number): string | undefined {
  return typeof value === 'string' && value.length > 0 && value.length <= max ? value : undefined
}

export const LIMITS = { key: 64, machineId: 128, machineName: 120, paymentId: 128 } as const
