import React, { useEffect, useState } from "react";
import "./UserProfileComponent.css";
import { useAppDispatch } from "../store";
import { getUser, updateUser } from "../store/slices/userReducer";

const UserProfileComponent = () => {
  const dispatch = useAppDispatch();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

  useEffect(() => {
    dispatch(getUser())
      .unwrap()
      .then((response) => {
        setName(response.name)
        setPhone(response?.phone || '')
        setAddress(response?.address || '')
      })
      .catch((response) => {
        alert(`Error occured ${response.message}`);
      });
  }, [dispatch]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(updateUser({name, phone, address})).unwrap().then(() => {
        console.log('Updated successfuly');
    }).catch((response) => {
        alert(`Error occured ${response.message}`);
    });
  };

  const onPropertyChage = (callback: typeof setName | typeof setPhone | typeof setAddress) => {
    return (event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>): void => {
        callback(event.target.value);
    }
  }

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleSubmit} className="update-profile-form">
        <label htmlFor="name">
          <input value={name} onChange={onPropertyChage(setName)} type="text" placeholder="name" id="name" />
        </label>
        <label htmlFor="phone">
          <input value={phone} onChange={onPropertyChage(setPhone)} type="text" placeholder="phone" id="phone" />
        </label>
        <label htmlFor="address">
          <textarea value={address} onChange={onPropertyChage(setAddress)} id="address" placeholder="address"></textarea>
        </label>
        <button>Update Profie</button>
      </form>
    </div>
  );
};

export default UserProfileComponent;
