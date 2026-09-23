import { getActivations } from './actions'
import ActivationsClient from './ActivationsClient'

export const revalidate = 0

export default async function ActivationsPage() {
  const activations = await getActivations()
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Activations</h2>
      </div>
      
      <ActivationsClient initialActivations={activations} />
    </div>
  )
}
