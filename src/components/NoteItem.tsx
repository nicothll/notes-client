import { Link } from 'react-router-dom'
import styled from 'styled-components'

export type Note = {
    _id: number;
    title: string;
    description: string;
    checked: boolean;
}

interface NoteProps {
    note: Note
}

const NoteItem = ({ note }: NoteProps) => {
  return (
    <Link to={`/notes/${note._id}`}>
        <NoteItemStyled>
            <h3>{ note.title }</h3>
        </NoteItemStyled>
    </Link>
  )
}

export default NoteItem

const NoteItemStyled = styled.div``