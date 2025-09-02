import { doc, getDoc, runTransaction, setDoc } from "firebase/firestore";
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
        console.log(slotTime);
        
        const docRef = doc(db, "slots", dateId);
        await runTransaction(db, async (transaction) => {
            const docSnap = await transaction.get(docRef);

            if (!docSnap.exists()) {
                throw new Error("Slots not found for this date");
            }

            const data = docSnap.data();
            const slots = data.slots;

            const slotIndex = slots.findIndex((s) => s.time === slotTime?.time);

            if (slotIndex === -1) {
                throw new Error("Slot not found");
            }

            if (slots[slotIndex].isBooked) {
                throw new Error("Slot already booked");
            }

            slots[slotIndex].isBooked = true;
            transaction.update(docRef, { slots });
        });

        res.status(200).json({ success: true, message: "Slot booked successfully" });
    } catch (error) {
        console.error("Booking failed:", error);
        res.status(400).json({ success: false, message: error.message });
    }
};