describe('total E2E Test', () => {
    const baseURL = 'http://localhost:3000';
    const userName = '12exampleuser';
    const userEmail = '12user@example.com';
    const userPassword = 'password';
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
            expect(str).to.include(popups[counter++]);
        });

        // Step 1: Visit /thread and go to login
        cy.visit(`${baseURL}/thread`)
        cy.contains('Login').click()
        cy.contains('Register here').click()

        // Step 2: Attempt to register without accepting ToS
        cy.get('input[type="text"]').eq(0).clear().type(userName)  // Username
        cy.get('input[type="text"]').eq(1).clear().type(userEmail) // Email
        cy.get('input[type="password"]').type(userPassword) // Password
        cy.get('button[type="submit"]').click()

        // Step 3: Register an account with ToS accepted
        cy.get('input[type="checkbox"]').check()  // Accept terms of service
        cy.get('button[type="submit"]').click()
        cy.on('window:confirm', () => true) // Dismiss alert

        // Ensure redirection to login page
        cy.url().should('include', '/login');

        // Step 4: Log in with the new account
        cy.get('input[type="text"]').eq(0).clear().type(userEmail)
        cy.get('input[type="Password"]').clear().type(userPassword)
        cy.get('button[type="submit"]').click()
        cy.url().should('not.include', '/login');

        // Step 5: Create a post and a comment
        cy.contains('Art').click();
        cy.contains('New Post').click();
        cy.get('input[type="text"]').clear().type(postTitle);
        cy.get('textarea[name="content"]').clear().type(postContent);
        cy.get('button[type="submit"]').click();
        cy.wait(2000) // wait for 2 seconds

        cy.contains(postTitle).click();
        cy.contains('Visit post').click();
        cy.get('input[type="text"]').eq(0).clear().type(commentTitle)  
        cy.get('input[type="text"]').eq(1).clear().type(commentContent)
        cy.get('button[type="submit"]').click();
        cy.wait(2000) // wait for 2 seconds
        cy.contains(commentContent).should('be.visible');

        // Step 6: Go to profile and delete account
        cy.contains('Profile').click()
        cy.wait(1000) // wait for 1 seconds
        cy.contains('Delete account').click()
        cy.wait(500) // wait for 0.5 seconds

        // Step 8: Attempt to log in again
        cy.visit(`${baseURL}/login`)
        cy.get('input[type="text"]').eq(0).clear().type(userEmail) // Email
        cy.get('input[type="password"]').clear().type(userPassword) // Password
        cy.get('button[type="submit"]').click()
    })
  })