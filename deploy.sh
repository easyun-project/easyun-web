echo "Kill all the running PM2 actions  --skip"
# pm2 kill

echo "Jump to app folder"
cd /home/ec2-user/easyun-web

echo "Update app from Git  --skip"
# git pull

echo "Install app dependencies"
npm install

echo "Build your app"
npm run build

echo "Run new PM2 action  --skip"
# cp /home/ec2-user/ecosystem.json ecosystem.json
# pm2 start ecosystem.json
