import React, { Component } from 'react';

const MyContext = React.createContext();

class MyProvider extends Component {
  state = {
    tab: '1',
    emoji: '\u{1F4A9}',
  };

  render() {
    return <MyContext.Provider value={this.state}>{this.props.children}</MyContext.Provider>;
  }
}

export { MyProvider, MyContext };