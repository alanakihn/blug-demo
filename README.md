# blug-demo

Follow along with our demo by cloning this repository and following the steps below!

## Step One - Cloning

Clone the repository.

```
git clone git@github.com:piperdaniel1/blug-demo
```

## Step Two - Environment

Verify you have the relevant node and npm versions installed and on your path. We are using `npm 10.5.2` and `node 20.13.1`. You can verify this using:

```
npm --version
node --version
```

Now, install the project dependencies using `npm`:

```
npm install
```

To verify that everything is working correctly run `npm run dev` and click the http://localhost:5173/ link in the output. You should see the "Meet Tux" website homepage.

## Step Three - Writing your tests

Normally you would have to select your testing framework and install it here but we have already selected [`cypress`](https://www.cypress.io/) and written two tests.

Verify that these tests are included and working by running `npm run test` in your terminal. After the tests finish running you should see an `All specs passed!` message.

However, if you look at the tests in the `cypress/e2e` directory you can see that they only test if each page of the site loads! What good is a loaded page if it does not have the intended functionality? To help remedy this, let's open the `cypress/e2e/home.cy.ts` file.

You will see the following code:

```typescript
describe("The Home Page", () => {
  it("loads", () => {
    cy.visit("/");
  });
});
```

Let's add another test to make sure the page contains a button that navigates us to the `/hobbies` page after it is clicked. Add this block of code just below the first `it("loads");` function call.

```typescript
it("contains a button to /hobbies", () => {
  cy.visit("/");
  cy.get("button").should("exist");
  cy.get("button").click();
  cy.url().should("include", "/hobbies");
});
```

Your final code should look something like this:

```typescript
describe("The Home Page", () => {
  it("loads", () => {
    cy.visit("/");
  });
  it("contains a button to /hobbies", () => {
    cy.visit("/");
    cy.get("button").should("exist");
    cy.get("button").click();
    cy.url().should("include", "/hobbies");
  });
});
```

Great! Now we can rest easy knowing we are automatically testing the homepage functionality. You can verify that these new tests work by using the `npm run test` command. If all went well after the tests finish running you should see an extra test under `home.cy.ts` and an `All specs passed!` message.

## Step Four - Write your integration workflow

At last! Let's write our first [Github Actions](https://docs.github.com/en/actions/about-github-actions/understanding-github-actions) workflow. All workflows live in the `.github/workflows` directory in the project. You can see that this directory has been created for you, along with an empty `on-push.yml` file. Open this file, this is where we will be creating our action.

Github Actions workflows are written in YAML (Yet Another Markup Language) which you may be already familar with. Regardless, it is pretty easy to pick up as you go.

We'll start by defining a name for our workflow at the top of our file:

```yaml
name: Integration Testing
```

Next, we have to tell Github Actions when our workflow is supposed to run. We will have this run every time new code is pushed to the `main` branch of the repository. Add this code below the name of the workflow:

```yaml
on:
  push:
    branches:
      - main
```

Now, let's define what the workflow should actually do. This is done by defining a `job` for Github Actions to run. Each `job` also has a name but it also has an environment and a list of steps. Our `job` will be called `cypress-test` and will run on `Ubuntu 22.04` and check out the code and run our `cypress` tests. Add this code to the bottom of the workflow file to define our `job`:

```yaml
jobs:
  cypress-test:
    runs-on: ubuntu-22.04
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Cypress run
        uses: cypress-io/github-action@v6
        with:
          build: npm run build
          start: npm start
```

It's as simple as that! Following CI/CD principles, our entire workflow is defined in a code file in our repository. To run our workflow, simply make a new commit and push the code. If you have git configured correctly, this can be easily done from the command line:

```
git commit -a -m "Added new cypress tests and github workflow"
git push origin main
```

Now, navigate to your forked Github repository and click `Actions` on the top bar. You should be able to see the `Integration Testing` workflow running the job `cypress-test`. You can click the `cypress-test` job and view the command line output to see the tests run on the Github runner in real time.

Once the workflow completes navigate back to the `Code` section in the top bar. You should see a green checkmark next to the latest commit indicating that all Github Actions workflows have passed.

## (optional) Step Five - Add automated deployment to your workflow

This step is a lot harder to follow along with because you need to have a valid [Digital Ocean](https://www.digitalocean.com/) api key in your project's Github secrets.

To prep for this step we have already created a [Digital Ocean](https://www.digitalocean.com/) api key and added it to our Github Actions secrets under `DO_APP_KEY`. This api key will allow us to provision resources using Digital Ocean's infrastructure as code format.

First of all, let's define our Digital Ocean infrastructure. This is defined in the `.do` directory in our project. There is already a `app.yaml` file precreated in the `.do` directory that we will fill in.

We will be using the `static_site` hosting feature to host our website. This requires us to define commands that Digital Ocean should use to build and run our project. We also must define the git repo to access the source code from our website:

```yaml
features:
  - buildpack-stack=ubuntu-22
ingress:
  rules:
    - component:
        name: website
      match:
        path:
          prefix: /
name: blug-demo
region: nyc
static_sites:
  - environment_slug: html
    github:
      branch: main
      deploy_on_push: false
      repo: piperdaniel1/blug-demo
    name: website
    build_command: npm run build
    run_command: npm run start
    source_dir: /
```

Now, we need to write the Github Actions job to deploy our website to Digital Ocean. We will add this to the same `on-push.yml` workflow that we put the integration tests in before. First off, let's rename the workflow to Integration Testing and Deployment.

```yaml
name: Integration Testing and Deployment
```

Next we can add the deployment job below `cypress-test` job.

```yaml
deploy-app:
  needs: cypress-test
  runs-on: ubuntu-latest
  steps:
    - name: Checkout repository
      uses: actions/checkout@v4
    - name: Deploy the app
      uses: digitalocean/app_action/deploy@v2
      with:
        token: ${{ secrets.DO_APP_KEY }}
```

This ends up being very simple because Digital Ocean already has provided a deployment app_action that we are able to run with our API key. Importantly, notice the `needs: cypress-test` at the top of the job. This ensures we only deploy code that has passed all of our integration tests.

Finally, let's commit and push our code again.

```bash
git commit -a -m "Added new deployment workflows and IaC"
git push origin main
```

After navigating back to the `Actions` tab in our repo we can watch our new code get tested and deployed to a public url.

## Step Six - The whole workflow

Now let's add a new hobby to the "Hobbies" section of the site and watch it get automatically tested and deployed to the production site on Digital Ocean.
