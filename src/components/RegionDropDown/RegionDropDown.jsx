import React, { useState } from 'react'
import {Dropdown} from 'react-bootstrap';
import memorytags from '../../data/dvla_memory_tags.json'
import '../RegionDropDown/RegionDropDown.css'



const RegionDropDown = () => {
    const tags = Object.keys(memorytags);
    const [regionTags, setRegionTags] = useState([])
    const [selectedRegion, setSelectedRegion] = useState('Select Region');
    const [selectTag, setSelectTag] = useState('')

    const handleSelectRegion = (region) => {
        setRegionTags(memorytags[region])
        setSelectedRegion(region)
        console.log('Tags:', memorytags[region]);

        
    }
    const handleSelectTag = (tag) => {
        console.log("Tag selected: ", tag)
        setSelectTag(tag)
    }

  return (
    <>
    <Dropdown>
    <Dropdown.Toggle variant="success" id="dropdown-basic">
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
    regionTags.length > 0 && (
        <ul>
            {regionTags.map((re, idx) => 
            <li key={idx} className="tag-item" onClick={() => handleSelectTag(re)}>{re}</li>
)}
        </ul>
    )
  }
  </>
  )
}

export default RegionDropDown