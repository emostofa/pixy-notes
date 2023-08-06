import React from 'react'

export default function Sidebar() {
  return (
    <div className='flex'>
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
  )
}
