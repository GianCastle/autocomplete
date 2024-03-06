1. What is the difference between Component and PureComponent? Give an example where it might break my app.

A regular component is a component that gets updated whenever it's parent tells it to. Even when the it's props **didn't** change!

A Pure Component is a comp only updates when it needs to. It does this by checking if the depencies have changed. This process is called shallow comparison.

i.e
Imagine we have a ToyCard component that contains a button. When you press it, the car stars will move

Assuming the car movements depends on how many times you have been pressed the button, the ToyCard component will re-render every time the button is pressed. This is because the parent component is telling it to re-render.

However, a Pure Component is smarter. It checks if it's already moving before responding to the button press. If it's already moving forward, it won't respond to the button press again until it stops moving or changes direction.

If the toy car is a regular component and doesn't check if it's already moving before responding to the button press, it might break because it moves unnecessarily, possibly causing confusion or unexpected behavior.

2. Context + ShouldComponentUpdate might be dangerous. Why is that?

Maybe unnecessarily re-rendering, missing updates...

Context provides a way to pass data through the component tree without having to pass props down manually at every level. And, the shouldComponentUpdate lifecycle method is just designed to optimize rendering by determining if a component should re-render based on changes in props or state.

Context propagates trough all the component tree and it will trigger updates on all the components that are subscribed to it. While shouldComponentUpdate is used to prevent unnecessary re-renders, it might not work as expected when used with context. This is because the context will trigger updates on all the components that are subscribed to it, regardless of whether or not they should re-render.

3. Describe 3 ways to pass information from a component to its PARENT.

   1. Context API: This is a way to pass data through the component tree without having to pass props down manually at every level. It provides a way to share values like these between components without having to explicitly pass a prop through every level of the tree. The recommended way to pass information from when you have deeply nested components.
   2. Callbacks: You can pass a function as a prop to a child component, and the child can call that function. This is a way to pass information. It can be very messy if you have to pass information through multiple levels of components.
   3. Props: The most classic way to pass information You can pass information from a child to a parent by passing a function as a prop to the child component. The child can then call that function and pass the information to the parent. We tend to use this method when the parent needs to know about what's happening in the child component. not recommended for deeply nested components.

4. Give 2 way stop prevent components from re-rendering.
   1. In a nutshell, you need to check the component dependencies that are attached to the component's state or props. If the dependencies are not changing, then the component should not re-render. You can use the shouldComponentUpdate lifecycle method to prevent a component from re-rendering. This method is called before the component is re-rendered, and it returns a boolean value that specifies whether the component should re-render or not. If the method returns false, the component will not re-render.
   2. You can also use React.memo to prevent a functional component from re-rendering. React.memo is a higher-order component that you can use to wrap a functional component. It works similarly to the shouldComponentUpdate lifecycle method, but it's used with functional components. It checks if the component's props have changed, and if they haven't, it prevents the component from re-rendering.
5. What is a fragment and why do we need it? Give an example where it might break my app.
   1. A React Fragment is just a wrapper that allow us to group multiple elements without adding an additional nodes to DOM. It can break your app in such many ways but the common one coudl be the following when we overuse it:
      1. Lets say you're iterating over a list of elements inside a fragment that has only 1 node
      2. if the list is empty and there is no fallback for empty items, the fragment will break the app. since it will render an empty node. Additional logic to determine if the list is empty or not will be needed to prevent this from happening.
6. Give 3 examples of the HOC pattern.
   1. HoC are really cool for authentication and authorization. You can create a HoC that checks if the user is authenticated and if not, redirect them to the login page. ie. `withAuth`
   2. You can also use HoC to create a component that fetches data from an API and passes it to the wrapped component. ie. `withData`
   3. You can also use HoC to create a component that listens to window resize events and passes the window dimensions to the wrapped component. ie. `withWindowDimensions`

Other well know HoC are `connect` from redux and `withRouter` from react-router-dom

7. What's the difference in handling exceptions in promises, callbacks and async...await?

   Basically, syntax sugar and readability

   1. Callbacks are functions that are passed as arguments to other functions.When an error occurs in a callback, it's usually passed as the first argument to the callback function. You can then check if the error exists and handle it accordingly.
   2. Promises are JavaScript objects that represent the eventual completion or failure of an asynchronous operation (under a reject, resolve signature). When an error occurs in a promise, you can use the .catch method to handle the error. This method is called when the promise is rejected, and it takes a function as an argument that handles the error.
   3. async/await is a syntax for working with promises that makes the code more readable and easier to understand. When an error occurs in an async function, you can use the try/catch statement to handle the error. This statement allows you to catch the error and handle it in a more synchronous way, making the code easier to read and understand.

8. How many arguments does setState take and why is it async.
   It takes two, a function or object finally an optional callback. Its async because Reacts by default batches state updates for performance reasons. This means that when you call setState, React doesn't immediately update the component's state. Instead, it puts the state update in a queue, and then updates the state in batches. This is done to prevent unnecessary re-renders and to improve performance.

9. List the steps needed to migrate Class to Function Component.
   This can vary it's difficulty depending on the complexity of the class component. But in general, the steps are:
10. Create a new functional component that will replace the class component.
11. Copy the logic from the class component to the functional component.
12. Remove the state and lifecycle methods from the class component and replace them with hooks in the functional component.
13. Remove the render method from the class component and replace it with a return statement in the functional component.
14. Remove the class component and replace it with the functional component in the parent component.
15. Test the functional component to make sure it works as expected.
16. (optional) - Refactor the functional component to make it more readable and maintainable.

10.List a few ways styles can be used with components.

- Inline styles. Worst way to do it.
- CSS Modules. Recommended.
- CSS-in-JS libraries like styled-components or emotion. Also recommended (not a huge fan of it to be honest :P)
- External files (like .css files)

11. How to render an HTML string coming from the server.

- React have a built-in method called dangerouslySetInnerHTML that allows you to render HTML strings. This method is called dangerouslySetInnerHTML, the name comes because rendering HTML from server can expose the client to cross-site scripting (XSS) attacks.
