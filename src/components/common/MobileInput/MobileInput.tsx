import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { validationHandler } from './../../../utils/Validations';
import './mobileinput.scss';

interface IState {
  value?: string | number;
  isValid?: boolean;
  validationMsg?: string;
  isShowErrors?: boolean;
  isFocused?: boolean;
}

interface IProps {
  value?: string | number;
  onChange?: (val, validobj) => void;
  onValid?: string;
  onBlur?: (val) => void;
  label?: string;
  countryCode?: string;
  maxlength?: number;
  customClass?: string;
  placeholder?: string;
  isValidateOnBlur?: boolean;
  validations?: any;
  errorClass?: string;
  description?: string;
  extraLabel?: string;
  onKeyDown?: (event: React.KeyboardEvent) => any;
  disabled?: boolean;
  onFocus?: () => void;
  refIp?: any;
}
// interface IValidation {
//   isValid: boolean;
//   message: string;
// }

class MobileInput extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    let value: string;
    value = '';

    if (props.value) {
      value = props.value;
    }
    this.state = {
      value,
      isValid: true,
      validationMsg: '',
      isShowErrors: false,
      isFocused: false
    };
    this.modal = React.createRef<HTMLDivElement>();
  }

  static defaultProps = {
    value: '',
    label: 'Mobile No',
    countryCode: '+91',
    maxlength: 10,
    customClass: '',
    placeholder: 'Mobile No',
    isValidateOnBlur: true,
    validations: ['mobile'],
    errorClass: '',
    disabled: false
  };
  private modal: React.RefObject<HTMLDivElement>;
  refs: any;

  componentWillReceiveProps(nextProps: IProps) {
    let value = this.state.value;
    if (nextProps.value) {
      value = nextProps.value;
    }
    this.setState({
      value
    });
  }

  getValue() {
    return this.state.value;
  }

  handleChange = (event: any) => {
    let value: any = event.target.value;
    value = value.replace(/[^0-9]/g, '');
    // logic to handle max length..
    if (
      (this.props.maxlength && value.length > this.props.maxlength) ||
      window['isNaN'](value)
    ) {
      event.target.value = this.state.value;
      return;
    }

    let validationObj: any;
    validationObj = validationHandler(value, this.props.validations);

    this.setState(
      {
        value,
        isValid: validationObj['isValid'],
        validationMsg: validationObj['message'],
        isShowErrors: false
      },
      function() {
        if (this.props.onChange) {
          this.props.onChange(value, validationObj);
        }
      }
    );
  };

  handleFocus = () => {
    this.setState({
      isFocused: true
    });
    this.props.onFocus && this.props.onFocus();
  };

  handleBlur = () => {
    let isShowErrors = false;
    if (this.props.isValidateOnBlur === true) {
      isShowErrors = true;
    }

    let validationObj: any;
    validationObj = validationHandler(this.state.value, this.props.validations);
    this.setState(
      {
        isValid: validationObj['isValid'],
        validationMsg: validationObj['message'],
        isShowErrors,
        isFocused: false
      },
      function() {
        if (this.props.onBlur) {
          this.props.onBlur(this.state.value);
        }
        if (this.state.isValid && this.props.onValid) {
          this.props.onValid(this.state.value);
        }
      }
    );
  };

  focus() {
    if (this.props.disabled) {
      return;
    }
    (ReactDOM.findDOMNode(this.refs.tel) as any).focus();
    this.handleFocus();
  }

  blur() {
    if (this.props.disabled) {
      return;
    }
    (ReactDOM.findDOMNode(this.refs.tel) as any).blur();
    this.handleBlur();
  }

  onKeyDown = (event: React.KeyboardEvent) => {
    this.props.onKeyDown && this.props.onKeyDown(event);
  };

  public showValidations(isShowErrors: boolean = true) {
    this.setState({
      isShowErrors
    });
  }

  public isValid(isShowErrors: boolean = false) {
    let validationObj: any;
    validationObj = validationHandler(this.state.value, this.props.validations);
    if (isShowErrors) {
      this.setState({
        isShowErrors: true,
        isValid: validationObj['isValid'],
        validationMsg: validationObj['message']
      });
    }
    return validationObj.isValid;
  }

  render() {
    const hasValueorisFocused =
      (this.state.value !== '' &&
        this.state.value !== undefined &&
        this.state.value !== null) ||
      this.state.isFocused;
    const labelClass = hasValueorisFocused
      ? 'w--text_input--label-minimized'
      : 'w--text_input--label-full';
    const parentClass = this.state.isFocused ? 'is_focused' : '';
    const countryCodeClass = hasValueorisFocused ? 'reveal' : '';
    const hasError =
      this.state.isValid === false && this.state.isShowErrors === true;
    const handlers = this.props.disabled
      ? {
          disabled: true
        }
      : {
          onChange: this.handleChange,
          onBlur: this.handleBlur,
          onFocus: this.handleFocus,
          onKeyDown: this.onKeyDown,
          maxLength: this.props.maxlength
        };
    return (
      <div
        ref={this.modal}
        className={
          'w--text_input w--text_input-mobile ' +
          parentClass +
          ' ' +
          this.props.customClass +
          ' ' +
          (hasError ? 'has-error' : '')
        }
      >
        <div className={'w--text_input--label ' + labelClass}>
          {hasValueorisFocused ? this.props.label : ''}
        </div>
        {hasValueorisFocused ? null : (
          <div className="info-label">{this.props.extraLabel}</div>
        )}
        {this.props.countryCode && (
          <div className={'country_code ' + countryCodeClass}>
            {this.props.countryCode}
          </div>
        )}
        <input
          ref={this.props.refIp}
          type="tel"
          tabIndex={0}
          placeholder={this.props.placeholder}
          value={this.state.value !== undefined ? this.state.value + '' : ''}
          {...handlers}
        />
        {this.props.description ? (
          <label
            className={
              'text-description ' + (this.state.isFocused ? 'reveal' : '')
            }
          >
            {this.props.description}
          </label>
        ) : null}
        <hr />
        {hasError ? (
          <div className={'error-label ' + this.props.errorClass}>
            {this.state.validationMsg}
          </div>
        ) : null}
      </div>
    );
  }
}

export default MobileInput;
