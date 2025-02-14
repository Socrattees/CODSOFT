import React from 'react';
import './category.css';
import Card from '../card/Card';

const Category = ({ list, type }) => {

  return (
    <div className="category-list">
      {list.map((item, index) => (
        <Card key={index} itemDetails={item} type={type} />
      ))}
    </div>
  );
};

export default Category;