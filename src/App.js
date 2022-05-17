import "./App.css";
import Button from "./components/Button";
import Input from "./components/Input";
import { useState } from "react";
import { ImHome } from "react-icons/im";

const initialValue = {
  name: "",
  amount: "",
  date: "",
};

function App() {
  const [showForm, setShowForm] = useState(false);

  const [newItem, setNewItem] = useState(initialValue);
  const { name, amount, date } = newItem;
  const [data, setData] = useState([]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !amount || !date) {
      alert("Please fill all the fields!");
      return;
    }
    setData([...data, newItem]);
    setNewItem(initialValue);
  };
  console.log(data);
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
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                  valueInput={name}
                />
                <Input
                  label="Amount"
                  inputType="number"
                  placeholder="Enter amount here"
                  onChangeInput={(e) => {
                    setNewItem({ ...newItem, amount: e.target.value });
                  }}
                  valueInput={amount}
                />
                <Input
                  label="Date"
                  inputType="date"
                  onChangeInput={(e) =>
                    setNewItem({ ...newItem, date: e.target.value })
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
        <div className="list-expense"></div>
      </main>
    </>
  );
}

export default App;
