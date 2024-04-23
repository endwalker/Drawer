import {
  PropsWithChildren,
  Children,
  ReactElement,
  cloneElement,
  useState,
  useEffect,
} from "react";
import Portal from "@rc-component/portal";

import BasicDrawer from "../BasicDrawer";
import SecondDrawer from "../SecondDrawer";

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

  const [drawerState, setDrawerState] = useState(() => {
    return {
      first: firstDrawerOpen,
      second: null,
      third: null,
    };
  });

  const [collapseState, setCollapseState] = useState(() => {
    return {
      first: firstDrawerOpen,
      second: null,
      third: null,
    };
  });

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
        setDrawerState({
          ...drawerState,
          [child?.type?.displayName.split("-")[0]]: child.props.open,
        });
      }
    });
  }, [children]);

  useEffect(() => {
    if (firstDrawerOpen) {
      setDrawerState({
        ...drawerState,
        first: firstDrawerOpen,
      });
    } else {
      setDrawerState({
        first: firstDrawerOpen,
        second: null,
        third: null,
      });
    }
  }, [firstDrawerOpen]);

  return (
    <Portal open={firstDrawerOpen} autoLock={true} autoDestroy={false}>
      <BasicDrawer
        openStates={[firstDrawerOpen, secondDrawerProps.open]}
        title={title}
        width={width}
        onCloseFns={[onClose, secondDrawerProps.onClose]}
      >
        {htmlChildren}

        {drawerState.second &&
          Children.map(customizeChildren, (child) => {
            return cloneElement(child, { firstDrawerOpen });
          })}
      </BasicDrawer>
    </Portal>
  );
};

Drawer.SecondDrawer = SecondDrawer;

export default Drawer;
