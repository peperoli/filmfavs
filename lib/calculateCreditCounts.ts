export const calculateCreditCounts = function calculateCreditCounts(
  movieCredits: any[],
  department?: string,
  jobs?: string[],
  gender?: number | null
) {
  const creditCounts: { [key: number]: number } = {}

  for (let index = 0; index < movieCredits.length; index++) {
    const credits =
      (movieCredits[index].data && movieCredits[index].data[department ? 'crew' : 'cast']) || []

    for (let index = 0; index < credits.length; index++) {
      const credit = credits[index]
      const matchingJobs = jobs?.includes(credit.job) || !jobs
      const matchingGender = credit.gender === gender || gender === undefined || gender === null

      if ((credit.department === department || !department) && matchingJobs && matchingGender)
        if (!creditCounts[credit.id]) {
          creditCounts[credit.id] = 1
        } else {
          creditCounts[credit.id] += 1
        }
    }
  }

  return Object.entries(creditCounts).map(([id, count]) => ({ id: Number(id), count: count || 0 }))
}
