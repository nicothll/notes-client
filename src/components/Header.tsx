import { motion } from 'framer-motion'
import styled from 'styled-components'
import { device } from '../config/device'

const HeaderVariants = {
  hidden: {
    y: -250 
  },
  visible: {
    y: 0,
    transition: { delay: 0.1, type: 'spring' , stiffness: 70 }
  }
}

const Header = () => {
  return (
    <HeaderStyled
      as={motion.div}
      variants={HeaderVariants}
      initial="hidden"
      animate="visible"
    >
      <h1>ReactNotes</h1>
      <small>Powered by FastAPI and MongoDB</small>
    </HeaderStyled>
  )
}

export default Header

const HeaderStyled = styled.header`
  display: flex;
  padding: 1.5rem;
  justify-content: space-between;
  box-shadow: 0px 1px 3px rgba(0,0,0,0.2);

  & h1{
    font-size: 2rem;
    color: var(--secondary-color);
    font-weight: 800;
    text-align: center;
  }

  & small {
    color: var(--color-dark);
    font-size: 0.8rem;
  }

  @media screen and ${device.mobile} {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
  };

`