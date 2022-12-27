import { useNote } from './Show'
import { Button, Badge } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import './Note.scss'

export function Note() {
  const { note, onDeleteNote } = useNote()
  return (
    <div className="container">
      <header className="space-between">
        <div className="df">
          <h1>{note.title}</h1>
          <div>
            {note.tags.length > 0
              ? note.tags.map((tag) => {
                  return (
                    <Badge
                      key={tag.id}
                      count={tag.label}
                      style={{ marginRight: '1vh' }}
                      color={tag.color}></Badge>
                  )
                })
              : null}
          </div>
        </div>
        <div>
          <Link to="edit">
            <Button type="primary" size="large">
              编辑
            </Button>
          </Link>
          <Button
            style={{
              margin: '0 1vw',
              color: '#FF4D4F',
              borderColor: '#FF4D4F',
            }}
            onClick={() => onDeleteNote(note.id)}
            size="large">
            删除
          </Button>
          <Link to="/home">
            <Button size="large">返回</Button>
          </Link>
        </div>
      </header>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </div>
  )
}
