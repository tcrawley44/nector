import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";


class Experience extends Component {
  render() {
    const experience = this.props.experience.map(exp => (
        <tr key = {exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
        </tr>
    ))  
    return (
      <div>
          <h4 className = "mb-4">Experience credentials</h4>
          <table className = "table">
            <thead>
                <tr>
                    <th>Company</th>
                    <th>Title</th>
                    <th></th>
                </tr>
                
                    {experience}
                
            </thead>
          </table>
      </div>
    )
  }
}

export default connect(null)(withRouter(Experience)); 