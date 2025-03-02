import { Newspaper, SquarePen } from 'lucide-react'

import { SearchForm } from '@/components/search-form'
import { Button } from '../ui/button'

const articles = [
  { id: 1, title: "Introduction à l'IA" },
  { id: 2, title: 'Tendances tech 2024' },
  { id: 3, title: 'Booster sa productivité' },
  { id: 4, title: 'Développement durable' },
  { id: 5, title: 'Blockchain et finance' },
  { id: 6, title: 'Apprendre le Python' },
  { id: 7, title: 'Santé mentale au travail' },
  { id: 8, title: 'Voyager éco-responsable' },
  { id: 9, title: 'Cuisine végane facile' },
  { id: 10, title: 'Gestion du temps' },
]

export function Sidebar() {
  return (
    <nav className="flex h-full flex-col gap-4 p-6">
      <Button variant="outline">
        <SquarePen className="h-4 w-4" /> Start a new article
      </Button>

      <SearchForm />

      {articles.map(({ id, title }) => (
        <Button
          variant={id === 1 ? 'secondary' : 'ghost'}
          className="w-full justify-start"
          key={id}
        >
          <Newspaper />
          <span>{title}</span>
        </Button>
      ))}
    </nav>
  )
}
