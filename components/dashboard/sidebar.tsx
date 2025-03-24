import { SearchForm } from '@/components/search-form'
import { Button } from '@/components/ui/button'
import { usePanel } from '@/contexts/panel-context'
import { LoaderCircle, Newspaper, Pin, SquarePen } from 'lucide-react'
import { useEffect, useState } from 'react'

export function Sidebar() {
  const { create, list, changeSelection } = usePanel()

  const [search, setSearch] = useState('')
  const [filteredList, setFilteredList] = useState(list)

  useEffect(() => {
    setFilteredList(
      list.filter((article) =>
        article.title.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [list, search])

  return (
    <nav className="flex h-full flex-col gap-4 p-6">
      <Button
        variant="outline"
        onClick={() => create('New article')}
        className="cursor-pointer"
      >
        <SquarePen className="h-4 w-4" /> Start a new article
      </Button>

      <SearchForm
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(e.target.value)
        }}
      />

      {filteredList
        .filter(({ isPinned }) => isPinned)
        .map(({ id, title, isSelected, isLoading }) => (
          <Button
            variant={isSelected ? 'secondary' : 'ghost'}
            className="w-full justify-between cursor-pointer"
            key={id}
            onClick={() => changeSelection(id)}
            data-testid={`pinned-article-${id}`}
            suppressHydrationWarning
          >
            <Newspaper />
            <div className="mx-2 truncate overflow-hidden text-ellipsis text-left w-full">
              {title}
            </div>
            {isLoading && <LoaderCircle className="h-6 w-6 animate-spin" />}
            <Pin />
          </Button>
        ))}

      {filteredList
        .filter(({ isPinned }) => !isPinned)
        .map(({ id, title, isSelected, isLoading }) => (
          <Button
            variant={isSelected ? 'secondary' : 'ghost'}
            className="w-full justify-between cursor-pointer"
            key={id}
            onClick={() => changeSelection(id)}
            data-testid={`unpinned-article-${id}`}
            suppressHydrationWarning
          >
            <Newspaper />
            <div className="mx-2 truncate overflow-hidden text-ellipsis text-left w-full">
              {title}
            </div>
            {isLoading && <LoaderCircle className="h-6 w-6 animate-spin" />}
          </Button>
        ))}
    </nav>
  )
}
