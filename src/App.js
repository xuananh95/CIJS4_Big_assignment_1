import "./App.css";
import Button from "./components/Button";
import Input from "./components/Input";
import Expense from "./components/Expense";
import { useState, useEffect } from "react";
import { ImHome } from "react-icons/im";

const initialValue = {
    name: "",
    amount: "",
    date: "",
};

function App() {
    const [showForm, setShowForm] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    const [newItem, setNewItem] = useState(initialValue);
    const { name, amount, date } = newItem;
    const [data, setData] = useState([]);
    const [years, setYears] = useState([]);
    const [displayData, setDisplayData] = useState([]);

    const handleAdd = (e) => {
        e.preventDefault();
        if (!name || !amount || !date) {
            alert("Please fill all the fields!");
            return;
        }
        setData([...data, newItem]);
        setDisplayData([...data], newItem);
        const year = Number(newItem.date.slice(0, 4));
        if (!years.includes(year)) {
            setYears([...years, year]);
        }
        setNewItem(initialValue);
    };

    const handleSelectChange = (e) => {
        if (e.target.value === "-1") {
            console.log("abc");
            setDisplayData(data);
        } else
            setDisplayData(
                data.filter((d) => d.date.slice(0, 4) === e.target.value)
            );
    };

    console.log(showFilter);
    return (
        <>
            <span className="icon">
                <ImHome fontSize="40px" color="white" />
            </span>
            <main id="section">
                <div className="add-form">
                    {showForm === true ? (
                        <form onSubmit={handleAdd}>
                            <div className="input-group">
                                <Input
                                    label="Name"
                                    placeholder="Enter name here"
                                    onChangeInput={(e) =>
                                        setNewItem({
                                            ...newItem,
                                            name: e.target.value,
                                        })
                                    }
                                    valueInput={name}
                                />
                                <Input
                                    label="Amount"
                                    inputType="number"
                                    placeholder="Enter amount here"
                                    onChangeInput={(e) => {
                                        setNewItem({
                                            ...newItem,
                                            amount: e.target.value,
                                        });
                                    }}
                                    valueInput={amount}
                                />
                                <Input
                                    label="Date"
                                    inputType="date"
                                    onChangeInput={(e) =>
                                        e.target.value &&
                                        setNewItem({
                                            ...newItem,
                                            date: e.target.value,
                                        })
                                    }
                                    valueInput={date}
                                />
                            </div>
                            <div className="button-group">
                                <Button colorButton="violet" text="ADD" />
                                <Button
                                    colorButton="gray"
                                    text="CANCEL"
                                    onClickButton={() => {
                                        setShowForm(false);
                                        setNewItem(initialValue);
                                    }}
                                />
                            </div>
                        </form>
                    ) : (
                        <Button
                            colorButton="violet"
                            onClickButton={() => setShowForm(true)}
                            text="Add new Expense"
                        />
                    )}
                </div>
                {data.length > 0 && (
                    <div className="list-expense">
                        {showFilter ? (
                            <div className="filter">
                                <span>Filter by year</span>
                                <select onChange={handleSelectChange}>
                                    <option value="-1">Show all</option>
                                    {[...years]
                                        .sort()
                                        .reverse()
                                        .map((d, index) => (
                                            <option key={d} value={d}>
                                                {d}
                                            </option>
                                        ))}
                                </select>
                                <Button
                                    colorButton={"gray"}
                                    onClickButton={() => setShowFilter(false)}
                                    text="Hide Filter"
                                />
                            </div>
                        ) : (
                            <Button
                                colorButton={"violet"}
                                onClickButton={() => setShowFilter(true)}
                                text="Show Filter"
                            />
                        )}

                        {showFilter
                            ? displayData.map((item, index) => (
                                  <Expense key={index} item={item} />
                              ))
                            : data.map((item, index) => (
                                  <Expense key={index} item={item} />
                              ))}
                    </div>
                )}
            </main>
        </>
    );
}

export default App;
