import { TMDBLogo } from './TMDBLogo'

export const Footer = () => {
  return (
    <footer className="container py-6">
      <p className="flex items-center gap-3">
        Powered by
        <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
          <TMDBLogo />
        </a>
      </p>
    </footer>
  )
}
