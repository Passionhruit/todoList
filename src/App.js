import React, { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  const [list, setList] = useState([
    { id: 1, title: "영어", detail: "단어 10개 암기" },
    { id: 2, title: "수학", detail: "구구단 외우기" },
  ]);
  const [checkedList, setCheckedList] = useState([
    { id: 1, title: "과학", detail: "주기율표 암기" },
    { id: 2, title: "국어", detail: "받아쓰기" },
  ]);

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const detailChangeHandler = (e) => {
    setDetail(e.target.value);
  };

  const addList = (e) => {
    const newList = {
      id: list.length + 1,
      title,
      detail,
    };
    setList([...list, newList]);
    e.preventDefault();
    setTitle("");
    setDetail("");
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
      <form>
        제목: <input value={title} onChange={titleChangeHandler} />
        내용: <input value={detail} onChange={detailChangeHandler} />
        <button onClick={addList}>추가하기</button>
      </form>
      <div>
        <ul>
          <h2>진행 중</h2>
          {list.map((value) => {
            return (
              <li key={value.id}>
                {value.title}
                <br />
                {value.detail}
                <button onClick={() => deleteList(value.id)}>X</button>
                <button
                  onClick={() => doneList(value.id, value.title, value.detail)}
                >
                  완료
                </button>
              </li>
            );
          })}
        </ul>
        <ul>
          <h2>완료한 일</h2>
          {checkedList.map((value) => {
            return (
              <li key={value.id}>
                {value.title}
                <br />
                {value.detail}
                <button onClick={() => deleteCheckedList(value.id)}>X</button>
                <button
                  onClick={() =>
                    workingList(value.id, value.title, value.detail)
                  }
                >
                  진행중
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
