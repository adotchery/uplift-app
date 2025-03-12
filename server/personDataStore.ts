type PersonData = {
  formData: any
  apiData: any
  timestamp: number
}

const personDataStore: Record<string, PersonData> = {}

export function storePersonData(id: string, formData: any, apiData: any): void {
  personDataStore[id] = {
    formData,
    apiData,
    timestamp: Date.now(),
  }
}

export function getPersonData(id: string): PersonData | null {
  return personDataStore[id] || null
}

export function getAllPersonData(): Record<string, PersonData> {
  return { ...personDataStore }
}

// Optional: Clean up old data (e.g., older than 24 hours)
export function cleanupOldData(): void {
  const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000

  Object.entries(personDataStore).forEach(([id, data]) => {
    if (data.timestamp < oneDayAgo) {
      delete personDataStore[id]
    }
  })
}