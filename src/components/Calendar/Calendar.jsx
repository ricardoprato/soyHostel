import React from 'react';
import styles from './Calendar.module.css';
import TimeLine from 'react-gantt-timeline';

let d1 = new Date();
let d2 = new Date();
d2.setDate(d2.getDate() + 5);
let d3 = new Date();
d3.setDate(d3.getDate() + 8);
let d4 = new Date();
d4.setDate(d4.getDate() + 20);

let data = [
  { id: 'cama 1', start: d1, end: d2, name: 'Lucian', color: '#ff0000' },
  { id: 'cama 1', start: d3, end: d4, name: 'Richi', color: 'green' },
  { id: 'cama 2', start: d3, end: d4, name: 'Richi', color: 'green' },
  { id: 'cama 2', start: d3, end: d4, name: 'Richi', color: 'green' },
  { id: 'cama 3', start: d3, end: d4, name: 'Richi', color: 'green' },
  { id: 'cama 3', start: d3, end: d4, name: 'Richi', color: 'green' },
  { id: 'cama 4', start: d3, end: d4, name: 'Richi', color: 'green' },
];

const config = {
  header: {
    top: {
      style: {
        background: 'linear-gradient( grey, black)',
        textShadow: '0.5px 0.5px black',
        fontSize: 12,
      },
    },
    middle: {
      style: {
        background: 'linear-gradient( orange, grey)',
        fontSize: 9,
      },
    },
    bottom: {
      style: {
        background: 'linear-gradient( grey, black)',
        fontSize: 9,
        color: 'orange',
      },
      selectedStyle: {
        background: 'linear-gradient( #d011dd ,#d011dd)',
        fontWeight: 'bold',
        color: 'white',
      },
    },
  },
  taskList: {
    title: {
      label: 'Task Todo',
      style: {
        background: 'linear-gradient( grey, black)',
      },
    },
    task: {
      style: {
        backgroundColor: 'grey',
        color: 'white',
      },
    },
    verticalSeparator: {
      style: {
        backgroundColor: '#fbf9f9',
      },
      grip: {
        style: {
          backgroundColor: 'red',
        },
      },
    },
  },
  dataViewPort: {
    rows: {
      style: {
        backgroundColor: 'white',
        borderBottom: 'solid 0.5px silver',
      },
    },
    task: {
      showLabel: true,
      style: {
        borderRadius: 1,
        boxShadow: '2px 2px 8px #888888',
      },
    },
  },
};

export default function Calendar() {
  return (
    <div className={styles.lala}>
      <TimeLine data={data} config={config} />
    </div>
  );
}
