import React from 'react'

const TimeSelection = () => {
    const options = [];
    for (let i = 1; i <= 60; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }

    // const hours = [];
    // for (let i = 1; i <= 12; i++) {
    //   options.push(<option key={i+3} value={i}>{i}</option>);
    // }
  return (
    <>
    <select>
        {options}
    </select>
    {/* <select>
        {hours}
    </select> */}
    </>
  )
}

export default TimeSelection
