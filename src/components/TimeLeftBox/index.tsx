import { useEffect, useState } from 'react';
import styles from './TimeLeftBox.module.scss';

interface Props {
  endDateTime: Date;
  onFinish: Function;
}

export default function TimeLeftBox({ endDateTime, onFinish }: Props) {
  const [timeLeft, setTimeLeft] = useState(endDateTime.getTime() - new Date().getTime());
  const [remainingDays, setRemainingDays] = useState('');
  const [remainingHours, setRemainingHours] = useState('');
  const [remainingMinutes, setRemainingMinutes] = useState('');
  const [remainingSeconds, setRemainingSeconds] = useState('');

  const calcRemaingTime = () => {
    setTimeLeft(endDateTime.getTime() - new Date().getTime());
    const totalSeconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    const totalMinutes = Math.floor(
      (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
    );
    const totalHours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const totalDays = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    setRemainingSeconds(
      totalSeconds.toLocaleString('pt-BR', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })
    );
    setRemainingMinutes(
      totalMinutes.toLocaleString('pt-BR', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })
    );
    setRemainingHours(
      totalHours.toLocaleString('pt-BR', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })
    );
    setRemainingDays(totalDays.toString());
  };

  useEffect(() => {
    setTimeLeft(endDateTime.getTime() - new Date().getTime());
    if (timeLeft > 0) {
      const interval = setInterval(calcRemaingTime, 1000);
      return () => clearInterval(interval);
    }
    onFinish();
  }, [endDateTime]);

  return <>
  {timeLeft > 0 &&
    <div className={styles.timeLeftBox}>
      <span className={styles.digitos}>{remainingDays}</span>
      <span className={styles.separador}>:</span>
      <span className={styles.digitos}>{remainingHours}</span>
      <span className={styles.separador}>:</span>
      <span className={styles.digitos}>{remainingMinutes}</span>
      <span className={styles.separador}>:</span>
      <span className={styles.digitos}>{remainingSeconds}</span>
    </div>
  } 
  {timeLeft < 0 &&
    <p>Cabo Galera</p>
  }
  </>
}