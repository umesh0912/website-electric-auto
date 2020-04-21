import * as React from 'react';
import HomeBanner from '../homeBanner/HomeBanner';
import './app.scss';
class App extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app-wrapper">
        <HomeBanner />
      </div>
    );
  }
}

export default App;
