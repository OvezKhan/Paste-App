import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'


const ViewPaste = () => {

  const {id} = useParams();
  const allPaste = useSelector((state) => state.paste.pastes)

  const paste = allPaste.filter((p) => p._id === id)[0];
  console.log(paste)

  return (
    
    <div>
       <div style={{ display: 'flex', flexDirection:'row', gap: '1rem' , justifyContent:'space-between'}}>
      <input
        style={{
          padding: '0.5rem', // p-2
          borderRadius: '1rem',
          border: '1px solid black',
          
          minWidth: '500px',
          margin:"auto",
          marginTop:'.4rem',
          

           // rounded-2xl
        }}
        type='text'
        placeholder='Enter Title Here'
        value={paste.title}
        disabled
        onChange={(e) => setTitle(e.target.value)}
      />


         {/* <button onClick={createPaste}
       style={{
        padding: '0.5rem', // p-2
        borderRadius: '1rem',
        border: '1px solid black',
        marginTop: '.4rem',
        
        // rounded-2xl
    }}>
          {
        pasteId ? "Update My Paste" : "Create Paste"
          } 
         </button> */}
    </div> 


    <div className='mt-8'>
          <textarea
          style={{
            borderRadius: '1rem', // rounded-2xl
        marginTop: '1rem', // mt-4
        minWidth: '500px', // min-w-[500px]
        padding: '1rem',
        border:'1px solid black',
       
          }}
          
          value={paste.content}
          disabled
          placeholder='Enter Content Here..'
          onChange={(e) => setValue(e.target.value)}
          rows={20}


          // content should be visible

          />
    </div>
    </div>
  )
}

export default ViewPaste
