hash=$(git rev-parse HEAD)
hash=${hash: 0: 6}

rm -rf /tmp/sua-ac-build
mkdir /tmp/sua-ac-build

cd wiki
python -m mkdocs build
mv site /tmp/sua-ac-build/wiki
cd ..
cp -r main/* /tmp/sua-ac-build

git branch -D gh-pages
git switch --orphan gh-pages
cp -r /tmp/sua-ac-build/* .
git add -A
git commit -m "Generate site based on commit "$hash
git checkout master
