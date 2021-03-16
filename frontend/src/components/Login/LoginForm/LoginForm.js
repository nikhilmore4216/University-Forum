import React from 'react';

const loginForm = props => (
  <form>
    <div className="form-group">
      <label style={{ fontSize: '13px' }} htmlFor="uname">
        Username
      </label>
      <input
        className="form-control form-control-sm"
        id="uname"
        name="username"
        placeholder="Your username"
        onChange={props.changed}
        value={props.username}
      />
    </div>
    <div className="form-group">
      <label style={{ fontSize: '13px' }} htmlFor="pwd">
        Password
      </label>
      <input
        className="form-control form-control-sm"
        id="pwd"
        name="password"
        placeholder="Your password"
        onChange={props.changed}
        value={props.password}
      />
    </div>
    <div className="d-flex justify-content-between align-items-center">
      <small className="text-muted">Forgot Password?</small>
      <button
        className="btn btn-secondary rounded-pill"
        onClick={event => {
          console.log(props.username, props.password);
          props.submit(event, props.username, props.password);
        }}
      >
        Login
      </button>
    </div>
  </form>
);

export default loginForm;