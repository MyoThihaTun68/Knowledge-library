import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase'; // Assuming you have imported Firebase Firestore as `db` and Firebase Storage as `storage`
import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function NoteDetail() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [editedNote, setEditedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const userEmail = localStorage.getItem('email') || ''; // Use an empty string as a fallback value
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const noteRef = doc(db, 'notes', id);
        const noteDoc = await getDoc(noteRef);
        if (noteDoc.exists()) {
          setNote({ id: noteDoc.id, ...noteDoc.data() });
          setEditedNote({ id: noteDoc.id, ...noteDoc.data() }); // Initialize editedNote with the current note
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching note:', error);
      }
    };

    fetchNote();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true); // Enable editing mode
  };

  const handleSave = async () => {
    try {
      // Update document in Firestore with edited note details
      const noteRef = doc(db, 'notes', id);
      await updateDoc(noteRef, editedNote);
      
      // Disable editing mode
      setIsEditing(false);
      // Reload the page
      window.location.reload();
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedNote(prevNote => ({
      ...prevNote,
      [name]: value
    }));
  };

  const handleDelete = async () => {
    try {
      // Delete document from Firestore
      await deleteDoc(doc(db, 'notes', id));
      
      // Delete image from Firebase Storage if imageUrl exists
      if (note.imageUrl) {
        await storage.refFromURL(note.imageUrl).delete();
      }

      // Navigate to the 'home' page
      navigate('/home');

      // Reload the page
      window.location.reload();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {note && (
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl text-white font-bold mb-4">
            {isEditing ? (
              <input
                type="text"
                name="title"
                value={editedNote.title}
                onChange={handleChange}
                className="bg-transparent text-white font-bold text-3xl outline-none"
              />
            ) : (
              note.title
            )}
          </h1>
          <div className='md:flex justify-between space-x-4'>
            {note.imageUrl && (
              <img src={note.imageUrl} alt="Note" className=" w-96 rounded-md mb-4" />
            )}
            <div className='flex flex-col p-3'>
              <p className="text-zinc-200 mb-4">
                {isEditing ? (
                  <textarea
                    name="details"
                    value={editedNote.details}
                    onChange={handleChange}
                    className="bg-transparent text-white outline-none resize-none"
                  />
                ) : (
                  note.details
                )}
              </p>
              <p className="w-auto text-zinc-500 rounded-md mb-4">
                {isEditing ? (
                  <select
                    name="type"
                    value={editedNote.type}
                    onChange={handleChange}
                    className="bg-transparent text-zinc-500 outline-none"
                  >
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
                ) : (
                  `Type: ${note.type}`
                )}
              </p>
              <p className="w-auto text-zinc-400 rounded-md mb-4">
                Posted by: {note.userEmail}
              </p>
              {/* Check if user's email matches the note's userEmail */}
              {userEmail === note.userEmail && (
                <div>
                  {/* Show Save and Cancel buttons when editing */}
                  {isEditing && (
                    <div>
                      <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-md mr-2">Save</button>
                      <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
                    </div>
                  )}
                  {/* Show Edit and Delete buttons when not editing */}
                  {!isEditing && (
                    <div>
                      <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Edit</button>
                      <button onClick={() => setShowConfirmation(true)} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
                    </div>
                  )}
                </div>
              )}
              {/* Show confirmation message */}
              {showConfirmation && (
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                  <div className="bg-white p-4 rounded-md">
                    <p>Are you sure you want to delete this note?</p>
                    <div className="flex justify-center mt-4">
                      <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-md mr-2">Yes</button>
                      <button onClick={() => setShowConfirmation(false)} className="bg-blue-500 text-white px-4 py-2 rounded-md">No</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
