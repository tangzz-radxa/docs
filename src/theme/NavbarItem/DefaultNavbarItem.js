import React from 'react';
import clsx from 'clsx';
import styles from './index.module.css';
import NavbarNavLink from '@theme/NavbarItem/NavbarNavLink';
function DefaultNavbarItemDesktop({
  children,
  className,
  isDropdownItem = false,
  ...props
}) {
  const element = (
    <>
      <NavbarNavLink
        className={clsx(
          isDropdownItem ? 'dropdown__link' : 'navbar__item navbar__link',
          className,
        )}
        isDropdownLink={isDropdownItem}
        {...props}
      />
      {children && (
        <ul className={styles.dropdown_item2}>
          {
            children.map((item, key) => {
              return <li key={key}>
                <NavbarNavLink
                  label={item.label}
                  to={item.to}
                />
              </li>
            })
          }
        </ul>
      )}
    </>
  );
  if (isDropdownItem || children?.length > 0) {
    return <li
      className={styles.menu2_li_hover}
    >{element}</li>;
  }
  return element;
}
function DefaultNavbarItemMobile({ className, isDropdownItem, ...props }) {
  return (
    <li className="menu__list-item">
      <NavbarNavLink className={clsx('menu__link', className)} {...props} />
    </li>
  );
}
export default function DefaultNavbarItem({
  mobile = false,
  position, // Need to destructure position from props so that it doesn't get passed on.
  ...props
}) {
  const Comp = mobile ? DefaultNavbarItemMobile : DefaultNavbarItemDesktop;
  return (
    <Comp
      {...props}
      activeClassName={
        props.activeClassName ??
        (mobile ? 'menu__link--active' : 'navbar__link--active')
      }
    />
  );
}
