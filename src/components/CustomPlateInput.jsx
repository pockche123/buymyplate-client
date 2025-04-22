import React from 'react'
import bannedWordsData from '../data/banned_words.json'

const CustomPlateInput = ({setBannedWordFound, customPlate, setCustomPlate, mode}) => {
    const bannedWords = bannedWordsData.banned_words;
    const handleCustomPlate = (e) => {
        const value = e.target.value.toUpperCase();
        if(bannedWords.includes(value)){
          setBannedWordFound(true)
          return
        } else{
          setBannedWordFound(false)
        }
        if (/^[A-Z0-9 ]{0,7}$/.test(value)) {
          setCustomPlate(value);
        }
      };
  return (
    <div>
          <input
            type="text"
            placeholder="CUSTOM"
            minLength={1}
            maxLength={7}
            className="form-control license-text"
            value={customPlate}
            onChange={handleCustomPlate}
            disabled={mode !=='create'}
          />
        </div>
  )
}

export default CustomPlateInput