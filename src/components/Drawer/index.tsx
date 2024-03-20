import { CSSTransition } from "react-transition-group";
import Portal from "@rc-component/portal";
// import styled from "styled-components";

import styles from "./index.module.less";

import { CSSProperties } from "react";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: number;
}

const prefixCls = "7x-drawer";

const Drawer: React.FC<DrawerProps> = (props) => {
  const { width, open, children, onClose } = props;

  return (
    <Portal open={open} autoLock={true} autoDestroy={false}>
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
            <div>{children}</div>
          </div>
        </CSSTransition>
      </div>
    </Portal>
  );
};

export default Drawer;
