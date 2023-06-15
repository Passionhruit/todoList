import React, { useState } from "react";
import "./App.css";
import Item from "./components/Item.jsx";
import CheckedItem from "./components/CheckedItem.jsx";

function App() {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  const [list, setList] = useState([
    { id: 1, title: "수학", detail: "구구단 외우기" },
    { id: 2, title: "국어", detail: "받아쓰기" },
  ]);
  const [checkedList, setCheckedList] = useState([
    { id: 1, title: "영어", detail: "단어 10개 외우기" },
    { id: 2, title: "화학", detail: "주기율표 외우기" },
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
    } else {
      alert("제목과 내용을 입력해주세요.");
    }
    e.preventDefault(); // 폼 제출시 새로고침을 막음
    setTitle(""); // Title, Detail 빈 값으로
    setDetail("");
  };

  // WorkingList 요소 삭제
  const deleteList = (id) => {
    const updatedList = list
      .filter((value) => value.id !== id) // value.id 가 일치하지 않는 리스트로 거름
      .map((value, i) => {
        // 업데이트된 리스트 id 각각의 값을 index + 1 로 갱신 (중복 피함)
        return { ...value, id: i + 1 };
      });
    setList(updatedList);
  };

  // DoneList 요소 삭제
  const deleteCheckedList = (id) => {
    const updatedCheckedList = checkedList
      .filter((value) => value.id !== id)
      .map((value, i) => {
        return { ...value, id: i + 1 };
      });
    setCheckedList(updatedCheckedList);
  };

  // doneList 로 이동
  const doneList = (id, title, detail) => {
    deleteList(id);
    const newDoneList = {
      id: checkedList.length + 1,
      title,
      detail,
    };
    setCheckedList([...checkedList, newDoneList]);
  };

  // workingList 로 이동
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
          <span className="spanStyle">Title{"\u00A0"} </span>
          <input type="text" value={title} onChange={titleChangeHandler} />

          <span className="spanStyle">Detail{"\u00A0"} </span>
          <input type="text" value={detail} onChange={detailChangeHandler} />

          <button onClick={addList}>Add</button>
        </form>
        <div className="innderDivStyle">
          <ul className="ulStyle">
            <h2>✏️ Working</h2>
            {list.map((value) => {
              return (
                <Item
                  value={value}
                  deleteList={deleteList}
                  doneList={doneList}
                />
              );
            })}
          </ul>
          <ul className="ulStyle">
            <h2>🎉 Done</h2>
            {checkedList.map((value) => {
              return (
                <CheckedItem
                  value={value}
                  deleteCheckedList={deleteCheckedList}
                  workingList={workingList}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
