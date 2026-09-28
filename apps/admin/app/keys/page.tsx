import { getKeysPaged } from './actions'
import KeysClient from './KeysClient'

export const dynamic = 'force-dynamic'

const PAGE_SIZE = 25

export default async function KeysPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>
}) {
  const { page: pageParam, q } = await searchParams
  const page = Math.max(1, parseInt(pageParam || '1', 10) || 1)
  const { data, count } = await getKeysPaged(page, q)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">License Keys</h2>
      </div>

      <KeysClient keys={data} page={page} pageSize={PAGE_SIZE} total={count} />
    </div>
  )
}
