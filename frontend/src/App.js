import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [topicId, setTopicId] = useState('');
    const [subscriberId, setSubscriberId] = useState('');
    const [notifications, setNotifications] = useState([]);

    const subscribe = async () => {
        const response = await axios.post('http://localhost:3000/api/subscribe', {
            topicId, subscriberId
        });
        alert(response.data);
    };

    const notify = async () => {
        const response = await axios.get('http://localhost:3000/api/notify', {
            params: { topicId }
        });
        setNotifications(response.data);
    };

    const unsubscribe = async () => {
        const response = await axios.post('http://localhost:3000/api/unsubscribe', {
            topicId, subscriberId
        });
        alert(response.data);
    };

    return (
        <div className="App">
            <h1>PubSub System</h1>
            <div>
                <input 
                    type="text" 
                    placeholder="Topic ID" 
                    value={topicId} 
                    onChange={e => setTopicId(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="Subscriber ID" 
                    value={subscriberId} 
                    onChange={e => setSubscriberId(e.target.value)} 
                />
                <button onClick={subscribe}>Subscribe</button>
                <button onClick={notify}>Notify</button>
                <button onClick={unsubscribe}>Unsubscribe</button>
            </div>
            <div>
                <h2>Notifications</h2>
                <ul>
                    {notifications.map((note, index) => (
                        <li key={index}>{note}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
