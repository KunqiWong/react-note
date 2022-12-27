import { NoteForm } from '../../components/NoteForm/NoteForm'
import { useNote } from '../Show/Show'
import '../NewNote/NewNote.scss'

export function Edit(props: any) {
  const { note } = useNote()
  return (
    <div className="container">
      <h1 style={{ marginBottom: '3vh' }}>编辑笔记</h1>
      <NoteForm
        onUpdateNote={props.onUpdateNote}
        note={note}
        allTag={props.allTag}></NoteForm>
    </div>
  )
}
