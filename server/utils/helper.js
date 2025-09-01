import moment from 'moment';


const generateSlots = async () => {
    const slots = [];
    let start = moment("09:00 AM", "hh:mm A");
    const end = moment("05:00 PM", "hh:mm A");

    while (start.isBefore(end)) {
        slots.push({ time: start.format("hh:mm A"), isBooked: false });
        start = start.clone().add(30, "minutes");
    }

    return slots;
};

export { generateSlots };