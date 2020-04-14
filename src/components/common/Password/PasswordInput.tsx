import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { validationHandler } from '../../../utils/Validations';
import './PasswordInput.scss';

interface IState {
  value?: string;
  isValid?: boolean;
  validationMsg?: string;
  isShowErrors?: boolean;
  isFocused?: boolean;
}

interface IProps {
  value?: string;
  onChange?: (val, validobj) => void;
  onValid?: string;
  onBlur?: (val) => void;
  label?: string;
  customClass?: string;
  placeholder?: string;
  isValidateOnBlur?: boolean;
  validations?: any;
  errorClass?: string;
  maxLength?: number;
  disabled?: boolean;
  onKeyUp?: (event: React.KeyboardEvent) => any;
  onKeyDown?: (event: React.KeyboardEvent) => any;
  description?: string;
  ellipsisOnOverflow?: boolean;
  customInputClass?: string;
  prefixText?: string;
  prefixParentClass?: string;
  capitalize?: boolean;
  onEnterPress?: (event?: any) => void;
  focusOnMount?: boolean;
  onFocus?: () => void;
  readOnly?: boolean;
  refIp?: any;
}
interface IValidation {
  isValid?: boolean;
  message?: string;
}

class Password extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: props.value,
      isValid: true,
      validationMsg: '',
      isShowErrors: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }
  static defaultProps = {
    value: '',
    label: '',
    customClass: '',
    placeholder: '',
    isValidateOnBlur: true,
    validations: [],
    errorClass: '',
    disabled: false,
    ellipsisOnOverflow: false,
    capitalize: false,
    focusOnMount: false,
    readOnly: false
  };
  inputRef = React.createRef<HTMLInputElement>();
  refs: any;

  componentWillReceiveProps(nextProps: IProps) {
    this.setState({
      value: nextProps.value
    });
  }

  componentDidMount() {
    this.props.focusOnMount && this.focus();
  }

  handleChange(event: any) {
    let value: string = event.target.value;
    this.props.capitalize && value && (value = value.toUpperCase());
    // logic to handle max length..
    // if(this.props.maxLength && value.length > this.props.maxLength){
    // 	event.target.value = value.substring(0, this.props.maxLength)
    // 	return
    // }

    let validationObj: IValidation;
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
  }

  handleFocus(event?: any) {
    this.setState({
      isFocused: true
    });
    this.props.onFocus && this.props.onFocus();
  }

  handleBlur(event?: any) {
    let isShowErrors = false;
    if (this.props.isValidateOnBlur === true) {
      isShowErrors = true;
    }

    let validationObj: IValidation;
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
  }

  onKeyUp = (event: React.KeyboardEvent) => {
    this.props.onKeyUp && this.props.onKeyUp(event);
  };

  onKeyDown = (event: React.KeyboardEvent) => {
    this.props.onKeyDown && this.props.onKeyDown(event);
    if (event.keyCode === 13) {
      this.onEnterPress(event);
    }
  };

  onEnterPress = (event: React.KeyboardEvent) => {
    this.props.onEnterPress && this.props.onEnterPress();
  };

  public showValidations() {
    this.setState({
      isShowErrors: true
    });
  }

  getValue() {
    return this.state.value;
  }

  public isValid(isShowErrors: boolean = false) {
    let validationObj: IValidation;
    const validations = [...this.props.validations];
    if (this.props.maxLength) {
      const limitExceededBy =
        this.state.value && this.state.value.length - this.props.maxLength;

      validations.push({
        name: 'maxLength',
        message:
          'Character limit exceeded by ' +
          limitExceededBy +
          ', only ' +
          this.props.maxLength +
          ' characters allowed.',
        maxLength: this.props.maxLength
      });
    }

    validationObj = validationHandler(this.state.value, validations);
    if (isShowErrors) {
      this.setState({
        isShowErrors: true,
        isValid: validationObj['isValid'],
        validationMsg: validationObj['message']
      });
    }
    return validationObj.isValid;
  }

  focus() {
    if (this.props.disabled) {
      return;
    }
    (ReactDOM.findDOMNode(this.refs.text) as any).focus();
    this.handleFocus();
  }

  blur() {
    if (this.props.disabled) {
      return;
    }
    (ReactDOM.findDOMNode(this.refs.text) as any).blur();
    this.handleBlur();
  }

  render() {
    const { value = '', isFocused, isShowErrors, isValid } = this.state;
    const {
      prefixText,
      customClass,
      ellipsisOnOverflow,
      prefixParentClass
    } = this.props;

    const uniqueKey = new Date().getTime().toString();
    const isShowFloatingLabel =
      (value !== '' && value !== undefined && value !== null) ||
      isFocused ||
      prefixText;
    const labelClass = isShowFloatingLabel
      ? 'w--password_input--label-minimized'
      : 'w--password_input--label-full';
    const parentClass = isFocused ? 'is_focused' : '';
    const hasError = isValid === false && isShowErrors === true;

    const className = `w--password_input ${parentClass || ''} ${customClass ||
      ''}
			${hasError ? 'has-error' : ''}
			${ellipsisOnOverflow ? 'text_ellipsis' : ''}
			${prefixParentClass}`;

    return (
      <div className={className}>
        <div>
          <label
            className={'w--password_input--label ' + labelClass}
            htmlFor={uniqueKey}
          >
            {isShowFloatingLabel ? this.props.label : ''}
          </label>
        </div>
        {prefixText ? <span className="input-prefix">{prefixText}</span> : null}
        <input
          id={uniqueKey}
          ref={this.props.refIp}
          type="password"
          tabIndex={0}
          value={value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onKeyUp={this.onKeyUp}
          onKeyDown={this.onKeyDown}
          disabled={this.props.disabled}
          className={
            this.props.customInputClass ? this.props.customInputClass : ''
          }
          spellCheck={false}
          maxLength={this.props.maxLength}
          readOnly={this.props.readOnly}
          placeholder={this.props.placeholder}
        />
        {this.props.description ? (
          <label className={'text-description ' + (isFocused ? 'reveal' : '')}>
            {!isShowFloatingLabel ? this.props.description : ''}
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

export default Password;
