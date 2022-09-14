import React, { useEffect, useState } from 'react';
import SliderContent from './SliderContent';
import Dots from './Dots';
import Arrows from './Arrows';
import SliderImage from './SliderImage';
import './slider.css';
import science from '../../assets/images/logo.JPG';

const len = SliderImage.length - 1;
var sliderData = [];
var idFromSlider = "";

function Slider(props) {
    const [activeIndex, setActiveIndex] = useState(0);

    async function checkUser() {
        const req = await fetch('https://serwis-z-tresciami.herokuapp.com/api/course/manageCourseBySubject?subject=' + 'Matematyka', {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
        })
    
        const data = await req.json()
        console.log(data);
        sliderData = data;
        
    }
    



    useEffect(() => {
        checkUser();
        // auto changing slides
         const interval = setInterval(() => {
             setActiveIndex(activeIndex === len ? 0 : activeIndex + 1);
         }, 5000);
         return () => clearInterval(interval);
    }, [activeIndex]);

    return (
        <div className='slider-container'>
            <div className='appbar-container'>
                <div className='left-column'>
                    <h2 className='left-main-text'>Obejrzyj i zdaj z Tutors Alpha!</h2>
                    <h2 className='left-bottom-text'>
                        Na stronie znajdziesz kursy z przedmiotów ogólnokształcących dla szkół podstawowych i ponadpodstawowych.
                    </h2>
                    <div className='left-start-button'>
                        Zacznij już dziś!
                    </div>
                </div>
                <div className='right-column'>
                    <img className="right-side-image" src={science}></img>
                </div>
            </div>
            <h2 className='main-slide-text'>Przykładowe kursy</h2>
            <div className="category-column">
                <div className="category-column-text">Matematyka</div>
                <div className="category-column-text">Język polski</div>
                <div className="category-column-text">Język angielski</div>
                <div className="category-column-text">Informatyka</div>
                <div className="category-column-text">Biologia</div>
                <div className="category-column-text">Fizyka</div>
                <div className="category-column-text">Chemia</div>
                <div className="category-column-text">Historia</div>
            </div>
            <div className='slider-row'>
               
                <SliderContent activeIndex={activeIndex < 1 ? len : activeIndex - 1} sliderImage={sliderData}  />
                <SliderContent activeIndex={activeIndex} sliderImage={sliderData}  onClick={idFromSlider=sliderData._id}/>
                <SliderContent activeIndex={activeIndex === len ? 0 : activeIndex + 1} sliderImage={sliderData}  />

            </div>
            <Arrows
                prevSlide={() =>
                    setActiveIndex(activeIndex < 1 ? len : activeIndex - 1)
                }
                nextSlide={() =>
                    setActiveIndex(activeIndex === len ? 0 : activeIndex + 1)
                }
            />
            <Dots
                activeIndex={activeIndex}
                SliderImage={SliderImage}
                onClick={(activeIndex) => setActiveIndex(activeIndex)}
            />
            <div className="category-menu">
            <h2 className="category-text">Kategorie</h2>
            <div className="category-menu-container">
                    <div className="row">
                        <div className='square-button'>Matematyka</div>
                        <div className='square-button'>Język polski</div>
                        <div className='square-button'>Język angielski</div>
                        <div className='square-button'>Informatyka</div>
                    </div>
                    <div className="row">
                        <div className='square-button'>Biologia</div>
                        <div className='square-button'>Chemia</div>
                        <div className='square-button'>Fizyka</div>
                        <div className='square-button'>Historia</div>
                    </div>
                    <div className="row">
                        <div className='square-button'>Geografia</div>
                        <div className='square-button'>Muzyka</div>
                        <div className='square-button'>Język niemiecki</div>
                        <div className='square-button'>Podstawy przedsiębiorczości</div>
                    </div>
            </div>
        </div>
        </div>
        
    );
}

export default Slider;