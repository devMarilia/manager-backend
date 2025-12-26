/**
 * 🔐 Login Handler
 * POST /auth/login
 */
exports.handler = async (event) => {
  console.log("Login request:", event);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Login successful",
      token: "fake-jwt-token-12345",
      user: {
        id: 1,
        email: "user@example.com",
        name: "Test User"
      }
    })
  };
};
