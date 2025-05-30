# Portfolio 2023

This project holds a web page created with React.js. There is currently a slider in the front page, a math game and a NASA API to fetch pictures taken by Curiosity rover in Mars. Then there is also a page for fetching data from MySQL database.

Navigate to the project folder and enter npm install to install dependencies. Then enter npm start in the CLI to run the app in the development mode. npm test launches the tests. To run a single test enter npm test [filename].

Before using the NASA API and database pages you must ensure that both the Portfolio-Server and MySQL are installed and are up and running and they are connected. In addition add a database url to the .env file, for example:

REACT_APP_BACKEND_URL='http://localhost:3001'

To be able to use the NASA API you should go to NASA's web page, that is api.nasa.gov and generate an API key. This key is then entered to the Portfolio-Server's .env file.

To run the project in a docker container run 'docker-compose up'. This command pulls the project's image from the registry and then creates the container. If you want to build the image locally, then you have to comment out the image-line in the docker-compose file and also uncomment the build-line.

Copyright 2023 Tapani Voutilainen

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
