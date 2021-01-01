import React, { useEffect } from 'react'
import './mainPageContainer.css'

import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../../redux/store';
import { GetCategoriesAndStates, SelectCategoryAndFetch, GetBusinesses, SelectStateAndFetch, SetCategoryKeyAndGet, SetStateAndGetCities } from '../../redux/actions/businessActions'
import { Indicator } from '../dumbComponents/indicator'
//import { MyMapComponent } from '../GoogleMapComponent/googleMapComponent2'
const mainURL = "https://www.localdata.us/"
export default function MainPageContainer() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetCategoriesAndStates())
    }, [])
    const state = useSelector((state) => state.businessReducer)

    const selectCategoryAndGetData = (event, sic_code) => {
        console.log(event.target.checked, sic_code, state.categoryInserted)
        const sic_code_to_send = event.target.checked ? sic_code : 0
        console.log("NEW CODE TO SEND", sic_code_to_send)
        dispatch(SelectCategoryAndFetch({ category: sic_code_to_send, state: state.stateInserted, hasEmail: false, hasWebsite: false }, sic_code_to_send))
        //dispatch(GetCounts({category:sic_code_to_send,state:state.stateInserted,hasEmail:false,hasWebsite:false}))
    }
    const selectStateAndGetData = (event, stateAbbreviation) => {
        const state_to_send = event.target.checked ? stateAbbreviation : ''
        dispatch(SelectStateAndFetch({ category: state.categoryInserted, state: state_to_send, hasEmail: false, hasWebsite: false }, state_to_send))
        //dispatch(GetCounts({category:state.categoryInserted,state:state_to_send,hasEmail:false,hasWebsite:false}))
    }
    const selectLocationAndGetData = (key) => {
        if(key.length>1){
            setTimeout(()=>dispatch(SetStateAndGetCities(key)),300 )
            
        }
        else if(key.length == 0){
            setTimeout(()=>dispatch(SetStateAndGetCities(key)),300 )
        }
    }
    const setCategorySearchKeyAndFetch = (key)=>{
        
            dispatch(SetCategoryKeyAndGet(key))
        
        // console.log(key)
        // if(key.length>2){
        //     setTimeout(()=>dispatch(SetCategoryKeyAndGet(key)),100 )
        //     console.log("Entered function")
            
        // }
        // else if(key.length == 0){
        //     setTimeout(()=>dispatch(SetCategoryKeyAndGet(key)),100 )
        // }
    }
    console.log(state)
    return (
        <>
            <div className="fluid-container top-bar">

            </div>
            <div className="fluid-container info-container">
            
            </div>
            <div className="fluid-container">
            
                <div className="row">
                    {/* Left Side */}
                    <div className="col-md-5 filters_container">
                    <input type="text" className="search-bar-cat" placeholder="Search category"
                    onChange={(event)=>setCategorySearchKeyAndFetch(event.target.value)}></input>
                    
                        <div className="row filter-inner">
                        {/* <ul className="ks-cboxtags">
                        <li><input type="checkbox" id="checkboxTwo" value="Cotton Candy" /><label for="checkboxTwo">Cotton Candy</label></li></ul> */}
                        {state.matchedCategoriesLoading ? <Indicator /> : null}
                            {state && state.matchedCategories.length == 0 && state.categoriesStates?.categories?.map(
                                (category, i) => (
                                    <div className="col-12" key={i} style={{ marginLeft: '0px', borderBottom: '1px solid' }}>
                                        <input type="checkbox" disabled={state.businessLoading} onChange={(e) => selectCategoryAndGetData(e, category.sic_code)} className="option-input checkbox" checked={state.categoryInserted === category.sic_code} />
                                        <label className="category-li">{category.category_name}</label>
                                    </div>
                                )
                            )}
                            
                            {state && state.matchedCategories.length !== 0 && state.matchedCategories.map(
                                (category, i) => (
                                    <div className="col-12" key={i} style={{ marginLeft: '0px', borderBottom: '1px solid' }}>
                                        <input type="checkbox" disabled={state.businessLoading} onChange={(e) => selectCategoryAndGetData(e, category.sic_code)} className="option-input checkbox" checked={state.categoryInserted === category.sic_code} />
                                        <label className="category-li">{category.category_name}</label>
                                    </div>
                                )
                            )}
                        </div>
                        <input type="text" className="search-bar-cat" id="2" placeholder="Search states" 
                        onChange={(event)=> selectLocationAndGetData(event.target.value)}></input>
                        <div className="row filter-inner">
                        
                            {state && state.categoriesStates?.states?.map(
                                (state1, i) => (
                                    <div className="col-12" key={i} style={{ marginLeft: '0px', borderBottom: '1px solid' }}>
                                        <input type="checkbox" onChange={(e) => selectStateAndGetData(e, state1.abbreviation)} className="option-input checkbox" checked={state.stateInserted === state1.abbreviation} />
                                        <label className="category-li">{state1.state}</label>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    {/* Right Side */}
                    <div className="col-md-5" style={{ height: '800px', overflowY: 'scroll' }}>
                        {state.businessLoading ? <Indicator /> : null}
                        {typeof state.fetchedBusinessData?.businesses && state.fetchedBusinessData?.businesses?.map(
                            (bus) => (
                                <div className="row business-div" 
                                onClick = {
                                    () => {
                                       console.log(mainURL+`${bus.id}/${bus.name}`)
                                       var win =  window.open(mainURL+ bus.id.toString() +"/"+ bus.name)
                                       win.focus()
                                    } 
                                    
                                }
                                >
                                    
                                    <label className="business-name-text">{bus.id}-</label>
                                    <label className="business-name-text">{bus.id}-</label>
                                    <label className="business-name-text">{bus.name}-</label>
                                    <label className="business-phone-text">{bus.phone1}</label>
                                    <h1 className="business-phone-text">{bus.state}</h1>

                                </div>
                            )
                        )}
                    </div>
                    <div className="col-md-2 results-and-map" style={{ height: '800px' }}>
                        {/* {state.stateInserted && state.stateInserted != '' ? <MyMapComponent
                            isMarkerShown
                            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `400px` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                        /> : null} */}
                        <div className="row count-results">
                            {state.countsLoading ? <Indicator /> : null}


                            <ul>
                                <li>Total:{state.counts?.businessCount}</li>
                                <li>Email:{state.counts?.emailCount}</li>
                                <li>Facebook:{state.counts?.facebookCount}</li>
                                <li>Twitter:{state.counts?.twitterCount}</li>
                                <li>Fax:{state.counts?.faxCount}</li>
                                <li>Reviewed:{state.counts?.reviewedCount}</li>
                                <li>Website:{state.counts?.websiteCount}</li>
                            </ul>



                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
