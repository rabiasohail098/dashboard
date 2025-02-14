import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId ,token } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token, // ✅ Secure token (NEXT_PUBLIC mat likhein)
  perspective: "published", // Sirf published data fetch karein// Set to false if statically generating pages, using ISR or tag-based revalidation
})
