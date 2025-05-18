import React, { useState } from "react";
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";


import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  FaTachometerAlt,
  FaUserEdit,
  FaFilter,
  FaSchool,
  FaCalendarCheck,
  FaBookOpen,
  FaHandsHelping,
  FaChevronLeft,
  FaUserTie, // Icon representing teachers
  FaUsers, 
  FaChalkboardTeacher, 
  FaClipboardList, 
  FaChevronRight,
FaFileInvoiceDollar  ,
  FaBook,
  FaHistory,
} from "react-icons/fa";

const SideNavBar = () => {
  const navigate = useNavigate()


  const [isExpanded, setIsExpanded] = useState(true); // Sidebar toggle state
  const [openAccordion, setOpenAccordion] = useState(null); // Accordion toggle

  const handleAccordionToggle = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const handleSidebarToggle = () => {
    setIsExpanded(!isExpanded); // Toggle sidebar state
    setOpenAccordion(null); // Close all accordions when collapsing
  };

  return (
    <Card
      className={`h-full flex flex-col justify-between ${
        isExpanded ? "w-72" : "w-16"
      } min-h-screen p-2  shadow-blue-gray-900/5 bg-green-100  rounded-none transition-all duration-300`}
    >
      {/* Sidebar Toggle Button */}
      <div
        className="absolute top-0 right-4 transform translate-x-1/2 flex items-center justify-center cursor-pointer  border-white  rounded-md bg-white shadow-md border-2  hover:bg-blue-gray-100 transition duration-300 w-9 h-9"
        onClick={handleSidebarToggle}
      >
        {isExpanded ? (
          <FaChevronLeft className="h-4 w-4 text-blue-gray-900 hover size-px  border-blue-gray-900 transform transition-transform duration-300 rotate-0
          " />
        ) : ( 
          <FaChevronRight className="h-4 w-4 text-blue-gray-900 hover size-px transform transition-transform duration-300 rotate-180 " />
        )}
      </div>

      <List className={`${isExpanded ? "" : "pointer-events-none"}`} >
        {/* Overview Section */}
        <Accordion
          open={isExpanded && openAccordion === 1}
          icon={
            isExpanded && (
              <FaChevronRight
                className={`mx-auto h-4 w-4 hover size-px transition-transform ${
                  openAccordion === 1 ? "rotate-90" : ""
                }`}
              />
            )
          }
        >
          <ListItem className=" max-w-60   p-1 min-h-[20px] hover:bg-gray-200 transition-all duration-200" selected={openAccordion === 0}>
            <AccordionHeader
              onClick={() => handleAccordionToggle(1)}
              className="border-b-1  px-3 py-3"
            >
              <ListItemPrefix>
                <FaTachometerAlt className="h-5 w-5" />
              </ListItemPrefix>
              {isExpanded && (
                <Typography color="black" className="mr-auto font-normal">
                  Administration
                </Typography>
              )}
            </AccordionHeader>
          </ListItem>
          {isExpanded && openAccordion === 1 && (
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem className=" max-w-60   p-1 min-h-[20px] hover:bg-gray-200 transition-all duration-200">
                  <ListItemPrefix>
                    <FaChevronRight className="h-3 w-5" />
                  </ListItemPrefix>
                  <Link to="/dashboard">Admission Info</Link>
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <FaChevronRight className="h-3 w-5" />
                  </ListItemPrefix>
                  Overveiw Pannle
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <FaChevronRight className="h-3 w-5" />
                  </ListItemPrefix>
                  Academic Yearly Fee Management
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <FaChevronRight className="h-3 w-5" />
                  </ListItemPrefix>
                  Students Management
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <FaChevronRight className="h-3 w-5" />
                  </ListItemPrefix>
                  Teacher Management
                </ListItem>
                <ListItem>
                  <ListItemPrefix>
                    <FaChevronRight className="h-3 w-5" />
                  </ListItemPrefix>
                  Yearly Occantion Planning
                </ListItem>
                <ListItem  onClick={() => navigate("/vacation")}>
                  <ListItemPrefix>
                    <FaChevronRight className="h-3 w-5" />
                  </ListItemPrefix>
                  Holiday & Vacation
                </ListItem>
              </List>
            </AccordionBody>
          )}
        </Accordion>

        {/* Profile Setup Section */}
        <Accordion
          open={isExpanded && openAccordion === 2}
          icon={
            isExpanded && (
              <FaChevronRight
                className={`mx-auto h-4 w-4 transition-transform ${
                  openAccordion === 2 ? "rotate-90" : ""
                }`}
              />
            )
          }
        >
          
          <ListItem className="p-0" selected={openAccordion === 2}>
            <AccordionHeader
              onClick={() => handleAccordionToggle(2)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <FaUserEdit className="h-5 w-5" />
              </ListItemPrefix>
              {isExpanded && (
                <Typography color="black" className="mr-auto font-normal">
                  Students
                </Typography>
              )}
            </AccordionHeader>
          </ListItem>
          {isExpanded && openAccordion === 2 && (
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem onClick={() => navigate("/all_students")}>
                  <ListItemPrefix>
                    <FaChevronRight className="h-3 w-5"/>
                     
                  </ListItemPrefix>
                 All Student
                </ListItem>
              
              </List>
            </AccordionBody>
          )}
        </Accordion>

        {/* Explore Teacher Section */}


<Accordion 
  open={isExpanded && openAccordion === 3}
  icon={
    isExpanded && (
      <FaChevronRight
        className={`mx-auto h-4 w-4 transition-transform ${
          openAccordion === 3 ? "rotate-90" : ""
        }`}
      />
    )
  }
>
  <ListItem className="p-0" selected={openAccordion === 3}>
    <AccordionHeader
      onClick={() => handleAccordionToggle(3)}
      className="border-b-0 p-3"
    >
      <ListItemPrefix>
        <FaUserTie className="h-5 w-5" />
      </ListItemPrefix>
      {isExpanded && (
        <Typography color="black" className="mr-auto font-normal">
          Teachers
        </Typography>
      )}
    </AccordionHeader>
  </ListItem>
  {isExpanded && openAccordion === 3 && (
    <AccordionBody className="py-1">
      <List className="p-0">
        <ListItem onClick={() => navigate("/all_teachers")}>
          <ListItemPrefix>
            <FaChalkboardTeacher className="h-4 w-4" />
          </ListItemPrefix>
          All Teachers
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <FaUsers className="h-4 w-4" />
          </ListItemPrefix>
          Departments
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <FaClipboardList className="h-4 w-4" />
          </ListItemPrefix>
          Assign Subjects
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <FaUsers className="h-4 w-4" />
          </ListItemPrefix>
          Students Performance & Report
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <FaBookOpen className="h-4 w-4" />
          </ListItemPrefix>
          Students' Marks Management
        </ListItem>
        <ListItem onClick={() => navigate("/attendace/:id")}>
          <ListItemPrefix>
            <FaCalendarCheck className="h-4 w-4" />
          </ListItemPrefix>
          Students' Attendance
        </ListItem>
      
        
      </List>
    </AccordionBody>
  )}
</Accordion>




        {/* Ranking Record */}
        <ListItem>
          <ListItemPrefix>
            <FaBook className="h-5 w-5" />
          </ListItemPrefix>
          {isExpanded && (
            <Typography color="black" className="mr-auto font-normal">
              Ranking Record
            </Typography>
          )}
        </ListItem>

        {/* College History */}
        <ListItem>
          <ListItemPrefix>
            <FaHistory className="h-5 w-5" />
          </ListItemPrefix>
          {isExpanded && (
            <Typography color="black" className="mr-auto font-normal">
              School History
            </Typography>
          )}
        </ListItem>

        {/* Other Navigation Items */}
        <ListItem>
          <ListItemPrefix>
            <FaFilter className="h-5 w-5" />
          </ListItemPrefix>
          {isExpanded && (
            <Typography color="black" className="mr-auto font-normal">
              Filter Preferences
            </Typography>
          )}
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <FaHandsHelping className="h-5 w-5" />
          </ListItemPrefix>
          {isExpanded && (
            <Typography color="black" className="mr-auto font-normal">
              Additional Features
            </Typography>
          )}
        </ListItem>
      </List>
    </Card>
  );
};

export default SideNavBar;









