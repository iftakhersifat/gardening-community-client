import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-green-100 text-green-900">
      <div className="container mx-auto px-6 py-12 md:flex md:justify-between md:items-start mt-10">
        
        {/* Contact Section */}
        <div className="mb-10 md:mb-0 max-w-sm">
          <h6 className="text-xl font-semibold mb-6 border-b border-green-300 pb-2">Contact Us</h6>
          <address className="not-italic space-y-3 text-gray-800 text-sm">
            <p>
              Email: <a href="mailto:support@gardengrow.com" className="text-green-700 hover:underline">support@gardengrow.com</a>
            </p>
            <p>
              Phone: <a href="tel:+1234567890" className="text-green-700 hover:underline">+1 234 567 890</a>
            </p>
            <p>Address: 123 Green Lane, Bloomtown, Earth</p>
          </address>
        </div>

        {/* Company Links */}
        <div className="mb-10 md:mb-0">
          <h6 className="text-xl font-semibold mb-6 border-b border-green-300 pb-2">Company</h6>
          <nav className="flex flex-col space-y-3 text-green-800 text-sm">
            <Link to="/about" className="hover:text-green-700 transition">About Us</Link>
            <Link to="/contact" className="hover:text-green-700 transition">Contact</Link>
            <Link to="/jobs" className="hover:text-green-700 transition">Jobs</Link>
            <Link to="/press-kit" className="hover:text-green-700 transition">Press Kit</Link>
          </nav>
        </div>

        {/* Social Links */}
        <div>
          <h6 className="text-xl font-semibold mb-6 border-b border-green-300 pb-2">Social</h6>
          <div className="flex space-x-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-green-700 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-green-700 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-green-700 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="text-center text-sm text-green-700 py-6 border-t border-green-300 select-none">
        &copy; 2025 Gardening Community & Resource Hub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
