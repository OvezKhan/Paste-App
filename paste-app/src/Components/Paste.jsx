import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../Redux/pasteSlice';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash, faCopy, faShareAlt } from '@fortawesome/free-solid-svg-icons';




const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();

  const filteredData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    // console.log(pasteId)
    dispatch(removeFromPastes(pasteId))
  }

   // Function to handle sharing
   const handleShare = (paste) => {
    const shareData = {
      title: paste.title,
      text: paste.content,
      url: window.location.href + `pastes/${paste._id}`, // Adjust the URL as needed
    };

    if (navigator.share) {
      navigator.share(shareData)
        .then(() => {
          toast.success('Paste shared successfully!');
        })
        .catch((error) => {
          toast.error('Error sharing the paste: ' + error);
        });
    } else {
      // Fallback for browsers that do not support the Web Share API
      navigator.clipboard.writeText(shareData.url)
        .then(() => {
          toast.success('Link copied to clipboard!');
        })
        .catch((error) => {
          toast.error('Error copying to clipboard: ' + error);
        }); 
    }
  };

 

  return (
    <div>
      <input style={{ padding: '0.8rem', borderRadius: '1.5rem', minWidth: '600px', marginTop: '1rem' }}
        type="search"
        placeholder='Search here ..'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />


      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '1.5rem' }}>
        {
          filteredData.length > 0 &&
          filteredData.map(
            (paste) => {
              return (
                <div style={{ border: '1px solid black' , display:"flex" , justifyContent:"space-between"}} key={paste?.content}>

<div>
                  <h3 style={{fontSize:"2.2rem" , textAlign:"center" , paddingLeft:"3px"}}>
                    {paste.title}
                  </h3>
                  <p style={{fontSize:"1rem" , textAlign:"center" , paddingLeft:"3px"}}>
                    {paste.content}
                  </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column' , gap:"20px"}}>

                  <div style={{ display: 'flex', flexDirection: 'row'}}>

                    <button>
                      <a href={`/?pasteId=${paste?._id}`}>
                      <FontAwesomeIcon icon={faEdit} />
                      {/* {paste?.content} */}
                      </a>    
                    </button>

                    <button>
                      <a href={`/pastes/${paste?._id}`}>
                      <FontAwesomeIcon icon={faEye} />
                      </a>
                      
                    </button>

                    <button onClick={() => handleDelete(paste._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                    </button>

                    <button onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Paste Copied to Clipboard")
                    }}>
                     <FontAwesomeIcon icon={faCopy} />

                    </button>

                    <button onClick={() => handleShare(paste)}>
                    <FontAwesomeIcon icon={faShareAlt} />
                    </button>
                  </div>

                  <div>
                    {paste.createdAt}
                  </div>
                </div>


                </div>
              )
            }
          )
        }

      </div>
    </div>
  )
}

export default Paste
