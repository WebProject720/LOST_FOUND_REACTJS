const Footer = () => {
  return (
    <div className="bg-black col-span-2 w-full mt-5">
      <footer className="bg-black text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h2 className="text-xl font-bold mb-4">About Us</h2>
              <p className="text-gray-400 mb-2">
                We are a team dedicated to creating innovative solutions for
                everyday challenges. Our mission is to enhance user experience
                through technology.
              </p>
              <p className="text-gray-400">
                Our vision is to build a community-driven platform that connects
                people and fosters collaboration.
              </p>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h2 className="text-xl font-bold mb-4">Contact</h2>
              <ul className="text-gray-400">
                <li>Email: WebProject720@gmail.com</li>
                <li>Phone: Coming Soon..</li>
                <li>Address: Ajmer, Rajasthan, India</li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h2 className="text-xl font-bold mb-4">Follow Us</h2>
              <ul className="flex justify-center space-x-4 flex-wrap">
                <li>
                  <a
                    href="https://github.com/WebProject720"
                    className="text-blue-400 hover:text-white"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="text-pink-400 hover:text-white">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-400 hover:text-white">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-pink-400 hover:text-white">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-400 hover:text-white">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h2 className="text-xl font-bold mb-4">About Project</h2>
              <p className="text-gray-400 mb-2">
                This project concept is based on a Lost and Found system used in
                universities and other places for people to get and give things
                to their owners.
              </p>
              <p className="text-gray-400 mb-2">
                Technologies used: React, NodeJS Express (MERN Stack). Deployed
                on Netlify and Render.
              </p>
              <div className="flex flex-col">
                <a
                  href="https://github.com/WebProject720/LOST_FOUND_REACTJS"
                  className="text-blue-400 hover:text-blue-600 mb-2"
                >
                  Frontend Code
                </a>
                <a
                  href="https://github.com/WebProject720/LOST_FOUND_SERVER"
                  className="text-blue-400 hover:text-blue-600"
                >
                  Server Code
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 py-4 text-center">
          <p className="text-gray-400">
            &copy; 2024 Your Website. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
export { Footer };
