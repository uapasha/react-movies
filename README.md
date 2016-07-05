# Movies catalog with ReactJS, MongoDB and NodeJS

### To run:
1. npm install
2. Create folder for MongoDB data: ./data
3. Launch mongo server: 
  - on Windows: mongod --dbpath %cd%\data\db
  - on c9.io Linux: mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"
4. Load dummy content: npm run loadData
5. Build source: npm run webpack
6. Start server: node server/index.js
7. Go to: http://localhost:3000
8. Enjoy!
