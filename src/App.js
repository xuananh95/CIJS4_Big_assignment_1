import "./App.css";
import Button from "./components/Button";
import Input from "./components/Input";
import Expense from "./components/Expense";
import { useState, useEffect } from "react";
import { ImHome } from "react-icons/im";
import { v4 as uuidv4 } from "uuid";

const initialValue = {
    id: "",
    name: "",
    amount: "",
    date: "",
};

const MONTHS = {
    "01": 0,
    "02": 0,
    "03": 0,
    "04": 0,
    "05": 0,
    "06": 0,
    "07": 0,
    "08": 0,
    "09": 0,
    10: 0,
    11: 0,
    12: 0,
};

function App() {
    const [showForm, setShowForm] = useState(false);
    // const [showFilter, setShowFilter] = useState(false);

    const [newItem, setNewItem] = useState(initialValue);
    const { id, name, amount, date } = newItem;
    const [data, setData] = useState([]);
    const [years, setYears] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [expenseByYear, setExpenseByYear] = useState({});
    const [chartYear, setChartYear] = useState(null);

    const handleAdd = (e) => {
        e.preventDefault();
        if (!name || !amount || !date) {
            alert("Please fill all the fields!");
            return;
        }
        const new_id = uuidv4();
        setData([...data, { ...newItem, id: new_id }]);
        const year = Number(newItem.date.slice(0, 4));
        if (!years.includes(year)) {
            setYears([...years, year]);
        }
        if (!expenseByYear.hasOwnProperty(year)) {
            const month = newItem.date.slice(5, 7);
            const added_year = { [year]: { ...MONTHS } };
            added_year[year][month] = Number(newItem.amount);
            setExpenseByYear({ ...expenseByYear, ...added_year });
        } else {
            const month = newItem.date.slice(5, 7);
            const tmp = { ...expenseByYear };
            tmp[year][month] += Number(newItem.amount);
            setExpenseByYear({ ...tmp });
        }
        setNewItem(initialValue);
    };

    useEffect(() => {
        if (data.length > 0) {
            const selected_year = document.getElementById("select-year");
            setChartYear(selected_year.value);
            setDisplayData(
                data.filter((d) => d.date.slice(0, 4) === selected_year.value)
            );
        }
        // console.log("data", data);
        console.log("expense", expenseByYear);
        console.log("chartyear", chartYear);
    }, [data]);
    // console.log(expenseByYear);

    const handleSelectChange = (e) => {
        setDisplayData(
            data.filter((d) => d.date.slice(0, 4) === e.target.value)
        );
    };

    // console.log(showFilter);
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
                        <div className="filter">
                            <span>Filter by year</span>
                            <select
                                id="select-year"
                                onChange={handleSelectChange}
                            >
                                {/* <option value="-1">Show all</option> */}
                                {[...years]
                                    .sort()
                                    .reverse()
                                    .map((d, index) => (
                                        <option key={d} value={d}>
                                            {d}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        {displayData.map((item) => (
                            <Expense key={item.id} item={item} />
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}

export default App;
