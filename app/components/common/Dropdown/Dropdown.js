// import { useState } from "react";
// import Link from "next/link";
// import styles from "./Dropdown.module.css";

// const Dropdown = ({ children }) => {
//   return ({ title, options, toggleMobileMenu, ...props }) => {
//     const [isOpen, setIsOpen] = useState(false);

//     const handleMouseEnter = () => {
//       setIsOpen(true);
//     };

//     const handleMouseLeave = () => {
//       setIsOpen(false);
//     };

//     return (
//       <div
//         className={styles.dropdown}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className={styles.dropdownButton}
//         >
//           {title}
//         </button>
//         {isOpen && (
//           <div className={styles.dropdownContent}>
//             {options.map((option, index) => (
//               <Link
//                 key={index}
//                 href={option.href}
//                 onClick={() => {
//                   toggleMobileMenu();
//                   setIsOpen(false);
//                 }}
//               >
//                 {option.label}
//               </Link>
//             ))}
//           </div>
//         )}
//         <children {...props} />
//       </div>
//     );
//   };
// };

// export default withDropdown;

export default function DropDown() {}
