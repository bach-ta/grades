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
    │       Home.tsx
    │       Term.tsx
    │       Course.tsx
    │       BlockForm.tsx
    │
    └───controllers
    │       termController.ts
    │       courseController.ts
    │
    └───reducers
            terms.ts
            courses.ts
```

```
server
│   package.json
│   index.js
│   
└───routes
        TermRoute.ts
        CourseRoute.ts
```
