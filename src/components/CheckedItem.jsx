const CheckedItem = ({ value, deleteCheckedList, workingList }) => {
  return (
    <li key={value.id} className="listStyle">
      <h3 className="titleStyle">{value.title}</h3>
      <p className="detailStyle">{value.detail}</p>
      <button onClick={() => deleteCheckedList(value.id)} className="btnStyle">
        X
      </button>
      <button
        onClick={() => workingList(value.id, value.title, value.detail)}
        className="btnStyle"
      >
        진행중
      </button>
    </li>
  );
};

export default CheckedItem;
