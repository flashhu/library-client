import { useState, useEffect } from 'react'

function CountDown({ handleFail }) {
    const [counter, setCounter] = useState(60);

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        counter === 0 && handleFail()
    }, [counter, handleFail]);

    return (
        <div className="return-timer">{counter}</div>
    )
}

export default CountDown;