import { themeVal } from '../../utils/tailwindcss';
import classNames from 'classnames';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { SvgIconEnum, SvgImg } from '../svg-img';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';

import './index.css';

export type ToastType = 'error' | 'warn' | 'info' | 'normal';
export type ToastSize = 'small' | 'large';
interface ToastProps {
  /**
   * 消息提示框类型，可选值为 'error'(错误) | 'warn'(警告) | 'info'（消息） | 'normal'（普通）
   */
  /** @en
   * The type of toast, can be set to 'error' | 'warn' | 'info' | 'normal'.
   */
  type: ToastType;
  /**
   * 消息提示内容
   */
  /** @en
   * The content of toast.
   */
  content: string | ReactNode;
  /**
   * 消息是否显示关闭按钮
   */
  /** @en
   * wheter a close button is visible on right of the toast or not.
   */
  closable?: boolean;
  /**
   * 消息内容前显示的图标
   */
  /** @en
   *
   */
  icon?: SvgIconEnum;
  /**
   * 消息中的额外操作选项
   */
  /** @en
   * Size of the input box:
   * medium
   * large
   */
  action?: {
    /**
     * 消息中的额外操作选项文案
     */
    /** @en
     * Size of the input box:
     * medium
     * large
     */
    text: string;
    /**
     * 消息中的额外操作选项点击回调
     */
    /** @en
     * Size of the input box:
     * medium
     * large
     */
    onClick: () => void;
  };
  /**
   * 点击关闭按钮的回调
   */
  /** @en
   * Size of the input box:
   * medium
   * large
   */
  onClose?: () => void;
  size?: ToastSize;
}
export const Toast = (props: ToastProps) => {
  const { content, icon, type = 'normal', closable, action, onClose, size = 'large' } = props;
  const colors = themeVal('colors');

  return (
    <div
      style={{
        paddingRight: closable ? '0' : '20px',
        paddingLeft: '20px',
      }}
      className={classNames(
        'fcr-toast-container',
        `fcr-toast-${size}`,
        `fcr-toast-${type.toLowerCase()}`,
      )}>
      {icon && (
        <div className={classNames('fcr-toast-container-icon')}>
          <SvgImg
            type={icon}
            colors={{
              iconPrimary:
                type === 'normal' || type === 'warn' ? colors['notsb'] : colors['icon-1'],
            }}
            size={24}></SvgImg>
        </div>
      )}
      <div
        style={{
          paddingRight: closable ? '10px' : '0',
        }}
        className={classNames('fcr-toast-container-content')}>
        <span>{content}</span>
        </div>
      {action && (
        <div
          className={classNames('fcr-toast-container-action', 'fcr-divider')}
          onClick={action.onClick}>
          <span>{action.text}</span>
        </div>
      )}
      {closable && (
        <div onClick={onClose} className={classNames('fcr-toast-container-close', 'fcr-divider')}>
          <SvgImg
            type={SvgIconEnum.FCR_CLOSE}
            colors={{
              iconPrimary:
                type === 'normal' || type === 'warn' ? colors['notsb'] : colors['icon-1'],
            }}
            size={20}></SvgImg>
        </div>
      )}
    </div>
  );
};

export const ToastTransitionGroup = (
  props: { onEnded?: () => void; duration?: number; position?: 'top' | 'bottom' } & ToastProps,
) => {
  const { onEnded, duration = 3000, position = 'top', ...others } = props;
  const [active, setActive] = useState(false);
  const timerRef = useRef<number>(-1);
  useEffect(() => {
    setActive(true);
    timerRef.current = window.setTimeout(() => {
      setActive(false);
    }, duration);
    return () => {
      window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <CSSTransition
      onExited={onEnded}
      mountOnEnter
      classNames={'fcr-toast-anim'}
      in={active}
      timeout={200}>
      <div
        style={{
          width: 'fit-content',
        }}>
        <Toast
          {...others}
          onClose={() => {
            setActive(false);
            others.onClose?.();
          }}></Toast>
      </div>
    </CSSTransition>
  );
};
interface ToastConfig {
  id?: string;
  persist?: boolean;
  toastProps: ToastProps;
  duration?: number;
}
interface RenderableToast extends ToastConfig {
  portal?: HTMLElement;
}

export class ToastApi {
  private static get _presistToastContainer() {
    return document.querySelector(`.${this._presistToastContainerCls}`);
  }
  private static get _singleToastContainer() {
    return document.querySelector(`.${this._singleToastContainerCls}`);
  }
  private static get _classroomViewport() {
    return document.querySelector(`.${this._classroomViewportClassName}`);
  }
  private static _maxPresistToastRenderCount = 2;
  private static _presistToastRenderCount = 0;

  private static _presistToasts: RenderableToast[] = [];
  private static _singleToast: RenderableToast | null = null;
  private static _singleToastContainerCls = 'fcr-single-toast-container';
  private static _presistToastContainerCls = 'fcr-presist-toast-container';
  private static _classroomViewportClassName = 'fcr-classroom-viewport';
  private static _unmountToast = (toast: RenderableToast) => {
    if (toast.portal) {
      unmountComponentAtNode(toast.portal);

      const container = toast.persist ? this._presistToastContainer : this._singleToastContainer;
      container?.removeChild(toast.portal);
      if (toast.persist) {
        this._presistToastRenderCount--;
      }
      this._removeToastContainer();
    }
  };
  private static _preCheck = () => {
    return this._presistToastRenderCount < this._maxPresistToastRenderCount;
  };
  private static _createToastContainer = (persist: boolean) => {
    if (persist) {
      if (!this._presistToastContainer) {
        const presistToastContainer = document.createElement('div');
        presistToastContainer.className = this._presistToastContainerCls;
        this._classroomViewport?.appendChild(presistToastContainer);
      }
    } else {
      if (!this._singleToastContainer) {
        const singleToastContainer = document.createElement('div');
        singleToastContainer.className = this._singleToastContainerCls;
        this._classroomViewport?.appendChild(singleToastContainer);
      }
    }
  };
  private static _removeToastContainer = () => {
    if (this._presistToastRenderCount === 0) {
      if (this._presistToastContainer) {
        this._classroomViewport?.removeChild(this._presistToastContainer);
      }
    }
    if (!this._singleToast) {
      if (this._singleToastContainer) {
        this._classroomViewport?.removeChild(this._singleToastContainer);
      }
    }
  };
  private static _scanRenderableToast = () => {
    if (!this._preCheck()) return;
    const renderableToast = this._presistToasts.shift();
    if (renderableToast) {
      this._presistToastRenderCount++;
      this._render(renderableToast, () => {
        this._scanRenderableToast();
      });
    }
  };
  private static _render = (toast: RenderableToast, onClose?: () => void) => {
    this._createToastContainer(!!toast.persist);
    const container = toast.persist ? this._presistToastContainer : this._singleToastContainer;
    toast.portal = document.createElement('div');
    toast.portal.className = 'fcr-toast-portal';
    container?.appendChild(toast.portal);
    ReactDOM.render(
      <ToastTransitionGroup
        onEnded={() => {
          if (toast) {
            this._unmountToast(toast);
            onClose?.();
          }
        }}
        duration={toast.duration}
        {...toast.toastProps}></ToastTransitionGroup>,
      toast.portal,
    );
  };
  static open(config: ToastConfig) {
    if (!config.id) config.id = uuidv4();
    if (config.persist) {
      this._presistToasts.push(config);
      this._scanRenderableToast();
    } else {
      if (this._singleToast) {
        this._unmountToast(this._singleToast);
        this._singleToast = null;
      }
      this._singleToast = config;
      this._render(this._singleToast, () => {
        this._singleToast = null;
      });
    }
  }
  static destroyAll() {
    if (this._singleToast) {
      if (this._singleToastContainer) {
        this._classroomViewport?.removeChild(this._singleToastContainer);
      }

      this._unmountToast(this._singleToast);
      this._singleToast = null;
    }

    this._presistToasts = [];
    if (this._presistToastContainer) {
      this._classroomViewport?.removeChild(this._presistToastContainer);
    }
  }
}
export class ToastApiFactory {
  private _toastPlacement: 'top' | 'bottom';
  private _renderContainer: HTMLElement | null = null;
  constructor({
    toastPlacement,
    renderContainer,
  }: {
    toastPlacement: 'top' | 'bottom';
    renderContainer: HTMLElement;
  }) {
    this._toastPlacement = toastPlacement;
    this._renderContainer = renderContainer;
  }

  private get _toastContainer() {
    return this._renderContainer?.querySelector(`.${this._toastContainerCls}`);
  }
  private get _toastContainerCls() {
    return `fcr-toast-placement-${this._toastPlacement}`;
  }
  private _toast: RenderableToast | null = null;

  private _unmountToast = (toast: RenderableToast) => {
    if (toast.portal) {
      unmountComponentAtNode(toast.portal);

      const container = this._toastContainer;
      container?.removeChild(toast.portal);

      this._removeToastContainer();
    }
  };

  private _createToastContainer = () => {
    if (!this._toastContainer && this._renderContainer) {
      const singleToastContainer = document.createElement('div');
      singleToastContainer.className = this._toastContainerCls;
      this._renderContainer.appendChild(singleToastContainer);
    }
  };
  private _removeToastContainer = () => {
    if (!this._toast) {
      if (this._toastContainer && this._renderContainer) {
        this._renderContainer.removeChild(this._toastContainer);
      }
    }
  };

  private _render = (toast: RenderableToast, onClose?: () => void) => {
    this._createToastContainer();
    const container = this._toastContainer;
    toast.portal = document.createElement('div');
    toast.portal.className = 'fcr-toast-portal';
    container?.appendChild(toast.portal);
    ReactDOM.render(
      <ToastTransitionGroup
        onEnded={() => {
          if (toast) {
            this._unmountToast(toast);
            onClose?.();
          }
        }}
        duration={toast.duration}
        {...toast.toastProps}></ToastTransitionGroup>,
      toast.portal,
    );
  };
  open(config: ToastConfig) {
    if (!config.id) config.id = uuidv4();
    if (this._toast) {
      this._unmountToast(this._toast);
      this._toast = null;
    }
    this._toast = config;
    this._render(this._toast, () => {
      this._toast = null;
    });
  }
}
