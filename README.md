## Quy trình sử dụng GIT trong dự án

```
git clone git@gitlab.com:thucnguyen.fetch/portal.fetch.git
cd portal.fetch

git checkout develop
git checkout -b [OE-189]/[feat/fix]/xxxx
git add
git commit
git pull origin --rebase develop
git push origin [OE-189]/[feat/fix]/xxxx
```

Chú ý:
- [OE-189] là mã ticket khi làm
- quy tắc đặt tên branch sẽ có ở phần sau.
