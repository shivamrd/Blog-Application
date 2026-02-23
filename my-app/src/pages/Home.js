import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container">
      {/* Top Auth Buttons */}
      <div className="auth-buttons">
        <Link to="/signin" className="btn login-btn">Login</Link>
        <Link to="/signup" className="btn signup-btn">Sign Up</Link>
      </div>

      {/* Center Card */}
      <div className="center-card">
        <h1 className="title">Blog Platform</h1>
        <p className="tagline">A sleek, professional space to share ideas, insights, and stories globally.</p>

        <div className="cta-buttons">
          <Link to="/signup" className="btn signup-btn">Get Started</Link>
          <Link to="/signin" className="btn login-btn-outline">Learn More</Link>
        </div>

        <div className="scrolling-text-wrapper">
          <div className="scrolling-text">
            Empower ideas • Share insights • Grow your network • Inspire others • Connect globally •
          </div>
        </div>
      </div>

      {/* Background Particles */}
      <div className="particles"></div>

      <style>{`
        /* Reset */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body, #root { height: 100%; width: 100%; }
        body { font-family: 'Inter', sans-serif; }

        .home-container {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #2c2f7f, #1c1c2b, #000);
          color: #fff;
          overflow: hidden;
        }

        /* Floating Particles */
        .particles {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.3), transparent 60%),
                      radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.3), transparent 60%),
                      radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.2), transparent 70%);
          animation: move-bg 30s linear infinite alternate;
        }

        @keyframes move-bg {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(100px, -50px) rotate(15deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }

        /* Auth Buttons */
        .auth-buttons {
          position: absolute;
          top: 20px;
          left: 20px;
          display: flex;
          gap: 12px;
          z-index: 2;
        }

        .btn {
          padding: 10px 20px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 16px;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .login-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff;
        }

        .login-btn:hover { background: rgba(255, 255, 255, 0.2); }
        .signup-btn { background: #6366f1; color: #fff; }
        .signup-btn:hover { background: #4f46e5; }
        .login-btn-outline {
          border: 1px solid rgba(255,255,255,0.2);
          background: transparent; color: #fff;
        }
        .login-btn-outline:hover { background: rgba(255,255,255,0.1); }

        /* Center Card */
        .center-card {
          position: relative;
          z-index: 2;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 32px;
          padding: 60px 40px;
          width: 90%;
          max-width: 520px;
          text-align: center;
          box-shadow: 0 20px 80px rgba(0,0,0,0.6);
        }

        .title {
          font-size: 2.75rem;
          font-weight: 800;
          margin-bottom: 16px;
        }

        .tagline {
          font-size: 1.15rem;
          color: #ccc;
          margin-bottom: 36px;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 18px;
          margin-bottom: 28px;
        }

        .btn.signup-btn, .btn.login-btn-outline {
          padding: 14px 30px;
          border-radius: 18px;
          font-size: 1rem;
          font-weight: 600;
        }

        .btn.signup-btn:hover, .btn.login-btn-outline:hover {
          transform: translateY(-3px) scale(1.05);
        }

        /* Scrolling Text */
        .scrolling-text-wrapper {
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 12px;
        }

        .scrolling-text {
          display: inline-block;
          white-space: nowrap;
          color: #818cf8;
          animation: scroll-left 20s linear infinite;
        }

        @keyframes scroll-left {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }

        /* Responsive */
        @media (max-width: 600px) {
          .title { font-size: 2rem; }
          .tagline { font-size: 1rem; }
          .cta-buttons { flex-direction: column; gap: 12px; }
        }
      `}</style>
    </div>
  );
}
