import { PropsWithChildren, Children, ReactElement, cloneElement } from "react";
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
  const { children, open, ...rest } = props;
  const customizeChildren: ReactElement[] = [];

  const htmlChildren: ReactElement[] = [];

  Children.forEach(children, (child: Record<any, any> | any) => {
    if (customizeDrawerName.includes(child?.type?.displayName)) {
      customizeChildren.push(child);
    } else {
      htmlChildren.push(child);
    }
  });

  return (
    <Portal open={open} autoLock={true} autoDestroy={false}>
      <BasicDrawer open={open} {...rest}>
        {htmlChildren}

        {Children.map(customizeChildren, (child) => {
          console.log("{Children.map ~ child:", child);
          return cloneElement(child);
        })}
      </BasicDrawer>
    </Portal>
  );
};

Drawer.SecondDrawer = SecondDrawer;

export default Drawer;
