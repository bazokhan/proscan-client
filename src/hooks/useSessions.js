import { useState, useEffect } from 'react';

const useSessions = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setSessions([
        { name: 'Session1', id: '123' },
        { name: 'Session2', id: '1234' },
        { name: 'Session3', id: '12345' },
        { name: 'Session1', id: '1236' },
        { name: 'Session2', id: '12347' },
        { name: 'Session3', id: '123455' },
        { name: 'Session1', id: '123232', publicId: 'hello', active: true },
        { name: 'Session2', id: '12341221', publicId: 'hithere' },
        { name: 'Session3', id: '1233245', publicId: 'nope' }
      ]);
    }, 700);
  }, []);
  return [sessions];
};

export { useSessions };
