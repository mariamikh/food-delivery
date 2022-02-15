import React from 'react';

export default function error(props) {
  return <div className="text-danger">ERROR: {props.message}</div>;
}
