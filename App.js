import React, { useReducer, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './index.css'; // Using the global CSS file

// --- UTILS / API (Moved from api.js) ---

const seededRandom = function (seed) {
    var m = 2 ** 35 - 31;
    var a = 185852;
    var s = seed % m;
    return function () {
        return (s = s * a % m) / m;
    };
};

const fetchAPI = function (date) {
    let result = [];
    let random = seededRandom(date.getDate());
    for (let i = 17; i <= 23; i++) {
        if (random() < 0.5) {
            result.push(i + ':00');
        }
        if (random() < 0.5) {
            result.push(i + ':30');
        }
    }
    return result;
};

const submitAPI = function (formData) {
    console.log("Form data submitted:", formData);
    return true;
};


// --- REDUCER LOGIC (Moved from BookingPage.js) ---

export const updateTimes = (state, action) => {
    switch (action.type) {
        case 'UPDATE_TIMES':
            return { ...state, times: fetchAPI(new Date(action.payload)) };
        default:
            return state;
    }
};

export const initializeTimes = () => {
    return { times: fetchAPI(new Date()) };
};


// --- REUSABLE COMPONENTS ---

const Nav = () => (
    <nav className="nav">
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/booking">Reservations</Link></li>
            <li><Link to="/order">Order Online</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    </nav>
);

const Header = () => (
    <header className="header">
        <div className="container">
            <img
                src="https://raw.githubusercontent.com/Meta-Front-End-Developer-PC/capstone/master/api/assets/logo.png"
                alt="Little Lemon logo"
                className="header-logo"
            />
            <Nav />
        </div>
    </header>
);

const Footer = () => (
    <footer className="footer">
        <div className="container">
            <p>&copy; 2025 Little Lemon. All rights reserved.</p>
        </div>
    </footer>
);

const BookingForm = ({ availableTimes, dispatch, submitForm }) => {
    const [formData, setFormData] = useState({
        date: '',
        time: availableTimes[0],
        guests: 1,
        occasion: 'Birthday',
    });
    const [errors, setErrors] = useState({});

    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setFormData({ ...formData, date: newDate });
        dispatch({ type: 'UPDATE_TIMES', payload: newDate });
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.date) newErrors.date = 'Date is required';
        if (formData.guests < 1 || formData.guests > 10) {
            newErrors.guests = 'Number of guests must be between 1 and 10';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            submitForm(formData);
        }
    };

    return (
        <div className="form-container">
            <h2>Book a Table</h2>
            <form onSubmit={handleSubmit} noValidate>
                <div className="form-field">
                    <label htmlFor="date">Choose date *</label>
                    <input type="date" id="date" value={formData.date} onChange={handleDateChange} required aria-invalid={errors.date ? 'true' : 'false'} aria-describedby="dateError" />
                    {errors.date && <p id="dateError" className="error">{errors.date}</p>}
                </div>
                <div className="form-field">
                    <label htmlFor="time">Choose time *</label>
                    <select id="time" value={formData.time} onChange={handleChange} required>
                        {availableTimes.map((time) => (<option key={time}>{time}</option>))}
                    </select>
                </div>
                <div className="form-field">
                    <label htmlFor="guests">Number of guests *</label>
                    <input type="number" placeholder="1" min="1" max="10" id="guests" value={formData.guests} onChange={handleChange} required aria-invalid={errors.guests ? 'true' : 'false'} aria-describedby="guestsError" />
                    {errors.guests && <p id="guestsError" className="error">{errors.guests}</p>}
                </div>
                <div className="form-field">
                    <label htmlFor="occasion">Occasion</label>
                    <select id="occasion" value={formData.occasion} onChange={handleChange}>
                        <option>Birthday</option>
                        <option>Anniversary</option>
                    </select>
                </div>
                <button type="submit" className="submit-btn">Make Your Reservation</button>
            </form>
        </div>
    );
};

const ConfirmedBooking = () => (
    <div className="container" style={{ textAlign: 'center', padding: '50px 0' }}>
        <h1>Booking Confirmed!</h1>
        <p>Thank you for your reservation. We look forward to seeing you at Little Lemon.</p>
    </div>
);


// --- PAGE COMPONENTS ---

const HomePage = () => (
    <div className="container" style={{ textAlign: 'center', padding: '50px 0' }}>
        <h1>Welcome to Little Lemon</h1>
        <p>Your favorite Mediterranean restaurant.</p>
        <Link to="/booking" style={{ display: 'inline-block', marginTop: '20px', padding: '15px 30px', backgroundColor: '#F4CE14', color: '#495E57', textDecoration: 'none', fontWeight: 'bold', borderRadius: '8px' }}>
            Book a Table
        </Link>
    </div>
);

const BookingPage = () => {
    const [availableTimes, dispatch] = useReducer(updateTimes, initializeTimes());
    const navigate = useNavigate();

    const submitForm = (formData) => {
        if (submitAPI(formData)) {
            navigate('/confirmed');
        }
    };

    return <BookingForm availableTimes={availableTimes.times} dispatch={dispatch} submitForm={submitForm} />;
};


// --- MAIN APP ---

function App() {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/booking" element={<BookingPage />} />
                    <Route path="/confirmed" element={<ConfirmedBooking />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;

