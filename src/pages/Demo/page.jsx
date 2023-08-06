import React from "react";
import { Menu, SubMenu, MenuItem, Sidebar } from "react-pro-sidebar";
import NewNote from "../../components/Newnote";

export default function DemoPage() {
const handleImageUpload = (e) => {

}
  return (
    <>
      <div className="flex">
        <div className="flex">
          <Sidebar>
            <Menu
              renderExpandIcon={({ open }) => <span>{open ? "-" : "+"}</span>}
            >
              <SubMenu label="My Notes">
                <MenuItem> Pie charts</MenuItem>
                <MenuItem> Line charts</MenuItem>
                <MenuItem> Bar charts</MenuItem>
              </SubMenu>
              <MenuItem> Todo</MenuItem>
              <MenuItem> Lectures</MenuItem>
              <MenuItem> Examples</MenuItem>
            </Menu>
          </Sidebar>
        </div>
<NewNote></NewNote>
       
      </div>
    </>
  );
}
