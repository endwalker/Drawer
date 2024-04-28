import {
  PropsWithChildren,
  Children,
  ReactElement,
  cloneElement,
  useEffect,
  useMemo,
} from "react";
import Portal from "@rc-component/portal";
import { CSSTransition } from "react-transition-group";

import BasicDrawer from "../BasicDrawer";
import SecondDrawer from "../SecondDrawer";
import { useDrawerStore } from "@/store";

import styles from "../Drawer/index.module.less";

const prefixCls = "7x-drawer";

interface DrawerProps {
  open: boolean;
  width: number;
  title: string;
  onClose: () => void;
}

const customizeDrawerName = ["second-drawer", "third-drawer"];

const Drawer: React.FC<PropsWithChildren<DrawerProps>> & {
  SecondDrawer: typeof SecondDrawer;
} = (props) => {
  const { children, open: firstDrawerOpen, title, width, onClose } = props;
  const customizeChildren: ReactElement[] = [];

  const htmlChildren: ReactElement[] = [];

  const { drawerState, changeDrawerState, collapseState, changeCollapseState } =
    useDrawerStore();

  const secondDrawerProps: any = {};

  Children.forEach(children, (child: Record<any, any> | any) => {
    if (customizeDrawerName.includes(child?.type?.displayName)) {
      customizeChildren.push(child);
      for (const key in child.props) {
        if (Object.prototype.hasOwnProperty.call(child.props, key)) {
          secondDrawerProps[key] = child.props[key];
        }
      }
    } else {
      htmlChildren.push(child);
    }
  });

  useEffect(() => {
    Children.forEach(customizeChildren, (child: Record<any, any> | any) => {
      if (customizeDrawerName.includes(child?.type?.displayName)) {
        changeDrawerState({
          [child?.type?.displayName.split("-")[0]]: child.props.open,
        });
      }
    });
  }, [children]);

  useEffect(() => {
    if (firstDrawerOpen) {
      changeDrawerState({
        first: firstDrawerOpen,
      });
    } else {
      changeDrawerState({
        first: firstDrawerOpen,
        second: undefined,
        third: undefined,
      });
    }
  }, [firstDrawerOpen]);

  return (
    <Portal open={firstDrawerOpen} autoLock={true} autoDestroy={false}>
      <div className={styles[`${prefixCls}-wrapper`]}>
        {useMemo(() => {
          return (
            <CSSTransition
              in={firstDrawerOpen}
              appear
              timeout={300}
              classNames="fade"
              unmountOnExit
            >
              <div
                className={styles[`${prefixCls}-mask`]}
                onClick={() => {
                  if (onClose) onClose();
                  if (secondDrawerProps?.onClose) secondDrawerProps.onClose();
                }}
              />
            </CSSTransition>
          );
        }, [firstDrawerOpen])}

        <BasicDrawer
          openStates={[firstDrawerOpen, secondDrawerProps.open]}
          title={title}
          width={width}
        >
          {htmlChildren}
        </BasicDrawer>

        {drawerState.second &&
          Children.map(customizeChildren, (child) => {
            return cloneElement(child, { firstDrawerOpen });
          })}
      </div>
    </Portal>
  );
};

Drawer.SecondDrawer = SecondDrawer;

export default Drawer;
