# Movies catalog with ReactJS, MongoDB and NodeJS

### To run:
1. install mongodb
2. run: npm install
3. Create folder for MongoDB data: ./data
4. Launch mongo server: 
  - on Windows: mongod --dbpath %cd%\data\db
  - on c9.io Linux: mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"
5. Load dummy content: npm run loadData
6. Build source: npm run webpack
7. Start server: node server/index.js
8. Go to: http://localhost:3000
9. Enjoy!
