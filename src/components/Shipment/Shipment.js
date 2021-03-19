import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css'

const Shipment = () => {
    const [loggedInUser] = useContext(UserContext);
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);

    return (
        < form className="ship-form" onSubmit={handleSubmit(onSubmit)} >
            < input name="name" defaultValue={loggedInUser.displayName} ref={register({ required: true })} placeholder="Your Name is here" />
            { errors.name && <span className="error">Name is required</span>}
            < input name="gmail" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your Email is here" />
            { errors.gmail && <span className="error">Mail is required</span>}
            < input name="address" ref={register({ required: true })} placeholder="Your Address is here" />
            { errors.address && <span className="error">Address is required</span>}
            < input name="number" ref={register({ required: true })} placeholder="Your Number is here" />
            { errors.number && <span className="error">Number is required</span>}
            <input type="submit" />
        </form >
    );
};

export default Shipment;