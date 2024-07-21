import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div class="bg-gray-100">
      <footer class="bg-gray-800 text-white">
        <div class="container mx-auto px-6 py-8">
          <div class="flex flex-wrap justify-between">
            <div class="w-full md:w-1/4 mb-6 md:mb-0">
              <h2 class="text-xl font-bold mb-4">About Us</h2>
              <p class="text-gray-400 mb-2">
                We are a team dedicated to creating innovative solutions for
                everyday challenges. Our mission is to enhance user experience
                through technology.
              </p>
              <p class="text-gray-400">
                Our vision is to build a community-driven platform that connects
                people and fosters collaboration.
              </p>
            </div>
            <div class="w-full md:w-1/4 mb-6 md:mb-0">
              <h2 class="text-xl font-bold mb-4">Contact</h2>
              <ul class="text-gray-400">
                <li>Email: WebProject720@gmail.com</li>
                <li>Phone: Coming Soon..</li>
                <li>Address: Ajmer, Rajasthan, India</li>
              </ul>
            </div>
            <div class="w-full md:w-1/4 mb-6 md:mb-0">
              <h2 class="text-xl font-bold mb-4">Follow Us</h2>
              <ul class="flex justify-center space-x-4 flex-wrap">
              <li>
                  <a
                    href="https://github.com/WebProject720"
                    class="text-blue-400 hover:text-white"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" class="text-pink-400 hover:text-white">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" class="text-blue-400 hover:text-white">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" class="text-pink-400 hover:text-white">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" class="text-blue-400 hover:text-white">
                    LinkedIn
                  </a>
                </li>
                
              </ul>
            </div>
            <div class="w-full md:w-1/4 mb-6 md:mb-0">
              <h2 class="text-xl font-bold mb-4">About Project</h2>
              <p class="text-gray-400 mb-2">
                This project concept is based on a Lost and Found system used in
                universities and other places for people to get and give things
                to their owners.
              </p>
              <p class="text-gray-400 mb-2">
                Technologies used: React, NodeJS Express (MERN Stack). Deployed
                on Netlify and Render.
              </p>
              <div class="flex flex-col">
                <a
                  href="https://github.com/WebProject720/LOST_FOUND_REACTJS"
                  class="text-blue-400 hover:text-blue-600 mb-2"
                >
                  Frontend Code
                </a>
                <a
                  href="https://github.com/WebProject720/LOST_FOUND_SERVER"
                  class="text-blue-400 hover:text-blue-600"
                >
                  Server Code
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-900 py-4 text-center">
          <p class="text-gray-400">
            &copy; 2024 Your Website. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
export { Footer };
