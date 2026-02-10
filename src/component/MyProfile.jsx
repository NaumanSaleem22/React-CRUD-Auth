import React, { useEffect, useState } from 'react'
import { getToken, logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../services/authService';
const MyProfile = () => {

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProfile = async () => {
      const token = getToken();
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        const res = await getUserProfile(token);
        setProfile(res.data);
        setError("");
      }
      catch (err) {
        setError("Failed to load profile");
        logout();
        navigate("/login");
      }
      finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [navigate])

  return (
    <div>
      <h2>My Profile</h2>
      {loading && <p>Loading profile...</p>}
      {error && <p className="error">{error}</p>}
      {profile && (
        <div>
          <p><b>Avatar:</b> <img src={profile.avatar} alt="avatar" width="100" /></p>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
           <p><b>Role:</b> {profile.role}</p>
        </div>
      )}

    </div>
  )
}

export default MyProfile