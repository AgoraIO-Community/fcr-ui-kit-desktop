import { themeVal } from '../../utils/tailwindcss';
import 'rc-tooltip/assets/bootstrap_white.css';
import { CSSProperties, FC } from 'react';
import { SvgIconEnum, SvgImg } from '../svg-img';
import './index.css';
import './arrow.css';

import classNames from 'classnames';
import { ToolTip, ToolTipProps } from '.';

interface GuideToolTipProps extends ToolTipProps {
  /**
   * 是否显示关闭按钮
   */
  /** @en
   * Size of the input box:
   * medium
   * large
   */
  closable?: boolean;
  /**
   * 点击关闭按钮的回调
   */
  /** @en
   * Size of the input box:
   * medium
   * large
   */
  onClose?: () => void;
}
const GuideToolTipClosableOverlayWrap: FC<
  Pick<GuideToolTipProps, 'closable' | 'content' | 'onClose'>
> = (props) => {
  const { content, closable, onClose } = props;

  const colors = themeVal('colors');

  return (
    <div className={classNames('fcr-guide-tooltip-overlay-content')}>
      <div
        style={{
          padding: closable ? '0px 8px' : '0px 24px',
        }}
        className={classNames('fcr-guide-tooltip-overlay-content-inner')}>
        {content}
      </div>
      {closable && (
        <div
          className={classNames('fcr-guide-tooltip-overlay-content-closable', 'fcr-divider')}
          onClick={onClose}>
          <SvgImg
            type={SvgIconEnum.FCR_CLOSE}
            colors={{ iconPrimary: colors['white'] }}
            size={24}></SvgImg>
        </div>
      )}
    </div>
  );
};
export const GuideToolTip: FC<GuideToolTipProps> = (props) => {
  const { closable, content, onClose, ...others } = props;
  const colors = themeVal('colors');
  const borderRadius = themeVal('borderRadius');
  const defaultGuideOverlayInnerStyle: CSSProperties = {
    padding: '0',
    background: `${colors['brand'][6]}`,
    border: `1px solid ${colors['brand']['DEFAULT']}`,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '40px',
    color: colors['text-1'],
    borderRadius: `${borderRadius[8]}`,
  };
  return (
    <ToolTip
      arrowContent={
        <SvgImg
          type={SvgIconEnum.FCR_TOOLTIP_ARROW}
          colors={{
            iconPrimary: colors['brand'][6],
            iconSecondary: colors['brand'][6],
          }}
          size={16}></SvgImg>
      }
      content={
        <GuideToolTipClosableOverlayWrap
          content={content}
          onClose={onClose}
          closable={closable}></GuideToolTipClosableOverlayWrap>
      }
      overlayInnerStyle={{
        ...defaultGuideOverlayInnerStyle,
        ...props.overlayInnerStyle,
      }}
      {...others}></ToolTip>
  );
};
