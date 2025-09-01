import React, { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import moment from "moment";
function SlotUI({ loading, data, setSelectedSlot, selectedSlot }) {

    return (
        <Container className="mt-4">
            <Card className="p-3 shadow-sm">
                <h5 className="mb-3 text-center">Select a Slot (30 mins)</h5>
                <Row>
                    {loading && !data ? <p>Loading slots...</p> :
                        !loading && data.length > 0 ? data.map((slot, index) => (
                            <Col xs={6} md={4} lg={3} className="mb-2" key={index}>
                                <Button
                                    variant={selectedSlot === slot?.time ? "primary" : "outline-secondary"}
                                    className="w-100"
                                    onClick={() => setSelectedSlot(slot)}
                                >
                                    {slot?.time} {slot?.isBooked ? "(Booked)" : ""}
                                </Button>
                            </Col>
                        )) : <p className="text-center">No slots available</p>}
                </Row>
            </Card>
        </Container>
    );
}

export default SlotUI;
