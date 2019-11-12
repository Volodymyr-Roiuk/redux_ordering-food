import React, { useEffect } from 'react';
import './ProductList.css';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getProducts, getCurrentId, setCurrentId, moveUp, moveDown } from '../../store';

const ProductList = ({ productList, currentId, setCurrentId, moveUp, moveDown }) => {
  const selectedItemIndex = productList.findIndex(item => item.id === currentId);
  const moveUpDisabled = !selectedItemIndex || !currentId;
  const moveDownDisabled = selectedItemIndex === productList.length - 1 || !currentId;

  const onClick = event => {
    const { target } = event;

    if (target.type === 'submit') {
      return;
    }

    if (target.dataset.id) {
      setCurrentId(Number(target.dataset.id));
    } else {
      setCurrentId(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', onClick);

    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <div className="productList">
      <ul>
        {productList.map(item => (
          <li
            key={item.id}
            data-id={item.id}
            className={currentId === item.id ? 'selectedItem' : ''}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <div>
        <Button onClick={moveUp} disabled={moveUpDisabled}>Move up</Button>
        <Button onClick={moveDown} disabled={moveDownDisabled}>Move down</Button>
      </div>
    </div>
  );
};

const getDate = state => ({
  productList: getProducts(state),
  currentId: getCurrentId(state),
});

const getMethods = dispatch => ({
  setCurrentId: (id) => dispatch(setCurrentId(id)),
  moveUp: () => dispatch(moveUp()),
  moveDown: () => dispatch(moveDown()),
});

export default connect(
  getDate,
  getMethods,
)(ProductList);
