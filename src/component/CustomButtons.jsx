import React from 'react'

const CustomButtons = ({handleCountry, handleGender}) => {
  return (
     <div className="btn-toolbar" role="toolbar" aria-label="filter options">
      <div className="btn-group mr-2" role="group" aria-label="Filter by Country">
        <button type="button" className="btn btn-primary" onClick={handleCountry}>
          Filter by Country
        </button>
      </div>
      <div className="btn-group mr-2" role="group" aria-label="Filter by Gender">
        <button type="button" className="btn btn-secondary" onClick={handleGender}>
          Filter by Gender
        </button>
      </div>
      
    </div>
  )
}

export default CustomButtons
