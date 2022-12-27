import { BrowserRouter, useRoutes, Navigate } from 'react-router-dom'
import { Home } from './views/Home/Home'
import { Edit } from './views/Edit/Edit'
import { Show } from './views/Show/Show'
import { Note } from './views/Show/Note'
import { NewNote } from './views/NewNote/NewNote'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useMemo, createContext } from 'react'
import { RawNote, Tag, NoteData } from './models/data'
import { v4 as uuid } from 'uuid'

// const Context = createContext({})

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      }
    })
  }, [notes, tags])

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      // console.log('nice:', prevNotes)
      return [
        ...prevNotes,
        { ...data, id: uuid(), tagIds: tags.map((tag) => tag.id) },
      ]
    })
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          console.log(tags)
          return { id, ...data, tagIds: tags.map((tag) => tag.id) }
        } else {
          return note
        }
      })
    })
  }

  function onDeleteNote(id: string) {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id)
    })
  }

  function onDeleteTag(id: string) {
    setTags((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id)
    })
  }

  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag])
  }

  const routesList = [
    {
      path: '/home',
      element: (
        <Home
          notes={notesWithTags}
          tags={tags}
          addTag={addTag}
          onDeleteTag={onDeleteTag}
        />
      ),
    },
    {
      path: '/new',
      element: (
        // <Context.Provider value={{ onCreateNote, addTag }}>
        <NewNote onCreateNote={onCreateNote} allTag={tags} />
        // </Context.Provider>
      ),
    },
    {
      path: '/:id',
      element: <Show notes={notesWithTags} onDeleteNote={onDeleteNote} />,
      children: [
        {
          index: true,
          element: <Note />,
        },
        {
          path: 'edit',
          element: <Edit onUpdateNote={onUpdateNote} allTag={tags} />,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/home" />,
    },
  ]
  function WrapperRoutes() {
    let element = useRoutes(routesList)
    return element
  }

  return (
    <BrowserRouter>
      <WrapperRoutes />
    </BrowserRouter>
  )
}

export default App
