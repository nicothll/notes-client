import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import axios from '../api/axios';
import { useEffect, useState } from 'react';

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

  const [ isChecked, setIsChecked ] = useState<boolean>(note.checked)
  
  const updateChecked = async () => {
    await axios.put<Note>(
        `/api/notes/${note._id}`,
        {"checked": isChecked},
        {
            headers: { 'Content-Type': 'application/json' }
        }
      )
    }
    const handleCheck = () => {
      setIsChecked(!isChecked)
    }
    useEffect(() => {
      if (note.checked !== isChecked){
        updateChecked()
      }
  }, [isChecked])

  return (
    <NoteItemContainer>
      <Link to={`/notes/${note._id}`}>
        <motion.h3
          whileHover={{scale: 1.4, originX: 0.2, color: '#f8e112'}}
        >
          { note.title }
        </motion.h3>
      </Link>
      <motion.span
        whileHover={{scale: 1.4, originX: 0.5, color: '#06EF82'}}
        whileTap={{scale: 0.8}}
        onClick={handleCheck}
      >
        {isChecked ? (
          <CheckCircleOutlineIcon fontSize='inherit' style={{ color: "06EF82" }}/>
        ): (
          <RadioButtonUncheckedIcon fontSize='inherit' />
        )}
      </motion.span>
    </NoteItemContainer>
  )
}

export default NoteItem

const NoteItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid  var(--primary-color-variant);
  margin-bottom: 12px;
  padding: 8px 24px;

  & span {
    font-size: 1.3rem;
    cursor: pointer;
  }
`