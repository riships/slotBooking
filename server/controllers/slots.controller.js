import { doc, getDoc, setDoc } from "firebase/firestore";
import moment from "moment";
import { db } from "../config/getDb.js";
import { generateSlots } from "../utils/helper.js";

export const getAndAddSlot = async (req, res) => {
    try {
        const { dateId } = req.query;
        const docRef = doc(db, "slots", dateId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return res.status(200).json({ success: true, id: docRef.id, ...data });
        } else {
            const slotData = await generateSlots();
            await setDoc(docRef, { slots: slotData });
            return res.status(201).json({ success: true, id: docRef.id, slots: slotData });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const bookSlot = async (req, res) => {
    try {
        const { dateId, slotTime } = req.body;
        const docRef = doc(db, "slots", dateId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            const slot = data.slots.find(s => s.time === slotTime);

            if (slot && !slot.isBooked) {
                slot.isBooked = true;
                await setDoc(docRef, { slots: data.slots }, { merge: true });
                return res.status(200).json({ success: true, message: "Slot booked successfully." });
            } else {
                return res.status(400).json({ success: false, message: "Slot is already booked or does not exist." });
            }
        } else {
            return res.status(404).json({ success: false, message: "No slots found for this date." });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}