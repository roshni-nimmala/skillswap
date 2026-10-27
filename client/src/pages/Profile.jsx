
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getMyProfile, updateMyProfile } from '../services/api';
import '../App.css';

function Profile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: '',
    learnSkills: '',
    bio: '',
    qualification: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProfile() {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const data = await getMyProfile(token);
        const user = data.user;

        setFormData({
          name: user.name || '',
          email: user.email || '',
          skills: (user.skills || []).join(', '),
          learnSkills: (user.learnSkills || []).join(', '),
          bio: user.bio || '',
          qualification: user.qualification || '',
        });
      } catch (err) {
        setError(err.message || 'Could not load your profile.');
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [navigate]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('token');

      const updatedUser = await updateMyProfile(token, {
        name: formData.name.trim(),
        skills: formData.skills.split(',')
          .map((skill) => skill.trim())
          .filter(Boolean),
        learnSkills: formData.learnSkills.split(',')
          .map((skill) => skill.trim())
          .filter(Boolean),
        bio: formData.bio.trim(),
        qualification: formData.qualification.trim(),
      });

      const user = updatedUser.user;

      localStorage.setItem('user', JSON.stringify({
        ...JSON.parse(localStorage.getItem('user') || '{}'),
        id: user._id || user.id,
        name: user.name,
        email: user.email,
      }));

      setMessage('Profile updated successfully!');
    } catch (err) {
      setError(err.message || 'Could not update your profile.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <main className="profile-main"><p>Loading profile...</p></main>;
  }

  return (
    <div className="profile-page">
      

      <main className="profile-main">
        <p className="eyebrow">ACCOUNT SETTINGS</p>
        <h1>My profile</h1>
        <p className="profile-intro">
          Keep your skills and information up to date so other
          learners can find you.
        </p>

        <form className="profile-form" onSubmit={handleSubmit}>
          <label htmlFor="profile-name">Full name</label>
          <input
            id="profile-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="profile-email">Email address</label>
          <input
            id="profile-email"
            type="email"
            value={formData.email}
            readOnly
          />

          <label htmlFor="profile-skills">Skills I can teach</label>
          <input
            id="profile-skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Java, React, Python"
          />

          <label htmlFor="profile-learn">Skills I want to learn</label>
          <input
            id="profile-learn"
            name="learnSkills"
            value={formData.learnSkills}
            onChange={handleChange}
            placeholder="MongoDB, UI/UX"
          />

          <label htmlFor="profile-qualification">Qualification</label>
          <input
            id="profile-qualification"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            placeholder="e.g. B.Tech Computer Science"
          />

          <label htmlFor="profile-bio">About me</label>
          <textarea
            id="profile-bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            placeholder="Tell the community about yourself"
          />

          {message && <p className="profile-success">{message}</p>}
          {error && <p className="profile-error" role="alert">{error}</p>}

          <button type="submit" disabled={saving}>
  {saving ? 'Saving...' : 'Save changes'}
</button>
        </form>
      </main>
    </div>
  );
}

export default Profile;
