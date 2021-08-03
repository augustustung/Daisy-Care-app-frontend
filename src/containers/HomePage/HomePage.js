import React, { Component } from 'react'
import { connect } from 'react-redux';

import './HomePage.scss'
import HomeHeader from './HomeHeader';
import Specialty from './Sections/Specialty';
import MedicalFacility from './Sections/MedicalFacility';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OutstandingDoctor from './Sections/Outstanding-Doctor';
import HandBook from './Sections/HandBook';
import About from './Sections/About';
import HomeFooter from './HomeFooter';


class HomePage extends Component {
    
    handleAfterChange = (index) => {
        console.log("CHECK", index)
    }
    
    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll:1,
            afterChange: this.handleAfterChange
        };

        return (
            <div>
                <HomeHeader/>
                <Specialty settings={settings}/>
                <MedicalFacility settings={settings}/>
                <OutstandingDoctor settings={settings} />
                <HandBook settings={settings} />
                <About />
                <HomeFooter />
            </div>
        )
    }
}



const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
