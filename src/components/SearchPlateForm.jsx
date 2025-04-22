import React from 'react'

const SearchPlateForm = ({handleSubmit, regInput, setRegInput}) => {


  return (
    <form 
  onSubmit={handleSubmit}  
  style={{
    display: 'inline-flex',
    gap: '10px',
    padding: '8px',
    borderRadius: '4px'
  }}
>
  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
    <input 
      className="form-control" 
      name="reg-input"   
      id="reg-input" 
      type="text" 
      placeholder='Enter reg plate here' 
      value={regInput} 
      onChange={e => setRegInput(e.target.value)}
      style={{ minWidth: '40vw' }}
    />
    <button 
      className="btn btn-primary" 
      type="submit"
      style={{ whiteSpace: 'nowrap' }}
    >
      Search

    </button>
  </div>
</form>
//     <form onSubmit={handleSubmit}   style={{
    
//         gap: '10px',
//         border: '1px solid red',
//         padding: '8px',
//         borderRadius: '4px'
//       }}>
//     <div>
//       <label htmlFor="reg-input"></label>
//       <input className="form-control" name="reg-input"   id="reg-input" type="text" placeholder='Enter reg plate here' value={regInput} onChange={e => setRegInput(e.target.value)}/>
//       <button className="btn btn-primary"><i className="fa fa-search"></i></button>

//     </div>
// </form>
  )
}

export default SearchPlateForm