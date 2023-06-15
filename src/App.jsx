import React, { useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  const [list, setList] = useState([
    { id: 1, title: "수학", detail: "구구단 외우기" },
  ]);
  const [checkedList, setCheckedList] = useState([
    { id: 1, title: "영어", detail: "단어외우기" },
  ]);

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const detailChangeHandler = (e) => {
    setDetail(e.target.value);
  };

  const addList = (e) => {
    if (title.length !== 0 && detail.length !== 0) {
      const newList = {
        id: list.length + 1,
        title,
        detail,
      };
      setList([...list, newList]);
      e.preventDefault();
      setTitle("");
      setDetail("");
    } else {
      alert("제목과 내용을 입력해주세요");
    }
  };

  const deleteList = (id) => {
    const updatedList = list.filter((value) => value.id !== id);
    setList(updatedList);
  };

  const deleteCheckedList = (id) => {
    const updatedCheckedList = checkedList.filter((value) => value.id !== id);
    setCheckedList(updatedCheckedList);
  };

  const doneList = (id, title, detail) => {
    deleteList(id);
    const newDoneList = {
      id: checkedList.length + 1,
      title,
      detail,
    };
    setCheckedList([...checkedList, newDoneList]);
  };

  const workingList = (id, title, detail) => {
    deleteCheckedList(id);
    const newWorkingList = {
      id: list.length + 1,
      title,
      detail,
    };
    setList([...list, newWorkingList]);
  };

  return (
    <>
      <div className="divStyle">
        <h1>TO DO LIST</h1>
        <form>
          <span className="spanStyle">
            Title{"\u00A0"}
            <input type="text" value={title} onChange={titleChangeHandler} />
          </span>
          <span className="spanStyle">
            Detail{"\u00A0"}
            <input type="text" value={detail} onChange={detailChangeHandler} />
          </span>
          <button onClick={addList}>Add</button>
        </form>
        <div className="innderDivStyle">
          <ul className="ulStyle">
            <h2>Working</h2>
            {list.map((value) => {
              return (
                <li key={value.id} className="listStyle">
                  <h3 className="titleStyle">{value.title}</h3>
                  <p className="detailStyle">{value.detail}</p>
                  <button
                    onClick={() => deleteList(value.id)}
                    className="btnStyle"
                  >
                    X
                  </button>
                  <button
                    onClick={() =>
                      doneList(value.id, value.title, value.detail)
                    }
                    className="btnStyle"
                  >
                    완료
                  </button>
                </li>
              );
            })}
          </ul>
          <ul className="ulStyle">
            <h2>Done</h2>
            {checkedList.map((value) => {
              return (
                <li key={value.id} className="listStyle">
                  <h3 className="titleStyle">{value.title}</h3>
                  <p className="detailStyle">{value.detail}</p>
                  <button
                    onClick={() => deleteCheckedList(value.id)}
                    className="btnStyle"
                  >
                    X
                  </button>
                  <button
                    onClick={() =>
                      workingList(value.id, value.title, value.detail)
                    }
                    className="btnStyle"
                  >
                    진행중
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;