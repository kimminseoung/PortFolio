import styled from "styled-components";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BsFillMoonStarsFill, BsSunFill } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from "recoil";
import { DarkModeValue } from "../etc/atom";

const Container = styled(motion.div)`
  position: absolute;
  bottom: 60px;
  right: 50px;
  z-index: 123456;
`;
const Icon = styled.div<{ isDark: boolean }>`
  width: 50px;
  height: 50px;
  text-align: center;
  font-size: 24px;
  border-radius: 50%;
  transition: 0.5s;
  line-height: 50px;
  background-color: ${props => (props.isDark ? "#dcdde1" : "#353b48")};
  box-shadow: ${props => (props.isDark ? "0 0 20px rgba(255,255,255,0.5)" : "0 0 20px rgba(0,0,0,0.5)")};
`;
function DarkMode() {
  const [dark, setDark] = useRecoilState(DarkModeValue);
  const isDark = useRecoilValue(DarkModeValue);

  return (
    <Container
      onClick={() => {
        setDark(prev => !prev);
      }}
    >
      {isDark ? (
        <Icon isDark={isDark}>
          <BsSunFill style={{ color: "#c23616" }} />
        </Icon>
      ) : (
        <Icon isDark={isDark}>
          <BsFillMoonStarsFill style={{ color: "yellow" }} />
        </Icon>
      )}
    </Container>
  );
}

export default DarkMode;