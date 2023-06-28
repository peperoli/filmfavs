import { PersonMovieCredit } from '@/types/TMDB'

export function mergeCreditsByMovie(credits?: PersonMovieCredit[]): PersonMovieCredit[] {
  const movieCredits: PersonMovieCredit[] = []

  credits?.forEach(credit => {
    const matchingCredit = movieCredits.find(item => item.id === credit.id)
    if (matchingCredit) {
      if (credit.job) {
        if (!matchingCredit.job) {
          matchingCredit.job = credit.job
        } else {
          matchingCredit.job = matchingCredit.job + ', ' + credit.job
        }
      }
      if (credit.character) {
        matchingCredit.character ? matchingCredit.character : credit.character
      }
    } else {
      movieCredits.push(credit)
    }
  })

  return movieCredits
}
