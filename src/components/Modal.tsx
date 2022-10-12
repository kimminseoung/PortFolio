import styled from "styled-components";
import { useRecoilState } from "recoil";
import { motion, AnimatePresence } from "framer-motion";
import { ModalText } from "../etc/atom";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ProjectProps } from "../pages/Project";
import { fetchProject } from "../etc/firebase";
import { AiOutlineCloseSquare } from "react-icons/ai";

const Overlay = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 11110;
  background-color: rgba(0, 0, 0, 0.5);
`;
const Close = styled.div`
  position: absolute;
  cursor: pointer;
  top: 13px;
  right: 13px;
  font-size: 2.375rem;
  @media ${props => props.theme.mobile} {
    font-size: 1.125rem;
  }
`;
const Container = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 11111;
  @media ${props => props.theme.mobile} {
    padding: 0;
  }
`;
const Contents = styled(motion.div)`
  position: relative;
  width: 900px;
  height: 450px;
  overflow-y: scroll;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 1.25rem;
  box-shadow: 0 2px 3px rgba(255, 255, 255, 0.1), 0 10px 20px rgba(255, 255, 255, 0.06);
  display: flex;
  padding: 1.25rem;
  & > div {
    width: 50%;
    h3 {
      font-size: 1.75rem;
    }
    img {
      border-radius: 15px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    a {
      display: block;
      padding-left: 1.375rem;
      margin-top: 0.938rem;
      font-size: 0.875rem;
      cursor: pointer;
      color: dodgerblue;
    }
  }
  .text {
    padding-left: 0.938rem;
    padding-top: 0.938rem;
    & > div {
      margin-bottom: 1.875rem;
    }
  }
  .skillList {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
    margin-top: 10px;
  }
  @media ${props => props.theme.mobile} {
    width: 100%;
    padding: 6px;
    & > div {
      width: 100%;
    }
    flex-direction: column-reverse;
    .text {
      & > div {
        margin-bottom: 0;
      }
    }
  }
`;
const modalBackGround = {
  init: {
    opacity: 0,
    visiBility: "hidden",
  },
  start: {
    opacity: 1,
    visiBility: "visible",
  },
  end: {
    opacity: 0,
    visiBility: "hidden",
  },
};
const modalForm = {
  init: {
    y: -10,
    opacity: 0,
  },
  start: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
    },
  },
  end: {
    opacity: 0,
    y: 10,
  },
};
function Modal() {
  const [id, setId] = useRecoilState(ModalText);
  const [DB, setDB] = useState([]);
  useEffect(() => {
    fetchProject().then(data => {
      const context = data.docs.map((doc: DocumentData) => ({
        ...doc.data(),
      }));
      setDB(context);
    });
    return () => {
      fetchProject();
    };
  }, []);
  const hidden = () => {
    setId("");
  };
  return (
    <AnimatePresence>
      {id ? (
        <>
          <Overlay onClick={hidden} />
          <Container variants={modalBackGround} initial='init' animate='start' exit='end'>
            {DB.filter((ele: any) => ele.id === id).map((ele: ProjectProps) => (
              <Contents variants={modalForm} initial='init' animate='start' exit='end' key={ele.id} layoutId={id}>
                <div className='image'>
                  <img src={require(`../img/${ele.img}.png`)} alt={`${ele.img}`} />
                </div>
                <div className='text'>
                  <div>
                    <h3>{ele.name}</h3>
                  </div>
                  <div>
                    <span style={{ paddingBottom: "5px" }}>◆ 기술</span>
                    <ul className='skillList'>
                      {ele.skill.map((ele, index) => (
                        <li key={index}>- {ele}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    ◆ GitPage
                    <a href={ele.gitLink}>{ele.gitLink}</a>
                  </div>
                  <div>
                    ◆ GitCode
                    <a href={ele.gitLink}>{ele.gitCode}</a>
                  </div>
                </div>
              </Contents>
            ))}
            <Close onClick={hidden}>
              <AiOutlineCloseSquare />
            </Close>
          </Container>
        </>
      ) : null}
    </AnimatePresence>
  );
}
export default Modal;
