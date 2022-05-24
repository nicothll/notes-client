const springTransition = {
        type: "spring",
        mass: 0.6,
        damping: 9,
        when: "beforeChildren",
        staggerChildren: 0.4,
}

export const homeContainerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { delay: 0.3, duration: 1 },
    },
    exit: {
      x: '-100vw',
      transition: { ease: 'easeInOut' },
    }
  }
export const containerLeftVariants = {
    hidden: {
    opacity: 0,
    x: "-100vw",
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: springTransition
    },
    exit: {
        x: '-100vw',
        transition: { ease: 'easeInOut' },
        }
}

export const containerRightVariants = {
    hidden: {
        opacity: 0,
        x: "100vw",
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: springTransition
    },
    exit: {
        x: '100vw',
        transition: { ease: 'easeInOut' },
      }
}
