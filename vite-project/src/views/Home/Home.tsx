import { Link, useNavigate } from 'react-router-dom'
import { Form, Col, Row, Input, Select, Button, Card, Badge, Modal } from 'antd'
import { useState, useMemo } from 'react'
import { Tag, SimplifiedNote } from '../../models/data'
import { v4 as uuid } from 'uuid'
import './home.scss'
import { randomColor } from '../../hooks/randomColor'

type NoteListProps = {
  // availableTags: Tag[]
  notes: SimplifiedNote[]
  addTag: (tag: Tag) => void
  tags: Tag[]
  onDeleteTag: (id: string) => void
  // onUpdateTag: (id: string, label: string) => void
}

export function Home({ addTag, notes, tags, onDeleteTag }: NoteListProps) {
  const [visible, setVisible] = useState<boolean>(false)
  const [Title, setTitle] = useState<string>('')
  const [tag, setTag] = useState<string>('')
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const options = [...tags.map((tag: Tag) => tag.label)]
  const filteredOptions = options.filter((o) => !selectedItems.includes(o))

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (Title === '' ||
          note.title.toLowerCase().includes(Title.toLowerCase())) &&
        (selectedItems.length === 0 ||
          selectedItems.every((tag) =>
            note.tags.some((noteTag) => noteTag.label === tag)
          ))
      )
    })
  }, [Title, selectedItems, notes])

  function NoteCard({ id, title, tags }: SimplifiedNote) {
    return (
      <Link to={`/${id}`}>
        <Card className="card">
          <div>{title}</div>
          {tags.length > 0 ? (
            tags.map((tag) => {
              return (
                <Badge
                  key={tag.id}
                  count={tag.label}
                  color={tag.color}
                  style={{ margin: '0 1vh' }}></Badge>
              )
            })
          ) : (
            <Badge color="white"></Badge>
          )}
        </Card>
      </Link>
    )
  }
  return (
    <div className="container">
      <header className="space-between">
        <h1>笔记</h1>
        <div>
          <Link to="/new">
            <Button type="primary" size="large">
              添加
            </Button>
          </Link>
          <Button
            style={{ marginLeft: '1vw' }}
            size="large"
            onClick={() => setVisible(true)}>
            编辑标签
          </Button>
        </div>
      </header>
      <Form layout="vertical" autoComplete="off">
        <Row className="space-between">
          <Col span={11}>
            <Form.Item
              label="标题"
              rules={[{ required: true, message: '请输入标题' }]}>
              <Input value={Title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item label="标签">
              <Select
                mode="multiple"
                placeholder="加入标签"
                value={selectedItems}
                onChange={setSelectedItems}
                style={{ width: '100%' }}
                options={filteredOptions.map((item) => ({
                  value: item,
                  label: item,
                }))}></Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Row className="dfs">
        {filteredNotes.map((note: any) => {
          return (
            <div key={note.id}>
              <NoteCard
                id={note.id}
                title={note.title}
                tags={note.tags}></NoteCard>
            </div>
          )
        })}
      </Row>
      <Modal
        title="编辑标签"
        footer={null}
        open={visible}
        maskClosable={false}
        onCancel={() => setVisible(false)}>
        <div className="edit">
          <Input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            style={{ width: '60%', marginRight: '1vw' }}></Input>
          <Button
            type="primary"
            onClick={() =>
              tag.length > 0
                ? addTag({ label: tag, id: uuid(), color: randomColor() })
                : ''
            }>
            添加
          </Button>
        </div>
        <div className="badges">
          {tags.map((tag) => {
            return (
              <span key={tag.id} onClick={() => onDeleteTag(tag.id)}>
                <Badge size="small" count="x" className="badge" title="">
                  <Badge count={tag.label} color={tag.color}></Badge>
                </Badge>
              </span>
            )
          })}
        </div>
      </Modal>
    </div>
  )
}
