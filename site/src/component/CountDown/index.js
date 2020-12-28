import { useState, useEffect } from 'react'
import './index.less'

function CountDown({ handleFail }) {
    const [counter, setCounter] = useState(60);

    useEffect(() => {
        let timeout;
        if (counter > 0) {
            timeout = setTimeout(() => setCounter(counter - 1), 1000);
        }
        counter === 0 && handleFail()
        return () => {
            clearTimeout(timeout)
        }
    }, [counter, handleFail]);

    return (
        <div className="timer">{counter}</div>
    )
}

export default CountDown;