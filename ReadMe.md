# Node finding_files cli
# First Node.js expierience
Hard project was created not without helping of good developers:

<h1> Node_Js Finding_files </h1>

--DIR (required) base lookup directory

--TYPE (optional) [D|F] D - directory, F - file

--PATTERN (optional) regular expression to test file/directory name

--MIN-SIZE (optional) minimum file size [B|K|M|G], should be skipped for directories

--MAX-SIZE (optional) maximum file size [B|K|M|G], should be skipped for directories (B - bytes, K - kilobytes, M - megabytes, G - gigabytes)

Parameters order is not strict! Any order should work!

<h2>Install</h2>

[sudo] npm install -g finding_files

<h2>Use</h2>

find --DIR="/folder/folder/folder" etc.

<h3>Examples of filtering</h3>

--DIR="/home/oleg/FrontendProjects/Pr_Gratia/src/images"  --PATTERN=\.png  --MAX-SIZE=49086B

--DIR="/home/oleg/FrontendProjects/Pr_Gratia/src/images"  --TYPE=D

--DIR="/home/oleg/FrontendProjects/Pr_Gratia/src/images"  --TYPE=F --PATTERN=\.png  --MIN-SIZE=20K

