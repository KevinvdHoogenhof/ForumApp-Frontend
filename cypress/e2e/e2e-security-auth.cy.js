describe('total security E2E Test with auth test', () => {
    const baseURL = 'http://localhost:3000';
    const userName = '134523exampleuser';
    const userEmail = '134253user@example.com';
    //const userName = 'e2eTestUser';
    //const userEmail = 'e2eTester@example.com';
    const userPassword = 'password';
    const thread = 'Nederlands';
    const threadName = 'Example Thread';
    const threadDescription = 'This is an example thread description.';
    const postTitle = 'Example Post';
    const postContent = 'This is an example post content.';
    const commentTitle = 'Example Comment';
    const commentContent = 'This is an example comment content.';

    it('should register, log in, create posts and comments, delete account, verify posts/comments deleted and fail to log in again', () => {
        // Want to ensure this sequence of messages 
        const popups = [
            "You must accept the terms of service to register.",
            "User registered successfully. Please login to your account.",
            "Are you sure you want to delete your account?",
            "Login failed: Invalid email or password"
        ]
        let counter = 0
        cy.on("window:alert", str => {
            expect(str).to.include(popups[counter++])
            return true
        })
        cy.on('window:confirm', (str) => {
            expect(str).to.include(popups[counter++])
        });

        // Attempt to create thread without being logged in
        cy.visit(`${baseURL}/postthread`)
        cy.get('input[type="text"]').eq(0).clear().type(threadName)
        cy.get('input[type="text"]').eq(1).clear().type(threadDescription) 
        cy.wait(500) // wait for 0.5 seconds
        cy.contains('Submit').click()
        cy.wait(500) // wait for 0.5 seconds
        cy.visit(`${baseURL}/threads`)
        cy.wait(500) // wait for 0.5 seconds
        cy.scrollTo(0, 500)
        cy.wait(1500) // wait for 0.5 seconds

        // Attempt to edit thread without being logged in
        cy.contains(thread).click();
        cy.wait(1000) // wait for 1 seconds
        cy.contains('Edit').click()
        cy.wait(1000) // wait for 1 seconds
        cy.contains('Update').click()
        cy.wait(1000) // wait for 1 seconds
        cy.contains('Delete').click()
        cy.wait(1000) // wait for 1 seconds
        cy.visit(`${baseURL}/threads`)
        cy.wait(500) // wait for 0.5 seconds
        cy.contains(thread).click();
        cy.wait(1000) // wait for 1 seconds

        // Visit /thread and go to login
        cy.visit(`${baseURL}/threads`)
        cy.wait(1000) // wait for 1 seconds
        cy.contains('Login').click()
        cy.wait(2000) // wait for 2 seconds
        cy.contains('Register here').click()
        cy.wait(500) // wait for 0.5 seconds

        // Attempt to register without accepting ToS
        cy.get('input[type="text"]').eq(0).clear().type(userName)  // Username
        cy.get('input[type="text"]').eq(1).clear().type(userEmail) // Email
        cy.get('input[type="password"]').type(userPassword) // Password
        cy.wait(500) // wait for 0.5 seconds
        cy.get('button[type="submit"]').click()
        cy.wait(1000) // wait for 1 seconds

        // Register an account with ToS accepted
        cy.contains('terms of service').click()
        cy.wait(3000) // wait for 3 seconds
        cy.go('back')
        cy.wait(500) // wait for 0.5 seconds
        cy.get('input[type="text"]').eq(0).clear().type(userName)  // Username
        cy.get('input[type="text"]').eq(1).clear().type(userEmail) // Email
        cy.get('input[type="password"]').type(userPassword) // Password
        cy.wait(500) // wait for 0.5 seconds
        cy.get('input[type="checkbox"]').check()  // Accept terms of service
        cy.wait(500) // wait for 0.5 seconds
        cy.get('button[type="submit"]').click()
        cy.wait(1000) // wait for 1 seconds
        cy.on('window:confirm', () => true) // Dismiss alert
        cy.wait(500) // wait for 0.5 seconds

        // Ensure redirection to login page
        cy.url().should('include', '/login');

        // Log in with the new account
        cy.get('input[type="text"]').eq(0).clear().type(userEmail)
        cy.get('input[type="Password"]').clear().type(userPassword)
        cy.wait(500) // wait for 0.5 seconds
        cy.get('button[type="submit"]').click()
        cy.url().should('not.include', '/login')
        cy.wait(1000) // wait for 1 seconds

        // Create a post
        cy.contains(thread).click();
        cy.wait(1000) // wait for 1 seconds
        cy.contains('New Post').click()
        cy.wait(1000) // wait for 1 seconds
        cy.get('input[type="text"]').clear().type(postTitle)
        cy.get('textarea[name="content"]').clear().type(postContent)
        cy.wait(500) // wait for 0.5 seconds
        cy.get('button[type="submit"]').click()
        cy.wait(2000) // wait for 2 seconds

        // Visit created post and create a comment
        cy.contains(postTitle).click();
        cy.wait(1000) // wait for 1 seconds
        cy.contains('Visit post').click();
        cy.wait(1000) // wait for 1 seconds
        cy.get('input[type="text"]').eq(0).clear().type(commentTitle)  
        cy.get('input[type="text"]').eq(1).clear().type(commentContent)
        cy.wait(500) // wait for 0.5 seconds
        cy.get('button[type="submit"]').click()
        cy.wait(500) // wait for 0.5 seconds
        cy.scrollTo(0, 500)
        cy.wait(2000) // wait for 2 seconds
        cy.contains(commentContent).should('be.visible')
        cy.reload()
        cy.wait(1000) // wait for 1 seconds

        // Go to profile and delete account
        cy.contains('Profile').click()
        cy.wait(1000) // wait for 1 seconds
        cy.contains('Delete account').click()
        cy.wait(500) // wait for 0.5 seconds

        // Attempt to log in again
        cy.visit(`${baseURL}/login`)
        cy.get('input[type="text"]').eq(0).clear().type(userEmail) // Email
        cy.get('input[type="password"]').clear().type(userPassword) // Password
        cy.wait(1000) // wait for 1 seconds
        cy.get('button[type="submit"]').click()
        cy.wait(1000) // wait for 1 seconds

        // Check if post is deleted along with comment
        cy.visit(`${baseURL}/threads`)
        cy.wait(1000) // wait for 1 seconds
        cy.contains(thread).click()
        cy.wait(1000) // wait for 1 seconds
        cy.contains('Visit thread').click()
    })
  })