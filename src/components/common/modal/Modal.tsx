/* tslint:disable */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import OutsideClickHandler from './OnClickHandler';
import './modal.scss';
interface IState {
  isOpen?: boolean;
}

interface IProps {
  isOpen?: boolean;
  customClass?: string;
  type?: string;
  size?: string;
  children?: any;
  onClose?: () => void;
  isCloseOnOutSideClick?: boolean;
  isCloseOnEscape?: boolean;
  header?: JSX.Element | string;
  footer?: JSX.Element | string;
  customHeaderClass?: string;
  customFooterClass?: string;
  isShowCloseIcon?: boolean;
  customParentClass?: string;
  isPreventScrolling?: boolean;
  isMobileDevice?: boolean;
  headerOnTop?: boolean;
  theme?: '' | 'dark' | 'light';
  position?: '' | 'center'
}

const MODAL_CLASS = 'modal-open';

class Modal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const { isOpen } = this.props;
    this.state = {
      isOpen
    };
    this.modal = React.createRef<HTMLDivElement>();
    this.modalBg = React.createRef<HTMLDivElement>();
    this.modalContent = React.createRef<HTMLDivElement>();
  }

  static defaultProps = {
    isOpen: false,
    customClass: '',
    size: 'small',
    isCloseOnOutSideClick: true,
    isCloseOnEscape: true,
    customHeaderClass: '',
    customFooterClass: '',
    isShowCloseIcon: false,
    isPreventScrolling: true,
    headerOnTop: false
    // theme: 'light',
  };
  private modal: React.RefObject<HTMLDivElement>;
  private modalBg: React.RefObject<HTMLDivElement>;
  private modalContent: React.RefObject<HTMLDivElement>;
  refs: any;
  private clickOutsideHandler: OutsideClickHandler;

  componentWillReceiveProps(nextProps: IProps) {
    if (
      nextProps.isOpen !== undefined &&
      nextProps.isOpen !== this.props.isOpen
    ) {
      this.setState({
        isOpen: nextProps.isOpen
      });
    }
    
    // will set close on out-side click only when modal is in open state - post mount handlling
    if (this.props.isCloseOnOutSideClick !== nextProps.isCloseOnOutSideClick) {
      this.setClickOutsideHandler();
    }
  }

  componentDidMount() {
    if (this.props.isCloseOnOutSideClick) {
      this.setClickOutsideHandler();
    }

    if (this.props.isCloseOnEscape) {
      window.addEventListener('keydown', this.handleKeyPress);
    }

    if (this.props.isPreventScrolling) {
      document.body.classList.add(MODAL_CLASS);
    }
  }

  setClickOutsideHandler = () => {
    this.clickOutsideHandler = new OutsideClickHandler(
      ReactDOM.findDOMNode(this.modalContent.current) as HTMLDivElement,
      () => {
        this.handleClose(true);
      }
    );
  };

  componentWillUnmount() {
    if (this.clickOutsideHandler) {
      this.clickOutsideHandler.dispose();
    }

    window.removeEventListener('keydown', this.handleKeyPress);
    document.body.classList.remove(MODAL_CLASS);
  }

  componentWillUpdate(nextProps, nextState) {
    if (
      this.props.isPreventScrolling &&
      nextProps.isOpen !== this.props.isOpen
    ) {
      document.body.classList.toggle(MODAL_CLASS, !!nextProps.isOpen);
    }
  }

  handleKeyPress = (event: any) => {
    // escape key
    if (event.keyCode === 27 && this.props.isCloseOnEscape) {
      this.handleClose();
    }
  };

  handleClose(isOutSideClick: boolean = false) {
    if (!isOutSideClick || this.props.isCloseOnOutSideClick) {
      this.setState(
        {
          isOpen: false
        },
        () => {
          if (this.props.onClose) {
            this.props.onClose();
          }
        }
      );
    }
  }

  render() {
    const {
      customParentClass = '',
      customClass = '',
      customFooterClass,
      customHeaderClass,
      headerOnTop,
      footer = false,
      header = false,
      type,
      size,
      theme,
      position
    } = this.props;
    const { isOpen } = this.state;

    const popup = type === 'popup' ? 'cf-modal--popup ' : '';
    const themeType = theme  ? `cf-modal--${theme}` : '';
    const positionType = position  ? `cf-modal--${position}` : '';
    const reveal = isOpen ? 'reveal' : '';
    const parentClassName = `cf-modal ${customParentClass} ${reveal} ${popup} ${themeType} ${positionType}`;
    const className = `cf-modal__content modal-bounce-in ${customClass} ${size}`;
    const headerClassName = `${
      headerOnTop ? 'cf-modal__title--top' : ''
    } ${customHeaderClass}`;
    const closeIconClassName = `cf-modal__close ${
      headerOnTop ? 'cf-modal__close--top' : ''
    }`;

    return ReactDOM.createPortal(
      <div ref={this.modal}>
        <div ref={this.modalBg} className={parentClassName}>
          <div ref={this.modalContent} className={className}>
            {this.props.isShowCloseIcon === true ? (
              <div
                className={['icon_close', (closeIconClassName)].join(' ')}
                onClick={this.handleClose.bind(this, false)}
              />
            ) : null}
            {header && <div className={headerClassName}>{header}</div>}
            {this.props.children}
            {footer && <div className={customFooterClass}>{footer}</div>}
          </div>
        </div>
      </div>,
      document.getElementById('portal-root') as HTMLElement
    );
  }
}

export default Modal;
