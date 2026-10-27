
import '../App.css';
import { useNavigate } from 'react-router-dom';
function Home() {
    const navigate=useNavigate();
  return (
    <div className="app">
      <header className="navbar">
        <a className="logo" href="#home">
          Skill<span>Swap</span>
        </a>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#how-it-works">How it works</a>
          <a href="#features">Features</a>
        </nav>

        <div className="nav-actions">
          <button className="btn btn-outline"
                  onClick={()=> navigate('/login')}> Log in</button>
          <button className="btn btn-primary"
                   onClick={()=> navigate('/register')}>Get started</button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">LEARN TOGETHER. GROW TOGETHER.</p>

            <h1>
              Your skills are valuable.
              <br />
              <span>Share them with the world.</span>
            </h1>

            <p className="hero-description">
              Connect with people who know what you want to learn,
              share what you know, and grow together through
              meaningful skill exchanges.
            </p>

            <div className="hero-actions">
  <button
    className="btn btn-primary btn-large"
    onClick={() => navigate('/register')}
  >
    Explore learners <span>→</span>
  </button>

  <button
    className="btn btn-outline btn-large"
    onClick={() =>
      document.getElementById('how-it-works')
        ?.scrollIntoView({ behavior: 'smooth' })
    }
  >
    How it works
  </button>
</div>

            <div className="hero-note">
              <span className="status-dot"></span>
              A community built around sharing knowledge
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-circle">
              <div className="visual-center">S<span>S</span></div>

              <div className="skill-card card-top">
                <span className="skill-icon purple">{"</>"}</span>
                <div>
                  <strong>Web Development</strong>
                  <small>Learn something new</small>
                </div>
              </div>

              <div className="skill-card card-left">
                <span className="skill-icon orange">Aa</span>
                <div>
                  <strong>Design</strong>
                  <small>Share your creativity</small>
                </div>
              </div>

              <div className="skill-card card-right">
                <span className="skill-icon green">Py</span>
                <div>
                  <strong>Python</strong>
                  <small>Grow your skills</small>
                </div>
              </div>

              <div className="orbit orbit-one"></div>
              <div className="orbit orbit-two"></div>
            </div>
          </div>
        </section>

        <section className="features" id="features">
          <div className="section-heading">
            <p className="eyebrow">WHY SKILLSWAP?</p>
            <h2>Learning is better together.</h2>
            <p>
              Find your people, exchange knowledge, and make
              progress one conversation at a time.
            </p>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <div className="feature-icon">⌕</div>
              <h3>Discover people</h3>
              <p>
                Find learners and mentors based on the skills
                they know and the skills you want to learn.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon">⇄</div>
              <h3>Exchange skills</h3>
              <p>
                Share your strengths while learning from
                other people in the community.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon">♡</div>
              <h3>Connect and grow</h3>
              <p>
                Start conversations, ask questions, and learn
                together at your own pace.
              </p>
            </article>
          </div>
        </section>

        <section className="how-section" id="how-it-works">
          <p className="eyebrow">GET STARTED</p>
          <h2>Your next skill starts with a connection.</h2>
          <p>
            Create your profile, discover people with skills
            you want to learn, and start a conversation.
          </p>
        </section>
      </main>

      <footer className="footer">
        <a className="logo" href="#home">
          Skill<span>Swap</span>
        </a>
        <p>Knowledge grows when it is shared.</p>
      </footer>
    </div>
  );
}

export default Home;
