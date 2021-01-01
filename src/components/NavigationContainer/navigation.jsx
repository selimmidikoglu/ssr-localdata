import React, { useEffect } from 'react'
import './navigation.css'
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../../redux/store';
import { GrSearch } from "react-icons/gr";
import {
    SetNameAndFetch
} from '../../redux/actions/businessActions'
//import { MyMapComponent } from '../GoogleMapComponent/googleMapComponent2'
const mainURL = "https://www.localdata.us/"
export default function Navigation() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.businessReducer)
    const setNameGetData = (key) => {
            if(key.length > 4){
                setTimeout(()=> dispatch(SetNameAndFetch(key)))
            }
    }
    return (
        <nav>
            {/* <ul>
            <li className="logo">CodingNepal</li>
            <li className="btn"></li>
            <div className="items">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
            </div>
            <li className="search-icon">
                    <input type="search" placeholder="Search"/>
                    
                    </li>
            </ul> */}
        </nav>
    
          
    )
    
}

   /* <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                    onChange={(event) => setNameGetData(event.target.value)} /> */
    /* <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                <a class="navbar-brand" href="#">Hidden brand</a>
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                    </li>
                </ul>

             
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>

            </div>
        </nav> */
        
