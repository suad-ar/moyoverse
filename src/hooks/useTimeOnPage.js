import { useEffect } from 'react';

const useTimeOnPage = (eventName = 'time_on_page') => {
  useEffect(() => {
    const start = Date.now();

    const sendTimeSpent = () => {
      const timeSpent = Math.round((Date.now() - start) / 1000);
      if (window.plausible) {
        window.plausible(eventName, {
          props: {
            seconds: timeSpent.toString(),
          },
        });
      }
    };

    window.addEventListener('beforeunload', sendTimeSpent);
    return () => {
      sendTimeSpent();
      window.removeEventListener('beforeunload', sendTimeSpent);
    };
  }, [eventName]);
};

export default useTimeOnPage;
