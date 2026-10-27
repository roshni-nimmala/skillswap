
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUsers, getSkillMatches } from '../services/api';
import '../App.css';

function Dashboard() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [searchSkill, setSearchSkill] = useState('');
  const [showMatches, setShowMatches] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const currentUser = JSON.parse(
    localStorage.getItem('user') || 'null'
  );

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    loadUsers();
  }, []);

  async function loadUsers(skill = '') {
    setLoading(true);
    setError('');

    try {
      const data = showMatches
        ? await getSkillMatches(token)
        : await getUsers(token, skill);

      const userList = Array.isArray(data)
        ? data
        : data.users || data.matches || [];

      setUsers(userList);
    } catch (err) {
      setError(err.message || 'Could not load users.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(event) {
    event.preventDefault();
    setShowMatches(false);
    setLoading(true);
    setError('');

    try {
      const data = await getUsers(token, searchSkill.trim());

      const userList = Array.isArray(data)
        ? data
        : data.users || data.matches || [];

      setUsers(userList);
    } catch (err) {
      setError(err.message || 'Search failed.');
    } finally {
      setLoading(false);
    }
  }

  async function handleMatches() {
    setShowMatches(true);
    setLoading(true);
    setError('');

    try {
      const data = await getSkillMatches(token);

      const matchList = Array.isArray(data)
        ? data
        : data.matches || data.users || [];

      setUsers(matchList);
    } catch (err) {
      setError(err.message || 'Could not load matches.');
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <div className="dashboard-page">
      <header className="dashboard-navbar">
        <Link className="logo" to="/">
          Skill<span>Swap</span>
        </Link>

        <div className="dashboard-actions">
          <span className="welcome-user">
            Hi, {currentUser?.name || 'Learner'}!
          </span>

          <button
            className="btn btn-outline"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="dashboard-heading">
          <p className="eyebrow">YOUR LEARNING COMMUNITY</p>
          <h1>Discover your next skill partner.</h1>
          <p>
            Find people who know what you want to learn
            and share the skills you already have.
          </p>
        </section>

        <section className="dashboard-search">
          <form onSubmit={handleSearch}>
            <input
              value={searchSkill}
              onChange={(event) =>
                setSearchSkill(event.target.value)
              }
              placeholder="Search by skill, e.g. Java or React"
              aria-label="Search by skill"
            />

            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </form>

          <button
            className="btn btn-outline"
            onClick={handleMatches}
          >
            Find my skill matches
          </button>

          <button
            className="btn btn-outline"
            onClick={() => {
              setSearchSkill('');
              setShowMatches(false);
              loadUsers('');
            }}
          >
            All learners
          </button>
        </section>

        <section className="learner-section">
          <h2>
            {showMatches ? 'Your skill matches' : 'Explore learners'}
          </h2>

          {loading && <p>Loading learners...</p>}

          {!loading && error && (
            <p role="alert" className="dashboard-error">
              {error}
            </p>
          )}

          {!loading && !error && users.length === 0 && (
            <p>
              No learners found yet. Try another skill or
              check back when more people join SkillSwap.
            </p>
          )}

          {!loading && !error && users.length > 0 && (
            <div className="learner-grid">
              {users.map((user) => (
                <article
                  className="learner-card"
                  key={user._id || user.id}
                >
                  <div className="learner-avatar">
                    {(user.name || '?').charAt(0).toUpperCase()}
                  </div>

                  <h3>{user.name}</h3>
                  <p className="learner-qualification">
                    {user.qualification || 'SkillSwap member'}
                  </p>

                  <div className="learner-skills">
                    <strong>Can teach</strong>
                    <div className="skill-tags">
                      {(user.skills || []).map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div className="learner-skills">
                    <strong>Wants to learn</strong>
                    <div className="skill-tags">
                      {(user.learnSkills || []).map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>
                  </div>

                  {user.bio && (
                    <p className="learner-bio">{user.bio}</p>
                  )}

                  {user.matchedSkills && (
                    <div className="learner-skills">
                      <strong>Matching skills</strong>
                      <div className="skill-tags">
                        {user.matchedSkills.map((skill) => (
                          <span key={skill}>{skill}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
