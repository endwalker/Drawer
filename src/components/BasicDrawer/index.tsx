const prefixCls = "7x-drawer";
import styles from "../Drawer/index.module.less";
import { CSSProperties, PropsWithChildren } from "react";
import { CSSTransition } from "react-transition-group";

interface BasicDrawerProps {
  open: boolean;
  onClose: () => void;
  width?: number;
  title: string;
}
const BasicDrawer: React.FC<PropsWithChildren<BasicDrawerProps>> = (props) => {
  const { width, open, children, onClose, title } = props;

  return (
    <div className={styles[`${prefixCls}-wrapper`]}>
      <CSSTransition
        in={open}
        appear
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <div className={styles[`${prefixCls}-mask`]} onClick={onClose} />
      </CSSTransition>

      <CSSTransition
        in={open}
        appear
        timeout={300}
        unmountOnExit
        classNames={"drawer"}
        onEnter={(e) => {
          ((e.parentNode as HTMLDivElement).style as CSSProperties).display =
            "flex";
          ((e.parentNode as HTMLDivElement).style as CSSProperties).zIndex =
            "999";
        }}
        onExited={(e) => {
          ((e.parentNode as HTMLDivElement).style as CSSProperties).display =
            "";
          ((e.parentNode as HTMLDivElement).style as CSSProperties).zIndex =
            "-1";
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
