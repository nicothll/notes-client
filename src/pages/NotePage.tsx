import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../api/axios';
import styled from 'styled-components'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { Note } from "../components/NoteItem"
import { motion } from 'framer-motion';
import { containerRightVariants } from '../animations/variants';
import { device } from '../config/device';

const NotesListPage = () => {

  const { id } = useParams()
    const [ note, setNote ] = useState<Note>()

    useEffect(() => {
        if (id !== "new") {
            axios.get<Note>(`/api/notes/${id}`).then(
              response => {
                console.log(response?.data);
                setNote(response?.data);
              }
            )
        }
      }, [id]);
    
      const createNote = async () => {
          await axios.post<Note>(
              "/api/notes",
              JSON.stringify({
                ...note
              }),
              {
                  headers: { 'Content-Type': 'application/json' }
              }
          
          )
      };
      const updateNote = async () => {
        await axios.put<Note>(
            `/api/notes/${id}`,
            JSON.stringify({
            ...note
            }),
            {
                headers: { 'Content-Type': 'application/json' }
            }
        
        )
      };
      const deleteNote = async () => {
          await axios.delete<Note>(
              `/api/notes/${id}`,
              {
                  headers: { 'Content-Type': 'application/json' }
              }
          
          )
      };

    const handleSubmit = () => {
        if (id !== "new") {
            updateNote()
        } else if(id === "new" && note !== undefined){
            createNote()
        }
    }

    const handleChange = (e: any) => {
        const { name, value} = e.target;
        setNote((prevNote: any) => {
            return { 
              ...prevNote, 
              [name]: value 
            }
        });
    };
      
  return (
    <NoteContainer className="container"
        as={motion.div}
        variants={containerRightVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
    >
      <NoteHeader>
        <motion.h3 
            whileHover={{
                x: -8,
                transition: {
                    duration: 0.3,
                    repeat: Infinity
                }
            }}
            onClick={handleSubmit}>
          <Link to="/">
            <ChevronLeftIcon fontSize='inherit' />
          </Link>
        </motion.h3>
        <h3>
            <NoteInput
                name='title'
                onChange={handleChange} 
                defaultValue={note?.title}
                placeholder="title"
            />
        </h3>
        <motion.h3
            whileHover={{scale: 1.4, originX: 1, originY: -0.3, color: '#cf3132'}}
            whileTap={{scale: 0.8}}
        >
            <Link to="/">
                {
                    id!== "new" ? (
                        <span onClick={deleteNote}>
                            <DeleteForeverIcon fontSize='inherit' />
                        </span>
                    ) : (
                        <motion.span
                            whileHover={{color: '#06EF82'}}
                            onClick={handleSubmit}
                        >
                            <SaveAsIcon fontSize='inherit' />
                        </motion.span>
                    )
                }
            </Link>
        </motion.h3>
      </NoteHeader>
        <NoteText
              name="description"
              onChange={handleChange}
              defaultValue={note?.description}
              placeholder="description"
        />
    </NoteContainer>
  )
}

export default NotesListPage

const NoteContainer = styled.div`
    @media screen and ${device.tablet} {
        margin: 2rem auto;
        max-width: 60%;
    };

    @media screen and ${device.mobile} {
        margin: 0 auto;
        max-width: 100%;
    };
`

const NoteHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;

    & h3 {
        font-size: 1.5rem;
        cursor: pointer;
    }
`
const NoteInput = styled.input`
    background-color: transparent;
    border: none;
    outline: none;
    font-weight: 600;
    text-align: center;
    resize: none;
`
const NoteText = styled.textarea`
    background-color: transparent;
    border: none;
    padding: 2rem 3rem;
    width: 100%;
    height: 70vh;
    resize: none;

    &:active, &:focus {
        outline: none;
        border: none:
    }
`
