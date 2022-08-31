# Supabase auth, frontend + backend - example with Next.js

## Learn how to set up Supabase auth for both the frontend and backend of your application using a JWT - JSON web token.

### What is Supabase?

[Supabase](https://supabase.com/) is, as they describe it, an open-source alternative to Firebase.

It is essentially a managed Postgres environment with additional functionalities such as auth, storage, and real-time capabilities.

### What you will learn
In this README, I will show you how to set up Supabase auth on both the front end and back end. We're going to use Next.js as an example here. We're going to use this example repo for demonstration purposes.

### What you need to know before reading this README
I'm going to assume that you have at least some familiarity with Supabase. Prior knowledge of Next.js will be helpful, but it won't be necessary to understand this readme.

### Pre-requisites
We're going to use npm, so make sure it's installed in your system. Make sure to sign up for a Supabase account, as well.

---

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

![image](https://user-images.githubusercontent.com/1811651/187799682-9a34eb92-4831-4700-97f9-7285642c6277.png)

### Step 3.5: Review the paths

The following paths are available in this app:

```/ (index)```: it has the main form for sending data to the database. Redirects to /signup if the user is not signed in.

```/signup, /signin```: the signup and sign in forms. Redirects to index if the user is signed in.

```/logout```: it logs out the user.

You should now be able to sign up, sign in, and sign out using these paths.

### Step 4: Create a new table in Supabase

In this example, we're going to create a simple job posting web app.

So, we're going to create a table called jobs.

Go to your project and click create a new table.

![image](https://user-images.githubusercontent.com/1811651/187799891-5c9ada86-a98d-4a20-82c6-f91c340c5219.png)

Call it jobs, enable row level security, and add the following fields:

![image](https://user-images.githubusercontent.com/1811651/187799919-d0b29a20-e11e-442f-8582-ddfa24e10d37.png)

created_by should be a foreign key to the auth.users table.

If this was a real app, it would probably need more columns, but let's keep it simple here.

Notice that we have the is_public column, and it's set to false by default.

The assumption here is that when a user posts a new job posting on the site, we don't want to make it show up automatically on the site. We want to have some kind of approval process so that website admins can decide which job postings are legit enough to show on the site.

### Step 5: Submit the job posting form!

Go to the root path, and try submitting the form!

![image](https://user-images.githubusercontent.com/1811651/187799977-21d3f3df-2564-4a40-99d3-1f9ecd39a9fb.png)

It should have worked! You can verify it on Supabase's dashboard:

![image](https://user-images.githubusercontent.com/1811651/187800049-68367e85-db95-4185-8fc2-2baf47ec562f.png)

How did that happen?

### Step 6: Understand the frontend

Go to src/pages/index.tsx, and you'll see this function to handle form submission:

```typescript
const onSubmit = async (data: any) => {
  console.log(data);
  let result;
  try {
   result = await fetch('/api/submit_job_posting', {
    headers: {
     Authentication: session.access_token,
    },
    method: 'POST',
    body: JSON.stringify(data),
   });
  } catch (err) {
   console.log(err);
  }
  console.log(result);
  reset();
};
```

The important part is, we're sending Supabase's access token / JWT in the headers of the request.

That's this part:

```typescript
headers: {
  Authentication: session.access_token,
},
```

A JWT is, in short, a key to verify that the user is signed in.

By sending it to our backend code on our API path, we're able to send the backend proof that the user is signed in.

### Step 7: Understand the backend

Go to src/pages/api/submit_job_posting.js. Let's try and understand this file, section by section.

```typescript
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const supabaseSecret = createClient(supabaseUrl, supabaseServiceKey);
```

^These two lines at the top create clients in two different ways.

The first one is the same type of client as the front end - it's safe to use it publicly:

```typescript
const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

The second one uses Supabase's secret service key. It has admin-level access to your data:

```typescript
const supabaseSecret = createClient(supabaseUrl, supabaseServiceKey);
```

Then:

```typescript
const input_data = JSON.parse(req.body);
const jwt = req.headers.authentication;
```

^these two lines parse the data that was sent from the front end and then retrieve the JWT from the headers.

```typescript
const { data: user, userError } = await supabase.auth.api.getUser(jwt);

const id = user.identities[0]['id'];
```

^Then, these two lines retrieve the logged-in user, and we get their ID.

```typescript
const { data, error } = await supabaseSecret.from('jobs').insert([input_data]);
```

^Finally, this line inserts the data in our table using admin-level access.

### Why do we need admin-level access?

Another potential way to approach this is - we could insert data directly from the front-end, using row-level security. However, with that, each user will be able to manually set "is_public" to true, which is not what we want.

In order to avoid that, we need to use admin-level access so that we can set it to false to begin with, using our backend code.

---

### Learn more with a practical example

Thank you for reading this README!

If you'd like to learn more about how this particular pattern could be used in a real-world application, feel free to check out [this open-source project of mine](https://github.com/ykdojo/defaang) that uses it.
