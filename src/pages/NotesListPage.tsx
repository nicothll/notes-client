import axios from "../api/axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import NoteItem, { Note } from "../components/NoteItem";


const NOTES_URL = 'api/notes';

const NotesListPage = () => {

  const [ notes, setNotes ] = useState<Note[]>([]);

  useEffect(() => {
    axios.get<Note[]>(NOTES_URL).then(
      response => {
        console.log(response?.data);
        setNotes(response?.data);
      }
    )
  }, [])
      
  return (
    <NotesContainer>
      <NotesHeader>
        <h2>&#9782; Notes</h2>
        <p>{ notes.length }</p>
      </NotesHeader>
        <NotesList>
            {
                notes.map((note: Note, index) => (
                    <NoteItem key={index} note={note}/>
                ))
            }
        </NotesList>
        <ButtonContainer>
          <Link to='notes/new'>
              <button><AddIcon /></button>
          </Link>
        </ButtonContainer>
    </NotesContainer>
  )
}

export default NotesListPage

const NotesContainer = styled.div``

const NotesHeader = styled.div``

const NotesList = styled.ol``

const ButtonContainer = styled.div``
