## File Structure

```
client
│   package.json
│   tsconfig.json
│
└───public
│       index.html
│
└───src
    │   index.tsx
    │   App.tsx
    │
    └───components
    │       MUI
    │       Home.tsx
    │       Term.tsx
    │       Course.tsx
    │       BlockForm.tsx
    │       Login.tsx
    │       Register.tsx
    │       Views.tsx
    │       ProtectedRoutes.tsx
    │       types.ts
    │
    └───controllers
    │       authController.ts
    │       blockController.ts
    │       courseController.ts
    │       termController.ts
    │
    └───reducers
            blocks.ts
            courses.ts
            terms.ts
```

```
server
│   package.json
│   index.js
│
└───routes
│   │   BlockRoute.ts
│   │   CourseRoute.ts
│   │   TermRoute.ts
│   │
│   └───Auth
│           Authentication.js
│           JWT.js
│
└───sql
        block.sql
        course.sql
        term.sql
        user.sql
```
