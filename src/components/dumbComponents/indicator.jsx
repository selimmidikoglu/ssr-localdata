import React from 'react'

export const Indicator = () => {
    
    return (
        <div style={{top:0,left:0,width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'rgb(0,0,0,0.6)',zIndex : '5000',position : 'fixed'}}>
        {/* style={{backgroundColor:'rgb(0,0,0,0.6)',position:'absolute', opacity:'0.6',width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',zIndex:'1000'}}> */}
            <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="white">
                <g fill="none" fillRule="evenodd">
                    <g transform="translate(1 1)" strokeWidth="2">
                        <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                        <path d="M36 18c0-9.94-8.06-18-18-18">
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                from="0 18 18"
                                to="360 18 18"
                                dur="1s"
                                repeatCount="indefinite" />
                        </path>
                    </g>
                </g>
            </svg>
        </div>



    )
}
