import { motion } from 'framer-motion';
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
            <motion.h3 whileHover={{scale: 1.1, originX: 0.1, color: '#f8e112'}}>{ note.title }</motion.h3>
        </NoteItemStyled>
    </Link>
  )
}

export default NoteItem

const NoteItemStyled = styled.div`
  border-bottom: 1px solid  var(--primary-color-variant);
  margin-bottom: 12px;
  padding: 8px 24px;
  color: var(--primary-color);
  transition: all 0.4s ease-in-out;

  // &:hover {
  //   background-color: var(--secondary-bg-color);
  // }
`