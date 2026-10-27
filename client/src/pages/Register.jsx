
import { useState } from 'react';
import '../App.css';
import { registerUser } from '../services/api';
function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    skills: '',
    learnSkills: '',
    bio: '',
    qualification: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }


async function handleSubmit(event) {
  event.preventDefault();

  const userData = {
    ...formData,
    name: formData.name.trim(),
    email: formData.email.trim().toLowerCase(),

    skills: formData.skills
      .split(',')
      .map((skill) => skill.trim())
      .filter((skill) => skill !== ''),

    learnSkills: formData.learnSkills
      .split(',')
      .map((skill) => skill.trim())
      .filter((skill) => skill !== ''),
  };

  try {
    const data = await registerUser(userData);

    alert(data.message || 'Registration successful!');

    console.log('Registered user:', data.user);
  } catch (error) {
    alert(error.message);
  }
}

  return (
    <div className="auth-page">
      <div className="auth-card">
        <a className="logo" href="/">
          Skill<span>Swap</span>
        </a>

        <h1>Create your account</h1>
        <p className="auth-description">
          Share what you know. Learn what you love.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            minLength={8}
            required
          />

          <label htmlFor="skills">Skills you can teach</label>
          <input
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Java, React, Python"
            required
          />

          <label htmlFor="learnSkills">Skills you want to learn</label>
          <input
            id="learnSkills"
            name="learnSkills"
            value={formData.learnSkills}
            onChange={handleChange}
            placeholder="MongoDB, UI/UX design"
            required
          />

          <label htmlFor="bio">About you (optional)</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell others a little about yourself"
            rows={3}
          />

          <label htmlFor="qualification">
            Qualification (optional)
          </label>
          <input
            id="qualification"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            placeholder="e.g. B.Tech Computer Science"
          />

          <button
            type="submit"
            className="btn btn-primary auth-submit"
          >
            Create account
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
