import React from 'react';
import './styles.css';
import { AiFillDelete } from 'react-icons/ai'

const Expense = ({ item, handleDelete }) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const date = new Date(item.date);
    const month = monthNames[date.getMonth()];
    return (
        <div className="expense-container border">
            <>
                <div className="date-container flex-box border">
                    <span style={{ fontSize: 12, }}>{month} {date.getFullYear()}</span>
                    <span style={{ fontSize: 25, }}>{date.getDate()}</span>
                </div>
                <span className="name-container flex-box">{item.name}</span>
                <div className="amount-container flex-box">
                    <span className="amount border">${item.amount}</span>
                </div>
                <div className="flex-box">
                    <div className="delete" onClick={handleDelete}>
                        <AiFillDelete fontSize={'30px'} marginTop={'30%'} />
                    </div>
                </div>
            </>
        </div >
    )
}

export default Expense