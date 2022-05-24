import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";

import AddIcon from '@mui/icons-material/Add';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

import axios from "../api/axios";
import NoteItem, { Note } from "../components/NoteItem";
import { containerLeftVariants } from "../animations/variants";
import { device } from "../config/device";


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
  }, [setNotes])
      
  return (
    <div>
      <NotesContainer className="container"
        as={motion.div}
        variants={containerLeftVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <NotesHeader>
          <p><FormatListBulletedIcon /></p>
          <h2>Tasks</h2>
          <p>{ notes.length }</p>
        </NotesHeader>
        <NotesListContainer>
          <NotesList>
              {
                notes.map((note: Note, index) => (
                  <NoteItem key={index} note={note}/>
                  ))
                }
          </NotesList>
        </NotesListContainer>
      </NotesContainer>
      <ButtonContainer>
        <Link to='notes/new'>
            <motion.button
              whileHover={{scale: 1.4}}
            ><AddIcon fontSize="large"/></motion.button>
        </Link>
      </ButtonContainer>
    </div>
  )
}

export default NotesListPage

const NotesContainer = styled.div`
  @media screen and ${device.tablet} {
    margin: 2rem auto;
    max-width: 60%;
  };

  @media screen and ${device.mobile} {
    margin: 0 auto;
    max-width: 100%;

  };
`

const NotesHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  cursor: default;

  & h2, p {
    font-size: 1.5rem;
    color: var(--primary-color);
  }

  & p {
    color: var(--secondary-color);
  }

  & svg {
    margin-top: 7px;
  }
`
const NotesListContainer = styled.div`
  display: block;
  overflow-y: auto;
  height: 60vh;
`
const NotesList = styled.ol`
  display: inline;
  

  @media screen and ${device.mobile} {
    height: 100vh;
    width: 100vw;
  };
`

const ButtonContainer = styled.div`
  font-size: 48px;
  position: absolute;
  bottom: 24px;
  right: 16px;
  background: var(--secondary-color);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
  
  & button {
    border: none;
    background: transparent;
    align-items: center;
    cursor: pointer;
  }
`
