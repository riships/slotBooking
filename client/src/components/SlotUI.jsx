import { Container, Button, Spinner } from "react-bootstrap";
function SlotUI({ loading, data, setSelectedSlot, selectedSlot, bookSlotFunction, booking }) {

    return (
        <Container className="mt-4">
            <h5 className="mb-3 text-center">Select a Slot (30 mins)</h5>
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : data && data.length > 0 ? (
                <ul className="list-group d-flex flex-column gap-2 list-unstyled overflow-auto" style={{ maxHeight: "300px" }}>{
                    data.map((slot, index) => (
                        <li key={slot?.time}>
                            <Button
                                variant={
                                    slot?.isBooked
                                        ? "danger"
                                        : selectedSlot?.time === slot?.time
                                            ? "primary"
                                            : "success"
                                }
                                className="w-100 d-flex justify-content-between align-items-center gap-3"
                                disabled={slot?.isBooked}
                                onClick={() => setSelectedSlot(slot)}
                            >
                                {slot?.time} {slot?.isBooked ? <small>(Booked)</small> : <small>(Available)</small>}
                            </Button>
                        </li>))
                }
                </ul>
            ) : (
                <p className="text-center">No slots available</p>
            )}
            {
                selectedSlot && !selectedSlot?.isBooked && (
                    <p className="text-center mt-2">
                        Selected Slot: <strong>{selectedSlot?.time}</strong>
                    </p>
                )
            }
            <div className="d-flex justify-content-center mt-3">
                <Button
                    variant="primary"
                    disabled={!selectedSlot || selectedSlot?.isBooked || booking}
                    onClick={() => bookSlotFunction()}
                >
                    {booking ? (
                        <>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />{" "}
                            Booking...
                        </>
                    ) : (
                        "Book Now"
                    )}
                </Button>
            </div>
        </Container>
    );
}

export default SlotUI;
