const Event = require('../models/event.js');  
const allowedLocations = ['A', 'B', 'C'];

const validateTime = (time) => {
    const [hour, minute] = time.split(':').map(Number);
    return hour >= 8 && hour < 16;
};

const createEventRequest = async (req, res) => {
    try {
        const { name, description, location, time, date, student_id } = req.body;

       
        if (!name || !location || !time || !date || !student_id) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // التحقق من الموقع المسموح به
        if (!allowedLocations.includes(location)) {
            return res.status(400).json({ error: 'Invalid location. Choose a valid location.' });
        }

        // التحقق من الوقت
        if (!validateTime(time)) {
            return res.status(400).json({ error: 'Event time must be between 08:00 AM and 04:00 PM.' });
        }

        // التحقق من التاريخ
        const eventDate = new Date(date);
        const currentDate = new Date();
        if (eventDate < currentDate) {
            return res.status(400).json({ error: 'Date must not be in the past.' });
        }

        // التحقق من اليوم في الأسبوع
        const dayOfWeek = eventDate.getDay();
        if (dayOfWeek === 5 || dayOfWeek === 6) {
            return res.status(400).json({ error: 'Events cannot be scheduled on Friday or Saturday.' });
        }

        // التحقق من الوقت
        const [hours, minutes] = time.split(':').map(Number);

        // إذا كان هناك صورة مرفقة
        let imageUrl = null;
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`; 
        }

        // إنشاء حدث جديد
        const newEvent = await Event.create({
            name,  
            description,
            location,
            time,
            date,
            created_by: student_id, 
            status: 'Pending',
            image: imageUrl,  
        });
        

        res.status(201).json(newEvent);
    } catch (error) {
        console.error('Error creating event request:', error);
        res.status(500).json({ error: error.message || 'Failed to create event request.' });
    }
};



// وظيفة لمعالجة رد المسؤول
const respondToEventRequest = async (req, res) => {
    try {
        const { eventId, status, adminId, responseNotes, eventType } = req.body;

        // تحقق من إدخال الحقول المطلوبة
        if (!eventId || !status || !adminId || !eventType) {
            return res.status(400).json({ error: 'Event ID, status, admin ID, and event type are required.' });
        }

        // التحقق من حالة الطلب
        if (!['Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status. Use "Approved" or "Rejected".' });
        }

        // التحقق من نوع الحدث
        if (!['Activity', 'Community Service', 'other'].includes(eventType)) {
            return res.status(400).json({ error: 'Invalid event type. Use "Activity", "Community Service", or "other".' });
        }

        // البحث عن الحدث والتحقق من وجوده
        const event = await Event.findByPk(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found.' });
        }

        // تحديث حالة الطلب وتسجيل المسؤول
        event.status = status;
        event.responded_by = adminId;
        event.responded_at = new Date();
        event.response_notes = responseNotes || null;

        // تحديث نوع الحدث
        event.event_type = eventType;

        await event.save();

        res.status(200).json({ message: 'Event response updated successfully.', event });
    } catch (error) {
        console.error('Error responding to event request:', error);
        res.status(500).json({ error: error.message || 'Failed to respond to event request.' });
    }
};



module.exports = { createEventRequest, respondToEventRequest };
