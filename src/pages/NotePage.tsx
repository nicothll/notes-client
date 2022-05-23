import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../api/axios';
import styled from 'styled-components'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Note } from "../components/NoteItem"


const NotePage = () => {

    const { id } = useParams()
    const [ note, setNote ] = useState<Note>()

    useEffect(() => {
        axios.get<Note>(`/api/notes/${id}`).then(
          response => {
            console.log(response?.data);
            setNote(response?.data);
          }
        )
      }, [id]);
    
      const createNote = async () => {
          await axios.post<Note>(
              "/api/notes/",
              JSON.stringify({
                ...note
              }),
              {
                  headers: { 'Content-Type': 'application/json' }
              }
          
          )
      };
      const updateNote = async () => {
        const copy: any = {
            ...note
        };
        
        delete copy._id;

        await axios.put<Note>(
            `/api/notes/${id}`,
            JSON.stringify({
            ...copy
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
        } else if(id === "new" && note !== null){
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
    <NoteContainer>
        <NoteHeader>
            <Link to="/">
                <h3 onClick={handleSubmit}>
                    <ChevronLeftIcon />
                </h3>
            </Link>
            <h3>
                <input
                    name='title'
                    onChange={handleChange} 
                    defaultValue={note?.title}
                />
            </h3>
            <h3>
                <Link to="/">
                    {
                        id!== "new" ? (
                            <span onClick={deleteNote}><DeleteForeverIcon /></span>
                        ) : (
                            <button onClick={handleSubmit}>Create</button>
                        )
                    }
                </Link>
            </h3>
        </NoteHeader>
        <textarea
            name='description'
            onChange={handleChange}
            defaultValue={note?.description}
        ></textarea>
    </NoteContainer>
  )
}

export default NotePage

const NoteContainer = styled.div``

const NoteHeader = styled.div``