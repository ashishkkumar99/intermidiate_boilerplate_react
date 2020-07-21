/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import React from 'react';
import { hot } from 'react-hot-loader/root';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  render() {
    const { count } = this.state;
    return (
      <div>
        <h1>this change done again</h1>

        <h2>
          this count
          {count}
        </h2>

        <button
          type="button"
          onClick={() => {
            this.setState((prevState) => ({
              count: prevState.count + 1,
            }));
          }}
        >
          +
        </button>
      </div>
    );
  }
}
export default hot(App);
