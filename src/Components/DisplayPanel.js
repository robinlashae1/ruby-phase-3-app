import React from 'react';
import JobCard from './JobCard'
 function DisplayPanel ({title, filteredJobs}){

    return(
        <div className= "displayPanels">
        <h3>{title}</h3>
         {filteredJobs}
        </div>
    )

}
export default DisplayPanel