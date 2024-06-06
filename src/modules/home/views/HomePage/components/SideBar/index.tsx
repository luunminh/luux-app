import { Callback } from '@core/common';
import { Divider, Stack } from '@mantine/core';
import cn from 'classnames';
import React, { Fragment } from 'react';
import { BsDot } from 'react-icons/bs';
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import './styles.scss';

export type MenuItemType = {
  label: string;
  isActive?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
  activeIcon?: React.ReactNode;
  subItems?: MenuItemType[];
  onClick?: Callback;
};

const CustomSidebar: React.FC<Props> = ({ menuItems }: Props) => {
  return (
    <Sidebar className={cn('cmp-sidebar')} collapsed={false} breakPoint="md">
      <Stack style={{ height: '100%', flexGrow: 1 }} justify="space-between">
        <Menu>
          {[...menuItems].map((item) => {
            if (!item.subItems) {
              return (
                <Fragment key={item.label}>
                  <MenuItem
                    disabled={item.disabled}
                    active={item.isActive}
                    icon={item.icon}
                    onClick={item.onClick}
                  >
                    {item.label}
                  </MenuItem>
                  <Divider style={{ opacity: 0.4 }} my={8} />
                </Fragment>
              );
            }
            return (
              <Fragment key={`sub-menu-${item.label}`}>
                <SubMenu
                  label={item.label}
                  icon={item.isActive ? item.activeIcon : item.icon}
                  open
                  disabled={item.disabled}
                >
                  {item.subItems.map((subItem) => (
                    <MenuItem
                      disabled={subItem.disabled}
                      active={subItem.isActive}
                      onClick={subItem.onClick}
                      icon={subItem.icon || <BsDot size={24} />}
                      key={subItem.label}
                    >
                      {subItem.label}
                    </MenuItem>
                  ))}
                </SubMenu>
                <Divider style={{ opacity: 0.4 }} my={8} />
              </Fragment>
            );
          })}
        </Menu>
      </Stack>
    </Sidebar>
  );
};

type Props = {
  menuItems: MenuItemType[];
};

export default CustomSidebar;
