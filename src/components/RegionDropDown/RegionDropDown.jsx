import React, { useEffect, useState } from 'react'
import {Dropdown} from 'react-bootstrap';
import memorytags from '../../data/dvla_memory_tags.json'
import '../RegionDropDown/RegionDropDown.css'



const RegionDropDown = ({props}) => {
    const tags = Object.keys(memorytags);
    const[regionTags, setRegionTags] = useState([])
  
    const {selectTag, setSelectTag, selectedRegion, setSelectedRegion, mode} = props



    const handleSelectRegion = (region) => {
        setRegionTags(memorytags[region])
        console.log("regionTags: ", regionTags)
        setSelectedRegion(region)
        if(region == "Select Region"){
          setSelectTag('Select Tag')
        }

        console.log('Region selected:', region);

        
    }
    const handleSelectTag = (tag) => {
        console.log("Tag selected: ", tag)
        setSelectTag(tag)
    }

  return (
    <>
    <Dropdown>
    <Dropdown.Toggle variant="success" id="dropdown-basic"   disabled={mode !== "create"} >
      {selectedRegion}
    </Dropdown.Toggle>

    <Dropdown.Menu>
      {tags.map((tag, index) => (
        <Dropdown.Item key={index} eventKey={tag} onClick={() => handleSelectRegion(tag)}>
          {tag}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
  {

    (regionTags && regionTags.length > 0 || selectTag !== "Select Tag") && (

      <Dropdown>
            <Dropdown.Toggle  id="dropdown-basic"   disabled={mode !== "create"}  >
      {selectTag}
    </Dropdown.Toggle>
        <Dropdown.Menu>
            {regionTags.map((re, idx) => 
            <Dropdown.Item key={idx} className="tag-item" onClick={() => handleSelectTag(re)}>{re}</Dropdown.Item>
)}
        </Dropdown.Menu>
      </Dropdown>
    )
  }

  </>
  )
}

export default RegionDropDown