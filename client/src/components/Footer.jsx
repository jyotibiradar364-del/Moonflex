export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-links">
                    <a href="#">FAQ</a>
                    <a href="#">Help Center</a>
                    <a href="#">Account</a>
                    <a href="#">Media Center</a>
                    <a href="#">Investor Relations</a>
                    <a href="#">Jobs</a>
                    <a href="#">Privacy</a>
                    <a href="#">Terms of Use</a>
                    <a href="#">Cookie Preferences</a>
                    <a href="#">Corporate Information</a>
                    <a href="#">Contact Us</a>
                    <a href="#">Speed Test</a>
                </div>
                <div className="footer-bottom">
                    &copy; {new Date().getFullYear()} <span className="footer-brand">Moonflex</span>. All rights reserved. A Netflix-inspired demo project.
                </div>
            </div>
        </footer>
    );
}
