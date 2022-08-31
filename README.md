# Supabase auth, frontend + backend - example with Next.js

## Learn how to set up Supabase auth for both the frontend and backend of your application using a JWT - JSON web token.

### What is Supabase?

[Supabase](https://supabase.com/) is, as they describe it, an open-source alternative to Firebase.

It is essentially a managed Postgres environment with additional functionalities such as auth, storage, and real-time capabilities.

### What you will learn
In this README, I will show you how to set up Supabase auth on both the front end and back end. We're going to use Next.js as an example here. We're going to use this example repo for demonstration purposes.

### What you need to know before reading this README
I'm going to assume that you have at least some familiarity with Supabase. Prior knowledge of Next.js will be helpful, but it won't be necessary to understand this article.

### Pre-requisites
We're going to use npm, so make sure it's installed in your system. Make sure to sign up for a Supabase account, as well.

## Now, let's get into the main part of this tutorial.

### Step 1: Clone the example repo

Once you have the prerequisites, clone this repo to your local environment.

### Step 2: Make a new project on supabase.com

Make a new organization and project on Supabase's website.

### Step 3: Set up the project locally

Then, go into the directory of your clone, and copy .env.template to .env.

Go to Supabase, go into your project -> settings -> API. Copy and paste your keys into your newly created .env file.

Then, run:

```bash
npm install

npm run dev
```

Then, you should be able to see something like this: