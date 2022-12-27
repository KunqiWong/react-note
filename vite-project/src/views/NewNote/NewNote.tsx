import { NoteForm } from '../../components/NoteForm/NoteForm'
import './NewNote.scss'

export function NewNote(props: any) {
  return (
    <div className="container">
      <h1 style={{ marginBottom: '3vh' }}>创建新笔记</h1>
      <NoteForm
        onCreateNote={props.onCreateNote}
        allTag={props.allTag}></NoteForm>
    </div>
  )
}
