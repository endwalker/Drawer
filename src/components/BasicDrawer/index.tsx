import styles from "../Drawer/index.module.less";
import { CSSProperties, PropsWithChildren } from "react";
import { CSSTransition } from "react-transition-group";

const prefixCls = "7x-drawer";

interface BasicDrawerProps {
  openStates: [first: boolean, second?: boolean, third?: boolean];
  onCloseFns: (() => void)[];
  width?: number;
  title: string;
}
const BasicDrawer: React.FC<PropsWithChildren<BasicDrawerProps>> = (props) => {
  const { width, openStates, children, onCloseFns, title } = props;

  const [firstOpenState, secondOpenState = false, thirdOpenState = false] =
    openStates;

  return (
    <div className={styles[`${prefixCls}-wrapper`]}>
      <CSSTransition
        in={firstOpenState}
        appear
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <div
          className={styles[`${prefixCls}-mask`]}
          onClick={() => {
            onCloseFns.forEach((fn) => {
              fn();
            });
          }}
        />
      </CSSTransition>

      <CSSTransition
        in={firstOpenState}
        appear={true}
        enter={true}
        classNames={"drawer"}
        timeout={300}
        // unmountOnExit={secondOpenState || thirdOpenState) { ? false : true}
        unmountOnExit={false}
        onEnter={(e: HTMLElement) => {
          ((e.parentNode as HTMLDivElement).style as CSSProperties).display =
            "flex";
          ((e.parentNode as HTMLDivElement).style as CSSProperties).zIndex =
            "999";

          e.style.opacity = "0";
        }}
        onEntering={(e: HTMLElement) => {
          e.style.opacity = "1";
        }}
        onExiting={(e: HTMLElement) => {
          if (secondOpenState || thirdOpenState) {
            e.style.opacity = "1";
          } else {
            e.style.opacity = "0";
          }
        }}
        onExited={(e: HTMLElement) => {
          ((e.parentNode as HTMLDivElement).style as CSSProperties).display =
            "";
          ((e.parentNode as HTMLDivElement).style as CSSProperties).zIndex =
            "-1";

          // e.style.transform = "translateX(100%)";
        }}
      >
        <div
          className={styles[`${prefixCls}-content`]}
          style={{ width: width ? `${width}px` : "800px" }}
        >
          <div className={styles[`${prefixCls}-title`]}>{title}</div>

          <div>{children}</div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default BasicDrawer;
