echo "Please enter the path that you want to build the project in: "
read path
echo "Building the project in $path"
npx electron-packager . interactive-bouncing-nodes --platform=win32 --arch=x64 --out=$path --overwrite
echo "Project built in $path"