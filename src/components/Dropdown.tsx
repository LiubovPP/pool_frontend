import { useState,useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import '@styles/Dropdown.css'


function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => {setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    // return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  // const handleDropdownClick = (e) => {
  //   if (!e.target.classList.contains('dropdown-item')) {
  //     closeDropdown();
  //   }
  // };

  const handleDocumentClick = (e:any) => {
    if (!e.target.closest('.dropdown')) {
        closeDropdown();
    }
  };
 

    const dropdownContent = (
        <ul className="dropdown-content" onClick={closeDropdown}>
            <li><NavLink className="dropdown-item" to="/maintanance" >Обслуживание</NavLink></li>
            <li><NavLink className="dropdown-item" to="/composite">Композитные</NavLink></li>
            <li><NavLink className="dropdown-item" to="/frame">Каркасные</NavLink></li>
            <li><NavLink className="dropdown-item" to="/concrete">Бетонные</NavLink></li>
            <li><NavLink className="dropdown-item" to="/adjustable">Регулируемый</NavLink></li>
        </ul>
    );

  return (
    <div className={`dropdown ${isOpen ? "dropdown-open" : ""}`}>
      <div onClick={toggleDropdown}>Бассейны ▼</div>
      {isOpen && dropdownContent}
    </div>
  )
}
export default Dropdown;

 
