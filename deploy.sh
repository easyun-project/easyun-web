echo "Kill all the running PM2 actions"
sudo pm2 kill

echo "Jump to app folder"
cd /home/easyun-web

echo "Update app from Git"
git pull

echo "Install app dependencies"
npm install

echo "Build your app"
npm run build

echo "Run new PM2 action"
cp /home/ecosystem.json ecosystem.json
pm2 start ecosystem.json