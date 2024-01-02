import React, { useState, useEffect } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCheck, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const App = () => {
	// HINT: each "item" in our list names a name, a boolean to tell if its been completed, and a quantity
	const [items, setItems] = useState([]);
	
	const checkedItems = items.filter(item => item.isSelected);
    const uncheckedItems = items.filter(item => !item.isSelected);

	const [inputValue, setInputValue] = useState("");

	const [totalItemCount, setTotalItemCount] = useState(0);

	const handleAddButtonClick = ()=> {
		const newItem = {
			itemName: inputValue,
			quantity: 1,
			isSelected: false,
		};

		const newItems = [...items, newItem];

		setItems(newItems);
		setInputValue("");
		setTotalItemCount(totalItemCount + 1);
	};

	const handleQuantityIncrease = (index) => {
		const newItems = [...items]; 

		newItems[index].quantity++;

		setItems(newItems);
		calculateTotal();
	};

	const handleQuantityDecrease = (index) => {
		const newItems = [...items]; 

		if (newItems[index].quantity > 0) {
			newItems[index].quantity--;
		}

		setItems(newItems);
		calculateTotal();
	};

	const toggleComplete = (index) => {
		const newItems = [...items];
		newItems[index].isSelected = !newItems[index].isSelected;
		setItems(newItems);
	
		// Update the total count based on the unselected items
		const totalItemCount = newItems.reduce((total, item) => {
			return !item.isSelected ? total + item.quantity : total;
		}, 0);
	
		setTotalItemCount(totalItemCount);
	};

	const calculateTotal = () => {
		const totalItemCount = items.reduce((total, item)=> {
			return total + item.quantity;
		}, 0);

		setTotalItemCount(totalItemCount);
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			handleAddButtonClick();
		}
	}

	return (
		<div className='app-background'>
			<div className="title-card">
				<p className="title">MyShoppingList</p>
			</div>
			<div className='main-container'>
				<div className='add-item-box'>
					<input value={inputValue} onChange={(event)=> setInputValue(event.target.value)} className='add-item-input' placeholder='Add an item...' onKeyPress={(e) => handleKeyPress(e)} />
					<FontAwesomeIcon icon={faPlus} onClick = {()=> handleAddButtonClick()} className="add-item-button" />
				</div>
				<div className='item-list'>
					{items.map((item, index)=> 					
						<div className='item-container'>
							<div className='item-name' onClick = {()=> toggleComplete(index)} >
								{/* HINT: replace false with a boolean indicating the item has been completed or not */}
								{item.isSelected ? (
									<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
										<div className="complete-box"> 
											<FontAwesomeIcon icon={faCheck} style={{ fontSize: '18px' }} />
										</div>
										<span style={{ marginLeft: '10px', textDecoration: 'line-through' }}>{item.itemName}</span>
									</div>
								) : (
									<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
										{/* <FontAwesomeIcon icon={faCircle} className="incompleted-circle" /> */}
										<div className="incomplete-box" />
										<span style={{ marginLeft: '10px', marginBottom: '0px' }}>{item.itemName}</span>
									</div>
								)}
							</div>
							<div style={{ height: '35px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: "#fbc1bb", borderRadius: "50px" }}>
								<button>
									<FontAwesomeIcon icon={faChevronLeft} onClick = {()=> handleQuantityDecrease(index)} style={{ fontSize: '14px', color:'#ec645b', marginBottom: '7px', fontWeight: '600' }} />
								</button>
								<span style={{ fontSize: '24px', color: '#ec645b', paddingLeft: '5px', paddingRight: '5px' }}> {item.quantity} </span>
								<button>
									<FontAwesomeIcon icon={faChevronRight} onClick = {()=> handleQuantityIncrease(index)} style={{ fontSize: '14px', color: '#ec645b', marginBottom: '7px', fontWeight: '600'  }} />
								</button>
							</div>
						</div>
					)}
				</div>
				{items.length > 0 && (
					<div style={{ height: '35px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: '20px', marginBottom: '20px',  }}>
						<div style={{ display: 'flex', alignItems: "center", justifyContent: "center", width: '100px', backgroundColor: '#fbc1bb', borderRadius: '50px', paddingLeft: '5px', paddingRight: '5px', fontSize: '20px', color: '#ec645b', height: '100%', fontWeight: '600'}}>
							Total: {totalItemCount} 
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default App;
