import { getKeys } from './actions'
import KeysClient from './KeysClient'

export const dynamic = 'force-dynamic'

export default async function KeysPage() {
  const keys = await getKeys()
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">License Keys</h2>
      </div>
      
      <KeysClient initialKeys={keys} />
    </div>
  )
}
