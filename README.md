# Movies catalog with ReactJS, MongoDB and NodeJS

### To run:
1. install mongodb
2. You should use node 6.1.0 to be safe
3. run: npm install
4. Create folder for MongoDB data: ./data
5. Launch mongo server: 
  - on Windows: mongod --dbpath %cd%\data\db
  - on c9.io Linux: mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"
6. Load dummy content: npm run loadData
7. Build source: npm run webpack
8. Start server: npm start
9. Go to: http://localhost:3000/
10. Enjoy!

### Architecture in two words: 
- MongoDB with the help of Mongoose keeps data
- NodeJS Express server serves API and index.html file
- ReactJS renders client part and provides interactive experience
- ReactJS is build into bundle.js with webpack 
