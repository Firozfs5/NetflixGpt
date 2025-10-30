import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
const NetflixFooter = () => {
  const footerLinks = {
    Company: ["About", "Jobs", "Contact", "Advertise"],
    Legal: [
      "Terms of Use",
      "Privacy Policy",
      "Cookie Preferences",
      "Corporate Information",
    ],
    Support: ["FAQ", "Help Center", "Account", "Media Center"],
    "Streaming Services": [
      "Netflix Originals",
      "TV Shows",
      "Movies",
      "Documentaries",
    ],
  };

  const socialLinks = [
    { name: "Facebook", icon: <FaFacebook /> },
    { name: "Instagram", icon: <FaInstagram /> },
    { name: "Twitter", icon: <FaTwitter /> },
    { name: "YouTube", icon: <FaYoutube /> },
  ];

  return (
    <footer className="bg-black text-gray-400 py-12 px-4 md:px-8 lg:px-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Social Links */}
        <div className="flex space-x-6 mb-8">
          {socialLinks.map((social) => (
            <button
              key={social.name}
              className="text-3xl hover:text-white transition-colors duration-200"
              aria-label={social.name}
            >
              {social.icon}
            </button>
          ))}
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm hover:text-white transition-colors duration-200 hover:underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Service Code Button */}
        <div className="mb-8">
          <button className="border border-gray-600 px-4 py-2 text-sm hover:text-white hover:border-white transition-colors duration-200">
            Service Code
          </button>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-500">
          <p>
            &copy; 2025 Netflix Clone. This is a demo project for educational
            purposes.
          </p>
          <p className="mt-2">
            This is not the real Netflix website. Netflix is a registered
            trademark of Netflix, Inc.
          </p>
        </div>

        {/* Additional Legal Text */}
        <div className="mt-6 text-xs text-gray-600 space-y-1">
          <p>Netflix Clone - Made with React & Tailwind CSS</p>
          <p>For demonstration purposes only</p>
        </div>
      </div>
    </footer>
  );
};

export default NetflixFooter;
