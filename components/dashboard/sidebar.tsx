import { Newspaper, Pin, SquarePen } from 'lucide-react'

import { SearchForm } from '@/components/search-form'
import { usePanel } from '@/contexts/panel-context'
import { Button } from '../ui/button'

export function Sidebar() {
  const { create, list, changeSelection } = usePanel()

  return (
    <nav className="flex h-full flex-col gap-4 p-6">
      <Button variant="outline" onClick={() => create('New article')}>
        <SquarePen className="h-4 w-4" /> Start a new article
      </Button>

      <SearchForm />

      {list()
        .filter(({ isPinned }) => isPinned)
        .map(({ id, title, isSelected }) => (
          <Button
            variant={isSelected ? 'secondary' : 'ghost'}
            className="w-full justify-between"
            key={id}
            onClick={() => changeSelection(id)}
          >
            <Newspaper />
            <div className="mx-2 truncate overflow-hidden text-ellipsis text-left w-full">
              {title}
            </div>
            <Pin />
          </Button>
        ))}

      {list()
        .filter(({ isPinned }) => !isPinned)
        .map(({ id, title, isSelected }) => (
          <Button
            variant={isSelected ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            key={id}
            onClick={() => changeSelection(id)}
          >
            <Newspaper />
            <span className="ml-2 truncate overflow-hidden text-ellipsis">
              {title}
            </span>
          </Button>
        ))}
    </nav>
  )
}
