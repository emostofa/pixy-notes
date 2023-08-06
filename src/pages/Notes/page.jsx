import React from "react";
import { Menu, SubMenu, MenuItem, Sidebar } from "react-pro-sidebar";
import NewNote from "../../components/Newnote";

export default function Notes() {

  const handleImageUpload = (e) => {
    e.preventDefault();

  }
  return (
    <>
    <Sidebar></Sidebar>
      <div className="flex">        
<NewNote></NewNote>
      </div>
    </>
  );
}
