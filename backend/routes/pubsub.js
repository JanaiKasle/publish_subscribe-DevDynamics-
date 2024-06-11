const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');

// Subscribe to a topic
router.post('/subscribe', async (req, res) => {
    try {
        const { topicId, subscriberId } = req.body;

        // Validate input data
        if (!topicId || !subscriberId) {
            return res.status(400).send('Topic ID and Subscriber ID are required');
        }

        let topic = await Topic.findOne({ topicId });
        if (!topic) {
            topic = new Topic({ topicId, subscribers: [subscriberId] });
        } else {
            if (!topic.subscribers.includes(subscriberId)) {
                topic.subscribers.push(subscriberId);
            }
        }
        await topic.save();
        res.status(200).send(`Subscriber ${subscriberId} subscribed to topic ${topicId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Notify subscribers
router.get('/notify', async (req, res) => {
    try {
        const { topicId } = req.query;

        // Validate input data
        if (!topicId) {
            return res.status(400).send('Topic ID is required');
        }

        const topic = await Topic.findOne({ topicId });
        if (topic) {
            const notifications = topic.subscribers.map(subscriberId => 
                `Notify subscriber ${subscriberId} about topic ${topicId}`
            );
            res.status(200).send(notifications);
        } else {
            res.status(404).send(`No subscribers to notify for topic ${topicId}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Unsubscribe from a topic
router.post('/unsubscribe', async (req, res) => {
    try {
        const { topicId, subscriberId } = req.body;

        // Validate input data
        if (!topicId || !subscriberId) {
            return res.status(400).send('Topic ID and Subscriber ID are required');
        }

        const topic = await Topic.findOne({ topicId });
        if (topic) {
            const index = topic.subscribers.indexOf(subscriberId);
            if (index > -1) {
                topic.subscribers.splice(index, 1);
                await topic.save();
                res.status(200).send(`Subscriber ${subscriberId} unsubscribed from topic ${topicId}`);
            } else {
                res.status(404).send(`Subscriber ${subscriberId} not found in topic ${topicId}`);
            }
        } else {
            res.status(404).send(`Topic ${topicId} does not exist`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
