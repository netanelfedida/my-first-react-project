import React from 'react'
import { useEffect, useState } from 'react';
import './css/todos.css'

// Get userID


export default function Todos() {
    
let userID = localStorage.getItem("id")

    // Get todos
    const [data, setData] = useState();
    
    let res;
    let getData;

    async function getTodos() {
      try{
        res = await fetch(`https://jsonplaceholder.typicode.com/users/${userID}/todos`)
        getData = await res.json();
        setData(getData)
      } catch (error) {
        alert(error, "network error")
    } 
        
    }
    useEffect(() => {
        getTodos();
    }, [userID])

   
   
    // Change checkbox !!
    function changeCheckbox(idx) {
        let newData = [...data];
        newData[idx].completed = !data[idx].completed;
        setData(newData);

    }

    

    //  Select handler
    function selectHandler(e) {
        if (e.target.value === "Order") {
            let newData = [...data];
            newData.sort((a, b) => {
                if (a.id < b.id) {
                    return -1
                }
                else if (a.id > b.id) {
                    return 1
                }

            })
            setData(newData)
        }
        if (e.target.value === "A-Z") {
            let newData = [...data];
            newData.sort((a, b) => {
                if (a.title < b.title) {
                    return -1
                }
                else if (a.title > b.title) {
                    return 1
                }
                else {
                    return 0
                }
            })
            setData(newData)
        }
        if (e.target.value === "Completed") {
            let newData = [...data];
            newData.sort((a, b) => {
                if (a.completed) {
                    return -1
                }
                else if (!a.completed) {
                    return 1
                }
            })
            setData(newData)
        }
        if (e.target.value === "Randomaly") {
            let newData = [...data];
            newData.sort((x, y) => {
                if (Math.random() < 0.5) {
                    return 1
                } else {
                    return -1
                }

            })
            setData(newData)
        }

    }



    return (
        <div className='body'>
            <div><h1>Todos</h1></div>
            <div>
                <div >Filter</div>
                <select className='filter' onChange={(e) => selectHandler(e)}>
                    <option value="Order" >Order</option>
                    <option value="Completed">Completed</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Randomaly">Randomaly</option>
                </select>
            </div>
            <div className='tableDiv'>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Todo</th>
                        <th>Completed</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((iteam, idx) =>
                        <tr key={idx}>
                            <td>{iteam.id}</td>
                            <td>{iteam.title}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={iteam.completed}
                                    onChange={() => changeCheckbox(idx)}
                                    name="" id="" />
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>
            </div>
        </div>
    );
}