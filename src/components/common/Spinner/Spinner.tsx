import * as React from 'react';

interface IProps {
  customClass?: string;
}

class Spinner extends React.Component<IProps, any> {
  constructor(props) {
    super(props);
  }

  render() {
    const customClass = this.props.customClass;

    return (
      <div className={'w--spinner ' + (customClass ? customClass : '')}>
        <div className="bounce1" />
        <div className="bounce2" />
        <div className="bounce3" />
      </div>
    );
  }
}

export default Spinner;
