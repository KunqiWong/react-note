import { Form, Col, Row, Input, Select, Button } from 'antd'
import './NoteForm.scss'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NoteData } from '../../models/data'
import { Tag } from '../../models/data'
import useWatch from '../../hooks/useWatch'
// import { useContext, createContext } from 'react'

// const Context = createContext({})

export function NoteForm({ note, onCreateNote, onUpdateNote, allTag }: any) {
  const [Title, setTitle] = useState<string>(note ? note.title : '')
  const [Content, setContent] = useState<string>(note ? note.markdown : '')
  const [selectedItems, setSelectedItems] = useState<string[]>(
    note ? note.tags.map((tag: any) => tag.label) : []
  )
  // const { onCreateNote, addTag } = useContext(Context)

  const options = [...allTag.map((tag: Tag) => tag.label)]
  const filteredOptions = options.filter((o) => !selectedItems.includes(o))
  const { TextArea } = Input
  const navigate = useNavigate()

  const data: NoteData = {
    tags: note
      ? note.tags
      : allTag.filter((tag: Tag) => selectedItems.includes(tag.label)),
    title: Title,
    markdown: Content,
  }

  useEffect(() => {
    data.tags = allTag.filter((tag: Tag) => selectedItems.includes(tag.label))
  }, [selectedItems])

  const onFinish = () => {
    console.log('Success:', data)
    if (note) {
      onUpdateNote(note.id, {
        ...data,
      })
    } else onCreateNote(data)
    navigate('..')
  }
  return (
    <div className="form">
      <Form layout="vertical" onFinish={onFinish} autoComplete="off">
        <Row className="space-between">
          <Col span={11}>
            <Form.Item
              label="标题"
              name="标题"
              initialValue={Title}
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
          <Col span={24}>
            <Form.Item
              label="内容"
              name="内容"
              initialValue={Content}
              rules={[{ required: true, message: '请输入内容' }]}>
              <TextArea
                rows={15}
                value={Content}
                onChange={(e) => setContent(e.target.value)}></TextArea>
            </Form.Item>
          </Col>
          <Col span={24} className="flexEnd">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Link to="..">
                <Button htmlType="button" style={{ marginLeft: '1vw' }}>
                  取消
                </Button>
              </Link>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
