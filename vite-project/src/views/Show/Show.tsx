import { useParams, Navigate, Outlet, useOutletContext } from 'react-router-dom'
import { Note } from '../../models/data'

type NoteLayoutProps = {
  notes: Note[]
  onDeleteNote: (id: string) => void
}

type Show = {
  note: Note
  onDeleteNote: (id: string) => void
}

export function Show({ notes, onDeleteNote }: NoteLayoutProps) {
  const { id } = useParams()

  const note = notes.find((note: Note) => note.id === id)
  if (note == null) return <Navigate to="/home" replace></Navigate>

  return <Outlet context={{ note: note, onDeleteNote: onDeleteNote }}></Outlet>
}

export function useNote() {
  return useOutletContext<Show>()
}
