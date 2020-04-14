import * as React from 'react';

export default function (getComponent: any) {
  class AsyncComponent extends React.Component<any, any> {
    static Component = null;

    state = { Component: AsyncComponent.Component };

    componentDidMount() {
      if (!this.state.Component) {
        getComponent().then((Component: any) => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }

    render() {
      const { Component }: any = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return null;
    }
  }

  return AsyncComponent;
}
