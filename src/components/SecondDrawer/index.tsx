import { CSSProperties, PropsWithChildren } from "react";
import { CSSTransition } from "react-transition-group";

const SecondDrawer: React.FC<PropsWithChildren<any>> = (props) => {
  const { children, open, width } = props;

  return (
    <div style={{ width: width ? `${width}px` : "800px" }}>
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
        <div>
          <div>{children}</div>
        </div>
      </CSSTransition>
    </div>
  );
};

SecondDrawer.displayName = "second-drawer";

export default SecondDrawer;
