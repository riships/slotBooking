import React, { useEffect, useState } from 'react'
import { Card, Container } from 'react-bootstrap'
import CustomCalender from '../components/CustomCalender'
import SlotUI from '../components/SlotUI'
import moment from 'moment';
import axios from 'axios';
import { toast } from 'react-toastify';

function Home() {
    const [date, setDate] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [booking, setBooking] = useState(false);
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
            toast.error(error.message);
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


    async function confirmSlotBooking() {
        try {
            setBooking(true);
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/slots`, { dateId: moment(date).format("DD-MM-YYYY"), slotTime: selectedSlot });
            if (data.success) {
                toast.success(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.error(error);
        } finally {
            setBooking(false)
            fetchSlots(date);
        }
    }

    return (
        <Container className="my-4">
            <Card className="p-3">
                <div className="d-flex flex-wrap align-items-start justify-content-center gap-4">
                    <div className="flex-grow-1 d-flex flex-column align-items-center">
                        <CustomCalender date={date} setDate={setDate} />
                        {date && !date?.isBooked && (
                            <p className="text-center mt-2">
                                Selected Date:{" "}
                                <strong>{moment(date).format("DD MMMM YYYY")}</strong>
                            </p>
                        )}
                    </div>
                    <div className="flex-grow-1 d-flex justify-content-center">
                        <SlotUI
                            bookSlotFunction={confirmSlotBooking}
                            booking={booking}
                            loading={loading}
                            data={slots}
                            selectedSlot={selectedSlot}
                            setSelectedSlot={setSelectedSlot}
                        />
                    </div>
                </div>
            </Card>
        </Container>
    )
}

export default Home