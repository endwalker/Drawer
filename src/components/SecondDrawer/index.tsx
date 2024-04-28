// import Portal from "@rc-component/portal";
import { CSSProperties, PropsWithChildren, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import styles from "../Drawer/index.module.less";

const prefixCls = "7x-drawer";

const SecondDrawer: React.FC<PropsWithChildren<any>> = (props) => {
  const {
    firstDrawerOpen,
    children,
    open,
    width,
    onClose,
    title = "second",
  } = props;

  useEffect(() => {
    if (!firstDrawerOpen) {
      onClose();
    }
  }, [firstDrawerOpen]);

  return (
    <div>
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

SecondDrawer.displayName = "second-drawer";

export default SecondDrawer;
