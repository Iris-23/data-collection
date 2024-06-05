import React, { useState } from 'react';
import styles from './UsernameInput.module.scss';

const UsernameInput = () => {
  const [username, setUsername] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <div className={styles.usernameInputContainer}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={handleChange}
      />
    </div>
  );
};

export default UsernameInput;
