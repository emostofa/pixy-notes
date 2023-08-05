import React from "react";
import { Menu, SubMenu, MenuItem, Sidebar } from "react-pro-sidebar";
import NewNote from "../../components/Newnote";

export default function DemoPage() {
  const handleImageUpload = (e) => {
    e.preventDefault();

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
              <MenuItem> Calendar</MenuItem>
              <MenuItem> E-commerce</MenuItem>
              <MenuItem> Examples</MenuItem>
            </Menu>
          </Sidebar>
        </div>
<NewNote></NewNote>
        {/* <button className="btn" onClick={() => window.my_modal_2.showModal()}>
          open modal
        </button>
        <dialog id="my_modal_2" className="modal  modal-bottom sm:modal-middle">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click outside to close</p>
            
            <button className="btn" onClick={(e) => handleImageUpload(e)} >Upload</button>
          </form>
          <form method="dialog" className="modal-backdrop">
            
          </form>
        </dialog> */}
      </div>
    </>
  );
}
