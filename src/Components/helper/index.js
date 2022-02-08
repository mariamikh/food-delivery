import React from 'react';

export default function index(props) {
  const { text } = props.text;

  return <p style={{ color: 'red' }}> {text} </p>;
}
