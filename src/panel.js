import React from 'react';

 function displayPanel({title}){

    return(
        <div className="displayPanels">
        <h1>{title}</h1>
        <jobCaterogy/>
        </div>
    )

}
export default displayPanel