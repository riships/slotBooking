import React, { use, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import CustomCalender from '../components/CustomCalender'
import SlotUI from '../components/SlotUI'
import moment from 'moment';
import axios from 'axios';

function Home() {
    const [date, setDate] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    async function fetchSlots(date) {
        const formattedDate = moment(date).format("DD-MM-YYYY");
        try {
            setLoading(true);
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/slots?dateId=${formattedDate}`);
            if (data.success) {
                setSlots(data.slots);
            } else {
                setSlots([]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (date) {
            fetchSlots(date);
        }
    }, [date]);

    useEffect(() => {
        if (date) {
            fetchSlots(date);
        }
    }, [date]);

    return (
        <Container>
            <Row className="mt-4">
                <Col xs={12} md={6}>
                    <CustomCalender date={date} setDate={setDate} />
                </Col>
                <Col xs={12} md={6}>
                    <SlotUI loading={loading} data={slots} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
                </Col>
            </Row>
        </Container>
    )
}

export default Home