import React, { useEffect, useState } from 'react'
import './mainPage.css'

import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../../redux/store';
import {
    GetCategoriesAndStates, SelectCategoryAndFetch, GetBusinesses, SelectStateAndFetch, SetCategoryKeyAndGet, SetStateAndGetCities, SetPageNumber, SetCityAndFetch,
    SetZipcodeAndFetch
} from '../../redux/actions/businessActions'
import { Indicator } from '../dumbComponents/indicator'
import { TiPhone } from "react-icons/ti";
import { HiOutlineMail } from "react-icons/hi";
import { IoLogoFacebook, IoLogoTwitter } from "react-icons/io";
import { MdLocationCity } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import Navigation from '../NavigationContainer/navigation';
//import { MyMapComponent } from '../GoogleMapComponent/googleMapComponent2'
const mainURL = "http://localhost:6006/"
function capitalizeFirstLetter(word) {

    const words = word.split(" ");

    words.map((word) => {
        return word[0].toUpperCase() + word.substring(1);
    }).join(" ");
}
export default function MainPageContainer1() {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetCategoriesAndStates())
    }, [])
    const state = useSelector((state) => state.businessReducer)
    const [matchedStates, matchState] = useState([])
    const [searchedCities, searchCity] = useState([])
    const searchState = (key) => {
        let x = []
        if (key.length != 0) {
            state.categoriesStates.states.forEach(el => {
                if (el.state.toLowerCase().startsWith(key)) {
                    x.push(el)
                }
                
            });
            matchState(precState =>  x)
            console.log(x)
        }
        else {
            matchState(precState =>  [])
        }
    }
    const setCityAndSearch = (key) => {
        let x = []
        if (key.length != 0) {
            state.matchedCities.forEach(el => {
                if (el.toLowerCase().startsWith(key)) {
                    x.push(el)
                }
                
            });
            searchCity(precState =>  x)
            console.log(x)
        }
        else {
            matchState(precState =>  [])
        }
    }
    const selectCategoryAndGetData = (event, sic_code) => {
        console.log(event, sic_code)
        const sic_code_to_send = state.categoryInserted !== sic_code ? sic_code : 0
        console.log("NEW CODE TO SEND", sic_code_to_send)
        dispatch(SelectCategoryAndFetch(
            {
                category: sic_code_to_send,
                state: state.stateInserted,
                hasEmail: false, hasWebsite:
                    false, lastID: state.lastID
            }, sic_code_to_send))
        //dispatch(GetCounts({category:sic_code_to_send,state:state.stateInserted,hasEmail:false,hasWebsite:false}))
    }
    const selectStateAndGetData = (event, stateAbbreviation) => {
        console.log("State seçiliyor", stateAbbreviation)
        const state_to_send = state.stateInserted !== stateAbbreviation ? stateAbbreviation : ''
        setTimeout(() => dispatch(SetStateAndGetCities(stateAbbreviation)))
        dispatch(SelectStateAndFetch(
            {
                category: state.categoryInserted,
                state: state_to_send, hasEmail: false,
                hasWebsite: false,
                lastID: state.lastID
            }, state_to_send))

        //dispatch(GetCounts({category:state.categoryInserted,state:state_to_send,hasEmail:false,hasWebsite:false}))
    }
    const selectLocationAndGetData = (key) => {

        setTimeout(() => dispatch(SetStateAndGetCities(key)))

    }
    const setCategorySearchKeyAndFetch = (key) => {

        if (key.length > 3)
            setTimeout(() => dispatch(SetCategoryKeyAndGet(key)))
        else if (key.length == 0)
            setTimeout(() => dispatch(SetCategoryKeyAndGet(key)))

    }
    const setCityAndFetch = (city) => {
        const city_to_send = state.insertedCity !== city ? city : ''
        dispatch(SetCityAndFetch(
            {
                category: state.categoryInserted,
                state: state.stateInserted,
                hasEmail: false,
                hasWebsite: false,
                lastID: state.lastID,
                city: city_to_send
            }, city_to_send))
    }
    const setZipcodeAndFetch = (zipCode) => {
        const zipCode_to_send = state.insertedZipcode !== zipCode ? zipCode : 0
        dispatch(SetZipcodeAndFetch(
            {
                category: state.categoryInserted,
                state: state.stateInserted,
                hasEmail: false,
                hasWebsite: false,
                lastID: state.lastID,
                city: state.insertedCity,
                zipCode: zipCode_to_send
            }, zipCode_to_send))
    }

    if (!state.categoriesStates) {
        return <Indicator />
    }
    console.log("yapışan stateler", matchedStates)
    const pages = []

    for (let i = 0; i < state.businesses.length / 20; i++) {
        pages.push(<li class="page-item"><a class="page-link" href="#" onClick={() => dispatch(SetPageNumber(i + 1))}>{i + 1}</a></li>)
    }

    return (
        <>
            {state.businessLoading ? <Indicator /> : null}
            <div className="container-fluid">
                <Navigation />


                <div className="row">
                    <div className="col-xs-6 col-md-3 col-sm-4 filters-section">
                        {/* <h2 className="text-left filter-header">Categories</h2> */}
                        <div className="category-search-bar-box">
                            <input className="category-search-bar" type="text" placeholder="Search Categories"
                                onChange={(event) => setCategorySearchKeyAndFetch(event.target.value)}></input>
                        </div>
                        <div className="list-group categories-list">
                            {state.matchedCategories.length == 0 && state.categoriesStates?.categories?.map(
                                (category, i) => (
                                    <div id={i} className={category.sic_code == state.categoryInserted ? "list-group-item checked-category" : "list-group-item"} onClick={(e) => selectCategoryAndGetData(e, category.sic_code)}>{category.category_name}</div>

                                )
                            )}
                            {state.matchedCategories.length !== 0 && state.matchedCategories?.map(
                                (category, i) => (
                                    <div id={i} className={category.sic_code == state.categoryInserted ? "list-group-item checked-category" : "list-group-item"} onClick={(e) => selectCategoryAndGetData(e, category.sic_code)}>{category.category_name}</div>

                                )
                            )}
                        </div>
                        {/* <h2 className="text-left filter-header">States</h2> */}
                        <div className="category-search-bar-box">
                            <input className="category-search-bar" type="text" placeholder="Search States"
                                onChange={(event) => searchState(event.target.value)}></input>
                        </div>
                        <div className="list-group categories-list">
                            {matchedStates.length == 0 && state.categoriesStates?.states?.map(
                                (state1, i) => (
                                    <div id={i} className={state1.abbreviation == state.stateInserted ? "list-group-item checked-category" : "list-group-item"}
                                        onClick={(e) => selectStateAndGetData(e, state1.abbreviation)}>{state1.state}</div>
                                )
                            )}
                            {matchedStates.length != 0 && matchedStates.map(
                                (state1, i) => (
                                    <div id={i} className={state1.abbreviation == state.stateInserted ? "list-group-item checked-category" : "list-group-item"}
                                        onClick={(e) => selectStateAndGetData(e, state1.abbreviation)}>{state1.state}</div>
                                )
                            )}
                        </div>
                        { state.matchedCities.length != 0 && 
                            <>
                                <div className="category-search-bar-box">
                                    <input className="category-search-bar" type="text" placeholder="Search States"
                                        onChange={(event) => setCityAndSearch(event.target.value)}></input>
                                </div>
                                <div className="list-group categories-list">
                                    {searchedCities.length == 0 && state.matchedCities.map(
                                        (city, i) => (
                                            <div id={i} className={city == state.insertedCity ? "list-group-item checked-category" : "list-group-item"}
                                                onClick={() => setCityAndFetch(city)}>{city}</div>
                                        )
                                    )}
                                     {searchedCities.length != 0 && searchedCities.map(
                                        (city, i) => (
                                            <div id={i} className={city == state.insertedCity ? "list-group-item checked-category" : "list-group-item"}
                                                onClick={() => setCityAndFetch(city)}>{city}</div>
                                        )
                                    )}
                                </div>
                            </>
                        }
                            
                        {state.zipCodes.length != 0 &&
                            <>
                                <div className="category-search-bar-box">
                                    <input className="category-search-bar" type="text" placeholder="Search States"
                                        onChange={(event) => setCategorySearchKeyAndFetch(event.target.value)}></input>
                                </div>
                                <div className="list-group categories-list">
                                    {state.zipCodes.map(
                                        (zipCode, i) => (
                                            <div id={i} className={zipCode == state.insertedZipcode ? "list-group-item checked-category" : "list-group-item"}
                                                onClick={() => setZipcodeAndFetch(zipCode)}>{zipCode}</div>
                                        )
                                    )}
                                </div>
                            </>}
                        
                    </div>
                    {state.businesses.length != 0 &&

                        <div className="col-xs-6 col-md-5 col-sm-8 business-section">
                            {/* <h2 className="text-left filter-header">Businesses</h2> */}
                            <div className="row">
                                {state.businesses && state.businesses.slice((state.currentPage - 1) * 20, (state.currentPage * 20)).map(
                                    (bus) => (
                                        <div className="row card-container" onClick={
                                            () => {
                                                console.log(mainURL + 'biz/' + bus.name.split(" ").join("-") + "/" + bus.city.split(" ").join("-") + "/" + bus.state + "/" + bus.id)
                                                let openURL =mainURL + 'biz/' + bus.name.split(" ").join("-") + "/" + bus.city.split(" ").join("-") + "/" + bus.state + "/" + bus.id
                                                var win = window.open(openURL)
                                                setTimeout(()=>win.focus(),400)
                                                
                                            }

                                        }>
                                            <div className="col-12 business-name">
                                                <span className="business-name-text font-weight-bold text-uppercase">{bus.name}</span>

                                            </div>
                                            <div className="col-6 business-other">
                                                {bus.phone1 && <h1 className="phone-text"><TiPhone color="orange" /> {bus.phone1}</h1>}
                                                {bus.website && <h1 className="phone-text"><CgWebsite color="orange" /> {bus.website}</h1>}
                                                {bus.email1 && <h1 className="phone-text"><HiOutlineMail color="orange" /> {bus.email1}</h1>}

                                            </div>
                                            <div className="col-6 business-other">
                                                {bus.facebok && <label className="business-name-text"><IoLogoFacebook color="orange"
                                                    onClick={() => { var win = window.open(bus.facebok) }} />{bus.facebok}-</label>}
                                                {bus.twitter && <label className="business-name-text"><IoLogoTwitter color="orange"
                                                    onClick={() => { var win = window.open(bus.twitter) }} />{bus.twitter}-</label>}

                                            </div>
                                            <div className="col-12">
                                                {bus.city && <h1 className="phone-text"><MdLocationCity color="orange" />{bus.street},{bus.city},{bus.state}</h1>}
                                            </div>



                                        </div>
                                    )
                                )}
                            </div>

                            {state.businesses.length != 0 && (
                                <nav aria-label="" class="navigation-bottom">
                                    {state.businesses.length / 20 > 1 &&
                                        <ul class="pagination justify-content-center">
                                            <li class={state.currentPage == 1 ? "page-item disabled" : "page-item"} >
                                                <a class="page-link" href="#" tabindex="-1" onClick={() => dispatch(SetPageNumber(state.currentPage - 1))} >Previous</a>
                                            </li>
                                            {pages}
                                            <li class={state.currentPage == Math.floor(state.businesses.length / 20) ? "page-item disabled" : "page-item"}
                                            >
                                                <a class="page-link" href="#" onClick={() => dispatch(SetPageNumber(state.currentPage + 1))}>Next</a>
                                            </li>

                                        </ul>}
                                </nav>
                            )}
                        </div>
                    }
                </div>
            </div>
        </>

    )
}
