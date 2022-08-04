## Quy trình sử dụng GIT trong dự án

```
git checkout develop
git checkout -b [PT-01]/[feat/fix]/xxxx
git add
git commit
git pull origin --rebase develop
git push origin [PT-01]/[feat/fix]/xxxx
```

### Chú ý:
- [PT-01] là mã ticket được assign khi làm.
```
 -- Trong đó PT là viết tắt của tên project "Portal",
 -- 01 là số thứ tự ticket được assign.
```

- Quy tắc đặt tên.

[Document](https://github.com/airbnb/javascript)

```
-- Đối với tên các Function sử dụng camelCase
--> example: onRefresh, onBackPress, onSubmit, renderItem

-- Đối với tên các Conponent sử dụng PascalCase
--> example: HomePage, SearchPage, DashBoardPage

-- Đối với tên các Constant sử dụng UPPERCASE
--> example: SECONDS, WIDTH, YEAR

-- Đối với các biến boolean sử dụng tiền tố 'is', 'are', 'has'
--> example: isAction, areEqual, hasEncryption
```

- Quy tắc đặt tên branch.
```
-- Branch name convention: [ProjectName]-[TicketNumber]-[Initial]-[BranchName].
--> example: PT-01-feat/Home
```

- Quy tắc đặt tên commit
```
-- feat: đây là 1 cái commit
-- fix: fix homeScreen sai UI
```

```
Initial types: 'feat', 'fix', 'refactor', 'revert'
```
## Quy trình chuyển task trong dự án

- [Document](https://docs.google.com/document/d/18is2D6OM3i0x7ADr1RZtCIeerSBXLmtzo2XGmx5nDQ8/edit)

- 1 Sprint sẽ trong 2 tuần
- Daily meeting: Hằng ngày trong vòng 10-15p: báo cáo công việc và những vấn đề gặp phải

## Tech Stack

- [React](https://reactjs.org/)

- [NextJs](https://nextjs.org/)

- [Document theme](https://docs-minimals.vercel.app/package) ---> detail function theme using

- [Clickup](https://clickup.com/) ---> manage task

## Setup

1. Install the following

- [nvm](https://github.com/nvm-sh/nvm)

- [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

- [VS Code](https://code.visualstudio.com/)

- [ESlint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

2. Make sure using Node.js version is 14

```

$ nvm install 14 && nvm use 14

```
4. Clone this repo

```
- git clone git@gitlab.com:thucnguyen.fetch/portal.fetch.git
- cd portal.fetch && yarn && yarn start

```
