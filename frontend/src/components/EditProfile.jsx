import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { BASE_URL, DEFAULT_PHOTO_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';

const EditProfile = () => {
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState(user?.firstName || '');
    const [lastName, setLastName] = useState(user?.lastName || '');
    const [age, setAge] = useState(user?.age || '');
    const [gender, setGender] = useState(user?.gender || '');
    const [about, setAbout] = useState(user?.about || '');
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || '');
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});
    const [showToast, setShowToast] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [skills, setSkills] = useState(user?.skills || []); 
    const [skillInput, setSkillInput] = useState('');
    useEffect(() => {
        if (!user) navigate('/login');
    }, [user, navigate]);

    if (!user) return null;

    const validateField = (name, value) => {
        const newErrors = { ...errors };
        if (name === 'firstName' && value.trim().length > 20) newErrors.firstName = 'Too long';
        else if (name === 'firstName') delete newErrors.firstName;

        if (name === 'age') {
            const ageNum = parseInt(value, 10);
            if (value && (isNaN(ageNum) || ageNum < 18)) newErrors.age = 'Must be 18+';
            else delete newErrors.age;
        }

        if (name === 'photoUrl') {
            if (value?.trim()) {
                try { new URL(value.trim()); delete newErrors.photoUrl; } 
                catch { newErrors.photoUrl = 'Invalid URL'; }
            } else { delete newErrors.photoUrl; }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const stateMap = { firstName: setFirstName, lastName: setLastName, age: setAge, gender: setGender, about: setAbout, photoUrl: setPhotoUrl };
        if (stateMap[name]) stateMap[name](value);
        if (error) setError('');
        validateField(name, value);
    };

    const saveProfile = async () => {
        setError('');
        setIsLoading(true);
        try {
            const updateData = {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                about: about.trim(),
                photoUrl: photoUrl.trim(),
                gender: gender.trim().toLowerCase(),
                age: age ? parseInt(age, 10) : undefined,
                skills: skills
            };

            const res = await axios.patch(`${BASE_URL}/profile/edit`, updateData, { withCredentials: true });
            dispatch(addUser(res?.data?.user || res?.data));
            setShowToast(true);
            setTimeout(() => { setShowToast(false); navigate('/profile'); }, 2000);
        } catch (err) {
            setError(err.response?.data || 'Update failed');
        } finally {
            setIsLoading(false);
        }
    };

    // Helper for input classes
    const getInputClass = (fieldName) => `
        input input-bordered w-full transition-all duration-300 bg-base-100
        ${errors[fieldName] ? 'border-error ring-1 ring-error' : 'border-base-300 focus:border-primary focus:ring-1 focus:ring-primary'}
    `;

    const addSkill = (e) => {
      e.preventDefault();
      const trimmedSkill = skillInput.trim();
      if (trimmedSkill && !skills.includes(trimmedSkill) && skills.length < 10) {
        setSkills([...skills, trimmedSkill]);
        setSkillInput('');
      }
     };

    const removeSkill = (skillToRemove) => {
       setSkills(skills.filter(skill => skill !== skillToRemove));
     };

    return (
        <div className="min-h-screen bg-base-200/50 py-12 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                
                {/* Header with Glass Effect */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-4xl font-black text-base-content tracking-tight">Profile Settings</h1>
                        <p className="text-base-content/60 mt-1">Manage your public presence and account details</p>
                    </div>
                    <button className="btn btn-outline btn-sm rounded-full px-6" onClick={() => navigate('/profile')}>
                        Back to Profile
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* Left: Preview Card (4 Cols) */}
                    <div className="lg:col-span-4">
                        <div className="card bg-base-100 shadow-2xl border border-base-300 sticky top-10 overflow-hidden">
                            <div className="h-24 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
                            <div className="card-body -mt-12 items-center text-center">
                                <div className="avatar mb-4">
                                    <div className="w-32 rounded-3xl ring ring-primary ring-offset-base-100 ring-offset-4 shadow-2xl">
                                        <img 
                                            src={photoUrl || DEFAULT_PHOTO_URL} 
                                            alt="Preview" 
                                            onError={(e) => { e.target.src = DEFAULT_PHOTO_URL; }}
                                        />
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold">{firstName || 'First'} {lastName || 'Last'}</h2>
                                <span className="badge badge-primary badge-outline font-medium px-4 py-3 capitalize">
                                    {gender || 'Not Specified'} • {age || '??'}
                                </span>
                                <div className="divider opacity-50"></div>
                                <div className="w-full text-left">
                                    <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-2">About Me</p>
                                    <p className="text-sm leading-relaxed opacity-80 min-h-[60px]">
                                        {about || "Write a short bio to let others know who you are..."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form (8 Cols) */}
                    <div className="lg:col-span-8">
                        <div className="card bg-base-100 shadow-xl border border-base-300">
                            <div className="card-body p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    
                                    {/* First Name */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-bold text-base-content/70">First Name</span>
                                        </label>
                                        <input 
                                            name="firstName" 
                                            value={firstName} 
                                            onChange={handleInputChange} 
                                            placeholder="Aarav"
                                            className={getInputClass('firstName')} 
                                        />
                                        {errors.firstName && <span className="text-error text-xs mt-1">{errors.firstName}</span>}
                                    </div>

                                    {/* Last Name */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-bold text-base-content/70">Last Name</span>
                                        </label>
                                        <input 
                                            name="lastName" 
                                            value={lastName} 
                                            onChange={handleInputChange} 
                                            placeholder="Kumar"
                                            className={getInputClass('lastName')} 
                                        />
                                    </div>

                                    {/* Age */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-bold text-base-content/70">Age</span>
                                        </label>
                                        <input 
                                            type="number" 
                                            name="age" 
                                            value={age} 
                                            onChange={handleInputChange} 
                                            className={getInputClass('age')} 
                                        />
                                        {errors.age && <span className="text-error text-xs mt-1">{errors.age}</span>}
                                    </div>

                                    {/* Gender */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-bold text-base-content/70">Gender</span>
                                        </label>
                                        <select 
                                            name="gender" 
                                            value={gender} 
                                            onChange={handleInputChange} 
                                            className={`select select-bordered transition-all focus:border-primary focus:ring-1 focus:ring-primary ${gender ? 'text-base-content' : 'text-base-content/40'}`}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    {/* Photo URL */}
                                    <div className="form-control md:col-span-2">
                                        <label className="label">
                                            <span className="label-text font-bold text-base-content/70">Profile Photo URL</span>
                                        </label>
                                        <input 
                                            name="photoUrl" 
                                            value={photoUrl} 
                                            onChange={handleInputChange} 
                                            placeholder="https://example.com/photo.jpg"
                                            className={getInputClass('photoUrl')} 
                                        />
                                        {errors.photoUrl && <span className="text-error text-xs mt-1">{errors.photoUrl}</span>}
                                    </div>

        {/* --- Tech Stack Section --- */}
<div className="form-control md:col-span-2">
    <label className="label">
        <span className="label-text font-bold text-base-content/70">Tech Stack</span>
        <span className="label-text-alt">{skills.length}/10</span>
    </label>
    
    <div className="flex gap-2 mb-3">
        <input 
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addSkill(e)} // Allows Enter to add
            placeholder="e.g. React, NodeJS, MongoDB"
            className="input input-bordered flex-1 focus:border-primary"
        />
        <button type="button" className="btn btn-primary" onClick={addSkill}>Add</button>
    </div>
    
    {/* Visual Tags Display */}
    <div className="flex flex-wrap gap-2 p-3 bg-base-200/50 rounded-2xl min-h-[60px] border border-base-300">
        {skills.map((skill, index) => (
            <div key={index} className="badge badge-lg py-4 pl-4 pr-1 gap-2 font-bold bg-base-100 border-primary/20 text-primary">
                {skill}
                <button 
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="btn btn-ghost btn-xs btn-circle hover:bg-error hover:text-white"
                >
                    ✕
                </button>
            </div>
        ))}
        {skills.length === 0 && <p className="text-sm opacity-40 p-2">No skills added yet...</p>}
    </div>
</div>

                                    {/* About */}
                                    <div className="form-control md:col-span-2">
                                        <label className="label">
                                            <span className="label-text font-bold text-base-content/70">Bio / About</span>
                                        </label>
                                        <textarea 
                                            name="about" 
                                            value={about} 
                                            onChange={handleInputChange} 
                                            placeholder="Tell us a bit about yourself..."
                                            className="textarea textarea-bordered h-32 focus:border-primary focus:ring-1 focus:ring-primary transition-all text-base"
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="alert alert-error mt-6 shadow-md border-none rounded-xl text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <span>{error}</span>
                                    </div>
                                )}

                                <div className="flex justify-end gap-4 mt-10">
                                    <button 
                                        className="btn btn-ghost px-8"
                                        onClick={() => navigate('/profile')}
                                    >
                                        Discard
                                    </button>
                                    <button 
                                        className={`btn btn-primary px-12 rounded-xl shadow-lg shadow-primary/30 ${isLoading ? 'loading' : ''}`} 
                                        onClick={saveProfile}
                                        disabled={isLoading || Object.keys(errors).length > 0}
                                    >
                                        {isLoading ? 'Updating...' : 'Save Changes'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Toast */}
            {showToast && (
                <div className="toast toast-bottom toast-center z-50">
                    <div className="alert alert-success shadow-2xl border-none text-white px-8 py-4 rounded-2xl animate-bounce">
                        <span className="font-bold flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            Profile Saved Successfully!
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProfile;