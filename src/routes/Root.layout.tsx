import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";

export function RootLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const menuItems = [
    { name: "Accueil", path: "/" },
    { name: "Pokedex", path: "/pokedex" },
  ];

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-black/90 text-white">
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            {/* <AcmeLogo /> */}
            <p className="font-bold text-inherit">Pokemon</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.map((menuItem) => (
            <NavbarItem key={menuItem.path} isActive={location.pathname === menuItem.path}>
              <Link to={menuItem.path} color="foreground">
                {menuItem.name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((menuItem, index) => (
            <NavbarMenuItem key={menuItem.path}>
              <Link
                to={menuItem.path}
                color={
                  location.pathname === menuItem.path
                    ? "danger"
                    : index === 0
                      ? "foreground"
                      : "primary"
                }
              >
                {menuItem.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
      <div className="bg-fixed pattern-polka" />
      <main className="max-w-screen-xl mx-auto">
        <Outlet />
      </main>
    </>
  );
}
