import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function NoteList() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notesCollection = collection(db, 'notes');
        let notesQuery = query(notesCollection);

        // If there's a search query, filter notes by title
        if (searchQuery) {
          notesQuery = query(notesCollection, where('title', '>=', searchQuery), where('title', '<=', searchQuery + '\uf8ff'));
        }

        // If a tag is selected, filter notes by tag
        if (selectedTag) {
          notesQuery = query(notesCollection, where('type', '==', selectedTag));
        }

        const notesSnapshot = await getDocs(notesQuery);
        const notesData = notesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setNotes(notesData);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, [searchQuery, selectedTag]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTagChange = (e) => {
    setSelectedTag(e.target.value);
  };

  return (
    <div>
      <div className='md:flex my-5  md:justify-between'>
        <div className='p-3 flex items-center justify-center rounded-lg'>
          <select value={selectedTag} onChange={handleTagChange} className="p-2 mx-2 outline-none bg-zinc-700 text-white">
            <option value="">All Tags</option>
            {/* Options for tag selection */}
            <option value="">Select Tag</option>
            <option value="anime">anime</option>
            <option value="ai">ai</option>
            <option value="games">games</option>
            <option value="news">news</option>
            <option value="manga">manga</option>
            <option value="coding">coding</option>
            <option value="design">design</option>
            <option value="trending">trending_technology</option>
            <option value="general_knowledge">general_knowledge</option>
            <option value="development">development</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className='border rounded-lg md:w-96 flex items-center p-3'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" text-white w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={handleInputChange}
            className="p-2 mx-2 outline-none bg-zinc-800"
            style={{ color: 'white' }}
          />
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-4 my-5 p-3 gap-4'>
        {notes.map(note => (
          <Link to={`/note/${note.id}`} key={note.id} className="flex border rounded-md p-3 space-y-2 flex-col">
            <div>
              {note.imageUrl && <img src={note.imageUrl} alt="Note" className="w-full h-80 rounded-md max-w-full h-auto" />}
              <h1 className='text-white text-2xl my-1'>{note.title}</h1>
              <div className='flex flex-wrap'>
                {note.type && (
                  <span className='bg-sky-500 px-2 text-white rounded-md text-center my-2'>
                    {note.type}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
