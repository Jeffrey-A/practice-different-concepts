import React, { useEffect, useState } from 'react';

const COFFEE_API = 'https://api.sampleapis.com/coffee/hot';

export default function Solution(props) {
    const [coffeeOptions, setCoffeeOptions] = useState([]);
    const [newItemData, setNewItemData] = useState({
        title: '',
        description: '',
    });
    const [editMode, setEditMode] = useState({isEditMode: false, editModeItemIndex: null });

    useEffect(() => {
        fetch(COFFEE_API)
        .then(response => response.json())
        .then(data => setCoffeeOptions(data.slice(0, 5)))
        .catch(err => console.log(err));
    }, []);

    const handleRemove = (index) => {
        const updatedList = coffeeOptions.filter((item, itemIndex) => itemIndex !== index);
        setCoffeeOptions(updatedList);
    }

    const handleAddition = (newItem) => {
        if (newItem.title) {
            setCoffeeOptions(prev => [...prev, newItem]);
        }
    }

    const handleNewItemUpdate = (event) => {
        setNewItemData({...newItemData, [event.target.name]: event.target.value });
    }

    const handleEditChange = (event) => {
        setEditMode({...editMode, [event.target.name]: event.target.value });
    }

    const handleSaveEdit = () => {
        const updatedList = coffeeOptions.map((item, index) => {
            if (index === editMode.editModeItemIndex) {
                return {...item, title: editMode.title, description: editMode.description }
            }
            return item;
        });

        setCoffeeOptions(updatedList);
        setEditMode({...editMode, isEditMode: false });
    }

    const { isEditMode } = editMode;

    return (
        <>
            <div>
                <input name="title" placeholder='Name' value={newItemData?.title || ''} onChange={(e) => handleNewItemUpdate(e) }/>
                <input name="description" placeholder='Description' value={newItemData?.description || ''} onChange={(e) => handleNewItemUpdate(e) } />
                <button onClick={() => handleAddition(newItemData)}>Add</button>
            </div>
            {coffeeOptions.map((item, index) => (
                <div key={`${item.title}-${index}`}>
                    <h3>
                        {item.title}
                        <button onClick={() => handleRemove(index)}>Remove</button>
                        <button onClick={() => setEditMode({isEditMode: true, editModeItemIndex: index, ...item })}>Edit</button>
                    </h3>
                    <p>{item.description}</p>
                </div>
            ))}
            {isEditMode && (
                <>
                    <h3>Edit</h3>
                    <input name="title" placeholder='Name' value={editMode.title} onChange={(event) => handleEditChange(event)} />
                    <input name="description" placeholder='Description' value={editMode.description} onChange={(event) => handleEditChange(event)} />
                    <button onClick={() => handleSaveEdit()}>Save</button>
                </>
            )}
        </>
    );
}