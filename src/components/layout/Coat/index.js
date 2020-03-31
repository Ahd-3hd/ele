import React, { useState, useEffect, useRef } from "react";
import {
  Wrapper,
  BigImageContainer,
  CarouselWrapper,
  Circle,
  TitleContainer,
  ChiqueText,
  DressesText,
  SlidesContainer,
  SingleSlideSmall,
  SlidesInnerContainer,
  ArrowLeft,
  ArrowLeftIcon
} from "./index.style";
import imageOne from "../../../img/img5.jpg";
import imageTwo from "../../../img/img6.jpg";
import imageThree from "../../../img/img7.jpg";
import imageFour from "../../../img/img8.jpg";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { useSpring, config } from "react-spring";

const items = [imageOne, imageTwo, imageThree, imageFour];
const Coat = () => {
  const [translateBy, setTranslateBy] = useState(0);
  const [numOfChildren, setNumOfChildren] = useState(0);
  const [slideCount, setSlideCount] = useState(0);
  const [isVisible, setVisible] = useState(false);
  const animateSlides = useSpring({
    transform: `translateX(-${translateBy}px)`,
    config: config.gentle
  });
  let slideWrap = useRef(null);

  useEffect(() => {
    setNumOfChildren(slideWrap.current.childNodes.length - 1);
    let observer = new IntersectionObserver(el => {
      el[0].isIntersecting ? setVisible(true) : setVisible(false);
    });
    observer.observe(containerRef.current);
  }, []);
  const containerRef = useRef();
  const animateBig = useSpring({
    transform: isVisible ? "translateX(0%)" : "translateX(-100%)",
    config: config.gentle
  });
  const animateSmall = useSpring({
    transform: isVisible ? "translateX(0%)" : "translateX(100%)",
    config: config.gentle
  });
  const handleCarouselSlide = () => {
    console.log(translateBy);
    console.log(numOfChildren * 300 - 300);
    if (Math.abs(translateBy) <= numOfChildren * 300 - 300 - 300) {
      setTranslateBy(translateBy - 300);
      setSlideCount(slideCount + 1);
    } else {
      setTranslateBy(0);
      setSlideCount(0);
    }
  };
  return (
    <Wrapper ref={containerRef}>
      <CarouselWrapper style={animateSmall}>
        <Circle />
        <TitleContainer>
          <ChiqueText>STYLISH</ChiqueText>
          <DressesText>COATS</DressesText>
        </TitleContainer>
        <SlidesContainer>
          <SlidesInnerContainer ref={slideWrap}>
            {items.map((item, i) => {
              return (
                <SingleSlideSmall key={i} img={item} style={animateSlides} />
              );
            })}
            <ArrowLeft onClick={handleCarouselSlide}>
              <ArrowLeftIcon icon={faCaretLeft} />
            </ArrowLeft>
          </SlidesInnerContainer>
        </SlidesContainer>
      </CarouselWrapper>
      <BigImageContainer
        img={items[slideCount]}
        style={animateBig}
      ></BigImageContainer>
    </Wrapper>
  );
};

export default Coat;