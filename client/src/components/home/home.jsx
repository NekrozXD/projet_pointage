import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignOutAlt ,faUser, faBuilding, faMobileButton, faMoneyBill, faTachometer, faBuildingUser, faCalendar, faTimeline, faTimes, faStopwatch, faCalendarAlt} from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Society } from "../society/society";
import { User } from "../user/user";
import WorkhourForm from "../workhour/workhour";
// import CreateSociety from "../society/create.component";
// import EditSociety from "../society/edit.component";
import "./home.css"
import { Department } from "../department/Department";
import WorkhourMapping from "../workhour/workhourlist";

export const Home = () => {
    const [value, setValue] = useState(localStorage.getItem('selectedItem') || '0');
    const [selected, setSelected] = useState(localStorage.getItem('selectedItem') || '0');

    const handleClick = (val) => {
      setValue(val);
      setSelected(val);
      localStorage.setItem('selectedItem', val);
    };
  
    const renderContent = () => {
      switch (value) {
        case '0' :
          return <h1>Dashboard no eto angambany</h1>
        case '1':
          return <Society />;
        case '2':
          return <User />;
          case '3':
            return<Department />
        case '4':
          return<WorkhourForm />
        case '5':
          return <WorkhourMapping />
        default:
          return <h1>Home</h1>;
      }
    };
  
    return (
      <div className="home">
        <Navbar bg="transparent" variant="light" className="fixed-top text-dark">
          <Button variant="outline-light" style={{ border: "none" }} >
            <FontAwesomeIcon icon={faBars} style={{ color: "black" }} />
          </Button>
          <Container>
            <div className="logo"></div>
          </Container>
        </Navbar>
        <Container fluid className="mt-5" style={{ marginTop: "250px" }}>
          <Row>
              <Col
                xs={2}
                className="sidebar"
                style={{
                  backgroundColor: "#50b64a",
                  minHeight: "90vh",
                  marginTop: "10px",
                  borderRadius: "20px",
                  position: "relative",
                  width:'250px'
                }}
              >
                <br></br>
            <div
                onClick={() => handleClick('0')}
                style={{
                    backgroundColor: selected === '0' ? '#ececec' : 'inherit',
                    padding: selected === '0' ? '15px' : '10px',
                    marginRight: selected === '0' ? '-20px' : '0px',
                    color: selected === '0'? 'black' : 'white'
                }}
            >
                <FontAwesomeIcon icon={faTachometer} style={{ color: "black" ,color: selected === '0'? 'black' : 'white'}} /> Dashboard
            </div>
            <div
                onClick={() => handleClick('1')}
                style={{
                    backgroundColor: selected === '1' ? '#ececec' : 'inherit',
                    padding: selected === '1' ? '15px' : '10px',
                    marginRight: selected === '1' ? '-20px' : '0px',
                    color: selected === '1'? 'black' : 'white'
                }}
            >
                <FontAwesomeIcon icon={faBuilding} style={{ color: "black",color: selected === '1'? 'black' : 'white' }} /> Society
            </div>
            <div
                onClick={() => handleClick('2')}
                style={{
                    backgroundColor: selected === '2' ? '#ececec' : 'inherit',
                    padding: selected === '2' ? '15px' : '10px',
                    marginRight: selected === '2' ? '-20px' : '0px',
                    color: selected === '2' ? 'black' : 'white'
                }}
            >
                <FontAwesomeIcon icon={faUser} style={{ color: "black" ,color: selected === '2' ? 'black' : 'white'  }} /> User
            </div>
            <div
                onClick={() => handleClick('3')}
                style={{
                    backgroundColor: selected === '3' ? '#ececec' : 'inherit',
                    padding: selected === '3' ? '15px' : '10px',
                    marginRight: selected === '3' ? '-20px' : '0px',
                    color: selected === '3'? 'black' : 'white'
                }}
            >
                <FontAwesomeIcon icon={faBuildingUser} style={{ color: "black" ,color: selected === '3'? 'black' : 'white'}} /> Department
            </div>
            <div
                onClick={() => handleClick('4')}
                style={{
                    backgroundColor: selected === '4' ? '#ececec' : 'inherit',
                    padding: selected === '4' ? '15px' : '10px',
                    marginRight: selected === '4' ? '-20px' : '0px',
                    color: selected === '4'? 'black' : 'white'
                }}
            >
                <FontAwesomeIcon icon={faCalendar} style={{ color: "black" ,color: selected === '4'? 'black' : 'white'}} /> Workhour
            </div>
            <div
                onClick={() => handleClick('5')}
                style={{
                    backgroundColor: selected === '5' ? '#ececec' : 'inherit',
                    padding: selected === '5' ? '15px' : '10px',
                    marginRight: selected === '5' ? '-20px' : '0px',
                    color: selected === '5'? 'black' : 'white'
                }}
            >
                <FontAwesomeIcon icon={faCalendarAlt} style={{ color: "black" ,color: selected === '5'? 'black' : 'white'}} /> Workhour List
            </div>
                <div style={{ position: "absolute", bottom: "20px", left: '15%' }}>
                  <Button style={{ background: "none", border: "none", color: "white" }}>
                    <FontAwesomeIcon icon={faSignOutAlt} style={{ color: "red" }} /> Se deconnecter
                  </Button>
                </div>
                
              </Col>
            <Col>
              <div className=" mt-5" style={{maxHeight:'85vh',overflowY:'auto',minHeight:'85vh'}}>{renderContent()}</div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };
