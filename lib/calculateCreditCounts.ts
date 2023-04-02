export const calculateCreditCounts = function calculateCreditCounts(
  movieCredits: any[],
  department?: string,
  jobs?: string[]
) {
  const creditCounts: { [key: number]: number } = {}

  for (let index = 0; index < movieCredits.length; index++) {
    const credits =
      (movieCredits[index].data && movieCredits[index].data[department ? 'crew' : 'cast']) || []

    for (let index = 0; index < credits.length; index++) {
      const credit = credits[index]

      if ((credit.department === department || !department) && (jobs?.includes(credit.job) || !jobs))
        if (!creditCounts[credit.id]) {
          creditCounts[credit.id] = 1
        } else {
          creditCounts[credit.id] += 1
        }
    }
  }

  return Object.entries(creditCounts).map(([id, count]) => ({ id: Number(id), count: count || 0 }))
}
