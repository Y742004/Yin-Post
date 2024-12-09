Create `.env` file and put your `DATABASE_UR` url and `AUTH_SECRET`

To get `AUTH_SECRET` run this command in terminal `npx auth secret` and then you will see in project folder `.env.local` which has `AUTH_SECRET` and copy key and past into the `.env` file.

## Getting Started

To install all packages run this.
```bash
npm i
```

To get `AUTH_SECRET` key run this.
```bash
npx auth secret
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
