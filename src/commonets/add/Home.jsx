import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <>
      <section>
        <div><Link to="/addteacher">Add Teacher</Link></div>
        <div><Link to="/addstudent">Add Student</Link></div>
        <div><Link to="/addteacher">View Student</Link></div>
      </section>
    </>

  )
}
