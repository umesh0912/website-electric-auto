import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import Spinner from './../Spinner/Spinner';
import './Button.scss';
const prefixClassName = 'w--button';

// ButtonThemes are suffix css classes to w--button
type ButtonTheme =
  | 'orange'
  | 'empty'
  | 'orange-gradient'
  | 'basedark'
  | 'loading'
  | 'link'
  | 'bordered';

interface IProps {
  title?: any;
  type?: '' | 'loading';
  customClass?: string;
  onClick?: any;
  disabled?: boolean;
  disableOnLoading?: boolean;
  member?: string;
  customValueAttr?: any;
  // ref?: string;
  theme?: ButtonTheme;
}

class Button extends React.Component<IProps, any> {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    title: 'Submit',
    disableOnLoading: false
  };
  btnRef = React.createRef<HTMLButtonElement>();

  focus() {
    // !this.props.disabled &&
    //   (ReactDOM.findDOMNode(this.refs.button) as any).focus();
  }

  render() {
    const {
      title,
      type = '',
      customClass = '',
      disabled = false,
      disableOnLoading,
      theme
    } = this.props;

    const themeClassName = theme ? `${prefixClassName}--${theme}` : '';
    const className = `${prefixClassName} ${customClass} ${type} ${themeClassName}`;
    const tooltip = typeof title === 'string' ? title.toString() : '';
    const isLoading = type === 'loading';
    const isDisabled = disabled || (disableOnLoading && isLoading);

    return (
      <button
        ref={this.btnRef}
        disabled={isDisabled}
        title={tooltip}
        onClick={evt =>
          this.props.onClick &&
          this.props.onClick(evt, this.props.customValueAttr)
        }
        className={className}
      >
        {isLoading ? <Spinner /> : title}
      </button>
    );
  }
}

export default Button;
