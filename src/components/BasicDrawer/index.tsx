import { CSSProperties, PropsWithChildren, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { useDrawerStore } from "@/store";

import styles from "../Drawer/index.module.less";

const prefixCls = "7x-drawer";

interface BasicDrawerProps {
  openStates: [first: boolean, second?: boolean, third?: boolean];
  width?: number;
  title: string;
}
const BasicDrawer: React.FC<PropsWithChildren<BasicDrawerProps>> = (props) => {
  const { width, openStates, children, title } = props;

  const [firstOpenState, secondOpenState = false, thirdOpenState = false] =
    openStates;

  const nodeRef = useRef<null | HTMLElement>(null);

  const { collapseState, changeCollapseState } = useDrawerStore();
  console.log("collapseState:", collapseState);

  useEffect(() => {
    if (secondOpenState) {
      changeCollapseState({
        first: true,
      });
    }
  }, [secondOpenState]);

  const onExiting = () => {
    if (secondOpenState || thirdOpenState) {
      nodeRef.current!.style.opacity = "1";
    } else {
      nodeRef.current!.style.opacity = "0";
    }
    nodeRef.current!.style.zIndex = "99999";
  };

  const onExited = () => {
    (
      (nodeRef.current!.parentNode as HTMLDivElement).style as CSSProperties
    ).display = "";
    (
      (nodeRef.current!.parentNode as HTMLDivElement).style as CSSProperties
    ).zIndex = "-1";

    // nodeRef.current!.style.transform = "translateX(100%)";
  };

  const onEnterFlow = () => {
    // console.log("onEnterFlow");

    onExiting();
    onExited();
  };

  if (secondOpenState) {
    onEnterFlow();
  }

  return (
    <div>
      <CSSTransition
        in={!collapseState.first}
        appear={true}
        enter={true}
        classNames={"drawer"}
        timeout={300}
        // unmountOnExit={secondOpenState || thirdOpenState) { ? false : true}
        unmountOnExit={false}
        nodeRef={nodeRef}
        onEnter={() => {
          (nodeRef.current!.parentNode as HTMLDivElement).style.display =
            "flex";
          (nodeRef.current!.parentNode as HTMLDivElement).style.zIndex = "999";

          nodeRef.current!.style.opacity = "0";
        }}
        onEntering={() => {
          nodeRef.current!.style.opacity = "1";
        }}
        onExiting={onExiting}
        onExited={onExited}
      >
        <div
          ref={nodeRef}
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
