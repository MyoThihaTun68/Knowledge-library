import React, { useState } from 'react';
import { db, storage } from '../firebase.js';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Corrected import
import { updateDoc } from 'firebase/firestore';
import { auth } from '../firebase.js';

export default function CreateNote() {
  const [note, setNote] = useState({
    title: '',
    details: '',
    type: '',
    image: null
  });
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Convert the title to lowercase before updating the state
    if (name === 'title') {
      setNote(prevNote => ({
        ...prevNote,
        [name]: value.toLowerCase()
      }));
    } else {
      setNote(prevNote => ({
        ...prevNote,
        [name]: value
      }));
    }
  };

  const handleImageChange = (e) => {
    setNote(prevNote => ({
      ...prevNote,
      image: e.target.files[0]
    }));
  };

  const handleTypeChange = (e) => {
    const { value } = e.target;
    if (value === "custom") {
      setNote(prevNote => ({
        ...prevNote,
        type: ''
      }));
    } else {
      handleInputChange(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Get the current user's email from local storage
      const userEmail = localStorage.getItem('email');
  
      // Add note details to Firestore
      const docRef = await addDoc(collection(db, 'notes'), {
        title: note.title,
        details: note.details,
        type: note.type,
        userEmail: userEmail // Add user's email to the document
      });
  
      // Upload image to Firebase Storage
      if (note.image) {
        const imageRef = ref(storage, `images/${docRef.id}/${note.image.name}`);
        const snapshot = await uploadBytes(imageRef, note.image);
        const imageUrl = await getDownloadURL(snapshot.ref);
  
        // Update the document with the image URL
        await updateDoc(docRef, { imageUrl });
  
        console.log('Image uploaded successfully:', imageUrl);
      }
  
      console.log('Note added with ID:', docRef.id);
  
      // Set success state to true
      setSuccess(true);
  
      // Clear all input fields
      setNote({
        title: '',
        details: '',
        type: '',
        image: null
      });
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };
  
  return (
    <div className="flex items-center justify-center h-full">
      <form onSubmit={handleSubmit} className="bg-zinc-700 rounded-lg shadow-md px-8 py-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">Create a New Post</h2>
        {success && <p className="text-green-500 mb-4">Note added successfully!</p>}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={note.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="details" className="block text-gray-700 text-sm font-bold mb-2">Details</label>
          <textarea
            name="details"
            id="details"
            value={note.details}
            onChange={handleInputChange}
            placeholder="Details"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">Type</label>
          <select
            name="type"
            id="type"
            value={note.type}
            onChange={handleTypeChange}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
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
            {/* Add more types as needed */}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image</label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleImageChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="bg-zinc-500 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
