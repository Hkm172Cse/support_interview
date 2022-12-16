import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import './List.css';
const List = () => {
    // Modal states
    const [show, setShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [modalData, setModalData] = useState([]);

    // Api states
    const [clientData, setClientData] = useState([]);
    const [rerender, setRerender] = useState(true);
    console.log(clientData);

    //Modal Methods
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const editModalClose = () => setEditShow(false);
    const editModalShow = () => setEditShow(true);

    //Api Methods


    // INSERT METHOD
    const addDataHandler = e => {
        e.preventDefault();
        const form = e.target;
        const id = form.id.value;
        const title = form.title.value;
        const address = form.address.value;
        const sub = form.sub.value;
        const state = form.state.value;
        const zip = form.zip.value;
        const let_value = form.let_value.value;
        const long_value = form.Long_value.value;

        const data = { id, title, address, sub, state, zip, let_value, long_value };
        fetch('https://suprem-interview.vercel.app/add_data', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(data => {
                handleClose();
                setRerender(!rerender);
                console.log(data);
                toast.success('Data Insert Successfully');
            })

        console.log(data);
    }


    // DELETE METHOD
    const deleteHander = d => {
        console.log(d._id);

        fetch(`https://suprem-interview.vercel.app/delete_data/${d._id}`, {
            method: 'DELETE',
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount == 1) {
                    const remaindData = clientData.filter(clien_d => clien_d._id !== d._id);
                    setClientData(remaindData);
                    toast.success('Data Delete Successfully');
                }
            });
    }


    // UPDATE METHOD
    const updateHandler = update => {
        fetch(`https://suprem-interview.vercel.app/getforedit/${update._id}`)
            .then(res => res.json())
            .then(data => {
                setModalData(data);
                console.log(data);
                editModalShow();
            });


    }


    // SUBMIT HANDLER FOR UPDATE
    const updatedDataHander = e => {
        e.preventDefault();

        const form = e.target;

        const editId = form.edit_id.value;
        const id = form.id.value;
        const title = form.title.value;
        const address = form.address.value;
        const sub = form.sub.value;
        const state = form.state.value;
        const zip = form.zip.value;
        const let_value = form.let_value.value;
        const long_value = form.Long_value.value;

        const updateData = { id, title, address, sub, state, zip, let_value, long_value };

        fetch(`https://suprem-interview.vercel.app/updateInfo/${editId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updateData)
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged == true) {
                    editModalClose();
                    toast.success('Data Update Successfully');
                    setRerender(!rerender);

                }
            })

    }

    // GET DATA METHOD
    useEffect(() => {
        fetch('https://suprem-interview.vercel.app/get_data').then(res => res.json()).then(data => setClientData(data));
    }, [rerender]);

    return (
        <div>
            <Container className="add-btn">
                <Button onClick={handleShow}>Add New Record</Button>
            </Container>

            <Container>
                <div className="mt-3">
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Sl</th>
                                <th>Id</th>
                                <th>Title</th>
                                <th>Address</th>
                                <th>Suburb</th>
                                <th>state</th>
                                <th>zip</th>
                                <th>lat</th>
                                <th>Long</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                clientData.map((data, i) => {
                                    return (
                                        <tr>
                                            <td>{++i}</td>
                                            <td>{data.id}</td>
                                            <td>{data.title}</td>
                                            <td>{data.address}</td>
                                            <td>{data.sub}</td>
                                            <td>{data.state}</td>
                                            <td>{data.zip}</td>
                                            <td>{data.let_value}</td>
                                            <td>{data.long_value}</td>
                                            <td>
                                                <button onClick={() => deleteHander(data)} className="btn btn-sm btn-danger">D</button>
                                                ||
                                                <button onClick={() => updateHandler(data)} className='btn btn-sm btn-primary'>Edit</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }


                        </tbody>
                    </Table>
                </div>
            </Container>


            <div className='Modal_div'>
                <>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>New Insert Data</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={addDataHandler}>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Id</Form.Label>
                                            <Form.Control type="text" name="id" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control type="text" name="title" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control type="text" name="address" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Suburb</Form.Label>
                                            <Form.Control type="text" name="sub" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>State</Form.Label>
                                            <Form.Control type="text" name="state" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>zip</Form.Label>
                                            <Form.Control type="text" name="zip" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Lat</Form.Label>
                                            <Form.Control type="text" name="let_value" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Long</Form.Label>
                                            <Form.Control type="text" name="Long_value" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </>

            </div>

            <div className="editModal">
                <>

                    <Modal show={editShow} onHide={editModalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Information</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={updatedDataHander}>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-1" controlId="formBasicEmail">
                                            <Form.Label>Id</Form.Label>
                                            <Form.Control type="text" name="id" defaultValue={modalData.id} />
                                            <Form.Control type="hidden" name="edit_id" defaultValue={modalData._id} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-1" controlId="formBasicPassword">
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control type="text" name="title" defaultValue={modalData.title} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-1" controlId="formBasicEmail">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control type="text" name="address" defaultValue={modalData.address} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-1" controlId="formBasicPassword">
                                            <Form.Label>Suburb</Form.Label>
                                            <Form.Control type="text" name="sub" defaultValue={modalData.sub} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-1" controlId="formBasicEmail">
                                            <Form.Label>State</Form.Label>
                                            <Form.Control type="text" name="state" defaultValue={modalData.state} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-1" controlId="formBasicPassword">
                                            <Form.Label>zip</Form.Label>
                                            <Form.Control type="text" name="zip" defaultValue={modalData.zip} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-1" controlId="formBasicEmail">
                                            <Form.Label>Lat</Form.Label>
                                            <Form.Control type="text" name="let_value" defaultValue={modalData.let_value} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-1" controlId="formBasicPassword">
                                            <Form.Label>Long</Form.Label>
                                            <Form.Control type="text" name="Long_value" defaultValue={modalData.long_value} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={editModalClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            </div>
            <Toaster />
        </div>
    )
}

export default List; 