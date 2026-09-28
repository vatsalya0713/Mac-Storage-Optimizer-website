import { getActivationsPaged } from './actions'
import ActivationsClient from './ActivationsClient'

export const dynamic = 'force-dynamic'

const PAGE_SIZE = 25

export default async function ActivationsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>
}) {
  const { page: pageParam, q } = await searchParams
  const page = Math.max(1, parseInt(pageParam || '1', 10) || 1)
  const { data, count } = await getActivationsPaged(page, q)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Activations</h2>
      </div>

      <ActivationsClient activations={data} page={page} pageSize={PAGE_SIZE} total={count} />
    </div>
  )
}
