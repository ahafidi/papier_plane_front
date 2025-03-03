import { Newspaper, SquarePen } from 'lucide-react'

import { SearchForm } from '@/components/search-form'
import { useArticle } from '@/contexts/article-context'
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
  const { create, list, changeSelection } = useArticle()

  return (
    <nav className="flex h-full flex-col gap-4 p-6">
      <Button variant="outline" onClick={() => create('New article')}>
        <SquarePen className="h-4 w-4" /> Start a new article
      </Button>

      <SearchForm />

      {list().map(({ id, title, isSelected }) => (
        <Button
          variant={isSelected ? 'secondary' : 'ghost'}
          className="w-full justify-start"
          key={id}
          onClick={() => changeSelection(id)}
        >
          <Newspaper />
          <span>{title}</span>
        </Button>
      ))}
    </nav>
  )
}
