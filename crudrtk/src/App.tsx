import React, { ChangeEvent, useRef, useState } from 'react';
import "./App.css";
import { Container, Row, Col, Form, Button, Table, ButtonGroup, Spinner } from "react-bootstrap";
import { useGetAllEmpQuery } from './services/allEmp.service';
import { companyData, designationData, employee } from './types/type';
import { useGetAllCmpQuery } from './services/companyData.service';
import { useGetCmpDesgQuery } from './services/cmpDesg.service';
import { useRegistrationMutation } from './services/registration.service';
import orderBy from "lodash/orderBy";

function App() {
  const [company_id, setcompany_id] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company_id: '', 
    designation_id: ''
  });
  const { data: allEmp, isLoading, isError, isSuccess, refetch } = useGetAllEmpQuery('getAllEmp');
  const { data: cmpData, isLoading: cmpLoad, isError: cmpError, isSuccess: cmpSuccess } = useGetAllCmpQuery('cmpData');
  const { data: desgData, isSuccess: desgSuccess } = useGetCmpDesgQuery(company_id,{
    skip: company_id === '', //it will skip fetching on page loading first time
  });
  const [newEmpData, responseInfo] = useRegistrationMutation();
  const regForm = useRef<HTMLFormElement>(null);
  //change company dropdown
  const handleCompany = (event: ChangeEvent<HTMLSelectElement>) => {
    setcompany_id(event.target.value);
    setFormData({
      ...formData,
      [event.target.name] : event.target.value
    })
  }

  const handleDesg = (event: ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [event.target.name] : event.target.value
    })
  }

  //store form data
  const handleForm = (event: ChangeEvent<HTMLInputElement>)=>{
    setFormData({
      ...formData,
      [event.target.name] : event.target.value
    })
  }
  //upload emp details
  const submitForm =async(event: React.MouseEvent<HTMLButtonElement>)=>{
    event.preventDefault();
    await newEmpData(formData);
    refetch();
    setFormData({
      name: '',
      email: '',
      company_id: '',
      designation_id: ''
    });
    if (regForm.current) {
      regForm.current.reset();
    }
  }
  return (
    <div>
      <Container>
        <Row>
          <Col className="border border-3 my-5 p-3 me-1">
            <h3 className="text-center my-3">Employee Registration Form</h3>
            <Form ref={regForm}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Employee Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  name='name'
                  onChange={handleForm}
                ></Form.Control>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name='email' onChange={handleForm} />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Company</Form.Label>
                <Form.Select onChange={handleCompany} name='company_id'>
                  <option value="">Select Company name</option>
                  {
                    cmpSuccess && (
                      cmpData.map((cmp: companyData) => (
                        <option key={cmp.id} value={cmp.id}>{cmp.company_name}</option>
                      )))
                  }
                </Form.Select>
              </Form.Group>
              {
                desgSuccess && (
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Designations</Form.Label>
                    <Form.Select onChange={handleDesg} name='designation_id'>
                      <option value="">Select Designations</option>
                      {
                        desgData.map((desg: designationData) => (
                          <option key={desg.id} value={desg.id}>{desg.designation}</option>
                        ))
                      }
                    </Form.Select>
                  </Form.Group>
                )
              }
              <Button variant="primary" type="submit" onClick={submitForm} className='mt-2'>
                Submit
              </Button>
            </Form>
          </Col>
          {isSuccess &&
            (
              <Col xs={8} className="border border-3 my-5 p-3 ms-1 table-responsive">
                <h3 className="text-center my-3">Employee Details Table</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>sl no</th>
                      <th>Emp Name</th>
                      <th>Emp Email</th>
                      <th>Company</th>
                      <th>Designation</th>
                      <th>operation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      allEmp.length > 0 ?
                        (orderBy(allEmp,'id').map((emp: employee) => (
                          <tr key={emp.id}>
                            <td>{emp.id}</td>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.company_name}</td>
                            <td>{emp.designation_name}</td>
                            <td>
                              <ButtonGroup>
                                <Button variant="warning" onClick={() => console.log("Edit")}>
                                  Edit
                                </Button>
                                <Button variant="danger" onClick={() => console.log("delete")}>
                                  Delete
                                </Button>
                              </ButtonGroup>
                            </td>
                          </tr>
                        ))) : (
                          <tr>
                            <td colSpan={6} className='text-center'>No Data Found</td>
                          </tr>
                        )
                    }

                  </tbody>
                </Table>
              </Col>
            )
          }
          {
            isLoading && (
              <Col xs={8} className='d-flex align-items-center justify-content-center'>
                <Spinner animation="border" variant="danger" >
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </Col>
            )
          }

        </Row>
      </Container>
    </div>
  );
}

export default App;
