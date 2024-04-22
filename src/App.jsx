import { useEffect, useState } from 'react'
import './App.css'
import Auth from './components/Auth'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { auth, db, storage } from './config/firebase'
import { ref, uploadBytes } from 'firebase/storage'

function App() 
{
  const [list,setList] = useState([])
  const moviesCollectionRef = collection(db,'movies')

  const [title,setTitle] = useState('')
  const [releaseDate,setreleaseDate] = useState(0)
  const [hasAnOscar,sethasAnOscar] = useState(false)
  const [updatedTitle,setUpdatedTitle] = useState('')

  const [file,setFile] = useState(null)

useEffect(()=>
{
  const getMovies = async () => 
  {
    try
    {
      const data = await getDocs(moviesCollectionRef)
      const actualData = data.docs.map((doc)=>
      ({...doc.data(),id: doc.id}))

      setList(actualData)
    }
    catch(err){console.error(err);}
  }

  getMovies()
},[])

const submitMovie = async () => 
{
  await addDoc(moviesCollectionRef,
    {
      title:title,
      releaseDate:releaseDate,
      reicivedAnOscar:hasAnOscar,
      userID:auth?.currentUser?.uid
    })
}

const deleteMovie = async (id) =>
{
  const movieDoc = doc(db,'movies',id)
  await deleteDoc(movieDoc)
}

const updateMovie = async (id) =>
{
  const movieDoc = doc(db,'movies',id)
  await updateDoc(movieDoc,{title:updatedTitle})
}

const uploadFile = async () =>
{
  if(!file) return;
  const filesFolderRef = ref(storage,`projectFiles/${file.name}`)

  await uploadBytes(filesFolderRef,file)
}

  return (
    <>
      <Auth/>

      <div>
        <input 
          type="text" placeholder='title'
          onChange={(e)=>setTitle(e.target.value)}/>
        <input
          type="number" placeholder='release date'
          onChange={(e)=>setreleaseDate(Number(e.target.value))}/>
        <input 
          type="checkbox" 
          checked={hasAnOscar}
          onChange={(e)=>sethasAnOscar(e.target.checked)}/>
        <label htmlFor="">reicivedAnOscar</label>
        <button onClick={submitMovie}>add movie</button>
      </div>

      <div>
        {list.map((movie) =>
          <div key={movie.id}>
            <h1 style={movie.reicivedAnOscar?{color:'green'}:{color:'red'}}>{movie.title}</h1>
            <p>{movie.releaseDate}</p>
            <button onClick={()=> deleteMovie(movie.id)}>delete movie</button>
            <input type="text" placeholder='change title'
            onChange={(e)=> setUpdatedTitle(e.target.value)}/>
            <button onClick={()=> updateMovie(movie.id)}>update movie</button>
          </div>)}
      </div>

      <div>
        <input type="file" onChange={(e)=>setFile(e.target.files[0])}/>
        <button onClick={uploadFile}>upload file</button>
      </div>
    </>
  )
}

export default App
